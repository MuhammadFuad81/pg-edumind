(function () {
  'use strict';

  var APP_CODE = 'modul_ajar_bahasa_arab_290826';
  var SESSION_KEY = 'akds_session_' + APP_CODE;
  var STORAGE_KEY = 'akds_form_' + APP_CODE;
  var USERNAME = 'edumind';
  var PASSWORD = 'akds-290826';
  var AUTO_PLACEHOLDER = 'Diisi otomatis oleh AI berdasarkan konteks utama yang Anda isi.';
  var AUTO_FIELD_IDS = ['tp','pemahaman','pemantik','lintas','topik_pembelajaran','kegiatan_awal','kegiatan_inti','penutup','formatif','sumatif','refleksi_guru','refleksi_siswa','pengayaan','remidial'];

  var css = `
  *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#0f172a;color:#0f172a;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-user-select:none;user-select:none}
  input,textarea,select,button,.selectable{-webkit-user-select:text;user-select:text;font:inherit}.hidden{display:none!important}
  .login{min-height:100vh;display:grid;place-items:center;padding:24px}.login-card{width:min(405px,100%);background:#fff;border-radius:18px;padding:30px;box-shadow:0 24px 70px #02061780}
  .logo{height:58px;max-width:220px;object-fit:contain;display:block;margin:0 auto 12px}.eyebrow{text-align:center;color:#1d4ed8;font-size:12px;font-weight:700}.login h1{text-align:center;font-size:23px;margin:4px 0}.sub{text-align:center;color:#1d4ed8;font-size:12px;margin:0 0 24px}
  .field{margin:0 0 13px}.field label,.label{display:block;font-size:11px;font-weight:800;letter-spacing:.045em;text-transform:uppercase;color:#334155;margin-bottom:5px}.req{color:#dc2626}.hint{display:block;color:#64748b;font-size:11px;line-height:1.45;margin-top:5px}
  .control{width:100%;border:1px solid #cbd5e1;border-radius:9px;padding:10px 11px;background:#f8fafc;color:#0f172a;outline:none;transition:.15s}.other-field{margin-top:8px}.control:focus{border-color:#1e40af;box-shadow:0 0 0 3px #dbeafe}.control[readonly]{background:#e2e8f0;color:#475569;cursor:not-allowed}.textarea{resize:vertical;min-height:72px;line-height:1.5}.cp{min-height:150px;background:#fff!important;border:2px solid #f59e0b}.invalid{border-color:#dc2626!important;box-shadow:0 0 0 3px #fee2e2!important}
  .input-icon{position:relative}.input-icon>i{position:absolute;left:12px;top:13px;color:#94a3b8}.input-icon .control{padding-left:36px}.eye{position:absolute;right:4px;top:3px;width:38px;height:36px;border:0;background:transparent;color:#64748b;cursor:pointer}
  .primary,.secondary,.danger,.smallbtn{border:0;border-radius:10px;font-weight:800;cursor:pointer;transition:.15s}.primary{background:#1e3a8a;color:#fff;padding:11px 15px}.primary:hover{background:#1e40af}.secondary{background:#e2e8f0;color:#334155;padding:10px 14px}.secondary:hover{background:#cbd5e1}.danger{background:#fff1f2;color:#be123c;padding:10px 14px}.smallbtn{background:#059669;color:white;padding:7px 11px;font-size:12px}.full{width:100%}
  .error{color:#b91c1c;background:#fef2f2;border:1px solid #fecaca;border-radius:9px;padding:9px 11px;font-size:12px;font-weight:700;margin-bottom:12px}.foot{border-top:1px solid #e2e8f0;margin-top:20px;padding-top:15px;text-align:center;color:#94a3b8;font-size:10px;line-height:1.6}
  .app{min-height:100vh;background:#f1f5f9}.topbar{height:72px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:20;box-shadow:0 2px 12px #0f172a0a}.brand{display:flex;gap:12px;align-items:center}.brand-icon{width:42px;height:42px;border-radius:12px;background:#1e3a8a;color:#fff;display:grid;place-items:center}.brand h2{font-size:17px;margin:0}.brand p{font-size:11px;color:#64748b;margin:2px 0 0}
  .layout{max-width:1480px;margin:auto;padding:22px;display:grid;grid-template-columns:minmax(430px,5fr) minmax(500px,7fr);gap:20px}.card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;box-shadow:0 4px 16px #0f172a0a;overflow:hidden}.cardhead{background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:13px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px}.cardhead h3{font-size:13px;margin:0;display:flex;gap:8px;align-items:center}.form-scroll{padding:16px;max-height:calc(100vh - 120px);overflow:auto}.section-title{font-size:11px;color:#1e3a8a;font-weight:900;text-transform:uppercase;letter-spacing:.06em;border-top:1px solid #e2e8f0;padding-top:12px;margin:18px 0 12px}.section-title:first-child{border-top:0;margin-top:0;padding-top:0}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.checks{display:grid;grid-template-columns:1fr 1fr;gap:7px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;padding:10px;font-size:12px}.checks label{display:flex;align-items:flex-start;gap:7px}.checks.single{grid-template-columns:1fr}.notice{background:#fffbeb;border:1px solid #fde68a;color:#92400e;border-radius:10px;padding:10px;font-size:11px;line-height:1.5;margin:8px 0 13px}
  .actions{display:flex;gap:9px;flex-wrap:wrap;position:sticky;bottom:-16px;background:#fff;border-top:1px solid #e2e8f0;margin:18px -16px -16px;padding:13px 16px}.actions .primary{flex:2}.actions .secondary,.actions .danger{flex:1}
  .output-col{display:flex;flex-direction:column;gap:14px;min-width:0}.output-card{display:flex;flex-direction:column;height:calc(100vh - 120px)}.output-actions{display:flex;gap:8px}.output{margin:0;padding:18px;background:#020617;color:#cbd5e1;white-space:pre-wrap;overflow:auto;flex:1;font:12px/1.55 ui-monospace,SFMono-Regular,Consolas,monospace;-webkit-user-select:text;user-select:text}.usage{padding:13px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;color:#1e3a8a;font-size:12px;line-height:1.55}.status{font-size:11px;color:#047857;font-weight:800;min-height:16px;margin:7px 0 0}
  @media(max-width:980px){.layout{grid-template-columns:1fr}.form-scroll{max-height:none}.output-card{height:72vh}.topbar{position:relative}.grid3{grid-template-columns:1fr}.layout{padding:12px}.output-col{min-width:0}}
  @media(max-width:560px){.grid2,.checks{grid-template-columns:1fr}.topbar{padding:0 14px}.brand h2{font-size:14px}.layout{padding:8px}.form-scroll{padding:13px}.actions{margin-left:-13px;margin-right:-13px}.output-actions{flex-wrap:wrap}}
  `;

  var html = `
  <div id="loginScreen" class="login">
    <div class="login-card">
      <img class="logo" src="https://growva.biz.id/gambarbebas/20260621-082723_Logo%20Edumind%20Academy%20-%20Terbaru2026%20[putih].png" alt="Logo Edumind Academy">
      <div class="eyebrow">Prompt Generator</div><h1>Modul Ajar Bahasa Arab</h1><p class="sub">Asisten Kerja Digital Sekolah V1</p>
      <form id="loginForm">
        <div class="field"><label>UserID / Username</label><div class="input-icon"><i class="fa-solid fa-user"></i><input id="username" class="control" autocomplete="username" required value="edumind"></div></div>
        <div class="field"><label>Password</label><div class="input-icon"><i class="fa-solid fa-lock"></i><input id="password" type="password" class="control" autocomplete="current-password" required><button id="togglePassword" class="eye" type="button" aria-label="Tampilkan password" aria-pressed="false"><i class="fa-solid fa-eye"></i></button></div></div>
        <div id="loginError" class="error hidden"><i class="fa-solid fa-circle-exclamation"></i> UserID atau Password salah.</div>
        <button class="primary full" type="submit"><i class="fa-solid fa-right-to-bracket"></i> Masuk Sistem</button>
      </form>
      <div class="foot">© 2026 Edumind Academy. Seluruh hak kekayaan intelektual dilindungi.<br>Gunakan aplikasi secara sah dan amanah.<br>0813-8584-1500 — WhatsApp resmi Edumind Academy</div>
    </div>
  </div>

  <div id="appScreen" class="app hidden">
    <header class="topbar"><div class="brand"><div class="brand-icon"><i class="fa-solid fa-language"></i></div><div><h2>Modul Ajar Bahasa Arab</h2><p>Urutan formulir mengikuti Template Modul Ajar</p></div></div><button id="logoutBtn" class="danger" type="button"><i class="fa-solid fa-right-from-bracket"></i> Keluar</button></header>
    <main class="layout">
      <section class="card"><div class="cardhead"><h3><i class="fa-solid fa-list-check"></i> Form Parameter Modul Ajar</h3><button id="exampleBtn" class="smallbtn" type="button"><i class="fa-solid fa-flask"></i> Muat Contoh</button></div>
        <form id="generatorForm" class="form-scroll" novalidate>
          <div class="section-title">1. Identitas Penyusun</div>
          <div class="field"><label>Nama Penyusun <span class="req">*</span></label><input id="nama_penyusun" class="control" required></div>
          <div class="field"><label>Guru Kelas / Guru Mapel <span class="req">*</span></label><input id="guru_kelas" class="control" required></div>
          <div class="field"><label>Institusi <span class="req">*</span></label><input id="institusi" class="control" required></div>

          <div class="section-title">2. Informasi Umum</div>
          <div class="field"><label>Mata Pelajaran</label><input class="control" value="Bahasa Arab" readonly></div>
          <div class="grid2"><div class="field"><label>Tahun Ajaran <span class="req">*</span></label><input id="tahun_ajaran" class="control" required></div><div class="field"><label>Alokasi Waktu <span class="req">*</span></label><input id="alokasi" class="control" required></div></div>
          <div class="grid2"><div class="field"><label>Jenjang Pendidikan <span class="req">*</span></label><select id="jenjang" class="control" required><option value="SD/MI">SD/MI</option><option value="SMP/MTs" selected>SMP/MTs</option><option value="SMA/MA/SMK">SMA/MA/SMK</option></select></div><div class="field"><label>Fase / Kelas <span class="req">*</span></label><select id="fase_kelas" class="control" required></select></div></div>
          <div class="field"><label>Lingkup Materi / Semester <span class="req">*</span></label><input id="lingkup" class="control" required></div>

          <div class="section-title">3. Identifikasi</div>
          <div class="grid2"><div class="field"><label>Target Peserta Didik <span class="req">*</span></label><select id="target" class="control"><option>Peserta Didik Reguler/Tipikal</option><option>Peserta Didik dengan Pencapaian Tinggi</option><option>Peserta Didik dengan Kesulitan Belajar</option><option>Peserta Didik CIBI</option></select><span class="hint"><b>CIBI</b> = Cerdas Istimewa dan/atau Berbakat Istimewa, yaitu peserta didik dengan kemampuan atau bakat menonjol yang memerlukan layanan belajar sesuai kebutuhannya.</span></div><div class="field"><label>Jumlah Peserta Didik <span class="req">*</span></label><input id="jumlah" class="control" required></div></div>
          <div class="field"><label>Kompetensi Awal (poin a, b, c) <span class="req">*</span></label><textarea id="kompetensi_awal" class="control textarea" required></textarea></div>
          <div class="field"><span class="label">Dimensi Profil Lulusan</span><div class="checks">
            <label><input type="checkbox" name="profil" value="Keimanan dan Ketakwaan terhadap Tuhan YME" checked>Keimanan dan Ketakwaan terhadap Tuhan YME</label><label><input type="checkbox" name="profil" value="Kewargaan">Kewargaan</label><label><input type="checkbox" name="profil" value="Penalaran Kritis" checked>Penalaran Kritis</label><label><input type="checkbox" name="profil" value="Kreativitas">Kreativitas</label><label><input type="checkbox" name="profil" value="Kolaborasi" checked>Kolaborasi</label><label><input type="checkbox" name="profil" value="Kemandirian" checked>Kemandirian</label><label><input type="checkbox" name="profil" value="Kesehatan">Kesehatan</label><label><input type="checkbox" name="profil" value="Komunikasi" checked>Komunikasi</label>
          </div></div>

          <div class="section-title">4. Komponen Inti</div>
          <div class="notice"><strong>CP Bahasa Arab tidak diisi otomatis.</strong> Salin CP resmi yang digunakan sekolah beserta elemen/ruang lingkupnya. Teks CP akan dikutip apa adanya dan tidak boleh diubah oleh AI.</div>
          <div class="field"><label>Elemen / Ruang Lingkup CP <span class="req">*</span></label><textarea id="elemen_cp" class="control textarea cp" required placeholder="Contoh format: Elemen 1 — ...&#10;Elemen 2 — ... (isi sesuai dokumen CP yang digunakan sekolah)"></textarea></div>
          <div class="field"><label>Capaian Pembelajaran (diisi guru) <span class="req">*</span></label><textarea id="cp" class="control textarea cp" required placeholder="Tempel teks Capaian Pembelajaran Bahasa Arab di sini. Kolom sengaja dikosongkan."></textarea><span class="hint">Jangan mengisi dengan ringkasan. Gunakan redaksi CP resmi sekolah/madrasah.</span></div>

          <div class="section-title">5. Desain Pembelajaran</div>
          <div class="field"><label>Tujuan Pembelajaran (poin a, b, c) <span class="req">*</span></label><textarea id="tp" class="control textarea" required></textarea></div>
          <div class="field"><label>Pemahaman Bermakna <span class="req">*</span></label><textarea id="pemahaman" class="control textarea" required></textarea></div>
          <div class="field"><label>Pertanyaan Pemantik (poin a, b, c) <span class="req">*</span></label><textarea id="pemantik" class="control textarea" required></textarea></div>
          <div class="grid2"><div class="field"><label>Lintas Disiplin Ilmu</label><input id="lintas" class="control"></div><div class="field"><label>Topik Pembelajaran <span class="req">*</span></label><input id="topik_pembelajaran" class="control" required></div></div>
          <div class="field"><label>Pendekatan Pembelajaran <span class="req">*</span></label><select id="pendekatan" class="control" required><option selected>Pembelajaran Mendalam (Deep Learning), Berdiferensiasi</option><option>Pembelajaran Mendalam (Deep Learning)</option><option>Pembelajaran Berdiferensiasi</option><option>Komunikatif (Communicative Language Teaching)</option><option>Kontekstual (Contextual Teaching and Learning/CTL)</option><option>TaRL (Teaching at the Right Level)</option><option value="Lainnya">Lainnya</option></select><input id="pendekatan_lain" class="control other-field hidden" placeholder="Tuliskan pendekatan pembelajaran lainnya"></div>
          <div class="field"><label>Model Pembelajaran <span class="req">*</span></label><select id="model" class="control" required><option selected>Problem Based Learning (PBL)</option><option>Project Based Learning (PjBL)</option><option>Cooperative Learning</option><option>Discovery Learning</option><option>Inquiry Learning</option><option>Direct Instruction</option><option>Task-Based Language Teaching</option><option value="Lainnya">Lainnya</option></select><input id="model_lain" class="control other-field hidden" placeholder="Tuliskan model pembelajaran lainnya"></div>
          <div class="field"><span class="label">Metode Pembelajaran <span class="req">*</span></span><div class="checks">
            <label><input type="checkbox" name="metode" value="Ceramah Interaktif" checked>Ceramah Interaktif</label><label><input type="checkbox" name="metode" value="Tanya Jawab" checked>Tanya Jawab</label>
            <label><input type="checkbox" name="metode" value="Diskusi" checked>Diskusi</label><label><input type="checkbox" name="metode" value="Membaca &amp; Menelaah" checked>Membaca &amp; Menelaah</label>
            <label><input type="checkbox" name="metode" value="Demonstrasi &amp; Praktik" checked>Demonstrasi &amp; Praktik</label><label><input type="checkbox" name="metode" value="Hafalan Bermakna">Hafalan Bermakna</label>
            <label><input type="checkbox" name="metode" value="Kisah &amp; Keteladanan">Kisah &amp; Keteladanan</label><label><input type="checkbox" name="metode" value="Bermain Peran">Bermain Peran</label>
            <label><input type="checkbox" name="metode" value="Penugasan">Penugasan</label><label><input type="checkbox" name="metode" value="Proyek">Proyek</label>
            <label><input id="metode_lain_cb" type="checkbox" name="metode" value="Lainnya">Lainnya</label>
          </div><input id="metode_lain" class="control other-field hidden" placeholder="Tuliskan metode pembelajaran lainnya"><span class="hint">Pilih satu atau beberapa metode yang akan digunakan. Pilih “Lainnya” bila metode yang dibutuhkan belum tersedia.</span></div>
          <div class="field"><span class="label">Kemitraan Pembelajaran</span><div class="checks single">
            <label><input type="checkbox" name="kemitraan" value="Lingkungan sekolah (guru &amp; warga sekolah)" checked>Lingkungan sekolah (guru &amp; warga sekolah)</label>
            <label><input type="checkbox" name="kemitraan" value="Lingkungan luar sekolah (Orang Tua)" checked>Lingkungan luar sekolah (Orang Tua)</label>
            <label><input type="checkbox" name="kemitraan" value="Komunitas/masyarakat sekitar">Komunitas/masyarakat sekitar</label>
          </div></div>
          <div class="field"><label>Media &amp; Sumber Belajar (Sarana Prasarana) <span class="req">*</span></label><textarea id="media_sumber" class="control textarea" required placeholder="Contoh: Buku teks Bahasa Arab, kartu kosakata, audio pelafalan, papan tulis, proyektor, LKPD, dan kamus Arab–Indonesia."></textarea></div>
          <div class="field"><label>Tautan Bahan Ajar Digital (TPACK, Opsional)</label><input id="tautan_bahan" class="control" type="url" placeholder="Contoh: link PPT/Canva bahan ajar"></div>
          <div class="field"><label>Tautan Video Pembelajaran (TPACK, Opsional)</label><input id="tautan_video" class="control" type="url" placeholder="Contoh: link video YouTube"><span class="hint"><b>TPACK</b> = <i>Technological Pedagogical Content Knowledge</i>, yaitu kerangka untuk memadukan teknologi, strategi pembelajaran, dan materi secara tepat dalam proses belajar.</span></div>

          <div class="section-title">6. Pengalaman Belajar</div>
          <div class="grid2"><div class="field"><label>Durasi Kegiatan Awal</label><input id="durasi_awal" class="control"></div><div class="field"><label>Durasi Kegiatan Inti</label><input id="durasi_inti" class="control"></div></div>
          <div class="field"><label>Kegiatan Awal: Orientasi, Apersepsi, Motivasi <span class="req">*</span></label><textarea id="kegiatan_awal" class="control textarea" required></textarea></div>
          <div class="field"><label>Kegiatan Inti sesuai Sintaks Model <span class="req">*</span></label><textarea id="kegiatan_inti" class="control textarea" required></textarea></div>
          <div class="field"><label>Penutup <span class="req">*</span></label><textarea id="penutup" class="control textarea" required></textarea></div>

          <div class="section-title">7. Asesmen</div>
          <div class="field"><label>Asesmen Formatif <span class="req">*</span></label><textarea id="formatif" class="control textarea" required></textarea><span class="hint">Tabel wajib: Sikap, Pengetahuan, Keterampilan × Teknik, Instrumen, Rubrik, Keterangan.</span></div>
          <div class="field"><label>Asesmen Sumatif <span class="req">*</span></label><textarea id="sumatif" class="control textarea" required></textarea><span class="hint">Tabel wajib: Pengetahuan, Keterampilan × Teknik, Instrumen, Rubrik, Keterangan.</span></div>

          <div class="section-title">8. Refleksi</div>
          <div class="field"><label>Refleksi untuk Guru (3 butir) <span class="req">*</span></label><textarea id="refleksi_guru" class="control textarea" required></textarea></div>
          <div class="field"><label>Refleksi untuk Peserta Didik (3 butir) <span class="req">*</span></label><textarea id="refleksi_siswa" class="control textarea" required></textarea></div>

          <div class="section-title">9. Pengayaan dan Remidial</div>
          <div class="field"><label>Pengayaan (3 butir) <span class="req">*</span></label><textarea id="pengayaan" class="control textarea" required></textarea></div>
          <div class="field"><label>Remidial (3 butir) <span class="req">*</span></label><textarea id="remidial" class="control textarea" required></textarea></div>

          <div class="section-title">10. Lampiran Pendukung</div>
          <div class="field"><div class="checks"><label><input type="checkbox" name="lampiran" value="Bahan Ajar" checked>Bahan Ajar</label><label><input type="checkbox" name="lampiran" value="Lembar Kerja Peserta Didik (LKPD)" checked>LKPD</label><label><input type="checkbox" name="lampiran" value="Rubrik Penilaian" checked>Rubrik Penilaian</label><label><input id="lampiran_lain_cb" type="checkbox" name="lampiran" value="Lainnya">Lainnya</label></div><input id="lampiran_lain" class="control other-field hidden" placeholder="Tuliskan lampiran pendukung lainnya"></div>

          <div class="section-title">11. Daftar Pustaka</div>
          <div class="field"><label>Sumber Rujukan <span class="req">*</span></label><textarea id="pustaka" class="control textarea" required></textarea></div>

          <div class="section-title">12. Pengesahan</div>
          <div class="field"><label>Kota, Tanggal</label><input id="kota_tanggal" class="control"></div>
          <div class="grid2"><div class="field"><label>Nama Kepala Sekolah <span class="req">*</span></label><input id="kepala" class="control" required></div><div class="field"><label>NIP Kepala Sekolah</label><input id="nip_kepala" class="control"></div></div>
          <div class="grid2"><div class="field"><label>Nama Guru</label><input id="nama_guru" class="control" readonly aria-readonly="true" title="Terisi otomatis dari Nama Penyusun"><span class="hint">Terisi otomatis mengikuti “Nama Penyusun” pada bagian Identitas Penyusun.</span></div><div class="field"><label>NIP Guru</label><input id="nip_penyusun" class="control"></div></div>

          <div class="section-title">13. Format Output dari AI</div>
          <div class="field"><label>Format Output dari AI <span class="req">*</span></label><select id="format_output" class="control"><option value="docx" selected>File Word (.docx) siap diunduh</option><option value="chat">Teks langsung di percakapan AI</option></select><span class="hint">Untuk hasil paling presisi, lampirkan juga <b>Template Modul Ajar - Acuan.docx</b> saat menempel prompt ke AI. Bagian sampul/cover diabaikan.</span></div>
          <div class="field"><label>Instruksi Tambahan</label><textarea id="tambahan" class="control textarea"></textarea></div>
          <div id="formStatus" class="status"></div>
          <div class="actions"><button id="resetBtn" class="danger" type="button"><i class="fa-solid fa-rotate-left"></i> Reset</button><button id="generateBtn" class="primary" type="submit"><i class="fa-solid fa-wand-magic-sparkles"></i> Hasilkan Prompt</button></div>
        </form>
      </section>

      <section class="output-col"><div class="card output-card"><div class="cardhead"><h3><i class="fa-solid fa-terminal" style="color:#059669"></i> AI Prompt Ready</h3><div class="output-actions"><button id="copyBtn" class="smallbtn" type="button"><i class="fa-solid fa-copy"></i> Salin</button><button id="downloadBtn" class="secondary" type="button"><i class="fa-solid fa-download"></i> Unduh .txt</button></div></div><pre id="output" class="output selectable">Isi formulir di sebelah kiri. Kolom CP sengaja kosong dan wajib diisi guru. Setelah itu klik “Hasilkan Prompt”.</pre></div>
        <div class="usage"><b>Cara menggunakan:</b> salin prompt, lampirkan <i>Template Modul Ajar - Acuan.docx</i> dan materi ajar pada ChatGPT/Gemini/Claude, lalu kirim. Acuan dimulai dari Identitas Penyusun; sampul diabaikan. Pilihan default meminta AI mengembalikan file Word (.docx) siap diunduh—bukan hanya teks.</div>
      </section>
    </main>
  </div>`;

  document.head.insertAdjacentHTML('beforeend', '<style>' + css + '</style>');
  document.body.innerHTML = html;

  var $ = function (id) { return document.getElementById(id); };
  var classesByLevel = {
    'SD/MI': ['Fase A Kelas 1', 'Fase A Kelas 2', 'Fase B Kelas 3', 'Fase B Kelas 4', 'Fase C Kelas 5', 'Fase C Kelas 6'],
    'SMP/MTs': ['Fase D Kelas 7', 'Fase D Kelas 8', 'Fase D Kelas 9'],
    'SMA/MA/SMK': ['Fase E Kelas 10', 'Fase F Kelas 11', 'Fase F Kelas 12']
  };

  var example = {
    pendekatan:'Pembelajaran Mendalam (Deep Learning), Berdiferensiasi', pendekatan_lain:'', model:'Problem Based Learning (PBL)', model_lain:'', metode_lain:'', lampiran_lain:'',
    nama_penyusun:'Ahmad Fauzi, S.Pd.', guru_kelas:'Guru Bahasa Arab Kelas VII', institusi:'MTs Edumind Bekasi', tahun_ajaran:'2026/2027', alokasi:'2 JP (2 × 40 menit)', jenjang:'SMP/MTs', lingkup:'التَّعَارُفُ / Semester I', target:'Peserta Didik Reguler/Tipikal', jumlah:'30 peserta didik',
    kompetensi_awal:'a. Peserta didik mengenali huruf dan harakat Arab.\nb. Peserta didik mampu melafalkan kosakata sederhana.\nc. Peserta didik pernah menggunakan ungkapan salam sederhana.',
    media_sumber:'Buku teks Bahasa Arab yang digunakan sekolah; kartu kosakata; audio pelafalan; papan tulis dan spidol; proyektor; LKPD; kamus Arab–Indonesia.',
    tautan_bahan:'', tautan_video:'',
    metode:['Ceramah Interaktif','Tanya Jawab','Diskusi','Membaca & Menelaah','Demonstrasi & Praktik'],
    kemitraan:['Lingkungan sekolah (guru & warga sekolah)','Lingkungan luar sekolah (Orang Tua)'],
    profil:['Keimanan dan Ketakwaan terhadap Tuhan YME','Penalaran Kritis','Kolaborasi','Kemandirian','Komunikasi'],
    lampiran:['Bahan Ajar','Lembar Kerja Peserta Didik (LKPD)','Rubrik Penilaian'],
    elemen_cp:'', cp:'',
    tp:'a. Peserta didik mampu mengidentifikasi makna kosakata tentang identitas diri secara tepat.\nb. Peserta didik mampu melafalkan ungkapan perkenalan dengan makhraj dan intonasi yang dapat dipahami.\nc. Peserta didik mampu melakukan dialog perkenalan sederhana secara santun.',
    pemahaman:'Bahasa Arab dapat digunakan untuk berkomunikasi, memperkenalkan identitas diri, serta membangun sikap percaya diri dan saling menghargai.',
    pemantik:'a. Bagaimana cara mengucapkan salam dan memperkenalkan nama dalam Bahasa Arab?\nb. Informasi apa saja yang biasanya disampaikan saat berkenalan?\nc. Mengapa pelafalan yang jelas penting dalam percakapan?',
    lintas:'Pendidikan Pancasila dan Informatika', topik_pembelajaran:'Dialog perkenalan (الحوار في التعارف)',
    durasi_awal:'10 menit', durasi_inti:'60 menit', kegiatan_awal:'Orientasi: salam, doa, pemeriksaan kesiapan, dan kesepakatan belajar. Apersepsi: menghubungkan pengalaman berkenalan. Motivasi: menjelaskan manfaat mampu memperkenalkan diri dalam Bahasa Arab.',
    kegiatan_inti:'Gunakan tahapan Cooperative Learning: pemodelan ungkapan, latihan terbimbing, kerja pasangan, pertukaran peran, presentasi dialog, umpan balik pelafalan, dan perbaikan.', penutup:'Simpulan bersama, refleksi singkat, umpan balik, tindak lanjut latihan, doa, dan salam.',
    formatif:'Sikap: observasi kesantunan dan kerja sama. Pengetahuan: kuis makna kosakata. Keterampilan: unjuk kerja dialog dengan rubrik pelafalan, ketepatan ungkapan, kelancaran, dan kepercayaan diri.', sumatif:'Pengetahuan: tes pemahaman kosakata/ungkapan. Keterampilan: dialog perkenalan berpasangan menggunakan rubrik analitik.',
    refleksi_guru:'1. Apakah pemodelan membantu peserta didik memahami ungkapan?\n2. Bagian pelafalan mana yang masih memerlukan penguatan?\n3. Tindak lanjut apa yang diperlukan pada pertemuan berikutnya?', refleksi_siswa:'1. Ungkapan apa yang sudah saya kuasai?\n2. Bagian mana yang masih sulit saya lafalkan?\n3. Bagaimana saya akan berlatih lagi?',
    pengayaan:'1. Menambah informasi identitas dalam dialog.\n2. Membuat rekaman dialog kreatif.\n3. Menjadi mitra latihan bagi teman.', remidial:'1. Mengulang kosakata dengan kartu gambar.\n2. Menirukan audio secara bertahap.\n3. Melakukan dialog berpola dengan pendampingan guru.',
    pustaka:'Buku teks Bahasa Arab yang digunakan satuan pendidikan; kamus Arab–Indonesia; materi/audio guru. Lengkapi identitas bibliografi sesuai sumber nyata yang dipakai.', kota_tanggal:'Bekasi, 29 Agustus 2026', kepala:'Kepala Sekolah, S.Pd.', nip_kepala:'', nip_penyusun:'', format_output:'docx', tambahan:'Gunakan Bahasa Indonesia baku untuk penjelasan. Teks Arab harus Unicode, benar arah kanan-ke-kiri (RTL), dan diberi harakat hanya saat diperlukan untuk tujuan pembelajaran.'
  };

  function setOptions(preferred) {
    var list = classesByLevel[$('jenjang').value] || [];
    $('fase_kelas').innerHTML = list.map(function (x) { return '<option value="' + x + '">' + x + '</option>'; }).join('');
    if (preferred && list.indexOf(preferred) >= 0) $('fase_kelas').value = preferred;
    updateDerived();
  }
  function updateDerived() {
    var cls = ($('fase_kelas').value.match(/Kelas\s+(\d+)/) || [,''])[1];
    if (cls && (!$('guru_kelas').value || /^Guru Bahasa Arab Kelas/.test($('guru_kelas').value))) $('guru_kelas').value = 'Guru Bahasa Arab Kelas ' + cls;
    syncTeacherName();
  }
  function syncTeacherName() {
    if ($('nama_guru')) $('nama_guru').value = value('nama_penyusun');
  }
  function toggleOtherSelect(selectId, inputId) {
    var show = value(selectId) === 'Lainnya';
    $(inputId).classList.toggle('hidden', !show);
    $(inputId).required = show;
    if (!show) $(inputId).classList.remove('invalid');
  }
  function toggleOtherCheck(checkId, inputId) {
    var show = $(checkId).checked;
    $(inputId).classList.toggle('hidden', !show);
    $(inputId).required = show;
    if (!show) $(inputId).classList.remove('invalid');
  }
  function refreshConditionalFields() {
    toggleOtherSelect('pendekatan','pendekatan_lain');
    toggleOtherSelect('model','model_lain');
    toggleOtherCheck('metode_lain_cb','metode_lain');
    toggleOtherCheck('lampiran_lain_cb','lampiran_lain');
    syncTeacherName();
  }
  function effectiveChoice(selectId, otherId) {
    return value(selectId) === 'Lainnya' ? value(otherId) : value(selectId);
  }
  function selectedWithOther(name, otherId) {
    var values = selected(name);
    return values.map(function(x){ return x === 'Lainnya' ? value(otherId) : x; }).filter(Boolean);
  }
  function configureAutomaticFields() {
    AUTO_FIELD_IDS.forEach(function (id) {
      var field = $(id);
      if (!field) return;
      field.value = AUTO_PLACEHOLDER;
      field.readOnly = true;
      field.setAttribute('aria-readonly', 'true');
      field.setAttribute('title', 'Bagian ini akan disusun otomatis oleh AI dari CP dan konteks utama.');
    });
  }
  function setCheckedGroup(name, values) {
    if (!Array.isArray(values)) return;
    document.querySelectorAll('input[name="' + name + '"]').forEach(function (cb) { cb.checked = values.indexOf(cb.value) >= 0; });
  }
  function setValues(data, keepCPEmpty) {
    Object.keys(data).forEach(function (id) { if ($(id) && !Array.isArray(data[id])) $(id).value = data[id]; });
    setOptions(data.fase_kelas || (data.jenjang === 'SMP/MTs' ? 'Fase D Kelas 7' : null));
    if (data.fase_kelas) $('fase_kelas').value = data.fase_kelas;
    ['profil','lampiran','metode','kemitraan'].forEach(function(name){ if (data[name]) setCheckedGroup(name, data[name]); });
    if (keepCPEmpty) { $('elemen_cp').value = ''; $('cp').value = ''; }
    updateDerived();
    configureAutomaticFields();
    refreshConditionalFields();
  }
  function selected(name) { return Array.from(document.querySelectorAll('input[name="' + name + '"]:checked')).map(function (x) { return x.value; }); }
  function value(id) { return ($(id).value || '').trim(); }
  function escLine(x) { return x || '[Belum diisi]'; }
  function currentData() {
    var data = {};
    document.querySelectorAll('#generatorForm input[id],#generatorForm textarea[id],#generatorForm select[id]').forEach(function (el) { if (!el.readOnly || el.id === 'mapel') data[el.id] = el.value; });
    ['profil','lampiran','metode','kemitraan'].forEach(function(name){ data[name] = selected(name); });
    return data;
  }
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData())); } catch (e) {} }
  function restore() { try { var raw = localStorage.getItem(STORAGE_KEY); if (!raw) return false; var data = JSON.parse(raw); setValues(data, false); return true; } catch(e){ return false; } }
  function validateForm() {
    document.querySelectorAll('.invalid').forEach(function (el) { el.classList.remove('invalid'); });
    var missing = [];
    document.querySelectorAll('#generatorForm [required]').forEach(function (el) { if (!String(el.value || '').trim()) { el.classList.add('invalid'); missing.push(el); } });
    if (missing.length) { missing[0].scrollIntoView({behavior:'smooth',block:'center'}); missing[0].focus(); $('formStatus').textContent = 'Lengkapi semua kolom wajib, terutama Elemen CP dan Capaian Pembelajaran.'; return false; }
    if (!selected('metode').length) { $('formStatus').textContent = 'Pilih minimal satu Metode Pembelajaran.'; var firstMethod=document.querySelector('input[name="metode"]'); if(firstMethod) firstMethod.scrollIntoView({behavior:'smooth',block:'center'}); return false; }
    return true;
  }
  function generatePrompt() {
    if (!validateForm()) return;
    var profiles = selected('profil');
    var attachments = selectedWithOther('lampiran','lampiran_lain');
    var methods = selectedWithOther('metode','metode_lain');
    var partnerships = selected('kemitraan');
    var outputInstruction = $('format_output').value === 'docx'
      ? 'KELUARAN UTAMA WAJIB: buat dan lampirkan file Microsoft Word (.docx) yang utuh, siap diunduh dan dapat diedit. Berikan tautan/tombol unduh file. Jangan mengganti keluaran utama dengan teks panjang di percakapan.'
      : 'KELUARAN: tampilkan isi modul lengkap langsung di percakapan dengan struktur template yang sama.';
    var contextSummary = 'Bahasa Arab; ' + value('jenjang') + ' / ' + value('fase_kelas') + '; lingkup ' + value('lingkup') + '; CP dan elemen resmi sebagaimana dikutip di bagian Komponen Inti; target ' + value('target') + '; jumlah ' + value('jumlah') + '.';
    var lines = [
      'PERAN',
      'Bertindaklah sebagai ahli desain instruksional, ahli Kurikulum Merdeka/Pembelajaran Mendalam, guru Bahasa Arab, dan editor dokumen Microsoft Word profesional.',
      '',
      'TUGAS UTAMA',
      'Buat Modul Ajar Bahasa Arab berdasarkan data di bawah. Gunakan file “Template Modul Ajar - Acuan.docx” yang saya lampirkan sebagai OTORITAS TATA LETAK, tetapi ABAIKAN SELURUH BAGIAN SAMPUL/COVER pada halaman pertama template. Dokumen hasil harus langsung dimulai dari judul “MODUL AJAR” dan bagian “Identitas Penyusun” yang terdapat pada halaman 2 template. Buat salinan kerja—jangan mengubah file template asli—lalu isi seluruh slot tanpa mengubah urutan bagian, penomoran, bullet/checkmark, tabel, warna, margin, atau blok tanda tangan.',
      outputInstruction,
      '',
      'DATA PENGGUNA — IKUTI APA ADANYA',
      'IDENTITAS PENYUSUN',
      '- Nama Penyusun: ' + value('nama_penyusun'),
      '- Guru Kelas/Guru Mapel: ' + value('guru_kelas'),
      '- Institusi: ' + value('institusi'),
      '',
      'INFORMASI UMUM',
      '- Mata Pelajaran: Bahasa Arab',
      '- Tahun Ajaran: ' + value('tahun_ajaran'),
      '- Jenjang/Kelas: ' + value('jenjang') + ' / ' + value('fase_kelas'),
      '- Fase/Elemen: ' + value('fase_kelas') + ' / ' + value('elemen_cp'),
      '- Lingkup Materi/Semester: ' + value('lingkup'),
      '- Alokasi Waktu: ' + value('alokasi'),
      '',
      'IDENTIFIKASI',
      '- Target Peserta Didik: ' + value('target'),
      '- Jumlah Peserta Didik: ' + value('jumlah'),
      '- Kompetensi Awal (pertahankan a, b, c):\n' + value('kompetensi_awal'),
      '- Dimensi Profil Lulusan yang dicentang: ' + (profiles.length ? profiles.join('; ') : '[Tidak ada yang dipilih]'),
      '- Sarana dan Prasarana / Media & Sumber Belajar: ' + value('media_sumber'),
      '',
      'KOMPONEN INTI — TEKS CP TIDAK BOLEH DIUBAH',
      '- Elemen/Ruang Lingkup CP:\n' + value('elemen_cp'),
      '- Capaian Pembelajaran resmi yang diisi guru:\n' + value('cp'),
      'Kutip CP secara verbatim. Jangan meringkas, memparafrasekan, menambah, mengurangi, atau mengarang CP Bahasa Arab.',
      '',
      'DESAIN PEMBELAJARAN',
      '1. Capaian Pembelajaran: gunakan CP verbatim di atas.',
      '2. Tujuan Pembelajaran: susun otomatis tepat 3 butir a, b, c yang spesifik, terukur, selaras dengan CP verbatim, dan realistis untuk alokasi waktu. Konteks: ' + contextSummary,
      '3. Pemahaman Bermakna: susun otomatis 1 paragraf ringkas yang menjelaskan manfaat materi bagi komunikasi dan kehidupan peserta didik. Konteks: ' + contextSummary,
      '4. Pertanyaan Pemantik: susun otomatis tepat 3 pertanyaan a, b, c yang sesuai usia, memancing rasa ingin tahu, dan mengarah pada TP. Konteks: ' + contextSummary,
      '5. Lintas Disiplin Ilmu: tentukan otomatis keterkaitan yang benar-benar relevan; jangan memaksakan lebih dari 1–2 disiplin.',
      '6. Topik Pembelajaran: rumuskan otomatis secara ringkas dari lingkup materi, CP, dan TP.',
      '7. Praktik Pedagogis — Pendekatan: ' + effectiveChoice('pendekatan','pendekatan_lain') + '; Metode: ' + (methods.length ? methods.join(', ') : '[Belum dipilih]') + '; Model: ' + effectiveChoice('model','model_lain'),
      '8. Kemitraan Pembelajaran: ' + (partnerships.length ? partnerships.join('; ') : 'Tidak ada kemitraan khusus yang dipilih.'),
      '9. Pemanfaatan Digital (TPACK):' + (value('tautan_bahan') || value('tautan_video') ? '' : ' gunakan media digital hanya bila relevan dan tersedia; jangan mengarang tautan.') +
        (value('tautan_bahan') ? '\n- Bahan ajar digital: ' + value('tautan_bahan') : '') +
        (value('tautan_video') ? '\n- Video pembelajaran: ' + value('tautan_video') : ''),
      '',
      'PENGALAMAN BELAJAR',
      '- Kegiatan Awal (' + value('durasi_awal') + '): susun otomatis Orientasi nomor 1–3, Apersepsi 4–6, dan Motivasi 7–9 yang operasional berdasarkan ' + contextSummary,
      '- Kegiatan Inti ' + effectiveChoice('model','model_lain') + ' (' + value('durasi_inti') + '): susun otomatis langkah konkret sesuai sintaks resmi model, metode, CP, dan TP; urutan nomor harus berlanjut seperti template serta mencakup latihan reseptif/produktif Bahasa Arab yang relevan.',
      '- Penutup: susun otomatis tepat 5 langkah bernomor yang mencakup simpulan, refleksi, umpan balik, tindak lanjut, doa/salam secara proporsional.',
      '',
      'ASESMEN',
      '- Asesmen Formatif: susun otomatis isi tabel untuk Sikap, Pengetahuan, dan Keterampilan dengan kolom Teknik, Instrumen, Rubrik, Keterangan; selaraskan dengan CP/TP dan kegiatan.',
      '- Asesmen Sumatif: susun otomatis isi tabel untuk Pengetahuan dan Keterampilan dengan kolom Teknik, Instrumen, Rubrik, Keterangan; gunakan tugas yang autentik dan dapat dilaksanakan.',
      '',
      'REFLEKSI',
      '- Refleksi untuk Guru: susun otomatis tepat 3 pertanyaan bernomor yang menilai ketercapaian TP, efektivitas strategi, dan tindak lanjut.',
      '- Refleksi Untuk Peserta Didik: susun otomatis tepat 3 pertanyaan bernomor, sederhana, sesuai usia, dan terkait pengalaman belajar.',
      '',
      'PENGAYAAN DAN REMIDIAL',
      '- Pengayaan: susun otomatis tepat 3 kegiatan bertingkat bagi peserta didik yang telah mencapai TP.',
      '- Remidial: susun otomatis tepat 3 kegiatan bertahap bagi peserta didik yang belum mencapai TP; gunakan pemodelan ulang, latihan terbimbing, dan umpan balik.',
      '',
      'LAMPIRAN: ' + (attachments.length ? attachments.join('; ') : 'Bahan Ajar; Lembar Kerja Peserta Didik (LKPD); Rubrik Penilaian'),
      'DAFTAR PUSTAKA:\n' + value('pustaka'),
      'PENGESAHAN: ' + escLine(value('kota_tanggal')) + '; Kepala: ' + value('kepala') + (value('nip_kepala') ? ' — NIP. ' + value('nip_kepala') : ' — NIP. [kosong]') + '; Guru: ' + value('nama_guru') + (value('nip_penyusun') ? ' — NIP. ' + value('nip_penyusun') : ' — NIP. [kosong]'),
      '',
      'BLUEPRINT STRUKTUR TEMPLATE — WAJIB PERSIS, MULAI DARI HALAMAN 2 TEMPLATE',
      'BAGIAN SAMPUL/COVER PADA HALAMAN 1 TEMPLATE BUKAN BAGIAN STRUKTUR OUTPUT. Jangan menyalin, membuat ulang, atau menyisipkan sampul. Jangan menampilkan Pendekatan Pembelajaran, Bab, Judul Bab, atau Topik sebagai halaman pembuka.',
      'AWAL DOKUMEN (mengacu halaman 2 template) — judul “MODUL AJAR”; bar “Identitas Penyusun” berisi Nama Penyusun, Guru Kelas, Institusi; bar “Informasi Umum” berisi Mata Pelajaran, Tahun Ajaran, Jenjang/Kelas, Fase/Elemen, Lingkup Materi/Semester, Alokasi Waktu; bar “Identifikasi” berisi: 1. Karakteristik Peserta Didik (a. Target, b. Jumlah), 2. Kompetensi Awal (a–c), 3. Dimensi Profil Lulusan dengan delapan kotak centang resmi, 4. Sarana dan Prasarana (susun dari kolom Media & Sumber Belajar/Sarana Prasarana; gunakan butir a–d bila sesuai).',
      'BAGIAN BERIKUTNYA (mengacu halaman 3 template) — bar “Komponen Inti”; kalimat Fase; kalimat Fase Berdasarkan Elemen; tabel dua kolom “Elemen | Capaian Pembelajaran”. Buat satu baris per elemen yang diberikan guru. Lanjut bar “Desain Pembelajaran” dengan sembilan nomor persis: 1 CP; 2 TP (a–c); 3 Pemahaman Bermakna; 4 Pertanyaan Pemantik (a–c); 5 Lintas Disiplin Ilmu; 6 Topik Pembelajaran; 7 Praktik Pedagogis (✓ Pendekatan, ✓ Metode, ✓ Model); 8 Kemitraan Pembelajaran (checkmark); 9 Pemanfaatan Digital/TPACK (checkmark). Pendekatan Pembelajaran hanya muncul di poin 7 Praktik Pedagogis, bukan pada awal dokumen.',
      'BAGIAN PENGALAMAN BELAJAR (mengacu halaman 4 template) — bar “Pengalaman Belajar”. Kegiatan Awal diberi strip sorot kuning dan terdiri atas Orientasi nomor 1–3, Apersepsi 4–6, Motivasi 7–9. Kegiatan Inti diberi strip sorot kuning, tulis nama model dan durasi; gunakan subjudul sintaks model terpilih dan nomor langkah berlanjut secara urut. Untuk model berbeda dari contoh template, gunakan sintaks resmi model yang dipilih tanpa memaksakan judul tahap PBL.',
      'BAGIAN ASESMEN DAN REFLEKSI (mengacu halaman 5 template) — Penutup diberi strip sorot kuning, nomor 1–5. Bar “Asesmen”: tabel Formatif berkepala “Penilaian | Teknik | Instrumen | Rubrik | Keterangan” dengan baris Sikap, Pengetahuan, Keterampilan; tabel Sumatif dengan kepala sama dan baris Pengetahuan, Keterampilan. Bar “Refleksi”: Refleksi untuk Guru nomor 1–3; Refleksi Untuk Peserta Didik nomor 1–3.',
      'BAGIAN AKHIR (mengacu halaman 6 template) — bar “Pengayaan dan Remidial”: Pengayaan nomor 1–3 dan Remidial nomor 1–3; pertahankan ejaan “Remidial” sebagaimana template. Bar “Lampiran”: “Lampiran dalam Modul Ajar:” lalu cantumkan seluruh lampiran yang dipilih pengguna; bila pengguna memilih Lainnya, tambahkan nama lampiran yang diisikan pengguna. Bar “Daftar Pustaka”. Teks “Menyetujui,” dan blok tanda tangan dua kolom yang seimbang: kiri Nama Kepala Sekolah + NIP Kepala Sekolah; kanan Nama Guru + NIP Guru.',
      '',
      'ATURAN FIDELITAS WORD',
      '1. A4 potret; margin kiri/kanan ±2,0 cm dan atas/bawah ±1,7 cm. Karena sampul diabaikan, target awal sekitar lima halaman isi (mengacu halaman 2–6 template). Jika isi riil memerlukan halaman tambahan, lanjutkan secara wajar—jangan mengecilkan teks hingga sulit dibaca.',
      '2. Pertahankan bar judul abu-abu gelap dengan teks putih tebal, sel isi abu-abu muda, garis tabel tipis hitam, serta strip sorot kuning pada tahap kegiatan.',
      '3. Jangan menambah, menghapus, menggabungkan, atau menukar urutan bagian. Pertahankan reset/kelanjutan nomor persis sesuai blueprint.',
      '4. Bahasa Indonesia harus baku dan operasional. Teks Bahasa Arab wajib Unicode, benar secara tata bahasa/kosakata, dan memakai arah kanan-ke-kiri (RTL) hanya pada teks/sel Arab. Label Indonesia tetap kiri-ke-kanan. Gunakan font Arab yang tersedia dan terbaca (mis. Traditional Arabic/Amiri/Noto Naskh Arabic) tanpa merusak tata letak template.',
      '5. Jangan mengarang ayat, hadis, sumber, data sekolah, NIP, tautan, atau CP. Tautan bahan ajar/video hanya boleh digunakan jika diberikan pengguna. Bila data tidak tersedia, gunakan penanda [Belum diisi] secara terbatas dan jangan membuat fakta baru.',
      '6. Isi setiap lampiran terpilih secara nyata dan siap pakai, bukan hanya mencantumkan judulnya. Rubrik harus konsisten dengan asesmen.',
      '7. Lakukan pemeriksaan akhir: semua bagian ada, CP verbatim, tabel tidak pecah secara buruk, tidak ada teks terpotong/bertumpuk, nomor dan bullet benar, serta dokumen dapat dibuka di Microsoft Word.',
      '',
      value('tambahan') ? 'INSTRUKSI TAMBAHAN PENGGUNA (PRIORITAS TERTINGGI SELAMA TIDAK MENGUBAH STRUKTUR TEMPLATE):\n' + value('tambahan') : '',
      '',
      'Mulai bekerja sekarang. Jangan meminta konfirmasi ulang kecuali file Template Modul Ajar - Acuan.docx belum terlampir dan tata letak tidak dapat direkonstruksi dari blueprint ini.'
    ];
    $('output').textContent = lines.filter(function(x,i,a){ return !(x==='' && a[i-1]===''); }).join('\n');
    $('formStatus').textContent = 'Prompt berhasil dibuat. Salin atau unduh sebagai .txt.';
    save();
    if (window.innerWidth < 981) $('output').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function copyOutput() {
    var text = $('output').textContent;
    if (!text || text.indexOf('PERAN') !== 0) { $('formStatus').textContent = 'Hasilkan prompt terlebih dahulu.'; return; }
    function done(){ $('copyBtn').innerHTML='<i class="fa-solid fa-check"></i> Tersalin'; setTimeout(function(){$('copyBtn').innerHTML='<i class="fa-solid fa-copy"></i> Salin';},1800); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done).catch(fallback); else fallback();
    function fallback(){ var ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');done();}catch(e){alert('Silakan blok dan salin prompt secara manual.');} ta.remove(); }
  }
  function downloadOutput() {
    var text = $('output').textContent;
    if (!text || text.indexOf('PERAN') !== 0) { $('formStatus').textContent = 'Hasilkan prompt terlebih dahulu.'; return; }
    var blob = new Blob(['\ufeff'+text],{type:'text/plain;charset=utf-8'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='prompt-modul-ajar-bahasa-arab-290826.txt'; document.body.appendChild(a); a.click(); setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},0);
  }
  function showApp(){ $('loginScreen').classList.add('hidden'); $('appScreen').classList.remove('hidden'); }
  function showLogin(){ $('appScreen').classList.add('hidden'); $('loginScreen').classList.remove('hidden'); $('password').value=''; }

  $('loginForm').addEventListener('submit', function(e){ e.preventDefault(); if(value('username')===USERNAME && value('password')===PASSWORD){ sessionStorage.setItem(SESSION_KEY,'active'); $('loginError').classList.add('hidden'); showApp(); } else $('loginError').classList.remove('hidden'); });
  $('togglePassword').addEventListener('click', function(){ var show=$('password').type==='password'; $('password').type=show?'text':'password'; this.setAttribute('aria-pressed',String(show)); this.setAttribute('aria-label',show?'Sembunyikan password':'Tampilkan password'); this.querySelector('i').className=show?'fa-solid fa-eye-slash':'fa-solid fa-eye'; });
  $('logoutBtn').addEventListener('click', function(){ sessionStorage.removeItem(SESSION_KEY); showLogin(); });
  $('jenjang').addEventListener('change', function(){ setOptions(); save(); });
  $('fase_kelas').addEventListener('change', function(){ updateDerived(); save(); });
  $('pendekatan').addEventListener('change', function(){ toggleOtherSelect('pendekatan','pendekatan_lain'); save(); });
  $('model').addEventListener('change', function(){ toggleOtherSelect('model','model_lain'); save(); });
  $('metode_lain_cb').addEventListener('change', function(){ toggleOtherCheck('metode_lain_cb','metode_lain'); save(); });
  $('lampiran_lain_cb').addEventListener('change', function(){ toggleOtherCheck('lampiran_lain_cb','lampiran_lain'); save(); });
  $('nama_penyusun').addEventListener('input', function(){ syncTeacherName(); });
  $('generatorForm').addEventListener('input', function(e){ if(e.target.classList.contains('invalid') && e.target.value.trim()) e.target.classList.remove('invalid'); clearTimeout(window.__akdsSaveTimer); window.__akdsSaveTimer=setTimeout(save,450); });
  $('generatorForm').addEventListener('change', function(){ save(); });
  $('generatorForm').addEventListener('submit', function(e){ e.preventDefault(); generatePrompt(); });
  $('copyBtn').addEventListener('click', copyOutput); $('downloadBtn').addEventListener('click', downloadOutput);
  $('exampleBtn').addEventListener('click', function(){ setValues(Object.assign({fase_kelas:'Fase D Kelas 7'},example),true); save(); $('cp').scrollIntoView({behavior:'smooth',block:'center'}); $('cp').focus(); $('formStatus').textContent='Contoh dimuat. Elemen CP dan CP tetap kosong—silakan isi dari dokumen resmi.'; });
  $('resetBtn').addEventListener('click', function(){ if(!confirm('Kosongkan konfigurasi tersimpan dan muat ulang contoh?'))return; localStorage.removeItem(STORAGE_KEY); setValues(Object.assign({fase_kelas:'Fase D Kelas 7'},example),true); $('output').textContent='Formulir direset. Lengkapi Elemen CP dan Capaian Pembelajaran, lalu klik “Hasilkan Prompt”.'; $('formStatus').textContent='Formulir direset; CP tetap kosong.'; });

  setOptions('Fase D Kelas 7');
  if (!restore()) setValues(Object.assign({fase_kelas:'Fase D Kelas 7'},example),true);
  refreshConditionalFields();
  if (sessionStorage.getItem(SESSION_KEY)==='active') showApp(); else showLogin();
})();
