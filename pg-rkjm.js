(() => {
  'use strict';

  const APP_VERSION = 'PG-RKJM-1.0.0';
  const BLUEPRINT_VERSION = 'BLUEPRINT-1.0';
  const MASTER_PROMPT_VERSION = 'MP-1.2';
  const REG_PROFILE_VERSION = 'RKJM-REG-2026.1';
  const REG_LAST_VERIFIED = '2026-09-23';
  const STORAGE_KEY = 'edumind_pg_rkjm_v1';
  const SESSION_KEY = 'edumind_pg_rkjm_auth_session';

  // Credential produksi ditetapkan oleh pemilik PG RKJM. Frontend statis = access gate ringan, bukan autentikasi server.
  const AUTH_CONFIG = Object.freeze({ username: 'edumind', password: 'akds-pg-rkjm092026' });

  const STEP_META = [
    ['Profil & Periode', 'Naungan dan periode'],
    ['Arah Strategis', 'Visi, misi, tujuan'],
    ['Data & Evaluasi', 'Evidence dan provenance'],
    ['Prioritas Mutu', 'Masalah dan akar'],
    ['Sasaran & Target', 'Indikator dan target'],
    ['Program 4 Tahun', 'Existing, planned, proposed'],
    ['Bidang Pengelolaan', '4 bidang + monev'],
    ['Review & Hasil', 'Validasi dan prompt']
  ];

  const DOMAIN_META = {
    curriculum: ['Kurikulum & Pembelajaran', 'Fokus pada kondisi/kebutuhan strategis; tidak perlu menyalin seluruh KSP.'],
    staffing: ['Tenaga Kependidikan', 'Fokus pada kebutuhan strategis dan pengembangan kompetensi. Data jumlah hanya diisi jika diketahui.'],
    facilities: ['Sarana & Prasarana', 'Fokus pada kondisi, gap, prioritas, dan strategi pemenuhan—bukan inventaris lengkap.'],
    budgeting: ['Penganggaran', 'Masukkan hanya sumber pembiayaan yang benar-benar diketahui. AI tidak akan mengarang sumber dana.']
  };

  const DEFAULT_STATE = () => ({
    app: { version: APP_VERSION, currentStep: 1, updatedAt: null },
    profile: {
      ministry: '', educationLevel: '', unitName: '', npsn: '', nsm: '', unitStatus: '', location: '',
      rkjmStart: '', rkjmEnd: '', preparationYear: String(new Date().getFullYear()), headName: ''
    },
    strategy: { vision: '', missions: '', goals: '', unitContext: '', stakeholderNeeds: '' },
    evidence: [],
    priorities: [],
    objectives: [],
    programs: [],
    domains: {
      curriculum: { status: '', condition: '' },
      staffing: { status: '', condition: '', teacherCount: '', staffCount: '', studentCount: '', classGroupCount: '' },
      facilities: { status: '', condition: '', priorityNeed: '' },
      budgeting: { status: '', condition: '', confirmedFunding: '', constraints: '' }
    },
    monitoring: { monitoringFrequency: '', evaluationFrequency: '', evaluationActors: '', followUpMechanism: '' },
    settings: { priorityMode: 'USER', aiAssist: 'CONSERVATIVE', depth: 'STANDAR', outputMode: 'CHAT' },
    output: {
      includeApproval: 'NO', includeOutstanding: 'YES', approvalRole: '', approvalName: '', approvalPlace: '', approvalDate: ''
    },
    branchCache: { KEMENDIKDASMEN: {}, KEMENAG: {} }
  });

  let state = DEFAULT_STATE();
  let compiledPrompt = '';
  let lastFocused = null;
  let toastTimer = null;
  let saveTimer = null;

  const $ = (id) => document.getElementById(id);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const safeText = (v) => (v == null ? '' : String(v)).trim();
  const esc = (v) => String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const nonEmpty = (v) => Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined && String(v).trim() !== '';
  const slug = (v) => safeText(v).toLowerCase().replace(/\s+/g, ' ').trim();
  const nowIso = () => new Date().toISOString();
  const currentBranch = () => state.profile.ministry;
  const isKemenag = () => currentBranch() === 'KEMENAG';
  const activeUnitNoun = () => isKemenag() ? 'madrasah' : 'sekolah';

  function init() {
    renderStepNav();
    renderDomainAccordions();
    bindStaticEvents();
    restorePreparationYear();
    updateChoiceCards();
    showLogin();
  }

  function restorePreparationYear() {
    if (!state.profile.preparationYear) state.profile.preparationYear = String(new Date().getFullYear());
    if ($('preparationYear')) $('preparationYear').value = state.profile.preparationYear;
  }

  function showLogin() {
    $('loginView').classList.remove('hidden');
    $('loginView').style.display = '';
    $('appView').classList.add('app-hidden');
  }

  function enterApp() {
    $('loginView').style.display = 'none';
    $('appView').classList.remove('app-hidden');
    const draft = loadDraft(false);
    $('welcomeView').classList.remove('app-hidden');
    $('workspaceView').classList.add('app-hidden');
    $('resultView').classList.add('app-hidden');
    if (draft) $('resumeDraftWelcome').classList.remove('hidden');
    else $('resumeDraftWelcome').classList.add('hidden');
  }

  function bindStaticEvents() {
    $('togglePassword').addEventListener('click', () => {
      const input = $('loginPassword');
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      $('togglePassword').textContent = visible ? '👁️' : '🙈';
      $('togglePassword').setAttribute('aria-label', visible ? 'Tampilkan password' : 'Sembunyikan password');
      $('togglePassword').title = visible ? 'Tampilkan password' : 'Sembunyikan password';
    });

    $('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = $('loginMessage');
      msg.className = 'login-message';
      if (!AUTH_CONFIG.username || !AUTH_CONFIG.password) {
        msg.textContent = 'Credential PG RKJM belum dikonfigurasi. Administrator perlu menetapkan username dan password sebelum versi produksi digunakan.';
        msg.classList.add('show', 'info');
        return;
      }
      if ($('loginUsername').value === AUTH_CONFIG.username && $('loginPassword').value === AUTH_CONFIG.password) {
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (err) {}
        msg.className = 'login-message';
        enterApp();
      } else {
        msg.textContent = 'Username atau password tidak sesuai. Periksa kembali data login Anda.';
        msg.classList.add('show', 'error');
      }
    });

    $('startWizard').addEventListener('click', () => {
      if (loadDraft(false)) {
        confirmDialog('Mulai draft baru?', 'Draft tersimpan ditemukan. Memulai baru akan menghapus draft pada perangkat ini.', () => {
          clearDraft(); state = DEFAULT_STATE(); hydrateAll(); openWorkspace(1);
        }, 'Ya, Mulai Baru');
      } else { state = DEFAULT_STATE(); hydrateAll(); openWorkspace(1); }
    });
    $('resumeDraftWelcome').addEventListener('click', () => { loadDraft(true); openWorkspace(state.app.currentStep || 1); });

    $('menuButton').addEventListener('click', () => $('appMenu').classList.toggle('hidden'));
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.menu-wrap')) $('appMenu').classList.add('hidden');
    });
    $('appMenu').addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (!action) return;
      $('appMenu').classList.add('hidden');
      if (action === 'restart') restartFlow();
      if (action === 'logout') logout();
      if (action === 'about') showAbout();
      if (action === 'open-regulation') showRegulation();
    });

    $('prevStep').addEventListener('click', () => gotoStep(Math.max(1, state.app.currentStep - 1)));
    $('nextStep').addEventListener('click', () => {
      collectStaticFields();
      if (state.app.currentStep < 8) gotoStep(state.app.currentStep + 1);
      else showReview();
    });

    $('stepNav').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-step-target]');
      if (!btn) return;
      collectStaticFields(); gotoStep(Number(btn.dataset.stepTarget));
    });

    document.addEventListener('change', handleGlobalChange);
    document.addEventListener('input', handleGlobalInput);

    $('addEvidence').addEventListener('click', addEvidence);
    $('addPriority').addEventListener('click', addPriority);
    $('addObjective').addEventListener('click', addObjective);
    $('addProgram').addEventListener('click', addProgram);

    $('evidenceList').addEventListener('input', handleEntityInput);
    $('evidenceList').addEventListener('change', handleEntityInput);
    $('priorityList').addEventListener('input', handleEntityInput);
    $('priorityList').addEventListener('change', handleEntityInput);
    $('objectiveList').addEventListener('input', handleEntityInput);
    $('objectiveList').addEventListener('change', handleEntityInput);
    $('programList').addEventListener('input', handleEntityInput);
    $('programList').addEventListener('change', handleEntityInput);
    document.addEventListener('click', handleEntityActions);

    $('domainAccordions').addEventListener('click', (e) => {
      const head = e.target.closest('.acc-head'); if (!head) return;
      head.closest('.accordion').classList.toggle('collapsed');
    });

    $('previewPrompt').addEventListener('click', () => previewPrompt(false));
    $('generatePrompt').addEventListener('click', generatePrompt);
    $('copyPrompt').addEventListener('click', copyFinalPrompt);
    $('previewPromptResult').addEventListener('click', () => showPromptModal(compiledPrompt));
    $('editData').addEventListener('click', () => openWorkspace(8));
    $('restartResult').addEventListener('click', restartFlow);

    $('closeModal').addEventListener('click', closeModal);
    $('modalBackdrop').addEventListener('click', (e) => { if (e.target === $('modalBackdrop')) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('modalBackdrop').classList.contains('hidden')) closeModal(); });
  }

  function handleGlobalChange(e) {
    if (e.target.name === 'ministry') return requestBranchChange(e.target.value);
    if (e.target.name === 'priorityMode') state.settings.priorityMode = e.target.value;
    if (e.target.name === 'aiAssist') state.settings.aiAssist = e.target.value;
    if (e.target.name === 'depth') state.settings.depth = e.target.value;
    if (e.target.name === 'outputMode') state.settings.outputMode = e.target.value;
    if (e.target.id === 'includeApproval') {
      state.output.includeApproval = e.target.value;
      $('approvalFields').classList.toggle('hidden', e.target.value !== 'YES');
    }
    updateChoiceCards(); collectStaticFields(); renderAllDerived(); scheduleSave();
  }

  function handleGlobalInput(e) {
    if (!e.target.matches('input,textarea,select')) return;
    if (e.target.closest('.entity-card')) return;
    collectStaticFields();
    if (e.target.id === 'rkjmStart') calculatePeriod();
    renderAllDerived(); scheduleSave();
  }

  function requestBranchChange(newBranch) {
    const old = state.profile.ministry;
    if (!old || old === newBranch || !hasBranchSensitiveData()) {
      state.profile.ministry = newBranch; applyBranch(); scheduleSave(); return;
    }
    const radio = document.querySelector(`input[name="ministry"][value="${old}"]`);
    if (radio) radio.checked = true;
    updateChoiceCards();
    confirmDialog('Ganti naungan?', 'Beberapa field dan istilah akan berubah. Data branch sebelumnya tetap disimpan sebagai draft, tetapi tidak akan digunakan dalam prompt selama branch tersebut tidak aktif.', () => {
      quarantineBranch(old);
      state.profile.ministry = newBranch;
      const newRadio = document.querySelector(`input[name="ministry"][value="${newBranch}"]`); if (newRadio) newRadio.checked = true;
      restoreBranchCache(newBranch); applyBranch(); scheduleSave();
    }, 'Ganti Naungan');
  }

  function hasBranchSensitiveData() {
    return nonEmpty(state.profile.nsm) || state.evidence.some(x => ['EDM','EMIS','AKMI'].includes(x.sourceType)) || nonEmpty(state.domains.budgeting.condition);
  }
  function quarantineBranch(branch) {
    state.branchCache[branch] = { nsm: state.profile.nsm, evidence: state.evidence.filter(x => branch === 'KEMENAG' ? ['EDM','EMIS','AKMI'].includes(x.sourceType) : false) };
    if (branch === 'KEMENAG') {
      state.profile.nsm = '';
      state.evidence = state.evidence.filter(x => !['EDM','EMIS','AKMI'].includes(x.sourceType));
    }
  }
  function restoreBranchCache(branch) {
    const cache = state.branchCache[branch] || {};
    if (branch === 'KEMENAG') {
      if (cache.nsm && !state.profile.nsm) state.profile.nsm = cache.nsm;
      if (Array.isArray(cache.evidence) && cache.evidence.length) {
        const ids = new Set(state.evidence.map(x => x.id)); cache.evidence.forEach(x => { if (!ids.has(x.id)) state.evidence.push(x); });
      }
    }
  }

  function applyBranch() {
    const levels = isKemenag() ? ['MI','MTs','MA'] : currentBranch() === 'KEMENDIKDASMEN' ? ['SD','SMP','SMA'] : [];
    $('educationLevel').innerHTML = `<option value="">${levels.length ? 'Pilih jenjang' : 'Pilih naungan terlebih dahulu'}</option>` + levels.map(x => `<option value="${x}">${x}</option>`).join('');
    if (levels.includes(state.profile.educationLevel)) $('educationLevel').value = state.profile.educationLevel;
    else { state.profile.educationLevel = ''; }
    $('nsmField').classList.toggle('hidden', !isKemenag());
    hydrateStaticFields();
    renderEvidence(); renderAllDerived(); updateChoiceCards();
  }

  function renderStepNav() {
    $('stepNav').innerHTML = STEP_META.map((s, i) => `<button class="step-link${i===0?' active':''}" type="button" data-step-target="${i+1}"><span class="step-num">${i+1}</span><span class="step-text"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></span></button>`).join('');
  }

  function openWorkspace(step = 1) {
    $('welcomeView').classList.add('app-hidden'); $('resultView').classList.add('app-hidden'); $('workspaceView').classList.remove('app-hidden');
    hydrateAll(); gotoStep(step, false);
  }

  function gotoStep(step, save = true) {
    step = Math.max(1, Math.min(8, Number(step) || 1));
    qsa('.step-panel').forEach(p => p.classList.toggle('hidden', Number(p.dataset.step) !== step));
    qsa('.step-link').forEach((b, i) => { b.classList.toggle('active', i + 1 === step); b.classList.toggle('done', i + 1 < step); });
    state.app.currentStep = step;
    $('mobileStepLabel').textContent = `Langkah ${step} dari 8`;
    $('mobileStepPercent').textContent = `${Math.round(step/8*100)}%`;
    $('mobileProgressBar').style.width = `${step/8*100}%`;
    $('prevStep').disabled = step === 1;
    $('nextStep').textContent = step === 8 ? 'Tinjau & Buat Prompt' : 'Simpan & Lanjut →';
    if (step === 8) showReview();
    renderAllDerived();
    window.scrollTo({top: 0, behavior: 'smooth'});
    if (save) scheduleSave();
  }

  function collectStaticFields() {
    const map = {
      educationLevel:['profile','educationLevel'], unitName:['profile','unitName'], npsn:['profile','npsn'], nsm:['profile','nsm'], unitStatus:['profile','unitStatus'], location:['profile','location'], rkjmStart:['profile','rkjmStart'], rkjmEnd:['profile','rkjmEnd'], preparationYear:['profile','preparationYear'], headName:['profile','headName'],
      vision:['strategy','vision'], missions:['strategy','missions'], goals:['strategy','goals'], unitContext:['strategy','unitContext'], stakeholderNeeds:['strategy','stakeholderNeeds'],
      monitoringFrequency:['monitoring','monitoringFrequency'], evaluationFrequency:['monitoring','evaluationFrequency'], evaluationActors:['monitoring','evaluationActors'], followUpMechanism:['monitoring','followUpMechanism'],
      includeApproval:['output','includeApproval'], includeOutstanding:['output','includeOutstanding'], approvalRole:['output','approvalRole'], approvalName:['output','approvalName'], approvalPlace:['output','approvalPlace'], approvalDate:['output','approvalDate']
    };
    Object.entries(map).forEach(([id, path]) => { const el=$(id); if (el) state[path[0]][path[1]] = el.value; });
    calculatePeriod(false);
  }

  function hydrateStaticFields() {
    const map = {
      educationLevel:state.profile.educationLevel, unitName:state.profile.unitName, npsn:state.profile.npsn, nsm:state.profile.nsm, unitStatus:state.profile.unitStatus, location:state.profile.location, rkjmStart:state.profile.rkjmStart, rkjmEnd:state.profile.rkjmEnd, preparationYear:state.profile.preparationYear, headName:state.profile.headName,
      vision:state.strategy.vision, missions:state.strategy.missions, goals:state.strategy.goals, unitContext:state.strategy.unitContext, stakeholderNeeds:state.strategy.stakeholderNeeds,
      monitoringFrequency:state.monitoring.monitoringFrequency, evaluationFrequency:state.monitoring.evaluationFrequency, evaluationActors:state.monitoring.evaluationActors, followUpMechanism:state.monitoring.followUpMechanism,
      includeApproval:state.output.includeApproval, includeOutstanding:state.output.includeOutstanding, approvalRole:state.output.approvalRole, approvalName:state.output.approvalName, approvalPlace:state.output.approvalPlace, approvalDate:state.output.approvalDate
    };
    Object.entries(map).forEach(([id, val]) => { if ($(id)) $(id).value = val ?? ''; });
    $('approvalFields').classList.toggle('hidden', state.output.includeApproval !== 'YES');
  }

  function hydrateAll() {
    const radio = document.querySelector(`input[name="ministry"][value="${state.profile.ministry}"]`); if (radio) radio.checked = true;
    applyBranch();
    hydrateStaticFields();
    setRadio('priorityMode', state.settings.priorityMode); setRadio('aiAssist', state.settings.aiAssist); setRadio('depth', state.settings.depth); setRadio('outputMode', state.settings.outputMode);
    renderEvidence(); renderPriorities(); renderObjectives(); renderPrograms(); renderDomainAccordions(); renderAllDerived(); updateChoiceCards();
  }

  function setRadio(name, value) { const el = document.querySelector(`input[name="${name}"][value="${value}"]`); if (el) el.checked = true; }
  function calculatePeriod(sync = true) {
    const start = Number(state.profile.rkjmStart || $('rkjmStart')?.value || 0);
    state.profile.rkjmEnd = start ? String(start + 3) : '';
    if (sync && $('rkjmEnd')) $('rkjmEnd').value = state.profile.rkjmEnd;
  }

  function updateChoiceCards() {
    qsa('.choice-card').forEach(card => {
      const input = card.querySelector('input[type="radio"]'); if (!input) return;
      card.classList.toggle('selected', input.checked);
    });
  }

  function evidenceSources() {
    const common = ['Rapor Pendidikan','Evaluasi Diri Satuan Pendidikan','Hasil Supervisi','Evaluasi Program Sebelumnya','Data GTK','Data Sarana Prasarana','Survei Internal','Sumber Lain'];
    return isKemenag() ? ['EDM','Rapor Pendidikan','Evaluasi Internal Madrasah','Hasil Supervisi','Evaluasi Program Sebelumnya','EMIS','Data GTK','Data Sarana Prasarana','AKMI','Survei Internal','Sumber Lain'] : [...common.slice(0,4),'Dapodik',...common.slice(4)];
  }

  function addEvidence() {
    state.evidence.push({ id: nextId(state.evidence,'E'), sourceType:'', sourceName:'', sourceYear:'', dimension:'', finding:'', value:'', trend:'', notes:'', origin:'USER', status:'FACT' });
    renderEvidence(); renderAllDerived(); scheduleSave();
  }
  function addPriority() {
    state.priorities.push({ id: nextId(state.priorities,'P'), title:'', evidenceIds:[], problem:'', rootCause:'', rootCauseStatus:'USER', reason:'', domain:'', origin:'USER', status:'FACT' });
    renderPriorities(); renderAllDerived(); scheduleSave();
  }
  function addObjective() {
    state.objectives.push({ id: nextId(state.objectives,'S'), title:'', priorityIds:[], indicator:'', baseline:'', baselineYear:'', targetType:'QUALITATIVE', target:'', targetYear:state.profile.rkjmEnd, targetOrigin:'USER', origin:'USER' });
    renderObjectives(); renderAllDerived(); scheduleSave();
  }
  function addProgram() {
    state.programs.push({ id: nextId(state.programs,'PR'), name:'', programStatus:'EXISTING', objectiveIds:[], description:'', domain:'', existingEvidence:'', direction:'', year1:'',year2:'',year3:'',year4:'', responsibleRole:'', needsFunding:'NO', fundingSource:'', origin:'USER', validation:'CONFIRMED' });
    renderPrograms(); renderAllDerived(); scheduleSave();
  }
  function nextId(arr,prefix) { let i=1; const ids=new Set(arr.map(x=>x.id)); while(ids.has(`${prefix}${i}`))i++; return `${prefix}${i}`; }

  function renderEvidence() {
    const root = $('evidenceList');
    if (!state.evidence.length) { root.innerHTML = `<div class="empty-state"><div class="emoji">📊</div><h3>Belum ada temuan data</h3><p>Tambahkan data evaluasi yang benar-benar Anda miliki. Data kosong tidak akan ditebak oleh AI.</p></div>`; return; }
    const sources = evidenceSources();
    root.innerHTML = state.evidence.map((x,idx) => `<article class="entity-card" data-entity="evidence" data-id="${esc(x.id)}"><div class="entity-head"><div class="entity-title"><span class="tag tag-info">${esc(x.id)}</span><strong>${esc(x.finding || `Temuan Data ${idx+1}`)}</strong></div><div class="entity-actions"><button class="btn btn-sm btn-danger" type="button" data-entity-delete="evidence" data-id="${esc(x.id)}">Hapus</button></div></div><div class="entity-body"><div class="field-grid"><div class="field"><label>Sumber Data</label><select data-field="sourceType"><option value="">Pilih sumber</option>${sources.map(s=>`<option ${x.sourceType===s?'selected':''}>${esc(s)}</option>`).join('')}</select></div><div class="field"><label>Tahun/Periode Data</label><input data-field="sourceYear" value="${esc(x.sourceYear)}" placeholder="Contoh: 2025"></div><div class="field"><label>Aspek Evaluasi</label><select data-field="dimension"><option value="">Pilih aspek</option>${['Pengelolaan Satuan Pendidikan','Proses Pembelajaran','Hasil Belajar Murid'].map(s=>`<option ${x.dimension===s?'selected':''}>${esc(s)}</option>`).join('')}</select></div><div class="field"><label>Indikator/Temuan</label><input data-field="finding" value="${esc(x.finding)}" placeholder="Tuliskan temuan utama"></div><div class="field"><label>Nilai/Kondisi Faktual</label><input data-field="value" value="${esc(x.value)}" placeholder="Kosongkan jika tidak tersedia"></div><div class="field"><label>Tren</label><select data-field="trend"><option value="">Belum ditentukan</option>${['Meningkat','Stabil','Menurun','Bervariasi/Tidak Pasti'].map(s=>`<option ${x.trend===s?'selected':''}>${esc(s)}</option>`).join('')}</select></div><div class="field full"><label>Keterangan/Bukti</label><textarea data-field="notes" placeholder="Keterangan tambahan bila perlu">${esc(x.notes)}</textarea></div></div></div></article>`).join('');
  }

  function renderPriorities() {
    const root = $('priorityList');
    if (!state.priorities.length) { root.innerHTML = `<div class="empty-state"><div class="emoji">🎯</div><h3>Belum ada prioritas</h3><p>Tambahkan prioritas yang sudah dimiliki satuan atau gunakan AI Assist pada tahap review.</p></div>`; return; }
    root.innerHTML = state.priorities.map((x,idx) => `<article class="entity-card" data-entity="priorities" data-id="${esc(x.id)}"><div class="entity-head"><div class="entity-title"><span class="tag ${x.origin==='AI'?'tag-ai':'tag-fact'}">${esc(x.id)}</span><strong>${esc(x.title || `Prioritas ${idx+1}`)}</strong></div><button class="btn btn-sm btn-danger" type="button" data-entity-delete="priorities" data-id="${esc(x.id)}">Hapus</button></div><div class="entity-body"><div class="field-grid"><div class="field full"><label>Nama Prioritas</label><input data-field="title" value="${esc(x.title)}" placeholder="Contoh: Penguatan kualitas literasi lintas mata pelajaran"></div><div class="field full"><label>Dasar Data</label>${multiCheck('evidenceIds',state.evidence,x.evidenceIds,y=>`${y.id} · ${y.finding||'Temuan belum diberi nama'}`)}</div><div class="field full"><label>Masalah yang Perlu Diperbaiki</label><textarea data-field="problem">${esc(x.problem)}</textarea></div><div class="field full"><label>Akar Masalah</label><textarea data-field="rootCause" placeholder="Jika dibuat AI, perlakukan sebagai hipotesis untuk diverifikasi">${esc(x.rootCause)}</textarea></div><div class="field"><label>Status Akar Masalah</label><select data-field="rootCauseStatus"><option value="USER" ${x.rootCauseStatus==='USER'?'selected':''}>Dinyatakan/terverifikasi oleh user</option><option value="HYPOTHESIS" ${x.rootCauseStatus==='HYPOTHESIS'?'selected':''}>Hipotesis untuk validasi</option></select></div><div class="field"><label>Bidang Terkait</label><select data-field="domain"><option value="">Belum dipetakan</option>${Object.values(DOMAIN_META).map(d=>`<option ${x.domain===d[0]?'selected':''}>${esc(d[0])}</option>`).join('')}</select></div><div class="field full"><label>Alasan Menjadi Prioritas</label><textarea data-field="reason">${esc(x.reason)}</textarea></div></div></div></article>`).join('');
  }

  function renderObjectives() {
    const root = $('objectiveList');
    if (!state.objectives.length) { root.innerHTML = `<div class="empty-state"><div class="emoji">🧭</div><h3>Belum ada sasaran</h3><p>Sasaran sebaiknya terhubung ke prioritas yang relevan dan memiliki indikator yang dapat dipantau.</p></div>`; return; }
    root.innerHTML = state.objectives.map((x,idx) => `<article class="entity-card" data-entity="objectives" data-id="${esc(x.id)}"><div class="entity-head"><div class="entity-title"><span class="tag tag-info">${esc(x.id)}</span><strong>${esc(x.title||`Sasaran ${idx+1}`)}</strong></div><button class="btn btn-sm btn-danger" type="button" data-entity-delete="objectives" data-id="${esc(x.id)}">Hapus</button></div><div class="entity-body"><div class="field-grid"><div class="field full"><label>Sasaran Jangka Menengah</label><textarea data-field="title">${esc(x.title)}</textarea></div><div class="field full"><label>Terkait Prioritas</label>${multiCheck('priorityIds',state.priorities,x.priorityIds,y=>`${y.id} · ${y.title||'Prioritas belum diberi nama'}`)}</div><div class="field full"><label>Indikator Keberhasilan</label><input data-field="indicator" value="${esc(x.indicator)}" placeholder="Indikator yang relevan dengan sasaran"></div><div class="field"><label>Kondisi Awal/Baseline</label><input data-field="baseline" value="${esc(x.baseline)}" placeholder="Kosongkan jika belum tersedia"><div class="field-help">AI tidak akan membuat baseline numerik.</div></div><div class="field"><label>Tahun Baseline</label><input data-field="baselineYear" value="${esc(x.baselineYear)}" placeholder="Contoh: 2025"></div><div class="field"><label>Jenis Target</label><select data-field="targetType"><option value="QUALITATIVE" ${x.targetType==='QUALITATIVE'?'selected':''}>Kualitatif</option><option value="QUANTITATIVE" ${x.targetType==='QUANTITATIVE'?'selected':''}>Kuantitatif</option></select></div><div class="field"><label>Tahun Target</label><input data-field="targetYear" value="${esc(x.targetYear||state.profile.rkjmEnd)}" placeholder="${esc(state.profile.rkjmEnd)}"></div><div class="field full"><label>Target Akhir</label><input data-field="target" value="${esc(x.target)}" placeholder="Kosongkan jika belum ditetapkan"><div class="field-help">Target numerik sebaiknya memiliki baseline atau dasar yang dapat diverifikasi.</div></div><div class="field"><label>Asal Target</label><select data-field="targetOrigin"><option value="USER" ${x.targetOrigin==='USER'?'selected':''}>Ditetapkan/diberikan user</option><option value="AI" ${x.targetOrigin==='AI'?'selected':''}>Usulan AI — perlu validasi</option></select></div></div></div></article>`).join('');
  }

  function renderPrograms() {
    const root = $('programList');
    if (!state.programs.length) { root.innerHTML = `<div class="empty-state"><div class="emoji">🗺️</div><h3>Belum ada program</h3><p>Tambahkan program existing, program yang sudah direncanakan, atau tandai sebagai usulan AI.</p></div>`; return; }
    const y = [state.profile.rkjmStart, Number(state.profile.rkjmStart||0)+1||'', Number(state.profile.rkjmStart||0)+2||'', state.profile.rkjmEnd];
    root.innerHTML = state.programs.map((x,idx) => {
      const tagClass = x.programStatus==='EXISTING'?'tag-existing':x.programStatus==='PLANNED'?'tag-planned':'tag-ai';
      const tagText = x.programStatus==='EXISTING'?'Sudah Berjalan':x.programStatus==='PLANNED'?'Sudah Direncanakan':'Usulan AI';
      return `<article class="entity-card" data-entity="programs" data-id="${esc(x.id)}"><div class="entity-head"><div class="entity-title"><span class="tag ${tagClass}">${tagText}</span><strong>${esc(x.name||`Program ${idx+1}`)}</strong></div><button class="btn btn-sm btn-danger" type="button" data-entity-delete="programs" data-id="${esc(x.id)}">Hapus</button></div><div class="entity-body"><div class="field-grid"><div class="field"><label>Status Program</label><select data-field="programStatus"><option value="EXISTING" ${x.programStatus==='EXISTING'?'selected':''}>Sudah Berjalan</option><option value="PLANNED" ${x.programStatus==='PLANNED'?'selected':''}>Sudah Direncanakan</option><option value="PROPOSED" ${x.programStatus==='PROPOSED'?'selected':''}>Usulan AI</option></select></div><div class="field"><label>Nama Program/Strategi</label><input data-field="name" value="${esc(x.name)}"></div><div class="field full"><label>Mendukung Sasaran</label>${multiCheck('objectiveIds',state.objectives,x.objectiveIds,y=>`${y.id} · ${y.title||'Sasaran belum diberi nama'}`)}</div><div class="field full"><label>Deskripsi</label><textarea data-field="description">${esc(x.description)}</textarea></div><div class="field"><label>Bidang Pengelolaan</label><select data-field="domain"><option value="">Pilih bidang</option>${Object.values(DOMAIN_META).map(d=>`<option ${x.domain===d[0]?'selected':''}>${esc(d[0])}</option>`).join('')}</select></div>${x.programStatus==='EXISTING'?`<div class="field"><label>Arah Program</label><select data-field="direction"><option value="">Belum ditentukan</option>${['Dipertahankan','Diperkuat','Disesuaikan','Dievaluasi','Direncanakan berakhir'].map(s=>`<option ${x.direction===s?'selected':''}>${s}</option>`).join('')}</select></div><div class="field full"><label>Keterangan/Evaluasi Program Existing</label><textarea data-field="existingEvidence">${esc(x.existingEvidence)}</textarea></div>`:''}<div class="field"><label>Tahun 1 ${y[0]?'· '+y[0]:''}</label><textarea data-field="year1" placeholder="Milestone/fokus; tidak harus kegiatan rinci">${esc(x.year1)}</textarea></div><div class="field"><label>Tahun 2 ${y[1]?'· '+y[1]:''}</label><textarea data-field="year2">${esc(x.year2)}</textarea></div><div class="field"><label>Tahun 3 ${y[2]?'· '+y[2]:''}</label><textarea data-field="year3">${esc(x.year3)}</textarea></div><div class="field"><label>Tahun 4 ${y[3]?'· '+y[3]:''}</label><textarea data-field="year4">${esc(x.year4)}</textarea></div><div class="field"><label>Penanggung Jawab/Jabatan</label><input data-field="responsibleRole" value="${esc(x.responsibleRole)}" placeholder="Gunakan jabatan/fungsi bila diketahui"></div><div class="field"><label>Memerlukan Pembiayaan?</label><select data-field="needsFunding"><option value="NO" ${x.needsFunding==='NO'?'selected':''}>Tidak/Belum ditentukan</option><option value="YES" ${x.needsFunding==='YES'?'selected':''}>Ya</option></select></div>${x.needsFunding==='YES'?`<div class="field full"><label>Sumber Dana yang Diketahui</label><input data-field="fundingSource" value="${esc(x.fundingSource)}" placeholder="Isi hanya sumber yang benar-benar diketahui"><div class="field-help">Kosongkan bila belum ditentukan. AI tidak akan mengarang sumber dana.</div></div>`:''}</div></div></article>`;
    }).join('');
  }

  function multiCheck(field, items, selected, labelFn) {
    if (!items.length) return `<div class="subtle">Belum ada item yang dapat ditautkan.</div>`;
    const set = new Set(selected||[]);
    return `<div style="display:flex;flex-wrap:wrap;gap:7px">${items.map(x=>`<label class="tag tag-neutral" style="cursor:pointer"><input type="checkbox" data-multi-field="${field}" value="${esc(x.id)}" ${set.has(x.id)?'checked':''} style="margin:0"> ${esc(labelFn(x))}</label>`).join('')}</div>`;
  }

  function handleEntityInput(e) {
    const card = e.target.closest('.entity-card'); if (!card) return;
    const collection = card.dataset.entity; const id = card.dataset.id; const arr = state[collection]; if (!Array.isArray(arr)) return;
    const item = arr.find(x=>x.id===id); if (!item) return;
    if (e.target.dataset.field) item[e.target.dataset.field] = e.target.value;
    if (e.target.dataset.multiField) {
      const field = e.target.dataset.multiField;
      const checks = qsa(`[data-multi-field="${field}"]`, card).filter(c=>c.checked).map(c=>c.value);
      item[field] = checks;
    }
    renderAllDerived(); scheduleSave();
  }

  function handleEntityActions(e) {
    const del = e.target.closest('[data-entity-delete]'); if (!del) return;
    const collection = del.dataset.entityDelete, id = del.dataset.id;
    const impact = relationalImpact(collection,id);
    const text = impact ? `Item ini sedang digunakan oleh ${impact}. Jika dihapus, hubungan tersebut juga akan dihapus.` : 'Item akan dihapus dari draft pada perangkat ini.';
    confirmDialog('Hapus item ini?', text, () => deleteEntity(collection,id), 'Tetap Hapus');
  }

  function relationalImpact(collection,id) {
    if (collection==='evidence') { const n=state.priorities.filter(p=>p.evidenceIds.includes(id)).length; return n?`${n} prioritas`:''; }
    if (collection==='priorities') { const n=state.objectives.filter(o=>o.priorityIds.includes(id)).length; return n?`${n} sasaran`:''; }
    if (collection==='objectives') { const n=state.programs.filter(p=>p.objectiveIds.includes(id)).length; return n?`${n} program`:''; }
    return '';
  }
  function deleteEntity(collection,id) {
    state[collection] = state[collection].filter(x=>x.id!==id);
    if (collection==='evidence') state.priorities.forEach(p=>p.evidenceIds=p.evidenceIds.filter(x=>x!==id));
    if (collection==='priorities') state.objectives.forEach(o=>o.priorityIds=o.priorityIds.filter(x=>x!==id));
    if (collection==='objectives') state.programs.forEach(p=>p.objectiveIds=p.objectiveIds.filter(x=>x!==id));
    renderEvidence(); renderPriorities(); renderObjectives(); renderPrograms(); renderAllDerived(); scheduleSave();
  }

  function renderDomainAccordions() {
    const root=$('domainAccordions'); if(!root)return;
    root.innerHTML = Object.entries(DOMAIN_META).map(([key,[title,help]],i) => {
      const d=state.domains[key];
      const extra = key==='staffing'?`<div class="field-grid"><div class="field"><label>Jumlah Guru</label><input data-domain-field="teacherCount" value="${esc(d.teacherCount)}"></div><div class="field"><label>Jumlah Tendik</label><input data-domain-field="staffCount" value="${esc(d.staffCount)}"></div><div class="field"><label>Jumlah Murid</label><input data-domain-field="studentCount" value="${esc(d.studentCount)}"></div><div class="field"><label>Jumlah Rombel</label><input data-domain-field="classGroupCount" value="${esc(d.classGroupCount)}"></div></div>`:key==='facilities'?`<div class="field full"><label>Kebutuhan Prioritas Sarpras</label><textarea data-domain-field="priorityNeed">${esc(d.priorityNeed)}</textarea></div>`:key==='budgeting'?`<div class="field-grid"><div class="field full"><label>Sumber Pembiayaan yang Diketahui</label><input data-domain-field="confirmedFunding" value="${esc(d.confirmedFunding)}" placeholder="Isi hanya jika benar-benar diketahui"></div><div class="field full"><label>Kendala/Konteks Penganggaran</label><textarea data-domain-field="constraints">${esc(d.constraints)}</textarea></div></div>`:'';
      return `<section class="accordion${i?' collapsed':''}" data-domain="${key}"><button class="acc-head" type="button"><span>${esc(title)} <span class="acc-meta">· ${esc(d.status||'Belum ditinjau')}</span></span><span>⌄</span></button><div class="acc-body"><p class="subtle">${esc(help)}</p><div class="field-grid"><div class="field"><label>Status Bidang</label><select data-domain-field="status"><option value="">Pilih</option><option value="Prioritas" ${d.status==='Prioritas'?'selected':''}>Prioritas</option><option value="Dipertahankan/Dipantau" ${d.status==='Dipertahankan/Dipantau'?'selected':''}>Dipertahankan/Dipantau</option><option value="Data Belum Cukup" ${d.status==='Data Belum Cukup'?'selected':''}>Data Belum Cukup</option></select></div><div class="field full"><label>Kondisi/Kebutuhan Strategis</label><textarea data-domain-field="condition">${esc(d.condition)}</textarea></div>${extra}</div></div></section>`;
    }).join('');
    qsa('[data-domain-field]',root).forEach(el=>el.addEventListener('input',handleDomainInput));
    qsa('[data-domain-field]',root).forEach(el=>el.addEventListener('change',handleDomainInput));
  }
  function handleDomainInput(e) { const acc=e.target.closest('[data-domain]'); if(!acc)return; state.domains[acc.dataset.domain][e.target.dataset.domainField]=e.target.value; renderAllDerived(); scheduleSave(); }

  function evidenceLevel() {
    const substantive = state.evidence.filter(x=>nonEmpty(x.sourceType)&&nonEmpty(x.finding));
    if (!substantive.length) return 'NONE';
    const withYear = substantive.filter(x=>nonEmpty(x.sourceYear)).length;
    const dims = new Set(substantive.map(x=>x.dimension).filter(Boolean)).size;
    if (substantive.length >= 2 && withYear >= 1 && dims >= 2) return 'SUFFICIENT';
    return 'LIMITED';
  }
  function evidenceUi(level) {
    if(level==='SUFFICIENT') return ['Memadai','Data cukup untuk membantu analisis kondisi dan keterkaitan prioritas secara lebih kontekstual.','tag-existing'];
    if(level==='LIMITED') return ['Terbatas','Data tersedia tetapi masih terbatas. AI akan menggunakan bahasa tentatif dan menandai hal yang perlu diverifikasi.','tag-warning'];
    return ['Belum cukup','Belum ada data evaluasi yang cukup. AI tidak akan menyimpulkan masalah atau prioritas aktual satuan pendidikan.','tag-danger'];
  }

  function computeCompleteness() {
    const profileReq=[state.profile.ministry,state.profile.educationLevel,state.profile.unitName,state.profile.rkjmStart].filter(nonEmpty).length/4;
    const strategy=[state.strategy.vision,state.strategy.missions,state.strategy.goals,state.strategy.unitContext].filter(nonEmpty).length/4;
    const ev=Math.min(1,state.evidence.filter(x=>nonEmpty(x.sourceType)&&nonEmpty(x.finding)).length/3);
    const pr=Math.min(1,state.priorities.filter(x=>nonEmpty(x.title)||nonEmpty(x.problem)).length/3);
    const ob=Math.min(1,state.objectives.filter(x=>nonEmpty(x.title)&&nonEmpty(x.indicator)).length/3);
    const pg=Math.min(1,state.programs.filter(x=>nonEmpty(x.name)).length/3);
    const domains=Object.values(state.domains).filter(d=>nonEmpty(d.status)).length/4;
    const monev=[state.monitoring.monitoringFrequency,state.monitoring.evaluationFrequency,state.monitoring.followUpMechanism].filter(nonEmpty).length/3;
    return Math.round((profileReq*.15+strategy*.15+ev*.25+pr*.15+ob*.10+pg*.10+domains*.05+monev*.05)*100);
  }

  function detectConflicts() {
    const map=new Map(); const conflicts=[];
    state.evidence.forEach(e=>{
      const k=slug(e.finding); if(!k||!nonEmpty(e.value))return;
      if(!map.has(k)) map.set(k,[]); map.get(k).push(e);
    });
    for(const group of map.values()){
      const values=new Set(group.map(x=>slug(x.value)).filter(Boolean));
      if(values.size>1) conflicts.push({ finding:group[0].finding, items:group });
    }
    return conflicts;
  }

  function validate() {
    const out=[];
    const add=(level,title,msg,step)=>out.push({level,title,msg,step});
    if(!state.profile.ministry)add('blocker','Naungan belum dipilih','Pilih kementerian pembina satuan pendidikan.',1);
    if(!state.profile.educationLevel)add('blocker','Jenjang belum dipilih','Pilih jenjang pendidikan.',1);
    if(!nonEmpty(state.profile.unitName))add('blocker','Nama satuan belum diisi','Isi nama satuan pendidikan.',1);
    if(!nonEmpty(state.profile.rkjmStart))add('blocker','Tahun awal belum ditentukan','Tentukan tahun awal periode RKJM.',1);
    if(!nonEmpty(state.strategy.vision))add('warning','Visi belum diisi','RKJM seharusnya berpedoman pada visi satuan. AI tidak akan membuat visi resmi sebagai pengganti.',2);
    if(!nonEmpty(state.strategy.missions))add('warning','Misi belum diisi','Lengkapi misi existing bila tersedia.',2);
    if(!nonEmpty(state.strategy.goals))add('warning','Tujuan belum diisi','Lengkapi tujuan existing bila tersedia.',2);
    if(evidenceLevel()==='NONE')add('warning','Data evaluasi belum tersedia','AI tidak dapat menentukan prioritas aktual secara berbasis evidence.',3);
    state.priorities.forEach(p=>{ if(nonEmpty(p.title)&&!p.evidenceIds.length)add('warning',`${p.id} belum memiliki evidence`,'Prioritas tetap dapat disimpan, tetapi dasar datanya perlu ditinjau.',4); });
    state.objectives.forEach(o=>{
      if(nonEmpty(o.title)&&!o.priorityIds.length)add('warning',`${o.id} belum terhubung prioritas`,'Tinjau keterkaitan sasaran dengan prioritas.',5);
      if(o.targetType==='QUANTITATIVE'&&nonEmpty(o.target)&&!nonEmpty(o.baseline))add('warning',`${o.id} target numerik tanpa baseline`,'AI tidak akan membuat baseline; lengkapi dasar target atau gunakan target kualitatif.',5);
    });
    state.programs.forEach(p=>{
      if(nonEmpty(p.name)&&!p.objectiveIds.length)add('warning',`${p.id} belum terhubung sasaran`,'Program perlu ditinjau keterkaitannya dengan sasaran.',6);
      if(p.needsFunding==='YES'&&!nonEmpty(p.fundingSource))add('info',`${p.id} sumber pendanaan belum ditentukan`,'AI tidak akan mengarang sumber dana.',6);
    });
    detectConflicts().forEach(c=>add('warning',`Data memerlukan verifikasi: ${c.finding}`,'Terdapat nilai/kondisi berbeda pada sumber yang berkaitan. PG tidak menentukan mana yang benar secara otomatis.',3));
    if(!nonEmpty(state.profile.npsn))add('info','NPSN belum diisi','Opsional untuk penyusunan prompt substantif.',1);
    if(isKemenag()&&!nonEmpty(state.profile.nsm))add('info','NSM belum diisi','Opsional; AI tidak akan membuat NSM.',1);
    if(!nonEmpty(state.profile.headName))add('info','Nama kepala satuan belum diisi','Dapat dilengkapi jika lembar identitas/penetapan memerlukannya.',1);
    return out;
  }

  function counts() {
    return {
      existing: state.programs.filter(p=>p.programStatus==='EXISTING').length,
      planned: state.programs.filter(p=>p.programStatus==='PLANNED').length,
      proposed: state.programs.filter(p=>p.programStatus==='PROPOSED').length,
      needsValidation: state.objectives.filter(o=>o.targetOrigin==='AI'&&nonEmpty(o.target)).length + state.priorities.filter(p=>p.rootCauseStatus==='HYPOTHESIS'&&nonEmpty(p.rootCause)).length,
      outstanding: validate().filter(v=>v.level==='warning').length
    };
  }

  function renderAllDerived() {
    calculatePeriod(true);
    const comp=computeCompleteness();
    $('completenessValue').textContent=`${comp}%`; $('completenessBar').style.width=`${comp}%`; $('completenessLabel').textContent=comp>=80?'Siap ditinjau':comp>=50?'Cukup terisi':'Belum lengkap';
    $('reviewCompleteness').textContent=`${comp}%`; $('reviewCompletenessBar').style.width=`${comp}%`;
    const [lvlName,lvlHelp,lvlClass]=evidenceUi(evidenceLevel());
    $('evidenceLevelSide').textContent=lvlName; $('evidenceLevelSide').className=`tag ${lvlClass}`; $('evidenceLevelSideHelp').textContent=lvlHelp;
    $('reviewEvidenceLevel').textContent=lvlName; $('reviewEvidenceHelp').textContent=lvlHelp;
    $('evidenceReadinessInline').innerHTML=`<strong>Kesiapan Analisis Data: ${esc(lvlName)}</strong><p>${esc(lvlHelp)}</p>`;
    $('evidenceReadinessInline').className=`info-box ${evidenceLevel()==='SUFFICIENT'?'success':evidenceLevel()==='LIMITED'?'warning':'info'}`;
    $('evidenceGatePriorityWarning').classList.toggle('hidden', !(state.settings.priorityMode==='AI'&&evidenceLevel()==='NONE'));
    const profileText = state.profile.ministry ? `${isKemenag()?'Kemenag':'Kemendikdasmen'}${state.profile.educationLevel?' · '+state.profile.educationLevel:''}` : 'Belum dipilih';
    $('headerProfile').textContent=profileText; $('readyProfile').textContent=profileText; $('headerProfile').classList.toggle('hidden',false);
    const c=counts();
    $('sideCounts').innerHTML=[['Berjalan',c.existing],['Direncanakan',c.planned],['Usulan AI',c.proposed],['Perlu validasi',c.needsValidation]].map(([n,v])=>`<div class="count-chip"><strong>${v}</strong><span>${n}</span></div>`).join('');
    renderValidationLists();
    if(state.app.currentStep===8) renderReviewSummary();
  }

  function renderValidationLists() {
    const vals=validate();
    const top=vals.slice(0,4);
    $('sideValidation').innerHTML=top.length?top.map(v=>`<div class="validation-item ${v.level}"><strong>${esc(v.title)}</strong>${esc(v.msg)}</div>`).join(''):`<div class="validation-item info"><strong>Tidak ada catatan utama</strong>Data aktif siap ditinjau.</div>`;
    $('reviewValidation').innerHTML=vals.length?vals.map(v=>`<button type="button" class="validation-item ${v.level}" data-jump-step="${v.step}" style="width:100%;text-align:left;cursor:pointer"><strong>${esc(v.level==='blocker'?'Harus diperbaiki':v.level==='warning'?'Perlu ditinjau':'Informasi')}: ${esc(v.title)}</strong>${esc(v.msg)}</button>`).join(''):`<div class="info-box success"><strong>Tidak ada catatan validator</strong><p>Data aktif lolos pemeriksaan struktural awal.</p></div>`;
    qsa('[data-jump-step]',$('reviewValidation')).forEach(b=>b.addEventListener('click',()=>gotoStep(Number(b.dataset.jumpStep))));
  }
  function renderReviewSummary() {
    const c=counts();
    $('reviewSummary').innerHTML=[['Program Berjalan',c.existing],['Rencana Satuan',c.planned],['Usulan AI',c.proposed],['Perlu Validasi',c.needsValidation],['Catatan Data',c.outstanding]].map(([n,v])=>`<div class="summary-tile"><strong>${v}</strong><span>${n}</span></div>`).join('');
  }
  function showReview() { collectStaticFields(); renderAllDerived(); }

  function buildRegulatoryContext() {
    const period = state.profile.rkjmStart && state.profile.rkjmEnd ? `${state.profile.rkjmStart}–${state.profile.rkjmEnd}` : '[DATA PERLU DILENGKAPI: periode RKJM]';
    if (isKemenag()) {
      return `Naungan: Kementerian Agama\nJenjang: ${state.profile.educationLevel || '[DATA PERLU DILENGKAPI: jenjang]'}\nDokumen: Rencana Kerja Jangka Menengah (RKJM) / Rencana Kerja Madrasah (RKM) empat tahunan\nPeriode: ${period}\nAcuan common-core: Permendikdasmen Nomor 26 Tahun 2025 tentang Standar Pengelolaan pada PAUD, Pendidikan Dasar, dan Pendidikan Menengah (berlaku; mencakup MI/MTs/MA dalam cakupan jenjang).\nPenjaminan mutu: Permendikdasmen Nomor 21 Tahun 2026 tentang Sistem Penjaminan Mutu Pendidikan, digunakan sebagai konteks siklus mutu internal yang berkelanjutan.\nOverlay madrasah: PMA Nomor 90 Tahun 2013 tentang Penyelenggaraan Pendidikan Madrasah sebagaimana telah diubah terakhir dengan PMA Nomor 66 Tahun 2016, sepanjang relevan dengan penyelenggaraan madrasah.\nTerminologi branch: madrasah, kepala madrasah, komite madrasah, EDM bila tersedia, RKT, RKAM, dan e-RKAM sebagai sistem/aplikasi pengelolaan—bukan nama dokumen RKJM.`;
    }
    return `Naungan: Kementerian Pendidikan Dasar dan Menengah\nJenjang: ${state.profile.educationLevel || '[DATA PERLU DILENGKAPI: jenjang]'}\nDokumen: Rencana Kerja Jangka Menengah (RKJM)\nPeriode: ${period}\nAcuan utama: Permendikdasmen Nomor 26 Tahun 2025 tentang Standar Pengelolaan pada PAUD, Pendidikan Dasar, dan Pendidikan Menengah.\nPenjaminan mutu: Permendikdasmen Nomor 21 Tahun 2026 tentang Sistem Penjaminan Mutu Pendidikan, digunakan sebagai konteks siklus mutu internal yang berkelanjutan.\nTerminologi branch: sekolah/satuan pendidikan, kepala sekolah, komite sekolah, Rapor Pendidikan bila tersedia, Rencana Kerja Tahunan/Rencana Kerja Jangka Pendek 1 tahun, RKAS, dan ARKAS sebagai sistem/aplikasi pengelolaan—bukan nama dokumen RKJM.`;
  }

  function buildFactsBlock() {
    const lines=[]; const p=state.profile, s=state.strategy;
    push(lines,'Nama satuan',p.unitName); push(lines,'Jenjang',p.educationLevel); push(lines,'NPSN',p.npsn); if(isKemenag())push(lines,'NSM',p.nsm); push(lines,'Status',p.unitStatus); push(lines,'Lokasi',p.location); push(lines,'Periode RKJM',p.rkjmStart&&p.rkjmEnd?`${p.rkjmStart}–${p.rkjmEnd}`:''); push(lines,'Tahun penyusunan',p.preparationYear); push(lines,`Nama kepala ${activeUnitNoun()}`,p.headName);
    lines.push(`Visi existing: ${nonEmpty(s.vision)?s.vision:'[DATA PERLU DILENGKAPI: visi satuan pendidikan]'}`);
    lines.push(`Misi existing: ${nonEmpty(s.missions)?s.missions:'[DATA PERLU DILENGKAPI: misi satuan pendidikan]'}`);
    lines.push(`Tujuan existing: ${nonEmpty(s.goals)?s.goals:'[DATA PERLU DILENGKAPI: tujuan satuan pendidikan]'}`);
    push(lines,'Karakteristik/konteks',s.unitContext); push(lines,'Aspirasi/kebutuhan pemangku kepentingan',s.stakeholderNeeds);
    return lines.join('\n');
  }
  function push(arr,label,val){ if(nonEmpty(val))arr.push(`${label}: ${val}`); }

  function buildEvidenceBlock() {
    const active=state.evidence.filter(x=>nonEmpty(x.sourceType)&&nonEmpty(x.finding)); if(!active.length)return '';
    return active.map(x=>[`${x.id} | ${x.sourceType}${x.sourceYear?' | '+x.sourceYear:''}`,x.dimension?`Aspek: ${x.dimension}`:'',`Temuan: ${x.finding}`,x.value?`Nilai/kondisi: ${x.value}`:'',x.trend?`Tren: ${x.trend}`:'',x.notes?`Catatan: ${x.notes}`:''].filter(Boolean).join('\n')).join('\n\n');
  }

  function buildExistingPlanned() {
    const list=state.programs.filter(p=>nonEmpty(p.name)&&['EXISTING','PLANNED'].includes(p.programStatus)); if(!list.length)return '';
    return list.map(p=>{ const status=p.programStatus==='EXISTING'?'EXISTING — sudah berjalan berdasarkan pernyataan pengguna':'PLANNED — direncanakan satuan, belum boleh disebut telah dilaksanakan'; return [`${p.id} | ${status}`,`Program: ${p.name}`,p.description?`Deskripsi: ${p.description}`:'',p.direction?`Arah/evaluasi: ${p.direction}`:'',p.existingEvidence?`Keterangan existing: ${p.existingEvidence}`:''].filter(Boolean).join('\n'); }).join('\n\n');
  }

  function buildAnalysisObjectives() {
    const parts=[];
    if(state.priorities.length){ parts.push('PRIORITAS/MASALAH:\n'+state.priorities.filter(p=>nonEmpty(p.title)||nonEmpty(p.problem)).map(p=>[`${p.id} | ${p.origin==='AI'?'PROPOSED':'USER'}`,p.title?`Prioritas: ${p.title}`:'',p.evidenceIds.length?`Evidence: ${p.evidenceIds.join(', ')}`:'',p.problem?`Masalah: ${p.problem}`:'',p.rootCause?`Akar masalah${p.rootCauseStatus==='HYPOTHESIS'?' (HIPOTESIS — perlu validasi)':''}: ${p.rootCause}`:'',p.reason?`Alasan: ${p.reason}`:''].filter(Boolean).join('\n')).join('\n\n')); }
    if(state.objectives.length){ parts.push('SASARAN/INDIKATOR/TARGET:\n'+state.objectives.filter(o=>nonEmpty(o.title)||nonEmpty(o.indicator)||nonEmpty(o.target)).map(o=>[`${o.id} | ${o.origin==='AI'?'PROPOSED':'USER'}`,o.title?`Sasaran: ${o.title}`:'',o.priorityIds.length?`Prioritas terkait: ${o.priorityIds.join(', ')}`:'',o.indicator?`Indikator: ${o.indicator}`:'',o.baseline?`Baseline: ${o.baseline}${o.baselineYear?' ('+o.baselineYear+')':''}`:'',o.target?`${o.targetOrigin==='AI'?'USULAN TARGET — PERLU DIVALIDASI SATUAN PENDIDIKAN':'Target user'}: ${o.target}${o.targetYear?' ('+o.targetYear+')':''}`:''].filter(Boolean).join('\n')).join('\n\n')); }
    return parts.join('\n\n');
  }

  function buildProgramsRoadmap() {
    const list=state.programs.filter(p=>nonEmpty(p.name)); if(!list.length)return '';
    return list.map(p=>{ const status=p.programStatus==='EXISTING'?'PROGRAM BERJALAN':p.programStatus==='PLANNED'?'PROGRAM YANG DIRENCANAKAN SATUAN':'USULAN PROGRAM'; return [`${p.id} | ${status}`,`Program: ${p.name}`,p.objectiveIds.length?`Sasaran: ${p.objectiveIds.join(', ')}`:'',p.domain?`Bidang: ${p.domain}`:'',p.description?`Deskripsi: ${p.description}`:'',p.year1?`Tahun 1 (${state.profile.rkjmStart||'?'}): ${p.year1}`:'',p.year2?`Tahun 2 (${Number(state.profile.rkjmStart||0)+1||'?'}): ${p.year2}`:'',p.year3?`Tahun 3 (${Number(state.profile.rkjmStart||0)+2||'?'}): ${p.year3}`:'',p.year4?`Tahun 4 (${state.profile.rkjmEnd||'?'}): ${p.year4}`:'',p.responsibleRole?`Penanggung jawab/fungsi: ${p.responsibleRole}`:'',p.needsFunding==='YES'?`Implikasi pembiayaan: Ya`:'',p.needsFunding==='YES'&&p.fundingSource?`Sumber dana yang diketahui: ${p.fundingSource}`:''].filter(Boolean).join('\n'); }).join('\n\n');
  }

  function buildManagementMonev() {
    const lines=[];
    Object.entries(DOMAIN_META).forEach(([k,[name]])=>{ const d=state.domains[k]; if(nonEmpty(d.status)||nonEmpty(d.condition)){ lines.push(`${name}\nStatus: ${d.status||'Belum ditentukan'}${d.condition?`\nKondisi/kebutuhan: ${d.condition}`:''}${k==='staffing'?[['Jumlah guru',d.teacherCount],['Jumlah tendik',d.staffCount],['Jumlah murid',d.studentCount],['Jumlah rombel',d.classGroupCount]].filter(x=>nonEmpty(x[1])).map(x=>`\n${x[0]}: ${x[1]}`).join(''):''}${k==='facilities'&&d.priorityNeed?`\nKebutuhan prioritas: ${d.priorityNeed}`:''}${k==='budgeting'&&d.confirmedFunding?`\nSumber pembiayaan yang diketahui: ${d.confirmedFunding}`:''}${k==='budgeting'&&d.constraints?`\nKendala/konteks: ${d.constraints}`:''}`); } });
    const m=state.monitoring;
    const mon=[]; push(mon,'Frekuensi pemantauan',m.monitoringFrequency); push(mon,'Frekuensi evaluasi',m.evaluationFrequency); push(mon,'Pihak/fungsi terlibat',m.evaluationActors); push(mon,'Mekanisme tindak lanjut',m.followUpMechanism);
    if(mon.length) lines.push('MONITORING & EVALUASI\n'+mon.join('\n'));
    return lines.join('\n\n');
  }

  function aiAssistInstruction() {
    if(state.settings.aiAssist==='ANALYTICAL') return 'Anda boleh mengusulkan analisis, prioritas, sasaran, indikator, program, roadmap, dan mekanisme evaluasi sesuai Evidence Sufficiency. Semua yang bukan fakta pengguna harus diperlakukan sebagai ANALISIS/USULAN dan memerlukan validasi manusia.';
    return 'Batasi pekerjaan pada sintesis, pengorganisasian, dan penyusunan berdasarkan data pengguna. Jangan menambah program, target, sasaran, atau fakta baru kecuali diperlukan untuk menunjukkan kekosongan data, dan jangan menyamarkan rekomendasi sebagai fakta.';
  }

  function outputRequirements() {
    const depth=state.settings.depth;
    const depthText=depth==='RINGKAS'?'Gunakan uraian ringkas dengan tabel inti.':depth==='MENDALAM'?'Gunakan analisis lebih mendalam dengan struktur yang sama; tetap hindari pengulangan.':'Gunakan tingkat kedalaman standar: lengkap untuk draf kerja utama tanpa uraian berlebihan.';
    const outputMode=state.settings.outputMode;
    const modeText=outputMode==='WORD'?'Buat file Microsoft Word (.docx) jika lingkungan mendukung. Jika tidak, berikan keluaran lengkap Word-ready.':outputMode==='CHAT_WORD'?'Tampilkan ringkasan utama di chat dan buat dokumen Word lengkap jika lingkungan mendukung; jika tidak, berikan keluaran Word-ready.':'Tampilkan dokumen dalam chat dengan hierarki judul dan tabel yang mudah disalin.';
    const approval=state.output.includeApproval==='YES' ? `Sertakan lembar penetapan hanya dari data berikut: Jabatan=${state.output.approvalRole||'[DATA PERLU DILENGKAPI: jabatan penandatangan]'}; Nama=${state.output.approvalName||'[DATA PERLU DILENGKAPI: nama penandatangan]'}; Tempat=${state.output.approvalPlace||'[DATA PERLU DILENGKAPI: tempat]'}; Tanggal=${state.output.approvalDate||'[DATA PERLU DILENGKAPI: tanggal]'}. Jangan menentukan pejabat lain sendiri.` : 'Jangan sertakan lembar penetapan.';
    const outstanding=state.output.includeOutstanding==='YES'?'Sertakan bagian “Data yang Masih Perlu Dilengkapi” bila relevan.':'Jangan buat daftar outstanding terpisah kecuali diperlukan untuk mencegah klaim menyesatkan.';
    return `${depthText}\n${modeText}\n${approval}\n${outstanding}\n\nStruktur default Edumind ODS (bukan klaim format baku pemerintah):\nCOVER\nIDENTITAS DOKUMEN\n[LEMBAR PENETAPAN — jika aktif]\nBAB I PENDAHULUAN\nBAB II PROFIL DAN ARAH STRATEGIS\nBAB III EVALUASI DIRI DAN ANALISIS KONDISI\nBAB IV PRIORITAS DAN SASARAN JANGKA MENENGAH\nBAB V PROGRAM STRATEGIS DAN ROADMAP EMPAT TAHUN\nBAB VI PERENCANAAN EMPAT BIDANG PENGELOLAAN\nBAB VII KETERKAITAN DENGAN PERENCANAAN TAHUNAN DAN PENGANGGARAN\nBAB VIII MONITORING, EVALUASI, DAN TINDAK LANJUT\nPENUTUP\n[LAMPIRAN — sesuai data]\n\nGunakan tabel utama secara proporsional untuk sumber/temuan evaluasi, prioritas-sasaran, matriks program empat tahun, ringkasan bidang pengelolaan bila perlu, dan monitoring-evaluasi.`;
  }

  function compilePrompt() {
    collectStaticFields();
    const blockers=validate().filter(v=>v.level==='blocker');
    if(blockers.length) return {ok:false, type:'BLOCKED', errors:blockers};
    const level=evidenceLevel();
    const evidence=buildEvidenceBlock();
    const existing=buildExistingPlanned();
    const analysis=buildAnalysisObjectives();
    const programs=buildProgramsRoadmap();
    const management=buildManagementMonev();
    const conflictText=buildConflictRegister();
    const blocks=[];
    blocks.push(`==================================================\nROLE & TASK\n==================================================\nAnda bertindak sebagai ahli perencanaan dan pengelolaan satuan pendidikan Indonesia.\n\nSusun DRAF Rencana Kerja Jangka Menengah (RKJM) yang kontekstual, substantif, operasional, berbasis data, konsisten antarkomponen, dan mudah ditelaah oleh satuan pendidikan.\n\nDokumen merupakan DRAF yang harus ditelaah, divalidasi, disempurnakan, dan ditetapkan oleh satuan pendidikan. Jangan menyajikannya seolah-olah telah disahkan.`);
    blocks.push(`==================================================\nREGULATORY CONTEXT\n==================================================\n${buildRegulatoryContext()}\n\nGunakan hanya Regulatory Context di atas sebagai dasar regulatif tugas ini. Jangan menambahkan regulasi, nomor peraturan, pasal, keputusan, nomenklatur lama, atau dasar hukum lain dari ingatan sendiri. Jika pengguna memberikan nomenklatur resmi lokal yang relevan dan tidak bertentangan dengan Regulatory Context, istilah tersebut boleh dipertahankan. Jangan mengklaim struktur BAB atau format tabel output sebagai format baku pemerintah kecuali Regulatory Context secara eksplisit menyatakannya.`);
    blocks.push(`==================================================\nINTEGRITY RULES\n==================================================\n1. Hanya informasi dalam FACTS dan EVIDENCE yang boleh diperlakukan sebagai fakta kondisi satuan pendidikan.\n2. Jangan menciptakan fakta lokal yang tidak diberikan pengguna, termasuk angka, skor, identitas resmi, nama orang, baseline, program existing, fasilitas, mitra, sumber data, sumber pembiayaan, nominal, tanggal, nomor SK, atau fakta kelembagaan.\n3. Jangan mengubah fakta, angka, nama, nilai, tahun, sumber, atau status yang diberikan pengguna.\n4. Jangan menulis item PLANNED atau PROPOSED seolah-olah sudah berjalan.\n5. Ketiadaan data bukan izin untuk menebak atau melakukan inferensi faktual.\n6. Analisis, akar masalah, prioritas, sasaran, indikator, target, program, roadmap, atau mekanisme yang dibuat AI harus diperlakukan sebagai analisis/usulan dan divalidasi satuan pendidikan.\n7. Target numerik AI tidak boleh ditulis sebagai target resmi kecuali telah diberikan atau dipilih secara eksplisit oleh pengguna.\n8. Sumber pembiayaan existing hanya boleh berasal dari data pengguna.\n9. Pertahankan sumber dan tahun/periode evidence.\n10. Jangan mencampur nomenklatur kementerian/branch.\n11. Pertahankan keterhubungan EVIDENCE → MASALAH → AKAR MASALAH → PRIORITAS → SASARAN → INDIKATOR/TARGET → PROGRAM → ROADMAP → MONITORING/EVALUASI.\n12. Jika terdapat marker [DATA PERLU DILENGKAPI: ...], jangan mengisinya dengan asumsi.`);
    blocks.push(`==================================================\nEVIDENCE SUFFICIENCY\n==================================================\nEvidence Level: ${level}\n\nJika NONE: jangan membuat klaim tentang masalah aktual, kekuatan, akar masalah, atau prioritas aktual satuan; batasi pada struktur, kebutuhan data, dan alternatif umum yang jelas dilabeli sebagai bahan pertimbangan.\nJika LIMITED: gunakan bahasa tentatif; bedakan indikasi dari fakta; akar masalah buatan AI adalah hipotesis yang perlu diverifikasi.\nJika SUFFICIENT: lakukan analisis kontekstual berdasarkan evidence yang tersedia, tetap patuhi seluruh Integrity Rules.`);
    blocks.push(`==================================================\nAI ASSIST MODE\n==================================================\n${aiAssistInstruction()}`);
    blocks.push(`==================================================\nFACTS — UNIT & STRATEGIC PROFILE\n==================================================\n${buildFactsBlock()}\n\nVisi, misi, tujuan, program existing, kondisi existing, dan keputusan satuan hanya boleh dinarasikan sebagai fakta jika terdapat dalam data di atas.`);
    if(evidence) blocks.push(`==================================================\nEVIDENCE\n==================================================\n${evidence}\n\nJangan menciptakan evidence baru. Jika evidence berbeda/bertentangan, jangan memilih salah satu secara diam-diam; jelaskan kebutuhan verifikasi.`);
    if(conflictText) blocks.push(`==================================================\nDATA YANG MEMERLUKAN VERIFIKASI\n==================================================\n${conflictText}`);
    if(existing) blocks.push(`==================================================\nEXISTING & USER-PLANNED ITEMS\n==================================================\n${existing}\n\nEXISTING berarti telah berjalan berdasarkan pernyataan pengguna. PLANNED berarti direncanakan tetapi belum boleh dinarasikan sebagai telah dilaksanakan. Keberadaan program existing tidak membuktikan efektivitasnya.`);
    if(analysis || state.settings.aiAssist==='ANALYTICAL') blocks.push(`==================================================\nANALYSIS, PRIORITIES, OBJECTIVES & TARGETS\n==================================================\n${analysis || 'Belum ada prioritas/sasaran user. Ikuti Evidence Sufficiency dan AI Assist Mode untuk menentukan apakah boleh memberi usulan.'}\n\nBedakan fakta, interpretasi, hipotesis, dan rekomendasi. Hubungkan prioritas dengan evidence, sasaran dengan prioritas, indikator dengan sasaran. Jangan membuat baseline numerik. Jika target dibuat AI dan belum ditetapkan user, gunakan label: USULAN TARGET — PERLU DIVALIDASI SATUAN PENDIDIKAN.`);
    if(programs || state.settings.aiAssist==='ANALYTICAL') blocks.push(`==================================================\nPROGRAM & FOUR-YEAR ROADMAP\n==================================================\n${programs || 'Belum ada program user. Bila AI Assist dan Evidence Sufficiency mengizinkan, usulkan program secara proporsional dan beri status USULAN.'}\n\nBedakan Program Berjalan, Program yang Direncanakan Satuan, dan Usulan Program. Jika program user tampak tidak terkait sasaran, jangan hapus; tandai untuk ditinjau. Jika program usulan AI tidak relevan, perbaiki atau hapus sebelum final.`);
    blocks.push(`==================================================\nMANAGEMENT DOMAINS & MONITORING\n==================================================\nPertimbangkan secara proporsional: (1) kurikulum dan pembelajaran; (2) tenaga kependidikan; (3) sarana dan prasarana; (4) penganggaran.\n\n${management || 'Belum ada data domain/monev yang cukup. Jangan mengarang kondisi existing.'}\n\nJangan mengarang jumlah/kebutuhan GTK, aset/fasilitas, atau sumber pembiayaan. Bedakan kebutuhan pembiayaan jangka menengah dari rincian anggaran tahunan. Susun monitoring/evaluasi yang menghubungkan sasaran, indikator, sumber data, program, hasil evaluasi, dan tindak lanjut.`);
    blocks.push(`==================================================\nANNUAL PLANNING & BUDGETING LINKAGE\n==================================================\nJelaskan hubungan RKJM dengan rencana kerja satu tahun dan dokumen anggaran menggunakan nomenklatur Regulatory Context. Jangan mengubah output menjadi dokumen rencana kerja tahunan, dokumen anggaran tahunan, atau aplikasi pengelolaan anggaran. Aplikasi pengelolaan anggaran bukan dokumen perencanaan baru setelah dokumen anggaran.`);
    blocks.push(`==================================================\nOUTPUT REQUIREMENTS\n==================================================\n${outputRequirements()}\n\nGunakan Bahasa Indonesia formal, profesional, jelas, natural, dan substantif. Hindari pengulangan narasi yang sudah jelas pada tabel. Jangan menampilkan metadata internal, ID teknis, origin, validation_status, atau informasi compiler.`);
    blocks.push(`==================================================\nFINAL SAFETY & QUALITY AUDIT\n==================================================\nSebelum final, audit REGULATORY, FACTUAL, EXISTING/PLANNED/PROPOSED, NUMERICAL/FUNDING, EVIDENCE, COHERENCE, SCOPE, OUTPUT, dan TECHNICAL.\n\nPastikan kekuatan analisis sesuai Evidence Level; konflik evidence tidak diselesaikan dengan asumsi; planned/proposed tidak menjadi existing; angka yang bukan fakta tidak berubah menjadi fakta resmi; output tetap RKJM; istilah branch konsisten; dan tidak ada token teknis atau nama variabel internal pada output. Jika ditemukan pelanggaran, perbaiki sebelum final.`);
    blocks.push(`---\nPrompt Generator: PG RKJM Edumind | App ${APP_VERSION} | Master Prompt ${MASTER_PROMPT_VERSION} | Regulatory Profile ${REG_PROFILE_VERSION} | Regulatory last verified ${REG_LAST_VERIFIED}`);

    const prompt=blocks.map(x=>x.trim()).filter(Boolean).join('\n\n');
    const leak=scanPromptLeaks(prompt); if(leak.length) return {ok:false,type:'COMPILER_ERROR',errors:leak};
    const contamination=scanBranchContamination(prompt); if(contamination.length) return {ok:false,type:'COMPILER_ERROR',errors:contamination};
    return {ok:true,prompt,warnings:validate().filter(v=>v.level!=='blocker'),evidenceLevel:level};
  }

  function buildConflictRegister() {
    const conflicts=detectConflicts(); if(!conflicts.length)return '';
    return conflicts.map((c,i)=>`V${i+1} | Topik: ${c.finding}\n${c.items.map(x=>`- ${x.sourceType}${x.sourceYear?' ('+x.sourceYear+')':''}: ${x.value}`).join('\n')}\nTindak lanjut: verifikasi perbedaan sebelum menetapkan baseline, target, atau efektivitas program.`).join('\n\n');
  }
  function scanPromptLeaks(prompt) {
    const patterns=[/{{/g,/}}/g,/<<|>>/g,/\bundefined\b/g,/\bNaN\b/g,/\[object Object\]/g];
    const hits=[]; patterns.forEach(p=>{if(p.test(prompt))hits.push(`Token internal terdeteksi: ${p}`)}); return hits;
  }
  function scanBranchContamination(prompt) {
    const hits=[];
    if(currentBranch()==='KEMENDIKDASMEN') ['NSM','EDM','RKAM','e-RKAM'].forEach(t=>{ if(new RegExp(`\\b${t.replace('-','\\-')}\\b`,'i').test(prompt)) hits.push(`Istilah branch Kemenag bocor ke compiler: ${t}`); });
    if(currentBranch()==='KEMENAG') ['RKAS','ARKAS'].forEach(t=>{ if(new RegExp(`\\b${t}\\b`,'i').test(prompt)) hits.push(`Istilah branch Kemendikdasmen bocor ke compiler: ${t}`); });
    return hits;
  }

  function previewPrompt(fromResult=false) {
    const c=fromResult&&compiledPrompt?{ok:true,prompt:compiledPrompt,warnings:[]}:compilePrompt();
    if(!c.ok){ showCompilerError(c); return; }
    showPromptModal(c.prompt);
  }
  function showPromptModal(prompt) {
    openModal('Pratinjau Prompt', `<p class="subtle">Periksa fakta, periode, branch kementerian, dan status program sebelum menyalin prompt.</p><pre class="prompt-preview">${esc(prompt)}</pre>`, `<button class="btn btn-secondary" type="button" id="modalEdit">Kembali Edit Data</button><button class="btn btn-primary" type="button" id="modalCopy">Salin Prompt</button>`);
    $('modalEdit').addEventListener('click',closeModal); $('modalCopy').addEventListener('click',()=>copyText(prompt,'Prompt disalin.'));
  }
  function generatePrompt() {
    const c=compilePrompt();
    if(!c.ok){showCompilerError(c);return;}
    compiledPrompt=c.prompt;
    $('finalPrompt').textContent=compiledPrompt;
    $('promptMeta').textContent=`${MASTER_PROMPT_VERSION} · ${isKemenag()?'Kemenag':'Kemendikdasmen'} · Evidence ${c.evidenceLevel} · ${state.settings.outputMode}`;
    const warns=c.warnings.filter(w=>w.level==='warning');
    $('resultWarnings').classList.toggle('hidden',!warns.length);
    if(warns.length)$('resultWarnings').innerHTML=`<strong>Prompt dapat digunakan, tetapi masih ada ${warns.length} catatan yang perlu ditinjau.</strong><p>${esc(warns.slice(0,3).map(w=>w.title).join(' · '))}${warns.length>3?' · …':''}</p>`;
    $('workspaceView').classList.add('app-hidden'); $('resultView').classList.remove('app-hidden'); window.scrollTo({top:0,behavior:'smooth'}); scheduleSave();
  }
  function showCompilerError(c) {
    const title=c.type==='BLOCKED'?'Prompt belum dapat dibuat':'Prompt belum dapat dibuat';
    const list=(c.errors||[]).map(x=>`<li>${esc(typeof x==='string'?x:`${x.title}: ${x.msg}`)}</li>`).join('');
    openModal(title,`<div class="info-box danger"><strong>${c.type==='BLOCKED'?'Perbaiki data dasar terlebih dahulu':'Terdapat data internal yang belum terproses'}</strong><p>PG menghentikan proses agar prompt yang tidak aman tidak disalin.</p></div><ul>${list}</ul>`,`<button class="btn btn-primary" id="modalBack" type="button">Kembali ke Review</button>`);
    $('modalBack').addEventListener('click',()=>{closeModal();openWorkspace(8)});
  }

  function saveDraft() {
    try { collectStaticFields(); state.app.updatedAt=nowIso(); localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); $('autosaveStatus').textContent='Draft tersimpan ✓'; }
    catch(e){ $('autosaveStatus').textContent='Draft belum tersimpan'; }
  }
  function scheduleSave() { $('autosaveStatus').textContent='Menyimpan…'; clearTimeout(saveTimer); saveTimer=setTimeout(saveDraft,350); }
  function loadDraft(apply=false) {
    try { const raw=localStorage.getItem(STORAGE_KEY); if(!raw)return null; const parsed=JSON.parse(raw); if(apply){state=migrateState(parsed);hydrateAll();} return parsed; }
    catch(e){return null;}
  }
  function migrateState(parsed) {
    const base=DEFAULT_STATE(); const merged=deepMerge(base,parsed||{}); merged.app.version=APP_VERSION; return merged;
  }
  function deepMerge(target,source) { for(const k of Object.keys(source||{})){ if(source[k]&&typeof source[k]==='object'&&!Array.isArray(source[k])&&target[k]&&typeof target[k]==='object'&&!Array.isArray(target[k])) target[k]=deepMerge(target[k],source[k]); else target[k]=source[k]; } return target; }
  function clearDraft(){localStorage.removeItem(STORAGE_KEY)}

  function restartFlow() {
    confirmDialog('Mulai ulang PG RKJM?', 'Semua data draft pada perangkat ini akan dihapus. Tindakan ini tidak dapat dibatalkan.', () => {
      clearDraft(); state=DEFAULT_STATE(); compiledPrompt=''; hydrateAll(); openWorkspace(1); toast('Draft dihapus. Anda dapat memulai dari awal.');
    }, 'Ya, Mulai Ulang');
  }
  function logout(){ try { sessionStorage.removeItem(SESSION_KEY); } catch (err) {} location.reload(); }

  function openModal(title,body,footer='') { lastFocused=document.activeElement; $('modalTitle').textContent=title; $('modalBody').innerHTML=body; $('modalFooter').innerHTML=footer; $('modalBackdrop').classList.remove('hidden'); setTimeout(()=>$('closeModal').focus(),20); }
  function closeModal(){ $('modalBackdrop').classList.add('hidden'); if(lastFocused&&lastFocused.focus)lastFocused.focus(); }
  function confirmDialog(title,msg,onConfirm,confirmText='Lanjutkan') { openModal(title,`<p>${esc(msg)}</p>`,`<button class="btn btn-secondary" id="confirmCancel" type="button">Batal</button><button class="btn btn-danger" id="confirmOk" type="button">${esc(confirmText)}</button>`); $('confirmCancel').addEventListener('click',closeModal); $('confirmOk').addEventListener('click',()=>{closeModal();onConfirm();}); }
  function showAbout(){openModal('Tentang PG RKJM',`<p><strong>PG RKJM — Prompt Generator Rencana Kerja Jangka Menengah</strong></p><p class="subtle">Versi aplikasi ${APP_VERSION}<br>Master Prompt ${MASTER_PROMPT_VERSION}<br>Regulatory Profile ${REG_PROFILE_VERSION}<br>Blueprint ${BLUEPRINT_VERSION}</p><p>PG merupakan aplikasi frontend statis. Data draft disimpan di browser/perangkat melalui localStorage. Hasil akhir tetap perlu ditelaah dan ditetapkan oleh satuan pendidikan.</p>`,`<button class="btn btn-primary" id="aboutClose">Tutup</button>`);$('aboutClose').addEventListener('click',closeModal)}
  function showRegulation(){openModal('Acuan Regulasi',`<div class="info-box info"><strong>Profil regulasi terakhir diverifikasi ${REG_LAST_VERIFIED}</strong><p>Freshness check perlu diulang sebelum rilis produksi berikutnya.</p></div><p><strong>Common core:</strong> Permendikdasmen Nomor 26 Tahun 2025 tentang Standar Pengelolaan. Konteks SPMI: Permendikdasmen Nomor 21 Tahun 2026.</p><p><strong>Overlay madrasah:</strong> PMA Nomor 90 Tahun 2013 sebagaimana diubah terakhir dengan PMA Nomor 66 Tahun 2016, plus EDM/RKAM/e-RKAM sesuai data dan konteks yang diberikan.</p><p class="subtle">PG menggunakan ODS Edumind untuk struktur output dan tidak mengklaim satu format BAB/tabel tertentu sebagai format baku pemerintah.</p>`,`<button class="btn btn-primary" id="regClose">Tutup</button>`);$('regClose').addEventListener('click',closeModal)}

  async function copyFinalPrompt(){ if(!compiledPrompt)return; await copyText(compiledPrompt,'Prompt disalin.'); }
  async function copyText(text,msg){ try{await navigator.clipboard.writeText(text);toast(msg)}catch(e){ const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();toast(msg); } }
  function toast(msg){ clearTimeout(toastTimer); $('toast').textContent=msg; $('toast').classList.remove('hidden'); toastTimer=setTimeout(()=>$('toast').classList.add('hidden'),2400); }

  // QA hooks untuk pengujian implementasi lokal. Tidak memengaruhi UX pengguna.
  window.__PG_RKJM_QA__ = {
    version: APP_VERSION,
    getState: () => JSON.parse(JSON.stringify(state)),
    setState: (s) => { state=migrateState(s); hydrateAll(); },
    compile: compilePrompt,
    validate,
    completeness: computeCompleteness,
    evidenceLevel,
    conflicts: detectConflicts,
    clearDraft
  };

  init();
})();
