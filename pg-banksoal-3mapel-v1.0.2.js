/* Edumind Academy — Prompt Generator Bank Soal Bahasa Arab, Nahwu & Siroh
 * V1.0.2 | 28 Oktober 2026 | Semua pemrosesan terjadi di browser; tidak memakai AI/API.
 * Akses masuk adalah gerbang penggunaan sederhana, bukan autentikasi server.
 * Katalog Bahasa Arab dan Siroh: rancangan awal Edumind, bukan daftar kurikulum resmi.
 * Katalog Nahwu: disarikan dari DAFTAR ISI Ilmu Nahwu untuk Pemula,
 * Abu Razin & Ummu Razin (programbisa.com); nomor halaman merujuk halaman BUKU,
 * dan lampiran daftar isi saja TIDAK menyediakan isi/pembahasan kaidah.
 */
(function (global) {
  'use strict';
  const VERSION = '1.0.2';
  const LOGO = 'https://growva.biz.id/gambarbebas/20260728-075640_Logo%20Edumind%20Academy%20-%20Terbaru2026%20-%20untuk%20webbook.png';
  const GRADES = {
    'SD/MI/sederajat': [1,2,3,4,5,6],
    'SMP/MTs/sederajat': [7,8,9],
    'SMA/MA/sederajat': [10,11,12]
  };
  const SUBJECTS = ['Bahasa Arab','Nahwu','Siroh'];
  const TYPES = [
    ['PG','Pilihan Ganda'],['PGK','Pilihan Ganda Kompleks'],['BS','Benar-Salah'],
    ['MJ','Menjodohkan'],['IS','Isian Singkat'],['UR','Uraian'],['SK','Studi Kasus']
  ];
  const TYPE_LABELS = Object.fromEntries(TYPES);
  // Bentuk baris: [judul Latin/Indonesia, istilah Arab, kelompok, rekomendasi kelas paling awal, halaman buku (Nahwu)].
  const CATALOG = {
    'Bahasa Arab': [
      ['Huruf hijaiyah dan bunyinya','الحُرُوفُ الهِجَائِيَّةُ','Dasar Bahasa Arab',1],
      ['Harakat dan bacaan kata','الحَرَكَاتُ وَقِرَاءَةُ الكَلِمَاتِ','Dasar Bahasa Arab',1],
      ['Salam dan perkenalan / At-Ta’aruf','التَّعَارُفُ وَالتَّحِيَّاتُ','Percakapan',1],
      ['Angka dan bilangan / Al-Adad','العَدَدُ وَالأَرْقَامُ','Kosakata Tematik',1],
      ['Warna dan bentuk / Al-Alwan','الأَلْوَانُ وَالأَشْكَالُ','Kosakata Tematik',1],
      ['Anggota keluarga / Al-Usrah','الأُسْرَةُ','Kosakata Tematik',2],
      ['Anggota tubuh / A’dha al-Jism','أَعْضَاءُ الجِسْمِ','Kosakata Tematik',2],
      ['Benda di kelas / Fi al-Fashl','فِي الفَصْلِ','Kosakata Tematik',2],
      ['Hari, bulan, dan waktu','الأَيَّامُ وَالشُّهُورُ وَالوَقْتُ','Kosakata Tematik',3],
      ['Kegiatan sehari-hari / Al-Ansyithah al-Yaumiyyah','الأَنْشِطَةُ اليَوْمِيَّةُ','Percakapan',3],
      ['Makanan dan minuman / Ath-Tha’am wa asy-Syarab','الطَّعَامُ وَالشَّرَابُ','Kosakata Tematik',3],
      ['Rumah dan ruangannya / Al-Bait','البَيْتُ','Kosakata Tematik',4],
      ['Hobi dan olahraga / Al-Hiwayat','الهِوَايَاتُ وَالرِّيَاضَةُ','Kosakata Tematik',4],
      ['Profesi dan cita-cita / Al-Mihan','المِهَنُ','Kosakata Tematik',5],
      ['Tempat umum dan arah','الأَمَاكِنُ العَامَّةُ وَالاتِّجَاهَاتُ','Percakapan',5],
      ['Kata tunjuk / Ism Isyarah','اسْمُ الإِشَارَةِ','Struktur Bahasa',5],
      ['Kata ganti / Dhamir','الضَّمَائِرُ','Struktur Bahasa',6],
      ['Kegiatan sekolah dan jadwal','الأَنْشِطَةُ المَدْرَسِيَّةُ وَالجَدْوَلُ','Percakapan',7],
      ['Teks deskripsi sederhana / Washf','الوَصْفُ','Membaca & Menulis',7],
      ['Dialog membeli dan menjual / Al-Bai’ wa asy-Syira’','البَيْعُ وَالشِّرَاءُ','Percakapan',8],
      ['Kesehatan dan kebersihan / Ash-Shihhah','الصِّحَّةُ وَالنَّظَافَةُ','Kosakata Tematik',8],
      ['Teks petunjuk dan pengumuman','التَّعْلِيمَاتُ وَالإِعْلَانَاتُ','Membaca & Menulis',9],
      ['Surat dan pesan singkat / Risalah','الرِّسَالَةُ القَصِيرَةُ','Membaca & Menulis',9],
      ['Menyimpulkan isi bacaan','فَهْمُ المَقْرُوءِ وَتَلْخِيصُهُ','Membaca & Menulis',10],
      ['Menyampaikan pendapat dan alasan','التَّعْبِيرُ عَنِ الرَّأْيِ وَالسَّبَبِ','Membaca & Menulis',10],
      ['Teks narasi dan pengalaman / Sard','السَّرْدُ وَالتَّجْرِبَةُ','Membaca & Menulis',11],
      ['Membandingkan dua teks sederhana','مُقَارَنَةُ النُّصُوصِ','Membaca & Menulis',11],
      ['Memahami gagasan pokok dan rinci','الفِكْرَةُ الرَّئِيسِيَّةُ وَالتَّفَاصِيلُ','Membaca & Menulis',12]
    ],
    'Nahwu': [
      ['Pengantar ilmu Nahwu / Muqaddimah','مُقَدِّمَةُ عِلْمِ النَّحْوِ','Bab I • Pengantar Ilmu Nahwu',1,1],
      ['Unsur penyusun kalimat / Kalam','أَقْسَامُ الكَلِمَةِ','Bab I • Pengantar Ilmu Nahwu',3,6],
      ['Mengenal Fi’il','الفِعْلُ','Bab I • Pengantar Ilmu Nahwu',3,8],
      ['Fi’il Lazim dan Muta’addi','الفِعْلُ اللَّازِمُ وَالمُتَعَدِّي','Bab I • Pengantar Ilmu Nahwu',5,13],
      ['Fi’il Ma’lum dan Majhul','الفِعْلُ المَعْلُومُ وَالمَجْهُولُ','Bab I • Pengantar Ilmu Nahwu',6,14],
      ['Fi’il Shahih dan Mu’tal','الفِعْلُ الصَّحِيحُ وَالمُعْتَلُّ','Bab I • Pengantar Ilmu Nahwu',7,17],
      ['Mengenal Isim','الاسْمُ','Bab I • Pengantar Ilmu Nahwu',3,20],
      ['Mufrad, Tatsniyah, dan Jamak','المُفْرَدُ وَالمُثَنَّى وَالجَمْعُ','Bab I • Pengantar Ilmu Nahwu',4,22],
      ['Mudzakkar dan Muannats','المُذَكَّرُ وَالمُؤَنَّثُ','Bab I • Pengantar Ilmu Nahwu',4,27],
      ['Ma’rifah dan Nakirah','المَعْرِفَةُ وَالنَّكِرَةُ','Bab I • Pengantar Ilmu Nahwu',5,29],
      ['Munsharif dan Ghairu Munsharif','المُنْصَرِفُ وَغَيْرُ المُنْصَرِفِ','Bab I • Pengantar Ilmu Nahwu',8,35],
      ['Mu’rab dan Mabni','المُعْرَبُ وَالمَبْنِيُّ','Bab I • Pengantar Ilmu Nahwu',7,41],
      ['Huruf Jar','حُرُوفُ الجَرِّ','Bab I • Pengantar Ilmu Nahwu',5,45],
      ['Jumlah Fi’liyyah','الجُمْلَةُ الفِعْلِيَّةُ','Bab II • Kalimat Inti',6,54],
      ['Pola Fi’il Lazim','جُمْلَةُ الفِعْلِ اللَّازِمِ','Bab II • Kalimat Inti',6,56],
      ['Fi’il Madhi dalam kalimat','الفِعْلُ المَاضِي','Bab II • Kalimat Inti',5,59],
      ['Fi’il Mudhari dalam kalimat','الفِعْلُ المُضَارِعُ','Bab II • Kalimat Inti',6,72],
      ['Fi’il Amr dalam kalimat','فِعْلُ الأَمْرِ','Bab II • Kalimat Inti',6,80],
      ['Pola Fi’il Muta’addi','جُمْلَةُ الفِعْلِ المُتَعَدِّي','Bab II • Kalimat Inti',7,81],
      ['Jumlah Ismiyyah','الجُمْلَةُ الاسْمِيَّةُ','Bab II • Kalimat Inti',5,107],
      ['Jumlah Ismiyyah — Mufrad','الجُمْلَةُ الاسْمِيَّةُ لِلْمُفْرَدِ','Bab II • Kalimat Inti',6,113],
      ['Jumlah Ismiyyah — Tatsniyah','الجُمْلَةُ الاسْمِيَّةُ لِلْمُثَنَّى','Bab II • Kalimat Inti',7,115],
      ['Jumlah Ismiyyah — Jamak Salim','جَمْعُ السَّالِمِ','Bab II • Kalimat Inti',7,116],
      ['Jumlah Ismiyyah — Jamak Taksir','جَمْعُ التَّكْسِيرِ','Bab II • Kalimat Inti',8,117],
      ['Jar–Majrur','الجَارُّ وَالمَجْرُورُ','Bab III • Keterangan Tambahan',6,131],
      ['Mudhaf dan Mudhaf Ilaih','المُضَافُ وَالمُضَافُ إِلَيْهِ','Bab III • Keterangan Tambahan',7,134],
      ['Na’at / Sifat','النَّعْتُ','Bab III • Keterangan Tambahan',7,139],
      ['Athaf dan Ma’thuf','العَطْفُ وَالمَعْطُوفُ','Bab III • Keterangan Tambahan',8,143],
      ['Badal','البَدَلُ','Bab III • Keterangan Tambahan',9,146],
      ['Taukid','التَّوْكِيدُ','Bab III • Keterangan Tambahan',9,152],
      ['Maf’ul Muthlaq','المَفْعُولُ المُطْلَقُ','Bab III • Keterangan Tambahan',9,155],
      ['Dzharaf Zaman dan Makan','ظَرْفُ الزَّمَانِ وَظَرْفُ المَكَانِ','Bab III • Keterangan Tambahan',8,158],
      ['Haal','الحَالُ','Bab III • Keterangan Tambahan',9,165],
      ['Tamyiz','التَّمْيِيزُ','Bab III • Keterangan Tambahan',10,170],
      ['Maf’ul Min Ajlih','المَفْعُولُ لِأَجْلِهِ','Bab III • Keterangan Tambahan',10,174],
      ['Maf’ul Ma’ah','المَفْعُولُ مَعَهُ','Bab III • Keterangan Tambahan',10,178],
      ['Khabar Majemuk','الخَبَرُ غَيْرُ المُفْرَدِ','Bab IV • Variasi Kalimat',9,186],
      ['Mubtada Nakirah','المُبْتَدَأُ النَّكِرَةُ','Bab IV • Variasi Kalimat',9,191],
      ['An-Nawasikh','النَّوَاسِخُ','Bab IV • Variasi Kalimat',10,195],
      ['Kana wa Akhawatuha','كَانَ وَأَخَوَاتُهَا','Bab IV • Variasi Kalimat',10,197],
      ['Inna wa Akhawatuha','إِنَّ وَأَخَوَاتُهَا','Bab IV • Variasi Kalimat',10,200],
      ['Zhanna wa Akhawatuha','ظَنَّ وَأَخَوَاتُهَا','Bab IV • Variasi Kalimat',11,202],
      ['Laa Nafiyah','لَا النَّافِيَةُ','Bab IV • Variasi Kalimat',10,208],
      ['Istitsna / Pengecualian','الاسْتِثْنَاءُ','Bab IV • Variasi Kalimat',11,214],
      ['Munada / Panggilan','المُنَادَى','Bab IV • Variasi Kalimat',10,219],
      ['Kalimat pasif','المَبْنِيُّ لِلْمَجْهُولِ','Bab IV • Variasi Kalimat',10,222],
      ['Jumlah Fi’liyyah Manshub','الفِعْلُ المُضَارِعُ المَنْصُوبُ','Bab IV • Variasi Kalimat',11,226],
      ['Jumlah Fi’liyyah Majzum','الفِعْلُ المُضَارِعُ المَجْزُومُ','Bab IV • Variasi Kalimat',11,232],
      ['Mabni pada fi’il dan isim','المَبْنِيُّ فِي الفِعْلِ وَالاسْمِ','Bab V • Mu’rab dan Mabni',10,242],
      ['Mu’rab: Marfu’, Manshub, Majrur, Majzum','المَرْفُوعُ وَالمَنْصُوبُ وَالمَجْرُورُ وَالمَجْزُومُ','Bab V • Mu’rab dan Mabni',10,245],
      ['Pengantar I’rab','مُقَدِّمَةُ الإِعْرَابِ','Bab VI • Latihan I’rab',10,259],
      ['I’rab Lafzhi dengan harakat','الإِعْرَابُ اللَّفْظِيُّ بِالْحَرَكَاتِ','Bab VI • Latihan I’rab',10,263],
      ['I’rab Lafzhi dengan huruf','الإِعْرَابُ اللَّفْظِيُّ بِالْحُرُوفِ','Bab VI • Latihan I’rab',11,266],
      ['I’rab Taqdiri','الإِعْرَابُ التَّقْدِيرِيُّ','Bab VI • Latihan I’rab',11,270],
      ['I’rab kata Mabni','إِعْرَابُ الكَلِمَةِ المَبْنِيَّةِ','Bab VI • Latihan I’rab',11,273],
      ['I’rab Khabar Ghairu Mufrad','إِعْرَابُ الخَبَرِ غَيْرِ المُفْرَدِ','Bab VI • Latihan I’rab',12,276],
      ['I’rab Fi’il Madhi, Mudhari, dan Amr','إِعْرَابُ الأَفْعَالِ','Bab VI • Latihan I’rab',11,278],
      ['Latihan I’rab: kalimat dan kutipan','تَدْرِيبَاتُ الإِعْرَابِ','Bab VI • Latihan I’rab',12,286]
    ],
    'Siroh': [
      ['Arab sebelum Islam / Al-Arab Qabla al-Islam','العَرَبُ قَبْلَ الإِسْلَامِ','Latar Sejarah',1],
      ['Kota Makkah dan Ka’bah','مَكَّةُ وَالكَعْبَةُ','Latar Sejarah',1],
      ['Nasab dan keluarga Nabi Muhammad ﷺ','نَسَبُ النَّبِيِّ مُحَمَّدٍ ﷺ وَأُسْرَتُهُ','Masa Awal',1],
      ['Kelahiran dan masa kecil Rasulullah ﷺ','مَوْلِدُ الرَّسُولِ ﷺ وَطُفُولَتُهُ','Masa Awal',1],
      ['Sifat amanah dan keteladanan Nabi ﷺ','أَمَانَةُ النَّبِيِّ ﷺ وَأَخْلَاقُهُ','Masa Awal',2],
      ['Pernikahan dengan Khadijah r.a.','زَوَاجُ النَّبِيِّ ﷺ مِنْ خَدِيجَةَ','Masa Awal',3],
      ['Wahyu pertama di Gua Hira','نُزُولُ الوَحْيِ الأَوَّلِ','Periode Makkah',3],
      ['Dakwah secara sembunyi dan terbuka','الدَّعْوَةُ السِّرِّيَّةُ وَالجَهْرِيَّةُ','Periode Makkah',4],
      ['Orang-orang yang pertama masuk Islam','السَّابِقُونَ إِلَى الإِسْلَامِ','Periode Makkah',4],
      ['Tantangan dakwah di Makkah','الابْتِلَاءَاتُ فِي مَكَّةَ','Periode Makkah',5],
      ['Hijrah ke Habasyah','الهِجْرَةُ إِلَى الحَبَشَةِ','Periode Makkah',5],
      ['Tahun Kesedihan dan dakwah di Thaif','عَامُ الحُزْنِ وَالدَّعْوَةُ فِي الطَّائِفِ','Periode Makkah',6],
      ['Isra dan Mi’raj','الإِسْرَاءُ وَالمِعْرَاجُ','Periode Makkah',6],
      ['Baiat Aqabah dan persiapan hijrah','بَيْعَةُ العَقَبَةِ','Periode Makkah',7],
      ['Hijrah Nabi ﷺ ke Madinah','هِجْرَةُ النَّبِيِّ ﷺ إِلَى المَدِينَةِ','Periode Madinah',6],
      ['Pembangunan Masjid Nabawi','بِنَاءُ المَسْجِدِ النَّبَوِيِّ','Periode Madinah',7],
      ['Muhajirin dan Anshar','المُهَاجِرُونَ وَالأَنْصَارُ','Periode Madinah',7],
      ['Kesepakatan hidup bersama di Madinah','مِيثَاقُ المَدِينَةِ','Periode Madinah',8],
      ['Perang Badar: latar dan pelajaran','غَزْوَةُ بَدْرٍ','Periode Madinah',8],
      ['Perang Uhud: latar dan pelajaran','غَزْوَةُ أُحُدٍ','Periode Madinah',8],
      ['Perang Khandaq: latar dan pelajaran','غَزْوَةُ الخَنْدَقِ','Periode Madinah',9],
      ['Perjanjian Hudaibiyah','صُلْحُ الحُدَيْبِيَةِ','Periode Madinah',9],
      ['Surat dakwah kepada para pemimpin','رَسَائِلُ الدَّعْوَةِ','Periode Madinah',10],
      ['Fathu Makkah / Pembebasan Makkah','فَتْحُ مَكَّةَ','Periode Madinah',9],
      ['Haji Wada dan pesan Rasulullah ﷺ','حَجَّةُ الوَدَاعِ','Akhir Kehidupan',10],
      ['Wafat Rasulullah ﷺ','وَفَاةُ الرَّسُولِ ﷺ','Akhir Kehidupan',10],
      ['Metode dakwah dan kepemimpinan Rasul ﷺ','مَنْهَجُ الدَّعْوَةِ وَالقِيَادَةِ','Analisis Siroh',11],
      ['Hikmah sejarah dan penerapannya','العِبَرُ وَالدُّرُوسُ مِنَ السِّيرَةِ','Analisis Siroh',11],
      ['Menilai keandalan sumber riwayat Siroh','نَقْدُ مَصَادِرِ السِّيرَةِ','Analisis Siroh',12]
    ]
  };
  const SKILLS = {
    'Bahasa Arab': [
      ['Mufradat','Mengenali dan menggunakan kosakata (المُفْرَدَاتُ)'],
      ['Qiraah','Membaca dan memahami teks tertulis (القِرَاءَةُ)'],
      ['Kitabah','Menulis kata, frasa, atau kalimat (الكِتَابَةُ)'],
      ['Hiwar','Memahami atau menyusun dialog tertulis (الحِوَارُ)'],
      ['Tarakib','Menggunakan struktur kalimat sederhana (التَّرَاكِيبُ)'],
      ['Istidlal','Menafsirkan makna tersirat pada teks sesuai kelas (الاسْتِدْلَالُ)']
    ],
    'Nahwu': [
      ['Ta’rif','Mengenali istilah dan ciri kaidah (التَّعْرِيفُ)'],
      ['Tamyiz','Membedakan unsur dan fungsi kata (التَّمْيِيزُ)'],
      ['Tarkib','Menyusun kalimat sesuai kaidah (التَّرْكِيبُ)'],
      ['I’rab','Menentukan kedudukan dan tanda i’rab (الإِعْرَابُ)'],
      ['Tashhih','Memperbaiki kesalahan susunan (التَّصْحِيحُ)'],
      ['Tahlil','Menganalisis alasan penerapan kaidah (التَّحْلِيلُ)']
    ],
    'Siroh': [
      ['Fakta','Mengidentifikasi tokoh, tempat, dan peristiwa sejarah'],
      ['Kronologi','Mengurutkan rangkaian peristiwa secara tepat'],
      ['Sebab-akibat','Menjelaskan latar, sebab, dan dampak peristiwa'],
      ['Keteladanan','Menemukan nilai dan keteladanan yang relevan'],
      ['Sumber','Membedakan fakta kuat, riwayat berbeda, dan dugaan'],
      ['Analisis','Menganalisis pilihan, strategi, dan hikmah peristiwa']
    ]
  };
  const START_QUANTITIES = () => ({PG:15,PGK:0,BS:0,MJ:0,IS:5,UR:5,SK:0});
  const DEFAULT = () => ({ grade:'SD/MI/sederajat', classLevel:4, subject:'Bahasa Arab', topic:'', customTopic:'', ability:'', customAbility:'', quantities:START_QUANTITIES(), types:['PG','IS','UR'], count:25, stimulus:'per', perGroup:3, output:'docx', includeKey:true, includeExplanation:true, notes:'' });
  // Satu sumber kebenaran: jumlah tiap bentuk. Checkbox hanya indikator, bukan input.
  function recalcQuantities(s){
    s.types=TYPES.filter(([k])=>Number(s.quantities[k])>0).map(([k])=>k);
    s.count=TYPES.reduce((sum,[k])=>sum+(Number.isFinite(Number(s.quantities[k]))?Number(s.quantities[k]):0),0);
    return s;
  }
  const starts = (subject, cls) => CATALOG[subject].filter(item => item[3] <= cls);
  const topicId = (subject, index) => `${subject === 'Bahasa Arab' ? 'BA' : subject === 'Nahwu' ? 'NH' : 'SR'}-${String(index+1).padStart(2,'0')}`;
  const availableTopics = (subject) => CATALOG[subject].map((row,index) => ({id:topicId(subject,index),name:row[0],arabic:row[1],group:row[2],recommendedFrom:row[3],bookPage:row[4] || null}));
  function currentTopic(s){ return s.topic==='OTHER' ? {id:'OTHER',name:s.customTopic.trim(),arabic:'',group:'Materi pilihan guru',recommendedFrom:1,bookPage:null} : availableTopics(s.subject).find(x=>x.id===s.topic); }
  function validate(s) {
    const errors=[];
    if (!Object.prototype.hasOwnProperty.call(GRADES,s.grade)) errors.push('Pilih jenjang yang tersedia.');
    if (!GRADES[s.grade]?.includes(s.classLevel)) errors.push('Kelas belum sesuai dengan jenjang.');
    if (!SUBJECTS.includes(s.subject)) errors.push('Pilih mata pelajaran yang tersedia.');
    if (!availableTopics(s.subject).some(x=>x.id===s.topic) && s.topic!=='OTHER') errors.push('Pilih materi pembelajaran.');
    if (s.topic==='OTHER' && (s.customTopic.trim().length<3 || s.customTopic.trim().length>160)) errors.push('Isi materi lainnya (3–160 karakter).');
    if (s.ability==='OTHER') {
      if(typeof s.customAbility!=='string' || s.customAbility.trim().length<3 || s.customAbility.trim().length>160) errors.push('Isi kemampuan lainnya (3–160 karakter).');
    } else if (!SKILLS[s.subject]?.some(x=>x[0]===s.ability)) errors.push('Pilih kemampuan yang akan diukur.');
    if (!s.quantities || TYPES.some(([k])=>!Number.isInteger(s.quantities[k]) || s.quantities[k]<0 || s.quantities[k]>100)) errors.push('Jumlah tiap bentuk harus bilangan bulat 0–100.');
    const total=TYPES.reduce((sum,[k])=>sum+(Number.isFinite(s.quantities?.[k])?s.quantities[k]:0),0);
    if (!Number.isInteger(total) || total<1 || total>100) errors.push('Jumlah total soal harus 1–100.');
    if (!['per','shared'].includes(s.stimulus)) errors.push('Pilihan stimulus tidak valid.');
    if (s.stimulus==='shared' && (s.count<2 || !Number.isInteger(s.perGroup) || s.perGroup<2 || s.perGroup>5)) errors.push('Stimulus bersama memerlukan minimal 2 soal, dengan 2–5 soal per stimulus.');
    if (!['text','docx'].includes(s.output)) errors.push('Pilih format keluaran.');
    if (typeof s.includeKey!=='boolean' || typeof s.includeExplanation!=='boolean') errors.push('Pilihan kunci/pembahasan tidak valid.');
    if (typeof s.notes!=='string' || s.notes.length>3000) errors.push('Instruksi tambahan maksimal 3.000 karakter.');
    return [...new Set(errors)];
  }
  function groups(count,per) {
    // Hindari stimulus dengan satu soal saat pengguna memilih mode bersama.
    if (count<2) return [];
    const a=[];let remaining=count;
    while(remaining>0){let size=Math.min(per,remaining);if(remaining-size===1){if(size>2)size--;else if(a.length){a[a.length-1]++;remaining--;continue;}else size=remaining;}a.push(size);remaining-=size;}
    return a;
  }
  function distribution(s){return Object.fromEntries(TYPES.filter(([k])=>s.quantities[k]>0).map(([k])=>[k,s.quantities[k]]));}
  function buildPrompt(s) {
    const errs=validate(s);if(errs.length)throw new Error(errs.join('\n'));
    const topic=currentTopic(s),skill=s.ability==='OTHER'?['OTHER',s.customAbility.trim()+' (rumusan kemampuan guru)']:SKILLS[s.subject].find(x=>x[0]===s.ability);
    const amount=distribution(s);const summary=Object.entries(amount).map(([k,v])=>`${TYPE_LABELS[k]}: ${v} soal`).join('; ');
    const conditional={
      'Bahasa Arab': `KHUSUS BAHASA ARAB\n- Susun soal berdasarkan keterampilan berbahasa, kosakata, konteks, dan tingkat kelas, bukan menurut kisi-kisi mapel lain.\n- Gunakan aksara Arab yang benar, arah baca kanan-ke-kiri, dan harakat secukupnya untuk mencegah ambiguitas; jangan menulis Arab dengan karakter yang terbalik.\n- Pastikan kesesuaian mufradat, dhamir, mudzakkar/muannats, dan struktur kalimat.\n- Jika fokusnya maharah istima' (menyimak) atau kalam (berbicara), tes tertulis saja tidak boleh diklaim sebagai pengukuran kemampuan performatif tersebut tanpa audio/observasi.\n- Sesuaikan panjang teks, penggunaan bahasa Indonesia, dan variasi respons dengan kelas ${s.classLevel}.`,
      'Nahwu': `KHUSUS ILMU NAHWU\n- Nilai dengan kaidah Nahwu yang tepat: fungsi sintaksis, tanda i'rab, kedudukan kata, pola jumlah dan hubungan antarkata. Bedakan dari pembahasan Sharaf jika tidak diperlukan.\n- Sediakan kalimat Arab lengkap dan berharakat secukupnya; jika lebih dari satu i'rab dapat diterima, jelaskan konteks atau buat kalimat yang tidak ambigu.\n- Soal analisis i'rab harus memeriksa faktor ('amil), posisi, hukum, tanda, dan alasan sesuai tingkat kelas; jangan sekadar menghafal istilah.\n- Sumber daftar isi: "Ilmu Nahwu untuk Pemula", Abu Razin & Ummu Razin (programbisa.com). Lampiran yang tersedia bagi pembuat PG HANYA DAFTAR ISI, bukan isi buku. Jangan mengklaim kutipan, contoh, atau kaidah spesifik bersumber dari halaman buku jika isinya belum dibaca. Jika guru melampirkan buku lengkap nanti, verifikasi kesesuaian materi.\n${topic.bookPage?`- Indeks daftar isi: ${topic.group}; judul topik berada pada halaman buku ${topic.bookPage}. Ini penunjuk lokasi, bukan bukti bahwa teks halaman telah diperiksa.`:'- Topik ini belum memiliki halaman rujukan yang diverifikasi.'}`,
      'Siroh': `KHUSUS SIROH NABAWIYAH\n- Uji pemahaman peristiwa, kronologi, aktor, sebab-akibat, nilai, dan keteladanan berdasarkan sumber sejarah Islam yang dapat dipertanggungjawabkan.\n- Hindari kisah populer tanpa dasar, dialog rekaan yang disajikan sebagai kutipan sejarah, dan tanggal/tahun yang tidak dapat dipastikan. Jika ada perbedaan riwayat yang signifikan, nyatakan dengan proporsional atau pilih fakta yang lebih pasti.\n- Bedakan fakta historis, penafsiran, dan pelajaran moral; jangan menyatakan dugaan sebagai kepastian. Rujukan ayat/hadis hanya bila dapat diverifikasi; jangan mengarang sanad atau nomor hadis.\n- Jangan menggambar atau menggambarkan sosok Nabi Muhammad ﷺ maupun nabi-nabi lain. Bila dibutuhkan stimulus visual, gunakan peta sederhana, linimasa, atau bagan tanpa penggambaran sosok nabi.\n- Untuk kelas rendah, fokus pada urutan, pemahaman, dan teladan yang konkret. Kelas tinggi dapat menilai sumber, konteks, dan dampak secara kritis.\n- Katalog Siroh ini merupakan susunan awal Edumind untuk latihan, bukan daftar materi resmi yang telah diverifikasi.`
    };
    const rules={
      PG:'Pilihan Ganda (PG): buat empat opsi A–D, tepat satu jawaban benar, pengecoh masuk akal, semua opsi setara bentuknya.',
      PGK:'Pilihan Ganda Kompleks: buat empat opsi A–D, tepat dua benar dan dua salah. Petunjuk: "Pilih semua jawaban yang benar."',
      BS:'Benar-Salah: satu nomor soal terdiri atas tiga pernyataan independen, masing-masing dapat ditetapkan Benar atau Salah secara objektif.',
      MJ:'Menjodohkan: satu nomor terdiri atas empat pasangan dari kolom kiri dan lima alternatif di kolom kanan (satu pengecoh). Setiap pasangan memiliki satu padanan yang jelas.',
      IS:'Isian Singkat: beri satu jawaban ringkas yang dapat diperiksa, disertai aturan variasi jawaban yang setara bila perlu.',
      UR:'Uraian: beri tugas dengan batas jawaban yang jelas, kriteria isi, dan rubrik penskoran ringkas.',
      SK:'Studi Kasus: berikan situasi/teks/data yang relevan mapel, lalu satu pertanyaan analitis yang dapat dinilai dengan rubrik. Studi kasus Siroh tidak boleh mengada-ada sebagai fakta sejarah.'
    };
    const chunks=[
      `PERAN\nAnda adalah penyusun bank soal pendidikan Islam yang menguasai ${s.subject}, pembelajaran sesuai perkembangan murid, bahasa Arab, dan penilaian yang akurat. Buat bank soal ORIGINAL untuk guru, BUKAN soal resmi atau bocoran ujian. Hasilnya DRAF yang wajib ditelaah guru sebelum digunakan.`,
      `IDENTITAS & SASARAN\nJenjang: ${s.grade}\nKelas: ${s.classLevel}\nMata pelajaran: ${s.subject}\nMateri: ${topic.name}${topic.arabic?' / '+topic.arabic:''}\nKemampuan: ${skill[1]}\nJumlah TOTAL: tepat ${s.count} nomor soal\nBentuk dan jumlah per bentuk: ${summary}\nPilihan stimulus: ${s.stimulus==='per'?'Stimulus terpisah jika dibutuhkan per soal':'Stimulus bersama untuk beberapa soal; estimasi pembagian '+groups(s.count,s.perGroup).join(' + ')+' nomor'}\nFormat keluaran: ${s.output==='docx'?'File Word (.docx) jika fitur AI mendukung':'Naskah teks langsung di percakapan AI'}`,
      `BATASAN AKADEMIK\n- Tidak menggunakan acuan, bentuk, kompetensi, atau klaim resmi dari mata pelajaran lain.\n- Materi dan kemampuan harus benar-benar sesuai karakter ${s.subject} dan wajar bagi kelas ${s.classLevel}. Jika materi terlalu tinggi atau terlalu mudah, sederhanakan tingkat tuntutan tanpa mengubah kaidah/fakta; berikan catatan singkat untuk guru.\n- Daftar materi dan rekomendasi kelas dalam PG adalah rancangan awal Edumind, bukan ketetapan kurikulum nasional atau pemetaan resmi buku.\n- Gunakan stimulus dan butir baru, akurat, beragam, tidak saling membocorkan jawaban. Hindari pertanyaan ambigu, kesalahan ejaan Arab, dan pilihan ganda dengan lebih dari satu kunci.\n- Bila tidak dapat memastikan sebuah informasi, nyatakan kebutuhan verifikasi, jangan membuat sumber atau kepastian palsu.`,
      conditional[s.subject],
      `ATURAN TUJUH BENTUK SOAL\n${s.types.map(t=>'- '+rules[t]).join('\n')}\n- Alokasikan tepat sesuai jumlah per bentuk yang ditentukan; satu nomor Benar-Salah atau Menjodohkan tetap dihitung sebagai SATU soal walau memiliki beberapa pernyataan/pasangan.\n- Variasikan stimulus yang relevan; soal tanpa stimulus khusus boleh digunakan bila kemampuan tidak memerlukannya.\n- Jika satu stimulus dipakai untuk banyak soal, tiap jawaban harus diperoleh langsung dari stimulus/pengetahuan sasaran, bukan dari jawaban soal lain.`,
      `KUNCI, PEMBAHASAN, DAN PENILAIAN\nSertakan kunci jawaban: ${s.includeKey?'YA':'TIDAK'}\nSertakan pembahasan: ${s.includeExplanation?'YA':'TIDAK'}\n- LEMBAR SISWA harus bersih dari kunci, petunjuk terselubung, dan pembahasan.\n- ${s.includeKey?'Di BAGIAN GURU, tulis kunci lengkap untuk tiap nomor. Untuk PGK sebut semua opsi benar, untuk Benar-Salah sebut tiap pernyataan, untuk Menjodohkan berikan pasangan yang tepat.':'JANGAN menampilkan kunci atau penanda opsi benar di keluaran mana pun; tetap periksa secara internal.'}\n- ${s.includeExplanation?'Di BAGIAN GURU, sertakan pembahasan ringkas yang membuktikan jawaban; untuk nahwu tunjukkan alasan kaidah, untuk Siroh jelaskan dasar peristiwa yang dapat diverifikasi.':'JANGAN menampilkan pembahasan, pembuktian jawaban, atau langkah penyelesaian pada keluaran.'}\n- Cantumkan rubrik praktis untuk Uraian dan Studi Kasus hanya jika diperlukan untuk guru; jika kunci dan pembahasan keduanya dinonaktifkan, jangan bocorkan jawaban melalui rubrik.\n- Bila pembahasan diminta tanpa kunci, ingat bahwa pembahasan bisa secara tidak langsung mengungkap jawaban, tetapi jangan membuat daftar kunci tersendiri.`,
      `SUSUNAN OUTPUT\nA. LEMBAR SISWA: identitas kelas/mapel/materi, petunjuk bentuk soal, stimulus, dan ${s.count} nomor soal tanpa kunci atau pembahasan.\nB. BAGIAN GURU: kisi-kisi ringkas per nomor (materi, kemampuan, bentuk, alasan kesesuaian kelas), lalu kunci dan pembahasan HANYA jika dipilih.\nC. QC AWAL: hitung jumlah nomor dan bentuk, periksa bahasa Arab, akurasi fakta Siroh, konsistensi stimulus, ketepatan opsi/kunci/rubrik, serta keraguan yang perlu dicek guru. Jangan mengklaim "valid 100%".\n${s.output==='docx'?'Jika lingkungan AI dapat membuat DOCX, hasilkan file yang bisa diunduh. Jika tidak, berikan teks terstruktur untuk disalin ke Word, tanpa mengarang tautan unduhan.':'Tampilkan hasil sebagai naskah rapi, bukan kode aplikasi.'}\nTutup dengan: "Draf bank soal. Guru wajib memeriksa sebelum digunakan."`
    ];
    if(s.notes.trim()) chunks.splice(chunks.length-1,0,'INSTRUKSI TAMBAHAN GURU (TIDAK BOLEH MEMBATALKAN VALIDITAS AKADEMIK ATAU PENGATURAN KUNCI/PEMBAHASAN)\n'+s.notes.trim());
    return {text:chunks.join('\n\n────────────────────────────────────\n\n'),counts:amount,topic,ability:skill[1]};
  }
  // Gerbang akses sederhana. SHA-256 di sisi klien tidak setara autentikasi server.
  const CREDENTIAL_USER='edumind';
  const CREDENTIAL_SHA='990157d2189a61f4daf4ce867462e0cd7ec2c10055a138563060053e32a33874';
  async function sha256(text){if(global.crypto?.subtle){const bytes=new TextEncoder().encode(text);return [...new Uint8Array(await global.crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');}return simpleSHA256(text);}
  // Fallback SHA-256 untuk pratinjau file:// yang tidak mendukung WebCrypto.
  function simpleSHA256(ascii){const rightRotate=(v,n)=>v>>>n|v<<32-n;const maxWord=Math.pow(2,32);let result='';const words=[];const lengthProperty='length';let i,j;const asciiBitLength=unescape(encodeURIComponent(ascii)).length*8;ascii=unescape(encodeURIComponent(ascii));let hash=simpleSHA256.h||[],k=simpleSHA256.k||[],primeCounter=k[lengthProperty];const isComposite={};if(!primeCounter){for(let candidate=2;primeCounter<64;candidate++){if(!isComposite[candidate]){for(i=0;i<313;i+=candidate)isComposite[i]=candidate;hash[primeCounter]=(Math.pow(candidate,.5)*maxWord)|0;k[primeCounter++]=(Math.pow(candidate,1/3)*maxWord)|0;}}simpleSHA256.h=hash.slice(0);simpleSHA256.k=k.slice(0);}hash=hash.slice(0,8);ascii+='\x80';while(ascii[lengthProperty]%64-56)ascii+='\x00';for(i=0;i<ascii[lengthProperty];i++){j=ascii.charCodeAt(i);words[i>>2]|=j<<((3-i)%4)*8;}words[words[lengthProperty]]=Math.floor(asciiBitLength/maxWord);words[words[lengthProperty]]=asciiBitLength;for(j=0;j<words[lengthProperty];){const w=words.slice(j,j+=16);const oldHash=hash.slice(0);for(i=0;i<64;i++){const w15=w[i-15],w2=w[i-2];const a=hash[0],e=hash[4];const temp1=hash[7]+(rightRotate(e,6)^rightRotate(e,11)^rightRotate(e,25))+((e&hash[5])^(~e&hash[6]))+k[i]+(w[i]=(i<16)?w[i]:(w[i-16]+(rightRotate(w15,7)^rightRotate(w15,18)^(w15>>>3))+w[i-7]+(rightRotate(w2,17)^rightRotate(w2,19)^(w2>>>10)))|0);const temp2=(rightRotate(a,2)^rightRotate(a,13)^rightRotate(a,22))+((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));hash=[(temp1+temp2)|0].concat(hash);hash[4]=(hash[4]+temp1)|0;hash.pop();}for(i=0;i<8;i++)hash[i]=(hash[i]+oldHash[i])|0;}for(i=0;i<8;i++)for(j=3;j+1;j--){const b=hash[i]>>j*8&255;result+=(b<16?'0':'')+b.toString(16);}return result;}
  const API={version:VERSION,grades:GRADES,subjects:SUBJECTS,types:TYPES,catalog:CATALOG,skills:SKILLS,defaults:DEFAULT,availableTopics,currentTopic,validate,groups,distribution,buildPrompt,sha256};
  if(typeof module!=='undefined'&&module.exports)module.exports=API;
  if(!global.document)return;
  const doc=global.document;
  const boot=()=>{
    const root=doc.getElementById('edm-3mapel');if(!root || root.dataset.ready)return;
    root.dataset.ready='true';
    root.innerHTML=`
    <section id="pg-login" class="pg-login"><div class="pg-login-card">
      <img class="pg-logo" src="${LOGO}" alt="Edumind Academy">
      <p class="pg-eyebrow">PROMPT GENERATOR</p><h1>Bank Soal 3 Mapel</h1><p class="pg-muted">Bahasa Arab • Nahwu • Siroh</p>
      <form id="pg-login-form"><label for="pg-user">Username</label><input id="pg-user" autocomplete="username" maxlength="64" required placeholder="Masukkan username"><label for="pg-pass">Password</label><div class="pg-password"><input id="pg-pass" type="password" autocomplete="current-password" required placeholder="Masukkan password"><button id="pg-eye" type="button" aria-label="Tampilkan password">Lihat</button></div><p class="pg-error" id="pg-login-error" role="alert" hidden></p><button type="submit" class="pg-btn pg-btn-primary pg-full">Masuk Sistem <span aria-hidden="true">→</span></button></form>
      <footer class="pg-login-footer">© 2026 Edumind Academy<br>Gunakan dengan amanah untuk membantu pembelajaran.<br><a href="https://wa.me/6281385841500" target="_blank" rel="noopener noreferrer">WhatsApp resmi: 0813-8584-1500</a></footer>
    </div></section>
    <section id="pg-app" hidden><header class="pg-topbar"><div class="pg-bar-inner"><img src="${LOGO}" alt="Edumind Academy"><div class="pg-bar-title"><strong>Bank Soal Bahasa Arab, Nahwu & Siroh</strong><small>Prompt Generator • V${VERSION}</small></div><button id="pg-help" type="button">Panduan</button><button id="pg-logout" type="button" class="pg-quiet">Keluar</button></div></header>
      <main class="pg-workspace"><div class="pg-intro"><p class="pg-eyebrow">PERANGKAT GURU • EDUMIND ACADEMY</p><h1>Rancang soal dengan lebih mudah.</h1><p>Isi kebutuhan, buat prompt, lalu salin ke ChatGPT atau AI pilihan Anda.</p></div>
        <details class="pg-card pg-guide" id="pg-guide"><summary>Panduan penggunaan singkat</summary><p>Pilih jenjang, kelas, mata pelajaran, materi, dan kemampuan. Tentukan bentuk serta jumlah soal. Klik <strong>Buat Prompt</strong>, kemudian <strong>Salin Prompt</strong> dan tempelkan ke layanan AI.</p><p>PG ini membuat instruksi, bukan soal secara langsung. Periksa soal, bahasa Arab, kunci, dan sumber sebelum digunakan. Materi Bahasa Arab dan Siroh merupakan rancangan awal Edumind. Katalog Nahwu mengikuti daftar isi buku, bukan pemetaan kelas resmi.</p></details>
        <form id="pg-form" novalidate>
        <section class="pg-card pg-block-1"><h2><span class="pg-step">1</span>Jenjang & Mata Pelajaran</h2><div class="pg-grid pg-grid-3"><label>Jenjang<select id="pg-grade"></select></label><label>Kelas<select id="pg-class"></select></label><label>Mata pelajaran<select id="pg-subject"></select></label></div></section>
        <section class="pg-card pg-block-2"><h2><span class="pg-step">2</span>Materi & Kemampuan</h2><div class="pg-grid"><label class="pg-wide">Materi Pembelajaran<select id="pg-topic"></select></label><label class="pg-wide" id="pg-other-wrap" hidden>Materi Lainnya<input id="pg-other" maxlength="160" placeholder="Tulis materi pilihan guru"></label><label class="pg-wide">Kemampuan yang Diukur<select id="pg-ability"></select></label><label class="pg-wide" id="pg-ability-other-wrap" hidden>Kemampuan Lainnya<input id="pg-ability-other" maxlength="160" placeholder="Tulis kemampuan yang ingin diukur"></label></div><div class="pg-scope" id="pg-scope" aria-live="polite"></div></section>
        <section class="pg-card pg-block-3"><h2><span class="pg-step">3</span>Bentuk & Jumlah Soal</h2><fieldset class="pg-type-field"><legend>Bentuk Soal (7 Bentuk Modern)</legend><div class="pg-type-grid" id="pg-types" aria-label="Indikator bentuk soal, mengikuti jumlah soal per bentuk"></div></fieldset><fieldset class="pg-count-field"><legend>Jumlah Soal per Bentuk</legend><div class="pg-count-grid" id="pg-counts"></div></fieldset><div class="pg-grid pg-lower"><label>Penggunaan Stimulus<select id="pg-stimulus"><option value="per">Setiap soal mandiri</option><option value="shared">Satu stimulus untuk beberapa soal</option></select></label><label id="pg-per-wrap" hidden>Soal per Stimulus<select id="pg-per"><option value="2">2 soal</option><option value="3">3 soal</option><option value="4">4 soal</option><option value="5">5 soal</option></select></label><label class="pg-wide">Format Hasil dari AI<select id="pg-output"><option value="docx">File Word (.docx) siap diunduh</option><option value="text">Teks langsung di AI</option></select></label></div><fieldset class="pg-results"><legend>Sertakan dalam Hasil AI</legend><div class="pg-check-row"><label><input id="pg-key" type="checkbox" checked> Kunci Jawaban</label><label><input id="pg-explain" type="checkbox" checked> Pembahasan</label></div></fieldset></section>
        <section class="pg-card pg-block-4"><h2><span class="pg-step">4</span>Instruksi Tambahan <span class="pg-hint">(Opsional)</span></h2><label for="pg-notes">Kebutuhan khusus lainnya</label><textarea id="pg-notes" rows="8" maxlength="3000" placeholder="Contoh: Gunakan konteks sekolah Islam. Buatkan soal dengan teks Arab berharakat dan pembahasan singkat. Sesuaikan tingkat bahasa untuk kelas yang dipilih."></textarea></section>
        <section class="pg-card pg-block-5"><h2><span class="pg-step">5</span>Buat & Salin Prompt</h2><p id="pg-error" class="pg-error" role="alert" hidden></p><p id="pg-status" class="pg-notice" role="status" hidden></p><div class="pg-actions"><button id="pg-example" class="pg-btn pg-btn-soft" type="button">Muat Contoh</button><button id="pg-reset" class="pg-btn" type="button">Kosongkan Isian</button><button id="pg-generate" class="pg-btn pg-btn-green" type="submit">Buat Prompt <span aria-hidden="true">→</span></button></div><div class="pg-result-head"><h3>Prompt siap digunakan</h3><div class="pg-actions"><button id="pg-copy" class="pg-btn" type="button" disabled>Salin Prompt</button><button id="pg-download" class="pg-btn" type="button" disabled>Unduh TXT</button></div></div><p id="pg-meta" class="pg-meta">Prompt muncul setelah pilihan diisi.</p><textarea id="pg-result" readonly rows="12" aria-label="Prompt siap pakai" placeholder="Pilih kebutuhan Anda, lalu klik Buat Prompt."></textarea></section>
        </form><footer class="pg-bottom">Edumind Academy • Prompt Generator Bank Soal 3 Mapel V${VERSION}</footer>
      </main></section>`;
    const $=id=>root.querySelector('#pg-'+id);let s=DEFAULT();let signed=false;let locking=false;
    const notify=(id,str)=>{const el=$(id);el.textContent=str||'';el.hidden=!str;};
    const setOptions=(el,items,selected,placeholder)=>{el.replaceChildren();if(placeholder)el.add(new Option(placeholder,''));let lastGroup='',parent=el;for(const item of items){const val=typeof item==='string'?item:item.value;const label=typeof item==='string'?item:item.label;const g=typeof item==='string'?'':item.group;if(g && g!==lastGroup){parent=doc.createElement('optgroup');parent.label=g;el.append(parent);lastGroup=g;}else if(!g)parent=el;parent.append(new Option(label,val));}el.value=selected;};
    function refreshTopics(){const full=availableTopics(s.subject);const rec=full.filter(x=>x.recommendedFrom<=s.classLevel);const other=full.filter(x=>x.recommendedFrom>s.classLevel);const opt=[...rec.map(x=>({value:x.id,label:x.name+' / '+x.arabic,group:x.group})),...other.map(x=>({value:x.id,label:x.name+' / '+x.arabic,group:'Materi lanjutan • pilih jika sesuai kesiapan'})),{value:'OTHER',label:'Lainnya — tulis materi sendiri'}];
      // Append recommended and advanced while preserving academic catalog group names.
      setOptions($('topic'),opt,s.topic,'Pilih materi...');$('other-wrap').hidden=s.topic!=='OTHER';$('other').value=s.customTopic;
      const curr=currentTopic(s);
      if(!curr){$('scope').textContent='Pilih materi untuk menampilkan penjelasan singkat.';return;}
      let label=curr.recommendedFrom>s.classLevel?'Materi ini lazimnya lebih lanjut dari rekomendasi awal untuk kelas '+s.classLevel+'. Guru perlu menyesuaikan tingkat soal.':'Materi dapat disesuaikan untuk kelas '+s.classLevel+'.';
      if(s.subject==='Nahwu')label+=' Acuan daftar isi: '+curr.group+(curr.bookPage?', halaman buku '+curr.bookPage:'')+'. PDF rujukan berisi daftar isi saja; belum memuat isi kaidah.';
      else label+=' Katalog awal Edumind, dapat direvisi oleh guru.';
      $('scope').textContent=label;
    }
    function mountQuantities(){
      $('types').replaceChildren();$('counts').replaceChildren();
      for (const [key,name] of TYPES){
        const lab=doc.createElement('label');const cb=doc.createElement('input');cb.type='checkbox';cb.id='pg-type-'+key;cb.disabled=true;cb.tabIndex=-1;cb.setAttribute('aria-label',name+' (mengikuti jumlah soal)');lab.append(cb,doc.createTextNode(name));$('types').append(lab);
        const field=doc.createElement('label');field.className='pg-qty-label';field.htmlFor='pg-qty-'+key;
        const cap=doc.createElement('span');cap.textContent=key==='PGK'?'PG Kompleks':name;field.append(cap);
        const input=doc.createElement('input');input.id='pg-qty-'+key;input.type='number';input.inputMode='numeric';input.min='0';input.max='100';input.step='1';input.value=String(s.quantities[key]);field.append(input);$('counts').append(field);
        input.addEventListener('input',()=>{
          s.quantities[key]=input.value.trim()===''?0:Number(input.value);
          syncQuantityUI();invalidate();
        });
      }
      const total=doc.createElement('label');total.className='pg-total-label';total.htmlFor='pg-total';
      const cap=doc.createElement('span');cap.textContent='Jumlah Total';
      const num=doc.createElement('input');num.id='pg-total';num.type='text';num.readOnly=true;num.tabIndex=-1;num.setAttribute('aria-label','Jumlah Total Otomatis');
      total.append(cap,num);$('counts').append(total);
    }
    function syncQuantityUI(){
      recalcQuantities(s);
      for (const [key] of TYPES){
        const input=$('qty-'+key);if(input && doc.activeElement!==input)input.value=String(s.quantities[key]);
        const cb=$('type-'+key);if(cb)cb.checked=Number.isInteger(s.quantities[key]) && s.quantities[key]>0;
      }
      $('total').value=String(s.count);
      $('total').classList.toggle('pg-total-invalid',s.count<1||s.count>100||!Number.isInteger(s.count));
    }
    function render(full=false){setOptions($('grade'),Object.keys(GRADES),s.grade);setOptions($('class'),GRADES[s.grade].map(x=>({value:String(x),label:'Kelas '+x})),String(s.classLevel));setOptions($('subject'),SUBJECTS,s.subject);refreshTopics();setOptions($('ability'),[...SKILLS[s.subject].map(x=>({value:x[0],label:x[1]})),{value:'OTHER',label:'Lainnya — tulis kemampuan sendiri'}],s.ability,'Pilih kemampuan...');$('ability-other-wrap').hidden=s.ability!=='OTHER';$('ability-other').value=s.customAbility;syncQuantityUI();$('stimulus').value=s.stimulus;$('per').value=String(s.perGroup);$('per-wrap').hidden=s.stimulus!=='shared';$('output').value=s.output;$('key').checked=s.includeKey;$('explain').checked=s.includeExplanation;$('notes').value=s.notes;
      if(full){notify('error','');}}
    function invalidate(){if($('result').value){$('result').value='';$('copy').disabled=true;$('download').disabled=true;$('meta').textContent='Pilihan berubah. Klik Buat Prompt untuk memperbarui.';}notify('error','');notify('status','');}
    function openApp(){signed=true;$('login').hidden=true;$('app').hidden=false;root.classList.add('pg-open');$('grade').focus();}
    $('login-form').addEventListener('submit',async e=>{e.preventDefault();if(locking)return;locking=true;const btn=$('login-form').querySelector('button[type=submit]');btn.disabled=true;try{const ok=$('user').value.trim().toLowerCase()===CREDENTIAL_USER&&await sha256($('pass').value)===CREDENTIAL_SHA;if(!ok){notify('login-error','Username atau password belum sesuai.');$('pass').value='';return;}notify('login-error','');try{global.sessionStorage.setItem('edumind_banksoal_3mapel_v1',JSON.stringify({v:VERSION,until:Date.now()+12*3600000}));}catch(_){}$('pass').value='';openApp();}catch(_){notify('login-error','Login belum berhasil. Coba lagi.');}finally{locking=false;btn.disabled=false;}});
    $('eye').addEventListener('click',()=>{const show=$('pass').type==='password';$('pass').type=show?'text':'password';$('eye').textContent=show?'Tutup':'Lihat';$('eye').setAttribute('aria-label',show?'Sembunyikan password':'Tampilkan password');});
    $('logout').addEventListener('click',()=>{try{global.sessionStorage.removeItem('edumind_banksoal_3mapel_v1');}catch(_){}signed=false;s=DEFAULT();render(true);invalidate();$('app').hidden=true;$('login').hidden=false;root.classList.remove('pg-open');$('user').value='';$('pass').value='';$('user').focus();});
    $('help').addEventListener('click',()=>{$('guide').open=!$('guide').open;$('guide').scrollIntoView({behavior:'smooth',block:'center'});});
    $('grade').addEventListener('change',()=>{s.grade=$('grade').value;s.classLevel=GRADES[s.grade][0];s.topic='';s.customTopic='';s.ability='';s.customAbility='';render();invalidate();});
    $('class').addEventListener('change',()=>{s.classLevel=Number($('class').value);refreshTopics();invalidate();});
    $('subject').addEventListener('change',()=>{s.subject=$('subject').value;s.topic='';s.customTopic='';s.ability='';s.customAbility='';render();invalidate();});
    $('topic').addEventListener('change',()=>{s.topic=$('topic').value;if(s.topic!=='OTHER')s.customTopic='';refreshTopics();invalidate();});
    $('other').addEventListener('input',()=>{s.customTopic=$('other').value;invalidate();});
    $('ability').addEventListener('change',()=>{s.ability=$('ability').value;$('ability-other-wrap').hidden=s.ability!=='OTHER';invalidate();});
    $('ability-other').addEventListener('input',()=>{s.customAbility=$('ability-other').value;invalidate();});
    $('stimulus').addEventListener('change',()=>{s.stimulus=$('stimulus').value;$('per-wrap').hidden=s.stimulus!=='shared';invalidate();});
    $('per').addEventListener('change',()=>{s.perGroup=Number($('per').value);invalidate();});
    $('output').addEventListener('change',()=>{s.output=$('output').value;invalidate();});
    $('key').addEventListener('change',()=>{s.includeKey=$('key').checked;invalidate();});
    $('explain').addEventListener('change',()=>{s.includeExplanation=$('explain').checked;invalidate();});
    $('notes').addEventListener('input',()=>{s.notes=$('notes').value;invalidate();});
    $('form').addEventListener('submit',e=>{e.preventDefault();if(!signed)return;try{const built=buildPrompt(s);$('result').value=built.text;$('result').scrollTop=0;$('copy').disabled=false;$('download').disabled=false;$('meta').textContent=`${s.count} soal • Kelas ${s.classLevel} • ${s.subject} • ${s.types.length} bentuk soal`;notify('error','');notify('status','Prompt siap. Salin ke layanan AI lalu periksa hasilnya.');$('result').focus();}catch(err){notify('error',err.message);notify('status','');$('error').scrollIntoView({behavior:'smooth',block:'center'});}});
    $('copy').addEventListener('click',async()=>{if(!$('result').value)return;try{if(!global.navigator.clipboard?.writeText)throw Error();await global.navigator.clipboard.writeText($('result').value);notify('status','Prompt berhasil disalin.');}catch(_){$('result').focus();$('result').select();let ok=false;try{ok=doc.execCommand('copy');}catch(_){}notify('status',ok?'Prompt berhasil disalin.':'Prompt sudah dipilih. Tekan Ctrl+C untuk menyalin.');}});
    $('download').addEventListener('click',()=>{if(!$('result').value)return;const b=new Blob(['\ufeff'+$('result').value],{type:'text/plain;charset=utf-8'});const u=URL.createObjectURL(b);const a=doc.createElement('a');a.href=u;a.download=`EDUMIND_PG_BANKSOAL_${s.subject.toUpperCase().replace(/\s/g,'_')}_KELAS_${s.classLevel}.txt`;root.append(a);a.click();a.remove();global.setTimeout(()=>URL.revokeObjectURL(u),1000);});
    $('reset').addEventListener('click',()=>{if(!global.confirm('Kosongkan seluruh pilihan dan prompt?'))return;s=DEFAULT();render(true);invalidate();$('result').value='';$('copy').disabled=true;$('download').disabled=true;$('meta').textContent='Prompt muncul setelah pilihan diisi.';});
    $('example').addEventListener('click',()=>{const grade=s.grade,cl=s.classLevel,subject=s.subject;s={...DEFAULT(),grade,classLevel:cl,subject,topic:availableTopics(subject).filter(x=>x.recommendedFrom<=cl)[0]?.id||availableTopics(subject)[0].id,ability:SKILLS[subject][subject==='Nahwu'?1:subject==='Siroh'?1:0][0],quantities:{PG:3,PGK:0,BS:2,MJ:0,IS:0,UR:1,SK:0},notes:subject==='Siroh'?'Gunakan bahasa yang santun, sertakan linimasa sederhana, dan hindari riwayat lemah.':subject==='Nahwu'?'Gunakan contoh kalimat Arab berharakat yang tidak ambigu.':'Gunakan mufradat dalam kalimat singkat sesuai kelas.'};render(true);invalidate();notify('status','Contoh terisi. Anda dapat mengubahnya lalu klik Buat Prompt.');});
    mountQuantities();render(true);try{const session=JSON.parse(global.sessionStorage.getItem('edumind_banksoal_3mapel_v1')||'null');if(session?.v===VERSION&&session.until>Date.now())openApp();}catch(_){}
  };
  if(doc.readyState==='loading')doc.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})(typeof window!=='undefined'?window:globalThis);
