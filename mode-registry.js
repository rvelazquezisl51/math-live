/* Math Live · Mode Registry V1.0 · © 2026 Rene M. Velazquez Avila */
(function(){
  const MODES={
    integrated:{
      id:'integrated',icon:'🌟',name:'Integrado',short:'Mezcla equilibrada',enabled:true,
      purpose:'Evaluación y práctica integral',rankingLive:false,finalRanking:true,
      tv:'progress-track',studentRenderer:'mixed',scoring:'accuracy_then_finish_time',
      itemTypes:['choice','numeric','multiSelect','numberLine','equivalence','wordProblem'],
      cognitive:['recognize','represent','apply','reason'],diagnostic:true
    },
    challenge:{
      id:'challenge',icon:'⚡',name:'Reto rápido',short:'Precisión + velocidad',enabled:true,
      purpose:'Fluidez con presión temporal controlada',rankingLive:true,finalRanking:true,
      tv:'live-race',studentRenderer:'rapid',scoring:'accuracy_then_finish_time',
      itemTypes:['choice','numeric','quickCompare','mentalMath'],
      cognitive:['recognize','apply'],diagnostic:true
    },
    discover:{
      id:'discover',icon:'🔎',name:'Descubre',short:'Razona y encuentra',enabled:true,
      purpose:'Patrones, pistas y análisis de errores',rankingLive:false,finalRanking:true,
      tv:'discovery-path',studentRenderer:'discover',scoring:'accuracy_then_finish_time',
      itemTypes:['pattern','findError','clueNumber','missingValue','equivalence'],
      cognitive:['represent','apply','reason'],diagnostic:true
    },
    memory:{
      id:'memory',icon:'🧠',name:'Memoria',short:'Encuentra equivalencias',enabled:false,
      purpose:'Relacionar representaciones matemáticas equivalentes',rankingLive:false,finalRanking:true,
      tv:'pair-progress',studentRenderer:'memory',scoring:'accuracy_then_finish_time',
      itemTypes:['matchingPairs'],cognitive:['recognize','represent'],diagnostic:true
    },
    crossword:{
      id:'crossword',icon:'✏️',name:'Crucigrama',short:'Resuelve y completa',enabled:false,
      purpose:'Vocabulario, cálculo y relaciones matemáticas',rankingLive:false,finalRanking:true,
      tv:'crossword-progress',studentRenderer:'crossword',scoring:'accuracy_then_finish_time',
      itemTypes:['crosswordClue','numericWord','mathVocabulary'],
      cognitive:['recognize','apply','reason'],diagnostic:true
    },
    build:{
      id:'build',icon:'🧩',name:'Construye',short:'Manipula y representa',enabled:false,
      purpose:'Construcción de números, modelos y operaciones',rankingLive:false,finalRanking:true,
      tv:'construction-progress',studentRenderer:'build',scoring:'accuracy_then_finish_time',
      itemTypes:['dragBuild','placeValueBuild','numberBondBuild','arrayBuild','modelBuild'],
      cognitive:['represent','apply','reason'],diagnostic:true
    }
  };
  const DEFAULT='integrated';
  function get(id){return MODES[id]||MODES[DEFAULT]}
  function list(){return Object.values(MODES)}
  function canJoin(status){return status==='lobby'}
  function ranking(a,b){
    const sa=Number(a.score||0), sb=Number(b.score||0);
    if(sb!==sa)return sb-sa;
    const ta=a.finishedAt?.toMillis?a.finishedAt.toMillis():Number(a.finishedAt||Infinity);
    const tb=b.finishedAt?.toMillis?b.finishedAt.toMillis():Number(b.finishedAt||Infinity);
    return ta-tb;
  }
  window.MathLiveModes={VERSION:'1.0.0',MODES,DEFAULT,get,list,canJoin,ranking};
})();
