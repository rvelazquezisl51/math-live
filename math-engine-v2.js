/**
 * MATH LIVE ENGINE V2 — Compact K–5 curriculum + diagnostic engine
 * © 2026 Rene M. Velazquez Avila · Espacio de Aprendizaje — Segundo Grado · Todos los derechos reservados.
 *
 * IMPORTANT: standards are stored as portable reporting tags. A district/state crosswalk
 * can be substituted without changing generators. CORE/REVIEW eligibility is enforced here.
 */
(function(global){
"use strict";
const V="2.7.0-v64-varied-interactions";
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
  ["2.MD.D.10","Data","Read and represent data in bar graphs","barGraph","represent",2],
  ["2.MD.A.1","Measurement","Measure length in centimeters","measurement","apply",2],
  ["2.MD.A.2","Measurement","Compare measurements and unit size","compareMeasure","reason",3],
  ["2.MD.B.6","Number Line","Use measurement/number line to add and find distance","numberLine","strategy",3],
  ["2.NBT.A.1","Place Value","Hundreds tens ones","placeValue","represent",2],
  ["2.NBT.A.2","Place Value","Count by ones tens and hundreds to 1,000","countPlaceValue","strategy",2],
  ["2.NBT.A.3","Place Value","Standard expanded unit and word forms","numberForms","represent",2],
  ["2.NBT.A.1","Place Value","Compose and decompose with regrouping","regroupPV","reason",3],
  ["2.NBT.A.1","Place Value","Interpret non-standard decompositions","nonStandardPV","reason",3],
  ["2.NBT.A.4","Place Value","Compare three-digit numbers and equivalent forms","compare3","reason",3],
  ["2.NBT.A","Place Value","Count $1 $10 and $100 as place-value models","moneyPV","represent",2],
  ["2.NBT.A","Place Value","Round two-digit numbers to nearest ten on number line","roundTens","reason",3],
  ["2.NBT.A","Number Line","Plot and compare numbers in different forms","plotForms","reason",3],
  ["2.NBT.A.3","Place Value","Build standard form from expanded parts","buildNumberCards","represent",2],
  ["2.NBT.A.3","Place Value","Match equivalent number representations","matchPairs","represent",3]
 ],
 3:[
  ["2.NBT.A.2","Foundational Review","Organize count and represent a collection","organizeCollection","represent",2],
  ["3.OA.A.1","Multiplication","Interpret equal groups as multiplication","equalGroups","represent",2],
  ["3.OA.A.1","Multiplication","Relate multiplication to arrays","arrays","represent",2],
  ["3.OA.A.1","Multiplication","Interpret factors as groups and group size","factorMeaning","reason",3],
  ["3.OA.A.3","Problem Solving","Represent multiplication problems with drawings and equations","wordProblemMD","apply",3],
  ["3.OA.A.2","Division","Division as unknown group size","divideShare","represent",3],
  ["3.OA.A.2","Division","Division as unknown number of groups","divideGroup","represent",3],
  ["3.OA.B.5","Properties","Commutative property with arrays","commutative","reason",3],
  ["3.OA.B.5","Properties","Distributive property with arrays","distributive","reason",4],
  ["3.OA.B.6","Multiplication & Division","Division as unknown factor","missingFactor","reason",3],
  ["3.OA.C.7","Fluency","Multiply/divide with units 2 3 4 5 and 10","multiply","procedure",2],
  ["3.OA.D.8","Problem Solving","One- and two-step multiplication/division reasoning","twoStepMD","apply",4],
  ["3.OA.A.1","Multiplication","Match models equations and products","matchPairs","represent",3]
 ],
 4:[
  ["4.NBT.A","Place Value","Value of digits in multi-digit numbers","placeValueLarge","represent",2],
  ["4.NBT.A","Place Value","Compare multi-digit numbers","compareLarge","reason",2],
  ["4.NBT.A","Place Value","Round multi-digit numbers","roundLarge","reason",3],
  ["4.NBT.B","Addition & Subtraction","Multi-digit addition/subtraction","addSubtractLarge","procedure",3],
  ["4.NBT.A","Place Value","Multi-digit number forms","numberFormsLarge","represent",3],
  ["4.OA.A","Problem Solving","Multi-step whole-number reasoning","wordProblemAS","apply",4],
  ["4.NBT.A","Place Value","Build and match equivalent multi-digit forms","matchPairs","represent",3],
  ["4.NBT.A","Place Value","Build standard form from expanded parts","buildNumberCards","represent",3]
 ],
 5:[
  ["5.NBT.A","Place Value","Place-value relationships","placeValue5","reason",3],
  ["5.NBT.A","Powers of Ten","Multiply/divide by powers of 10","powersOfTen","reason",3],
  ["5.NBT.B","Whole Number Operations","Multi-digit multiplication","multiplyWhole","procedure",3],
  ["5.NBT.B","Whole Number Operations","Whole-number division","divideWhole","procedure",4],
  ["5.NBT.A","Place Value","Compare/interpret large numbers","compare5","reason",3],
  ["5.OA.A","Problem Solving","Multi-step whole-number problem","wordProblem5","apply",4],
  ["5.NBT.A","Place Value","Match equivalent large-number representations","matchPairs","reason",4],
  ["5.NBT.A","Place Value","Build standard form from expanded parts","buildNumberCards","represent",3]
 ]
};
const REVIEW={
 0:[],1:["count","compareSmall","composeSmall"],
 2:["countOn","missingPart","addWithin20","compare2"],
 3:["placeValue","numberForms","regroupPV","numberLine"],
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
 case"count":{let n=R(1,10);return item(g,skill,"Cuenta los objetos.",n,[Math.max(0,n-1),Math.min(10,n+1),Math.max(0,n-2)],{sourceGrade,representation:{type:"objectSet",count:n,layout:P(["row","scattered","fiveGroup"]),object:P(["circle","star","apple"])},audioPrompt:"Cuenta los objetos. Toca la respuesta correcta.",promptEn:"Count the objects.",audioPromptEn:"Count the objects. Tap the correct answer."})}
 case"countObjects":{let n=R(1,10);return item(g,skill,"¿Cuántos hay?",n,[Math.max(0,n-1),Math.min(10,n+1),Math.max(0,n-2)],{sourceGrade,representation:{type:"touchCount",count:n,layout:P(["row","scattered","fiveGroup"]),object:P(["circle","star","apple"])},audioPrompt:"Toca cada objeto mientras cuentas. Después elige cuántos hay.",promptEn:"How many are there?",audioPromptEn:"Touch each object as you count. Then choose how many there are."})}
 case"compareSmall":{let mode=P(["more","less","same"]),a=R(1,10),b=mode==="same"?a:R(1,10);if(mode!=="same")while(a===b)b=R(1,10);let z=mode==="same"?"Tienen igual":mode==="more"?(a>b?"Izquierda":"Derecha"):(a<b?"Izquierda":"Derecha");let es=mode==="more"?"¿Qué grupo tiene MÁS?":mode==="less"?"¿Qué grupo tiene MENOS?":"¿Los dos grupos tienen la MISMA cantidad?";let en=mode==="more"?"Which group has MORE?":mode==="less"?"Which group has LESS?":"Do both groups have the SAME number?";return item(g,skill,es,z,["Izquierda","Derecha","Tienen igual"].filter(x=>x!==z),{sourceGrade,representation:{type:"compareSets",left:a,right:b,object:P(["circle","star","apple"])},audioPrompt:es+" Toca tu respuesta.",promptEn:en,audioPromptEn:en+" Tap your answer."})}
 case"nextPrevious":{let n=R(1,9),next=Math.random()<.5,z=next?n+1:n-1;return item(g,skill,next?"¿Qué número viene después?":"¿Qué número viene antes?",z,[n,next?Math.max(0,n-1):n+1,next?Math.min(10,n+2):Math.max(0,n-2)],{sourceGrade,representation:{type:"numberPath",center:n,direction:next?"next":"previous"},audioPrompt:next?`Mira el ${n}. ¿Qué número viene después?`:`Mira el ${n}. ¿Qué número viene antes?`,promptEn:next?"What number comes next?":"What number comes before?",audioPromptEn:next?`Look at ${n}. What number comes next?`:`Look at ${n}. What number comes before?`})}
 case"composeSmall":{let z=R(3,10),a=R(1,z-1),b=z-a;return item(g,skill,"Junta los dos grupos. ¿Cuántos hay en total?",z,[Math.max(0,z-1),Math.min(10,z+1),a],{sourceGrade,representation:{type:"joinSets",left:a,right:b,total:z,object:P(["circle","star","apple"])},audioPrompt:"Junta los dos grupos. ¿Cuántos objetos hay en total?",promptEn:"Join the two groups. How many are there altogether?",audioPromptEn:"Join the two groups. How many objects are there altogether?"})}
 case"countOn":{let a=R(1,12),j=R(1,5),z=a+j;return item(g,skill,`Empieza en ${a}. Cuenta ${j} más.`,z,[z-1,z+1,a],{sourceGrade,representation:{type:"numberLineJumps",start:a,jumps:Array(j).fill(1),end:z,min:Math.max(0,a-1),max:Math.min(20,z+1)},audioPrompt:`Empieza en ${a}. Da ${j} saltos hacia adelante. ¿Dónde terminas?`,promptEn:`Start at ${a}. Count ${j} more.`,audioPromptEn:`Start at ${a}. Make ${j} jumps forward. Where do you land?`})}
 case"addWithin20":{let a=R(1,10),b=R(1,Math.min(10,20-a)),z=a+b;return item(g,skill,"¿Cuántos hay en total?",z,[Math.max(0,z-1),z+1,Math.abs(a-b)],{sourceGrade,representation:{type:"tenFrameAdd",a,b,total:z},audioPrompt:`Hay ${a}. Agrega ${b} más. ¿Cuántos hay en total?`,promptEn:"How many are there altogether?",audioPromptEn:`There are ${a}. Add ${b} more. How many are there altogether?`})}
 case"missingPart":{let z=R(5,20),a=R(1,z-1),b=z-a;return item(g,skill,`Hay ${a}. Queremos llegar a ${z}. ¿Cuántos faltan?`,b,[Math.max(0,b-1),b+1,a],{sourceGrade,representation:{type:"tenFrameMissing",shown:a,target:z,missing:b},audioPrompt:`Hay ${a}. Queremos llegar a ${z}. ¿Cuántos faltan?`,promptEn:`There are ${a}. We want ${z}. How many are missing?`,audioPromptEn:`There are ${a}. We want to get to ${z}. How many are missing?`})}
 case"compare2":{let a=R(10,99),b=R(10,99);while(a===b)b=R(10,99);let z=a>b?"Izquierda":"Derecha";return item(g,skill,"¿Qué número es MAYOR?",z,[z==="Izquierda"?"Derecha":"Izquierda","Son iguales"],{sourceGrade,representation:{type:"baseTenCompare",left:a,right:b},audioPrompt:`Compara ${a} y ${b}. ¿Qué número es mayor?`,promptEn:"Which number is GREATER?",audioPromptEn:`Compare ${a} and ${b}. Which number is greater?`})}
 case"equivAdd":{let a=R(1,9),b=R(1,9),z=`${b} + ${a}`;return item(g,skill,"Mira los dos grupos. Elige otra suma que tenga la misma cantidad.",z,[`${a} + ${Math.max(0,b-1)}`,`${b+1} + ${a}`,`${a} + ${b+1}`],{sourceGrade,representation:{type:"equivalentGroups",a,b,total:a+b},audioPrompt:`Mira ${a} y ${b}. Elige otra suma que forme la misma cantidad.`,promptEn:"Choose another addition that makes the same total.",audioPromptEn:`Look at ${a} and ${b}. Choose another addition that makes the same total.`})}
 case"barGraph":{let cats=["A","B","C"],vals=[R(2,8),R(2,8),R(2,8)],i=R(0,2),z=vals[i];return item(g,skill,`Mira la gráfica. ¿Cuántos hay en la categoría ${cats[i]}?`,z,[Math.max(0,z-1),z+1,vals[(i+1)%3]],{sourceGrade,representation:{type:"barGraph",labels:cats,values:vals,focus:i},audioPrompt:`Mira la gráfica de barras. ¿Cuántos hay en la categoría ${cats[i]}?`,promptEn:`Look at the graph. How many are in category ${cats[i]}?`,audioPromptEn:`Look at the bar graph. How many are in category ${cats[i]}?`})}
 case"measurement":{let len=R(3,25);return item(g,skill,"Mide la longitud usando la regla.",len,[len-1,len+1,len+2],{sourceGrade,representation:{type:"ruler",start:0,end:len,max:30},audioPrompt:"Mira dónde empieza y termina el objeto en la regla. ¿Cuántos centímetros mide?",promptEn:"Measure the length using the ruler.",audioPromptEn:"Look where the object starts and ends on the ruler. How many centimeters long is it?"})}
 case"compareMeasure":{let a=R(4,25),b=R(4,25);while(a===b)b=R(4,25);let z=Math.abs(a-b);return item(g,skill,`¿Cuántos centímetros más largo es el objeto mayor?`,z,[Math.max(0,z-1),z+1,a+b],{sourceGrade,representation:{type:"compareRulers",a,b,max:30},audioPrompt:"Compara las dos longitudes. ¿Cuántos centímetros más largo es el objeto mayor?",promptEn:"How many centimeters longer is the longer object?",audioPromptEn:"Compare the two lengths. How many centimeters longer is the longer object?"})}
 case"placeValue":{let n=R(100,999),h=Math.floor(n/100),t=Math.floor(n/10)%10,o=n%10,p=P(["hundreds","tens","ones"]),z=p==="hundreds"?h*100:p==="tens"?t*10:o;return item(g,skill,"Usa la tabla de valor posicional. ¿Cuál es el valor de la columna señalada?",z,[p==="hundreds"?h:t,p==="tens"?t:o,z+10],{sourceGrade,representation:{type:"placeValueChart",hundreds:h,tens:t,ones:o,focus:p},audioPrompt:"Mira las centenas, decenas y unidades. Encuentra el valor de la columna señalada.",promptEn:"Use the place-value chart. What is the value of the highlighted column?",audioPromptEn:"Look at the hundreds, tens, and ones. Find the value of the highlighted column."})}
 case"countPlaceValue":{let start=R(100,750),step=P([1,10,100]),z=start+step;return item(g,skill,`Cuenta ${step===1?"una unidad":step===10?"una decena":"una centena"} más desde ${start}.`,z,[z-step*2,z+step,start],{sourceGrade,representation:{type:"placeValueCount",start,step,end:z},audioPrompt:`Empieza en ${start}. Cuenta ${step} más. ¿A qué número llegas?`,promptEn:`Start at ${start}. Count ${step} more.`,audioPromptEn:`Start at ${start}. Count ${step} more. What number do you reach?`})}
 case"numberForms":{let n=R(100,999),type=P(["expanded","words","unit"]),ans=type==="expanded"?expanded(n):type==="words"?words(n):unit(n),prompt=type==="expanded"?`Construye la forma desarrollada de ${n}.`:type==="words"?`Elige la forma escrita de ${n}.`:`Construye la forma unitaria de ${n}.`;return item(g,skill,prompt,ans,[n+1,Math.max(100,n-10),Math.max(100,n-100)].map(x=>type==="expanded"?expanded(x):type==="words"?words(x):unit(x)),{sourceGrade,representation:{type:"placeValueChart",hundreds:Math.floor(n/100),tens:Math.floor(n/10)%10,ones:n%10},audioPrompt:prompt,promptEn:type==="expanded"?`Build the expanded form of ${n}.`:type==="words"?`Choose the word form of ${n}.`:`Build the unit form of ${n}.`,audioPromptEn:type==="expanded"?`Build the expanded form of ${n}.`:type==="words"?`Choose the word form of ${n}.`:`Build the unit form of ${n}.`})}
 case"regroupPV":{let h=R(1,6),t=R(1,8),o=R(0,9),z=h*100+t*10+o;let h2=h,t2=t+10;h2--;return item(g,skill,"Reagrupa. ¿Qué número representa la tabla?",z,[z+10,z-10,z+100],{sourceGrade,representation:{type:"regroupChart",hundreds:h2,tens:t2,ones:o,action:"10 tens = 1 hundred"},audioPrompt:"La tabla tiene más de nueve decenas. Reagrupa diez decenas como una centena. ¿Qué número representa?",promptEn:"Regroup. What number does the chart represent?",audioPromptEn:"The chart has more than nine tens. Regroup ten tens as one hundred. What number does it represent?"})}
 case"nonStandardPV":{let h=R(1,6),t=R(0,8),o=R(10,19),z=h*100+t*10+o;return item(g,skill,"Esta representación tiene más de 9 unidades. ¿Qué número representa?",z,[z-10,z+10,h*100+t*10+(o%10)],{sourceGrade,representation:{type:"regroupChart",hundreds:h,tens:t,ones:o,action:"10 ones = 1 ten"},audioPrompt:"Cuenta el valor total. Puedes cambiar diez unidades por una decena. ¿Qué número representa?",promptEn:"This representation has more than 9 ones. What number does it represent?",audioPromptEn:"Find the total value. You may trade ten ones for one ten. What number does it represent?"})}
 case"compare3":{let a=R(100,999),b=R(100,999);while(a===b)b=R(100,999);let z=a>b?">":"<";return item(g,skill,"Compara las dos representaciones.",z,[z===">"?"<":">","="],{sourceGrade,representation:{type:"comparePlaceValue",left:a,right:b},audioPrompt:`Compara ${a} y ${b}. Elige mayor que o menor que.`,promptEn:"Compare the two representations.",audioPromptEn:`Compare ${a} and ${b}. Choose greater than or less than.`})}
 case"moneyPV":{let h=R(1,6),t=R(0,9),o=R(0,9),z=h*100+t*10+o;return item(g,skill,"Cuenta los billetes como centenas, decenas y unidades.",z,[z+10,Math.max(0,z-10),z+100],{sourceGrade,representation:{type:"moneyPV",hundreds:h,tens:t,ones:o},audioPrompt:"Cuenta los billetes de cien, diez y uno. ¿Cuál es el total?",promptEn:"Count the bills as hundreds, tens, and ones.",audioPromptEn:"Count the hundred, ten, and one dollar bills. What is the total?"})}
 case"numberLine":{let start=R(100,750),step=P([10,20,50,100]),sub=Math.random()<.35,end=sub?Math.max(0,start-step):start+step,delta=end-start;return item(g,skill,"Sigue el salto en la recta numérica. ¿Dónde termina?",end,[start,Math.max(0,end-10),end+10],{sourceGrade,representation:{type:"numberLineArc",start,end,delta,direction:delta>=0?"add":"subtract"},audioPrompt:`Empieza en ${start}. Sigue el salto ${delta>=0?"hacia adelante":"hacia atrás"} de ${Math.abs(delta)}. ¿Dónde terminas?`,promptEn:"Follow the jump on the number line. Where does it end?",audioPromptEn:`Start at ${start}. Follow the ${Math.abs(delta)} jump ${delta>=0?"forward":"backward"}. Where do you land?`})}
 case"roundTens":{let n=R(10,99),z=Math.round(n/10)*10;return item(g,skill,"Usa la recta vertical para redondear a la decena más cercana.",z,[Math.floor(n/10)*10,Math.ceil(n/10)*10,n].filter(x=>x!==z),{sourceGrade,representation:{type:"verticalRound",number:n,low:Math.floor(n/10)*10,high:Math.ceil(n/10)*10},audioPrompt:`Ubica ${n} entre sus dos decenas. ¿A cuál está más cerca?`,promptEn:"Use the vertical number line to round to the nearest ten.",audioPromptEn:`Place ${n} between its two tens. Which ten is closer?`})}
 case"plotForms":{let a=R(100,899),b=a+P([10,20,50,100]),z=b;return item(g,skill,"Mira las dos formas. ¿Qué número debe ir en el punto señalado?",z,[a,b+10,Math.max(0,b-10)],{sourceGrade,representation:{type:"plotForms",start:a,end:b,startForm:expanded(a),endForm:unit(b)},audioPrompt:"Relaciona las formas del número con su lugar en la recta. ¿Qué número falta?",promptEn:"Look at the two forms. What number belongs at the marked point?",audioPromptEn:"Connect the number forms to their places on the number line. What number is missing?"})}
 case"buildNumberCards":{let lo=g===2?100:g===3?1000:10000,hi=g===2?999:g===3?9999:999999,n=R(lo,hi),parts=String(n).split("").map((d,i,a)=>+d*10**(a.length-i-1)).filter(Boolean),wrong=[n+10,Math.max(lo,n-10),n+100];return item(g,skill,"Une las tarjetas de valor y forma el número estándar.",n,wrong,{sourceGrade,standard:g===2?"2.NBT.A.3":g===3?"3.NBT.A":""+g+".NBT.A",content:"Place Value",subskill:"Forma desarrollada → estándar",cognitive:"represent",representation:{type:"buildNumberCards",parts,number:n},audioPrompt:"Mira las tarjetas. Suma sus valores y encuentra la forma estándar.",promptEn:"Use the value cards to build the standard form.",audioPromptEn:"Look at the cards. Add their values and find the standard form."})}
 case"matchPairs":{let pairs=[];if(g===2){let nums=S([213,248,342,429,457,485,526,631]).slice(0,4);pairs=nums.map(n=>({left:unit(n),right:String(n)}))}else if(g===3){let facts=S([[2,6],[3,4],[4,5],[5,6],[10,4],[3,7]]).slice(0,4);pairs=facts.map(([a,b])=>({left:`${a} grupos de ${b}`,right:`${a} × ${b} = ${a*b}`}))}else{let lo=g===4?1000:10000,hi=g===4?9999:999999,nums=Array.from({length:4},()=>R(lo,hi));pairs=nums.map(n=>({left:expanded(n),right:String(n)}))}let left=S(pairs.map((x,i)=>({text:x.left,pair:i}))),right=S(pairs.map((x,i)=>({text:x.right,pair:i})));return {grade:g,skill,prompt:"Enlaza las representaciones equivalentes.",promptEn:"Match the equivalent representations.",audioPrompt:"Elige una tarjeta de la izquierda y encuentra su pareja a la derecha.",audioPromptEn:"Choose a card on the left and find its matching card on the right.",answer:"__pairs__",options:[],itemType:"pairs",sourceGrade,standard:g===2?"2.NBT.A.3":g===3?"3.OA.A.1":`${g}.NBT.A`,content:g===3?"Multiplication":"Place Value",subskill:"Representaciones equivalentes",cognitive:"represent",difficulty:Math.min(4,g),representation:{type:"matchPairs",left,right,pairs:pairs.length}}}
 case"memoryMath":{let pairs=[],std="K.CC.B",content="Counting & Cardinality",sub="Match quantity and numeral";if(g===0){let nums=S([1,2,3,4,5,6,7,8,9,10]).slice(0,4);pairs=nums.map(n=>[{kind:"objects",value:n,label:n+" objetos"},{kind:"text",value:String(n),label:String(n)}]);std="K.CC.B";sub="Cantidad ↔ numeral"}else if(g===1){let nums=S([5,6,7,8,9,10,11,12,13,14]).slice(0,5);pairs=nums.map(n=>[{kind:"dots",value:n,label:n+" puntos"},{kind:"text",value:String(n),label:String(n)}]);std="1.OA.B";content="Addition & Number Sense";sub="Representación ↔ número"}else if(g===2){let nums=S([124,236,342,415,527,631,748,852]).slice(0,6);pairs=nums.map(n=>[{kind:"text",value:expanded(n),label:expanded(n)},{kind:"text",value:String(n),label:String(n)}]);std="2.NBT.A.3";content="Place Value";sub="Forma desarrollada ↔ estándar"}else if(g===3){let facts=S([[2,4],[3,4],[5,3],[4,4],[2,5],[3,5],[4,5],[5,5],[10,2]]).slice(0,7);pairs=facts.map(([a,b])=>[{kind:"text",value:`${a} × ${b}`,label:`${a} × ${b}`},{kind:"text",value:String(a*b),label:String(a*b)}]);std="3.OA.A.1";content="Multiplication";sub="Expresión ↔ producto"}else if(g===4){let nums=S([1200,2400,3600,4500,5200,6300,7400,8100,9200]).slice(0,8);pairs=nums.map(n=>[{kind:"text",value:expanded(n),label:expanded(n)},{kind:"text",value:String(n),label:String(n)}]);std="4.NBT.A";content="Place Value";sub="Representaciones equivalentes"}else{let facts=S([[3,100],[42,10],[7,1000],[56,100],[9,10000],[81,10],[25,1000],[64,100],[12,10000],[37,10]]).slice(0,9);pairs=facts.map(([a,b])=>[{kind:"text",value:`${a} × ${b}`,label:`${a} × ${b}`},{kind:"text",value:String(a*b),label:String(a*b)}]);std="5.NBT.A";content="Powers of Ten";sub="Expresión ↔ valor"}let cards=S(pairs.flatMap((pair,i)=>pair.map(c=>({...c,pair:i}))));return {grade:g,skill:"memoryMath",prompt:"Encuentra las parejas matemáticas.",promptEn:"Find the matching math pairs.",audioPrompt:"Destapa dos tarjetas. Encuentra las parejas que representan la misma cantidad.",audioPromptEn:"Turn over two cards. Find pairs that represent the same quantity.",answer:"__memory__",options:[],itemType:"memory",sourceGrade:g,standard:std,content,subskill:sub,cognitive:"represent",difficulty:Math.min(4,1+g),representation:{type:"memoryCards",cards,pairs:pairs.length}}} 
 case"organizeCollection":{let groups=P([2,3,4,5]),each=R(2,6),z=groups*each;return item(g,skill,"Organiza la colección en grupos iguales. ¿Cuántos objetos hay?",z,[groups+each,z-groups,z+groups],{sourceGrade,representation:{type:"looseCollection",count:z,suggestedGroups:groups},audioPrompt:"Mira la colección. Organízala mentalmente en grupos iguales y encuentra el total.",promptEn:"Organize the collection into equal groups. How many objects are there?",audioPromptEn:"Look at the collection. Organize it into equal groups and find the total."})}
 case"equalGroups":{let groups=P([2,3,4,5,10]),each=R(2,8),z=groups*each;return item(g,skill,"Mira los grupos iguales. ¿Cuántos objetos hay en total?",z,[groups+each,z-each,z+each],{sourceGrade,representation:{type:"equalGroups",groups,each},audioPrompt:`Hay ${groups} grupos con ${each} en cada grupo. ¿Cuántos hay en total?`,promptEn:"Look at the equal groups. How many objects are there altogether?",audioPromptEn:`There are ${groups} groups with ${each} in each group. How many are there altogether?`})}
 case"arrays":{let rows=P([2,3,4,5,10]),cols=R(2,8),z=rows*cols;return item(g,skill,"Usa el arreglo para encontrar el total.",z,[rows+cols,z-rows,z+cols],{sourceGrade,representation:{type:"arrayModel",rows,cols},audioPrompt:`El arreglo tiene ${rows} filas y ${cols} en cada fila. ¿Cuántos hay?`,promptEn:"Use the array to find the total.",audioPromptEn:`The array has ${rows} rows and ${cols} in each row. How many are there?`})}
 case"factorMeaning":{let groups=P([2,3,4,5,10]),each=R(2,8),z=`${groups} grupos de ${each}`;return item(g,skill,`¿Qué describe ${groups} × ${each}?`,z,[`${each} grupos de ${groups+1}`,`${groups+each} grupos de 1`,`${groups} grupos de ${Math.max(1,each-1)}`],{sourceGrade,representation:{type:"arrayModel",rows:groups,cols:each},audioPrompt:`Mira el arreglo. En ${groups} por ${each}, ¿qué representa cada factor?`,promptEn:`What does ${groups} × ${each} describe?`,audioPromptEn:`Look at the array. In ${groups} times ${each}, what does each factor represent?`})}
 case"wordProblemMD":{let groups=P([2,3,4,5,10]),each=R(2,8),z=groups*each;return item(g,skill,`Hay ${groups} cajas con ${each} lápices en cada caja. ¿Cuántos lápices hay?`,z,[groups+each,z-each,z+each],{sourceGrade,representation:{type:"storyGroups",groups,each,object:"pencil"},audioPrompt:`Hay ${groups} cajas. Cada caja tiene ${each} lápices. Representa el problema y encuentra el total.`,promptEn:`There are ${groups} boxes with ${each} pencils in each box. How many pencils are there?`,audioPromptEn:`There are ${groups} boxes. Each box has ${each} pencils. Represent the problem and find the total.`})}
 case"divideShare":{let groups=P([2,3,4,5,10]),each=R(2,8),total=groups*each;return item(g,skill,`Reparte ${total} objetos en ${groups} grupos iguales. ¿Cuántos van en cada grupo?`,each,[each-1,each+1,groups],{sourceGrade,representation:{type:"divisionShare",total,groups},audioPrompt:`Reparte ${total} objetos en ${groups} grupos iguales. ¿Cuántos objetos tendrá cada grupo?`,promptEn:`Share ${total} objects equally into ${groups} groups. How many are in each group?`,audioPromptEn:`Share ${total} objects equally into ${groups} groups. How many objects will each group have?`})}
 case"divideGroup":{let each=P([2,3,4,5,10]),groups=R(2,8),total=each*groups;return item(g,skill,`Forma grupos de ${each} con ${total} objetos. ¿Cuántos grupos puedes formar?`,groups,[groups-1,groups+1,each],{sourceGrade,representation:{type:"divisionGrouping",total,each},audioPrompt:`Tienes ${total} objetos. Forma grupos de ${each}. ¿Cuántos grupos puedes formar?`,promptEn:`Make groups of ${each} from ${total} objects. How many groups can you make?`,audioPromptEn:`You have ${total} objects. Make groups of ${each}. How many groups can you make?`})}
 case"commutative":{let a=P([2,3,4,5]),b=R(2,8),z=`${b} × ${a}`;return item(g,skill,`El arreglo muestra ${a} × ${b}. Gíralo. ¿Qué ecuación representa el mismo total?`,z,[`${a} × ${b+1}`,`${a+b} × 1`,`${b+1} × ${a}`],{sourceGrade,representation:{type:"commutativeArrays",rows:a,cols:b},audioPrompt:"Mira el arreglo y luego imagina que lo giras. ¿Qué multiplicación conserva el mismo total?",promptEn:`The array shows ${a} × ${b}. Turn it. Which equation represents the same total?`,audioPromptEn:"Look at the array and imagine turning it. Which multiplication keeps the same total?"})}
 case"distributive":{let a=P([3,4,5]),b=P([4,5,6,7,8]),cut=P([1,2,3].filter(x=>x<b)),z=a*b,ans=`${a} × ${b-cut} + ${a} × ${cut}`;return item(g,skill,`El arreglo de ${a} × ${b} está dividido en dos partes. ¿Qué expresión lo representa?`,ans,[`${a} × ${b-cut} + ${cut}`,`${a+1} × ${b-cut}`,`${a} + ${b}`],{sourceGrade,representation:{type:"splitArray",rows:a,cols:b,cut},audioPrompt:"Mira cómo se dividió el arreglo. Elige la expresión que suma las dos partes.",promptEn:`The ${a} × ${b} array is split into two parts. Which expression represents it?`,audioPromptEn:"Look at how the array is split. Choose the expression that adds the two parts."})}
 case"missingFactor":{let a=P([2,3,4,5,10]),b=R(2,8),p=a*b;return item(g,skill,`${a} × __ = ${p}`,b,[b-1,b+1,a],{sourceGrade,representation:{type:"missingFactorArray",groups:a,total:p},audioPrompt:`Hay ${a} grupos y ${p} objetos en total. ¿Cuántos hay en cada grupo?`,promptEn:`${a} × __ = ${p}`,audioPromptEn:`There are ${a} groups and ${p} objects altogether. How many are in each group?`})}
 case"multiply":{let a=P([2,3,4,5,10]),b=R(1,10),z=a*b;return item(g,skill,`${a} × ${b} = __`,z,[z+a,Math.max(0,z-a),a+b],{sourceGrade,representation:{type:"arrayModel",rows:a,cols:b},audioPrompt:`¿Cuánto es ${a} por ${b}?`,promptEn:`${a} × ${b} = __`,audioPromptEn:`What is ${a} times ${b}?`})}
 case"divide":{let a=P([2,3,4,5,10]),b=R(1,10),p=a*b;return item(g,skill,`${p} ÷ ${a} = __`,b,[Math.max(0,b-1),b+1,a],{sourceGrade,representation:{type:"divisionShare",total:p,groups:a},audioPrompt:`Reparte ${p} en ${a} grupos iguales. ¿Cuántos van en cada grupo?`,promptEn:`${p} ÷ ${a} = __`,audioPromptEn:`Share ${p} equally into ${a} groups. How many are in each group?`})}
 case"twoStepMD":{let groups=P([2,3,4,5]),each=R(2,7),remove=R(1,Math.min(5,groups*each-1)),z=groups*each-remove;return item(g,skill,`Hay ${groups} grupos de ${each}. Después se retiran ${remove}. ¿Cuántos quedan?`,z,[groups*each,groups+each-remove,z+remove],{sourceGrade,representation:{type:"twoStepGroups",groups,each,remove},audioPrompt:`Primero encuentra el total de ${groups} grupos de ${each}. Después quita ${remove}. ¿Cuántos quedan?`,promptEn:`There are ${groups} groups of ${each}. Then ${remove} are removed. How many remain?`,audioPromptEn:`First find the total in ${groups} groups of ${each}. Then remove ${remove}. How many remain?`})}
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
 if(!["memory","pairs"].includes(q.itemType)){
  if(!Array.isArray(q.options)||q.options.length<2)e.push("options");
  if(U(q.options).length!==q.options.length)e.push("duplicate");
  if(!q.options.includes(String(q.answer)))e.push("answer-missing");
 }else if(q.itemType==="memory"&&(!q.representation||q.representation.type!=="memoryCards"||!Array.isArray(q.representation.cards)))e.push("memory-invalid");
 else if(q.itemType==="pairs"&&(!q.representation||q.representation.type!=="matchPairs"))e.push("pairs-invalid");
 if(q.grade===0&&/-\d/.test(q.prompt+" "+q.options.join(" ")))e.push("negative-K");
 if(q.grade<3&&/[×÷]/.test(q.prompt))e.push("future-operation");
 if(q.grade<=1&&!q.representation)e.push("visual-required-K1");
 if(q.skill==="numberLine"&&(!q.representation||q.representation.type!=="numberLineArc"))e.push("numberline-visual");
 if(q.grade===2&&!["countOn","missingPart","addWithin20","compare2"].includes(q.skill)&&!q.representation)e.push("visual-required-G2");
 if(q.grade===3&&q.cognitive!=="procedure"&&!q.representation)e.push("visual-required-G3-conceptual");
 return{valid:!e.length,errors:e}
}
function blueprint(g,count=15){
 let core=META[g],rev=REVIEW[g],slots=[];
 let coreN,reviewN,integrated;if(g===0){coreN=Math.max(1,Math.round(count*.8));reviewN=0;integrated=count-coreN}else{reviewN=Math.max(1,Math.round(count*.2));integrated=Math.max(1,Math.round(count*.13));coreN=count-reviewN-integrated;if(coreN<1){coreN=1;integrated=Math.max(0,count-coreN-reviewN)}};
 let c=S(core);for(let i=0;i<coreN;i++){let m=c[i%c.length];slots.push({layer:"CORE",skill:m[3],standard:m[0],content:m[1],subskill:m[2],cognitive:m[4],difficulty:m[5],sourceGrade:g})}
 for(let i=0;i<reviewN;i++){let sk=rev[i%rev.length],sg=reviewOrigin(g,sk),m=META[sg].find(x=>x[3]===sk);slots.push({layer:"REVIEW",skill:sk,standard:m?.[0]||"PREREQ",content:m?.[1]||"Prerequisite",subskill:m?.[2]||sk,cognitive:m?.[4]||"review",difficulty:m?.[5]||1,sourceGrade:sg})}
 for(let i=0;i<integrated;i++){let m=P(core);slots.push({layer:"APPLICATION",skill:m[3],standard:m[0],content:m[1],subskill:m[2],cognitive:"apply/reason",difficulty:Math.min(4,m[5]+1),sourceGrade:g})}
 let out=S(slots).slice(0,count);if(count>=8){let mi=Math.max(1,Math.floor(count*.55));out[mi]={layer:"APPLICATION",skill:"memoryMath",standard:g===0?"K.CC.B":g===1?"1.OA.B":g===2?"2.NBT.A.3":g===3?"3.OA.A.1":g===4?"4.NBT.A":"5.NBT.A",content:"Mathematical Memory",subskill:"Equivalent representations",cognitive:"represent",difficulty:Math.min(4,1+g),sourceGrade:g}}return out.map((x,i)=>({...x,challenge:i+1}))
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
 let buckets={};for(let r of responses){let q=r.question,key=(q.diagnosticKey||(q.standard+"|"+q.subskill))+"|"+(q.layer||"CORE");if(!buckets[key])buckets[key]={standard:q.standard,content:q.content,subskill:q.subskill,layer:q.layer||"CORE",sourceGrade:q.sourceGrade,total:0,correct:0};buckets[key].total++;if(r.correct)buckets[key].correct++}
 return Object.values(buckets).map(x=>{let rate=x.correct/x.total,status=x.total<2?"Evidencia insuficiente":rate>=.8?"Fortaleza":rate>=.6?"En desarrollo":"Necesita apoyo";return{...x,rate:Math.round(rate*100),status}})
}
function audit(gamesPerGrade=100){
 let out=[];for(let g=0;g<6;g++){let errors=[],n=0;for(let k=0;k<gamesPerGrade;k++){try{let bp=createGameBlueprint(g,15),set=createStudentSet(bp,"audit");for(let q of set){n++;let v=validate(q);if(!v.valid)errors.push({skill:q.skill,e:v.errors});if(q.layer==="REVIEW"&&q.sourceGrade>=g)errors.push({skill:q.skill,e:["review-not-prior"]});if(q.grade!==g)errors.push({skill:q.skill,e:["grade"]})}}catch(e){errors.push({e:[e.message]})}}out.push({grade:G[g],questions:n,failures:errors.length,sample:errors.slice(0,5)})}return out
}
global.MathLiveEngineV2=Object.freeze({VERSION:V,META,REVIEW,createGameBlueprint,createStudentSet,validateQuestion:validate,diagnose,audit,utilities:{numberToSpanish:words,expandedForm:expanded,unitForm:unit}});
})(typeof window!=="undefined"?window:globalThis);
