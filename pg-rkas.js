(() => {
  'use strict';

  const APP_VERSION = 'PG-RKAS-1.0.0';
  const DRAFT_SCHEMA_VERSION = 1;
  const BLUEPRINT_VERSION = 'BLUEPRINT-1.0';
  const MASTER_PROMPT_VERSION = 'MP-1.0';
  const ODS_VERSION = 'ODS-1.0';
  const REG_PROFILE_VERSION = 'RKAS-REG-2026.1';
  const REG_LAST_VERIFIED = '2026-09-27';
  const STORAGE_KEY = 'edumind_pg_rkas_v1';
  const ARCHIVE_KEY = 'edumind_pg_rkas_v1_archive';
  const AUTH_CONFIG = Object.freeze({ username: 'edumind', password: 'akds-pg-rkas092026' });

  const STEP_META = [
    ['Profil & Tahun Anggaran', 'Branch dan identitas'],
    ['Rencana Tahunan', 'Keterkaitan prioritas'],
    ['Data & Evidence', 'Evidence Gate'],
    ['Prioritas & Sasaran', 'Indikator dan target'],
    ['Program & Kegiatan', 'Status perencanaan'],
    ['Sumber Dana & Pagu', 'Funding profile'],
    ['Rincian Anggaran', 'Financial Evidence Gate'],
    ['Tata Kelola', 'Verifikasi & proses'],
    ['Review & Hasil', 'Readiness dan prompt']
  ];

  const LEVELS = {
    KEMENDIKDASMEN: ['SD', 'SMP', 'SMA', 'SMK', 'SLB'],
    KEMENAG: ['RA', 'MI', 'MTs', 'MA', 'MAK']
  };

  const EVIDENCE_SOURCES = {
    KEMENDIKDASMEN: ['Rapor Pendidikan', 'Rekomendasi PBD', 'Evaluasi diri satuan pendidikan', 'Evaluasi program sebelumnya', 'Asesmen', 'Supervisi', 'Data internal', 'Aspirasi warga sekolah', 'Lainnya'],
    KEMENAG: ['EDM', 'Rapor Pendidikan Madrasah', 'Evaluasi program sebelumnya', 'Supervisi pengawas', 'Asesmen', 'Data internal madrasah', 'Aspirasi komite/komunitas', 'Lainnya']
  };

  const FUND_OPTIONS = {
    KEMENDIKDASMEN: [
      ['BOS_REGULAR', 'BOS Reguler', 'VERIFIED_PROFILE_SOURCE'],
      ['BOSP_AFFIRMATION', 'BOSP Afirmasi', 'VERIFIED_PROFILE_SOURCE'],
      ['BOSP_PERFORMANCE', 'BOSP Kinerja', 'VERIFIED_PROFILE_SOURCE'],
      ['USER_DEFINED', 'Sumber Dana Lain', 'USER_DEFINED_SOURCE']
    ],
    KEMENAG_RA: [
      ['BOP_RA', 'BOP RA', 'VERIFIED_PROFILE_SOURCE'],
      ['DIPA', 'DIPA / Anggaran Satker', 'USER_ASSERTED_SOURCE'],
      ['USER_DEFINED', 'Sumber Dana Lain', 'USER_DEFINED_SOURCE']
    ],
    KEMENAG_MADRASAH: [
      ['BOS_MADRASAH', 'BOS Madrasah', 'VERIFIED_PROFILE_SOURCE'],
      ['DIPA', 'DIPA / Anggaran Satker', 'USER_ASSERTED_SOURCE'],
      ['USER_DEFINED', 'Sumber Dana Lain', 'USER_DEFINED_SOURCE']
    ]
  };

  const PRICE_BASIS = [
    ['', 'Belum dicantumkan'],
    ['SSH', 'SSH / standar harga yang berlaku'],
    ['OFFICIAL_REF', 'Referensi resmi lainnya'],
    ['QUOTATION', 'Quotation / penawaran yang dimiliki'],
    ['UNIT_DECISION', 'Ditetapkan satuan pendidikan'],
    ['OTHER', 'Lainnya']
  ];

  const BUDGET_COMPONENTS = [
    ['', 'Belum diklasifikasikan'],
    ['BOOKS', 'Pengembangan perpustakaan / buku'],
    ['HONOR', 'Honor'],
    ['MAINTENANCE', 'Pemeliharaan sarana/prasarana'],
    ['OTHER', 'Komponen lainnya']
  ];

  const DEFAULT_STATE = () => ({
    meta: { appVersion: APP_VERSION, schemaVersion: DRAFT_SCHEMA_VERSION, currentStep: 1, updatedAt: null, createdAt: null, regulatoryProfileVersion: REG_PROFILE_VERSION },
    profile: { ministry: '', educationLevel: '', institutionStatus: '', budgetYear: '2026', unitName: '', schoolYear: '', npsn: '', nsm: '', principalName: '', city: '', province: '' },
    annualPlan: { status: '', period: '', priorities: '', programs: '', activities: '', indicators: '' },
    evidence: [],
    priorities: [],
    activities: [],
    funds: [],
    budgetItems: [],
    governance: { committeeStatus: '', stakeholders: '', meetingNotes: '', approvalStatus: 'NOT_PROVIDED', approvalNotes: '', stateBudgetStatus: '', stateBudgetNotes: '' },
    outputConfig: { contentMode: 'COMBINED', aiMode: 'CONSERVATIVE', depth: 'STANDARD', outputMode: 'CHAT', includeOutstanding: 'YES' }
  });

  let state = DEFAULT_STATE();
  let compiledPrompt = '';
  let saveTimer = null;
  let toastTimer = null;
  let draftReady = false;
  let draftDirty = false;
  let lastSavedSnapshot = '';

  const $ = (id) => document.getElementById(id);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const safeText = (v) => (v == null ? '' : String(v)).trim();
  const esc = (v) => String(v ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
  const nowIso = () => new Date().toISOString();
  const id = (prefix) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const lines = (v) => safeText(v).split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  const nonEmpty = (v) => Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined && String(v).trim() !== '';
  const branch = () => state.profile.ministry;
  const isKemenag = () => branch() === 'KEMENAG';
  const isStateMadrasah = () => isKemenag() && state.profile.educationLevel !== 'RA' && state.profile.institutionStatus === 'Negeri';
  const active = (item) => !item.branch || item.branch === branch();
  const activeList = (arr) => (arr || []).filter(active);

  function documentType() {
    if (branch() === 'KEMENDIKDASMEN') return 'RKAS — Rencana Kegiatan dan Anggaran Satuan Pendidikan';
    if (branch() === 'KEMENAG' && state.profile.educationLevel === 'RA') return 'RKARA — Rencana Kegiatan dan Anggaran Raudhatul Athfal';
    if (branch() === 'KEMENAG') return 'RKAM — Rencana Kerja dan Anggaran Madrasah';
    return 'Dokumen belum ditentukan';
  }

  function officialPlatformNote() {
    if (branch() === 'KEMENDIKDASMEN') return 'ARKAS/MARKAS dan mekanisme Dinas yang berlaku.';
    if (isStateMadrasah()) return 'e-RKAM dan/atau sistem penganggaran satker seperti SAKTI/RKA-K/L/DIPA/POK sesuai kewenangan.';
    if (branch() === 'KEMENAG') return 'e-RKAM dan mekanisme Kementerian Agama yang berlaku.';
    return 'platform resmi pemerintah yang relevan.';
  }

  function init() {
    renderStepNav();
    bindStaticEvents();
    hydrateStaticFields();
    renderAllRepeaters();
    updateDynamicUI();
    showLogin();
  }

  function showLogin() {
    $('loginView').classList.remove('hidden');
    $('loginView').style.display = '';
    $('appView').classList.add('app-hidden');
  }

  function enterApp() {
    clearTimeout(saveTimer);
    draftReady = false;
    draftDirty = false;
    $('loginView').style.display = 'none';
    $('appView').classList.remove('app-hidden');
    $('workspaceView').classList.add('app-hidden');
    $('resultView').classList.add('app-hidden');
    $('welcomeView').classList.remove('app-hidden');
    const draft = loadDraft(false);
    renderDraftRecovery(draft);
    updateArchiveMenu();
  }

  function bindStaticEvents() {
    $('togglePassword').addEventListener('click', () => {
      const input = $('loginPassword');
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      $('togglePassword').textContent = show ? '🙈' : '👁️';
      $('togglePassword').setAttribute('aria-label', show ? 'Sembunyikan password' : 'Tampilkan password');
      $('togglePassword').title = show ? 'Sembunyikan password' : 'Tampilkan password';
    });

    $('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const u = safeText($('loginUsername').value);
      const p = $('loginPassword').value;
      const msg = $('loginMessage');
      if (u === AUTH_CONFIG.username && p === AUTH_CONFIG.password) {
        msg.className = 'login-message show info';
        msg.textContent = 'Login berhasil. Membuka PG RKAS...';
        setTimeout(enterApp, 180);
      } else {
        msg.className = 'login-message show error';
        msg.textContent = 'Username atau password tidak sesuai.';
      }
    });

    $('menuButton').addEventListener('click', () => $('appMenu').classList.toggle('hidden'));
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.menu-wrap')) $('appMenu').classList.add('hidden');
    });
    qsa('#appMenu button[data-action]').forEach(btn => btn.addEventListener('click', () => {
      $('appMenu').classList.add('hidden');
      const action = btn.dataset.action;
      if (action === 'open-regulation') showRegulation();
      else if (action === 'export-draft') exportDraft();
      else if (action === 'import-draft') $('importDraftInput').click();
      else if (action === 'recover-previous') recoverPreviousDraft();
      else if (action === 'about') showAbout();
      else if (action === 'restart') restartFlow();
      else if (action === 'logout') logout();
    }));
    $('importDraftInput').addEventListener('change', (e) => { const f = e.target.files?.[0]; if (f) importDraftFile(f); e.target.value = ''; });

    $('startWizard').addEventListener('click', () => {
      const draft = loadDraft(false);
      if (draft && hasMeaningfulData(draft)) confirmDialog('Mulai draft baru?', 'Draft aktif akan disimpan sebagai Cadangan Draft Sebelumnya sebelum formulir baru dibuka.', startNewFromWelcome, 'Mulai Draft Baru');
      else startNewFromWelcome();
    });
    $('resumeDraftWelcome').addEventListener('click', () => {
      const draft = loadDraft(false); if (!draft) return;
      state = mergeWithDefault(draft); hydrateStaticFields(); renderAllRepeaters(); openWorkspace(state.meta.currentStep || 1); draftReady = true; lastSavedSnapshot = snapshotForSave(state);
    });

    qsa('input[name="ministry"]').forEach(radio => radio.addEventListener('change', (e) => handleMinistryChange(e.target.value)));
    qsa('input[name="annualPlanStatus"]').forEach(radio => radio.addEventListener('change', (e) => {
      state.annualPlan.status = e.target.value; markChanged(); updateDynamicUI();
    }));

    const staticMap = {
      educationLevel:['profile','educationLevel'], institutionStatus:['profile','institutionStatus'], budgetYear:['profile','budgetYear'], unitName:['profile','unitName'], schoolYear:['profile','schoolYear'], npsn:['profile','npsn'], nsm:['profile','nsm'], principalName:['profile','principalName'], city:['profile','city'], province:['profile','province'],
      annualPlanPeriod:['annualPlan','period'], annualPriorities:['annualPlan','priorities'], annualPrograms:['annualPlan','programs'], annualActivities:['annualPlan','activities'], annualIndicators:['annualPlan','indicators'],
      committeeStatus:['governance','committeeStatus'], stakeholders:['governance','stakeholders'], meetingNotes:['governance','meetingNotes'], approvalStatus:['governance','approvalStatus'], approvalNotes:['governance','approvalNotes'], stateBudgetStatus:['governance','stateBudgetStatus'], stateBudgetNotes:['governance','stateBudgetNotes'],
      contentMode:['outputConfig','contentMode'], aiMode:['outputConfig','aiMode'], depth:['outputConfig','depth'], outputMode:['outputConfig','outputMode'], includeOutstanding:['outputConfig','includeOutstanding']
    };
    Object.entries(staticMap).forEach(([elId,[group,key]]) => {
      const el = $(elId); if (!el) return;
      const handler = () => { state[group][key] = el.value; markChanged(); if (elId === 'educationLevel' || elId === 'institutionStatus' || elId === 'budgetYear' || elId === 'contentMode') { renderAllRepeaters(); updateDynamicUI(); } else updateReadiness(); };
      el.addEventListener('input', handler); el.addEventListener('change', handler);
    });

    $('addEvidence').addEventListener('click', () => { state.evidence.push({ id:id('ev'), branch:branch(), sourceType:'', period:'', finding:'', notes:'', active:true }); markChanged(); renderEvidence(); updateReadiness(); });
    $('addPriority').addEventListener('click', () => { state.priorities.push({ id:id('pri'), branch:branch(), title:'', need:'', linkedEvidence:'', indicator:'', target:'', origin:'USER_FACT' }); markChanged(); renderPriorities(); updateReadiness(); });
    $('addActivity').addEventListener('click', () => { state.activities.push({ id:id('act'), branch:branch(), programName:'', activityName:'', linkedPriority:'', status:'PLANNED', indicator:'', target:'', schedule:'', responsible:'' }); markChanged(); renderActivities(); updateReadiness(); });
    $('addFund').addEventListener('click', () => { state.funds.push({ id:id('fund'), branch:branch(), type:'', customName:'', ceiling:'', verification:'UNVERIFIED' }); markChanged(); renderFunds(); renderBudgetItems(); updateReadiness(); });
    $('addBudgetItem').addEventListener('click', () => { state.budgetItems.push({ id:id('bud'), branch:branch(), activityId:'', description:'', component:'', volume:'', unit:'', unitPrice:'', total:null, fundId:'', priceBasis:'', priceBasisNote:'', period:'', activityCode:'', accountCode:'', referenceVerification:'UNVERIFIED', notes:'' }); markChanged(); recalculateAll(); renderBudgetItems(); renderFunds(); updateReadiness(); });

    ['evidenceList','priorityList','activityList','fundList','budgetList'].forEach(containerId => {
      $(containerId).addEventListener('input', handleRepeaterInput);
      $(containerId).addEventListener('change', handleRepeaterInput);
      $(containerId).addEventListener('click', handleRepeaterClick);
    });

    $('prevStep').addEventListener('click', () => goStep(Math.max(1, state.meta.currentStep - 1)));
    $('nextStep').addEventListener('click', () => { collectStaticFields(); if (state.meta.currentStep < STEP_META.length) goStep(state.meta.currentStep + 1); });
    $('previewPrompt').addEventListener('click', previewPrompt);
    $('generatePrompt').addEventListener('click', generatePrompt);
    $('copyPrompt').addEventListener('click', copyFinalPrompt);
    $('previewPromptResult').addEventListener('click', () => showPromptModal(compiledPrompt || compilePrompt()));
    $('editData').addEventListener('click', () => openWorkspace(9));
    $('restartResult').addEventListener('click', restartFlow);
    $('closeModal').addEventListener('click', closeModal);
    $('modal').addEventListener('click', (e) => { if (e.target === $('modal')) closeModal(); });
  }

  function handleMinistryChange(newValue) {
    const oldValue = state.profile.ministry;
    if (oldValue && oldValue !== newValue && hasBranchData(oldValue)) {
      const oldRadio = document.querySelector(`input[name="ministry"][value="${cssEsc(oldValue)}"]`);
      const newRadio = document.querySelector(`input[name="ministry"][value="${cssEsc(newValue)}"]`);
      if (oldRadio) oldRadio.checked = true; if (newRadio) newRadio.checked = false;
      updateChoiceCards();
      confirmDialog('Ubah naungan?', 'Mengubah naungan akan mengubah regulatory profile dan field aktif. Data repeater branch sebelumnya tetap disimpan di draft tetapi tidak dimasukkan ke prompt selama branch tersebut tidak aktif.', () => applyMinistry(newValue), 'Ubah Naungan');
    } else applyMinistry(newValue);
  }

  function applyMinistry(value) {
    state.profile.ministry = value;
    if (!LEVELS[value]?.includes(state.profile.educationLevel)) state.profile.educationLevel = '';
    markChanged(); hydrateLevelOptions(); renderAllRepeaters(); updateDynamicUI(); updateChoiceCards();
  }

  function hasBranchData(b) {
    return [state.evidence,state.priorities,state.activities,state.funds,state.budgetItems].some(arr => (arr||[]).some(x => x.branch === b));
  }

  function handleRepeaterInput(e) {
    const el = e.target; const card = el.closest('[data-kind][data-id]'); if (!card) return;
    const kind = card.dataset.kind, itemId = card.dataset.id, field = el.dataset.field; if (!field) return;
    const arr = collectionForKind(kind); const item = arr.find(x => x.id === itemId); if (!item) return;
    item[field] = el.type === 'checkbox' ? el.checked : el.value;
    if (kind === 'fund' && (field === 'type' || field === 'customName')) item.verification = fundVerification(item);
    if (kind === 'budget') {
      if (['volume','unitPrice'].includes(field)) recalculateBudgetItem(item);
      if (field === 'referenceVerification' && !item.activityCode && !item.accountCode) item.referenceVerification = 'NOT_APPLICABLE';
    }
    markChanged();
    if (kind === 'evidence') { renderPriorities(); }
    if (kind === 'priority') { renderActivities(); }
    if (kind === 'activity') { renderBudgetItems(); }
    if (kind === 'fund') { renderBudgetItems(); }
    if (kind === 'budget') { renderFunds(); }
    updateReadiness();
  }

  function handleRepeaterClick(e) {
    const btn = e.target.closest('button[data-action]'); if (!btn) return;
    const card = btn.closest('[data-kind][data-id]'); if (!card) return;
    const kind = card.dataset.kind, itemId = card.dataset.id, action = btn.dataset.action;
    if (action === 'delete') {
      confirmDialog('Hapus data?', 'Data ini akan dihapus dari draft aktif.', () => {
        const arr = collectionForKind(kind); const idx = arr.findIndex(x => x.id === itemId); if (idx >= 0) arr.splice(idx,1);
        if (kind === 'activity') state.budgetItems.forEach(x => { if (x.activityId === itemId) x.activityId = ''; });
        if (kind === 'fund') state.budgetItems.forEach(x => { if (x.fundId === itemId) x.fundId = ''; });
        markChanged(); renderAllRepeaters(); updateReadiness();
      }, 'Hapus');
    } else if (action === 'confirm-plan' && kind === 'activity') {
      const item = state.activities.find(x => x.id === itemId); if (item) { item.status = 'PLANNED'; markChanged(); renderActivities(); renderBudgetItems(); updateReadiness(); toast('Usulan AI dikonfirmasi sebagai rencana pengguna.'); }
    }
  }

  function collectionForKind(kind) {
    return kind === 'evidence' ? state.evidence : kind === 'priority' ? state.priorities : kind === 'activity' ? state.activities : kind === 'fund' ? state.funds : state.budgetItems;
  }

  function hydrateStaticFields() {
    hydrateLevelOptions();
    const values = {
      educationLevel:state.profile.educationLevel, institutionStatus:state.profile.institutionStatus, budgetYear:state.profile.budgetYear, unitName:state.profile.unitName, schoolYear:state.profile.schoolYear, npsn:state.profile.npsn, nsm:state.profile.nsm, principalName:state.profile.principalName, city:state.profile.city, province:state.profile.province,
      annualPlanPeriod:state.annualPlan.period, annualPriorities:state.annualPlan.priorities, annualPrograms:state.annualPlan.programs, annualActivities:state.annualPlan.activities, annualIndicators:state.annualPlan.indicators,
      committeeStatus:state.governance.committeeStatus, stakeholders:state.governance.stakeholders, meetingNotes:state.governance.meetingNotes, approvalStatus:state.governance.approvalStatus, approvalNotes:state.governance.approvalNotes, stateBudgetStatus:state.governance.stateBudgetStatus, stateBudgetNotes:state.governance.stateBudgetNotes,
      contentMode:state.outputConfig.contentMode, aiMode:state.outputConfig.aiMode, depth:state.outputConfig.depth, outputMode:state.outputConfig.outputMode, includeOutstanding:state.outputConfig.includeOutstanding
    };
    Object.entries(values).forEach(([k,v]) => { if ($(k)) $(k).value = v ?? ''; });
    qsa('input[name="ministry"]').forEach(r => r.checked = r.value === state.profile.ministry);
    qsa('input[name="annualPlanStatus"]').forEach(r => r.checked = r.value === state.annualPlan.status);
    updateChoiceCards(); updateDynamicUI();
  }

  function hydrateLevelOptions() {
    const sel = $('educationLevel'); const opts = LEVELS[branch()] || [];
    const current = state.profile.educationLevel;
    sel.innerHTML = `<option value="">${branch() ? 'Pilih jenjang/jenis satuan' : 'Pilih naungan terlebih dahulu'}</option>` + opts.map(x => `<option value="${esc(x)}">${esc(x)}</option>`).join('');
    if (opts.includes(current)) sel.value = current;
  }

  function collectStaticFields(mark = true) {
    const assign = (id, obj, key) => { if ($(id)) obj[key] = $(id).value; };
    ['educationLevel','institutionStatus','budgetYear','unitName','schoolYear','npsn','nsm','principalName','city','province'].forEach(k => assign(k,state.profile,k));
    assign('annualPlanPeriod',state.annualPlan,'period'); assign('annualPriorities',state.annualPlan,'priorities'); assign('annualPrograms',state.annualPlan,'programs'); assign('annualActivities',state.annualPlan,'activities'); assign('annualIndicators',state.annualPlan,'indicators');
    assign('committeeStatus',state.governance,'committeeStatus'); assign('stakeholders',state.governance,'stakeholders'); assign('meetingNotes',state.governance,'meetingNotes'); assign('approvalStatus',state.governance,'approvalStatus'); assign('approvalNotes',state.governance,'approvalNotes'); assign('stateBudgetStatus',state.governance,'stateBudgetStatus'); assign('stateBudgetNotes',state.governance,'stateBudgetNotes');
    assign('contentMode',state.outputConfig,'contentMode'); assign('aiMode',state.outputConfig,'aiMode'); assign('depth',state.outputConfig,'depth'); assign('outputMode',state.outputConfig,'outputMode'); assign('includeOutstanding',state.outputConfig,'includeOutstanding');
    if (mark) markChanged();
  }

  function renderStepNav() {
    $('stepNav').innerHTML = STEP_META.map((s,i) => `<button type="button" class="step-link" data-step-link="${i+1}"><span class="step-num">${i+1}</span><span class="step-text"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></span></button>`).join('');
    qsa('[data-step-link]').forEach(btn => btn.addEventListener('click', () => goStep(Number(btn.dataset.stepLink))));
  }

  function renderAllRepeaters() {
    renderEvidence(); renderPriorities(); renderActivities(); recalculateAll(); renderFunds(); renderBudgetItems();
  }

  function renderEvidence() {
    const list = activeList(state.evidence); const root = $('evidenceList');
    if (!list.length) { root.innerHTML = emptyState('📊','Belum ada evidence','Tambahkan temuan dari Rapor Pendidikan/PBD/evaluasi diri atau EDM sesuai branch.'); return; }
    const sourceOpts = EVIDENCE_SOURCES[branch()] || ['Lainnya'];
    root.innerHTML = list.map((e,i) => `<div class="entity-card" data-kind="evidence" data-id="${e.id}"><div class="entity-head"><div class="entity-title"><strong>Evidence ${i+1}</strong>${e.active?'<span class="tag tag-source">Aktif</span>':'<span class="tag tag-neutral">Tidak dipakai</span>'}</div><div class="entity-actions"><button type="button" class="btn btn-sm btn-danger" data-action="delete">Hapus</button></div></div><div class="entity-body"><div class="field-grid"><div class="field"><label>Sumber</label><select data-field="sourceType">${optionList(sourceOpts.map(x=>[x,x]),e.sourceType,'Pilih sumber')}</select></div><div class="field"><label>Periode/Tahun</label><input data-field="period" value="${esc(e.period)}" placeholder="Contoh: 2026"></div><div class="field full"><label>Temuan</label><textarea data-field="finding" placeholder="Tuliskan data/temuan yang benar-benar tersedia">${esc(e.finding)}</textarea></div><div class="field full"><label>Catatan</label><textarea data-field="notes" placeholder="Opsional">${esc(e.notes)}</textarea></div><div class="field"><label><input type="checkbox" data-field="active" ${e.active?'checked':''}> Gunakan sebagai dasar</label></div></div></div></div>`).join('');
  }

  function renderPriorities() {
    const list = activeList(state.priorities); const root = $('priorityList'); const ev = activeList(state.evidence).filter(x=>x.active);
    if (!list.length) { root.innerHTML = emptyState('🎯','Belum ada prioritas','Tambahkan minimal satu prioritas/kebutuhan yang akan diturunkan menjadi kegiatan.'); return; }
    root.innerHTML = list.map((p,i) => `<div class="entity-card" data-kind="priority" data-id="${p.id}"><div class="entity-head"><div class="entity-title"><strong>Prioritas ${i+1}</strong><span class="tag ${p.origin==='AI_PROPOSAL'?'tag-ai':p.origin==='IMPORTED_PLAN'?'tag-source':'tag-fact'}">${priorityOriginLabel(p.origin)}</span></div><div class="entity-actions"><button type="button" class="btn btn-sm btn-danger" data-action="delete">Hapus</button></div></div><div class="entity-body"><div class="field-grid"><div class="field"><label>Prioritas/Fokus</label><input data-field="title" value="${esc(p.title)}" placeholder="Contoh: Penguatan literasi"></div><div class="field"><label>Asal</label><select data-field="origin">${optionList([['USER_FACT','Ditetapkan pengguna'],['IMPORTED_PLAN','Dari rencana tahunan'],['AI_PROPOSAL','Usulan AI']],p.origin)}</select></div><div class="field"><label>Evidence terkait</label><select data-field="linkedEvidence"><option value="">Belum dihubungkan</option>${ev.map(x=>`<option value="${x.id}" ${x.id===p.linkedEvidence?'selected':''}>${esc((x.finding||x.sourceType||'Evidence').slice(0,80))}</option>`).join('')}</select></div><div class="field"><label>Kebutuhan/Masalah</label><input data-field="need" value="${esc(p.need)}" placeholder="Hanya yang didukung data"></div><div class="field"><label>Indikator</label><input data-field="indicator" value="${esc(p.indicator)}" placeholder="Boleh berupa usulan untuk ditinjau"></div><div class="field"><label>Target</label><input data-field="target" value="${esc(p.target)}" placeholder="Target final ditetapkan satuan"></div></div></div></div>`).join('');
  }

  function renderActivities() {
    const list = activeList(state.activities); const root = $('activityList'); const pris = activeList(state.priorities);
    if (!list.length) { root.innerHTML = emptyState('🗂️','Belum ada program/kegiatan','Tambahkan kegiatan yang existing, planned, atau masih berupa usulan AI.'); return; }
    root.innerHTML = list.map((a,i) => {
      const fs = financialStatus(a.id); const statusTag = a.status==='AI_PROPOSED'?'tag-ai':a.status==='EXISTING'?'tag-source':'tag-decision';
      return `<div class="entity-card" data-kind="activity" data-id="${a.id}"><div class="entity-head"><div class="entity-title"><strong>Kegiatan ${i+1}</strong><span class="tag ${statusTag}">${activityStatusLabel(a.status)}</span><span class="tag ${fs.code==='COMPLETE_BUDGET'?'tag-success':fs.code==='PARTIAL_BUDGET'?'tag-warning':'tag-neutral'}">${fs.label}</span></div><div class="entity-actions">${a.status==='AI_PROPOSED'?'<button type="button" class="btn btn-sm btn-secondary" data-action="confirm-plan">Gunakan sebagai Rencana</button>':''}<button type="button" class="btn btn-sm btn-danger" data-action="delete">Hapus</button></div></div><div class="entity-body"><div class="field-grid"><div class="field"><label>Nama Program</label><input data-field="programName" value="${esc(a.programName)}" placeholder="Contoh: Program Literasi"></div><div class="field"><label>Nama Kegiatan</label><input data-field="activityName" value="${esc(a.activityName)}" placeholder="Contoh: Pengadaan bahan bacaan"></div><div class="field"><label>Prioritas terkait</label><select data-field="linkedPriority"><option value="">Belum dihubungkan</option>${pris.map(p=>`<option value="${p.id}" ${p.id===a.linkedPriority?'selected':''}>${esc(p.title||'Prioritas')}</option>`).join('')}</select></div><div class="field"><label>Status Perencanaan</label><select data-field="status">${optionList([['EXISTING','Sudah Berjalan'],['PLANNED','Direncanakan'],['AI_PROPOSED','Usulan AI']],a.status)}</select></div><div class="field"><label>Indikator</label><input data-field="indicator" value="${esc(a.indicator)}" placeholder="Opsional"></div><div class="field"><label>Target</label><input data-field="target" value="${esc(a.target)}" placeholder="Keputusan final satuan"></div><div class="field"><label>Jadwal</label><input data-field="schedule" value="${esc(a.schedule)}" placeholder="Jangan diisi jika belum ditetapkan"></div><div class="field"><label>Penanggung Jawab/Fungsi</label><input data-field="responsible" value="${esc(a.responsible)}" placeholder="Jangan mengarang nama"></div></div></div></div>`;
    }).join('');
  }

  function renderFunds() {
    const list = activeList(state.funds); const root = $('fundList');
    if (!list.length) { root.innerHTML = emptyState('💼','Belum ada sumber dana','Tambahkan sumber dana hanya jika memang digunakan atau direncanakan.'); return; }
    root.innerHTML = list.map((f,i) => {
      const summary = fundSummary(f.id); const verification = fundVerification(f); f.verification = verification;
      return `<div class="entity-card" data-kind="fund" data-id="${f.id}"><div class="entity-head"><div class="entity-title"><strong>Sumber Dana ${i+1}</strong><span class="tag ${verification==='VERIFIED_PROFILE_SOURCE'?'tag-source':'tag-warning'}">${fundVerificationLabel(verification)}</span></div><div class="entity-actions"><button type="button" class="btn btn-sm btn-danger" data-action="delete">Hapus</button></div></div><div class="entity-body"><div class="field-grid"><div class="field"><label>Jenis Sumber Dana</label><select data-field="type">${fundTypeOptions(f.type)}</select></div><div class="field"><label>Nama/Keterangan</label><input data-field="customName" value="${esc(f.customName)}" placeholder="Isi bila perlu memperjelas sumber"></div><div class="field"><label>Pagu Faktual</label><input data-field="ceiling" type="number" min="0" step="1" value="${esc(f.ceiling)}" placeholder="Kosong ≠ Rp0"><div class="field-help">AI LOCK — masukkan hanya jika diketahui.</div></div></div><div class="financial-summary"><div class="financial-chip"><span>Pagu</span><strong class="money">${f.ceiling!==''?formatRupiah(num(f.ceiling)):'Belum diisi'}</strong></div><div class="financial-chip"><span>Dialokasikan</span><strong class="money">${formatRupiah(summary.allocated)}</strong></div><div class="financial-chip"><span>Belum dialokasikan</span><strong class="money">${f.ceiling!==''?formatRupiah(summary.remaining):'Belum dapat dihitung'}</strong></div></div>${verification!=='VERIFIED_PROFILE_SOURCE'?'<div class="info-box warning" style="margin-top:12px"><strong>Rule spesifik belum dipastikan</strong><p>PG mencatat sumber ini sebagai data pengguna dan tidak menyatakan penggunaannya patuh pada ketentuan sumber tersebut.</p></div>':''}</div></div>`;
    }).join('');
  }

  function renderBudgetItems() {
    const list = activeList(state.budgetItems); const root = $('budgetList'); const acts = activeList(state.activities).filter(a=>a.status!=='AI_PROPOSED'); const funds = activeList(state.funds);
    if (!list.length) { root.innerHTML = emptyState('🧮','Belum ada rincian anggaran','Tambahkan rincian biaya. Total akan dihitung otomatis dari volume × harga satuan.'); return; }
    root.innerHTML = list.map((b,i) => {
      recalculateBudgetItem(b); const comp = budgetCompleteness(b); const codesPresent = safeText(b.activityCode) || safeText(b.accountCode);
      return `<div class="entity-card" data-kind="budget" data-id="${b.id}"><div class="entity-head"><div class="entity-title"><strong>Rincian Biaya ${i+1}</strong><span class="tag ${comp.complete?'tag-success':'tag-warning'}">${comp.complete?'Data Finansial Lengkap':`Belum lengkap: ${esc(comp.missing.join(', '))}`}</span></div><div class="entity-actions"><button type="button" class="btn btn-sm btn-danger" data-action="delete">Hapus</button></div></div><div class="entity-body"><div class="field-grid three"><div class="field"><label>Kegiatan</label><select data-field="activityId"><option value="">Pilih kegiatan</option>${acts.map(a=>`<option value="${a.id}" ${a.id===b.activityId?'selected':''}>${esc(a.activityName||a.programName||'Kegiatan')}</option>`).join('')}</select></div><div class="field"><label>Sumber Dana</label><select data-field="fundId"><option value="">Pilih sumber dana</option>${funds.map(f=>`<option value="${f.id}" ${f.id===b.fundId?'selected':''}>${esc(fundDisplayName(f))}</option>`).join('')}</select></div><div class="field"><label>Komponen</label><select data-field="component">${optionList(BUDGET_COMPONENTS,b.component)}</select></div><div class="field full"><label>Uraian Barang/Jasa</label><input data-field="description" value="${esc(b.description)}" placeholder="Uraian faktual kebutuhan biaya"></div><div class="field"><label>Volume</label><input data-field="volume" type="number" min="0" step="any" value="${esc(b.volume)}" placeholder="Belum diisi"></div><div class="field"><label>Satuan</label><input data-field="unit" value="${esc(b.unit)}" placeholder="Contoh: eksemplar, paket"></div><div class="field"><label>Harga Satuan (Rp)</label><input data-field="unitPrice" type="number" min="0" step="1" value="${esc(b.unitPrice)}" placeholder="Belum diisi"></div><div class="field"><label>Total</label><input class="readonly money" readonly value="${b.total===null?'Belum dapat dihitung':formatRupiah(b.total)}"></div><div class="field"><label>Semester/Periode</label><input data-field="period" value="${esc(b.period)}" placeholder="Opsional"></div><div class="field"><label>Basis Harga</label><select data-field="priceBasis">${optionList(PRICE_BASIS,b.priceBasis)}</select></div><div class="field"><label>Catatan Basis Harga</label><input data-field="priceBasisNote" value="${esc(b.priceBasisNote)}" placeholder="Contoh: SSH kabupaten menurut pengguna"></div><div class="field"><label>Status Referensi Kode</label><select data-field="referenceVerification">${optionList([['UNVERIFIED','Belum diverifikasi'],['USER_ASSERTED','Dimasukkan manual — belum diverifikasi'],['VERIFIED','Dari platform/referensi resmi'],['NOT_APPLICABLE','Tidak berlaku']],b.referenceVerification)}</select></div><div class="field"><label>Kode Kegiatan</label><input data-field="activityCode" value="${esc(b.activityCode)}" placeholder="Hanya jika diketahui"></div><div class="field"><label>Kode Rekening</label><input data-field="accountCode" value="${esc(b.accountCode)}" placeholder="Hanya jika diketahui"></div><div class="field full"><label>Catatan</label><textarea data-field="notes" placeholder="Opsional">${esc(b.notes)}</textarea></div></div><div class="budget-status info-box ${comp.complete?'success':'warning'}"><strong>${comp.complete?'Perhitungan siap':'Financial Evidence Gate'}</strong><p>${b.total===null?'Total belum dihitung karena volume atau harga satuan belum tersedia.':`Total ${formatRupiah(b.total)} dihitung otomatis oleh PG dari angka pengguna.`}${codesPresent && b.referenceVerification!=='VERIFIED'?' Kode yang dimasukkan belum dianggap referensi resmi.':''}</p></div></div></div>`;
    }).join('');
  }

  function emptyState(emoji,title,text) { return `<div class="empty-state"><div class="emoji">${emoji}</div><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`; }
  function optionList(options,current,placeholder) { let html = placeholder!==undefined ? `<option value="">${esc(placeholder)}</option>` : ''; return html + options.map(o=>{const pair=Array.isArray(o)?o:[o,o];return `<option value="${esc(pair[0])}" ${String(pair[0])===String(current)?'selected':''}>${esc(pair[1])}</option>`;}).join(''); }

  function fundTypeOptions(current) {
    let key = branch(); if (branch()==='KEMENAG') key = state.profile.educationLevel==='RA' ? 'KEMENAG_RA' : 'KEMENAG_MADRASAH';
    let options = FUND_OPTIONS[key] || [['USER_DEFINED','Sumber Dana Lain','USER_DEFINED_SOURCE']];
    if (branch()==='KEMENAG' && state.profile.institutionStatus!=='Negeri') options = options.filter(x=>x[0]!=='DIPA');
    return `<option value="">Pilih jenis</option>` + options.map(x=>`<option value="${x[0]}" ${x[0]===current?'selected':''}>${esc(x[1])}</option>`).join('');
  }

  function fundVerification(f) {
    const type = f.type;
    const known = new Set(['BOS_REGULAR','BOSP_AFFIRMATION','BOSP_PERFORMANCE','BOP_RA','BOS_MADRASAH']);
    if (known.has(type)) return 'VERIFIED_PROFILE_SOURCE';
    if (type === 'DIPA') return 'USER_ASSERTED_SOURCE';
    return 'USER_DEFINED_SOURCE';
  }
  function fundVerificationLabel(v) { return v==='VERIFIED_PROFILE_SOURCE'?'Regulatory profile tersedia':v==='USER_ASSERTED_SOURCE'?'Sumber dinyatakan pengguna':'Sumber dana pengguna'; }
  function fundDisplayName(f) {
    const all = [...FUND_OPTIONS.KEMENDIKDASMEN,...FUND_OPTIONS.KEMENAG_RA,...FUND_OPTIONS.KEMENAG_MADRASAH];
    const base = all.find(x=>x[0]===f.type)?.[1] || 'Sumber Dana';
    return safeText(f.customName) || base;
  }

  function priorityOriginLabel(v) { return ({USER_FACT:'Ditetapkan pengguna',IMPORTED_PLAN:'Dari rencana tahunan',AI_PROPOSAL:'Usulan AI'})[v] || 'Data pengguna'; }
  function activityStatusLabel(v) { return ({EXISTING:'Sudah Berjalan',PLANNED:'Direncanakan',AI_PROPOSED:'Usulan AI'})[v] || 'Belum ditetapkan'; }

  function recalculateAll() { activeList(state.budgetItems).forEach(recalculateBudgetItem); }
  function recalculateBudgetItem(item) {
    const volRaw = item.volume, priceRaw = item.unitPrice;
    const volKnown = volRaw !== '' && volRaw !== null && volRaw !== undefined;
    const priceKnown = priceRaw !== '' && priceRaw !== null && priceRaw !== undefined;
    if (!volKnown || !priceKnown) { item.total = null; return; }
    const vol = Number(volRaw), price = Number(priceRaw);
    if (!Number.isFinite(vol) || !Number.isFinite(price) || vol < 0 || price < 0) { item.total = null; return; }
    item.total = Math.round(vol * price);
  }

  function budgetCompleteness(b) {
    const missing = [];
    if (!safeText(b.activityId)) missing.push('kegiatan');
    if (!safeText(b.description)) missing.push('uraian');
    if (b.volume === '') missing.push('volume');
    if (!safeText(b.unit)) missing.push('satuan');
    if (b.unitPrice === '') missing.push('harga');
    if (!safeText(b.fundId)) missing.push('sumber dana');
    return { complete: !missing.length && b.total !== null, missing };
  }

  function financialStatus(activityId) {
    const items = activeList(state.budgetItems).filter(x=>x.activityId===activityId);
    if (!items.length) return {code:'NOT_BUDGETED',label:'Belum Dianggarkan'};
    if (items.every(x=>budgetCompleteness(x).complete)) return {code:'COMPLETE_BUDGET',label:'Data Anggaran Lengkap'};
    return {code:'PARTIAL_BUDGET',label:'Data Anggaran Sebagian'};
  }

  function fundSummary(fundId) {
    const f = state.funds.find(x=>x.id===fundId); const allocated = activeList(state.budgetItems).filter(x=>x.fundId===fundId && x.total!==null).reduce((s,x)=>s+Number(x.total||0),0);
    const ceiling = f && f.ceiling!=='' ? num(f.ceiling) : null;
    return { allocated, remaining: ceiling===null?null:ceiling-allocated };
  }

  function num(v) { const n = Number(v); return Number.isFinite(n) ? n : 0; }
  function formatRupiah(v) { if (v===null || v===undefined || !Number.isFinite(Number(v))) return '—'; return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(v)); }

  function updateChoiceCards() {
    qsa('.choice-card[data-choice-for]').forEach(card => { const input=card.querySelector('input'); card.classList.toggle('selected',Boolean(input?.checked)); });
  }

  function updateDynamicUI() {
    $('nsmField').classList.toggle('hidden', !isKemenag());
    const showAnnual = state.annualPlan.status === 'AVAILABLE' || state.annualPlan.status === 'DRAFT';
    $('annualPlanDetail').classList.toggle('hidden', !showAnnual);
    $('annualPlanWarning').classList.toggle('hidden', state.annualPlan.status !== 'NONE');
    $('stateBudgetCard').classList.toggle('hidden', !isStateMadrasah());
    const level = evidenceLevel();
    $('evidenceBadge').textContent = level.label; $('evidenceBadge').className = `tag ${level.code==='E0'?'tag-warning':level.code==='E1'?'tag-source':'tag-success'}`;
    $('evidenceGateNote').className = `info-box ${level.code==='E0'?'warning':level.code==='E1'?'info':'success'}`;
    $('evidenceGateNote').innerHTML = `<strong>Evidence Gate: ${esc(level.label)}</strong><p>${esc(level.note)}</p>`;
    updateHeader(); updateChoiceCards(); updateReadiness();
  }

  function updateHeader() {
    $('headerProfile').textContent = branch() ? [branch()==='KEMENAG'?'Kemenag':'Kemendikdasmen',state.profile.educationLevel,state.profile.institutionStatus,state.profile.budgetYear?`TA ${state.profile.budgetYear}`:''].filter(Boolean).join(' · ') : 'Profil belum dipilih';
  }

  function evidenceLevel() {
    const ev = activeList(state.evidence).filter(x=>x.active && safeText(x.finding));
    if (!ev.length) return {code:'E0',label:'Belum cukup',note:'AI tidak boleh menyimpulkan masalah aktual. Tambahkan evidence bila ingin analisis kontekstual.'};
    if (ev.length === 1) return {code:'E1',label:'Terbatas',note:'Analisis terbatas diperbolehkan. Kesimpulan baru tetap perlu validasi manusia.'};
    return {code:'E2',label:'Siap dianalisis',note:'Evidence tersedia untuk analisis, tetapi fakta baru dan keputusan final tetap tidak boleh diciptakan AI.'};
  }

  function computeCompleteness() {
    const checks = [
      [state.profile.ministry,2],[state.profile.educationLevel,2],[state.profile.institutionStatus,2],[state.profile.budgetYear,2],[state.profile.unitName,2],[state.annualPlan.status,2],
      [activeList(state.priorities).some(x=>safeText(x.title)),2],[activeList(state.activities).some(x=>safeText(x.activityName)),2],
      [activeList(state.evidence).some(x=>x.active&&safeText(x.finding)),1],[activeList(state.funds).length>0,1],[activeList(state.budgetItems).some(x=>budgetCompleteness(x).complete),1],[state.governance.committeeStatus,1]
    ];
    const max = checks.reduce((s,x)=>s+x[1],0); const got = checks.reduce((s,x)=>s+(truthy(x[0])?x[1]:0),0); return Math.round(got/max*100);
  }
  function truthy(v) { return typeof v === 'boolean' ? v : nonEmpty(v); }

  function planningReadiness() {
    const missingCore = !state.profile.ministry || !state.profile.educationLevel || !state.profile.institutionStatus || !safeText(state.profile.budgetYear) || !safeText(state.profile.unitName) || !activeList(state.priorities).some(x=>safeText(x.title)) || !activeList(state.activities).some(x=>safeText(x.activityName));
    if (missingCore) return {code:'NOT_READY',label:'Belum siap',note:'Lengkapi profil, minimal satu prioritas, dan minimal satu kegiatan.'};
    if (state.annualPlan.status !== 'AVAILABLE' || evidenceLevel().code==='E0') return {code:'PARTIAL',label:'Siap dengan catatan',note:'Draf perencanaan dapat dibuat, tetapi alignment/evidence belum sepenuhnya tervalidasi.'};
    return {code:'READY',label:'Siap',note:'Data inti perencanaan tersedia untuk menyusun draf.'};
  }

  function budgetReadiness() {
    const items = activeList(state.budgetItems); const complete = items.filter(x=>budgetCompleteness(x).complete); const v = validate(false);
    if (!items.length) return {code:'NOT_READY',label:'Belum siap',note:'Belum ada rincian anggaran faktual.'};
    if (v.blockers.some(x=>x.scope.includes('BUDGET'))) return {code:'NOT_READY',label:'Belum siap',note:'Terdapat blocker finansial yang perlu diselesaikan.'};
    if (complete.length === items.length && activeList(state.funds).length) return {code:'READY',label:'Siap',note:`${complete.length} dari ${items.length} item memiliki data finansial lengkap.`};
    return {code:'PARTIAL',label:'Sebagian',note:`${complete.length} dari ${items.length} item memiliki data finansial lengkap.`};
  }

  function outputReadiness() {
    const p = planningReadiness(), b = budgetReadiness(), v = validate(false);
    const generalBlock = v.blockers.some(x=>x.scope.includes('ALL'));
    return {
      PLANNING: generalBlock || p.code==='NOT_READY' ? 'NOT_READY' : p.code==='READY'?'READY':'PARTIAL',
      BUDGET: generalBlock || b.code==='NOT_READY' ? 'NOT_READY' : b.code==='READY'?'READY':'PARTIAL',
      VALIDATION: state.profile.ministry ? 'READY' : 'PARTIAL',
      PLATFORM: generalBlock || b.code!=='READY' ? 'NOT_READY' : v.warnings.some(x=>x.scope.includes('PLATFORM')) ? 'PARTIAL' : 'PARTIAL'
    };
  }

  function validate(includeModeSpecific = true) {
    const blockers=[], warnings=[], infos=[];
    const add=(arr,scope,title,text)=>arr.push({scope:Array.isArray(scope)?scope:[scope],title,text});
    if (!state.profile.ministry) add(blockers,'ALL','Naungan belum dipilih','Pilih Kemendikdasmen atau Kemenag.');
    if (!state.profile.educationLevel) add(blockers,'ALL','Jenjang/jenis satuan belum dipilih','Pilih jenjang/jenis satuan sesuai branch.');
    if (!state.profile.institutionStatus) add(blockers,'ALL','Status satuan belum dipilih','Pilih Negeri atau Swasta.');
    if (!/^\d{4}$/.test(safeText(state.profile.budgetYear))) add(blockers,'ALL','Tahun anggaran belum valid','Gunakan 4 digit tahun anggaran, misalnya 2026.');
    if (!safeText(state.profile.unitName)) add(blockers,'ALL','Nama satuan pendidikan belum diisi','Isi nama satuan pendidikan.');
    if (!activeList(state.priorities).some(x=>safeText(x.title))) add(blockers,'PLANNING','Prioritas belum tersedia','Tambahkan minimal satu prioritas untuk Planning Draft.');
    if (!activeList(state.activities).some(x=>safeText(x.activityName))) add(blockers,'PLANNING','Kegiatan belum tersedia','Tambahkan minimal satu kegiatan untuk Planning Draft.');

    if (!state.annualPlan.status || state.annualPlan.status==='NONE') add(warnings,['PLANNING','PLATFORM'],'Alignment rencana tahunan belum tervalidasi','Draf tetap dapat dibuat, tetapi jangan mengklaim selaras penuh dengan rencana tahunan.');
    if (evidenceLevel().code==='E0') add(warnings,'PLANNING','Evidence belum tersedia','AI harus membatasi analisis kondisi aktual.');

    activeList(state.activities).filter(x=>x.status==='AI_PROPOSED').forEach(x=>add(warnings,['PLANNING','BUDGET'],`Usulan AI belum dikonfirmasi: ${x.activityName||'kegiatan'}`,'Usulan AI tidak boleh masuk ke total anggaran sampai pengguna mengubahnya menjadi Planned.'));

    activeList(state.funds).forEach(f=>{
      const ceilingKnown = f.ceiling !== '';
      if (ceilingKnown && (!Number.isFinite(Number(f.ceiling)) || Number(f.ceiling)<0)) add(blockers,'BUDGET',`Pagu tidak valid: ${fundDisplayName(f)}`,'Pagu tidak boleh negatif atau bukan angka.');
      const sum=fundSummary(f.id);
      if (ceilingKnown && sum.allocated > Number(f.ceiling)) add(blockers,['BUDGET','PLATFORM'],`Alokasi melebihi pagu: ${fundDisplayName(f)}`,`Total alokasi ${formatRupiah(sum.allocated)} melebihi pagu ${formatRupiah(Number(f.ceiling))}. PG tidak akan memangkas otomatis.`);
      if (ceilingKnown && sum.remaining > 0) add(warnings,'BUDGET',`Pagu belum seluruhnya dialokasikan: ${fundDisplayName(f)}`,`Masih terdapat ${formatRupiah(sum.remaining)} yang belum dialokasikan. AI tidak boleh menciptakan kegiatan untuk menghabiskan sisa.`);
      if (fundVerification(f)!=='VERIFIED_PROFILE_SOURCE') add(warnings,['BUDGET','PLATFORM'],`Rule sumber dana belum lengkap: ${fundDisplayName(f)}`,'PG mencatat sumber dana ini tetapi tidak mengklaim eligibility/kepatuhan spesifik.');
    });

    activeList(state.budgetItems).forEach((b,i)=>{
      if (b.volume!=='' && (!Number.isFinite(Number(b.volume)) || Number(b.volume)<0)) add(blockers,'BUDGET',`Volume tidak valid pada rincian ${i+1}`,'Volume tidak boleh negatif atau bukan angka.');
      if (b.unitPrice!=='' && (!Number.isFinite(Number(b.unitPrice)) || Number(b.unitPrice)<0)) add(blockers,'BUDGET',`Harga satuan tidak valid pada rincian ${i+1}`,'Harga satuan tidak boleh negatif atau bukan angka.');
      const c=budgetCompleteness(b); if (!c.complete) add(warnings,'BUDGET',`Data finansial belum lengkap pada rincian ${i+1}`,`Masih diperlukan: ${c.missing.join(', ')}.`);
      if (!b.priceBasis) add(warnings,'BUDGET',`Basis harga belum dicantumkan pada rincian ${i+1}`,'Harga tetap dianggap data pengguna; PG tidak menyatakan sesuai SSH/harga pasar.');
      if ((safeText(b.activityCode)||safeText(b.accountCode)) && b.referenceVerification!=='VERIFIED') add(warnings,['BUDGET','PLATFORM'],`Kode belum terverifikasi pada rincian ${i+1}`,'Kode yang dimasukkan pengguna tidak otomatis dianggap referensi resmi tahun berjalan.');
    });

    duplicateBudgetWarnings().forEach(text=>add(warnings,'BUDGET','Kemungkinan duplikasi rincian biaya',text));
    regulatoryChecks().forEach(x=>add(x.severity==='BLOCKER'?blockers:warnings,['BUDGET','PLATFORM'],x.title,x.text));

    if (isStateMadrasah() && state.governance.stateBudgetStatus!=='AVAILABLE') add(warnings,'PLATFORM','Alignment RKA-K/L/DIPA/POK belum tervalidasi','Madrasah negeri dapat memerlukan alignment dengan dokumen anggaran satker; PG tidak membuat kode/nomor dokumen yang tidak tersedia.');
    if (state.governance.approvalStatus && state.governance.approvalStatus!=='NOT_PROVIDED') add(infos,'ALL','Status persetujuan adalah user-reported','PG tidak memverifikasi status ini terhadap platform pemerintah.');
    add(infos,'ALL','Status output selalu DRAF','PG tidak menghasilkan bukti pengesahan atau status resmi.');
    add(infos,'PLATFORM','Verifikasi platform resmi tetap diperlukan',officialPlatformNote());

    if (includeModeSpecific) {
      const mode=state.outputConfig.contentMode;
      if ((mode==='BUDGET'||mode==='COMBINED') && !activeList(state.budgetItems).some(x=>budgetCompleteness(x).complete)) add(blockers,'BUDGET','Belum ada item anggaran lengkap','Untuk Draf Kegiatan & Anggaran, minimal satu item harus mempunyai data finansial lengkap.');
    }
    return {blockers,warnings,infos};
  }

  function duplicateBudgetWarnings() {
    const seen=new Map(), out=[];
    activeList(state.budgetItems).forEach((b,i)=>{
      const key=[b.activityId,safeText(b.description).toLowerCase(),b.volume,b.unitPrice,b.fundId].join('|');
      if (!safeText(b.description) || b.volume==='' || b.unitPrice==='') return;
      if (seen.has(key)) out.push(`Rincian ${seen.get(key)+1} dan ${i+1} mempunyai kegiatan/uraian/volume/harga/sumber yang identik. Pastikan bukan duplikasi input.`); else seen.set(key,i);
    }); return out;
  }

  function regulatoryChecks() {
    const out=[]; if (branch()!=='KEMENDIKDASMEN' || safeText(state.profile.budgetYear)!=='2026' || !['SD','SMP','SMA','SMK'].includes(state.profile.educationLevel)) return out;
    const fund=activeList(state.funds).find(f=>f.type==='BOS_REGULAR' && f.ceiling!==''); if (!fund) return out;
    const ceiling=Number(fund.ceiling); if (!(ceiling>0)) return out;
    const items=activeList(state.budgetItems).filter(x=>x.fundId===fund.id && x.total!==null);
    const total=(component)=>items.filter(x=>x.component===component).reduce((s,x)=>s+Number(x.total||0),0);
    const pct=(v)=>v/ceiling*100;
    const bookPct=pct(total('BOOKS')), honorPct=pct(total('HONOR')), maintPct=pct(total('MAINTENANCE'));
    const fullyAllocated = fundSummary(fund.id).remaining===0;
    if (fullyAllocated && bookPct < 10) out.push({severity:'BLOCKER',title:'Alokasi buku di bawah minimum profile BOSP 2026',text:`Terhitung ${bookPct.toFixed(2)}% dari pagu BOS Reguler; regulatory profile PG memuat minimum 10% untuk pengembangan perpustakaan/penyediaan buku pada scope yang didukung.`});
    else if (bookPct < 10) out.push({severity:'WARNING',title:'Alokasi buku sementara di bawah 10%',text:`Terhitung ${bookPct.toFixed(2)}%. Karena pagu belum seluruhnya dialokasikan, ini ditampilkan sebagai warning sampai rencana lengkap.`});
    const honorMax = state.profile.institutionStatus==='Swasta' ? 40 : 20;
    if (honorPct > honorMax) out.push({severity:'BLOCKER',title:'Honor melebihi batas profile BOSP 2026',text:`Terhitung ${honorPct.toFixed(2)}% dari pagu; profile aktif menggunakan batas maksimum ${honorMax}% sesuai status satuan.`});
    if (maintPct > 20) out.push({severity:'BLOCKER',title:'Pemeliharaan sarpras melebihi batas profile BOSP 2026',text:`Terhitung ${maintPct.toFixed(2)}% dari pagu; profile aktif menggunakan batas maksimum 20%.`});
    return out;
  }

  function updateReadiness() {
    recalculateAll(); updateHeader();
    const pct=computeCompleteness(), p=planningReadiness(), b=budgetReadiness(), v=validate(false);
    $('completionValue').textContent=`${pct}%`; $('completionLabel').textContent=pct>=80?'Cukup lengkap':pct>=50?'Sebagian':'Belum siap'; $('completionBar').style.width=`${pct}%`;
    $('planningReadiness').innerHTML=statusTag(p); $('budgetReadiness').innerHTML=statusTag(b);
    $('activeEvidenceCount').textContent=activeList(state.evidence).filter(x=>x.active&&safeText(x.finding)).length;
    $('priorityCount').textContent=activeList(state.priorities).length; $('activityCount').textContent=activeList(state.activities).length; $('fundCount').textContent=activeList(state.funds).length;
    $('completeBudgetCount').textContent=activeList(state.budgetItems).filter(x=>budgetCompleteness(x).complete).length; $('budgetItemCount').textContent=activeList(state.budgetItems).length;
    $('blockerCount').textContent=v.blockers.length; $('warningCount').textContent=v.warnings.length; $('infoCount').textContent=v.infos.length;
    if (state.meta.currentStep===9) renderReview();
  }
  function statusTag(r) { return `<span class="tag ${r.code==='READY'?'tag-success':r.code==='PARTIAL'?'tag-warning':'tag-danger'}">${esc(r.label)}</span>`; }

  function renderReview() {
    const pct=computeCompleteness(), p=planningReadiness(), b=budgetReadiness(), v=validate(false), or=outputReadiness();
    $('reviewCompleteness').textContent=`${pct}%`; $('reviewCompletenessLabel').textContent=pct>=80?'Cukup lengkap':pct>=50?'Sebagian':'Belum siap'; $('reviewCompletenessBar').style.width=`${pct}%`;
    $('reviewPlanning').innerHTML=statusTag(p); $('reviewPlanningNote').textContent=p.note; $('reviewBudget').innerHTML=statusTag(b); $('reviewBudgetNote').textContent=b.note;
    $('reviewBlockers').textContent=v.blockers.length; $('reviewWarnings').textContent=v.warnings.length; $('reviewInfos').textContent=v.infos.length;
    const items=[...v.blockers.map(x=>['blocker',x]),...v.warnings.map(x=>['warning',x]),...v.infos.map(x=>['info',x])];
    $('reviewValidationList').innerHTML=items.length?items.map(([cls,x])=>`<div class="validation-item ${cls}"><strong>${esc(x.title)}</strong>${esc(x.text)}</div>`).join(''):'<div class="validation-item info"><strong>Tidak ada catatan</strong>Validator belum menemukan isu pada data yang tersedia.</div>';
    const labels={PLANNING:'Draf Perencanaan',BUDGET:'Draf Kegiatan & Anggaran',VALIDATION:'Review & Validasi',PLATFORM:'Persiapan Platform'};
    $('outputReadinessGrid').innerHTML=Object.entries(or).map(([k,val])=>`<div class="output-ready-card"><strong>${labels[k]}</strong><span class="tag ${val==='READY'?'tag-success':val==='PARTIAL'?'tag-warning':'tag-danger'}">${val==='READY'?'Siap':val==='PARTIAL'?'Sebagian':'Belum siap'}</span></div>`).join('');
  }

  function openWorkspace(step=1) {
    $('welcomeView').classList.add('app-hidden'); $('resultView').classList.add('app-hidden'); $('workspaceView').classList.remove('app-hidden'); goStep(step,false); draftReady=true; updateReadiness(); window.scrollTo({top:0,behavior:'smooth'});
  }

  function goStep(step,save=true) {
    if (save) { collectStaticFields(false); flushDraft(); }
    state.meta.currentStep=Math.min(Math.max(1,step),STEP_META.length);
    qsa('.step-panel').forEach(p=>p.classList.toggle('hidden',Number(p.dataset.step)!==state.meta.currentStep));
    qsa('[data-step-link]').forEach(btn=>{const s=Number(btn.dataset.stepLink);btn.classList.toggle('active',s===state.meta.currentStep);btn.classList.toggle('done',s<state.meta.currentStep);});
    $('mobileStepLabel').textContent=`Langkah ${state.meta.currentStep} dari ${STEP_META.length}`; $('mobileProgressBar').style.width=`${state.meta.currentStep/STEP_META.length*100}%`;
    $('prevStep').disabled=state.meta.currentStep===1; $('nextStep').classList.toggle('hidden',state.meta.currentStep===STEP_META.length);
    if (state.meta.currentStep===9) renderReview(); state.meta.updatedAt=nowIso(); queueSave(); updateReadiness(); window.scrollTo({top:0,behavior:'smooth'});
  }

  function markChanged() { draftDirty=true; state.meta.updatedAt=nowIso(); if (!state.meta.createdAt) state.meta.createdAt=state.meta.updatedAt; $('autosaveStatus').textContent='Menyimpan...'; queueSave(); }
  function queueSave() { if (!draftReady && !$('workspaceView')?.classList.contains('app-hidden')) draftReady=true; clearTimeout(saveTimer); saveTimer=setTimeout(flushDraft,500); }
  function flushDraft() {
    if (!draftReady) return;
    try {
      recalculateAll(); state.meta.updatedAt=nowIso(); if (!state.meta.createdAt) state.meta.createdAt=state.meta.updatedAt;
      if (!hasMeaningfulData(state)) { $('autosaveStatus').textContent='Belum ada draft'; return; }
      const snap=snapshotForSave(state); if (snap===lastSavedSnapshot && !draftDirty) { $('autosaveStatus').textContent='Draft tersimpan'; return; }
      localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); lastSavedSnapshot=snap; draftDirty=false; $('autosaveStatus').textContent='Draft tersimpan';
    } catch(e) { $('autosaveStatus').textContent='Draft belum tersimpan'; }
  }
  function snapshotForSave(obj) { try{return JSON.stringify(obj);}catch(e){return '';} }
  function hasMeaningfulData(obj) { return Boolean(obj?.profile?.ministry || obj?.profile?.unitName || obj?.annualPlan?.status || (obj?.evidence||[]).length || (obj?.priorities||[]).length || (obj?.activities||[]).length || (obj?.funds||[]).length || (obj?.budgetItems||[]).length); }

  function loadDraft(showError=true) {
    try { const raw=localStorage.getItem(STORAGE_KEY); if(!raw)return null; const obj=JSON.parse(raw); if(Number(obj?.meta?.schemaVersion)!==DRAFT_SCHEMA_VERSION)throw new Error('schema'); return obj; }
    catch(e){ if(showError) toast('Draft lokal tidak dapat dibaca.'); return null; }
  }
  function mergeWithDefault(obj) {
    const d=DEFAULT_STATE(); return { ...d, ...obj, meta:{...d.meta,...obj.meta}, profile:{...d.profile,...obj.profile}, annualPlan:{...d.annualPlan,...obj.annualPlan}, governance:{...d.governance,...obj.governance}, outputConfig:{...d.outputConfig,...obj.outputConfig}, evidence:Array.isArray(obj.evidence)?obj.evidence:[], priorities:Array.isArray(obj.priorities)?obj.priorities:[], activities:Array.isArray(obj.activities)?obj.activities:[], funds:Array.isArray(obj.funds)?obj.funds:[], budgetItems:Array.isArray(obj.budgetItems)?obj.budgetItems:[] };
  }
  function renderDraftRecovery(draft) {
    const has=Boolean(draft&&hasMeaningfulData(draft)); $('draftRecoveryNotice').classList.toggle('hidden',!has); $('resumeDraftWelcome').classList.toggle('hidden',!has);
    if(has){$('draftRecoveryMeta').textContent=`Terakhir tersimpan ${formatDraftTime(draft.meta?.updatedAt)}. Anda dapat melanjutkan tanpa mengisi ulang.`;$('startWizard').textContent='Mulai Draft Baru';} else $('startWizard').textContent='Mulai';
  }
  function startNewFromWelcome() { const old=loadDraft(false); if(old)try{localStorage.setItem(ARCHIVE_KEY,JSON.stringify(old));}catch(e){} try{localStorage.removeItem(STORAGE_KEY);}catch(e){} state=DEFAULT_STATE(); hydrateStaticFields(); renderAllRepeaters(); openWorkspace(1); draftReady=true; queueSave(); updateArchiveMenu(); }

  function compilePrompt() {
    collectStaticFields(false); recalculateAll();
    const ev=activeList(state.evidence).filter(x=>x.active), pris=activeList(state.priorities), acts=activeList(state.activities), funds=activeList(state.funds), buds=activeList(state.budgetItems); const v=validate(false); const p=planningReadiness(), b=budgetReadiness();
    const out=[]; const section=(name,body)=>{ if(safeText(body)) out.push(`==================================================\n${name}\n==================================================\n${body}`); };
    section('ROLE & TASK', `Anda bertindak sebagai asisten penyusunan DRAF perencanaan kegiatan dan anggaran satuan pendidikan. Gunakan hanya data faktual, regulatory profile, dan hasil kalkulasi yang diberikan dalam prompt ini. Jangan menggantikan keputusan satuan pendidikan, pengesahan, verifikasi, atau input pada platform pemerintah.\n\nJenis keluaran: ${contentModeLabel(state.outputConfig.contentMode)}.\nStatus dokumen WAJIB: DRAF.`);
    section('REGULATORY PROFILE', regulatoryProfileText());
    section('NON-NEGOTIABLE FACTUAL RULES', `1. Jangan membuat fakta satuan pendidikan yang tidak diberikan.\n2. Jangan mengubah Existing/Planned/AI Proposal tanpa dasar.\n3. Jangan membuat nama pejabat, vendor, rekening, nomor SK, tanggal keputusan, atau identitas lain.\n4. Jangan menyatakan konsultasi/persetujuan telah dilakukan kecuali diberikan sebagai USER_REPORTED.\n5. Jangan menyatakan kepatuhan final di luar regulatory profile.\n6. Jika data tidak tersedia, nyatakan belum tersedia; jangan mengisi agar tabel tampak lengkap.`);
    section('FINANCIAL HARD RULES', `1. DILARANG mengarang nominal, pagu, volume, satuan faktual, harga satuan, sumber dana, saldo, kode kegiatan, kode rekening, persentase, atau status persetujuan.\n2. Total yang diberikan sebagai DERIVED_FACT berasal dari calculation engine PG; jangan menggantinya dengan estimasi.\n3. UNKNOWN tidak sama dengan ZERO. Jangan mengubah field kosong menjadi Rp0 atau angka asumsi.\n4. Jangan menggunakan harga “wajar”, rata-rata, harga pasar, atau asumsi.\n5. Jangan memindahkan alokasi antar-sumber untuk menyeimbangkan pagu.\n6. Jika ada sisa pagu, jangan menciptakan kegiatan untuk menghabiskannya.\n7. Kode USER_ASSERTED/UNVERIFIED tidak boleh disebut sebagai kode resmi.\n8. Approval USER_REPORTED tidak boleh diubah menjadi PLATFORM_VERIFIED.`);
    section('DOCUMENT IDENTITY & INSTITUTION FACTS', institutionFactsText());
    section('ANNUAL PLAN LINKAGE', annualPlanText());
    section('EVIDENCE PROFILE', evidenceText(ev));
    section('PRIORITIES & TARGETS', priorityText(pris));
    section('PROGRAM & ACTIVITY DATA', activityText(acts));
    section('FUNDING SOURCES', fundingText(funds));
    section('BUDGET INPUTS', budgetText(buds));
    section('MINISTRY-SPECIFIC OVERLAY', ministryOverlayText());
    section('VALIDATION STATE', validationText(v,p,b));
    section('OUTPUT SPECIFICATION', outputSpecification());
    section('MISSING DATA RULES', `- Field faktual kosong: jangan diisi.\n- Field finansial kosong: jangan diestimasi.\n- Regulatory field: gunakan hanya rule yang tercantum dalam profile.\n- Indikator/target baru boleh ditawarkan sebagai opsi berlabel USULAN; target final tetap keputusan satuan.\n- AI_PROPOSAL yang belum dikonfirmasi tidak masuk total anggaran.\n- Bagian yang belum lengkap boleh ditampilkan sebagai “belum tersedia/belum dapat dihitung”.`);
    section('FINAL QUALITY CHECK', `Sebelum menjawab, periksa dan perbaiki secara internal:\n- tidak ada angka atau sumber dana buatan;\n- semua total konsisten dengan DERIVED_FACT;\n- sumber dana tetap terpisah;\n- branch Kemendikdasmen/Kemenag tidak tercampur;\n- AI_PROPOSAL tetap proposal;\n- USER_REPORTED tidak berubah menjadi official verified;\n- kode yang belum diverifikasi tetap dilabeli belum diverifikasi;\n- output tidak meniru seolah-olah cetakan resmi ARKAS/e-RKAM;\n- status dokumen tetap DRAF;\n- jangan mengklaim file DOCX telah dibuat jika sistem Anda tidak benar-benar membuatnya.`);
    return out.join('\n\n');
  }

  function regulatoryProfileText() {
    if (branch()==='KEMENDIKDASMEN') return `Ministry: Kementerian Pendidikan Dasar dan Menengah\nDocument: ${documentType()}\nFiscal Year: ${promptSafe(state.profile.budgetYear)}\nOfficial platform context: ARKAS/MARKAS\nRegulatory profile version: ${REG_PROFILE_VERSION}\nVerified foundation:\n- Permendikdasmen Nomor 26 Tahun 2025 tentang Standar Pengelolaan.\n- Permendikdasmen Nomor 8 Tahun 2026 tentang Juknis Pengelolaan Dana BOSP.\n- Dokumentasi operasional ARKAS/MARKAS yang berlaku.\nRule set yang dibawa PG hanya berlaku jika scope tahun, jenis satuan, status, sumber dana, dan komponen cocok. Jangan memperluas rule ke scope lain.`;
    if (branch()==='KEMENAG') return `Ministry: Kementerian Agama\nDocument: ${documentType()}\nFiscal Year: ${promptSafe(state.profile.budgetYear)}\nOfficial system context: ${isStateMadrasah()?'e-RKAM + sistem anggaran satker sesuai kewenangan':'e-RKAM'}\nRegulatory profile version: ${REG_PROFILE_VERSION}\nVerified/operational foundation:\n- Juknis BOP RA/BOS Madrasah 2026 (Kepdirjen Pendis 944 Tahun 2026) dan perubahan 2100 Tahun 2026 sebagaimana direferensikan pada kanal resmi Kemenag 2026.\n- EDM/e-RKAM sebagai konteks perencanaan madrasah.\nPG TIDAK memuat rule persentase/eligibility spesifik Kemenag yang belum diverifikasi dalam profile. Jika rule tidak dimuat, jangan mengarangnya.`;
    return 'Regulatory branch belum dipilih. Jangan menetapkan nomenklatur atau aturan finansial.';
  }

  function institutionFactsText() {
    const p=state.profile, arr=[];
    pushKV(arr,'Naungan',p.ministry==='KEMENAG'?'Kementerian Agama':p.ministry==='KEMENDIKDASMEN'?'Kementerian Pendidikan Dasar dan Menengah':''); pushKV(arr,'Jenis dokumen',documentType()); pushKV(arr,'Jenjang/jenis satuan',p.educationLevel); pushKV(arr,'Status satuan',p.institutionStatus); pushKV(arr,'Tahun anggaran',p.budgetYear); pushKV(arr,'Nama satuan pendidikan',p.unitName); pushKV(arr,'Tahun ajaran',p.schoolYear); pushKV(arr,'NPSN',p.npsn); if(isKemenag())pushKV(arr,'NSM',p.nsm); pushKV(arr,'Nama kepala satuan',p.principalName); pushKV(arr,'Kabupaten/Kota',p.city); pushKV(arr,'Provinsi',p.province); return arr.join('\n');
  }

  function annualPlanText() {
    const a=state.annualPlan; if (!a.status || a.status==='NONE') return `Status rencana tahunan: BELUM TERSEDIA / TIDAK DIBERIKAN. Draf masih boleh disusun dari fakta lain, tetapi JANGAN mengklaim alignment dengan rencana tahunan.`;
    let arr=[`Status rencana tahunan: ${a.status==='AVAILABLE'?'AVAILABLE':'DRAFT/PARTIAL'}`]; pushKV(arr,'Periode',a.period); if(lines(a.priorities).length)arr.push('Prioritas relevan:\n'+bulletLines(lines(a.priorities))); if(lines(a.programs).length)arr.push('Program relevan:\n'+bulletLines(lines(a.programs))); if(lines(a.activities).length)arr.push('Kegiatan relevan:\n'+bulletLines(lines(a.activities))); if(lines(a.indicators).length)arr.push('Indikator/target yang diberikan:\n'+bulletLines(lines(a.indicators))); arr.push('Gunakan hanya bagian yang diberikan; jangan melengkapi isi dokumen tahunan yang hilang.'); return arr.join('\n');
  }

  function evidenceText(ev) {
    if (!ev.length) return `Evidence Gate = E0 / BELUM CUKUP. Jangan menyimpulkan masalah aktual atau akar masalah faktual. Bila diperlukan, berikan daftar data yang masih perlu dilengkapi.`;
    return `Evidence Gate: ${evidenceLevel().code} (${evidenceLevel().label})\n\n` + ev.map((e,i)=>`E${i+1}\nSumber: ${promptSafe(e.sourceType)||'tidak disebutkan'}\nPeriode: ${promptSafe(e.period)||'tidak disebutkan'}\nTemuan: ${promptSafe(e.finding)||'[BELUM TERSEDIA]'}${e.notes?`\nCatatan: ${promptSafe(e.notes)}`:''}\nOrigin: USER/SOURCE FACT`).join('\n\n');
  }

  function priorityText(pris) {
    if (!pris.length) return 'Prioritas belum tersedia. Jangan menciptakan prioritas faktual.';
    return pris.map((p,i)=>{const e=state.evidence.find(x=>x.id===p.linkedEvidence);return `P${i+1}\nPrioritas: ${promptSafe(p.title)||'[BELUM TERSEDIA]'}${p.need?`\nKebutuhan/masalah: ${promptSafe(p.need)}`:''}${e?`\nEvidence terkait: ${promptSafe(e.finding||e.sourceType)}`:''}${p.indicator?`\nIndikator: ${promptSafe(p.indicator)}`:''}${p.target?`\nTarget: ${promptSafe(p.target)}`:''}\nOrigin: ${p.origin}`;}).join('\n\n');
  }

  function activityText(acts) {
    if (!acts.length) return 'Program/kegiatan belum tersedia. Jangan membuatnya seolah sudah diputuskan.';
    return acts.map((a,i)=>{const p=state.priorities.find(x=>x.id===a.linkedPriority);const fs=financialStatus(a.id);return `A${i+1}\nProgram: ${promptSafe(a.programName)||'[BELUM TERSEDIA]'}\nKegiatan: ${promptSafe(a.activityName)||'[BELUM TERSEDIA]'}\nPlanning status: ${a.status}${p?`\nPrioritas terkait: ${promptSafe(p.title)}`:''}${a.indicator?`\nIndikator: ${promptSafe(a.indicator)}`:''}${a.target?`\nTarget: ${promptSafe(a.target)}`:''}${a.schedule?`\nJadwal: ${promptSafe(a.schedule)}`:''}${a.responsible?`\nPenanggung jawab/fungsi: ${promptSafe(a.responsible)}`:''}\nFinancial status: ${fs.code}`;}).join('\n\n');
  }

  function fundingText(funds) {
    if (!funds.length) return 'Sumber dana belum diberikan. Jangan membuat sumber dana atau pagu.';
    return funds.map((f,i)=>{const s=fundSummary(f.id);return `F${i+1}\nSumber: ${promptSafe(fundDisplayName(f))}\nType: ${f.type||'USER_DEFINED'}\nOrigin/verification: ${fundVerification(f)}${f.ceiling!==''?`\nPagu: ${Number(f.ceiling)} [USER_FACT]\nDialokasikan: ${s.allocated} [DERIVED_FACT]\nBelum dialokasikan: ${s.remaining} [DERIVED_FACT]`:'\nPagu: UNKNOWN'}`;}).join('\n\n');
  }

  function budgetText(buds) {
    if (!buds.length) return 'Belum ada rincian anggaran. Jangan mengisi volume, harga, total, sumber dana, atau kode.';
    return buds.map((b,i)=>{const a=state.activities.find(x=>x.id===b.activityId),f=state.funds.find(x=>x.id===b.fundId);const arr=[`B${i+1}`]; pushKV(arr,'Kegiatan',a?.activityName); pushKV(arr,'Uraian',b.description); pushKV(arr,'Komponen',componentLabel(b.component)); arr.push(`Volume: ${b.volume===''?'UNKNOWN':`${promptSafe(b.volume)} [USER_FACT]`}`); arr.push(`Satuan: ${safeText(b.unit)?`${promptSafe(b.unit)} [USER_FACT]`:'UNKNOWN'}`); arr.push(`Harga satuan: ${b.unitPrice===''?'UNKNOWN':`${promptSafe(b.unitPrice)} [USER_FACT]`}`); arr.push(`Total: ${b.total===null?'UNKNOWN':`${b.total} [DERIVED_FACT — PG calculation engine]`}`); pushKV(arr,'Sumber dana',f?fundDisplayName(f):''); pushKV(arr,'Periode',b.period); if(b.priceBasis){arr.push(`Basis harga: ${priceBasisLabel(b.priceBasis)} [USER_REPORTED]${b.priceBasisNote?` — ${promptSafe(b.priceBasisNote)}`:''}`);} if(b.activityCode)arr.push(`Kode kegiatan: ${promptSafe(b.activityCode)} [${b.referenceVerification}]`); if(b.accountCode)arr.push(`Kode rekening: ${promptSafe(b.accountCode)} [${b.referenceVerification}]`); pushKV(arr,'Catatan',b.notes); return arr.join('\n');}).join('\n\n');
  }

  function ministryOverlayText() {
    if (branch()==='KEMENDIKDASMEN') return `Gunakan nomenklatur ${documentType()}. Pertahankan linkage dengan rencana tahunan jika tersedia. Jangan menciptakan kode/referensi ARKAS. Status pengesahan hanya berasal dari proses resmi. Untuk rule BOSP 2026 yang dimuat PG, patuhi hanya hasil validator dengan scope yang cocok; jangan membuat persentase lain.`;
    if (branch()==='KEMENAG' && state.profile.educationLevel==='RA') return `Gunakan nomenklatur RKARA. Jangan mengganti label menjadi RKAS/RKAM. Perlakukan BOP RA dan sumber lain sesuai provenance. Jangan membuat rule persentase Kemenag yang tidak dimuat.`;
    if (isStateMadrasah()) return `Gunakan nomenklatur RKAM. Pertahankan EDM/e-RKAM sebagai konteks perencanaan. Pisahkan BOS dari DIPA/RKA-K/L/POK; jangan melebur provenance sumber. Jika data satker tidak tersedia, nyatakan alignment belum dapat diverifikasi.`;
    if (branch()==='KEMENAG') return `Gunakan nomenklatur RKAM. Pertahankan EDM/e-RKAM sebagai konteks perencanaan madrasah swasta. Jangan menciptakan rule finansial Kemenag yang tidak dimuat dalam regulatory profile.`;
    return 'Branch kementerian belum ditentukan.';
  }

  function validationText(v,p,b) {
    const arr=[`Planning Readiness: ${p.label}`,`Budget Readiness: ${b.label}`,`Blocker: ${v.blockers.length}`,`Warning: ${v.warnings.length}`,`Info: ${v.infos.length}`];
    if(v.blockers.length)arr.push('\nBLOCKER:\n'+v.blockers.map(x=>`- ${x.title}: ${x.text}`).join('\n')); if(v.warnings.length)arr.push('\nWARNING:\n'+v.warnings.map(x=>`- ${x.title}: ${x.text}`).join('\n')); if(v.infos.length)arr.push('\nINFO:\n'+v.infos.map(x=>`- ${x.title}: ${x.text}`).join('\n')); return arr.join('\n');
  }

  function outputSpecification() {
    const mode=state.outputConfig.contentMode, depth=state.outputConfig.depth, word=state.outputConfig.outputMode==='WORD'||state.outputConfig.outputMode==='CHAT_WORD', chat=state.outputConfig.outputMode==='CHAT'||state.outputConfig.outputMode==='CHAT_WORD';
    let out=`Status: DRAF — bukan bukti pengesahan.\nKedalaman: ${depth==='CONCISE'?'Ringkas':depth==='DEEP'?'Mendalam':'Standar'}.\nJenis keluaran: ${contentModeLabel(mode)}.\n`;
    if(mode==='PLANNING') out+=`\nSusun: Identitas; dasar/sumber data; prioritas tahunan; matriks program & kegiatan; indikator/target; jadwal/PJ bila faktual; data yang belum lengkap; catatan platform resmi. Jangan memaksa tabel finansial lengkap.`;
    else if(mode==='BUDGET') out+=`\nSusun: Identitas; matriks kegiatan & anggaran; ringkasan per sumber dana; Financial Evidence Gate; blocker/warning; data yang belum lengkap; catatan verifikasi platform. UNKNOWN harus tetap kosong/belum tersedia.`;
    else if(mode==='VALIDATION') out+=`\nSusun laporan Review & Validasi: BLOCKER, WARNING, INFO, konsistensi matematika, provenance, kode/reference status, alignment planning-financial, dan daftar tindakan yang perlu ditinjau manusia. Jangan memberi klaim kepatuhan final.`;
    else out+=`\nSusun draf terpadu: 1) Identitas/status DRAF; 2) dasar & sumber data; 3) prioritas tahunan; 4) matriks program/kegiatan; 5) matriks kegiatan & anggaran faktual; 6) ringkasan per sumber dana; 7) keterkaitan evidence-prioritas-kegiatan; 8) hasil validasi; 9) data yang masih harus dilengkapi; 10) catatan untuk verifikasi platform resmi.`;
    if(state.outputConfig.includeOutstanding==='YES') out+=`\nSertakan bagian “Data yang Masih Harus Dilengkapi”.`;
    if(chat)out+=`\nTampilkan versi chat dengan heading dan tabel yang rapi.`;
    if(word)out+=`\nJika sistem benar-benar mendukung pembuatan file, buat Microsoft Word (.docx) dengan heading dan tabel rapi. Jika tidak, jangan mengklaim file telah dibuat; berikan output Word-ready.`;
    out+=`\nJangan meniru seolah-olah merupakan cetakan resmi ARKAS/e-RKAM.`; return out;
  }

  function contentModeLabel(v) { return ({PLANNING:'Draf Perencanaan',BUDGET:'Draf Kegiatan & Anggaran',VALIDATION:'Review & Validasi',COMBINED:'Draf Terpadu'})[v]||'Draf Terpadu'; }
  function componentLabel(v) { return Object.fromEntries(BUDGET_COMPONENTS)[v] || ''; }
  function priceBasisLabel(v) { return Object.fromEntries(PRICE_BASIS)[v] || ''; }
  function pushKV(arr,label,value) { if(nonEmpty(value))arr.push(`${label}: ${promptSafe(value)}`); }
  function bulletLines(arr) { return arr.map(x=>`- ${promptSafe(x)}`).join('\n'); }
  function promptSafe(v) { return safeText(v).replace(/\[(USER|REGULATORY|DERIVED|AI)_[A-Z_]+\]/gi,'[TAG DINETRALKAN]').replace(/```/g,'` ` `'); }

  function previewPrompt() { collectStaticFields(false); showPromptModal(compilePrompt()); }
  function generatePrompt() {
    collectStaticFields(false); const v=validate(true); const mode=state.outputConfig.contentMode;
    const blocking=v.blockers.filter(x=>x.scope.includes('ALL') || (mode==='PLANNING'&&x.scope.includes('PLANNING')) || (mode==='BUDGET'&&x.scope.includes('BUDGET')) || (mode==='COMBINED'&&(x.scope.includes('PLANNING')||x.scope.includes('BUDGET'))));
    if(blocking.length){renderReview();toast('Selesaikan BLOCKER yang memengaruhi keluaran yang dipilih.');return;}
    compiledPrompt=compilePrompt(); $('finalPrompt').textContent=compiledPrompt; const p=planningReadiness(),b=budgetReadiness(), vv=validate(false);
    $('resultDocument').textContent=documentType(); $('resultProfile').textContent=[branch()==='KEMENAG'?'Kemenag':'Kemendikdasmen',state.profile.educationLevel,state.profile.institutionStatus].filter(Boolean).join(' · '); $('resultBudgetYear').textContent=state.profile.budgetYear||'—'; $('resultPlanning').textContent=p.label; $('resultBudget').textContent=b.label; $('resultValidation').textContent=`${vv.blockers.length} Blocker · ${vv.warnings.length} Warning · ${vv.infos.length} Info`;
    flushDraft(); $('workspaceView').classList.add('app-hidden'); $('welcomeView').classList.add('app-hidden'); $('resultView').classList.remove('app-hidden'); window.scrollTo({top:0,behavior:'smooth'});
  }
  async function copyFinalPrompt() { if(!compiledPrompt)compiledPrompt=compilePrompt(); try{await navigator.clipboard.writeText(compiledPrompt);toast('Prompt berhasil disalin ✓');}catch(e){const ta=document.createElement('textarea');ta.value=compiledPrompt;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();toast('Prompt berhasil disalin ✓');} }
  function showPromptModal(text) { showModal('Pratinjau Prompt',`<pre class="prompt-preview">${esc(text||compilePrompt())}</pre>`); }

  function showAbout() {
    showModal('Tentang PG RKAS', `<p><strong>${APP_VERSION}</strong></p><p>PG RKAS adalah form terstruktur + Evidence Gate + Financial Evidence Gate + validator + deterministic calculation engine + regulatory branching + prompt compiler untuk menyiapkan draf RKAS/RKAM/RKARA.</p><ul><li>Blueprint: ${BLUEPRINT_VERSION}</li><li>Master Prompt: ${MASTER_PROMPT_VERSION}</li><li>ODS: ${ODS_VERSION}</li><li>Regulatory Profile: ${REG_PROFILE_VERSION}</li><li>Terakhir diverifikasi: ${REG_LAST_VERIFIED}</li></ul><p>Frontend statis ini bukan autentikasi server dan tidak menggantikan ARKAS/MARKAS/e-RKAM/SAKTI atau mekanisme pengesahan resmi.</p>`);
  }

  function showRegulation() {
    showModal('Acuan Regulasi & Nomenklatur', `<h3>Kemendikdasmen</h3><ul><li><strong>Permendikdasmen 26 Tahun 2025</strong> — Standar Pengelolaan; rencana kerja tahunan menjadi dasar penyusunan rencana kegiatan dan anggaran satuan pendidikan.</li><li><strong>Permendikdasmen 8 Tahun 2026</strong> — Juknis Pengelolaan Dana BOSP 2026.</li><li><strong>ARKAS/MARKAS</strong> — konteks operasional referensi, validasi, dan pengesahan.</li></ul><h3>Kemenag</h3><ul><li><strong>Kepdirjen Pendis 944 Tahun 2026</strong> — Juknis BOP RA dan BOS Madrasah 2026.</li><li><strong>Kepdirjen Pendis 2100 Tahun 2026</strong> — perubahan atas Juknis 944/2026 sebagaimana direferensikan dalam kanal resmi Kemenag 2026.</li><li><strong>EDM/e-RKAM</strong> — konteks evaluasi dan perencanaan madrasah.</li></ul><p><strong>Nomenklatur:</strong> Kemendikdasmen = RKAS (Rencana Kegiatan dan Anggaran Satuan Pendidikan); Kemenag RA = RKARA; Kemenag madrasah = RKAM.</p><p class="subtle">Rule finansial spesifik hanya dijalankan bila scope dan sumbernya telah dimuat dalam regulatory profile. Profile terakhir diverifikasi ${REG_LAST_VERIFIED}.</p>`);
  }

  function exportDraft() {
    collectStaticFields(false); if(!hasMeaningfulData(state)){toast('Belum ada data draft untuk diekspor.');return;} const payload={...state,exportMeta:{product:'PG RKAS',exportedAt:nowIso(),schemaVersion:DRAFT_SCHEMA_VERSION,regulatoryProfileVersion:REG_PROFILE_VERSION}}; const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}); const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`PG-RKAS-draft-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }
  function importDraftFile(file) {
    const reader=new FileReader(); reader.onload=()=>{try{const obj=JSON.parse(reader.result);const schema=Number(obj?.meta?.schemaVersion??obj?.exportMeta?.schemaVersion);if(schema!==DRAFT_SCHEMA_VERSION)throw new Error('schema');if(!hasMeaningfulData(obj))throw new Error('empty');const old=loadDraft(false);if(old)try{localStorage.setItem(ARCHIVE_KEY,JSON.stringify(old));}catch(e){} state=mergeWithDefault(obj);recalculateAll();state.meta.updatedAt=nowIso();localStorage.setItem(STORAGE_KEY,JSON.stringify(state));lastSavedSnapshot=snapshotForSave(state);draftDirty=false;draftReady=true;hydrateStaticFields();renderAllRepeaters();openWorkspace(state.meta.currentStep||1);toast('Cadangan draft berhasil diimpor ✓');updateArchiveMenu();}catch(e){showModal('Impor gagal','<p>File cadangan tidak kompatibel, rusak, atau bukan draft PG RKAS yang valid. Draft aktif tidak ditimpa.</p>');}};reader.readAsText(file);
  }
  function recoverPreviousDraft() {
    try{const raw=localStorage.getItem(ARCHIVE_KEY);if(!raw){toast('Tidak ada cadangan draft sebelumnya.');return;}const obj=JSON.parse(raw);if(!obj||Number(obj?.meta?.schemaVersion)!==DRAFT_SCHEMA_VERSION)throw new Error();confirmDialog('Pulihkan draft sebelumnya?','Draft aktif akan digantikan oleh cadangan sebelumnya. Ekspor draft aktif terlebih dahulu bila masih diperlukan.',()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(obj));state=mergeWithDefault(obj);hydrateStaticFields();renderAllRepeaters();openWorkspace(state.meta.currentStep||1);draftDirty=false;lastSavedSnapshot=snapshotForSave(state);toast('Draft sebelumnya dipulihkan ✓');},'Pulihkan');}catch(e){toast('Cadangan sebelumnya tidak dapat dibaca.');}
  }
  function restartFlow() {
    confirmDialog('Mulai ulang?','Data pengisian aktif akan dihapus dari draft utama. Draft aktif disimpan sebagai Cadangan Draft Sebelumnya agar masih dapat dipulihkan melalui menu.',()=>{collectStaticFields(false);const current=hasMeaningfulData(state)?state:loadDraft(false);if(current)try{localStorage.setItem(ARCHIVE_KEY,JSON.stringify(current));}catch(e){}try{localStorage.removeItem(STORAGE_KEY);}catch(e){}state=DEFAULT_STATE();compiledPrompt='';draftDirty=false;draftReady=false;lastSavedSnapshot='';hydrateStaticFields();renderAllRepeaters();$('workspaceView').classList.add('app-hidden');$('resultView').classList.add('app-hidden');$('welcomeView').classList.remove('app-hidden');renderDraftRecovery(null);$('autosaveStatus').textContent='Belum ada draft';updateArchiveMenu();toast('Formulir dikosongkan.');},'Ya, Mulai Ulang');
  }
  function logout() { flushDraft(); $('loginPassword').value=''; $('loginMessage').className='login-message'; showLogin(); }
  function updateArchiveMenu() { let has=false;try{has=Boolean(localStorage.getItem(ARCHIVE_KEY));}catch(e){}$('recoverPreviousMenu').classList.toggle('hidden',!has); }

  function showModal(title,body,actions=[{label:'Tutup',className:'btn-secondary',action:closeModal}]) { $('modalTitle').textContent=title;$('modalBody').innerHTML=body;$('modalActions').innerHTML='';actions.forEach(a=>{const b=document.createElement('button');b.type='button';b.className=`btn ${a.className||'btn-secondary'}`;b.textContent=a.label;b.addEventListener('click',a.action);$('modalActions').appendChild(b);});$('modal').classList.remove('hidden'); }
  function closeModal() { $('modal').classList.add('hidden'); }
  function confirmDialog(title,text,yes,yesLabel='Lanjutkan') { showModal(title,`<p>${esc(text)}</p>`,[{label:'Batal',className:'btn-secondary',action:closeModal},{label:yesLabel,className:'btn-danger',action:()=>{closeModal();yes();}}]); }
  function toast(msg) { $('toast').textContent=msg;$('toast').classList.remove('hidden');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.add('hidden'),2600); }
  function formatDraftTime(iso) { if(!iso)return 'pada waktu yang tidak tercatat';try{return new Intl.DateTimeFormat('id-ID',{dateStyle:'medium',timeStyle:'short'}).format(new Date(iso));}catch(e){return iso;} }
  function cssEsc(v) { return String(v).replace(/[^a-zA-Z0-9_-]/g,'\\$&'); }

  window.PGRKAS = Object.freeze({
    version:APP_VERSION,
    getState:()=>JSON.parse(JSON.stringify(state)),
    compile:()=>compilePrompt(),
    validate:()=>validate(),
    completeness:()=>computeCompleteness(),
    planningReadiness:()=>planningReadiness(),
    budgetReadiness:()=>budgetReadiness(),
    regulatoryChecks:()=>regulatoryChecks()
  });

  document.addEventListener('DOMContentLoaded', init);
})();
