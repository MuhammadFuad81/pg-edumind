const PG_CODE = "modul_ajar_ipa_ips_270826";
const SESSION_KEY = "akds_session_" + PG_CODE;
const loginConfig = document.getElementById("login-screen");
const VALID_USERNAME = loginConfig.dataset.loginUsername || "edumind";
const VALID_PASSWORD = loginConfig.dataset.loginPassword || "";
function handleLogin(event) {
event.preventDefault();
const username = document.getElementById('username').value.trim();
const password = document.getElementById('password').value.trim();
const errorBox = document.getElementById('login-error');
if (username === VALID_USERNAME && password === VALID_PASSWORD) {
errorBox.classList.add('hidden');
sessionStorage.setItem(SESSION_KEY, 'active');
showApp();
} else {
errorBox.classList.remove('hidden');
}
}
function togglePasswordVisibility() {
const passwordInput = document.getElementById('password');
const toggleButton = document.getElementById('toggle-password');
const eyeIcon = document.getElementById('password-eye-icon');
const willShow = passwordInput.type === 'password';
passwordInput.type = willShow ? 'text' : 'password';
toggleButton.setAttribute('aria-label', willShow ? 'Sembunyikan password' : 'Tampilkan password');
toggleButton.setAttribute('aria-pressed', String(willShow));
eyeIcon.classList.toggle('fa-eye', !willShow);
eyeIcon.classList.toggle('fa-eye-slash', willShow);
passwordInput.focus();
}
function handleLogout() {
sessionStorage.removeItem(SESSION_KEY);
showLogin();
}
function showApp() {
document.getElementById('login-screen').classList.add('hidden');
const app = document.getElementById('app-screen');
app.classList.remove('hidden');
app.classList.add('flex');
}
function showLogin() {
const app = document.getElementById('app-screen');
app.classList.add('hidden');
app.classList.remove('flex');
document.getElementById('login-screen').classList.remove('hidden');
document.getElementById('username').value = '';
document.getElementById('password').value = '';
document.getElementById('password').type = 'password';
document.getElementById('toggle-password').setAttribute('aria-label', 'Tampilkan password');
document.getElementById('toggle-password').setAttribute('aria-pressed', 'false');
document.getElementById('password-eye-icon').className = 'fa-solid fa-eye text-sm';
}
window.addEventListener('load', function () {
if (sessionStorage.getItem(SESSION_KEY) === 'active') {
showApp();
} else {
showLogin();
}
});
(function bindLoginEventsEarly() {
const loginForm = document.getElementById('login-form');
if (loginForm) {
loginForm.addEventListener('submit', function (event) { handleLogin(event); });
}
const togglePasswordButton = document.getElementById('toggle-password');
if (togglePasswordButton) togglePasswordButton.addEventListener('click', togglePasswordVisibility);
})();
// ==== PROTEKSI SOURCE CODE ====
document.addEventListener('contextmenu', function (e) {
e.preventDefault();
});
document.addEventListener('keydown', function (e) {
const tag = (e.target.tagName || '').toUpperCase();
if (tag === 'INPUT' || tag === 'TEXTAREA') return;
const k = e.key.toLowerCase();
const isDevToolsKey = e.key === 'F12' ||
(e.ctrlKey && (k === 'u' || k === 's')) ||
(e.ctrlKey && e.shiftKey && (k === 'i' || k === 'j' || k === 'c'));
if (isDevToolsKey) {
e.preventDefault();
}
});
document.addEventListener('copy', function (e) {
const tag = (e.target.tagName || '').toUpperCase();
if (tag === 'INPUT' || tag === 'TEXTAREA') return;
e.preventDefault();
});
document.addEventListener('dragstart', function (e) {
const tag = (e.target.tagName || '').toUpperCase();
if (tag === 'INPUT' || tag === 'TEXTAREA') return;
e.preventDefault();
});
(function () {
const threshold = 160;
let warned = false;
setInterval(function () {
const widthDiff = window.outerWidth - window.innerWidth;
const heightDiff = window.outerHeight - window.innerHeight;
if (widthDiff > threshold || heightDiff > threshold) {
if (!warned) {
console.log('%cAkses source code dibatasi.', 'color:red;font-size:16px;font-weight:bold;');
warned = true;
}
} else {
warned = false;
}
}, 1000);
})();
const EDUCATION_CONFIG = {
"SD/MI": {
mapel: ["IPAS"],
fase: ["Fase B Kelas 3", "Fase B Kelas 4", "Fase C Kelas 5", "Fase C Kelas 6"]
},
"SMP/MTs": {
mapel: ["IPA", "IPS"],
fase: ["Fase D Kelas 7", "Fase D Kelas 8", "Fase D Kelas 9"]
},
"SMA/MA/SMK": {
mapel: ["IPA", "IPS"],
fase: ["Fase E Kelas 10"]
}
};
const CP_PER_MAPEL_FASE = {
"IPAS|Fase B": "Pada akhir Fase B, murid menjelaskan bentuk dan fungsi pancaindra; menganalisis siklus hidup makhluk hidup dan upaya pelestariannya; menghasilkan solusi pelestarian sumber daya alam sebagai mitigasi perubahan iklim; menyimpulkan perubahan wujud zat; menjelaskan sumber dan bentuk energi serta perubahan bentuk energi dalam kehidupan sehari-hari; membedakan jenis gaya dan pengaruhnya; menjelaskan peran, tugas, tanggung jawab, dan interaksi sosial di sekitar; mengenali letak kabupaten/kota dan provinsi dengan peta; mengklasifikasikan bentang alam dan keterkaitannya dengan profesi serta budaya; menganalisis sejarah masyarakat sekitar; serta menjelaskan nilai dan fungsi uang serta pengelolaan keuangan bijak. Murid menerapkan keterampilan proses: mengamati, mempertanyakan dan memprediksi, merencanakan dan melakukan penyelidikan dengan panduan pendidik, mengorganisasikan data sederhana, mengevaluasi dan merefleksi, serta mengomunikasikan hasil secara lisan dan tertulis.",
"IPAS|Fase C": "Pada akhir Fase C, murid merefleksikan sistem organ tubuh manusia dan cara menjaga kesehatan; menganalisis hubungan komponen biotik dan abiotik serta pengaruhnya terhadap ekosistem; menjelaskan gelombang bunyi dan cahaya dalam kehidupan sehari-hari; menghasilkan upaya penghematan energi dan pemanfaatan energi alternatif sebagai mitigasi perubahan iklim; menjelaskan tata surya serta kaitannya dengan rotasi dan revolusi bumi; menjelaskan letak dan kondisi geografis Indonesia dengan peta; meninjau sejarah perjuangan pahlawan di sekitar; menemukan keragaman budaya nasional berdasarkan kearifan lokal; serta menerapkan kegiatan ekonomi masyarakat sekitar. Murid menerapkan keterampilan proses mengamati, mempertanyakan dan memprediksi, merencanakan dan melakukan penyelidikan, mengolah dan menganalisis data, mengevaluasi dan merefleksi, serta mengomunikasikan hasil secara utuh.",
"IPA|Fase D": "Pada akhir Fase D, murid menelaah identifikasi makhluk hidup; menganalisis klasifikasi, sifat, dan perubahan materi; sistem organisasi kehidupan; interaksi makhluk hidup dan lingkungan dalam upaya perubahan iklim; pewarisan sifat; bioteknologi konvensional; pengukuran aspek fisis; gerak, gaya, tekanan, usaha dan energi; kalor; gelombang; kemagnetan dan kelistrikan; posisi bumi-bulan-matahari; serta keputusan untuk menghindari zat aditif dan adiktif berbahaya. Murid menerapkan keterampilan proses mengamati, mempertanyakan dan memprediksi, merencanakan dan melakukan penyelidikan, memproses dan menganalisis data, mengevaluasi dan merefleksi, serta mengomunikasikan hasil secara sistematis.",
"IPA|Fase E": "Pada akhir Fase E, murid menerapkan prinsip klasifikasi dan strategi pelestarian keanekaragaman hayati; mendeskripsikan peranan virus, bakteri, dan jamur; menganalisis interaksi komponen ekosistem dan pengaruhnya terhadap keseimbangan ekosistem; menggunakan sistem pengukuran dalam kerja ilmiah; menganalisis gerak dua dimensi; menganalisis pemanfaatan energi alternatif; menganalisis partikel penyusun materi dan menerapkan konsep stoikiometri; serta menerapkan konsep IPA untuk mengatasi permasalahan perubahan iklim. Murid menerapkan keterampilan proses mengamati, mempertanyakan dan memprediksi, merencanakan dan melakukan penyelidikan, memproses dan menganalisis data, mengevaluasi dan merefleksi, serta mengomunikasikan hasil secara sistematis.",
"IPS|Fase D": "Pada akhir Fase D, murid menjelaskan keberagaman kondisi geografis Indonesia dan konektivitas antarruang; memprediksi dampak perubahan iklim serta merefleksikan adaptasi dan mitigasi bencana; mengidentifikasi kegiatan ekonomi, harga, pasar, lembaga keuangan, dan perdagangan internasional; menelaah peran masyarakat dan negara dalam pertumbuhan ekonomi digital; mengelaborasi interaksi sosial, lembaga sosial, dinamika sosial, dan perubahan sosial budaya; menjelaskan konsep dasar sejarah; serta menganalisis keterhubungan masa lampau, kini, dan masa depan dalam sejarah lokal, nasional, dan global. Murid menerapkan keterampilan proses mengamati, menanya, mengumpulkan dan mengolah informasi, menguji dan menerapkan konsep, mengevaluasi, merefleksi, serta mengomunikasikan hasil penyelidikan.",
"IPS|Fase E": "Pada akhir Fase E, murid menjelaskan konsep dasar geografi serta fenomena geografi fisik melalui litosfer, atmosfer, dan hidrosfer sebagai ruang hidup; mengimplementasikan teknologi geospasial berupa peta, penginderaan jauh, dan SIG; menelaah hakikat ilmu ekonomi dan membedakan produk keuangan bank dan nonbank; menjelaskan fungsi sosiologi dan menelaah status serta peran individu dalam kelompok sosial; menganalisis keragaman manusia dan budaya dalam masyarakat multikultural; serta menelaah konsep dasar sejarah dan mengimplementasikan penelitian sejarah dari masa kerajaan Hindu-Buddha hingga kerajaan Islam. Murid menerapkan keterampilan proses mengamati, membuat pertanyaan, mengumpulkan dan menyimpulkan informasi, mengomunikasikan hasil analisis, merefleksi, dan menyusun tindak lanjut."
};
function fillSelect(select, options, preferred) {
select.innerHTML = "";
options.forEach(value => {
const option = document.createElement("option");
option.value = value;
option.textContent = value;
select.appendChild(option);
});
select.value = options.includes(preferred) ? preferred : options[0];
}
function updateEducationOptions(preserveCurrent) {
const jenjang = document.getElementById("jenjang_pendidikan").value;
const config = EDUCATION_CONFIG[jenjang] || EDUCATION_CONFIG["SD/MI"];
const faseSelect = document.getElementById("fase_kelas");
const mapelSelect = document.getElementById("mata_pelajaran");
const currentFase = preserveCurrent ? faseSelect.value : "";
const currentMapel = preserveCurrent ? mapelSelect.value : "";
fillSelect(faseSelect, config.fase, currentFase);
fillSelect(mapelSelect, config.mapel, currentMapel);
mapelSelect.disabled = config.mapel.length === 1;
mapelSelect.classList.toggle("bg-slate-100", config.mapel.length === 1);
mapelSelect.classList.toggle("text-slate-500", config.mapel.length === 1);
mapelSelect.title = config.mapel.length === 1
? "Mata pelajaran ditentukan otomatis oleh jenjang pendidikan."
: "Pilih IPA atau IPS sesuai kebutuhan.";
updateCapaianPembelajaran();
}
function updateCapaianPembelajaran() {
const faseKelas = document.getElementById("fase_kelas").value;
const mapel = document.getElementById("mata_pelajaran").value;
const faseMatch = faseKelas.match(/Fase\s+([B-E])/);
const fase = faseMatch ? `Fase ${faseMatch[1]}` : "";
const cp = CP_PER_MAPEL_FASE[`${mapel}|${fase}`];
document.getElementById("capaian_pembelajaran").value = cp
? `${mapel} - ${fase} (${faseKelas})\n\n${cp}`
: "CP belum tersedia untuk kombinasi mata pelajaran dan fase ini.";
}
function configureAutomaticFields() {
const fieldIds = [
"tujuan_pembelajaran", "pemahaman_bermakna", "pertanyaan_pemantik",
"lintas_disiplin_ilmu", "topik_kegiatan_pembelajaran", "langkah_pendahuluan",
"langkah_inti", "langkah_penutup", "asesmen_awal", "asesmen_formatif", "asesmen_sumatif",
"kebutuhan_siswa", "penguatan_karakter", "refleksi_guru", "strategi_pengayaan", "strategi_remidial"
];
fieldIds.forEach(id => {
const field = document.getElementById(id);
if (!field) return;
field.value = "Diisi otomatis oleh AI berdasarkan konteks utama yang Anda isi.";
field.readOnly = true;
field.classList.add("bg-slate-100", "text-slate-500", "cursor-not-allowed");
});
const cpField = document.getElementById("capaian_pembelajaran");
cpField.readOnly = true;
cpField.setAttribute("aria-readonly", "true");
cpField.classList.add("bg-slate-100", "text-slate-600", "cursor-not-allowed");
updateEducationOptions(true);
document.getElementById("fase_kelas").value = "Fase B Kelas 4";
updateCapaianPembelajaran();
document.getElementById("jenjang_pendidikan").addEventListener("change", function () { updateEducationOptions(false); });
document.getElementById("fase_kelas").addEventListener("change", updateCapaianPembelajaran);
document.getElementById("mata_pelajaran").addEventListener("change", updateCapaianPembelajaran);
}
function generatePrompt() {
const namaSekolah = document.getElementById("nama_sekolah").value || "[Nama Satuan Pendidikan]";
const jenjang = document.getElementById("jenjang_pendidikan").value;
const faseKelas = document.getElementById("fase_kelas").value;
const namaPenyusun = document.getElementById("nama_penyusun").value || "[Nama Penyusun]";
const guruKelasMapel = document.getElementById("guru_kelas_mapel").value.trim();
const nipPenyusun = document.getElementById("nip_penyusun").value.trim();
// Mata pelajaran mengikuti jenjang pendidikan yang dipilih pengguna.
const mapel = document.getElementById("mata_pelajaran").value;
const tahunAjaran = document.getElementById("tahun_ajaran").value || "[Tahun Ajaran]";
const alokasi = document.getElementById("alokasi_waktu").value || "[Alokasi Waktu]";
const lingkupMateri = document.getElementById("lingkup_materi_semester").value || "[Belum diisi]";
const nomorBab = document.getElementById("nomor_bab").value.trim();
const judulBab = document.getElementById("judul_bab").value.trim();
const topik = document.getElementById("topik_unit_pembelajaran").value || "[Topik Pembelajaran]";
const durasiAwal = document.getElementById("durasi_kegiatan_awal").value || "10 menit";
const durasiInti = document.getElementById("durasi_kegiatan_inti").value || "50 menit";
const kompetensiAwal = document.getElementById("kompetensi_awal").value || "[Belum diisi]";
const targetPD = document.getElementById("target_peserta_didik").value;
const jumlahPD = document.getElementById("jumlah_peserta_didik").value || "[Belum diisi]";
const cp = document.getElementById("capaian_pembelajaran").value;
const pendekatanPBM = document.getElementById("pendekatan_pembelajaran").value;
const konteksOtomatis = `Mata Pelajaran ${mapel}; Jenjang/Kelas ${jenjang} / ${faseKelas}; Fase/Elemen ${faseKelas}; Lingkup Materi/Semester ${lingkupMateri}; Bab ${nomorBab || 'sesuai materi'} - ${judulBab || 'sesuai materi'}; Topik/Unit ${topik}.`;
const tp = `Susun 2-4 TP yang spesifik, terukur, dan relevan dengan CP serta ${konteksOtomatis}`;
const pemahamanBermakna = "Susun secara kontekstual dari materi dan topik di atas.";
const pertanyaanPemantik = "Susun 2-3 pertanyaan yang sesuai usia dan topik.";
const lintasDisiplin = "Tentukan keterkaitan lintas disiplin yang relevan.";
const topikKegiatan = "Rumuskan dari lingkup materi, bab, dan topik/unit di atas.";
const modelPBM = document.getElementById("model_pembelajaran").value;
const mediaSumber = document.getElementById("media_dan_sumber_belajar").value || `Tentukan media, alat, dan sumber belajar yang relevan berdasarkan ${konteksOtomatis}`;
const tautanBahanAjar = document.getElementById("tautan_bahan_ajar_digital").value.trim();
const tautanVideo = document.getElementById("tautan_video_pembelajaran").value.trim();
const langkahPnd = "Susun langkah Orientasi, Apersepsi, dan Motivasi yang relevan dengan konteks otomatis.";
const langkahInt = "Pilih model yang sesuai, ikuti sintaks resminya secara berurutan, dan terapkan diferensiasi sesuai konteks otomatis.";
const langkahPnt = "Susun langkah penguatan, refleksi murid, tindak lanjut, dan penutup yang sesuai.";
const asesmenAwl = "Susun asesmen diagnostik sesuai kesiapan belajar yang diperlukan oleh materi/topik.";
const asesmenFor = "Susun teknik, instrumen, rubrik, dan keterangan yang relevan untuk sikap, pengetahuan, dan keterampilan.";
const asesmenSum = "Susun teknik, instrumen, rubrik, dan keterangan yang relevan untuk pengetahuan dan keterampilan.";
const kebutuhan = "Susun asumsi umum yang aman dan strategi dukungan fleksibel sesuai jenjang/fase serta materi; jangan mengarang diagnosis atau data individu.";
const karakter = "Susun nilai keimanan dan ketakwaan, kepedulian terhadap alam dan masyarakat, kejujuran ilmiah, tanggung jawab, kolaborasi, serta karakter lain yang relevan dengan materi.";
const refleksi = "Susun sedikitnya 6 butir refleksi spesifik terhadap pelaksanaan pembelajaran, ketercapaian TP, kebutuhan murid, alokasi waktu, serta tindak lanjut.";
const strategiPengayaan = "Susun kegiatan pengayaan bertingkat bagi murid yang telah mencapai kompetensi.";
const strategiRemidial = "Susun strategi remedial bertahap yang sesuai CP dan materi.";
const kotaTanggal = document.getElementById("kota_tanggal_pengesahan").value.trim();
const namaKepsek = document.getElementById("nama_kepala_sekolah").value || "[Nama Kepala Sekolah]";
const nipKepsek = document.getElementById("nip_kepala_sekolah").value.trim();
const instruksiTambahan = document.getElementById("instruksiTambahan").value.trim();
let profilLulusan = [];
document.querySelectorAll('input[name="profil_lulusan"]:checked').forEach(cb => profilLulusan.push(cb.value));
let metodePBM = [];
document.querySelectorAll('input[name="metode_pembelajaran"]:checked').forEach(cb => metodePBM.push(cb.value));
let kemitraan = [];
document.querySelectorAll('input[name="kemitraan_pembelajaran"]:checked').forEach(cb => kemitraan.push(cb.value));
let strategiDif = [];
document.querySelectorAll('input[name="diferensiasi_pembelajaran"]:checked').forEach(cb => strategiDif.push(cb.value));
let lampiran = [];
document.querySelectorAll('input[name="lampiran_pendukung"]:checked').forEach(cb => lampiran.push(cb.value));
const promptText = `Bertindaklah sebagai Pakar Desain Instruksional IPAS, IPA, dan IPS, Konsultan Kurikulum Merdeka/Pembelajaran Mendalam Kemendikdasmen, serta guru senior pada mata pelajaran terpilih. Susun draf lengkap "MODUL AJAR ${mapel}" yang resmi, rapi, komprehensif, akurat, kontekstual, dan siap pakai, dengan STRUKTUR & URUTAN BAGIAN mengikuti format acuan sekolah kami, berdasarkan parameter berikut:
--- KONTEKS SISTEM AKDS ---
Pilar 1 - KURIKULUM & PEMBELAJARAN | Sub-Pilar 1 - Perencanaan Kurikulum dan Pembelajaran | Dokumen: Modul Ajar (Perangkat Ajar Resmi Guru)
--- SAMPUL ---
Mapel: ${mapel} | Jenjang/Kelas: ${jenjang} - ${faseKelas} | Pendekatan: ${pendekatanPBM}
Bab: ${nomorBab || '[otomatis]'} - ${judulBab || '[otomatis]'} | Topik: ${topik}
--- IDENTITAS PENYUSUN ---
1. Nama Penyusun: ${namaPenyusun}${nipPenyusun ? ` (NIP. ${nipPenyusun})` : ''}
2. Guru Kelas/Guru Mapel: ${guruKelasMapel || faseKelas}
3. Institusi: ${namaSekolah}
--- INFORMASI UMUM ---
4. Mata Pelajaran: ${mapel}
5. Tahun Ajaran: ${tahunAjaran}
6. Jenjang/Kelas: ${jenjang} / ${faseKelas}
7. Fase/Elemen: ${faseKelas}
8. Lingkup Materi/Semester: ${lingkupMateri}
9. Alokasi Waktu: ${alokasi} (Awal ±${durasiAwal}, Inti ±${durasiInti})
--- IDENTIFIKASI ---
10. Kompetensi Awal/Prasyarat Siswa (poin a, b, c... label tebal di awal tiap poin): "${kompetensiAwal}"
11. Dimensi Profil Lulusan (centang dari 8 dimensi resmi: Keimanan dan Ketakwaan terhadap Tuhan YME, Kewargaan, Penalaran Kritis, Kreativitas, Kolaborasi, Kemandirian, Kesehatan, Komunikasi):
${profilLulusan.length > 0 ? profilLulusan.map(p => `- ${p}`).join('\n') : '- Penalaran Kritis\n- Kolaborasi'}
12. Sarana dan Prasarana (turunkan dari media/sumber belajar jadi daftar bernomor)
13. Target Peserta Didik: ${targetPD}
14. Jumlah Murid: ${jumlahPD}
--- KOMPONEN INTI ---
15. Capaian Pembelajaran (CP) per Fase/Elemen: "${cp}"
(Pertahankan rumusan CP di atas tanpa mengubah maknanya. Susun tabel Elemen/Ruang Lingkup | CP Relevan sesuai dokumen CP resmi untuk mata pelajaran dan fase terpilih. Untuk IPAS gunakan elemen Pemahaman IPAS dan Keterampilan Proses; untuk IPA gunakan Pemahaman IPA dan Keterampilan Proses; untuk IPS gunakan Pemahaman Konsep dan Keterampilan Proses. Jangan menciptakan nama elemen atau rumusan CP.)
--- DESAIN PEMBELAJARAN (9 poin bernomor persis) ---
16. (1) Capaian Pembelajaran: ringkas CP di atas.
17. (2) Tujuan Pembelajaran (TP): susun 2-4 TP yang spesifik, terukur, dan relevan dengan CP serta konteks berikut: ${konteksOtomatis}
18. (3) Pemahaman Bermakna: susun secara kontekstual dari materi dan topik di atas.
19. (4) Pertanyaan Pemantik: susun 2-3 pertanyaan yang sesuai usia dan topik.
20. (5) Lintas Disiplin Ilmu: tentukan keterkaitan yang relevan.
21. (6) Topik Pembelajaran: rumuskan dari lingkup materi, bab, dan topik/unit di atas.
22. (7) Praktik Pedagogis - Pendekatan: ${pendekatanPBM} | Metode: ${metodePBM.length > 0 ? metodePBM.join(', ') : 'Diskusi, Tanya Jawab'} | Model: ${modelPBM}
23. (8) Kemitraan Pembelajaran: ${kemitraan.length > 0 ? kemitraan.join('; ') : 'Lingkungan sekolah; Lingkungan luar sekolah (Orang Tua)'}
24. (9) Pemanfaatan Digital (TPACK): Bahan ajar${tautanBahanAjar ? ` (${tautanBahanAjar})` : ' [tautan bila ada]'}; Video${tautanVideo ? ` (${tautanVideo})` : ' [tautan bila ada]'}
--- SARANA, MEDIA & SUMBER BELAJAR ---
25. Media, Alat, dan Sumber Belajar Utama (jadi dasar poin Sarana-Prasarana & Daftar Pustaka di Lampiran): "${mediaSumber}"
--- PENGALAMAN BELAJAR (3 tahap: Awal, Inti, Penutup - tiap tahap daftar langkah bernomor urut, sisipkan label kompetensi dalam kurung tebal spt (Bernalar Kritis), (KSE: Kesadaran Diri) dsb sesuai gaya modul acuan) ---
26. Kegiatan Awal (±${durasiAwal}) - sub: Orientasi, Apersepsi, Motivasi: "${langkahPnd}"
27. Kegiatan Inti ${modelPBM} (±${durasiInti}) - ikuti sintaks resmi model ${modelPBM} berurutan, terapkan ${strategiDif.length > 0 ? strategiDif.join(' & ') : 'diferensiasi konten & proses'}: "${langkahInt}"
28. Penutup: "${langkahPnt}"
--- ASESMEN (tabel: Penilaian | Teknik | Instrumen | Rubrik | Keterangan) ---
29. Asesmen Awal/Diagnostik: "${asesmenAwl}"
30. Asesmen Formatif (baris Sikap, Pengetahuan, Keterampilan): "${asesmenFor}"
31. Asesmen Sumatif (baris Pengetahuan, Keterampilan): "${asesmenSum}"
--- REFLEKSI (2 sub-bagian) ---
32. Refleksi Guru (bernomor, min. 6 poin) - fokus: "${refleksi}"
33. Refleksi Peserta Didik (bernomor sederhana sesuai usia siswa, min. 5 poin)
--- KARAKTER, DIFERENSIASI, PENGAYAAN & REMIDIAL ---
34. Strategi Diferensiasi: ${strategiDif.length > 0 ? strategiDif.join(', ') : 'Diferensiasi Konten, Diferensiasi Proses'}
35. Kebutuhan Khusus Siswa: "${kebutuhan}"
36. Fokus Penguatan Karakter/Adab: "${karakter}"
37. Pengayaan: "${strategiPengayaan}"
38. Remidial: "${strategiRemidial}"
--- LAMPIRAN & PENGESAHAN ---
39. Lampiran Wajib: ${lampiran.length > 0 ? lampiran.join(', ') : 'Bahan Ajar, LKPD, Rubrik Penilaian'} (buat draf singkat/kerangka isi tiap lampiran, jangan hanya daftar nama)
40. Daftar Pustaka: turunkan dari sumber belajar poin 25 (sitasi sederhana, sertakan tautan bila ada).
41. Lembar Pengesahan: Kota/Tanggal: ${kotaTanggal || '[Kota, Tanggal]'} | Kepala Sekolah: ${namaKepsek}${nipKepsek ? ` (NIP. ${nipKepsek})` : ' (NIP. bila ada)'} | Guru: ${namaPenyusun}${nipPenyusun ? ` (NIP. ${nipPenyusun})` : ' (NIP. bila ada)'} - dua kolom tanda tangan berdampingan seperti modul resmi.
${instruksiTambahan ? `\n42. INSTRUKSI TAMBAHAN PENGGUNA (PRIORITAS TERTINGGI):\n"${instruksiTambahan}"\nJika instruksi tambahan bertentangan dengan isian field pada formulir, dahulukan instruksi tambahan tersebut.\n` : ''}
--------------------------------------------------
INSTRUKSI LUARAN WAJIB DIPATUHI:
1. Ikuti urutan bagian PERSIS: Sampul, Identitas Penyusun, Informasi Umum, Identifikasi (Kompetensi Awal, Dimensi Profil Lulusan, Sarana-Prasarana, Target & Jumlah PD), Komponen Inti (Fase & tabel Elemen-CP), Desain Pembelajaran (9 poin bernomor), Pengalaman Belajar (Awal/Inti/Penutup bernomor urut per tahap, reset ke 1 tiap tahap baru), Asesmen (tabel Formatif & Sumatif), Refleksi (Guru & Peserta Didik), Pengayaan-Remidial, Lampiran, Daftar Pustaka, Lembar Pengesahan.
2. Rincian langkah kegiatan inti operasional konkret agar guru bisa langsung praktik di kelas; sisipkan label kompetensi/dimensi/KSE dalam kurung tebal di akhir kalimat relevan.
3. Sisipkan strategi pengelolaan kelas akomodatif sesuai kebutuhan siswa & strategi diferensiasi terpilih.
4. Buat draf kerangka isi tiap lampiran terpilih (${lampiran.length > 0 ? lampiran.join(', ') : 'Bahan Ajar, LKPD, Rubrik Penilaian'}), minimal struktur instrumen penilaian/arahan isi LKPD, jadi satu paket utuh.
5. Gunakan Bahasa Indonesia baku, formal, edukatif, dan patuh regulasi kurikulum terbaru. Jangan meninggalkan placeholder dan jangan memotong isi.
6. Pastikan konsep, istilah, data, proses ilmiah, fakta sejarah, kondisi geografis, serta konteks sosial-ekonomi akurat dan sesuai usia. Jangan membuat data, hasil eksperimen, kutipan, atau sumber yang tidak tersedia.
7. Untuk IPAS/IPA, utamakan inkuiri, pengamatan, penyelidikan aman, analisis bukti, dan komunikasi hasil. Untuk IPS, utamakan literasi data dan sumber, analisis ruang-waktu, sebab-akibat, multiperspektif, serta aksi sosial yang bertanggung jawab.
8. Jika pengguna melampirkan buku atau materi ajar, jadikan file tersebut sumber utama, cantumkan bab/halaman rujukan yang relevan, dan selaraskan seluruh kegiatan serta asesmen dengannya.
9. WAJIB membuat hasil akhir sebagai file Microsoft Word (.docx) yang rapi, utuh, dan siap diunduh. Lampirkan file .docx sebagai keluaran utama dan berikan tautan/tombol unduh; jangan hanya menampilkan seluruh modul sebagai teks di percakapan.${instruksiTambahan ? ' Instruksi tambahan pengguna di atas memiliki prioritas tertinggi bila bertentangan dengan isian field.' : ''}`;
document.getElementById("prompt-output-display").textContent = promptText;
}
function copyPromptText() {
const promptText = document.getElementById("prompt-output-display").textContent;
navigator.clipboard.writeText(promptText).then(() => {
const btn = document.getElementById("btn-copy-text");
btn.innerText = "Berhasil Disalin!";
setTimeout(() => {
btn.innerText = "Salin Prompt";
}, 2000);
}).catch(err => {
alert("Gagal menyalin teks secara otomatis. Silakan blok teks manual dan salin.");
});
}
function initFormDefaults() {
const v = {
nama_sekolah: "SD Islam Edumind Bekasi",
nama_penyusun: "Prabowo Subianto, S.Pd.Gr.",
guru_kelas_mapel: "Guru Kelas IV / IPAS",
nip_penyusun: "",
mata_pelajaran: "IPAS",
tahun_ajaran: "2026/2027",
lingkup_materi_semester: "Energi dan Perubahannya / Semester I",
nomor_bab: "Bab 4",
judul_bab: "Mengubah Bentuk Energi",
topik_unit_pembelajaran: "Perubahan energi di sekitar kita dan fotosintesis sebagai proses penting di Bumi",
kompetensi_awal: "Peserta didik mampu mengenali beberapa sumber energi di lingkungan sekitar, mengamati perubahan sederhana pada benda, serta menyampaikan hasil pengamatan dengan kalimat yang runtut.",
jumlah_peserta_didik: "25 Murid",
capaian_pembelajaran: "",
tujuan_pembelajaran: "Peserta didik mampu mengidentifikasi perubahan bentuk energi pada benda di sekitar, menjelaskan contoh perubahan energi, serta mengomunikasikan hasil pengamatan sederhana dengan menggunakan bukti.",
pemahaman_bermakna: "Energi dapat berubah dari satu bentuk ke bentuk lain dan perubahan tersebut dimanfaatkan dalam kehidupan sehari-hari. Tumbuhan mengubah energi cahaya menjadi energi kimia melalui fotosintesis.",
pertanyaan_pemantik: "Perubahan energi apa yang terjadi saat lampu menyala?\nBagaimana tumbuhan memanfaatkan cahaya matahari untuk bertahan hidup?",
lintas_disiplin_ilmu: "Bahasa Indonesia (menulis laporan pengamatan) dan Matematika (mengorganisasikan data sederhana)",
topik_kegiatan_pembelajaran: "Mengamati alat di sekitar, menyelidiki perubahan bentuk energi, menganalisis bukti, berdiskusi, dan mempresentasikan hasil",
media_dan_sumber_belajar: "Buku Siswa IPAS untuk SD/MI Kelas IV, gambar dan video perubahan energi, benda aman di sekitar kelas, senter, karet gelang, LKPD penyelidikan, papan tulis, serta sumber digital yang terverifikasi.",
tautan_bahan_ajar_digital: "",
tautan_video_pembelajaran: "",
langkah_pendahuluan: "Guru mengucapkan salam, mengajak berdoa, mengecek kesiapan belajar, menunjukkan contoh alat yang menggunakan energi, menggali pengetahuan awal, lalu menyampaikan tujuan dan manfaat pembelajaran.",
langkah_inti: "Peserta didik mengamati fenomena perubahan energi, mengajukan pertanyaan dan prediksi, melakukan penyelidikan sederhana dengan alat yang aman, mencatat data, membandingkan hasil dengan prediksi, lalu mengomunikasikan kesimpulan berdasarkan bukti.",
langkah_penutup: "Guru dan peserta didik menyimpulkan pola perubahan energi, melakukan refleksi terhadap proses penyelidikan, menetapkan tindak lanjut, lalu menutup pembelajaran.",
asesmen_awal: "Tanya jawab, klasifikasi gambar, dan prediksi sederhana untuk memetakan pemahaman awal tentang sumber serta bentuk energi.",
asesmen_formatif: "Sikap: observasi keselamatan, ketelitian, dan kolaborasi. Pengetahuan: analisis contoh perubahan energi. Keterampilan: penyelidikan sederhana dan komunikasi hasil dengan rubrik.",
asesmen_sumatif: "Pengetahuan: menjelaskan sumber, bentuk, dan perubahan energi. Keterampilan: menganalisis fenomena dan menyajikan laporan singkat berbasis bukti.",
kebutuhan_siswa: "Sebagian peserta didik mungkin memerlukan petunjuk bergambar, alat konkret, lembar pencatatan berstruktur, contoh berulang, atau pendampingan bertahap saat melakukan penyelidikan.",
penguatan_karakter: "Menanamkan rasa syukur atas kemampuan berpikir yang diberikan Tuhan, kolaborasi dan gotong royong dalam kerja kelompok, serta kemandirian dan tanggung jawab dalam mengerjakan tugas individu.",
refleksi_guru: "Apakah peserta didik mampu menghubungkan pengamatan dengan konsep perubahan energi, menggunakan bukti, bekerja aman, dan memperoleh tindak lanjut yang sesuai?",
strategi_pengayaan: "Peserta didik menelusuri lebih banyak contoh perubahan energi, membuat diagram alir energi pada alat sehari-hari, atau merancang kampanye hemat energi.",
strategi_remidial: "Gunakan demonstrasi ulang, kartu gambar bentuk energi, pertanyaan penuntun, tabel pengamatan sederhana, dan pendampingan bertahap sesuai kebutuhan peserta didik.",
kota_tanggal_pengesahan: "Bekasi, 27 Agustus 2026",
nama_kepala_sekolah: "Al Khawarizmi, S.Pd., M.Pd.Gr.",
nip_kepala_sekolah: "",
instruksiTambahan: "Susun modul ajar ini berdasarkan template yang saya lampirkan, pastikan tersusun rapi. Jadikan outputnya file ms.word (.docx) siap unduh",
};
Object.keys(v).forEach(id => { const el = document.getElementById(id); if (el) el.value = v[id]; });
}
function clearForm() {
const textFields = [
"nama_sekolah", "nama_penyusun", "guru_kelas_mapel", "nip_penyusun",
"tahun_ajaran", "lingkup_materi_semester", "nomor_bab", "judul_bab",
"topik_unit_pembelajaran", "alokasi_waktu", "durasi_kegiatan_awal", "durasi_kegiatan_inti",
"kompetensi_awal", "jumlah_peserta_didik",
"capaian_pembelajaran", "tujuan_pembelajaran", "pemahaman_bermakna", "pertanyaan_pemantik",
"lintas_disiplin_ilmu", "topik_kegiatan_pembelajaran",
"media_dan_sumber_belajar", "tautan_bahan_ajar_digital", "tautan_video_pembelajaran",
"langkah_pendahuluan", "langkah_inti", "langkah_penutup",
"asesmen_awal", "asesmen_formatif", "asesmen_sumatif",
"kebutuhan_siswa", "penguatan_karakter", "refleksi_guru",
"strategi_pengayaan", "strategi_remidial",
"kota_tanggal_pengesahan", "nama_kepala_sekolah", "nip_kepala_sekolah",
"instruksiTambahan"
];
textFields.forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });
document.getElementById("mata_pelajaran").value = "IPAS";
document.getElementById("instruksiTambahan").value = "Susun modul ajar ini berdasarkan template yang saya lampirkan, pastikan tersusun rapi. Jadikan outputnya file ms.word (.docx) siap unduh";
document.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = false; });
document.getElementById("jenjang_pendidikan").selectedIndex = 0;
updateEducationOptions(false);
document.getElementById("pendekatan_pembelajaran").selectedIndex = 0;
document.getElementById("model_pembelajaran").selectedIndex = 0;
document.getElementById("target_peserta_didik").selectedIndex = 0;
updateCapaianPembelajaran();
document.getElementById("prompt-output-display").textContent = "Formulir telah dibersihkan.";
}
function stepField(id, delta) {
const el = document.getElementById(id);
if (!el) return;
const m = el.value.match(/\d+/);
let n = (m ? parseInt(m[0], 10) : 0) + delta;
if (n < 1) n = 1;
el.value = m ? el.value.slice(0, m.index) + n + el.value.slice(m.index + m[0].length) : String(n);
}
window.addEventListener('load', function () {
initFormDefaults();
configureAutomaticFields();
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
const clearBtn = document.getElementById('clear-form-btn');
if (clearBtn) clearBtn.addEventListener('click', clearForm);
const generateBtn = document.getElementById('generate-prompt-btn');
if (generateBtn) generateBtn.addEventListener('click', generatePrompt);
const copyBtn = document.getElementById('copy-prompt-btn');
if (copyBtn) copyBtn.addEventListener('click', copyPromptText);
document.querySelectorAll('.stp').forEach(btn => btn.addEventListener('click', function () {
const [id, delta] = btn.dataset.step.split(':');
stepField(id, parseInt(delta, 10));
}));
});
