/* Math Live V4 · © 2026 Rene M. Velazquez Avila · Todos los derechos reservados. */
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const sections=['home','teacherSetup','teacherLobby','studentJoin','studentWait','play','finish'];
function show(id){sections.forEach(x=>$('#'+x).classList.toggle('hidden',x!==id)); window.scrollTo({top:0,behavior:'smooth'});}
$$('.back').forEach(b=>b.onclick=()=>show('home')); $('#teacherBtn').onclick=()=>show('teacherSetup'); $('#studentBtn').onclick=()=>show('studentJoin');

const curriculum={
 K:{name:'Kinder',tag:'Cuenta y descubre',topics:[['count','🔵','Contar objetos'],['compare','⚖️','Comparar grupos'],['shapes','🔺','Figuras y patrones']]},
 1:{name:'1.º grado',tag:'Mira · cuenta · piensa',topics:[['dots','🔵','Puntos y cantidades'],['bonds','🧩','Vínculos numéricos'],['addsub','➕','Suma y resta']]},
 2:{name:'2.º grado',tag:'Construye números',topics:[['place','🔢','Valor posicional'],['numberline','📍','Recta numérica'],['addsub','➕','Suma y resta'],['measure','📏','Medición']]},
 3:{name:'3.º grado',tag:'Millares y operaciones',topics:[['place1000','🔢','Valor posicional y millares'],['multiply','✖️','Multiplicación'],['divide','➗','División'],['measure','📏','Medición']]},
 4:{name:'4.º grado',tag:'Explora relaciones',topics:[['place1000','🔢','Valor posicional'],['multiply','✖️','Multiplicación'],['fractions','🍕','Fracciones'],['problems','🧠','Problemas']]},
 5:{name:'5.º grado',tag:'Retos avanzados',topics:[['decimals','🔟','Decimales'],['fractions','🍕','Fracciones'],['operations','🧮','Operaciones'],['problems','🧠','Problemas']]}
};
const gameTypes=[['challenge','⚡','Reto rápido'],['discover','🔎','Descubre'],['memory','🃏','Memoria'],['crossword','✏️','Crucigrama'],['build','🧩','Construye']];
let selectedGrade='2',selectedTopic='place',selectedGame='challenge',game=null,idx=0,score=0,questions=[],studentId=null,unsubs=[],currentUser=null;

function firebaseReady(){const c=window.MATHLIVE_FIREBASE_CONFIG||{};return !!(window.firebase&&c.apiKey&&c.projectId&&c.appId)}
let db=null,auth=null;
if(firebaseReady()){
  if(!firebase.apps.length) firebase.initializeApp(window.MATHLIVE_FIREBASE_CONFIG);
  db=firebase.firestore(); auth=firebase.auth();
}
async function ensureAuth(){
  if(!auth) throw new Error('Firebase no está configurado.');
  if(auth.currentUser){currentUser=auth.currentUser;return currentUser;}
  const cred=await auth.signInAnonymously(); currentUser=cred.user; return currentUser;
}
function netMsg(){return db&&auth?'Conexión online preparada.':'Falta completar firebase-config.js.'}

function renderGrades(){
 $('#grades').innerHTML=Object.entries(curriculum).map(([k,v])=>`<button class="grade ${k===selectedGrade?'active':''}" data-g="${k}"><strong>${k}</strong>${v.name}<small>${v.tag}</small></button>`).join('');
 $$('.grade').forEach(b=>b.onclick=()=>{selectedGrade=b.dataset.g;selectedTopic=curriculum[selectedGrade].topics[0][0];renderGrades();renderTopics();summary()});
}
function renderTopics(){let c=curriculum[selectedGrade];$('#contentTitle').textContent=`Contenido de ${c.name}`;$('#topics').innerHTML=c.topics.map(t=>`<button class="topic ${t[0]===selectedTopic?'active':''}" data-t="${t[0]}">${t[1]} ${t[2]}</button>`).join('');$$('.topic').forEach(b=>b.onclick=()=>{selectedTopic=b.dataset.t;renderTopics();summary()})}
function renderGames(){ $('#games').innerHTML=gameTypes.map(g=>`<button class="game ${g[0]===selectedGame?'active':''}" data-game="${g[0]}">${g[1]}<b>${g[2]}</b><small>${g[0]==='challenge'?'Disponible primero':'Se incorpora por etapas'}</small></button>`).join('');$$('.game').forEach(b=>b.onclick=()=>{selectedGame=b.dataset.game;renderGames();summary()})}
function summary(){let c=curriculum[selectedGrade],t=c.topics.find(x=>x[0]===selectedTopic),g=gameTypes.find(x=>x[0]===selectedGame);$('#setupSummary').innerHTML=`<strong>${c.name}</strong> · ${t?.[2]||'Contenido'} · ${g[2]} · ${$('#qcount').value} desafíos<br><span class="small">${netMsg()}</span>`}
renderGrades();renderTopics();renderGames();summary();$('#qcount').onchange=summary;
function code(){return String(Math.floor(100000+Math.random()*900000))}
function esc(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function cleanup(){unsubs.forEach(f=>{try{f()}catch(e){}});unsubs=[]}
async function uniqueCode(){for(let i=0;i<8;i++){let c=code(),s=await db.collection('games').doc(c).get();if(!s.exists)return c}throw new Error('No se pudo generar un código. Intenta nuevamente.')}

$('#createGame').onclick=async()=>{
 try{
  if(!db||!auth){alert('Primero completa firebase-config.js.');return}
  const user=await ensureAuth();
  let c=curriculum[selectedGrade],t=c.topics.find(x=>x[0]===selectedTopic),gt=gameTypes.find(x=>x[0]===selectedGame),newCode=await uniqueCode();
  game={code:newCode,teacherUid:user.uid,grade:selectedGrade,gradeName:c.name,topic:selectedTopic,topicName:t?.[2],gameType:selectedGame,gameName:gt[2],count:+$('#qcount').value,mode:$('#mode').value,status:'lobby',createdAt:firebase.firestore.FieldValue.serverTimestamp()};
  await db.collection('games').doc(newCode).set(game);
  $('#gameCode').textContent=newCode;$('#gameSummary').textContent=`${game.gradeName} · ${game.topicName} · ${game.gameName} · ${game.count} desafíos`;show('teacherLobby');listenTeacher(newCode);
 }catch(e){console.error(e);alert('No se pudo crear la partida. Revisa la configuración y las reglas de Firebase.');}
};
function listenTeacher(c){cleanup();unsubs.push(db.collection('games').doc(c).collection('players').orderBy('joinedAt').onSnapshot(s=>{let players=s.docs.map(d=>({id:d.id,...d.data()}));$('#studentCount').textContent=players.length;$('#studentList').innerHTML=players.map(p=>`<div class="studentLine"><b>🎮 ${esc(p.name)}</b><span>${p.finished?`⭐ ${p.score}/${p.answered}`:'Conectado ✓'}</span></div>`).join('');$('#teacherMsg').textContent=players.length?'¡Equipo listo! Puedes comenzar cuando quieras.':'Esperando estudiantes…'},e=>{console.error(e);$('#teacherMsg').textContent='No se pudo leer el lobby. Revisa las reglas de Firestore.'}))}

$('#joinGame').onclick=async()=>{
 try{
  if(!db||!auth){$('#joinMsg').innerHTML='<div class="status">Esta copia aún no tiene Firebase configurado.</div>';return}
  let c=$('#joinCode').value.trim(),n=$('#studentName').value.trim().replace(/\s+/g,' ');if(!/^\d{6}$/.test(c)||!n){$('#joinMsg').innerHTML='<div class="status">Escribe un código válido de 6 dígitos y tu nombre.</div>';return}
  const user=await ensureAuth();let ref=db.collection('games').doc(c),snap=await ref.get();if(!snap.exists){$('#joinMsg').innerHTML='<div class="status">Código no encontrado. Revisa los seis dígitos.</div>';return}
  game={code:c,...snap.data()};if(game.status!=='lobby'){$('#joinMsg').innerHTML='<div class="status">Esta partida ya comenzó o terminó.</div>';return}
  studentId=user.uid;await ref.collection('players').doc(studentId).set({uid:user.uid,name:n,score:0,answered:0,finished:false,joinedAt:firebase.firestore.FieldValue.serverTimestamp()});
  $('#waitText').textContent=`${n}, ya estás conectado. Espera a que comience la aventura.`;show('studentWait');listenStudent(c);
 }catch(e){console.error(e);$('#joinMsg').innerHTML='<div class="status">No pudimos entrar. Revisa la conexión y vuelve a intentar.</div>'}
};
function listenStudent(c){cleanup();unsubs.push(db.collection('games').doc(c).onSnapshot(s=>{if(!s.exists)return;let data=s.data();game={code:c,...data};if(data.status==='playing'&&$('#play').classList.contains('hidden'))startPlay();if(data.status==='finished'&&$('#finish').classList.contains('hidden'))show('finish')},console.error))}
$('#startGame').onclick=async()=>{try{await ensureAuth();if(!game)return;await db.collection('games').doc(game.code).update({status:'playing',startedAt:firebase.firestore.FieldValue.serverTimestamp()});$('#teacherMsg').textContent='🚀 ¡Partida en progreso! Los resultados aparecerán aquí.'}catch(e){console.error(e);alert('No se pudo iniciar. Revisa las reglas de Firestore.')}};

const hundredsWords=['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
const units=['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
const tens=['','','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
function numberWords(n){if(n===100)return'cien';let h=Math.floor(n/100),r=n%100,s=h?hundredsWords[h]+' ':'';if(r<30)return(s+units[r]).trim();let t=Math.floor(r/10),o=r%10;return(s+tens[t]+(o?' y '+units[o]:'')).trim()}
function expanded(n){let h=Math.floor(n/100)*100,t=Math.floor(n%100/10)*10,o=n%10;return [h,t,o].filter(x=>x>0).join(' + ')}
function unitForm(n){let h=Math.floor(n/100),t=Math.floor(n%100/10),o=n%10;return `${h} centenas + ${t} decenas + ${o} unidades`}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function makePlaceQ(){
 const h=1+Math.floor(Math.random()*9),t=Math.floor(Math.random()*10),o=Math.floor(Math.random()*10),n=h*100+t*10+o;
 const forms=[
  {text:`¿Cuál es la forma desarrollada de ${n}?`,correct:expanded(n),skill:'Forma desarrollada',kind:'expanded'},
  {text:`¿Cuál es la forma estándar de ${expanded(n)}?`,correct:String(n),skill:'Forma estándar',kind:'number'},
  {text:`¿Cuál es la forma unitaria de ${n}?`,correct:unitForm(n),skill:'Forma unitaria',kind:'unit'},
  {text:`¿Cuál es la forma escrita de ${n}?`,correct:numberWords(n),skill:'Forma escrita',kind:'words'},
  {text:`¿Qué valor tiene el ${h} en ${n}?`,correct:String(h*100),skill:'Valor posicional',kind:'value'}
 ];
 let q=forms[Math.floor(Math.random()*forms.length)],opts=new Set([q.correct]);
 while(opts.size<4){let nn=(1+Math.floor(Math.random()*9))*100+Math.floor(Math.random()*10)*10+Math.floor(Math.random()*10);if(q.kind==='expanded')opts.add(expanded(nn));else if(q.kind==='unit')opts.add(unitForm(nn));else if(q.kind==='words')opts.add(numberWords(nn));else if(q.kind==='value')opts.add(String((1+Math.floor(Math.random()*9))*100));else opts.add(String(nn))}
 return {...q,opts:shuffle([...opts])};
}
function makeDotsQ(){let n=1+Math.floor(Math.random()*20),dots='● '.repeat(n).trim(),opts=new Set([String(n)]);while(opts.size<4)opts.add(String(Math.max(1,Math.min(20,n+Math.floor(Math.random()*7)-3))));return {text:`¿Cuántos puntos hay?\n${dots}`,correct:String(n),skill:'Puntos y cantidades',opts:shuffle([...opts])}}
function makeKinderQ(){let n=1+Math.floor(Math.random()*10),dots='● '.repeat(n).trim(),opts=new Set([String(n)]);while(opts.size<3)opts.add(String(Math.max(1,Math.min(10,n+Math.floor(Math.random()*5)-2))));return {text:`Cuenta los puntos:\n${dots}`,correct:String(n),skill:'Conteo',opts:shuffle([...opts])}}
function makeQuestion(){if(game.grade==='K')return makeKinderQ();if(game.grade==='1')return makeDotsQ();if(game.grade==='2'&&game.topic==='place')return makePlaceQ();return makePlaceQ()}
function startPlay(){questions=Array.from({length:game?.count||10},makeQuestion);idx=0;score=0;$('#playGrade').textContent=game?.gradeName||'';show('play');renderQ()}
function renderQ(){let q=questions[idx];$('#progress').textContent=`${idx+1} / ${questions.length}`;$('#score').textContent=score;$('#skillLabel').textContent=`${q.skill} · ${game?.gameName||'Reto'}`;$('#question').style.whiteSpace='pre-line';$('#question').textContent=q.text;$('#answers').innerHTML='';q.opts.forEach(a=>{let b=document.createElement('button');b.className='answer';b.textContent=a;b.onclick=()=>answer(a);$('#answers').appendChild(b)})}
async function answer(a){let q=questions[idx],ok=a===q.correct;$$('.answer').forEach(x=>x.disabled=true);$('#feedback').classList.remove('hidden');$('#feedback').classList.toggle('good',ok);$('#feedback').textContent=ok?'✨ ¡Correcto! +1 estrella':`💡 La respuesta correcta es: ${q.correct}`;if(ok)score++;try{if(db&&studentId)await db.collection('games').doc(game.code).collection('players').doc(studentId).update({score,answered:idx+1,lastSkill:q.skill})}catch(e){console.error(e)}setTimeout(async()=>{idx++;$('#feedback').classList.add('hidden');if(idx>=questions.length){show('finish');$('#finalScore').textContent=`⭐ ${score} / ${questions.length}`;$('#finalText').textContent=score===questions.length?'¡Misión perfecta! Excelente trabajo.':'¡Misión completada! Cada desafío te hace avanzar.';try{if(db&&studentId)await db.collection('games').doc(game.code).collection('players').doc(studentId).update({score,answered:questions.length,finished:true})}catch(e){console.error(e)}}else renderQ()},850)}
