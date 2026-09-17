/* Edumind Academy | BK V1 Lite R03 | 17 September 2026
 * Satu sumber untuk Full Page dan WSP + GitHub.
 * Seluruh data contoh fiktif. Tidak ada pengiriman data kerja ke server.
 * Unggah berkas UTUH tanpa mengubah isinya: HTML pemanggil memeriksa integritas.
 */
(function(){
'use strict';
var root=document.getElementById('edumind-bk-v1');
if(!root || root.dataset.bundleBootstrapped==='1')return;
root.dataset.bundleBootstrapped='1';
var style=document.createElement('style');
style.id='edumind-bk-r03-style';
style.textContent="\n/* Semua aturan tampilan aplikasi dibatasi pada root untuk pemasangan WSP. */\n#edumind-bk-v1{--bk-ink:#183335;--bk-primary:#14665e;--bk-deep:#123e3b;--bk-muted:#627676;--bk-line:#dce6e2;--bk-paper:#fff;--bk-soft:#f4f7f4;--bk-gold:#d29a3e;--bk-red:#aa3838;font:16px/1.6 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--bk-ink);background:var(--bk-soft);max-width:1260px;margin:0 auto;min-height:86vh;text-align:left;isolation:isolate}\n#edumind-bk-v1 *{box-sizing:border-box}#edumind-bk-v1 h1,#edumind-bk-v1 h2,#edumind-bk-v1 h3,#edumind-bk-v1 p{margin:0 0 12px;line-height:1.4;font-family:inherit}#edumind-bk-v1 h1{font-size:29px;letter-spacing:-.6px}#edumind-bk-v1 h2{font-size:21px}#edumind-bk-v1 h3{font-size:17px}\n#edumind-bk-v1 button,#edumind-bk-v1 input,#edumind-bk-v1 select,#edumind-bk-v1 textarea{font:inherit;color:inherit;letter-spacing:normal;text-transform:none}\n#edumind-bk-v1 button{cursor:pointer;border:1px solid var(--bk-line);border-radius:9px;background:#fff;padding:9px 14px;line-height:1.45;font-weight:600;min-height:42px;box-shadow:none}#edumind-bk-v1 button:hover{border-color:var(--bk-primary);background:#f3f8f5}#edumind-bk-v1 button:disabled{opacity:.48;cursor:not-allowed}\n#edumind-bk-v1 .bk-primary{background:var(--bk-primary);border-color:var(--bk-primary);color:#fff}#edumind-bk-v1 .bk-primary:hover{background:var(--bk-deep)}#edumind-bk-v1 .bk-danger{color:var(--bk-red)}#edumind-bk-v1 .bk-small{font-size:14px;padding:6px 10px;min-height:36px}#edumind-bk-v1 .bk-link{border:none;background:transparent;padding:0;min-height:24px;color:var(--bk-primary);text-decoration:underline;text-underline-offset:4px}\n#edumind-bk-v1 .bk-shell{display:grid;grid-template-columns:234px minmax(0,1fr);min-height:86vh}#edumind-bk-v1 .bk-side{background:var(--bk-deep);color:#fff;padding:26px 18px;display:flex;flex-direction:column;gap:24px}#edumind-bk-v1 .bk-logo{display:flex;gap:11px;align-items:center;line-height:1.25;font-size:17px;font-weight:720}#edumind-bk-v1 .bk-monogram{background:#e8bd70;color:#213b35;border-radius:11px;padding:9px 8px;font-weight:850;font-size:19px}#edumind-bk-v1 .bk-overline{font-size:11px;letter-spacing:1.4px;text-transform:uppercase;font-weight:750}#edumind-bk-v1 .bk-side .bk-overline{color:#bad0c5}#edumind-bk-v1 .bk-nav{display:flex;flex-direction:column;gap:7px}#edumind-bk-v1 .bk-nav button{color:#d9e8e2;text-align:left;background:transparent;border-color:transparent;display:flex;align-items:flex-start;gap:10px;padding:13px 10px;font-size:15px;font-weight:550;line-height:1.5}#edumind-bk-v1 .bk-nav button[aria-current=page]{color:#fff;background:#276159;border-color:#3b766b}#edumind-bk-v1 .bk-nav small{opacity:.65;font-weight:500;padding-top:2px}#edumind-bk-v1 .bk-side-foot{font-size:13px;line-height:1.7;color:#c0d5cb;margin-top:auto;border-top:1px solid #477169;padding-top:18px}\n#edumind-bk-v1 .bk-main{padding:0 28px 32px;min-width:0}#edumind-bk-v1 .bk-top{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;padding:20px 0;border-bottom:1px solid var(--bk-line);margin-bottom:20px}#edumind-bk-v1 .bk-top select{width:auto;max-width:260px}#edumind-bk-v1 .bk-top-actions{display:flex;align-items:center;gap:9px;flex-wrap:wrap}#edumind-bk-v1 .bk-sub{font-size:14px;color:var(--bk-muted)}#edumind-bk-v1 .bk-pagehead{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin:24px 0 18px}#edumind-bk-v1 .bk-pagehead p{margin-bottom:0;color:var(--bk-muted);font-size:15px}\n#edumind-bk-v1 .bk-notice{background:#fff8e8;border:1px solid #ebd7a7;border-radius:10px;padding:11px 14px;font-size:14px;line-height:1.6;margin:12px 0}#edumind-bk-v1 .bk-notice.bk-error{background:#fff0ef;border-color:#edb7b1;color:#882b2b}#edumind-bk-v1 .bk-notice.bk-info{background:#eaf4f0;border-color:#c7ddd3;color:#234f47}\n#edumind-bk-v1 .bk-card{background:var(--bk-paper);border:1px solid var(--bk-line);border-radius:14px;padding:22px;margin-bottom:18px;min-width:0}#edumind-bk-v1 .bk-hero{background:#e6f0e9;border-color:#cadfcf}#edumind-bk-v1 .bk-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:20px}#edumind-bk-v1 .bk-stat{border:1px solid var(--bk-line);border-radius:12px;padding:18px;background:white;border-top:3px solid #2d8c7c}#edumind-bk-v1 .bk-stat:nth-child(2){border-top-color:#cea05b}#edumind-bk-v1 .bk-stat:nth-child(3){border-top-color:#6c8cb3}#edumind-bk-v1 .bk-stat:nth-child(4){border-top-color:#b47f95}#edumind-bk-v1 .bk-stat strong{font-size:28px;display:block;font-weight:750;line-height:1.25;margin:7px 0}#edumind-bk-v1 .bk-stat span{font-size:13px;color:var(--bk-muted)}\n#edumind-bk-v1 .bk-grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px}#edumind-bk-v1 .bk-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}#edumind-bk-v1 .bk-filter{display:flex;gap:10px;flex-wrap:wrap;align-items:end;margin-bottom:15px}#edumind-bk-v1 .bk-filter label{flex:1;min-width:130px}#edumind-bk-v1 .bk-filter input{min-width:180px}\n#edumind-bk-v1 .bk-tablewrap{overflow-x:auto;width:100%;border-radius:8px}#edumind-bk-v1 table{width:100%;border-collapse:collapse;margin:0;font-size:14px;text-align:left;background:transparent}#edumind-bk-v1 th{background:#f1f6f2;color:#4d625e;font-size:12px;letter-spacing:.3px;font-weight:700;padding:11px;text-align:left;border-bottom:1px solid var(--bk-line)}#edumind-bk-v1 td{padding:12px 11px;vertical-align:top;border-bottom:1px solid #e6ede7;line-height:1.5;max-width:380px;overflow-wrap:anywhere}#edumind-bk-v1 tr:last-child td{border-bottom:none}#edumind-bk-v1 td .bk-actions{min-width:118px}\n#edumind-bk-v1 .bk-badge{display:inline-block;border-radius:6px;padding:3px 8px;background:#edf2ef;color:#486057;font-size:12px;font-weight:700;line-height:1.6;white-space:normal}#edumind-bk-v1 .bk-badge.green{background:#e2f0e7;color:#215b3a}#edumind-bk-v1 .bk-badge.amber{background:#fff0d4;color:#815416}#edumind-bk-v1 .bk-badge.red{background:#fbe9e7;color:#993e34}\n#edumind-bk-v1 .bk-empty{padding:30px 14px;text-align:center;color:var(--bk-muted);font-size:15px}#edumind-bk-v1 .bk-rowitem{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid var(--bk-line)}#edumind-bk-v1 .bk-rowitem:last-child{border:0}#edumind-bk-v1 .bk-muted{color:var(--bk-muted);font-size:14px}#edumind-bk-v1 .bk-progress{height:8px;border-radius:4px;background:#dce8e0;overflow:hidden;margin-top:14px}#edumind-bk-v1 .bk-progress>span{display:block;height:100%;background:#2d8772}\n#edumind-bk-v1 dialog{max-width:860px;width:calc(100% - 24px);max-height:90vh;border:1px solid var(--bk-line);border-radius:16px;padding:0;color:var(--bk-ink);background:#fff;box-shadow:0 22px 75px #142e3844;margin:auto;text-align:left;font-size:15px}#edumind-bk-v1 dialog::backdrop{background:#13282788}#edumind-bk-v1 .bk-modalhead{padding:18px 24px;border-bottom:1px solid var(--bk-line);display:flex;gap:10px;justify-content:space-between;align-items:center}#edumind-bk-v1 .bk-modalhead h2{margin:0;font-size:22px}#edumind-bk-v1 .bk-modalbody{padding:20px 24px;max-height:65vh;overflow:auto}#edumind-bk-v1 .bk-modalfoot{padding:14px 24px;border-top:1px solid var(--bk-line);display:flex;justify-content:flex-end;gap:9px;background:#f7faf7}#edumind-bk-v1 .bk-formgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}#edumind-bk-v1 .bk-full{grid-column:1/-1}#edumind-bk-v1 label{display:block;font-size:14px;font-weight:620;line-height:1.5;margin-bottom:8px}#edumind-bk-v1 input:not([type=checkbox]),#edumind-bk-v1 select,#edumind-bk-v1 textarea{display:block;width:100%;border:1px solid #bacdc4;border-radius:8px;padding:10px 11px;min-height:44px;background:#fff;font-size:15px;line-height:1.5;margin-top:5px}#edumind-bk-v1 textarea{resize:vertical;min-height:84px}#edumind-bk-v1 [readonly]{background:#f0f3f0!important;color:#53645b}\n#edumind-bk-v1 :focus-visible{outline:3px solid #dba954;outline-offset:2px}#edumind-bk-v1 .bk-check{display:flex;align-items:center;gap:9px;font-weight:500;margin-bottom:5px}#edumind-bk-v1 input[type=checkbox]{accent-color:var(--bk-primary);width:18px;height:18px;flex:none}#edumind-bk-v1 .bk-checklist{padding:10px;border:1px solid var(--bk-line);border-radius:8px;max-height:210px;overflow-y:auto}#edumind-bk-v1 .bk-checks{display:flex;gap:12px;flex-wrap:wrap;margin:5px 0 12px}#edumind-bk-v1 fieldset{border:1px solid var(--bk-line);border-radius:10px;margin:12px 0;padding:15px;min-width:0}#edumind-bk-v1 legend{font-weight:700;padding:0 7px;color:var(--bk-primary);font-size:15px}#edumind-bk-v1 details{margin:12px 0;border:1px solid var(--bk-line);border-radius:9px;padding:12px}#edumind-bk-v1 summary{cursor:pointer;font-weight:650;color:var(--bk-primary)}#edumind-bk-v1 details[open]>summary{margin-bottom:13px}#edumind-bk-v1 .bk-indicator{background:#f6f8f5;border-radius:10px;padding:14px;margin-bottom:12px}\n#edumind-bk-v1 .bk-toast{position:fixed;right:22px;bottom:22px;z-index:999999;border-radius:10px;background:#164c40;color:white;padding:13px 18px;box-shadow:0 8px 30px #18382744;max-width:calc(100vw - 44px);font-size:15px}#edumind-bk-v1 .bk-toast[hidden]{display:none}#edumind-bk-v1 .bk-fatal{padding:25px}#edumind-bk-v1 .bk-tabline{display:flex;gap:8px;margin-bottom:18px}#edumind-bk-v1 .bk-tabline .active{background:var(--bk-primary);color:#fff}\n#edumind-bk-v1 .bk-print-preview{font:14px/1.55 system-ui,sans-serif;background:#fff;color:#182c29}#edumind-bk-v1 .bk-print-preview h1{font-size:24px}#edumind-bk-v1 .bk-print-preview h2{font-size:18px;margin-top:20px}#edumind-bk-v1 .bk-foot{font-size:12px;color:#6c7e73;border-top:1px solid var(--bk-line);padding-top:16px;margin-top:22px}\n@media(max-width:1050px){#edumind-bk-v1 .bk-shell{grid-template-columns:194px minmax(0,1fr)}#edumind-bk-v1 .bk-main{padding-left:20px;padding-right:20px}#edumind-bk-v1 .bk-stats{grid-template-columns:repeat(2,minmax(0,1fr))}}\n@media(max-width:760px){#edumind-bk-v1 .bk-shell{display:block}#edumind-bk-v1 .bk-side{padding:15px;gap:15px}#edumind-bk-v1 .bk-logo{font-size:16px}#edumind-bk-v1 .bk-side-foot{display:none}#edumind-bk-v1 .bk-nav{flex-direction:row;overflow:auto;gap:5px;padding-bottom:3px}#edumind-bk-v1 .bk-nav button{font-size:13px;min-width:136px;padding:10px}#edumind-bk-v1 .bk-nav small{display:none}#edumind-bk-v1 .bk-main{padding:0 14px 24px}#edumind-bk-v1 h1{font-size:25px}#edumind-bk-v1 .bk-grid2{grid-template-columns:1fr;gap:0}#edumind-bk-v1 .bk-card{padding:17px}#edumind-bk-v1 .bk-top{margin-bottom:14px;padding:15px 0}#edumind-bk-v1 .bk-formgrid{grid-template-columns:1fr}#edumind-bk-v1 .bk-modalhead,#edumind-bk-v1 .bk-modalbody,#edumind-bk-v1 .bk-modalfoot{padding:14px}#edumind-bk-v1 .bk-pagehead{margin-top:18px}#edumind-bk-v1 .bk-top-actions{width:100%}#edumind-bk-v1 .bk-top select{max-width:none;flex:1;min-width:130px}#edumind-bk-v1 .bk-stats{gap:9px}#edumind-bk-v1 .bk-stat{padding:14px}}\n@media print{#edumind-bk-v1{display:none!important}}\n#edumind-bk-v1 [hidden]{display:none!important}\n@media(max-width:760px){#edumind-bk-v1 .bk-top-actions>select{width:100%;flex-basis:100%}#edumind-bk-v1 table{min-width:440px}#edumind-bk-v1 .bk-badge{white-space:nowrap}}\n\n\n/* R03: informasi ruang simulasi dan privasi; tidak menambah menu. */\n#edumind-bk-v1 .bk-workspace-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:14px 0;padding:13px 16px;border:1px solid #d6e5df;border-radius:10px;background:#fff;font-size:14px;line-height:1.5}\n#edumind-bk-v1 .bk-workspace-bar strong{color:var(--bk-primary)}\n@media(max-width:600px){#edumind-bk-v1 .bk-workspace-bar{align-items:flex-start;flex-direction:column}#edumind-bk-v1 .bk-workspace-bar button{width:100%}}\n";
document.head.appendChild(style);

/* Edumind Academy — BK V1 Lite, 1.0.0-beta.3-r03
 * Model data + aturan kerja murni. Tidak ada pengiriman data ke server.
 * Penyimpanan/validasi lokal bukan batas keamanan atau otorisasi.
 */
(function (global) {
  'use strict';
  const APP = 'edumind-bk-lite', VERSION = '1.0.0-beta.3-r03', SCHEMA = 1;
  const KEY = 'edumind.bk.lite.v1.workspace';
  const FIELDS = ['Pribadi','Sosial','Belajar','Karier'];
  const VALUES = ['Tazkiyah Awareness','Divine Connection','Adaptive Cognition','Heart-Centred Emotion Regulation'];
  const TYPES = ['ODOS','Individual','Kelompok','Klasikal','Dukungan Sebaya','Parenting/Koordinasi'];
  const SOURCES = ['Terstruktur','Tidak terstruktur','Jejak digital','Observasi berbasis nilai'];
  const LEVELS = {'SD/MI':[1,2,3,4,5,6],'SMP/MTs':[7,8,9],'SMA/MA':[10,11,12]};
  const DECISIONS = ['Dilanjutkan','Disesuaikan','Dihentikan','Perlu dukungan lain'];
  const clone = o => JSON.parse(JSON.stringify(o));
  const uid = () => global.crypto?.randomUUID ? global.crypto.randomUUID() : 'id-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
  const now = () => new Date().toISOString();
  function day(zone='Asia/Jakarta', value=new Date()) {
    const p = new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(value);
    const get = k => p.find(x=>x.type===k).value; return `${get('year')}-${get('month')}-${get('day')}`;
  }
  function assert(ok, message) { if(!ok) throw new Error(message); }
  function str(v, required=false, max=3000) { return typeof v==='string' && v.length<=max && (!required || v.trim().length>0); }
  function date(v) { return typeof v==='string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10)===v; }
  function datetime(v) { return typeof v==='string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v) && date(v.slice(0,10)) && +v.slice(11,13)<24 && +v.slice(14,16)<60; }
  function stamp(old={}) { return {id:old.id||uid(),createdAt:old.createdAt||now(),updatedAt:now()}; }
  function initial() {
    const d=day(), y=+d.slice(0,4), m=+d.slice(5,7), startYear=m>=7?y:y-1;
    const p={id:uid(),label:`Semester ${m>=7?1:2} ${startYear}/${startYear+1}`,start:m>=7?`${y}-07-01`:`${y}-01-01`,end:m>=7?`${y}-12-31`:`${y}-06-30`};
    return {app:APP,appVersion:VERSION,schemaVersion:SCHEMA,datasetId:uid(),revision:0,updatedAt:now(),lastBackupAt:null,demo:false,
      settings:{schoolName:'',schoolLevel:'SMP/MTs',operatorName:'',timezone:'Asia/Jakarta',activePeriodId:p.id},
      periods:[p],classes:[7,8,9].map(g=>({id:uid(),name:`${g}A`,grade:g})),students:[],enrollments:[],needs:[],programs:[],services:[],followups:[],evaluations:[]};
  }
  const one = (arr,id) => arr.find(x=>x.id===id);
  function studentName(d,enrollmentId) { const en=one(d.enrollments,enrollmentId); const s=en&&one(d.students,en.studentId); return s ? `${s.name} · ${one(d.classes,en.classId)?.name||''}` : 'Siswa tidak ditemukan'; }
  function periodEnrollments(d,pid) { return d.enrollments.filter(e=>e.periodId===pid); }
  function latestNeeds(d,pid) {
    const result={};
    for(const en of periodEnrollments(d,pid)) {
      result[en.id]=Object.fromEntries(FIELDS.map(f=>[f,{status:'Belum dinilai',note:''}]));
      const records=d.needs.filter(n=>n.enrollmentId===en.id).sort((a,b)=>a.date.localeCompare(b.date)||a.createdAt.localeCompare(b.createdAt)||a.id.localeCompare(b.id));
      for(const n of records) for(const f of FIELDS) if(n.fields[f].status!=='Belum dinilai') result[en.id][f]={...n.fields[f],date:n.date};
    }
    return result;
  }
  function stats(d,pid,filters={}) {
    const ens=periodEnrollments(d,pid).filter(e=>!filters.classId||e.classId===filters.classId);
    const eid=new Set(ens.map(e=>e.id));
    const services=d.services.filter(s=>s.periodId===pid && s.status==='Terlaksana' && (!filters.from||s.actualAt.slice(0,10)>=filters.from) && (!filters.to||s.actualAt.slice(0,10)<=filters.to) && (!filters.field||s.fields.includes(filters.field)) && (!filters.classId||s.participants.some(p=>eid.has(p.enrollmentId))));
    const present=s=>s.participants.filter(p=>eid.has(p.enrollmentId)&&p.kind==='Peserta'&&p.attendance==='Hadir').map(p=>one(d.enrollments,p.enrollmentId).studentId);
    const reached=new Set(services.flatMap(present)), os=services.filter(s=>s.type==='ODOS'), odos=new Set(os.flatMap(present));
    const todos=d.followups.filter(t=>t.periodId===pid), today=day(d.settings.timezone);
    return {activities:services.length,reached:reached.size,odosMeetings:os.length,odos:odos.size,total:ens.length,
      unreached:ens.filter(e=>!odos.has(e.studentId)),open:todos.filter(t=>t.status==='Belum selesai').length,done:todos.filter(t=>t.status==='Selesai').length,
      overdue:todos.filter(t=>t.status==='Belum selesai'&&t.due<today).length,services,
      types:TYPES.map(t=>[t,services.filter(s=>s.type===t).length]),fields:FIELDS.map(f=>[f,services.filter(s=>s.fields.includes(f)).length])};
  }
  function latestEvaluation(d,iid) { return d.evaluations.filter(e=>e.indicatorId===iid).sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt.localeCompare(a.createdAt)||b.id.localeCompare(a.id))[0]; }
  function checkPlain(obj, depth=0) {
    assert(depth<24,'Susunan berkas tidak sesuai dengan cadangan aplikasi BK.');
    if(obj && typeof obj==='object') for(const k of Object.keys(obj)) {
      assert(!['__proto__','prototype','constructor'].includes(k),'Berkas mengandung bagian yang tidak diizinkan.'); checkPlain(obj[k],depth+1);
    }
  }
  function validate(d) {
    checkPlain(d);
    assert(d?.app===APP && d.schemaVersion===SCHEMA,'Berkas ini bukan cadangan yang sesuai untuk versi aplikasi BK ini.');
    assert(str(d.datasetId,true,100)&&Number.isInteger(d.revision)&&d.revision>=0,'Penanda atau riwayat pembaruan data tidak sesuai.');
    assert(d.settings&&Object.hasOwn(LEVELS,d.settings.schoolLevel),'Jenjang sekolah tidak valid.');
    assert(str(d.settings.schoolName,false,160)&&str(d.settings.operatorName,false,120),'Identitas sekolah/pengelola tidak valid.');
    assert(['Asia/Jakarta','Asia/Makassar','Asia/Jayapura'].includes(d.settings.timezone),'Zona waktu tidak valid.');
    assert(str(d.updatedAt,true,40)&&!Number.isNaN(Date.parse(d.updatedAt)),'Waktu data tidak valid.');
    assert(typeof d.demo==='boolean'&&(d.lastBackupAt===null||str(d.lastBackupAt,true,40)),'Keterangan waktu atau asal data tidak sesuai.');
    const collections=['periods','classes','students','enrollments','needs','programs','services','followups','evaluations'];
    const collectionLabels={periods:'periode',classes:'kelas',students:'siswa',enrollments:'penempatan siswa',needs:'kebutuhan',programs:'program',services:'layanan',followups:'tindak lanjut',evaluations:'evaluasi'};
    for(const c of collections) {
      assert(Array.isArray(d[c])&&d[c].length<=20000,`Daftar ${collectionLabels[c]} tidak sesuai atau terlalu besar.`);
      const ids=new Set(); for(const r of d[c]) { assert(r&&str(r.id,true,100)&&!ids.has(r.id),`Penanda ${collectionLabels[c]} kosong atau berulang.`); ids.add(r.id); }
    }
    const ref=(arr,id,label)=>{ const r=one(d[arr],id); assert(r,`Tautan ${label} tidak ditemukan.`); return r; };
    ref('periods',d.settings.activePeriodId,'periode aktif');
    const uniq=(arr,fn,label)=>{const a=arr.map(fn); assert(new Set(a).size===a.length,`${label} ganda.`);};
    uniq(d.periods,r=>r.label,'Nama periode'); uniq(d.classes,r=>r.name,'Nama kelas'); uniq(d.students,r=>r.code,'Kode siswa'); uniq(d.enrollments,r=>`${r.studentId}|${r.periodId}`,'Siswa dalam satu periode');
    const within=(dateValue,pid)=>{const p=ref('periods',pid,'periode'); assert(dateValue>=p.start&&dateValue<=p.end,'Tanggal harus berada dalam periode catatan.');};
    const list=(a,options,req=false)=>assert(Array.isArray(a)&&a.every(x=>options.includes(x))&&new Set(a).size===a.length&&(!req||a.length>0),'Pilihan kategori kosong/tidak valid.');
    const txt=(v,label,required=false,max=3000)=>assert(str(v,required,max),`${label} ${required?'wajib diisi dan ':''}maksimal ${max} karakter.`);
    const meta=r=>{assert(str(r.createdAt,true,40)&&str(r.updatedAt,true,40)&&!Number.isNaN(Date.parse(r.createdAt))&&!Number.isNaN(Date.parse(r.updatedAt)),'Keterangan waktu pencatatan tidak sesuai.');};
    for(const p of d.periods) {txt(p.label,'Nama periode',true,100);assert(date(p.start)&&date(p.end)&&p.start<=p.end,'Tanggal periode tidak valid.');}
    for(const c of d.classes){txt(c.name,'Nama kelas',true,50); assert(Number.isInteger(c.grade)&&c.grade>=1&&c.grade<=12,'Tingkat kelas tidak valid.');}
    for(const s of d.students){txt(s.code,'Kode siswa',true,60);txt(s.name,'Nama/alias',true,120);meta(s);}
    for(const e of d.enrollments){ref('students',e.studentId,'siswa');ref('periods',e.periodId,'periode');ref('classes',e.classId,'kelas');assert(['','ASRAMA','NON_ASRAMA'].includes(e.boarding)&&typeof e.active==='boolean','Status penempatan tidak valid.');meta(e);}
    for(const n of d.needs){
      const en=ref('enrollments',n.enrollmentId,'siswa-periode');assert(date(n.date),'Tanggal kebutuhan tidak valid.');within(n.date,en.periodId);
      assert(SOURCES.includes(n.sourceGroup),'Kelompok sumber tidak valid.');txt(n.sourceLabel,'Keterangan sumber',true,300);txt(n.sourceActor,'Pemberi informasi',false,200);
      txt(n.potential,'Potensi');txt(n.support,'Dukungan');assert(['Belum ditetapkan','Rutin','Didahulukan'].includes(n.priority),'Prioritas tidak valid.');
      assert(n.fields&&typeof n.fields==='object','Catatan bidang tidak valid.');let assessed=false;
      for(const f of FIELDS){const v=n.fields[f];assert(v&&['Belum dinilai','Ada kebutuhan','Belum teridentifikasi kebutuhan'].includes(v.status),'Status bidang tidak valid.');txt(v.note,`Catatan ${f}`,v.status==='Ada kebutuhan');assessed ||= v.status!=='Belum dinilai';}
      assert(assessed||n.potential.trim()||n.support.trim(),'Isi minimal satu temuan bidang, potensi, atau dukungan.');
      if(n.sourceServiceId){const s=ref('services',n.sourceServiceId,'layanan asal');assert(s.periodId===en.periodId&&s.participants.some(p=>p.enrollmentId===en.id),'Siswa tidak terkait layanan asal.');}
      meta(n);
    }
    uniq(d.needs.filter(n=>n.sourceServiceId),r=>`${r.enrollmentId}|${r.sourceServiceId}`,'Kebutuhan dari siswa-layanan yang sama');
    const indicatorIds=[];
    for(const p of d.programs){
      ref('periods',p.periodId,'periode'); for(const k of ['title','basis','goal'])txt(p[k],k==='title'?'Nama program':k==='basis'?'Dasar kebutuhan':'Tujuan',true,k==='title'?180:3000);
      assert(date(p.start)&&date(p.end)&&p.start<=p.end,'Rentang tanggal program tidak valid.');within(p.start,p.periodId);within(p.end,p.periodId);
      list(p.fields,FIELDS,true);list(p.values,VALUES);txt(p.valueNote,'Penerapan TAUHID-CARE',p.values.length>0);
      assert(Array.isArray(p.targets)&&p.targets.length>0&&new Set(p.targets).size===p.targets.length,'Pilih minimal satu sasaran program tanpa mengulang siswa yang sama.');
      p.targets.forEach(id=>assert(ref('enrollments',id,'sasaran program').periodId===p.periodId,'Sasaran berbeda periode.'));
      assert(Array.isArray(p.needIds)&&new Set(p.needIds).size===p.needIds.length,'Sumber kebutuhan tidak valid.');p.needIds.forEach(id=>ref('needs',id,'sumber kebutuhan'));
      assert(Array.isArray(p.indicators)&&p.indicators.length>0,'Program memerlukan minimal satu indikator.');
      for(const i of p.indicators){assert(str(i.id,true,100),'Penanda indikator tidak sesuai.'); indicatorIds.push(i.id); txt(i.label,'Indikator',true,500);txt(i.baseline,'Kondisi awal',false,1500);txt(i.target,'Target',true,1500);}
      assert(typeof p.archived==='boolean','Status arsip program tidak valid.');meta(p);
    }
    assert(new Set(indicatorIds).size===indicatorIds.length,'Penanda indikator berulang.');
    for(const s of d.services){
      ref('periods',s.periodId,'periode layanan');txt(s.title,'Judul layanan',true,180);assert(TYPES.includes(s.type),'Jenis layanan tidak valid.');list(s.fields,FIELDS,true);
      assert(['Terjadwal','Terlaksana','Batal'].includes(s.status),'Status layanan tidak valid.');
      for(const k of ['summary','cancelReason','adults','supervisor'])txt(s[k],({summary:'Ringkasan layanan',cancelReason:'Alasan pembatalan',adults:'Pihak yang berkoordinasi',supervisor:'Pembimbing dewasa'})[k],false,k==='supervisor'?200:3000);
      if(s.plannedAt){assert(datetime(s.plannedAt),'Jadwal tidak valid.');within(s.plannedAt.slice(0,10),s.periodId);}
      if(s.actualAt){assert(datetime(s.actualAt),'Waktu aktual tidak valid.');within(s.actualAt.slice(0,10),s.periodId);assert(s.actualAt.slice(0,10)<=day(d.settings.timezone),'Layanan terlaksana tidak boleh bertanggal masa depan.');}
      if(s.actualEndAt)assert(datetime(s.actualEndAt)&&s.actualAt&&s.actualEndAt>=s.actualAt,'Waktu akhir mendahului awal/tidak valid.');
      assert(Array.isArray(s.participants)&&new Set(s.participants.map(p=>p.enrollmentId)).size===s.participants.length,'Peserta ganda/tidak valid.');
      const prog=s.programId?ref('programs',s.programId,'program layanan'):null;if(prog)assert(prog.periodId===s.periodId,'Program berbeda periode.');
      for(const p of s.participants){assert(ref('enrollments',p.enrollmentId,'peserta').periodId===s.periodId,'Peserta berbeda periode.');if(prog)assert(prog.targets.includes(p.enrollmentId),'Peserta belum masuk sasaran program. Perbarui sasaran atau pilih layanan insidental.');assert(['Peserta','Siswa terkait'].includes(p.kind)&&['','Hadir','Tidak hadir'].includes(p.attendance),'Kehadiran tidak valid.');if(p.kind==='Siswa terkait')assert(p.attendance==='','Siswa terkait tidak dihitung hadir langsung.');}
      const direct=s.participants.filter(p=>p.kind==='Peserta');
      if(['ODOS','Individual'].includes(s.type))assert(s.participants.length===1&&direct.length===1,'ODOS/Individual harus tepat satu siswa langsung.');
      else if(s.type!=='Parenting/Koordinasi')assert(direct.length>=1&&direct.length===s.participants.length,'Pilih peserta siswa langsung.');
      if(s.type==='Parenting/Koordinasi')txt(s.adults,'Pihak dewasa yang berkoordinasi',true);
      if(s.type==='Dukungan Sebaya')txt(s.supervisor,'Pembimbing dewasa',true,200);
      if(s.status==='Terjadwal')assert(s.plannedAt,'Isi jadwal layanan.');
      if(s.status==='Batal')txt(s.cancelReason,'Alasan pembatalan',true);
      if(s.status==='Terlaksana'){
        assert(s.actualAt,'Isi waktu pelaksanaan.');txt(s.summary,'Ringkasan pelaksanaan',true);
        assert(direct.every(p=>p.attendance),'Lengkapi kehadiran seluruh peserta langsung.');
        if(s.type!=='Parenting/Koordinasi')assert(direct.some(p=>p.attendance==='Hadir'),'Minimal satu siswa harus hadir.');
      }
      assert(s.odos&&typeof s.odos==='object','Catatan ODOS tidak valid.');for(const k of [...FIELDS,'Potensi','Dukungan'])txt(s.odos[k],`ODOS ${k}`);meta(s);
    }
    for(const t of d.followups){
      assert(['need','service'].includes(t.sourceType),'Pilih satu jenis sumber tugas.');
      const src=ref(t.sourceType==='need'?'needs':'services',t.sourceId,'asal tindak lanjut');
      const pid=t.sourceType==='need'?ref('enrollments',src.enrollmentId,'penempatan').periodId:src.periodId;
      assert(t.periodId===pid,'Periode tugas tidak sesuai sumber.');
      if(t.sourceType==='need')assert(t.enrollmentId===src.enrollmentId,'Siswa tugas tidak sesuai sumber.');
      else if(t.enrollmentId)assert(src.participants.some(p=>p.enrollmentId===t.enrollmentId),'Siswa tugas tidak terkait layanan.');
      assert(['Pendampingan','Rujukan'].includes(t.type),'Jenis tugas tidak valid.');
      for(const k of ['action','ownerName','ownerRole'])txt(t[k],({action:'Tindakan',ownerName:'Nama penanggung jawab',ownerRole:'Peran penanggung jawab'})[k],true,k==='action'?3000:180);
      assert(date(t.due)&&['Belum selesai','Selesai'].includes(t.status),'Batas waktu/status tugas tidak valid.');txt(t.result,'Hasil tindak lanjut');txt(t.referralTo,'Tujuan rujukan',t.type==='Rujukan',300);
      if(t.type==='Rujukan')assert(['Belum dikoordinasikan','Dalam koordinasi','Sudah ditindaklanjuti'].includes(t.referralStatus),'Status koordinasi wajib.');
      if(t.status==='Selesai'){assert(date(t.completedOn)&&t.completedOn<=day(d.settings.timezone),'Tanggal penyelesaian tidak valid.');txt(t.result,'Hasil penyelesaian',true);}meta(t);
    }
    for(const e of d.evaluations){assert(indicatorIds.includes(e.indicatorId),'Indikator evaluasi tidak ditemukan.');assert(date(e.date)&&e.date<=day(d.settings.timezone),'Tanggal evaluasi tidak valid.');txt(e.result,'Hasil');txt(e.evidence,'Sumber bukti',true);assert(DECISIONS.includes(e.decision),'Keputusan evaluasi tidak valid.');txt(e.improvement,'Rencana perbaikan',true);meta(e);}
    return d;
  }
  // CSV RFC4180 dasar: koma, petik ganda, newline dalam kutipan, UTF-8/BOM.
  function parseCSV(text) {
    text=text.replace(/^\uFEFF/,'');const rows=[];let row=[],cell='',quoted=false,closed=false;
    for(let i=0;i<text.length;i++){
      const c=text[i];if(quoted){if(c==='"'){if(text[i+1]==='"'){cell+='"';i++;}else{quoted=false;closed=true;}}else cell+=c;}
      else if(c==='"'){assert(!cell&&!closed,'Penulisan tanda petik pada daftar siswa tidak sesuai. Gunakan contoh berkas dari aplikasi.');quoted=true;}
      else if(c===','||c==='\n'||c==='\r'){row.push(cell);cell='';closed=false;if(c!==','){if(c==='\r'&&text[i+1]==='\n')i++;if(row.some(x=>x.trim()))rows.push(row);row=[];}}
      else {assert(!closed||/\s/.test(c),'Ada tanda yang tidak sesuai setelah tanda petik pada daftar siswa.');if(!closed)cell+=c;}
    }
    assert(!quoted,'Tanda petik pada daftar siswa belum lengkap.');row.push(cell);if(row.some(x=>x.trim()))rows.push(row);
    assert(rows.length>=2,'Daftar siswa harus berisi judul kolom dan minimal satu baris siswa.');
    assert(rows[0].join(',')==='kode_siswa,nama,kelas,periode,status_asrama','Judul kolom harus sesuai contoh: kode_siswa,nama,kelas,periode,status_asrama');
    return rows.slice(1).map((r,i)=>{assert(r.length===5,`Baris ${i+2}: harus lima kolom.`);return Object.fromEntries(rows[0].map((h,j)=>[h,r[j].trim()]));});
  }
  function planCSV(data,text) {
    const rows=parseCSV(text),d=clone(data),preview=[],seen=new Set();
    rows.forEach((r,i)=>{
      const line=i+2;assert(r.kode_siswa&&r.nama,`Baris ${line}: kode dan nama wajib.`);assert(!seen.has(r.kode_siswa),`Baris ${line}: kode ganda dalam berkas.`);seen.add(r.kode_siswa);
      const p=d.periods.find(p=>p.label===r.periode),c=d.classes.find(c=>c.name===r.kelas);
      assert(p&&c,`Baris ${line}: kelas/periode belum terdaftar di Pengaturan.`);assert(LEVELS[d.settings.schoolLevel].includes(c.grade),`Baris ${line}: kelas tidak sesuai jenjang.`);
      assert(['','ASRAMA','NON_ASRAMA'].includes(r.status_asrama),`Baris ${line}: status_asrama salah.`);
      let s=d.students.find(s=>s.code===r.kode_siswa),action='Baru';
      if(s){assert(s.name===r.nama,`Baris ${line}: nama berbeda untuk kode yang sama; perbaiki manual.`);action='Tambah periode';}else{s={...stamp(),code:r.kode_siswa,name:r.nama};d.students.push(s);}
      const existing=d.enrollments.find(e=>e.studentId===s.id&&e.periodId===p.id);
      if(existing){assert(existing.classId===c.id&&existing.boarding===r.status_asrama,`Baris ${line}: penempatan lama berbeda; perbaiki manual.`);action='Sudah ada — dilewati';}
      else d.enrollments.push({...stamp(),studentId:s.id,periodId:p.id,classId:c.id,boarding:r.status_asrama,active:true});
      preview.push({code:r.kode_siswa,name:r.nama,class:r.kelas,period:r.periode,action});
    });validate(d);return {data:d,preview};
  }
  // Seluruh identitas dan kegiatan di bawah adalah fiktif. Tidak mengambil data sekolah.
  function demo(){
    const d=initial();d.demo=true;
    d.settings.schoolName='SMP Harapan Insani — SIMULASI FIKTIF';
    d.settings.operatorName='Ibu Rani — Pengelola Simulasi';
    const pid=d.settings.activePeriodId,today=day(d.settings.timezone),per=d.periods[0];
    const dt=n=>{const t=new Date(today+'T12:00:00Z');t.setUTCDate(t.getUTCDate()+n);const x=t.toISOString().slice(0,10);return x<per.start?per.start:x>per.end?per.end:x;};
    d.classes=[['7A',7],['7B',7],['8A',8],['9A',9]].map(([name,grade])=>({id:uid(),name,grade}));
    const names=['Alya Pramesti','Bima Naufal','Citra Nadira','Damar Fikri','Elsa Kirana','Farhan Rayyan','Gita Salma','Hasan Aditya','Intan Zahira','Jihan Safira','Kamil Arsyad','Laila Nirmala'];
    names.forEach((name,i)=>{const s={...stamp(),code:'SIM-'+String(i+1).padStart(3,'0'),name:name+' (fiktif)'};d.students.push(s);d.enrollments.push({...stamp(),studentId:s.id,periodId:pid,classId:d.classes[Math.floor(i/3)].id,boarding:i%3===0?'ASRAMA':'NON_ASRAMA',active:i!==11});});
    const notes={Pribadi:'Perlu latihan mengenali kekuatan diri dan menyampaikan pendapat dengan percaya diri.',Sosial:'Perlu latihan pembagian peran dan komunikasi saat bekerja dalam kelompok.',Belajar:'Memerlukan jadwal belajar, hafalan, dan istirahat yang lebih seimbang.',Karier:'Ingin mengenal minat serta pilihan kegiatan dan studi lanjut yang sesuai jenjangnya.'};
    const potentials=['Senang membuat catatan bergambar.','Telaten merapikan bahan belajar.','Mau bertanya ketika belum memahami materi.','Senang membantu teman merangkum tugas.'];
    d.enrollments.forEach((en,i)=>{const field=FIELDS[i%4];d.needs.push({...stamp(),enrollmentId:en.id,date:dt(-12+i%4),sourceGroup:SOURCES[i%4],sourceLabel:['Angket kebutuhan contoh','Wawancara awal contoh','Rekap kegiatan belajar contoh','Pengamatan wali kelas contoh'][i%4],sourceActor:'Pendamping Simulasi',potential:potentials[i%4],support:notes[field],priority:i===2?'Didahulukan':'Rutin',sourceServiceId:null,fields:Object.fromEntries(FIELDS.map(f=>[f,{status:f===field?'Ada kebutuhan':'Belum dinilai',note:f===field?notes[field]:''}]))});});
    const specs=[
      ['Mengenali Kekuatan Diri','Pribadi','Membantu siswa mengenali potensi dan berlatih percaya diri.','Siswa yang menyebutkan dua kekuatan dirinya','3 dari 12 siswa','9 dari 12 siswa','Tazkiyah Awareness','Refleksi diri dengan sikap menghargai potensi setiap siswa.'],
      ['Komunikasi dan Kerja Sama Teman Sebaya','Sosial','Melatih pembagian peran, empati, dan komunikasi yang santun.','Siswa yang menjalankan peran dalam latihan kelompok','4 dari 12 siswa','9 dari 12 siswa','Heart-Centred Emotion Regulation','Melatih mendengar dan menanggapi dengan tenang.'],
      ['Belajar dan Istirahat Seimbang','Belajar','Membantu siswa membuat jadwal belajar, hafalan, dan istirahat.','Siswa yang menyusun jadwal belajar seimbang','3 dari 12 siswa','8 dari 12 siswa','Adaptive Cognition','Meninjau kebiasaan dan mencoba strategi belajar yang sesuai.'],
      ['Mengenal Minat dan Pilihan Studi Lanjut','Karier','Membuka diskusi tentang minat, kegiatan pilihan, dan studi sesuai jenjang.','Siswa yang menulis minat dan satu rencana pengembangannya','2 dari 12 siswa','9 dari 12 siswa','Divine Connection','Mengaitkan rencana pengembangan diri dengan usaha dan doa.']
    ];
    specs.forEach(([title,field,goal,label,baseline,target,value,valueNote])=>d.programs.push({...stamp(),periodId:pid,title,basis:'Data simulasi menunjukkan kebutuhan pendampingan bidang '+field.toLowerCase()+'.',goal,start:per.start,end:per.end,fields:[field],values:[value],valueNote,targets:d.enrollments.map(e=>e.id),needIds:d.needs.filter(n=>n.fields[field].status==='Ada kebutuhan').map(n=>n.id),indicators:[{id:uid(),label,baseline,target}],archived:false}));
    const service=(title,type,programIndex,indices,offset,status='Terlaksana',extra={})=>{
      const at=dt(offset),s={...stamp(),periodId:pid,programId:d.programs[programIndex].id,title,type,fields:[FIELDS[programIndex]],status,plannedAt:at+'T09:00',actualAt:status==='Terlaksana'?at+'T09:00':'',actualEndAt:status==='Terlaksana'?at+'T09:25':'',summary:status==='Terlaksana'?'Kegiatan simulasi: latihan dan diskusi dilaksanakan sesuai rencana.':'',cancelReason:status==='Batal'?'Jadwal contoh berbenturan dengan kegiatan kelas.':'',adults:type==='Parenting/Koordinasi'?'Wali kelas dan wali siswa (seluruhnya fiktif)':'',supervisor:type==='Dukungan Sebaya'?'Guru BK Simulasi':'',participants:indices.map(i=>({enrollmentId:d.enrollments[i].id,kind:type==='Parenting/Koordinasi'?'Siswa terkait':'Peserta',attendance:status==='Terlaksana'&&type!=='Parenting/Koordinasi'?'Hadir':''})),odos:Object.fromEntries([...FIELDS,'Potensi','Dukungan'].map(f=>[f,''])),...extra};
      if(type==='ODOS'&&status==='Terlaksana'){s.odos={Pribadi:'Senang mencoba kegiatan baru; ingin lebih percaya diri.',Sosial:'Bersedia belajar bekerja dalam kelompok.',Belajar:'Meminta bantuan menyusun jadwal belajar.',Karier:'Minat awal masih dieksplorasi sesuai usia.',Potensi:'Mampu merangkum ide dengan rapi.',Dukungan:'Pendampingan menyusun jadwal sederhana.'};s.summary='ODOS simulasi: mengenali potensi dan menyepakati dukungan belajar.';}
      d.services.push(s);return s;
    };
    service('ODOS awal — Alya','ODOS',2,[0],-10);
    service('ODOS awal — Bima','ODOS',0,[1],-9);
    service('ODOS awal — Citra','ODOS',2,[2],-8);
    service('ODOS tinjauan — Alya','ODOS',2,[0],-6);
    const group=service('Latihan menyusun jadwal belajar','Kelompok',2,[0,1,2,3,4,5],-5);group.participants[5].attendance='Tidak hadir';
    service('Kelas pengenalan minat','Klasikal',3,[6,7,8,9,10,11],-4);
    service('Latihan komunikasi teman sebaya','Dukungan Sebaya',1,[0,3,6,9],-3);
    service('Koordinasi dukungan belajar','Parenting/Koordinasi',2,[2],-2);
    service('ODOS terjadwal — Damar','ODOS',0,[3],1,'Terjadwal');
    service('Latihan kelompok lanjutan','Kelompok',1,[1,4,7,10],2,'Terjadwal');
    service('ODOS dibatalkan — Elsa','ODOS',0,[4],-1,'Batal');
    service('Latihan menyampaikan pendapat','Individual',0,[4],-1);
    const follow=(si,idx,action,offset,status='Belum selesai',extra={})=>{const s=d.services[si];d.followups.push({...stamp(),periodId:pid,sourceType:'service',sourceId:s.id,enrollmentId:idx===null?null:d.enrollments[idx].id,type:'Pendampingan',action,ownerName:'Pendamping Simulasi',ownerRole:'Guru BK',due:dt(offset),status,completedOn:status==='Selesai'?dt(-1):'',result:status==='Selesai'?'Simulasi: hasil latihan telah ditinjau dan langkah berikutnya disepakati.':'',referralTo:'',referralStatus:'',...extra});};
    follow(0,0,'Periksa draf jadwal belajar bersama siswa.',-1);
    follow(1,1,'Tinjau latihan menyebutkan kekuatan diri.',0);
    follow(4,null,'Adakan penguatan bagi peserta yang belum menyelesaikan jadwal.',3);
    follow(2,2,'Tinjau kebiasaan membagi waktu belajar dan istirahat.',-2,'Selesai');
    follow(6,null,'Tinjau pembagian peran dalam latihan kelompok.',-2,'Selesai');
    follow(5,9,'Koordinasikan informasi studi lanjut sesuai minat siswa.',-1,'Selesai',{type:'Rujukan',referralTo:'Konselor karier mitra (fiktif)',referralStatus:'Sudah ditindaklanjuti'});
    d.programs.forEach((p,i)=>d.evaluations.push({...stamp(),indicatorId:p.indicators[0].id,date:dt(-2),result:['6 dari 12 siswa','7 dari 12 siswa','5 dari 12 siswa','8 dari 12 siswa'][i],evidence:'Rekap lembar latihan simulasi, bukan hasil siswa nyata.',decision:i===2?'Disesuaikan':'Dilanjutkan',improvement:'Lanjutkan latihan terarah dan tinjau kembali pada pertemuan berikutnya.'}));
    d.evaluations.push({...stamp(),indicatorId:d.programs[2].indicators[0].id,date:today,result:'7 dari 12 siswa',evidence:'Tinjauan kedua lembar latihan simulasi.',decision:'Dilanjutkan',improvement:'Berikan contoh jadwal yang lebih sederhana untuk siswa yang masih memerlukan bantuan.'});
    return validate(d);
  }
  global.BKCore={APP,VERSION,SCHEMA,KEY,FIELDS,VALUES,TYPES,SOURCES,LEVELS,DECISIONS,clone,uid,now,day,assert,str,date,datetime,stamp,initial,one,studentName,periodEnrollments,latestNeeds,stats,latestEvaluation,validate,parseCSV,planCSV,demo};
  if(typeof module!=='undefined'&&module.exports)module.exports=global.BKCore;
})(typeof window!=='undefined'?window:globalThis);


/* Edumind BK V1 Lite — UI dan adapter localStorage.
 * Pakai data rekaan/alias. Penyimpanan & cadangan tidak terenkripsi.
 * Tidak mengirim data kerja melalui jaringan. Paket eksternal memuat hanya kode aplikasi.
 * Penyimpanan sekolah dan simulasi terpisah; bukan batas otorisasi/keamanan.
 */
(function(){
  'use strict';
  const root=document.getElementById('edumind-bk-v1');
  if(!root||root.dataset.loaded==='1')return;root.dataset.loaded='1';
  const C=window.BKCore,{FIELDS,VALUES,TYPES,SOURCES,LEVELS,DECISIONS,KEY}=C;
  const SIM_KEY=KEY+'.simulation.r03',MODE_KEY=KEY+'.mode.r03';
  let mode='school';try{mode=sessionStorage.getItem(MODE_KEY)==='simulation'?'simulation':'school';}catch(e){}
  const dataKey=()=>mode==='simulation'?SIM_KEY:KEY;
  const PRIVACY='<strong>Data sekolah tetap di perangkat Anda.</strong> Pada versi ini, data yang Anda masukkan tidak dikirim otomatis ke Edumind. Edumind tidak menerima data tersebut dan tidak memiliki akses untuk membacanya melalui fitur aplikasi ini.';
  const CAUTION='Gunakan perangkat pribadi dan cadangkan data secara berkala. Aplikasi belum memakai akun atau kata sandi. Orang yang mengakses perangkat atau berkas cadangan Anda dapat membaca isinya. Jangan masukkan informasi pribadi yang sangat sensitif.';

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const checked=b=>b?' checked':'', selected=(a,b)=>String(a)===String(b)?' selected':'';
  const fmt=v=>v?String(v).replace('T',' · '):'—';
  const option=(v,label,current)=>`<option value="${esc(v)}"${selected(v,current)}>${esc(label)}</option>`;
  const opts=(list,current)=>list.map(v=>option(v,v,current)).join('');
  const btn=(action,text,id='',cls='')=>`<button type="button" data-action="${action}" data-id="${esc(id)}" class="${cls}">${text}</button>`;
  const badge=(text,color='')=>`<span class="bk-badge ${color}">${esc(text)}</span>`;
  const input=(name,label,value='',type='text',req=false,extra='')=>`<label>${esc(label)}${req?' *':''}<input name="${name}" type="${type}" value="${esc(value)}" ${req?'required':''} ${extra}></label>`;
  const textarea=(name,label,value='',req=false,extra='')=>`<label>${esc(label)}${req?' *':''}<textarea name="${name}" maxlength="3000" ${req?'required':''} ${extra}>${esc(value)}</textarea></label>`;
  const select=(name,label,options,req=false)=>`<label>${esc(label)}${req?' *':''}<select name="${name}" ${req?'required':''}>${options}</select></label>`;
  const checks=(name,values,current=[])=>`<div class="bk-checks">${values.map(v=>`<label class="bk-check"><input type="checkbox" name="${name}" value="${esc(v)}"${checked(current.includes(v))}>${esc(v)}</label>`).join('')}</div>`;
  const table=(headers,rows)=>`<div class="bk-tablewrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${headers.length}"><div class="bk-empty">Belum ada data untuk ditampilkan.</div></td></tr>`}</tbody></table></div>`;
  const notice=(s,type='')=>`<div class="bk-notice ${type}">${s}</div>`;
  const periodOptions=(value)=>D.periods.map(p=>option(p.id,p.label,value)).join('');
  const pid=()=>D.settings.activePeriodId;
  const currentPeriod=()=>C.one(D.periods,pid());
  const enrolls=(p=pid())=>C.periodEnrollments(D,p);
  const activeEnrolls=(p=pid())=>enrolls(p).filter(e=>e.active);
  const enName=id=>C.studentName(D,id);
  const dateToday=()=>C.day(D.settings.timezone);
  const displayTime=()=>new Intl.DateTimeFormat('id-ID',{timeZone:D.settings.timezone,dateStyle:'short',timeStyle:'short'}).format(new Date(D.updatedAt));
  let D,raw=null,fatal='',page='home',filter={search:'',classId:''},tab='services',reportType='R1',reportFilters={},draftId='',formVersion='',lastReport='';
  let pendingCSV=null,pendingRestore=null,toastTimer=null,dialog=null;
  function readInitial(){
    try{raw=localStorage.getItem(dataKey());D=raw?C.validate(JSON.parse(raw)):(mode==='simulation'?C.demo():C.initial());const probe=dataKey()+'.probe';localStorage.setItem(probe,'1');localStorage.removeItem(probe);}
    catch(e){fatal=`Data belum dapat dibuka atau disimpan. ${userMessage(e)} Data lama tidak diganti. Buka aplikasi dari tautan resminya dan izinkan penyimpanan, atau gunakan berkas cadangan yang masih dapat dibaca.`;D=C.initial();}
  }
  async function switchWorkspace(next){
    if(!closeDialog())return;
    mode=next;try{sessionStorage.setItem(MODE_KEY,mode);}catch(e){}
    raw=null;fatal='';pendingCSV=null;pendingRestore=null;lastReport='';
    page='home';filter={search:'',classId:''};reportFilters={};
    readInitial();
    if(!fatal&&mode==='simulation'&&raw===null)await commit(D,{replace:true});
    render();
    toast(mode==='simulation'?'Data simulasi dibuka terpisah. Data sekolah tidak diubah.':'Kembali ke data sekolah. Data simulasi tidak digabungkan.');
  }
  function toast(text){const t=root.querySelector('.bk-toast');if(!t)return;t.textContent=text;t.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.hidden=true,6500);}
  function download(text,name,type='application/json'){const b=new Blob([text],{type});const u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=name;a.style.display='none';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),15000);}
  async function commit(candidate,{expected=raw,replace=false}={}){
    const writingKey=dataKey();
    const run=()=>{
      C.assert(dataKey()===writingKey,'Tempat penyimpanan telah berganti. Buka kembali formulir sebelum menyimpan.');
      C.assert(localStorage.getItem(dataKey())===expected,'Data berubah di tab lain. Tutup formulir lalu muat ulang sebelum menyimpan; masukan belum diterapkan.');
      C.validate(candidate);candidate=C.clone(candidate);candidate.revision=(replace?0:D.revision)+1;candidate.updatedAt=C.now();candidate.appVersion=C.VERSION;
      const text=JSON.stringify(candidate);C.assert(text.length<=1500000,'Data sudah mencapai batas penyimpanan aplikasi. Simpan cadangan sebelum melanjutkan. Hindari catatan yang terlalu panjang.');
      try{localStorage.setItem(dataKey(),text);}catch(e){throw new Error('Gagal menyimpan data. Data lama tetap ada. Periksa izin dan ruang penyimpanan pada aplikasi internet yang Anda gunakan, lalu coba lagi.');}
      D=candidate;raw=text;fatal='';
    };
    if(navigator.locks&&window.isSecureContext)await navigator.locks.request(dataKey(),run);else run();
  }
  function currentDataUpdate(fn){const d=C.clone(D);fn(d);return d;}
  function openDialog(title,body,kind='',id='',saveLabel='Simpan'){
    if(dialog?.open&&!closeDialog(true))return;
    draftId=id;formVersion=raw;
    root.querySelector('#bk-dialog-host').innerHTML=`<dialog><form id="bk-form" data-kind="${esc(kind)}"><div class="bk-modalhead"><h2>${esc(title)}</h2>${btn('close','Tutup ×','','bk-small')}</div><div class="bk-modalbody"><div id="bk-form-error" role="alert" hidden></div>${body}</div><div class="bk-modalfoot">${btn('close','Batal')}${kind?`<button type="submit" class="bk-primary">${esc(saveLabel)}</button>`:''}</div></form></dialog>`;
    dialog=root.querySelector('dialog');dialog.showModal();dialog.addEventListener('cancel',ev=>{ev.preventDefault();closeDialog();});
    if(kind)dialog.querySelector('form').addEventListener('submit',submitForm);
    dialog.querySelector('form').addEventListener('input',()=>dialog.dataset.dirty='1');
    dialog.querySelector('form').addEventListener('change',()=>dialog.dataset.dirty='1');
  }
  function closeDialog(force=false){if(dialog?.open){if(!force&&dialog.dataset.dirty==='1'&&!confirm('Perubahan formulir belum disimpan. Tutup dan abaikan perubahan?'))return false;dialog.close();}return true;}
  function userMessage(error){
    if(error?.name==='SyntaxError')return 'Berkas atau data tersimpan tidak dapat dibaca. Gunakan cadangan yang diunduh dari aplikasi BK tanpa mengubah isinya.';
    if(['SecurityError','QuotaExceededError','NotAllowedError'].includes(error?.name))return 'Penyimpanan belum diizinkan atau ruangnya tidak cukup. Periksa pengaturan aplikasi internet yang digunakan.';
    const message=error?.message||String(error||'');
    if(/JSON|localStorage|IndexedDB|GitHub|HTTPS|\bAPI\b|\bTypeError\b|not defined|Cannot read|Failed to/i.test(message))return 'Proses belum berhasil. Periksa berkas atau isian, lalu coba lagi. Simpan salinan data sebelum meminta bantuan.';
    return message;
  }
  function formError(e){const box=root.querySelector('#bk-form-error');if(box&&dialog?.open){box.className='bk-notice bk-error';box.textContent=userMessage(e);box.hidden=false;box.scrollIntoView({block:'nearest'});}else toast(userMessage(e));}
  function head(title,sub,actions=''){return `<div class="bk-pagehead"><div><h1>${title}</h1><p>${sub}</p></div><div class="bk-actions">${actions}</div></div>`;}
  function ensureSetup(){if(!D.settings.schoolName){openSettings();toast('Isi identitas sekolah terlebih dahulu.');return false;}return true;}
  function render(){
    if(fatal){root.innerHTML=`<div class="bk-fatal"><h1>BK V1 Lite · Pemulihan data</h1>${notice(PRIVACY,'bk-info')}${notice(esc(fatal),'bk-error')}<p>Jangan hapus data aplikasi. Unduh salinan untuk bantuan terlebih dahulu dan simpan di tempat pribadi.</p><div class="bk-actions">${btn('rawbackup','Simpan salinan untuk bantuan')}${btn('restore','Pulihkan data dari cadangan','','bk-primary')}${btn('reload','Muat ulang')}</div></div><div id="bk-dialog-host"></div><input id="bk-restore-file" type="file" accept=".json,application/json" hidden><div class="bk-toast" hidden role="status"></div>`;return;}
    const menus=[['home','Beranda'],['students','Siswa & Kebutuhan'],['programs','Program BK'],['services','Layanan & Tindak Lanjut'],['reports','Evaluasi & Laporan']];
    root.innerHTML=`<div class="bk-shell"><aside class="bk-side"><div class="bk-logo"><span class="bk-monogram">BK</span><div>Edumind Academy<br><span class="bk-overline">Program BK</span></div></div><nav class="bk-nav" aria-label="Menu aplikasi">${menus.map((m,i)=>`<button type="button" data-action="nav" data-id="${m[0]}" aria-current="${page===m[0]?'page':'false'}"><small>0${i+1}</small>${m[1]}</button>`).join('')}</nav><div class="bk-side-foot"><strong>V1 Lite · Data di perangkat</strong><br>Kenali kebutuhan.<br>Rencanakan pendampingan.<br>Pantau tindak lanjut.<p style="margin-top:14px;font-size:11px;">Versi uji ${C.VERSION}<br>Bukan rekam konseling rahasia.</p></div></aside><main class="bk-main"><header class="bk-top"><div><strong>${esc(D.settings.schoolName||'Siapkan sekolah Anda')}</strong><div class="bk-sub">${esc(D.settings.schoolLevel)} · ${esc(D.settings.operatorName||'Pengelola belum diisi')}${D.demo?' · DATA SIMULASI FIKTIF':''}</div></div><div class="bk-top-actions"><select id="bk-period" aria-label="Periode aktif">${periodOptions(pid())}</select>${btn('backup','Cadangkan data','','bk-small')}${btn('settings','Pengaturan','','bk-small')}</div></header>${notice(PRIVACY+'<br><span class="bk-muted">Gunakan perangkat pribadi. Cadangkan data secara berkala.</span>','bk-info')}<div class="bk-workspace-bar">${mode==='simulation'?'<div><strong>MODE SIMULASI · SELURUH DATA FIKTIF</strong><br>Latihan di sini tidak mengubah data sekolah.</div>'+btn('school-workspace','Kembali ke data sekolah','','bk-small'):'<div><strong>Ruang data sekolah</strong><br>Contoh latihan tersedia terpisah dari data sekolah.</div>'+btn('demo','Coba data simulasi','','bk-small')}</div><div id="bk-conflict"></div><div id="bk-page">${pageContent()}</div><div class="bk-foot">${raw?`Terakhir tersimpan: ${esc(displayTime())} · Pembaruan data ke-${D.revision}`:'Belum ada data yang disimpan'} · Cadangan terakhir diminta: ${D.lastBackupAt?esc(fmt(D.lastBackupAt.slice(0,16))):'belum pernah'}. Pastikan berkas benar-benar tersimpan di perangkat.<br>Orang yang memakai aplikasi internet yang sama pada perangkat ini dapat membuka data. Halaman lain di situs yang sama juga dapat mengakses data tersimpan. Jangan masukkan informasi pribadi yang sangat sensitif.</div></main></div><div id="bk-dialog-host"></div><input id="bk-restore-file" type="file" accept=".json,application/json" hidden><input id="bk-csv-file" type="file" accept=".csv,text/csv" hidden><div class="bk-toast" role="status" hidden></div>`;
  }
  function pageContent(){return ({home:home,students:students,programs:programs,services:services,reports:reports})[page]();}
  function home(){
    const st=C.stats(D,pid()),today=dateToday();
    const agendas=D.services.filter(s=>s.periodId===pid()&&s.status==='Terjadwal').sort((a,b)=>a.plannedAt.localeCompare(b.plannedAt)).slice(0,5);
    const open=D.followups.filter(t=>t.status==='Belum selesai').sort((a,b)=>a.due.localeCompare(b.due)).slice(0,5);
    return head('Pendampingan yang terarah','Mulai dari pekerjaan yang perlu diselesaikan hari ini.',btn('new-service','+ Catat layanan','','bk-primary'))+
      (!D.students.length?`<section class="bk-card bk-hero"><div class="bk-overline">Mulai sederhana</div><h2 style="margin-top:8px;">Satu alur kerja, dari kebutuhan hingga evaluasi.</h2><p>Siapkan profil sekolah dan siswa, atau coba data simulasi yang terpisah dari pekerjaan Anda.</p><div class="bk-actions">${btn('settings','Mulai dengan data kosong','','bk-primary')}${btn('demo','Coba data simulasi')}</div></section>`:'')+
      `<div class="bk-stats">${[['Siswa periode ini',st.total,'Seluruh penempatan'],['Jangkauan ODOS',`${st.odos}/${st.total}`,st.total?`${Math.round(st.odos/st.total*100)}% siswa terjangkau`:'Belum ada sasaran'],['Layanan terlaksana',st.activities,'Kegiatan unik, bukan peserta'],['Tindak lanjut terbuka',st.open,`${st.overdue} lewat tenggat`]].map(v=>`<div class="bk-stat"><span>${v[0]}</span><strong>${v[1]}</strong><span>${v[2]}</span></div>`).join('')}</div><div class="bk-grid2"><section class="bk-card"><h2>Agenda layanan</h2><p class="bk-muted">Jadwal manual periode aktif.</p>${agendas.length?agendas.map(s=>`<div class="bk-rowitem"><div><strong>${esc(s.title)}</strong><div class="bk-muted">${esc(fmt(s.plannedAt))} · ${esc(s.type)}</div></div>${btn('edit-service','Buka',s.id,'bk-small')}</div>`).join(''):'<div class="bk-empty">Belum ada jadwal. Mulai dari satu pertemuan.</div>'}</section><section class="bk-card"><h2>Tindak lanjut terdekat</h2><p class="bk-muted">Termasuk tugas terbuka dari periode sebelumnya.</p>${open.length?open.map(t=>`<div class="bk-rowitem"><div><strong>${esc(t.action)}</strong><div class="bk-muted">${esc(t.ownerName)} · ${esc(t.due)} ${t.due<today?badge('Lewat tenggat','red'):t.due===today?badge('Hari ini','amber'):''}</div></div>${btn('edit-follow','Buka',t.id,'bk-small')}</div>`).join(''):'<div class="bk-empty">Tidak ada tugas terbuka.</div>'}</section></div><section class="bk-card"><div class="bk-pagehead" style="margin-top:0"><div><h2>Siswa yang belum mendapatkan ODOS</h2><p>Nonaktif tetap dalam rekap, tetapi tidak dijadwalkan baru.</p></div>${badge(`${st.unreached.length} siswa`)}</div>${table(['Siswa / kelas','Status','Langkah berikutnya'],st.unreached.slice(0,8).map(e=>[esc(enName(e.id)),badge(e.active?'Aktif':'Nonaktif'),e.active?btn('odos-student','Jadwalkan ODOS',e.id,'bk-small'):'—']))}${st.unreached.length>8?'<p class="bk-muted">Menampilkan delapan pertama. Daftar lengkap tersedia di Siswa & Kebutuhan.</p>':''}</section>`;
  }
  function students(){
    let es=enrolls();const latest=C.latestNeeds(D,pid());const st=C.stats(D,pid());const missing=new Set(st.unreached.map(e=>e.id));
    const counts=FIELDS.map(f=>[f,es.filter(e=>latest[e.id][f].status==='Ada kebutuhan').length,es.filter(e=>latest[e.id][f].status==='Belum dinilai').length]);
    if(filter.classId)es=es.filter(e=>e.classId===filter.classId);
    if(filter.search){const q=filter.search.toLowerCase();es=es.filter(e=>{const s=C.one(D.students,e.studentId);return (s.name+' '+s.code).toLowerCase().includes(q);});}
    return head('Siswa & kebutuhan','Satu identitas, riwayat per periode.',btn('new-student','+ Tambah siswa','','bk-primary')+btn('csv','Masukkan daftar siswa'))+
      `<section class="bk-card"><details><summary>Rekap kebutuhan empat bidang</summary>${table(['Bidang','Siswa dengan kebutuhan','Belum dinilai'],counts.map(r=>r.map(esc)))}<p class="bk-muted">Temuan terbaru yang sudah ditelaah per bidang; catatan baru yang belum dinilai tidak menghapus temuan lama.</p></details><div class="bk-filter"><label>Cari siswa<input id="bk-search" type="search" value="${esc(filter.search)}" placeholder="Nama/alias atau kode"></label><label>Kelas<select id="bk-class">${option('','Semua kelas',filter.classId)}${D.classes.map(c=>option(c.id,c.name,filter.classId)).join('')}</select></label>${btn('search','Terapkan filter','','bk-small')}</div>${table(['Kode','Nama / kelas','Kebutuhan tercatat','ODOS','Tindakan'],es.map(e=>{const s=C.one(D.students,e.studentId),needs=FIELDS.filter(f=>latest[e.id][f].status==='Ada kebutuhan');return [esc(s.code),`<strong>${esc(s.name)}</strong><div class="bk-muted">${esc(C.one(D.classes,e.classId).name)}${e.active?'':' · Nonaktif'}</div>`,needs.length?needs.map(f=>badge(f)).join(' '):'<span class="bk-muted">Belum ada kebutuhan teridentifikasi*</span>',badge(missing.has(e.id)?'Belum':'Sudah',missing.has(e.id)?'amber':'green'),`<div class="bk-actions">${btn('student-detail','Riwayat',e.id,'bk-small')}${btn('edit-student','Edit',e.id,'bk-small')}${btn('new-need','+ Kebutuhan',e.id,'bk-small')}</div>`];}))}<p class="bk-muted" style="margin-top:12px;">*Tidak berarti siswa tidak memiliki kebutuhan; periksa kelengkapan penelaahan.</p></section>`;
  }
  function programs(){
    const ps=D.programs.filter(p=>p.periodId===pid());
    return head('Program BK','Dari kebutuhan yang tercatat menjadi rencana kerja.',btn('new-program','+ Buat program','','bk-primary'))+
      (ps.length?ps.map(p=>`<section class="bk-card"><div class="bk-pagehead" style="margin:0 0 14px;"><div><div class="bk-actions" style="margin-bottom:7px;">${p.fields.map(f=>badge(f)).join(' ')}${p.archived?badge('Arsip'):''}</div><h2>${esc(p.title)}</h2><p>${esc(p.start)} — ${esc(p.end)} · ${p.targets.length} siswa sasaran</p></div><div class="bk-actions">${btn('edit-program','Edit',p.id,'bk-small')}${btn('service-program','+ Layanan',p.id,'bk-small')}${btn('evaluate','Evaluasi',p.id,'bk-small')}</div></div><p>${esc(p.goal)}</p><details><summary>Indikator, sumber, dan riwayat evaluasi</summary>${table(['Indikator','Kondisi awal','Target','Hasil terbaru'],p.indicators.map(i=>{const e=C.latestEvaluation(D,i.id);return [esc(i.label),esc(i.baseline||'Belum ada data'),esc(i.target),e?esc(`${e.result||'Belum ada data'} · ${e.date} · ${e.decision}`):'Belum dievaluasi'];}))}<p class="bk-muted" style="margin-top:10px;">Dasar: ${esc(p.basis)}</p>${p.needIds.map(id=>btn('need-detail','Buka sumber kebutuhan',id,'bk-small')).join(' ')}${p.values.length?`<p class="bk-muted" style="margin-top:10px;">${esc(p.values.join(' · '))}<br>${esc(p.valueNote)}</p>`:''}${p.indicators.map(i=>{const hist=D.evaluations.filter(e=>e.indicatorId===i.id).sort((a,b)=>b.date.localeCompare(a.date));return hist.length?`<h3 style="margin-top:15px;">Riwayat: ${esc(i.label)}</h3>${table(['Tanggal','Hasil / bukti','Keputusan'],hist.map(e=>[esc(e.date),esc(e.result||'Belum ada data')+'<br>'+esc(e.evidence),esc(e.decision)+'<br>'+esc(e.improvement)]))}`:'';}).join('')}</details></section>`).join(''):'<section class="bk-card bk-empty">Belum ada program. Siswa dan kebutuhan menjadi dasar perencanaan Anda.</section>');
  }
  function services(){
    const ss=D.services.filter(s=>s.periodId===pid()).sort((a,b)=>(b.actualAt||b.plannedAt||'').localeCompare(a.actualAt||a.plannedAt||''));
    const fs=D.followups.filter(f=>f.periodId===pid()).sort((a,b)=>a.due.localeCompare(b.due));
    return head('Layanan & tindak lanjut','ODOS, kelompok, koordinasi, dan tugas pendampingan.',btn('new-service','+ Catat layanan','','bk-primary'))+`<div class="bk-tabline">${btn('service-tab','Layanan', 'services',tab==='services'?'active':'')}${btn('service-tab','Tindak lanjut','followups',tab==='followups'?'active':'')}</div><section class="bk-card">${tab==='services'?table(['Waktu / jenis','Layanan','Peserta / status','Tindakan'],ss.map(s=>[esc(fmt(s.actualAt||s.plannedAt))+'<br>'+badge(s.type),esc(s.title)+'<div class="bk-muted">'+esc(s.programId?C.one(D.programs,s.programId)?.title:'Insidental / tanpa program')+'</div>',`${s.participants.length} siswa terkait<br>${badge(s.status,s.status==='Terlaksana'?'green':s.status==='Batal'?'red':'amber')}`,`<div class="bk-actions">${btn('edit-service','Buka',s.id,'bk-small')}${btn('follow-service','+ Tugas',s.id,'bk-small')}${s.type==='ODOS'?btn('need-service','→ Kebutuhan',s.id,'bk-small'):''}</div>`])):table(['Tugas','Penanggung jawab','Batas waktu / status','Tindakan'],fs.map(t=>[esc(t.action)+'<br>'+badge(t.type),esc(t.ownerName)+'<div class="bk-muted">'+esc(t.ownerRole)+'</div>',esc(t.due)+'<br>'+badge(t.status,t.status==='Selesai'?'green':t.due<dateToday()?'red':'amber'),btn('edit-follow','Tinjau',t.id,'bk-small')]))}${tab==='followups'?'<p class="bk-muted" style="margin-top:12px;">Buat tugas dari catatan kebutuhan atau layanan agar asalnya tetap jelas.</p>':''}</section>`;
  }
  function reports(){
    const ps=D.programs.filter(p=>p.periodId===pid());
    return head('Evaluasi & laporan','Periksa hasil program, bukan hanya jumlah kegiatan.')+`<section class="bk-card"><h2>Catat hasil evaluasi</h2>${table(['Program','Indikator','Peninjauan',''],ps.map(p=>[esc(p.title),String(p.indicators.length),String(D.evaluations.filter(e=>p.indicators.some(i=>i.id===e.indicatorId)).length),btn('evaluate','+ Evaluasi',p.id,'bk-small')]))}</section><section class="bk-card"><h2>Tiga laporan tetap</h2><p class="bk-muted">Laporan tidak mengambil nama siswa, uraian kebutuhan, ringkasan ODOS, atau rincian rujukan. Teks program/evaluasi tetap harus ditinjau sebelum dibagikan.</p><div class="bk-filter"><label>Jenis laporan<select id="bk-report-type">${[['R1','Rencana Program'],['R2','Pelaksanaan Layanan'],['R3','Evaluasi & Tindak Lanjut']].map(r=>option(r[0],r[1],reportType)).join('')}</select></label></div>${reportType==='R2'?`<div class="bk-filter">${input('report-from','Aktual mulai',reportFilters.from||'','date')}${input('report-to','Aktual sampai',reportFilters.to||'','date')}${select('report-class','Kelas',option('','Semua',reportFilters.classId)+D.classes.map(c=>option(c.id,c.name,reportFilters.classId)).join(''))}${select('report-field','Bidang',option('','Semua',reportFilters.field)+opts(FIELDS,reportFilters.field))}</div>`:''}<div class="bk-actions">${btn('preview-report','Pratinjau laporan','','bk-primary')}</div></section>`;
  }
  // ---------------- Enam formulir inti ----------------
  function openStudent(eid=''){
    if(!ensureSetup())return;const en=eid?C.one(D.enrollments,eid):null,s=en?C.one(D.students,en.studentId):{};
    const gradeClasses=D.classes.filter(c=>LEVELS[D.settings.schoolLevel].includes(c.grade));
    openDialog(en?'Edit siswa / penempatan':'Tambah siswa',notice('Untuk uji awal gunakan kode dan alias siswa. Kode yang sama pada periode baru menggunakan identitas yang sama.','bk-info')+`<div class="bk-formgrid">${input('code','Kode siswa/NIS',s.code||'','text',true,'maxlength="60"')}${input('name','Nama atau alias siswa',s.name||'','text',true,'maxlength="120"')}${select('periodId','Periode',periodOptions(en?.periodId||pid()),true)}${select('classId','Kelas',gradeClasses.map(c=>option(c.id,c.name,en?.classId)).join(''),true)}${select('boarding','Status asrama',[['','Belum diisi'],['ASRAMA','Asrama'],['NON_ASRAMA','Nonasrama']].map(v=>option(v[0],v[1],en?.boarding)).join(''))}${en?select('active','Status penempatan',option('true','Aktif',String(en.active))+option('false','Nonaktif',String(en.active))):''}</div>`,'student',eid);
    if(en)dialog.querySelector('[name=periodId]').disabled=true;
  }
  function fieldNeedsHTML(fields){return FIELDS.map(f=>`<fieldset><legend>${f}</legend>${select('status-'+f,'Status',opts(['Belum dinilai','Ada kebutuhan','Belum teridentifikasi kebutuhan'],fields?.[f]?.status||'Belum dinilai'))}${textarea('note-'+f,'Catatan ringkas',fields?.[f]?.note||'')}</fieldset>`).join('');}
  function openNeed(eid,id='',sourceServiceId=''){
    if(!ensureSetup())return;const n=id?C.one(D.needs,id):null;eid=n?.enrollmentId||eid;
    C.assert(eid,'Pilih siswa terlebih dahulu.');const en=C.one(D.enrollments,eid);C.assert(en,'Siswa tidak ditemukan.');
    const s=sourceServiceId?C.one(D.services,sourceServiceId):null;
    openDialog(n?'Koreksi catatan kebutuhan':'Catat kebutuhan siswa',`<p><strong>${esc(enName(eid))}</strong> · ${esc(C.one(D.periods,en.periodId).label)}</p>${notice('Temuan baru dibuat sebagai catatan baru. Gunakan ringkasan dukungan, bukan rincian rahasia pribadi.')}<input type="hidden" name="enrollmentId" value="${esc(eid)}"><input type="hidden" name="sourceServiceId" value="${esc(n?.sourceServiceId||sourceServiceId)}"><div class="bk-formgrid">${input('date','Tanggal informasi',n?.date||dateToday(),'date',true)}${select('sourceGroup','Kelompok sumber',opts(SOURCES,n?.sourceGroup||(s?'Tidak terstruktur':'Terstruktur')),true)}${input('sourceLabel','Keterangan sumber',n?.sourceLabel||(s?'Ringkasan ODOS':''),'text',true,'maxlength="300"')}${input('sourceActor','Pemberi informasi / peran',n?.sourceActor||'','text',false,'maxlength="200"')}</div><details open><summary>Empat bidang layanan</summary>${fieldNeedsHTML(n?.fields)}</details><div class="bk-formgrid">${textarea('potential','Potensi/kekuatan',n?.potential||s?.odos?.Potensi||'')}${textarea('support','Dukungan yang diminta',n?.support||s?.odos?.Dukungan||'')}${select('priority','Prioritas kerja, bukan diagnosis',opts(['Belum ditetapkan','Rutin','Didahulukan'],n?.priority||'Belum ditetapkan'))}</div>`,'need',id);
  }
  function needDetail(id){const n=C.one(D.needs,id);C.assert(n,'Catatan tidak ditemukan.');const p=C.one(D.enrollments,n.enrollmentId);openDialog('Catatan kebutuhan',`<p><strong>${esc(enName(n.enrollmentId))}</strong> · ${esc(n.date)}</p><p class="bk-muted">${esc(n.sourceGroup)} · ${esc(n.sourceLabel)} · ${esc(C.one(D.periods,p.periodId).label)}</p>${table(['Bidang','Status','Ringkasan'],FIELDS.map(f=>[f,esc(n.fields[f].status),esc(n.fields[f].note||'—')]))}<p style="margin-top:14px;">Potensi: ${esc(n.potential||'Belum dicatat')}<br>Dukungan: ${esc(n.support||'Belum dicatat')}</p><div class="bk-actions">${btn('edit-need','Koreksi',id)}${btn('follow-need','+ Tindak lanjut',id,'bk-primary')}${btn('program-need','→ Program',id)}</div>`);}
  function studentDetail(eid){const en=C.one(D.enrollments,eid);C.assert(en,'Penempatan tidak ditemukan.');const ns=D.needs.filter(n=>n.enrollmentId===eid).sort((a,b)=>b.date.localeCompare(a.date));const ss=D.services.filter(s=>s.participants.some(p=>p.enrollmentId===eid));openDialog('Riwayat siswa',`<h2>${esc(enName(eid))}</h2><p>${esc(C.one(D.periods,en.periodId).label)}</p><div class="bk-actions">${btn('new-need','+ Catat kebutuhan',eid,'bk-primary')}${en.active?btn('odos-student','+ ODOS',eid):''}</div><h3 style="margin-top:22px;">Catatan kebutuhan</h3>${table(['Tanggal','Sumber',''],ns.map(n=>[esc(n.date),esc(n.sourceLabel),btn('need-detail','Buka',n.id,'bk-small')]))}<h3 style="margin-top:22px;">Layanan dan kehadiran</h3>${table(['Waktu','Jenis / status','Keterlibatan',''],ss.map(s=>{const p=s.participants.find(p=>p.enrollmentId===eid);return [esc(fmt(s.actualAt||s.plannedAt)),esc(s.type)+'<br>'+esc(s.status),esc(p.kind)+'<br>'+esc(p.attendance||'Belum dicatat'),btn('edit-service','Buka',s.id,'bk-small')];}))}`);}
  function indicatorHTML(i={id:C.uid(),label:'',baseline:'',target:''}){const locked=D.evaluations.some(e=>e.indicatorId===i.id);return `<div class="bk-indicator" data-indicator-id="${esc(i.id)}">${input('i-label','Indikator',i.label,'text',true,`maxlength="500" ${locked?'readonly':''}`)}<div class="bk-formgrid">${textarea('i-baseline','Kondisi awal (kosong = belum ada data)',i.baseline,false,locked?'readonly':'maxlength="1500"')}${textarea('i-target','Target',i.target,true,locked?'readonly':'maxlength="1500"')}</div>${locked?'<p class="bk-muted">Sudah dievaluasi: dasar pengukuran dikunci. Tambahkan indikator baru untuk perubahan rencana.</p>':btn('remove-indicator','Hapus baris indikator','','bk-small bk-danger')}</div>`;}
  function targetList(targets=[],p=pid()){return `<div class="bk-actions" style="margin-bottom:10px;">${btn('select-all-targets','Pilih semua aktif','','bk-small')}<select id="bk-target-class" aria-label="Pilih kelas sasaran" style="width:auto;">${option('','Pilih kelas','')}${D.classes.map(c=>option(c.id,c.name,'')).join('')}</select>${btn('select-class-targets','Tambahkan kelas','','bk-small')}</div><div class="bk-checklist">${enrolls(p).map(e=>`<label class="bk-check"><input type="checkbox" name="targets" value="${esc(e.id)}" data-class="${esc(e.classId)}" data-active="${e.active}"${checked(targets.includes(e.id))}>${esc(enName(e.id))}${e.active?'':' (nonaktif)'}</label>`).join('')}</div>`;}
  function openProgram(id='',needId=''){
    if(!ensureSetup())return;C.assert(enrolls().length,'Tambahkan siswa pada periode aktif terlebih dahulu.');
    const p=id?C.one(D.programs,id):null,per=p?C.one(D.periods,p.periodId):currentPeriod(),n=needId?C.one(D.needs,needId):null;
    const targets=p?.targets||(n&&C.one(D.enrollments,n.enrollmentId)?.periodId===per.id?[n.enrollmentId]:[]);
    openDialog(p?'Edit program BK':'Buat program BK',notice('Teks program akan masuk laporan. Hindari nama siswa dan rincian kasus pribadi.','bk-info')+`<input type="hidden" name="periodId" value="${esc(per.id)}">${input('title','Nama program',p?.title||'','text',true,'maxlength="180"')}${textarea('basis','Dasar kebutuhan (layak laporan)',p?.basis||'',true)}<details><summary>Tautkan catatan sumber kebutuhan (opsional)</summary><div class="bk-checklist">${D.needs.map(n=>`<label class="bk-check"><input type="checkbox" name="needIds" value="${esc(n.id)}"${checked((p?.needIds||[needId]).includes(n.id))}>${esc(n.date+' · '+enName(n.enrollmentId))}</label>`).join('')||'Belum ada catatan.'}</div></details>${textarea('goal','Tujuan program',p?.goal||'',true)}<label>Bidang layanan *</label>${checks('fields',FIELDS,p?.fields||[])}<div class="bk-formgrid">${input('start','Mulai',p?.start||per.start,'date',true)}${input('end','Selesai rencana',p?.end||per.end,'date',true)}</div><fieldset><legend>Sasaran program *</legend><p class="bk-muted">Daftar tersimpan saat dipilih; siswa baru tidak ditambahkan otomatis.</p>${targetList(targets,per.id)}</fieldset><fieldset><legend>Indikator keberhasilan *</legend><div id="bk-indicators">${(p?.indicators||[{id:C.uid(),label:'',baseline:'',target:''}]).map(indicatorHTML).join('')}</div>${btn('add-indicator','+ Tambah indikator','','bk-small')}</fieldset><details><summary>TAUHID-CARE dan pengaturan lanjutan</summary>${checks('values',VALUES,p?.values||[])}${textarea('valueNote','Penerapan nilai (wajib bila nilai dipilih)',p?.valueNote||'')}${p?select('archived','Status program',option('false','Aktif',String(p.archived))+option('true','Arsip',String(p.archived))):''}</details>`,'program',id);
  }
  function participantHTML(en,p={}){return `<tr data-enrollment="${esc(en.id)}"><td><label class="bk-check"><input type="checkbox" name="participant" value="${esc(en.id)}"${checked(Boolean(p.enrollmentId))}>${esc(enName(en.id))}${en.active?'':' (nonaktif)'}</label></td><td><select name="kind" aria-label="Peran ${esc(enName(en.id))}">${opts(['Peserta','Siswa terkait'],p.kind||'Peserta')}</select></td><td><select name="attendance" aria-label="Kehadiran ${esc(enName(en.id))}">${option('','Belum dicatat',p.attendance)}${opts(['Hadir','Tidak hadir'],p.attendance)}</select></td></tr>`;}
  function openService(id='',eid='',programId=''){
    if(!ensureSetup())return;
    const s=id?C.one(D.services,id):null,pr=s?.periodId||(eid?C.one(D.enrollments,eid).periodId:pid()),prog=s?.programId||programId;
    const ens=enrolls(pr);const sampleParticipants=s?.participants||(eid?[{enrollmentId:eid,kind:'Peserta',attendance:''}]:[]);
    openDialog(s?'Layanan / ODOS':'Jadwalkan atau catat layanan',notice('Catat hanya ringkasan kegiatan dan tindak lanjut. Jangan masukkan isi percakapan konseling yang rahasia. Orang yang memakai perangkat ini dapat membuka catatan.')+`<input type="hidden" name="periodId" value="${esc(pr)}"><div class="bk-formgrid">${input('title','Judul internal layanan',s?.title||(eid?'ODOS pengenalan siswa':''),'text',true,'maxlength="180"')}${select('type','Jenis layanan',opts(TYPES,s?.type||(eid?'ODOS':'Individual')),true)}${select('programId','Program (boleh insidental)',option('','Tanpa program / insidental',prog)+D.programs.filter(p=>p.periodId===pr).map(p=>option(p.id,p.title,prog)).join(''))}${select('status','Status',opts(['Terjadwal','Terlaksana','Batal'],s?.status||'Terjadwal'),true)}${input('plannedAt','Jadwal',s?.plannedAt||dateToday()+'T08:00','datetime-local')}${input('actualAt','Pelaksanaan aktual',s?.actualAt||'','datetime-local')}${input('actualEndAt','Akhir pelaksanaan (opsional)',s?.actualEndAt||'','datetime-local')}</div><p class="bk-muted">Waktu mengikuti ${esc(D.settings.timezone)}. Terjadwal wajib jadwal; Terlaksana wajib waktu aktual, hasil, dan kehadiran.</p><label>Bidang layanan *</label>${checks('fields',FIELDS,s?.fields||C.one(D.programs,prog)?.fields||[])}<fieldset><legend>Peserta / siswa terkait</legend><p class="bk-muted">ODOS/Individual: satu siswa. Koordinasi orang tua: anak dapat dipilih sebagai Siswa terkait (tanpa kehadiran langsung).</p><div class="bk-tablewrap"><table><thead><tr><th>Siswa</th><th>Peran</th><th>Kehadiran</th></tr></thead><tbody id="bk-participants">${ens.map(e=>participantHTML(e,sampleParticipants.find(p=>p.enrollmentId===e.id))).join('')}</tbody></table></div></fieldset>${textarea('summary','Ringkasan hasil operasional',s?.summary||'')}${textarea('cancelReason','Alasan pembatalan (untuk status Batal)',s?.cancelReason||'')}<div id="bk-odos-fields" ${s?.type==='ODOS'||(!s&&eid)?'':'hidden'}><details open><summary>Catatan ODOS ringkas</summary><p class="bk-muted">Kosong = belum dibahas, bukan tidak ada kebutuhan. Tidak masuk laporan umum.</p><div class="bk-formgrid">${[...FIELDS,'Potensi','Dukungan'].map(f=>textarea('odos-'+f,f==='Dukungan'?'Dukungan yang dibutuhkan siswa':f,s?.odos?.[f]||'')).join('')}</div></details></div><details ${s?.type==='Parenting/Koordinasi'||s?.type==='Dukungan Sebaya'?'open':''}><summary>Koordinasi dan pembimbing</summary>${textarea('adults','Pihak dewasa dan peran (wajib untuk parenting/koordinasi)',s?.adults||'')}${input('supervisor','Pembimbing dewasa (wajib untuk dukungan sebaya)',s?.supervisor||'','text',false,'maxlength="200"')}</details>`,'service',id);
  }
  function openFollow(sourceType,sourceId,id=''){
    const t=id?C.one(D.followups,id):null;sourceType=t?.sourceType||sourceType;sourceId=t?.sourceId||sourceId;
    const source=C.one(sourceType==='need'?D.needs:D.services,sourceId);C.assert(source,'Sumber tindak lanjut tidak ditemukan.');
    const scope=sourceType==='need'?[source.enrollmentId]:source.participants.map(p=>p.enrollmentId);
    openDialog(t?'Tinjau tindak lanjut':'Buat tindak lanjut',`<p class="bk-muted">Asal: ${sourceType==='need'?'catatan kebutuhan '+esc(source.date):esc(source.title)}. Penyelesaian layanan tidak menutup tugas secara otomatis.</p><input type="hidden" name="sourceType" value="${sourceType}"><input type="hidden" name="sourceId" value="${esc(sourceId)}"><div class="bk-formgrid">${select('type','Jenis tugas',opts(['Pendampingan','Rujukan'],t?.type||'Pendampingan'))}${select('enrollmentId','Cakupan', (sourceType==='service'?option('','Seluruh kegiatan',t?.enrollmentId):'')+scope.map(eid=>option(eid,enName(eid),t?.enrollmentId||(sourceType==='need'?scope[0]:''))).join(''))}</div>${textarea('action','Tindakan yang harus dilakukan',t?.action||'',true)}<div class="bk-formgrid">${input('ownerName','Penanggung jawab',t?.ownerName||D.settings.operatorName,'text',true,'maxlength="180"')}${input('ownerRole','Peran',t?.ownerRole||'Guru BK','text',true,'maxlength="180"')}${input('due','Batas waktu / tanggal peninjauan',t?.due||dateToday(),'date',true)}${select('status','Status tugas',opts(['Belum selesai','Selesai'],t?.status||'Belum selesai'))}${input('completedOn','Tanggal selesai (wajib jika Selesai)',t?.completedOn||'','date')}</div>${textarea('result','Hasil peninjauan (wajib jika Selesai)',t?.result||'')}<fieldset><legend>Khusus rujukan</legend>${input('referralTo','Pihak/instansi tujuan',t?.referralTo||'','text',false,'maxlength="300"')}${select('referralStatus','Status koordinasi',opts(['Belum dikoordinasikan','Dalam koordinasi','Sudah ditindaklanjuti'],t?.referralStatus||'Belum dikoordinasikan'))}<p class="bk-muted">Pencatatan saja; tidak ada pesan otomatis. Aplikasi bukan kanal darurat.</p></fieldset>`,'follow',id);
  }
  function openEvaluation(programId){const p=C.one(D.programs,programId);C.assert(p,'Program tidak ditemukan.');const i=p.indicators[0];openDialog('Tambah peninjauan program',notice('Tulis hasil dan perbaikan tanpa identitas siswa; bagian ini akan masuk laporan.','bk-info')+`<p><strong>${esc(p.title)}</strong></p>${select('indicatorId','Indikator',p.indicators.map(i=>option(i.id,i.label,'')).join(''),true)}<div id="bk-eval-basis" class="bk-notice bk-info">Kondisi awal: ${esc(i.baseline||'Belum ada data')}<br>Target: ${esc(i.target)}</div>${input('date','Tanggal peninjauan',dateToday(),'date',true)}${textarea('result','Hasil pengukuran (kosong = belum ada data)')}${textarea('evidence','Sumber bukti/catatan', '',true)}${select('decision','Keputusan guru BK',opts(DECISIONS,'Dilanjutkan'),true)}${textarea('improvement','Tindak perbaikan/keputusan lanjutan','',true)}<p class="bk-muted">Menyimpan peninjauan baru. Riwayat dan kondisi awal tidak ditimpa.</p>`,'evaluation');}
  // ---------------- Pengaturan dan pemulihan ----------------
  function openSettings(){
    openDialog('Pengaturan & cadangan',notice(PRIVACY+'<br><br><strong>Satu kumpulan data pada ruang yang sedang dibuka.</strong> Nama pengelola hanya identitas pencatat, bukan akun dengan kata sandi. Orang yang memakai aplikasi internet yang sama pada perangkat ini dapat membuka datanya.')+`<div class="bk-formgrid">${input('schoolName','Nama sekolah',D.settings.schoolName,'text',true,'maxlength="160"')}${input('operatorName','Nama guru BK/pengelola',D.settings.operatorName,'text',true,'maxlength="120"')}${select('schoolLevel','Jenjang',opts(Object.keys(LEVELS),D.settings.schoolLevel),true)}${select('timezone','Zona waktu',opts(['Asia/Jakarta','Asia/Makassar','Asia/Jayapura'],D.settings.timezone),true)}${select('activePeriodId','Periode aktif',periodOptions(pid()),true)}</div><details><summary>Tambah periode / kelas</summary><p class="bk-muted">Tidak mengubah riwayat lama. Kelas awal mengikuti jenjang; tambahkan rombel lain bila perlu.</p>${table(['Periode','Mulai','Akhir'],D.periods.map(p=>[esc(p.label),esc(p.start),esc(p.end)]))}<div class="bk-formgrid" style="margin-top:12px;">${input('newPeriodLabel','Nama periode baru','','text',false,'maxlength="100"')}${input('newPeriodStart','Tanggal mulai periode baru','','date')}${input('newPeriodEnd','Tanggal akhir periode baru','','date')}</div><p class="bk-muted">Kelas tersedia: ${esc(D.classes.map(c=>c.name).join(', '))}</p><div class="bk-formgrid">${input('newClassName','Nama kelas baru (contoh: 7B)','','text',false,'maxlength="50"')}${input('newClassGrade','Tingkat kelas baru (1–12)','','number',false,'min="1" max="12"')}</div></details>${mode==='simulation'?`<fieldset><legend>Latihan dengan data fiktif</legend><p>Data latihan disimpan terpisah. Mengatur ulang latihan tidak mengubah data sekolah.</p>${btn('reset-simulation','Kembalikan contoh simulasi awal')}</fieldset>`:''}<fieldset><legend>Cadangkan & pulihkan</legend><p>Berkas cadangan berisi seluruh data aplikasi. <strong>Siapa pun yang memperoleh berkas ini dapat membaca isinya.</strong> Simpan di tempat pribadi. Jangan bagikan ke grup pesan atau tempat yang bisa dibuka banyak orang. Laporan cetak tidak dapat digunakan untuk memulihkan data aplikasi.</p><div class="bk-actions">${btn('backup','Unduh cadangan data','','bk-primary')}${btn('restore','Pulihkan data dari cadangan')}${btn('rawbackup','Simpan salinan untuk bantuan')}</div><p class="bk-muted" style="margin-top:10px;">Memulihkan cadangan akan mengganti seluruh data yang sedang dibuka, bukan menambah atau menggabungkannya. Simpan cadangan data saat ini terlebih dahulu.</p></fieldset><details><summary>Batas penggunaan V1 Lite</summary><p>${PRIVACY}</p><p>Ini bukan jaminan keamanan mutlak. Kode lain pada situs yang sama dapat mengakses data yang terbuka di halaman ini. Versi ini digunakan untuk uji coba pengelolaan program. Gunakan data contoh atau nama samaran dan perangkat pribadi. Jangan masukkan catatan konseling mendalam, rahasia keluarga, rincian trauma, hasil diagnosis, atau lampiran pribadi.</p><p>Data mengikuti situs, perangkat, dan aplikasi internet yang digunakan, misalnya Chrome. Mengganti nama sekolah tidak membuat tempat penyimpanan terpisah. Halaman lain di situs yang sama dapat mengakses data tersimpan.</p><p>Data tidak otomatis muncul di HP, komputer, atau aplikasi internet lain. Untuk memindahkannya, unduh cadangan lalu pulihkan di tempat tujuan. Edumind tidak menyimpan salinan data ini untuk dipulihkan.</p><p>Koneksi internet tetap diperlukan untuk membuka halaman aplikasi. Sebelum memperbarui aplikasi atau pindah alamat situs, unduh cadangan data terlebih dahulu.</p></details><details><summary>Hapus data pada ruang yang sedang dibuka</summary><p>Tidak menghapus cadangan yang sudah Anda unduh. Tidak menghapus data aplikasi lain.</p>${btn('reset','Hapus data pada ruang ini','','bk-danger')}</details>`,'settings');
  }
  async function submitForm(ev){
    ev.preventDefault();const form=ev.target,f=new FormData(form),v=k=>String(f.get(k)??'').trim(),all=k=>f.getAll(k).map(String),kind=form.dataset.kind,oldId=draftId;
    const save=form.querySelector('button[type=submit]');if(save)save.disabled=true;
    try{
      const d=C.clone(D);
      const put=(name,item)=>{const i=d[name].findIndex(x=>x.id===item.id);if(i>=0)d[name][i]=item;else d[name].push(item);};
      if(kind==='student'){
        const en=oldId?C.one(d.enrollments,oldId):null;let s=en?C.one(d.students,en.studentId):d.students.find(s=>s.code===v('code'));
        const periodId=en?.periodId||v('periodId');
        if(s&&!en)C.assert(s.name===v('name'),'Kode siswa sudah ada dengan nama berbeda. Koreksi melalui Edit siswa.');
        if(en&&(s.code!==v('code')||s.name!==v('name')||en.classId!==v('classId'))){if(!confirm('Ini koreksi identitas/kelas dan memengaruhi tampilan riwayat yang merujuknya. Lanjutkan?'))throw new Error('Koreksi dibatalkan.');}
        s={...s,...C.stamp(s),code:v('code'),name:v('name')};put('students',s);
        C.assert(!d.enrollments.some(e=>e.id!==oldId&&e.studentId===s.id&&e.periodId===periodId),'Siswa sudah terdaftar pada periode ini. Gunakan Edit.');
        const c=C.one(d.classes,v('classId'));C.assert(c&&LEVELS[d.settings.schoolLevel].includes(c.grade),'Pilih kelas sesuai jenjang sekolah.');
        put('enrollments',{...C.stamp(en||{}),studentId:s.id,periodId,classId:v('classId'),boarding:v('boarding'),active:en?v('active')==='true':true});
      }else if(kind==='need'){
        const n=oldId?C.one(d.needs,oldId):{};
        put('needs',{...C.stamp(n),enrollmentId:v('enrollmentId'),date:v('date'),sourceGroup:v('sourceGroup'),sourceLabel:v('sourceLabel'),sourceActor:v('sourceActor'),sourceServiceId:v('sourceServiceId')||null,potential:v('potential'),support:v('support'),priority:v('priority'),fields:Object.fromEntries(FIELDS.map(field=>[field,{status:v('status-'+field),note:v('note-'+field)}]))});
      }else if(kind==='program'){
        const old=oldId?C.one(d.programs,oldId):{};
        const indicators=Array.from(form.querySelectorAll('[data-indicator-id]')).map(r=>({id:r.dataset.indicatorId,label:r.querySelector('[name=i-label]').value.trim(),baseline:r.querySelector('[name=i-baseline]').value.trim(),target:r.querySelector('[name=i-target]').value.trim()}));
        if(old.indicators)for(const i of old.indicators)if(d.evaluations.some(e=>e.indicatorId===i.id)){
          const ii=indicators.find(ii=>ii.id===i.id);C.assert(ii&&ii.label===i.label&&ii.baseline===i.baseline&&ii.target===i.target,'Indikator yang telah dievaluasi tidak boleh dihapus/ditimpa.');
        }
        put('programs',{...C.stamp(old),periodId:v('periodId'),title:v('title'),basis:v('basis'),goal:v('goal'),start:v('start'),end:v('end'),fields:all('fields'),values:all('values'),valueNote:v('valueNote'),targets:all('targets'),needIds:all('needIds'),indicators,archived:v('archived')==='true'});
      }else if(kind==='service'){
        const old=oldId?C.one(d.services,oldId):{};
        if(old.status&&old.status!==v('status')&&old.status!=='Terjadwal'&&!confirm('Koreksi status akan mengubah rekap layanan. Lanjutkan?'))throw new Error('Perubahan status dibatalkan.');
        const participants=Array.from(form.querySelectorAll('[data-enrollment]')).filter(r=>r.querySelector('[name=participant]').checked).map(r=>({enrollmentId:r.dataset.enrollment,kind:r.querySelector('[name=kind]').value,attendance:r.querySelector('[name=kind]').value==='Siswa terkait'?'':r.querySelector('[name=attendance]').value}));
        put('services',{...C.stamp(old),periodId:v('periodId'),title:v('title'),type:v('type'),programId:v('programId')||null,status:v('status'),fields:all('fields'),plannedAt:v('plannedAt'),actualAt:v('actualAt'),actualEndAt:v('actualEndAt'),summary:v('summary'),cancelReason:v('cancelReason'),adults:v('adults'),supervisor:v('supervisor'),participants,odos:Object.fromEntries([...FIELDS,'Potensi','Dukungan'].map(k=>[k,v('odos-'+k)]))});
      }else if(kind==='follow'){
        const old=oldId?C.one(d.followups,oldId):{};const sourceType=v('sourceType'),source=C.one(sourceType==='need'?d.needs:d.services,v('sourceId'));
        const periodId=sourceType==='need'?C.one(d.enrollments,source.enrollmentId).periodId:source.periodId;
        if(old.status==='Selesai'&&v('status')==='Belum selesai'&&!confirm('Buka kembali tugas yang sudah selesai? Hasil terdahulu tetap tersimpan sebagai catatan.'))throw new Error('Pembukaan kembali dibatalkan.');
        put('followups',{...C.stamp(old),periodId,sourceType,sourceId:v('sourceId'),enrollmentId:v('enrollmentId')||null,type:v('type'),action:v('action'),ownerName:v('ownerName'),ownerRole:v('ownerRole'),due:v('due'),status:v('status'),completedOn:v('completedOn'),result:v('result'),referralTo:v('referralTo'),referralStatus:v('referralStatus')});
      }else if(kind==='evaluation'){
        d.evaluations.push({...C.stamp(),indicatorId:v('indicatorId'),date:v('date'),result:v('result'),evidence:v('evidence'),decision:v('decision'),improvement:v('improvement')});
      }else if(kind==='settings'){
        C.assert(LEVELS[v('schoolLevel')],'Jenjang tidak valid.');
        if(d.settings.schoolLevel!==v('schoolLevel')){
          C.assert(d.enrollments.length===0,'Ruang kerja yang sudah memiliki siswa tidak dapat diganti jenjang. Cadangkan dan buat ruang kosong untuk sekolah lain.');
          d.classes=LEVELS[v('schoolLevel')].map(g=>({id:C.uid(),name:g+'A',grade:g}));
        }
        d.settings={schoolName:v('schoolName'),schoolLevel:v('schoolLevel'),operatorName:v('operatorName'),timezone:v('timezone'),activePeriodId:v('activePeriodId')};
        if(v('newPeriodLabel')||v('newPeriodStart')||v('newPeriodEnd')){
          C.assert(v('newPeriodLabel')&&v('newPeriodStart')&&v('newPeriodEnd'),'Lengkapi nama dan kedua tanggal periode baru.');
          const p={id:C.uid(),label:v('newPeriodLabel'),start:v('newPeriodStart'),end:v('newPeriodEnd')};d.periods.push(p);d.settings.activePeriodId=p.id;
        }
        if(v('newClassName')||v('newClassGrade')){
          C.assert(v('newClassName')&&LEVELS[d.settings.schoolLevel].includes(+v('newClassGrade')),'Isi nama dan tingkat kelas sesuai jenjang.');
          d.classes.push({id:C.uid(),name:v('newClassName'),grade:+v('newClassGrade')});
        }
      }else throw new Error('Jenis formulir tidak dikenal.');
      await commit(d,{expected:formVersion});closeDialog(true);render();toast('Data berhasil disimpan di perangkat ini.');
    }catch(e){formError(e);}finally{if(save)save.disabled=false;}
  }
  // ---------------- Keluaran laporan: hanya proyeksi yang diizinkan ----------------
  function reportHTML(type,filters={}){
    const period=currentPeriod(),s=C.stats(D,pid(),filters),ps=D.programs.filter(p=>p.periodId===pid());
    let out=`<div class="bk-print-preview"><div class="bk-overline">Edumind Academy · Manajemen Program BK</div><h1>${esc({R1:'Rencana Program BK',R2:'Pelaksanaan Layanan BK',R3:'Evaluasi & Tindak Lanjut'}[type])}</h1>${D.demo?'<p class="bk-sim-label" style="border:2px solid #9a660f;padding:8px;font-weight:700;">DATA SIMULASI FIKTIF — BUKAN LAPORAN SEKOLAH</p>':''}<p><strong>${esc(D.settings.schoolName)}</strong><br>${esc(period.label)} · ${esc(D.settings.schoolLevel)}<br>Dicetak: ${esc(new Intl.DateTimeFormat('id-ID',{timeZone:D.settings.timezone,dateStyle:'medium',timeStyle:'short'}).format(new Date()))} (${esc(D.settings.timezone)})</p>`;
    if(type==='R1'){
      out+=ps.length?ps.map(p=>`<h2>${esc(p.title)}${p.archived?' (Arsip)':''}</h2><p><strong>Dasar:</strong> ${esc(p.basis)}<br><strong>Tujuan:</strong> ${esc(p.goal)}<br><strong>Bidang:</strong> ${esc(p.fields.join(', '))}<br><strong>Sasaran:</strong> ${p.targets.length} siswa; kelas ${esc([...new Set(p.targets.map(id=>C.one(D.classes,C.one(D.enrollments,id).classId).name))].join(', '))}<br><strong>Waktu:</strong> ${esc(p.start)} s.d. ${esc(p.end)}</p>${table(['Indikator','Kondisi awal','Target'],p.indicators.map(i=>[esc(i.label),esc(i.baseline||'Belum ada data'),esc(i.target)]))}`).join(''):'<p>Belum ada program.</p>';
    }else if(type==='R2'){
      out+=`<p>Filter aktual: ${esc(filters.from||'awal periode')} s.d. ${esc(filters.to||'akhir periode')}<br>Kelas: ${esc(filters.classId?C.one(D.classes,filters.classId)?.name:'Semua')} · Bidang: ${esc(filters.field||'Semua')}</p>`;
      out+=table(['Ukuran','Hasil'],[['Kegiatan terlaksana unik',s.activities],['Siswa hadir unik',s.reached],['Pertemuan ODOS terlaksana',s.odosMeetings],['Jangkauan ODOS',s.total?`${s.odos}/${s.total} (${Math.round(s.odos/s.total*100)}%)`:'Belum ada sasaran']]);
      out+='<h2>Menurut jenis layanan</h2>'+table(['Jenis','Kegiatan'],s.types.map(r=>r.map(esc)))+'<h2>Menurut bidang</h2>'+table(['Bidang','Kegiatan'],s.fields.map(r=>r.map(esc)));
      out+='<h2>Menurut kelas</h2>'+table(['Kelas','Kegiatan terkait kelas','Siswa hadir unik'],D.classes.filter(c=>!filters.classId||c.id===filters.classId).map(c=>{const x=C.stats(D,pid(),{...filters,classId:c.id});return [esc(c.name),x.activities,x.reached];}));
      out+='<p>Catatan: satu kegiatan dapat mencakup beberapa kelas/bidang. Jangan menjumlahkan subtotal sebagai total unik. Siswa terkait koordinasi orang tua tidak dihitung sebagai siswa hadir. Penyebut ODOS mencakup seluruh penempatan periode/kelas, termasuk yang kemudian nonaktif.</p>';
    }else{
      out+=ps.map(p=>`<h2>${esc(p.title)}</h2>${table(['Indikator / target','Hasil terbaru / bukti','Keputusan / perbaikan'],p.indicators.map(i=>{const e=C.latestEvaluation(D,i.id);return [esc(i.label)+'<br>Awal: '+esc(i.baseline||'Belum ada data')+'<br>Target: '+esc(i.target),e?esc(e.date)+'<br>'+esc(e.result||'Belum ada data')+'<br>'+esc(e.evidence):'Belum dievaluasi',e?esc(e.decision)+'<br>'+esc(e.improvement):'—'];}))}`).join('');
      out+='<h2>Ringkasan tindak lanjut periode ini</h2>'+table(['Status saat dicetak','Jumlah'],[['Belum selesai',s.open],['Selesai',s.done],['Belum selesai dan lewat tenggat',s.overdue]]);
      out+='<p>Rekap tugas menunjukkan keadaan saat dicetak, bukan rekonstruksi status historis.</p>';
    }
    return out+'<p style="border-top:1px solid #ccc;margin-top:24px;padding-top:12px;font-size:12px;">V1 Lite · Laporan manajemen dari data lokal. Tidak memuat catatan individu. Teks program/evaluasi wajib ditinjau sebelum dibagikan. Rekap kelompok kecil masih dapat menunjukkan siapa siswanya; periksa sebelum dibagikan. PDF bukan berkas cadangan pemulihan.</p></div>';
  }
  const printCSS=`body{font:12px/1.55 Arial,sans-serif;color:#24332d;padding:22px;max-width:1000px;margin:auto}h1{font-size:24px}h2{font-size:18px;margin-top:24px}table{width:100%;border-collapse:collapse;font-size:11px;margin-bottom:15px}th,td{border:1px solid #ccd6d0;text-align:left;padding:7px;vertical-align:top;overflow-wrap:anywhere}th{background:#eef4ef}tr{break-inside:avoid}thead{display:table-header-group}h2{break-after:avoid}.bk-overline{font-size:11px;letter-spacing:1px;text-transform:uppercase}button{padding:10px 16px;background:#14665e;color:white;border:0;border-radius:6px;cursor:pointer}@page{size:A4;margin:15mm}@media print{body{padding:0;max-width:none}button{display:none}}`;
  function printReport(){
    C.assert(lastReport,'Pratinjau laporan terlebih dahulu.');
    const w=window.open('','_blank');C.assert(w,'Jendela cetak diblokir. Izinkan pop-up untuk halaman aplikasi.');
    w.opener=null;w.document.open();w.document.write(`<!doctype html><html lang="id"><head><meta charset="UTF-8"><title>Laporan BK Edumind</title><style>${printCSS}</style></head><body><button id="bk-print-now">Cetak / Simpan PDF</button>${lastReport}</body></html>`);w.document.close();
    w.document.getElementById('bk-print-now').addEventListener('click',()=>w.print());
  }
  // ---------------- Perintah UI ----------------
  root.addEventListener('click',async ev=>{
    const b=ev.target.closest('button[data-action]');if(!b||!root.contains(b))return;const a=b.dataset.action,id=b.dataset.id;
    try{
      if(a==='close'){closeDialog();return;}
      if(a==='nav'){if(closeDialog()){page=id;filter={search:'',classId:''};render();}return;}
      if(a==='settings'){openSettings();return;}
      if(a==='new-student'||a==='edit-student'){openStudent(id);return;}
      if(a==='new-need'){openNeed(id);return;}
      if(a==='edit-need'){const n=C.one(D.needs,id);openNeed(n.enrollmentId,id);return;}
      if(a==='need-detail'){needDetail(id);return;}
      if(a==='student-detail'){studentDetail(id);return;}
      if(a==='new-program'||a==='edit-program'){openProgram(id);return;}
      if(a==='program-need'){openProgram('',id);return;}
      if(a==='new-service'||a==='edit-service'){openService(id);return;}
      if(a==='odos-student'){openService('',id);return;}
      if(a==='service-program'){openService('','',id);return;}
      if(a==='follow-service'){openFollow('service',id);return;}
      if(a==='follow-need'){openFollow('need',id);return;}
      if(a==='edit-follow'){openFollow('','',id);return;}
      if(a==='need-service'){const s=C.one(D.services,id),en=s.participants[0]?.enrollmentId;C.assert(en,'Pilih peserta terlebih dahulu.');const old=D.needs.find(n=>n.enrollmentId===en&&n.sourceServiceId===id);openNeed(en,old?.id||'',id);return;}
      if(a==='evaluate'){openEvaluation(id);return;}
      if(a==='service-tab'){tab=id;render();return;}
      if(a==='search'){filter.search=root.querySelector('#bk-search').value.trim();filter.classId=root.querySelector('#bk-class').value;render();return;}
      if(a==='add-indicator'){dialog.querySelector('#bk-indicators').insertAdjacentHTML('beforeend',indicatorHTML());dialog.dataset.dirty='1';return;}
      if(a==='remove-indicator'){if(dialog.querySelectorAll('[data-indicator-id]').length===1)throw new Error('Minimal satu indikator tetap diperlukan.');b.closest('[data-indicator-id]').remove();dialog.dataset.dirty='1';return;}
      if(a==='select-all-targets'||a==='select-class-targets'){
        const cl=dialog.querySelector('#bk-target-class').value;if(a==='select-class-targets')C.assert(cl,'Pilih kelas terlebih dahulu.');
        dialog.querySelectorAll('[name=targets]').forEach(t=>{if(t.dataset.active==='true'&&(a==='select-all-targets'||t.dataset.class===cl))t.checked=true;});dialog.dataset.dirty='1';return;
      }
      if(a==='demo'){await switchWorkspace('simulation');return;}
      if(a==='school-workspace'){await switchWorkspace('school');return;}
      if(a==='reset-simulation'){
        C.assert(mode==='simulation','Buka data simulasi terlebih dahulu.');
        if(!confirm('Kembalikan data latihan ke contoh awal? Hanya latihan simulasi yang diganti; data sekolah tetap.'))return;
        await commit(C.demo(),{replace:true});closeDialog(true);page='home';render();toast('Contoh simulasi awal dipulihkan. Data sekolah tidak berubah.');return;
      }
      if(a==='backup'){
        C.assert(!fatal,'Data belum dapat dibaca. Gunakan Simpan salinan untuk bantuan terlebih dahulu.');
        const d=C.clone(D);d.lastBackupAt=C.now();await commit(d);download(JSON.stringify(D,null,2),`${D.demo?'Cadangan_SIMULASI_BK':'Cadangan_BK'}_${dateToday()}_${D.revision}.json`);
        // Jangan menimpa isian modal yang belum disimpan; hanya versi dasarnya diperbarui.
        if(dialog?.open){formVersion=raw;toast('Unduhan cadangan sudah diminta. Periksa folder unduhan dan simpan berkasnya di tempat pribadi.');}else{render();toast('Unduhan cadangan sudah diminta. Pastikan berkasnya benar-benar tersimpan di perangkat.');}return;
      }
      if(a==='rawbackup'){const t=localStorage.getItem(dataKey());C.assert(t,'Belum ada data yang tersimpan di perangkat ini.');download(t,`BK_salinan_bantuan_${C.day()}.json`);toast('Simpan berkas bantuan ini di tempat pribadi. Jangan bagikan tanpa memeriksa isinya.');return;}
      if(a==='reload'){location.reload();return;}
      if(a==='restore'){if(!closeDialog())return;root.querySelector('#bk-restore-file').value='';root.querySelector('#bk-restore-file').click();return;}
      if(a==='apply-restore'){
        C.assert(pendingRestore,'Pilih cadangan yang valid.');if(prompt('Seluruh ruang kerja akan DIGANTI, bukan digabung. Ketik PULIHKAN untuk melanjutkan:')!=='PULIHKAN')return;
        const old=localStorage.getItem(dataKey());if(old)download(old,`BK_sebelum_pulihkan_${C.day()}.json`);
        await commit(pendingRestore,{expected:formVersion,replace:true});pendingRestore=null;closeDialog(true);page='home';render();toast('Cadangan dipulihkan. Periksa identitas, jumlah data, dan riwayat.');return;
      }
      if(a==='reset'){
        if(!confirm('Unduh cadangan dahulu. Hapus data pada ruang yang sedang dibuka? Ruang lain dan data aplikasi lain tidak dihapus.'))return;
        if(prompt('Ketik HAPUS untuk mengosongkan data BK:')!=='HAPUS')return;
        if(raw)download(raw,`BK_sebelum_hapus_${C.day()}.json`);
        const cleared=C.initial();cleared.demo=mode==='simulation';await commit(cleared,{replace:true});closeDialog(true);page='home';filter={search:'',classId:''};render();toast('Ruang BK dikosongkan. Berkas cadangan yang pernah diunduh tidak dihapus.');return;
      }
      if(a==='csv'){if(!ensureSetup())return;openDialog('Masukkan daftar siswa dari berkas',`<p>Unduh contoh daftar siswa, isi sesuai kolom yang tersedia, lalu pilih berkas yang sudah diisi. Pertahankan jenis berkas saat menyimpan; jangan ubah menjadi berkas Excel (.xlsx). Pastikan angka nol di depan kode siswa tidak hilang.</p><p class="bk-muted">Jangan ubah judul kolom: kode_siswa, nama, kelas, periode, status_asrama.</p><div class="bk-actions">${btn('csv-template','Unduh contoh daftar siswa')}${btn('choose-csv','Pilih daftar siswa','','bk-primary')}</div><p style="margin-top:12px;">Nama periode dan kelas harus sudah tersedia di Pengaturan. Data tidak disimpan sebelum pratinjau disetujui.</p>`);return;}
      if(a==='csv-template'){
        const quote=x=>'"'+String(x).replaceAll('"','""')+'"';const c=D.classes.find(c=>LEVELS[D.settings.schoolLevel].includes(c.grade));
        download('\uFEFFkode_siswa,nama,kelas,periode,status_asrama\r\n'+['001','Siswa Contoh 01',c?.name||'7A',currentPeriod().label,''].map(quote).join(',')+'\r\n','Template_Siswa_BK.csv','text/csv;charset=utf-8');return;
      }
      if(a==='choose-csv'){root.querySelector('#bk-csv-file').value='';root.querySelector('#bk-csv-file').click();return;}
      if(a==='apply-csv'){C.assert(pendingCSV,'Daftar siswa belum siap diperiksa. Pilih berkasnya kembali.');await commit(pendingCSV.data,{expected:formVersion});pendingCSV=null;closeDialog(true);page='students';render();toast('Daftar siswa berhasil disimpan. Data lama yang sama tidak digandakan.');return;}
      if(a==='preview-report'){
        if(reportType==='R2'){
          const val=n=>root.querySelector(`[name="${n}"]`).value;
          reportFilters={from:val('report-from'),to:val('report-to'),classId:val('report-class'),field:val('report-field')};
          C.assert(!reportFilters.from||!reportFilters.to||reportFilters.from<=reportFilters.to,'Tanggal awal filter harus sebelum tanggal akhir.');
        }
        lastReport=reportHTML(reportType,reportFilters);openDialog('Pratinjau laporan',notice('Periksa semua teks sebelum dibagikan. Laporan tidak mengambil narasi individu.','bk-info')+lastReport+`<div class="bk-actions">${btn('print-report','Buka halaman cetak / PDF','','bk-primary')}</div>`);return;
      }
      if(a==='print-report'){printReport();return;}
    }catch(e){formError(e);}
  });
  root.addEventListener('change',async ev=>{
    const t=ev.target;
    try{
      if(t.id==='bk-period'){const d=C.clone(D);d.settings.activePeriodId=t.value;await commit(d);filter={search:'',classId:''};render();return;}
      if(t.id==='bk-report-type'){reportType=t.value;render();return;}
      if(dialog?.open&&dialog.querySelector('form')?.dataset.kind==='service'&&t.name==='type'){dialog.querySelector('#bk-odos-fields').hidden=t.value!=='ODOS';return;}
      if(dialog?.open&&dialog.querySelector('form')?.dataset.kind==='evaluation'&&t.name==='indicatorId'){
        const i=D.programs.flatMap(p=>p.indicators).find(i=>i.id===t.value);dialog.querySelector('#bk-eval-basis').innerHTML=`Kondisi awal: ${esc(i.baseline||'Belum ada data')}<br>Target: ${esc(i.target)}`;return;
      }
      if(t.id==='bk-restore-file'&&t.files[0]){
        const file=t.files[0];C.assert(file.size<=6000000,'Berkas cadangan terlalu besar untuk V1 Lite.');const text=await file.text();const data=C.validate(JSON.parse(text));C.assert(mode==='simulation'?data.demo:!data.demo,mode==='simulation'?'Cadangan sekolah tidak dimasukkan ke ruang simulasi. Kembali ke data sekolah terlebih dahulu.':'Cadangan ini berisi simulasi. Buka Coba data simulasi dahulu, lalu pulihkan di sana.');C.assert(JSON.stringify(data).length<=1500000,'Data melewati batas penyimpanan V1 Lite.');pendingRestore=data;
        openDialog('Pratinjau pemulihan',notice('Pemulihan akan mengganti semua data yang sedang dibuka, bukan menggabungkannya. Simpan cadangan data saat ini terlebih dahulu. Berkas cadangan dapat dibaca oleh siapa pun yang memilikinya.')+`<p><strong>${esc(data.settings.schoolName||'Tanpa nama sekolah')}</strong><br>${esc(data.settings.schoolLevel)} · Pembaruan data ke-${data.revision}</p>${table(['Data','Jumlah'],[['Siswa',data.students.length],['Penempatan',data.enrollments.length],['Kebutuhan',data.needs.length],['Program',data.programs.length],['Layanan',data.services.length],['Tindak lanjut',data.followups.length],['Evaluasi',data.evaluations.length]])}<div class="bk-actions" style="margin-top:15px;">${btn('apply-restore','Ganti dengan cadangan ini','','bk-primary')}</div>`);return;
      }
      if(t.id==='bk-csv-file'&&t.files[0]){
        C.assert(t.files[0].size<=2000000,'Daftar siswa terlalu besar. Pisahkan berkas menurut kelas atau periode.');pendingCSV=C.planCSV(D,await t.files[0].text());
        openDialog('Periksa daftar siswa',notice('Semua baris telah diperiksa. Klik Simpan daftar siswa untuk memasukkannya ke aplikasi.','bk-info')+table(['Kode','Nama','Kelas','Periode','Aksi'],pendingCSV.preview.map(r=>[esc(r.code),esc(r.name),esc(r.class),esc(r.period),esc(r.action)]))+`<div style="margin-top:15px;">${btn('apply-csv','Simpan daftar siswa','','bk-primary')}</div>`);return;
      }
    }catch(e){pendingCSV=null;pendingRestore=null;formError(e);if(t.id==='bk-period')render();}
  });
  root.addEventListener('keydown',ev=>{if(ev.target.id==='bk-search'&&ev.key==='Enter'){ev.preventDefault();root.querySelector('[data-action=search]')?.click();}});
  window.addEventListener('storage',ev=>{
    if(ev.key!==dataKey()&&ev.key!==null)return;
    if(dialog?.open){const box=root.querySelector('#bk-conflict');if(box)box.innerHTML=notice('Data berubah/dihapus di tab lain. Formulir ini tidak boleh menimpa perubahan baru. Tutup formulir lalu muat ulang.','bk-error');toast('Perubahan dari tab lain terdeteksi. Simpan formulir ini akan ditolak.');}
    else{try{raw=localStorage.getItem(dataKey());D=raw?C.validate(JSON.parse(raw)):(mode==='simulation'?C.demo():C.initial());fatal='';render();toast('Tampilan diperbarui dari tab lain.');}catch(e){fatal='Perubahan data belum dapat dibaca. Data tidak diganti. '+userMessage(e);render();}}
  });
  window.addEventListener('beforeunload',ev=>{if(dialog?.open&&dialog.dataset.dirty==='1'){ev.preventDefault();ev.returnValue='';}});
  readInitial();render();root.dataset.ready='1';
})();


})();
