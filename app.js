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
const gameTypes=[
 ['integrated','🌟','Modo Integrado','Activo · combina automáticamente'],
 ['challenge','⚡','Reto rápido','Incluido en el modo integrado'],
 ['discover','🔎','Descubre','Incluido progresivamente'],
 ['memory','🃏','Memoria','Incluido progresivamente'],
 ['crossword','✏️','Crucigrama','Incluido progresivamente'],
 ['build','🧩','Construye','Incluido progresivamente']
];
let selectedGrade='2',selectedTopic='place',selectedGame='integrated',game=null,idx=0,score=0,questions=[],studentId=null,unsubs=[],currentUser=null;
const engine=window.MathLiveEngineV2; let responses=[];
if(!engine) console.error('Math Live Engine V2 no está disponible.');

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
function netMsg(){return db&&auth?'Firebase conectado ✓':'Firebase pendiente de configuración'}

function renderGrades(){
 const order=['K','1','2','3','4','5'];
 $('#grades').innerHTML=order.map(k=>{const v=curriculum[k];return `<button class="grade ${k===selectedGrade?'active':''}" data-g="${k}" aria-pressed="${k===selectedGrade}"><strong>${k}</strong>${v.name}<small>${v.tag}</small></button>`}).join('');
 $$('.grade').forEach(b=>b.onclick=()=>{selectedGrade=b.dataset.g;selectedTopic=curriculum[selectedGrade].topics[0][0];renderGrades();renderTopics();summary()});
}
function renderTopics(){let c=curriculum[selectedGrade];$('#contentTitle').textContent=`Contenido de ${c.name}`;$('#topics').innerHTML=c.topics.map(t=>`<button class="topic ${t[0]===selectedTopic?'active':''}" data-t="${t[0]}">${t[1]} ${t[2]}</button>`).join('');$$('.topic').forEach(b=>b.onclick=()=>{selectedTopic=b.dataset.t;renderTopics();summary()})}
function renderGames(){
 $('#games').innerHTML=gameTypes.map(g=>{
   const active=g[0]==='integrated';
   return `<button class="game ${active?'active':''} ${active?'':'soon'}" data-game="${g[0]}" ${active?'':'disabled'} aria-pressed="${active}">${g[1]}<b>${g[2]}</b><small>${g[3]}</small></button>`;
 }).join('');
}
function summary(){
 let c=curriculum[selectedGrade];
 $('#setupSummary').innerHTML=`<strong>${c.name}</strong> · 🌟 Modo Integrado · ${$('#qcount').value} desafíos<br><span class="small">CORE + REVIEW + APPLICATION · preguntas equivalentes y diferentes por estudiante · ${netMsg()}</span>`;
}
renderGrades();renderTopics();renderGames();summary();$('#qcount').onchange=summary;
function code(){return String(Math.floor(100000+Math.random()*900000))}
function esc(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function cleanup(){unsubs.forEach(f=>{try{f()}catch(e){}});unsubs=[]}
async function uniqueCode(){for(let i=0;i<8;i++){let c=code(),s=await db.collection('games').doc(c).get();if(!s.exists)return c}throw new Error('No se pudo generar un código. Intenta nuevamente.')}

$('#createGame').onclick=async()=>{
 try{
  if(!db||!auth){alert('Firebase todavía no está conectado. Completa firebase-config.js antes de crear una partida.');return}
  const user=await ensureAuth();
  let c=curriculum[selectedGrade],newCode=await uniqueCode();
  if(!engine) throw new Error('Math Live Engine V2 no está cargado.');
  const count=+$('#qcount').value, blueprint=engine.createGameBlueprint(selectedGrade,count);
  game={code:newCode,teacherUid:user.uid,grade:selectedGrade,gradeName:c.name,topic:'integrated',topicName:'Modo Integrado',gameType:'integrated',gameName:'Modo Integrado',count,mode:$('#mode').value,engineVersion:engine.VERSION,blueprint,status:'lobby',createdAt:firebase.firestore.FieldValue.serverTimestamp()};
  await db.collection('games').doc(newCode).set(game);
  $('#gameCode').textContent=newCode;$('#gameSummary').textContent=`${game.gradeName} · ${game.topicName} · ${game.count} desafíos`;show('teacherLobby');listenTeacher(newCode);
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

function startPlay(){
 if(!engine){alert('No se pudo cargar el motor matemático.');return}
 const bp=Array.isArray(game?.blueprint)&&game.blueprint.length?game.blueprint:engine.createGameBlueprint(game?.grade||2,game?.count||15);
 questions=engine.createStudentSet(bp,studentId||'student'); idx=0; score=0; responses=[];
 $('#playGrade').textContent=game?.gradeName||''; show('play'); renderQ();
}
function renderQ(){
 const q=questions[idx]; $('#progress').textContent=`${idx+1} / ${questions.length}`; $('#score').textContent=score;
 $('#skillLabel').textContent=`${q.content} · ${q.subskill} · ${q.layer}`; $('#question').style.whiteSpace='pre-line'; $('#question').textContent=q.prompt; $('#answers').innerHTML='';
 q.options.forEach(a=>{const b=document.createElement('button');b.className='answer';b.textContent=a;b.onclick=()=>answer(String(a));$('#answers').appendChild(b)});
}
async function answer(a){
 const q=questions[idx],ok=String(a)===String(q.answer); $$('.answer').forEach(x=>x.disabled=true);
 $('#feedback').classList.remove('hidden'); $('#feedback').classList.toggle('good',ok);
 $('#feedback').textContent=ok?'✨ ¡Correcto! +1 estrella':`💡 La respuesta correcta es: ${q.answer}`; if(ok)score++;
 responses.push({question:q,correct:ok,selected:String(a)});
 const evidence={challenge:q.challenge,standard:q.standard,content:q.content,subskill:q.subskill,skill:q.skill,layer:q.layer,cognitive:q.cognitive,difficulty:q.difficulty,correct:ok};
 try{if(db&&studentId)await db.collection('games').doc(game.code).collection('players').doc(studentId).update({score,answered:idx+1,lastSkill:q.skill,lastStandard:q.standard,lastLayer:q.layer,evidence:firebase.firestore.FieldValue.arrayUnion(evidence)})}catch(e){console.error(e)}
 setTimeout(async()=>{idx++;$('#feedback').classList.add('hidden');
  if(idx>=questions.length){const diagnostic=engine.diagnose(responses);show('finish');$('#finalScore').textContent=`⭐ ${score} / ${questions.length}`;$('#finalText').textContent=score===questions.length?'¡Misión perfecta! Excelente trabajo.':'¡Misión completada! Cada desafío te hace avanzar.';
   try{if(db&&studentId)await db.collection('games').doc(game.code).collection('players').doc(studentId).update({score,answered:questions.length,finished:true,finishedAt:firebase.firestore.FieldValue.serverTimestamp(),diagnostic})}catch(e){console.error(e)}
  }else renderQ();
 },850);
}
