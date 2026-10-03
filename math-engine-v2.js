/**
 * MATH LIVE ENGINE V2 — Compact K–5 curriculum + diagnostic engine
 * © 2026 Rene M. Velazquez Avila · Espacio de Aprendizaje — Segundo Grado · Todos los derechos reservados.
 *
 * IMPORTANT: standards are stored as portable reporting tags. A district/state crosswalk
 * can be substituted without changing generators. CORE/REVIEW eligibility is enforced here.
 */
(function(global){
"use strict";
const V="2.2.0";
const G=["K","1","2","3","4","5"];
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a, P=a=>a[R(0,a.length-1)];
const S=a=>{a=[...a];for(let i=a.length-1;i;i--){let j=R(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const U=a=>[...new Set(a.map(String))];
const META={
 0:[
  ["K.CC.A","Counting & Cardinality","Count to 10","count","recognize",1],
  ["K.CC.B","Counting & Cardinality","One-to-one counting","countObjects","represent",1],
  ["K.CC.C","Counting & Cardinality","Compare quantities within 10","compareSmall","reason",1],
  ["K.CC.B","Counting & Cardinality","One more/one less within 10","nextPrevious","apply",1],
  ["K.OA.A","Operations & Algebraic Thinking","Compose/decompose within 10","composeSmall","represent",2]
 ],
 1:[
  ["1.OA.A","Addition & Subtraction","Add within 10/20","addWithin20","procedure",2],
  ["1.OA.A","Addition & Subtraction","Missing part","missingPart","reason",2],
  ["1.OA.B","Addition & Subtraction","Count on","countOn","strategy",2],
  ["1.NBT.B","Number & Operations Base Ten","Compare two-digit numbers","compare2","reason",2],
  ["1.OA.B","Addition & Subtraction","Equivalent sums / commutative relationship","equivAdd","reason",3]
 ],
 2:[
  ["2.NBT.A","Place Value","Hundreds tens ones","placeValue","represent",2],
  ["2.NBT.A","Place Value","Standard/expanded/unit/word forms","numberForms","represent",2],
  ["2.NBT.A","Place Value","Compare three-digit numbers","compare3","reason",2],
  ["2.MD.A","Measurement","Measure/compare length in centimeters","measurement","apply",2],
  ["2.MD.B","Number Line","Add/subtract jumps on number line","numberLine","strategy",3],
  ["2.NBT.B","Addition & Subtraction","Add and subtract within grade range","addSubtract2","procedure",3],
  ["2.NBT.A","Place Value","Count money as place-value model","moneyPV","represent",2],
  ["2.NBT.A","Place Value","Round two-digit number to nearest ten","roundTens","reason",3],
  ["2.NBT.A","Place Value","Compose to next ten/hundred","makeTarget","strategy",3]
 ],
 3:[
  ["3.OA.A","Multiplication & Division","Equal groups","equalGroups","represent",2],
  ["3.OA.A","Multiplication & Division","Arrays","arrays","represent",2],
  ["3.OA.B","Multiplication & Division","Multiply units 2,3,4,5,10","multiply","procedure",2],
  ["3.OA.B","Multiplication & Division","Division as unknown factor","divide","reason",3],
  ["3.OA.B","Multiplication & Division","Missing factor","missingFactor","reason",3],
  ["3.OA.D","Problem Solving","One-step multiplication/division problem","wordProblemMD","apply",3],
  ["3.OA.B","Properties","Distributive reasoning","distributive","reason",4]
 ],
 4:[
  ["4.NBT.A","Place Value","Value of digits in multi-digit numbers","placeValueLarge","represent",2],
  ["4.NBT.A","Place Value","Compare multi-digit numbers","compareLarge","reason",2],
  ["4.NBT.A","Place Value","Round multi-digit numbers","roundLarge","reason",3],
  ["4.NBT.B","Addition & Subtraction","Multi-digit addition/subtraction","addSubtractLarge","procedure",3],
  ["4.NBT.A","Place Value","Multi-digit number forms","numberFormsLarge","represent",3],
  ["4.OA.A","Problem Solving","Multi-step whole-number reasoning","wordProblemAS","apply",4]
 ],
 5:[
  ["5.NBT.A","Place Value","Place-value relationships","placeValue5","reason",3],
  ["5.NBT.A","Powers of Ten","Multiply/divide by powers of 10","powersOfTen","reason",3],
  ["5.NBT.B","Whole Number Operations","Multi-digit multiplication","multiplyWhole","procedure",3],
  ["5.NBT.B","Whole Number Operations","Whole-number division","divideWhole","procedure",4],
  ["5.NBT.A","Place Value","Compare/interpret large numbers","compare5","reason",3],
  ["5.OA.A","Problem Solving","Multi-step whole-number problem","wordProblem5","apply",4]
 ]
};
const REVIEW={
 0:[],1:["count","compareSmall","composeSmall"],
 2:["countOn","missingPart","addWithin20","compare2"],
 3:["placeValue","numberForms","addSubtract2","numberLine"],
 4:["multiply","divide","arrays","missingFactor"],
 5:["placeValueLarge","roundLarge","addSubtractLarge","multiply","divide"]
};
function words(n){
 if(!Number.isInteger(n)||n<0||n>999999)return null;if(n===0)return"cero";
 const u=["","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],
 sp={10:"diez",11:"once",12:"doce",13:"trece",14:"catorce",15:"quince",16:"dieciséis",17:"diecisiete",18:"dieciocho",19:"diecinueve",20:"veinte",21:"veintiuno",22:"veintidós",23:"veintitrés",24:"veinticuatro",25:"veinticinco",26:"veintiséis",27:"veintisiete",28:"veintiocho",29:"veintinueve"},
 t=["","","veinte","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"],
 h=["","ciento","doscientos","trescientos","cuatrocientos","quinientos","seiscientos","setecientos","ochocientos","novecientos"];
 function q(x,apo=false){if(!x)return"";if(x===100)return"cien";let z="",H=Math.floor(x/100),r=x%100;if(H)z=h[H];if(r){if(z)z+=" ";if(r<10)z+=u[r];else if(sp[r])z+=sp[r];else{z+=t[Math.floor(r/10)];if(r%10)z+=" y "+u[r%10];}}if(apo){z=z.replace(/veintiuno$/,"veintiún").replace(/ y uno$/," y un").replace(/ uno$/," un");}return z}
 if(n<1000)return q(n);let th=Math.floor(n/1000),r=n%1000,z=th===1?"mil":q(th,true)+" mil";return(z+(r?" "+q(r):"")).trim()
}
function expanded(n){return String(n).split("").map((d,i,a)=>+d*10**(a.length-i-1)).filter(Boolean).join(" + ")||"0"}
function unit(n){let L=[["unidad","unidades"],["decena","decenas"],["centena","centenas"],["unidad de millar","unidades de millar"],["decena de millar","decenas de millar"],["centena de millar","centenas de millar"]];return String(n).split("").map(Number).reverse().map((d,i)=>d?`${d} ${d===1?L[i][0]:L[i][1]}`:null).filter(Boolean).reverse().join(" + ")}
function item(g,skill,prompt,answer,wrong,extra={}){
 let ans=String(answer),opts=U([answer,...wrong].filter(x=>x!==null&&x!==undefined));
 if(!Number.isNaN(Number(answer))){
   let a=Number(answer);
   for(let d=1;opts.length<4&&d<=20;d++)for(let v of [a-d,a+d,a+10*d])if(v>=0)opts=U([...opts,v]);
 }
 if(opts.length<2)opts=U([...opts,"Otra respuesta"]);
 return {grade:g,skill,prompt,answer:ans,options:S(opts.slice(0,4)),itemType:"singleChoice",...extra}
}
function gen(skill,g,review=false){
 const sourceGrade=review?Math.max(0,g-1):g;
 switch(skill){
 case"count":{let n=R(0,10);return item(g,skill,`Cuenta: ${"● ".repeat(n)||"(ningún objeto)"}`,n,[Math.max(0,n-1),Math.min(10,n+1),Math.max(0,n-2)],{sourceGrade})}
 case"countObjects":{let n=R(1,10);return item(g,skill,`¿Cuántos objetos hay? ${"★ ".repeat(n)}`,n,[Math.max(0,n-1),Math.min(10,n+1),Math.max(0,n-2)],{sourceGrade})}
 case"compareSmall":{let a=R(0,10),b=R(0,10);while(a===b)b=R(0,10);let z=a>b?">":"<";return item(g,skill,`${a} __ ${b}`,z,[z===">"?"<":">","="],{sourceGrade})}
 case"nextPrevious":{let n=R(1,9),next=Math.random()<.5,z=next?n+1:n-1;return item(g,skill,next?`¿Qué número viene después de ${n}?`:`¿Qué número viene antes de ${n}?`,z,[n,next?Math.max(0,n-1):n+1,next?Math.min(10,n+2):Math.max(0,n-2)],{sourceGrade})}
 case"composeSmall":{let z=R(3,10),a=R(0,z),b=z-a;return item(g,skill,`${a} y ${b} forman __`,z,[Math.max(0,z-1),Math.min(10,z+1),a],{sourceGrade})}
 case"countOn":{let a=R(1,12),j=R(2,5),z=a+j;return item(g,skill,`Empieza en ${a} y cuenta ${j} más. ¿Dónde terminas?`,z,[z-1,z+1,a],{sourceGrade})}
 case"addWithin20":{let a=R(0,10),b=R(0,10),z=a+b;return item(g,skill,`${a} + ${b} = __`,z,[Math.max(0,z-1),z+1,Math.abs(a-b)],{sourceGrade})}
 case"missingPart":{let z=R(5,20),a=R(0,z),b=z-a;return item(g,skill,`${a} + __ = ${z}`,b,[Math.max(0,b-1),b+1,a],{sourceGrade})}
 case"compare2":{let a=R(10,99),b=R(10,99);while(a===b)b=R(10,99);let z=a>b?">":"<";return item(g,skill,`${a} __ ${b}`,z,[z===">"?"<":">","="],{sourceGrade})}
 case"equivAdd":{let a=R(1,9),b=R(1,9),z=`${b} + ${a}`;return item(g,skill,`Selecciona una suma equivalente a ${a} + ${b}.`,z,[`${a} + ${Math.max(0,b-1)}`,`${b+1} + ${a}`,`${a} + ${b+1}`],{sourceGrade})}
 case"placeValue":{let n=R(100,999),p=P([0,1,2]),names=["centenas","decenas","unidades"],d=+String(n)[p],v=d*10**(2-p);return item(g,skill,`En ${n}, ¿cuál es el valor del dígito de las ${names[p]} (${d})?`,v,[d,d*10,d*100].filter(x=>x!==v),{sourceGrade})}
 case"numberForms":{let n=R(100,999),type=P(["expanded","words","unit"]),ans=type==="expanded"?expanded(n):type==="words"?words(n):unit(n),prompt=type==="expanded"?`Forma desarrollada de ${n}`:type==="words"?`Forma escrita de ${n}`:`Forma unitaria de ${n}`;return item(g,skill,prompt,ans,[n+1,Math.max(100,n-10),Math.max(100,n-100)].map(x=>type==="expanded"?expanded(x):type==="words"?words(x):unit(x)),{sourceGrade,representation:type})}
 case"compare3":{let a=R(100,999),b=R(100,999);while(a===b)b=R(100,999);let z=a>b?">":"<";return item(g,skill,`${a} __ ${b}`,z,[z===">"?"<":">","="],{sourceGrade})}
 case"measurement":{let a=R(5,90),b=R(5,90);while(a===b)b=R(5,90);let z=Math.abs(a-b);return item(g,skill,`Una cinta mide ${a} cm y otra ${b} cm. ¿Cuál es la diferencia de longitud?`,`${z} cm`,[`${z+1} cm`,`${Math.max(0,z-1)} cm`,`${a+b} cm`],{sourceGrade})}
 case"numberLine":{let start=R(100,850),step=P([1,10,100]),z=start+step;return item(g,skill,`En la recta numérica: ${start} → +${step} → __`,z,[Math.max(0,start-step),z+1,start],{sourceGrade})}
 case"moneyPV":{let h=R(1,9),t=R(0,9),o=R(0,9),z=100*h+10*t+o;return item(g,skill,`${h} billete(s) de $100, ${t} de $10 y ${o} de $1 representan:`,`$${z}`,[`$${z+10}`,`$${z+100}`,`$${Math.max(0,z-1)}`],{sourceGrade})}
 case"roundTens":{let n=R(10,99),z=Math.round(n/10)*10;return item(g,skill,`Redondea ${n} a la decena más cercana.`,z,[Math.floor(n/10)*10,Math.ceil(n/10)*10,n].filter(x=>x!==z),{sourceGrade})}
 case"makeTarget":{let n=R(101,899),target=Math.ceil(n/100)*100;if(target===n)target+=100;let z=target-n;return item(g,skill,`¿Cuánto falta de ${n} para llegar a ${target}?`,z,[Math.max(0,z-1),z+10,100-z],{sourceGrade})}
 case"addSubtract2":{let sub=Math.random()<.5,a=R(10,99),b=R(0,99);if(sub&&b>a)[a,b]=[b,a];let z=sub?a-b:a+b;return item(g,skill,`${a} ${sub?"−":"+"} ${b} = __`,z,[Math.max(0,z-1),z+1,sub?a+b:Math.abs(a-b)],{sourceGrade,operation:sub?"subtraction":"addition"})}
 case"equalGroups":{let a=P([2,3,4,5,10]),b=R(2,10),z=a*b;return item(g,skill,`Hay ${a} grupos con ${b} objetos en cada grupo. ¿Cuántos objetos hay?`,z,[a+b,z-a,z+a],{sourceGrade})}
 case"arrays":{let rows=P([2,3,4,5,10]),cols=R(2,10),z=rows*cols;return item(g,skill,`Un arreglo tiene ${rows} filas y ${cols} objetos en cada fila. ¿Cuántos objetos tiene?`,z,[rows+cols,z-rows,z+cols],{sourceGrade})}
 case"multiply":{let a=P([2,3,4,5,10]),b=R(1,10),z=a*b;return item(g,skill,`${a} × ${b} = __`,z,[z+a,Math.max(0,z-a),a+b],{sourceGrade})}
 case"divide":{let a=P([2,3,4,5,10]),b=R(1,10),p=a*b;return item(g,skill,`${p} ÷ ${a} = __`,b,[Math.max(0,b-1),b+1,a],{sourceGrade})}
 case"missingFactor":{let a=P([2,3,4,5,10]),b=R(1,10),p=a*b;return item(g,skill,`${a} × __ = ${p}`,b,[Math.max(0,b-1),b+1,a],{sourceGrade})}
 case"wordProblemMD":{let a=P([2,3,4,5,10]),b=R(2,10),z=a*b;return item(g,skill,`Hay ${a} cajas con ${b} lápices en cada caja. ¿Cuántos lápices hay en total?`,z,[a+b,z-a,z+a],{sourceGrade})}
 case"distributive":{let a=P([3,4,5,6,7,8,9]),b=P([3,4,5,6,7,8,9]),cut=P([1,2]),z=a*b,ans=`${a} × ${b-cut} + ${a} × ${cut}`;return item(g,skill,`¿Qué expresión descompone correctamente ${a} × ${b}?`,ans,[`${a} × ${b-cut} + ${cut}`,`${a+1} × ${b-cut}`,`${a} + ${b}`],{sourceGrade})}
 case"placeValueLarge":case"placeValue5":{let n=R(10000,999999),s=String(n),p=R(0,s.length-1),d=+s[p],v=d*10**(s.length-p-1);return item(g,skill,`En ${n.toLocaleString("en-US")}, el dígito ${d} está en la posición ${["centena de millar","decena de millar","unidad de millar","centena","decena","unidad"][6-s.length+p]}. ¿Cuál es su valor?`,v,[d,d*10,d*100,d*1000].filter(x=>x!==v),{sourceGrade})}
 case"compareLarge":case"compare5":{let a=R(10000,999999),b=R(10000,999999);while(a===b)b=R(10000,999999);let z=a>b?">":"<";return item(g,skill,`${a.toLocaleString("en-US")} __ ${b.toLocaleString("en-US")}`,z,[z===">"?"<":">","="],{sourceGrade})}
 case"roundLarge":{let n=R(1000,999999),p=P([10,100,1000,10000]),z=Math.round(n/p)*p;return item(g,skill,`Redondea ${n.toLocaleString("en-US")} al ${p.toLocaleString("en-US")} más cercano.`,z,[Math.floor(n/p)*p,Math.ceil(n/p)*p,n].filter(x=>x!==z),{sourceGrade})}
 case"addSubtractLarge":{let sub=Math.random()<.5,a=R(1000,99999),b=R(1000,99999);if(sub&&b>a)[a,b]=[b,a];let z=sub?a-b:a+b;return item(g,skill,`${a.toLocaleString("en-US")} ${sub?"−":"+"} ${b.toLocaleString("en-US")} = __`,z,[Math.max(0,z-10),z+10,sub?a+b:Math.abs(a-b)],{sourceGrade})}
 case"numberFormsLarge":{let n=R(10000,999999),type=P(["expanded","words"]),ans=type==="expanded"?expanded(n):words(n);return item(g,skill,type==="expanded"?`Forma desarrollada de ${n.toLocaleString("en-US")}`:`Forma escrita de ${n.toLocaleString("en-US")}`,ans,[n+1,n+10,Math.max(10000,n-100)].map(x=>type==="expanded"?expanded(x):words(x)),{sourceGrade})}
 case"wordProblemAS":{let a=R(1000,50000),b=R(100,5000),c=R(100,5000),z=a+b-c;return item(g,skill,`Una biblioteca tenía ${a.toLocaleString("en-US")} libros, recibió ${b.toLocaleString("en-US")} y prestó ${c.toLocaleString("en-US")}. ¿Cuántos quedan?`,z,[a+b+c,a-b+c,z+100],{sourceGrade})}
 case"powersOfTen":{let n=R(11,999),p=P([10,100,1000]),mul=Math.random()<.5,z=mul?n*p:n;return item(g,skill,mul?`${n} × ${p.toLocaleString("en-US")} = __`:`${(n*p).toLocaleString("en-US")} ÷ ${p.toLocaleString("en-US")} = __`,z,[z*10,Math.max(1,z/10),z+10],{sourceGrade})}
 case"multiplyWhole":{let a=R(100,9999),b=R(10,99),z=a*b;return item(g,skill,`${a.toLocaleString("en-US")} × ${b} = __`,z,[z+b,z+a,Math.max(0,z-10)],{sourceGrade})}
 case"divideWhole":{let d=R(10,99),q=R(10,999),p=d*q;return item(g,skill,`${p.toLocaleString("en-US")} ÷ ${d} = __`,q,[q-1,q+1,d],{sourceGrade})}
 case"wordProblem5":{let a=R(100,999),b=R(10,99),c=R(100,999),z=a*b-c;return item(g,skill,`Una escuela compra ${a} paquetes con ${b} hojas cada uno y usa ${c} hojas. ¿Cuántas quedan?`,z,[a*b+c,a+b-c,z+100],{sourceGrade})}
 default:throw Error("Unknown skill "+skill)
 }}
function coreMeta(g,skill){return META[g].find(x=>x[3]===skill)}
function reviewOrigin(g,skill){for(let x=g-1;x>=0;x--){if(META[x]&&META[x].some(m=>m[3]===skill))return x;}return Math.max(0,g-1)}
function validate(q){
 let e=[];if(!q||typeof q!=="object")return{valid:false,errors:["object"]};
 if(!q.prompt||!q.skill||q.answer===undefined)e.push("fields");
 if(/undefined|NaN|null/.test(JSON.stringify(q)))e.push("token");
 if(!Array.isArray(q.options)||q.options.length<2)e.push("options");
 if(U(q.options).length!==q.options.length)e.push("duplicate");
 if(!q.options.includes(String(q.answer)))e.push("answer-missing");
 if(q.grade===0&&/-\d/.test(q.prompt+" "+q.options.join(" ")))e.push("negative-K");
 if(q.grade<3&&/[×÷]/.test(q.prompt))e.push("future-operation");
 return{valid:!e.length,errors:e}
}
function blueprint(g,count=15){
 let core=META[g],rev=REVIEW[g],slots=[];
 count=Math.max(1,Number(count)||15);
 let coreN,reviewN,integrated;
 if(g===0){coreN=Math.max(1,Math.round(count*0.87));reviewN=0;integrated=count-coreN}else{coreN=Math.max(1,Math.round(count*0.67));reviewN=Math.max(1,Math.round(count*0.20));if(coreN+reviewN>=count)reviewN=Math.max(0,count-coreN-1);integrated=count-coreN-reviewN}
 let c=S(core);for(let i=0;i<coreN;i++){let m=c[i%c.length];slots.push({layer:"CORE",skill:m[3],standard:m[0],content:m[1],subskill:m[2],cognitive:m[4],difficulty:m[5],sourceGrade:g})}
 for(let i=0;i<reviewN;i++){let sk=rev[i%rev.length],sg=reviewOrigin(g,sk),m=META[sg].find(x=>x[3]===sk);slots.push({layer:"REVIEW",skill:sk,standard:m?.[0]||"PREREQ",content:m?.[1]||"Prerequisite",subskill:m?.[2]||sk,cognitive:m?.[4]||"review",difficulty:m?.[5]||1,sourceGrade:sg})}
 for(let i=0;i<integrated;i++){let m=P(core);slots.push({layer:"APPLICATION",skill:m[3],standard:m[0],content:m[1],subskill:m[2],cognitive:"apply/reason",difficulty:Math.min(4,m[5]+1),sourceGrade:g})}
 return S(slots).slice(0,count).map((x,i)=>({...x,challenge:i+1}))
}
function generateFromSlot(displayGrade,slot){
 let q=gen(slot.skill,slot.sourceGrade,false);
 q={...q,...slot,grade:displayGrade,diagnosticKey:`${slot.standard}|${slot.content}|${slot.subskill}`};
 let v=validate(q);
 if(!v.valid)throw Error("Validation failed "+slot.skill+": "+v.errors.join(","));
 return q;
}
function createGameBlueprint(g,count=15){g=Number(g);return blueprint(g,count).map(x=>({...x,gameGrade:g}))}
function createStudentSet(bp,studentId="student"){return bp.map(s=>({...generateFromSlot(s.gameGrade,s),studentId}))}
function diagnose(responses){
 let buckets={};for(let r of responses){let q=r.question,key=q.diagnosticKey||(q.standard+"|"+q.subskill);if(!buckets[key])buckets[key]={standard:q.standard,content:q.content,subskill:q.subskill,total:0,correct:0};buckets[key].total++;if(r.correct)buckets[key].correct++}
 return Object.values(buckets).map(x=>{let rate=x.correct/x.total,status=x.total<2?"Evidencia limitada":rate>=.8?"Fortaleza":rate>=.6?"En desarrollo":"Necesita apoyo";return{...x,rate:Math.round(rate*100),status}})
}
function audit(gamesPerGrade=100){
 let out=[];for(let g=0;g<6;g++){let errors=[],n=0;for(let k=0;k<gamesPerGrade;k++){try{let bp=createGameBlueprint(g,15),set=createStudentSet(bp,"audit");for(let q of set){n++;let v=validate(q);if(!v.valid)errors.push({skill:q.skill,e:v.errors});if(q.layer==="REVIEW"&&q.sourceGrade>=g)errors.push({skill:q.skill,e:["review-not-prior"]});if(q.grade!==g)errors.push({skill:q.skill,e:["grade"]})}}catch(e){errors.push({e:[e.message]})}}out.push({grade:G[g],questions:n,failures:errors.length,sample:errors.slice(0,5)})}return out
}
global.MathLiveEngineV2=Object.freeze({VERSION:V,META,REVIEW,createGameBlueprint,createStudentSet,validateQuestion:validate,diagnose,audit,utilities:{numberToSpanish:words,expandedForm:expanded,unitForm:unit}});
})(typeof window!=="undefined"?window:globalThis);
