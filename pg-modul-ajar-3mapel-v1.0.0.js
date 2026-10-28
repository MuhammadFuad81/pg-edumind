/* Edumind Academy — Prompt Generator Modul Ajar Bahasa Arab, Nahwu & Siroh
 * V1.0.0 | 28 Oktober 2026. HTML+CSS di WSP, JS di root GitHub/jsDelivr.
 * Membuat PROMPT, bukan menyusun DOCX langsung atau menghubungi API AI.
 * Materi Bahasa Arab/Siroh adalah rancangan awal; Nahwu disarikan dari daftar isi buku
 * Ilmu Nahwu untuk Pemula (Abu Razin & Ummu Razin), BUKAN dari teks lengkap buku.
 * Gerbang login di browser bukan autentikasi server / proteksi akses berbayar.
 */
(function(global){
  'use strict';
  const VERSION='1.0.0';
  const LOGO='https://growva.biz.id/gambarbebas/20260728-075640_Logo%20Edumind%20Academy%20-%20Terbaru2026%20-%20untuk%20webbook.png';
  const GRADES={'SD/MI/sederajat':[1,2,3,4,5,6],'SMP/MTs/sederajat':[7,8,9],'SMA/MA/sederajat':[10,11,12]};
  const SUBJECTS=['Bahasa Arab','Nahwu','Siroh'];
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

  const PROFILES=['Keimanan dan Ketakwaan terhadap Tuhan YME','Kewargaan','Penalaran Kritis','Kreativitas','Kolaborasi','Kemandirian','Kesehatan','Komunikasi'];
  const METHODS=['Ceramah Interaktif','Tanya Jawab','Diskusi','Membaca & Menelaah','Demonstrasi & Praktik','Hafalan Bermakna','Kisah & Keteladanan','Bermain Peran','Penugasan','Proyek','Lainnya'];
  const PARTNERS=['Lingkungan sekolah (guru & warga sekolah)','Orang tua/keluarga','Komunitas/masyarakat sekitar'];
  const ATTACHMENTS=['Bahan Ajar','Lembar Kerja Peserta Didik (LKPD)','Rubrik Penilaian','Lainnya'];
  const APPROACHES=['Pembelajaran Mendalam dan Berdiferensiasi','Pembelajaran Mendalam','Pembelajaran Berdiferensiasi','Komunikatif / CLT','Kontekstual / CTL','TaRL (Teaching at the Right Level)','Lainnya'];
  const MODELS=['Problem Based Learning (PBL)','Project Based Learning (PjBL)','Cooperative Learning','Discovery Learning','Inquiry Learning','Direct Instruction','Task-Based Language Teaching','Storytelling / Pembelajaran Kisah','Lainnya'];
  const PREFIX={ 'Bahasa Arab':'BA','Nahwu':'NH','Siroh':'SR' };
  const phaseOf=(n)=>n<=2?'A':n<=4?'B':n<=6?'C':n<=9?'D':n===10?'E':'F';
  function allTopics(sub){return (CATALOG[sub]||[]).map((r,i)=>({id:PREFIX[sub]+'-'+String(i+1).padStart(2,'0'),name:r[0],arabic:r[1],group:r[2],recommendedFrom:r[3],bookPage:r[4]||null}));}
  function defaultState(){return {author:'',role:'',school:'',grade:'SMP/MTs/sederajat',classLevel:7,subject:'Bahasa Arab',year:'2026/2027',semester:'I (Ganjil)',chapter:1,topic:'',otherTopic:'',focus:'',otherFocus:'',meetings:1,jp:2,minutes:40,target:'Peserta Didik Reguler/Tipikal',students:30,baseline:'',profiles:[PROFILES[0],PROFILES[2],PROFILES[4],PROFILES[5],PROFILES[7]],sourceType:'cp',sourceName:'',elements:'',cp:'',approach:APPROACHES[0],approachOther:'',model:MODELS[2],modelOther:'',methods:['Ceramah Interaktif','Tanya Jawab','Diskusi','Membaca & Menelaah'],methodOther:'',partners:[PARTNERS[0],PARTNERS[1]],media:'',materialLink:'',videoLink:'',attachments:ATTACHMENTS.slice(0,3),attachmentOther:'',references:'',principal:'',nipPrincipal:'',nipTeacher:'',notes:'',output:'docx'};}
  const clean=(v)=>String(v??'').trim();
  const selected=(s,arr)=>arr.filter(x=>s.includes(x));
  const proper=(s)=>clean(s).replace(/\s+/g,' ');
  const topicOf=(s)=>s.topic==='OTHER'?{name:clean(s.otherTopic),arabic:'',group:'Materi pilihan guru',recommendedFrom:1}:allTopics(s.subject).find(t=>t.id===s.topic);
  const focusOf=(s)=>s.focus==='OTHER'?clean(s.otherFocus):(SKILLS[s.subject]||[]).find(a=>a[0]===s.focus)?.[1]||'';
  const optionOf=(value,other)=>value==='Lainnya'?clean(other):value;
  const listOf=(items,other)=>items.map(x=>x==='Lainnya'?clean(other):x).filter(Boolean);
  function durations(s){const total=s.meetings*s.jp*s.minutes;const init=Math.max(5,Math.round(total*0.125/5)*5);const close=Math.max(5,Math.round(total*0.125/5)*5);return {total,init,core:total-init-close,close};}
  const isHttpURL=(x)=>{try{let u=new URL(x);return u.protocol==='http:'||u.protocol==='https:';}catch(_){return false;}};
  function validate(s){const e=[];
    if(!SUBJECTS.includes(s.subject))e.push('Pilih mata pelajaran.');
    if(!GRADES[s.grade]?.includes(s.classLevel))e.push('Kelas tidak sesuai jenjang.');
    for(const [k,label,min,max] of [['author','Nama Penyusun',2,120],['school','Institusi',2,160],['sourceName','Identitas sumber CP/acuan pembelajaran',4,250],['elements','Elemen/Ruang Lingkup',5,4000],['cp','Teks CP/acuan pembelajaran',12,10000],['baseline','Kompetensi Awal',5,2000],['media','Media dan Sumber Belajar',5,2000],['references','Daftar Pustaka',5,3000],['principal','Nama Kepala Sekolah',2,120]]){
      const n=clean(s[k]).length;if(n<min||n>max)e.push(label+' wajib diisi ('+min+'–'+max+' karakter).');
    }
    if(!/^\d{4}\/\d{4}$/.test(clean(s.year)))e.push('Tahun ajaran gunakan format 2026/2027.');
    if(!['I (Ganjil)','II (Genap)'].includes(s.semester))e.push('Pilih semester.');
    if(!Number.isInteger(s.chapter)||s.chapter<1||s.chapter>99)e.push('BAB harus angka 1–99.');
    if(s.topic==='OTHER'?(clean(s.otherTopic).length<3||clean(s.otherTopic).length>160):!allTopics(s.subject).some(t=>t.id===s.topic))e.push('Pilih materi atau isi Materi Lainnya (3–160 karakter).');
    if(s.focus==='OTHER'?(clean(s.otherFocus).length<3||clean(s.otherFocus).length>160):!(SKILLS[s.subject]||[]).some(t=>t[0]===s.focus))e.push('Pilih fokus kemampuan atau isi Kemampuan Lainnya (3–160 karakter).');
    if(!['cp','internal'].includes(s.sourceType))e.push('Pilih jenis acuan pembelajaran.');
    for(const [k,lo,hi,title] of [['meetings',1,12,'Pertemuan'],['jp',1,10,'JP per pertemuan'],['minutes',20,90,'Menit per JP'],['students',1,300,'Jumlah peserta didik']])if(!Number.isInteger(s[k])||s[k]<lo||s[k]>hi)e.push(title+' harus bilangan bulat '+lo+'–'+hi+'.');
    if(!APPROACHES.includes(s.approach)||!MODELS.includes(s.model))e.push('Pendekatan atau model pembelajaran tidak tersedia.');
    if(s.approach==='Lainnya'&&clean(s.approachOther).length<3)e.push('Tuliskan pendekatan lainnya.');
    if(s.model==='Lainnya'&&clean(s.modelOther).length<3)e.push('Tuliskan model lainnya.');
    if(!s.methods.length)e.push('Pilih setidaknya satu metode pembelajaran.');
    if(s.methods.includes('Lainnya')&&clean(s.methodOther).length<3)e.push('Tuliskan metode lainnya.');
    if(s.attachments.includes('Lainnya')&&clean(s.attachmentOther).length<3)e.push('Tuliskan lampiran lainnya.');
    for(const k of ['materialLink','videoLink'])if(clean(s[k])&&!isHttpURL(clean(s[k])))e.push('Tautan digital harus berupa URL http/https yang valid.');
    if(!['docx','chat'].includes(s.output))e.push('Pilih format hasil AI.');
    if(clean(s.notes).length>3000)e.push('Instruksi tambahan maksimal 3.000 karakter.');
    if(!GRADES[s.grade])e.push('Pilih jenjang.');
    return [...new Set(e)];
  }
  const SUBJECT_SPEC={
    'Bahasa Arab':'Gunakan muatan mufradat, keterampilan qiraah, kitabah, hiwar, serta keterampilan menyimak/berbicara apabila media audio dan praktik tersedia. Bahasa Arab harus beraksara Unicode, RTL, dan berharakat sesuai kebutuhan. Jangan mengklaim keterampilan lisan telah diukur jika hanya menggunakan tes tertulis. Gunakan bahasa, ungkapan, dan panjang teks yang sesuai kelas.',
    'Nahwu':'Fokus pada fungsi kata, kedudukan dalam kalimat, struktur jumlah, kaidah nahwu, dan i’rab sesuai kesiapan peserta didik. Bedakan pembahasan nahwu dari sharaf. Contoh Arab hendaknya benar, cukup berharakat, dan tidak ambigu; tugas analisis menggunakan alasan kaidah. Katalog materi diambil dari daftar isi buku Ilmu Nahwu untuk Pemula, Abu Razin & Ummu Razin, bukan kutipan isi lengkap buku.',
    'Siroh':'Fokus pada kronologi, konteks, sebab-akibat, keteladanan, dan penilaian sumber sejarah secara proporsional. Hindari cerita rekaan yang disajikan sebagai sejarah, kutipan hadis/ayat tanpa verifikasi, dan kepastian berlebihan atas riwayat yang diperselisihkan. Jangan menyederhanakan peristiwa rumit menjadi fakta yang keliru. Sumber sejarah dan keteladanan harus dibedakan dari interpretasi guru.'
  };
  function buildPrompt(s){const errors=validate(s);if(errors.length)throw Error(errors.join('\n'));
    const topic=topicOf(s),skill=focusOf(s),d=durations(s),ph=phaseOf(s.classLevel),methods=listOf(s.methods,s.methodOther),attachments=listOf(s.attachments,s.attachmentOther),title=s.sourceType==='cp'?'Capaian Pembelajaran (CP) Resmi':'Acuan Pembelajaran Satuan Pendidikan (Internal)';
    const text=[
`PERAN DAN TUJUAN
Bertindak sebagai ahli desain pembelajaran, guru ${s.subject}, penyusun Modul Ajar, dan editor dokumen Word yang teliti. Susun satu Modul Ajar yang operasional untuk kelas ${s.classLevel}, bukan bank soal atau lembar ujian. Modul Ajar harus dapat dijalankan secara realistis oleh guru. Semua butir yang disusun AI adalah draf yang tetap harus ditelaah guru.`,
`STATUS SUMBER DAN KEJUJURAN AKADEMIK
- Dasar pembelajaran: ${title}. Identitas dokumen dari guru: ${clean(s.sourceName)}.
- Teks pada bagian ELEMEN dan CP/ACUAN diberikan langsung oleh guru. SALIN APA ADANYA, jangan diubah, disingkat, diparafrasekan, direka ulang, atau diklaim sebagai regulasi resmi jika jenisnya acuan internal.
- Jika acuan yang diberikan tidak cukup atau berbeda dengan materi yang dipilih, tandai bagian yang perlu diperiksa guru; jangan menciptakan CP resmi baru.
- Katalog materi dari aplikasi adalah rancangan awal, bukan penetapan kurikulum resmi per kelas. Materi boleh disesuaikan berdasarkan sumber yang diberikan guru.
- Jangan mengarang data sekolah, nomor NIP, riwayat, ayat, hadis, tautan, daftar pustaka, ataupun akses kepada dokumen yang tidak dilampirkan.`,
`IDENTITAS PENYUSUN
Nama Penyusun: ${clean(s.author)}
Guru Kelas/Mata Pelajaran: ${clean(s.role)||'Guru '+s.subject+' Kelas '+s.classLevel}
Institusi: ${clean(s.school)}`,
`INFORMASI UMUM
Mata Pelajaran: ${s.subject}
Jenjang: ${s.grade}
Kelas: ${s.classLevel}; Fase ${ph}
Tahun Ajaran: ${s.year}; Semester: ${s.semester}
BAB Ke-: BAB ${s.chapter}
Materi Pembelajaran: ${topic.name}${topic.arabic?' / '+topic.arabic:''}
Kelompok Materi: ${topic.group}
Kemampuan yang Dikembangkan: ${skill}
Alokasi Waktu: ${s.meetings} pertemuan × ${s.jp} JP × ${s.minutes} menit = ${d.total} menit.
Pembagian yang masuk akal: Kegiatan Awal ${d.init} menit; Kegiatan Inti ${d.core} menit; Penutup ${d.close} menit. Sesuaikan proporsional bila kegiatan terdiri dari lebih dari satu pertemuan. Total waktu tidak boleh terlampaui.`,
`IDENTIFIKASI
Karakteristik/Target Peserta Didik: ${s.target}
Jumlah Peserta Didik: ${s.students}
Kompetensi Awal: ${clean(s.baseline)}
Dimensi Profil Lulusan: ${s.profiles.join('; ')||'Tidak ditentukan'}
Sarana dan Prasarana / Media dan Sumber Belajar: ${clean(s.media)}`,
`KOMPONEN INTI — JANGAN MEMODIFIKASI TEKS ACUAN
Fase: ${ph}
Jenis Dasar Pembelajaran: ${title}
Identitas Sumber: ${clean(s.sourceName)}
Elemen / Ruang Lingkup (kutip verbatim):
${clean(s.elements)}
${title} (kutip verbatim):
${clean(s.cp)}
Jika satuan pendidikan tidak memakai format CP resmi, tampilkan heading template "Capaian Pembelajaran" dengan keterangan jelas "Acuan Pembelajaran Internal — bukan klaim CP resmi" dan jangan memalsukan redaksi kementerian.`,
`DESAIN PEMBELAJARAN — PERTAHANKAN NOMOR 1–9 SESUAI TEMPLATE
1. Capaian Pembelajaran/Acuan: kutip teks yang diberikan guru secara utuh di bagian Komponen Inti.
2. Tujuan Pembelajaran (TP): AI susun otomatis secara spesifik, terukur, selaras acuan dan kemampuan; jumlah TP fleksibel.
3. Pemahaman Bermakna: AI susun secara singkat, kontekstual, sesuai mapel.
4. Pertanyaan Pemantik: AI susun pertanyaan yang relevan dan sesuai usia, jangan memaksakan jumlah.
5. Lintas Disiplin Ilmu: tentukan otomatis hanya jika relevan; jika tidak, sebutkan tidak dipaksakan.
6. Topik Pembelajaran: rumuskan dari materi, kelas, dan TP.
7. Praktik Pedagogis: Pendekatan "${optionOf(s.approach,s.approachOther)}"; Metode "${methods.join('; ')}"; Model "${optionOf(s.model,s.modelOther)}". Gunakan sintaks yang benar untuk model ini, tanpa mencampur sintaks model lain.
8. Kemitraan Pembelajaran: ${s.partners.join('; ')||'Tidak ada kemitraan khusus yang dipilih'}.
9. Pemanfaatan Digital (TPACK): media digital hanya jika berguna dan benar-benar tersedia.${clean(s.materialLink)?'\n- Bahan digital dari guru: '+clean(s.materialLink):''}${clean(s.videoLink)?'\n- Video pembelajaran dari guru: '+clean(s.videoLink):''}
Bagian otomatis harus dibuat tuntas oleh AI; jangan membiarkan placeholder seperti "[Isi TP]" atau "[Isi Kegiatan]".`,
`PENGALAMAN BELAJAR
- Kegiatan Awal (${d.init} menit total): Orientasi, Apersepsi, Motivasi. Susun kegiatan konkret yang dapat dilakukan guru dan peserta didik.
- Kegiatan Inti (${d.core} menit total): jalankan seluruh tahapan penting model ${optionOf(s.model,s.modelOther)} dalam urutan yang benar; bentuk aktivitas sesuai ${s.subject} dan kebutuhan kelas.
- Penutup (${d.close} menit total): simpulan, refleksi, umpan balik, tindak lanjut sesuai konteks.
- Untuk lebih dari satu pertemuan, pecah kegiatan menjadi pertemuan 1 sampai ${s.meetings} dengan total menit tetap ${d.total}. Tidak boleh menduplikasi penomoran atau mengulang kegiatan identik tanpa alasan.
- Jumlah langkah disesuaikan kebutuhan; nomor bagian template bukan batas jumlah langkah.`,
`ASESMEN
- Formatif: tampilkan tabel dengan kolom Penilaian | Teknik | Instrumen | Rubrik | Keterangan dan baris Sikap, Pengetahuan, Keterampilan.
- Sumatif: tabel kolom sama, baris Pengetahuan dan Keterampilan.
- Isi instrumen dan rubrik nyata, proporsional, sesuai tujuan, aktivitas, dan karakter mapel. Jangan klaim kemampuan lisan/performatif tercapai tanpa observasi unjuk kerja.`,
`REFLEKSI
- Refleksi untuk Guru: pertanyaan operasional ketercapaian TP, aktivitas, hambatan, dan tindak lanjut.
- Refleksi untuk Peserta Didik: pertanyaan sederhana yang sesuai usia, pengalaman, dan kesulitan.`,
`PENGAYAAN DAN REMEDIAL
- Pengayaan: aktivitas relevan bagi peserta didik yang sudah mencapai tujuan.
- Remedial: latihan bertahap, pemodelan ulang, bantuan terarah bagi yang belum mencapai tujuan. Jumlah kegiatan fleksibel. Pada judul template boleh mempertahankan ejaan "Remidial" sesuai aslinya.`,
`LAMPIRAN PENDUKUNG
Lampiran yang diminta: ${attachments.join('; ')||'Tidak ada'}.
Jika lampiran dipilih, buat isinya sungguh-sungguh: bahan ajar, LKPD lengkap, rubrik yang konsisten dengan asesmen. Jangan hanya mencantumkan judul lampiran.`,
`DAFTAR PUSTAKA
Gunakan hanya sumber nyata yang diberikan guru: ${clean(s.references)}.
Tata ulang bibliografi secara wajar tanpa mengarang penulis, penerbit, edisi, atau halaman yang tidak tersedia.`,
`PENGESAHAN
Kepala ${clean(s.school)}: ${clean(s.principal)}; NIP: ${clean(s.nipPrincipal)||'(kosong, tidak mengarang)'}.
Guru ${s.subject} Kelas ${s.classLevel}: ${clean(s.author)}; NIP: ${clean(s.nipTeacher)||'(kosong, tidak mengarang)'}.
Tampilkan dua kolom tanda tangan, nama dan NIP bila disediakan.`,
`CIRI KHAS MATA PELAJARAN — ${s.subject.toUpperCase()}
${SUBJECT_SPEC[s.subject]}`,
`BLUEPRINT TATA LETAK BERDASARKAN "Template Modul Ajar - Acuan.docx" — TEMPLATE OPSIONAL
Jangan membuat halaman sampul. Dokumen dimulai dengan judul "MODUL AJAR".
BAGIAN 1: Identitas Penyusun (Nama Penyusun, Guru Kelas/Mata Pelajaran, Institusi); Informasi Umum (Mata Pelajaran, Tahun Ajaran, Jenjang/Kelas, Fase, Bab Ke-, Lingkup Materi, Semester, Alokasi Waktu); Identifikasi (1. Karakteristik Peserta Didik: Target dan Jumlah; 2. Kompetensi Awal; 3. Delapan Dimensi Profil Lulusan dengan tanda centang sesuai pilihan; 4. Sarana dan Prasarana).
BAGIAN 2: Komponen Inti (Fase, Fase Berdasarkan Elemen, tabel dua kolom "Elemen/Ruang Lingkup | Capaian Pembelajaran/Acuan"); Desain Pembelajaran berurutan 1–9 seperti bagian di atas: CP, TP, Pemahaman Bermakna, Pertanyaan Pemantik, Lintas Disiplin Ilmu, Topik Pembelajaran, Praktik Pedagogis, Kemitraan, Pemanfaatan Digital.
BAGIAN 3: Pengalaman Belajar (Kegiatan Awal: Orientasi/Apersepsi/Motivasi; Kegiatan Inti sesuai sintaks model; Penutup); Asesmen (dua tabel Formatif dan Sumatif); Refleksi untuk Guru dan Peserta Didik.
BAGIAN 4: Pengayaan dan Remidial; Lampiran; Daftar Pustaka; Pengesahan (dua kolom Kepala Sekolah dan Guru).
ATURAN WORD: ukuran A4 potret; bar judul biru navy dengan teks putih; penyorotan kuning pada bagian yang disorot dalam template; tabel dengan batas rapi; teks Indonesia LTR dan teks Arab RTL/Unicode; tidak ada nomor ganda; halaman boleh bertambah jika konten nyata lebih panjang daripada contoh empat halaman. Jangan mengecilkan tulisan atau menghapus isi untuk membatasi halaman. Jika template Word dilampirkan, utamakan tata letaknya. Jika tidak dilampirkan, rekonstruksi dari blueprint lengkap ini tanpa meminta unggah ulang.`,
`FORMAT KELUARAN
${s.output==='docx'?'UTAMAKAN file Microsoft Word (.docx) lengkap, siap diunduh dan diedit. Bila lingkungan AI tidak mendukung pembuatan file, jelaskan keterbatasannya dan berikan naskah rapi siap disalin ke Word—jangan menciptakan tautan unduhan palsu.':'Tampilkan Modul Ajar lengkap sebagai teks terstruktur langsung di percakapan AI, siap dipindahkan ke Word.'}
Lakukan QC mandiri: urutan komponen lengkap, CP/acuan tidak diubah, durasi konsisten, terminologi Arab benar, fakta Siroh hati-hati, sintaks model benar, tabel asesmen dan lampiran lengkap, serta tidak ada placeholder kosong. Modul harus dapat ditinjau guru.`,
`INSTRUKSI TAMBAHAN GURU (jika ada; tidak boleh membatalkan CP, akurasi, atau struktur template)
${clean(s.notes)||'Tidak ada.'}`,
`Mulai susun Modul Ajar. Jangan meminta berkas template ulang; template Word boleh dilampirkan oleh guru untuk presisi visual, tetapi tidak wajib.`
    ].join('\n\n────────────────────────────────────────────\n\n');return {text,topic,focus:skill,minutes:d.total};
  }
  const CREDENTIAL_USER='edumind';
  const CREDENTIAL_SHA='990157d2189a61f4daf4ce867462e0cd7ec2c10055a138563060053e32a33874';
  async function sha256(text){if(global.crypto?.subtle){const bytes=new TextEncoder().encode(text);return [...new Uint8Array(await global.crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');}return simpleSHA256(text);}
  // Fallback SHA-256 untuk pratinjau file:// yang tidak mendukung WebCrypto.
  function simpleSHA256(ascii){const rightRotate=(v,n)=>v>>>n|v<<32-n;const maxWord=Math.pow(2,32);let result='';const words=[];const lengthProperty='length';let i,j;const asciiBitLength=unescape(encodeURIComponent(ascii)).length*8;ascii=unescape(encodeURIComponent(ascii));let hash=simpleSHA256.h||[],k=simpleSHA256.k||[],primeCounter=k[lengthProperty];const isComposite={};if(!primeCounter){for(let candidate=2;primeCounter<64;candidate++){if(!isComposite[candidate]){for(i=0;i<313;i+=candidate)isComposite[i]=candidate;hash[primeCounter]=(Math.pow(candidate,.5)*maxWord)|0;k[primeCounter++]=(Math.pow(candidate,1/3)*maxWord)|0;}}simpleSHA256.h=hash.slice(0);simpleSHA256.k=k.slice(0);}hash=hash.slice(0,8);ascii+='\x80';while(ascii[lengthProperty]%64-56)ascii+='\x00';for(i=0;i<ascii[lengthProperty];i++){j=ascii.charCodeAt(i);words[i>>2]|=j<<((3-i)%4)*8;}words[words[lengthProperty]]=Math.floor(asciiBitLength/maxWord);words[words[lengthProperty]]=asciiBitLength;for(j=0;j<words[lengthProperty];){const w=words.slice(j,j+=16);const oldHash=hash.slice(0);for(i=0;i<64;i++){const w15=w[i-15],w2=w[i-2];const a=hash[0],e=hash[4];const temp1=hash[7]+(rightRotate(e,6)^rightRotate(e,11)^rightRotate(e,25))+((e&hash[5])^(~e&hash[6]))+k[i]+(w[i]=(i<16)?w[i]:(w[i-16]+(rightRotate(w15,7)^rightRotate(w15,18)^(w15>>>3))+w[i-7]+(rightRotate(w2,17)^rightRotate(w2,19)^(w2>>>10)))|0);const temp2=(rightRotate(a,2)^rightRotate(a,13)^rightRotate(a,22))+((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));hash=[(temp1+temp2)|0].concat(hash);hash[4]=(hash[4]+temp1)|0;hash.pop();}for(i=0;i<8;i++)hash[i]=(hash[i]+oldHash[i])|0;}for(i=0;i<8;i++)for(j=3;j+1;j--){const b=hash[i]>>j*8&255;result+=(b<16?'0':'')+b.toString(16);}return result;}

  const API={version:VERSION,catalog:CATALOG,skills:SKILLS,grades:GRADES,subjects:SUBJECTS,defaults:defaultState,allTopics,validate,buildPrompt,phaseOf,durations,sha256};
  if(typeof module!=='undefined'&&module.exports)module.exports=API;
  if(!global.document)return;
  const doc=global.document;
  if(/\/panelMS(?:\/|$)/i.test(global.location?.pathname||''))return;
  const boot=()=>{
    const root=doc.getElementById('edm-ma3');if(!root||root.dataset.ready)return;root.dataset.ready='1';
    let s=defaultState(),signed=false,authBusy=false;
    const e=(id)=>root.querySelector('#ma-'+id),notice=(name,msg)=>{const el=e(name);if(!el)return;el.textContent=msg||'';el.hidden=!msg;};
    const H=(tag,attrs={},children=[])=>{const x=doc.createElement(tag);for(const [k,v]of Object.entries(attrs)){if(k==='class')x.className=v;else if(k==='text')x.textContent=v;else x.setAttribute(k,String(v));}children.forEach(n=>x.append(n));return x;};
    root.innerHTML=`
    <section id="ma-login" class="ma-login"><div class="ma-login-card"><img class="ma-logo" src="${LOGO}" alt="Logo Edumind Academy"><span class="ma-eyebrow">PROMPT GENERATOR</span><h1>Modul Ajar 3 Mapel</h1><p class="ma-muted">Bahasa Arab • Nahwu • Siroh</p><form id="ma-login-form"><label>Username<input id="ma-user" autocomplete="username" placeholder="Masukkan username" required></label><label>Password<div class="ma-pass"><input id="ma-pass" type="password" autocomplete="current-password" placeholder="Masukkan password" required><button id="ma-eye" type="button" aria-label="Tampilkan password">Lihat</button></div></label><p id="ma-login-error" class="ma-error" role="alert" hidden></p><button class="ma-main ma-login-button" type="submit">Masuk Sistem →</button></form><footer>© 2026 Edumind Academy<br>Gunakan dengan amanah untuk membantu pembelajaran.<br>WhatsApp resmi: <a href="https://wa.me/6281385841500" target="_blank" rel="noopener noreferrer">0813-8584-1500</a></footer></div></section>
    <section id="ma-app" hidden><header class="ma-top"><div class="ma-top-inner"><img src="${LOGO}" alt="Edumind Academy"><div class="ma-top-name"><strong>PG Modul Ajar 3 Mapel</strong><small>Edumind Academy • V${VERSION}</small></div><button id="ma-help" type="button">Panduan</button><button id="ma-logout" type="button" class="ma-quiet">Keluar</button></div></header>
    <main class="ma-work"><div class="ma-intro"><span class="ma-eyebrow">PERANGKAT GURU • EDUMIND ACADEMY</span><h1>Susun Modul Ajar Lebih Mudah.</h1><p>Pilih mapel dan materi, isi acuan pembelajaran, lalu buat prompt untuk AI. Tinjau hasil sebelum digunakan.</p></div><details class="ma-card ma-guide" id="ma-guide"><summary>Panduan Penggunaan Singkat</summary><p>1. Isi data guru, kelas dan materi. 2. Tempel CP atau acuan pembelajaran yang benar-benar digunakan sekolah. 3. Pilih strategi pembelajaran dan kelengkapan modul. 4. Klik <b>Buat Prompt</b>, lalu salin ke ChatGPT/Gemini/Claude. Lampirkan template Word jika tersedia, tetapi tidak wajib.</p><p>Aplikasi menghasilkan <b>prompt</b>, bukan langsung membuat Modul Ajar atau menghubungi layanan AI. Konten hasil AI tetap harus diperiksa guru. Isian formulir tersimpan sementara di browser ini saja sampai direset.</p></details>
    <form id="ma-form" novalidate>
    <section class="ma-card ma-b1"><h2><span class="ma-step">1</span> Identitas & Informasi Umum</h2><div class="ma-grid">
      <label>Nama Penyusun *<input id="ma-author" maxlength="120" placeholder="Nama guru penyusun"></label>
      <label>Guru Kelas / Mata Pelajaran<input id="ma-role" maxlength="120" placeholder="Terisi otomatis bila dikosongkan"></label>
      <label class="ma-wide">Institusi / Nama Sekolah *<input id="ma-school" maxlength="160" placeholder="Nama sekolah/madrasah"></label>
      <label>Jenjang Pendidikan<select id="ma-grade"></select></label><label>Kelas<select id="ma-class"></select></label>
      <label>Mata Pelajaran<select id="ma-subject"></select></label><label>Tahun Ajaran *<input id="ma-year" inputmode="numeric" maxlength="9" placeholder="2026/2027"></label>
      <label>Semester<select id="ma-semester"><option>I (Ganjil)</option><option>II (Genap)</option></select></label><label>BAB Ke-<input id="ma-chapter" type="number" min="1" max="99" step="1"></label>
    </div><h3 class="ma-subtitle">Alokasi Waktu</h3><div class="ma-grid ma-grid-3"><label>Jumlah Pertemuan<input id="ma-meetings" type="number" min="1" max="12" step="1"></label><label>JP per Pertemuan<input id="ma-jp" type="number" min="1" max="10" step="1"></label><label>Menit per JP<input id="ma-minutes" type="number" min="20" max="90" step="1"></label></div><p class="ma-note" id="ma-time-preview"></p></section>
    <section class="ma-card ma-b2"><h2><span class="ma-step">2</span> Materi & Komponen Inti</h2><div class="ma-grid"><label class="ma-wide">Materi Pembelajaran *<select id="ma-topic"></select></label><label class="ma-wide" id="ma-topic-other-wrap" hidden>Materi Lainnya *<input id="ma-topic-other" maxlength="160" placeholder="Tulis nama materi secara lengkap"></label><label class="ma-wide">Kemampuan yang Dikembangkan *<select id="ma-focus"></select></label><label class="ma-wide" id="ma-focus-other-wrap" hidden>Kemampuan Lainnya *<input id="ma-focus-other" maxlength="160" placeholder="Tulis kemampuan yang akan dikembangkan"></label></div><div class="ma-note" id="ma-topic-note"></div>
    <h3 class="ma-subtitle">Identifikasi Peserta Didik</h3><div class="ma-grid"><label>Target Peserta Didik<select id="ma-target"><option>Peserta Didik Reguler/Tipikal</option><option>Peserta Didik dengan Pencapaian Tinggi</option><option>Peserta Didik dengan Kesulitan Belajar</option><option>Peserta Didik CIBI</option></select></label><label>Jumlah Peserta Didik *<input id="ma-students" type="number" min="1" max="300" step="1"></label><label class="ma-wide">Kompetensi Awal *<textarea id="ma-baseline" rows="3" maxlength="2000" placeholder="Tuliskan kemampuan awal yang sudah dikuasai siswa"></textarea></label></div><fieldset class="ma-fieldset"><legend>Dimensi Profil Lulusan</legend><div id="ma-profiles" class="ma-checks"></div></fieldset>
    <h3 class="ma-subtitle">Dasar / Acuan Pembelajaran</h3><div class="ma-note ma-warning">Kolom acuan dan elemen di bawah wajib diisi dari dokumen yang digunakan sekolah. AI tidak boleh mengarang CP. Untuk Nahwu/Siroh, kurikulum internal sekolah juga dapat digunakan bila tidak memakai CP tersendiri.</div><div class="ma-grid"><label class="ma-wide">Jenis Acuan<select id="ma-source-type"><option value="cp">Capaian Pembelajaran (CP) Resmi</option><option value="internal">Acuan Pembelajaran Internal Satuan Pendidikan</option></select></label><label class="ma-wide">Nama Dokumen / Identitas Sumber *<input id="ma-source-name" maxlength="250" placeholder="Nama dan identitas dokumen yang Anda gunakan"></label><label class="ma-wide" id="ma-elements-label">Elemen / Ruang Lingkup *<textarea id="ma-elements" rows="3" maxlength="4000" placeholder="Salin elemen atau ruang lingkup dari dokumen acuan"></textarea></label><label class="ma-wide" id="ma-cp-label">Teks CP / Acuan Pembelajaran *<textarea id="ma-cp" rows="6" maxlength="10000" placeholder="Tempel teks aslinya di sini. Jangan gunakan CP yang dikarang AI."></textarea></label></div></section>
    <section class="ma-card ma-b3"><h2><span class="ma-step">3</span> Desain & Pengalaman Belajar</h2><p class="ma-note">Tujuan Pembelajaran, Pemahaman Bermakna, Pertanyaan Pemantik, Topik, Kegiatan Awal–Inti–Penutup, dan pembagian waktu akan disusun AI berdasarkan data dan acuan yang Anda isi.</p><div class="ma-grid"><label> Pendekatan Pembelajaran<select id="ma-approach"></select></label><label>Model Pembelajaran<select id="ma-model"></select></label><label id="ma-approach-other-wrap" class="ma-wide" hidden>Pendekatan Lainnya *<input id="ma-approach-other" maxlength="160"></label><label id="ma-model-other-wrap" class="ma-wide" hidden>Model Lainnya *<input id="ma-model-other" maxlength="160"></label></div><fieldset class="ma-fieldset"><legend>Metode Pembelajaran *</legend><div class="ma-checks" id="ma-methods"></div><label id="ma-method-other-wrap" hidden>Metode Lainnya *<input id="ma-method-other" maxlength="160" placeholder="Tulis metode tambahan"></label></fieldset><fieldset class="ma-fieldset"><legend>Kemitraan Pembelajaran</legend><div class="ma-checks" id="ma-partners"></div></fieldset><div class="ma-grid"><label class="ma-wide">Media & Sumber Belajar (Sarana Prasarana) *<textarea id="ma-media" rows="3" maxlength="2000" placeholder="Buku ajar, papan tulis, media, LKPD, perangkat yang benar-benar tersedia"></textarea></label><label>Tautan Bahan Ajar Digital (Opsional)<input id="ma-material-link" type="url" placeholder="https://..."></label><label>Tautan Video Pembelajaran (Opsional)<input id="ma-video-link" type="url" placeholder="https://..."></label></div><p class="ma-note">Tautan digital hanya dimasukkan ke prompt jika Anda mengisinya.</p></section>
    <section class="ma-card ma-b4"><h2><span class="ma-step">4</span> Asesmen & Kelengkapan Modul</h2><p class="ma-note">AI menyusun asesmen formatif dan sumatif beserta tabel teknik, instrumen, rubrik, dan keterangan; refleksi guru/siswa; pengayaan; serta remedial. Semua tetap mengikuti template.</p><fieldset class="ma-fieldset"><legend>Lampiran Pendukung</legend><div class="ma-checks" id="ma-attachments"></div><label id="ma-attachment-other-wrap" hidden>Lampiran Lainnya *<input id="ma-attachment-other" maxlength="160" placeholder="Tuliskan lampiran lainnya"></label></fieldset><div class="ma-grid"><label class="ma-wide">Daftar Pustaka / Sumber Rujukan *<textarea id="ma-references" rows="3" maxlength="3000" placeholder="Tuliskan buku atau sumber nyata yang digunakan, jangan mengarang"></textarea></label><label>Nama Kepala Sekolah *<input id="ma-principal" maxlength="120" placeholder="Nama kepala sekolah"></label><label>NIP Kepala Sekolah (Opsional)<input id="ma-nip-principal" maxlength="50" placeholder="Kosongkan jika tidak ada"></label><label>Nama Guru untuk Pengesahan<input id="ma-teacher-sign" readonly aria-readonly="true"></label><label>NIP Guru (Opsional)<input id="ma-nip-teacher" maxlength="50"></label></div><h3 class="ma-subtitle">Instruksi Tambahan</h3><label>Kebutuhan Khusus dari Guru (Opsional)<textarea id="ma-notes" rows="6" maxlength="3000" placeholder="Contoh: gunakan contoh Arab berharakat; utamakan studi kisah yang dapat diverifikasi; gunakan pembelajaran berdiferensiasi..."></textarea></label></section>
    <section class="ma-card ma-b5"><h2><span class="ma-step">5</span> Buat & Salin Prompt</h2><div class="ma-grid"><label class="ma-wide">Format Output dari AI<select id="ma-output"><option value="docx">File Word (.docx) siap diunduh</option><option value="chat">Teks langsung di percakapan AI</option></select></label></div><p class="ma-note">Template Modul Ajar - Acuan.docx boleh dilampirkan ke AI untuk penyesuaian visual, tetapi tidak wajib. Pilihan Word meminta AI membuat file jika layanan AI mendukungnya; PG hanya membuat instruksi.</p><p id="ma-error" class="ma-error" role="alert" hidden></p><p id="ma-status" class="ma-success" role="status" hidden></p><div class="ma-actions"><button type="button" id="ma-example">Muat Contoh</button><button type="button" id="ma-reset">Kosongkan Isian</button><button type="submit" class="ma-main" id="ma-generate">Buat Prompt →</button></div><div class="ma-result-heading"><h3>Prompt Siap Digunakan</h3><div class="ma-actions"><button id="ma-copy" type="button" disabled>Salin Prompt</button><button id="ma-download" type="button" disabled>Unduh TXT</button></div></div><p id="ma-result-meta" class="ma-subtle">Prompt akan muncul setelah formulir diisi.</p><textarea id="ma-result" rows="13" readonly aria-label="Prompt Modul Ajar" placeholder="Lengkapi formulir terlebih dahulu, lalu klik Buat Prompt."></textarea></section>
    </form><footer class="ma-bottom">Edumind Academy • PG Modul Ajar 3 Mapel V${VERSION}<p>Hasil AI merupakan draf. Guru memeriksa CP, materi, kegiatan, asesmen, dan format Word sebelum digunakan.</p></footer></main></section>`;
    function makeChoices(container,items,values){container.replaceChildren();for(const x of items){const lab=H('label',{'class':'ma-check'}),cb=H('input',{'type':'checkbox','value':x});cb.checked=values.includes(x);lab.append(cb,doc.createTextNode(x));container.append(lab);}}
    function getChoices(id){return [...e(id).querySelectorAll('input:checked')].map(x=>x.value);}
    function setOpts(id,items,value,placeholder=''){const el=e(id);el.replaceChildren();if(placeholder){const o=new Option(placeholder,'');el.add(o);}let grp='',parent=el;for(const ent of items){const o=typeof ent==='string'?{value:ent,label:ent}:ent;if(o.group&&o.group!==grp){parent=H('optgroup',{'label':o.group});el.append(parent);grp=o.group;}else if(!o.group){parent=el;grp='';}parent.append(new Option(o.label,o.value));}el.value=value;}
    function renderTopics(){const items=allTopics(s.subject),recommended=items.filter(x=>x.recommendedFrom<=s.classLevel),advanced=items.filter(x=>x.recommendedFrom>s.classLevel);setOpts('topic',[...recommended.map(x=>({value:x.id,label:x.name+' / '+x.arabic,group:x.group})),...advanced.map(x=>({value:x.id,label:x.name+' / '+x.arabic,group:'Materi Lanjutan'})),{value:'OTHER',label:'Lainnya — tulis materi sendiri'}],s.topic,'Pilih materi...');e('topic-other-wrap').hidden=s.topic!=='OTHER';e('topic-other').value=s.otherTopic;const t=topicOf(s);e('topic-note').textContent=t?(s.subject==='Nahwu'?'Katalog Nahwu berdasarkan daftar isi buku (bukan isi lengkap buku). ':'Katalog awal Edumind; dapat diperbaiki sesuai kurikulum sekolah. ')+(t.recommendedFrom>s.classLevel?'Topik ini diperkirakan lebih lanjut daripada kelas yang dipilih.':'Sesuaikan kedalaman materi dengan kelas '+s.classLevel+'.'):'Pilih materi untuk melanjutkan.';}
    function renderFocus(){setOpts('focus',[...SKILLS[s.subject].map(([k,v])=>({value:k,label:v})),{value:'OTHER',label:'Lainnya — tulis kemampuan sendiri'}],s.focus,'Pilih kemampuan...');e('focus-other-wrap').hidden=s.focus!=='OTHER';e('focus-other').value=s.otherFocus;}
    function sourceUI(){e('elements-label').firstChild.textContent=s.sourceType==='cp'?'Elemen / Ruang Lingkup CP *':'Elemen / Ruang Lingkup Acuan Internal *';e('cp-label').firstChild.textContent=s.sourceType==='cp'?'Teks Capaian Pembelajaran (CP) *':'Teks Acuan Pembelajaran Internal *';}
    function syncAll(){setOpts('grade',Object.keys(GRADES),s.grade);setOpts('class',GRADES[s.grade].map(n=>({value:String(n),label:'Kelas '+n+' — Fase '+phaseOf(n)})),String(s.classLevel));setOpts('subject',SUBJECTS,s.subject);renderTopics();renderFocus();for(const k of ['author','role','school','year','semester','chapter','meetings','jp','minutes','target','students','baseline','sourceType','sourceName','elements','cp','approach','approachOther','model','modelOther','methodOther','media','materialLink','videoLink','attachmentOther','references','principal','nipPrincipal','nipTeacher','notes','output']){let id=k.replace(/[A-Z]/g,a=>'-'+a.toLowerCase());const el=e(id);if(el)el.value=String(s[k]);}setOpts('approach',APPROACHES,s.approach);setOpts('model',MODELS,s.model);makeChoices(e('profiles'),PROFILES,s.profiles);makeChoices(e('methods'),METHODS,s.methods);makeChoices(e('partners'),PARTNERS,s.partners);makeChoices(e('attachments'),ATTACHMENTS,s.attachments);conditionals();durationUI();teacherUI();}
    function conditionals(){e('approach-other-wrap').hidden=s.approach!=='Lainnya';e('model-other-wrap').hidden=s.model!=='Lainnya';e('method-other-wrap').hidden=!s.methods.includes('Lainnya');e('attachment-other-wrap').hidden=!s.attachments.includes('Lainnya');sourceUI();}
    function durationUI(){const d=durations(s);e('time-preview').textContent=Number.isFinite(d.total)?`Total ${d.total} menit • Alokasi awal ${d.init}, inti ${d.core}, penutup ${d.close} menit (akan disesuaikan per pertemuan oleh AI).`:'Isi alokasi waktu yang valid.';}
    function teacherUI(){e('teacher-sign').value=s.author;}
    function invalid(){if(e('result').value){e('result').value='';e('copy').disabled=true;e('download').disabled=true;e('result-meta').textContent='Isian berubah. Klik Buat Prompt untuk memperbarui hasil.';}notice('error','');notice('status','');}
    const STORAGE='edumind_pg_modulajar_3mapel_draft_v1';const SESSION='edumind_pg_modulajar_3mapel_session_v1';
    function save(){try{global.localStorage.setItem(STORAGE,JSON.stringify(s));}catch(_){}}
    function restore(){try{const raw=JSON.parse(global.localStorage.getItem(STORAGE)||'null');if(!raw||!GRADES[raw.grade]||!SUBJECTS.includes(raw.subject))return; s={...defaultState(),...raw};if(!GRADES[s.grade].includes(Number(s.classLevel)))s.classLevel=GRADES[s.grade][0];}catch(_){}}
    function changeValue(id,key,type='text'){const el=e(id);el.addEventListener(['textarea','input'].includes(type)?'input':'change',()=>{s[key]=type==='int'?(el.value.trim()===''?NaN:Number(el.value)):el.value; if(type==='int')durationUI();if(key==='author')teacherUI();if(['approach','model','sourceType'].includes(key))conditionals();save();invalid();});}
    const mapping={author:'author',role:'role',school:'school',year:'year',semester:'semester',chapter:'chapter',meetings:'meetings',jp:'jp',minutes:'minutes',target:'target',students:'students',baseline:'baseline','source-type':'sourceType','source-name':'sourceName',elements:'elements',cp:'cp',approach:'approach','approach-other':'approachOther',model:'model','model-other':'modelOther','method-other':'methodOther',media:'media','material-link':'materialLink','video-link':'videoLink','attachment-other':'attachmentOther',references:'references',principal:'principal','nip-principal':'nipPrincipal','nip-teacher':'nipTeacher',notes:'notes',output:'output'};
    const integerIds=['chapter','meetings','jp','minutes','students'];
    for(const [id,key]of Object.entries(mapping)){const el=e(id);const type=integerIds.includes(id)?'int':el.tagName==='TEXTAREA'?'textarea':el.tagName==='INPUT'?'input':'select';changeValue(id,key,type);}
    e('grade').addEventListener('change',()=>{s.grade=e('grade').value;s.classLevel=GRADES[s.grade][0];s.topic='';s.otherTopic='';s.focus='';s.otherFocus='';syncAll();invalid();save();});
    e('class').addEventListener('change',()=>{s.classLevel=Number(e('class').value);renderTopics();invalid();save();});
    e('subject').addEventListener('change',()=>{s.subject=e('subject').value;s.topic='';s.focus='';s.otherTopic='';s.otherFocus='';s.sourceType=s.subject==='Bahasa Arab'?'cp':'internal';renderTopics();renderFocus();e('source-type').value=s.sourceType;conditionals();invalid();save();});
    e('topic').addEventListener('change',()=>{s.topic=e('topic').value;s.otherTopic='';renderTopics();invalid();save();});
    e('focus').addEventListener('change',()=>{s.focus=e('focus').value;s.otherFocus='';renderFocus();invalid();save();});
    e('topic-other').addEventListener('input',()=>{s.otherTopic=e('topic-other').value;invalid();save();});
    e('focus-other').addEventListener('input',()=>{s.otherFocus=e('focus-other').value;invalid();save();});
    for(const [k,id]of [['profiles','profiles'],['methods','methods'],['partners','partners'],['attachments','attachments']])e(id).addEventListener('change',()=>{s[k]=getChoices(id);conditionals();invalid();save();});
    function appOpen(){signed=true;e('login').hidden=true;e('app').hidden=false;root.classList.add('ma-open');e('grade').focus();}
    e('login-form').addEventListener('submit',async ev=>{ev.preventDefault();if(authBusy)return;authBusy=true;const btn=e('login-form').querySelector('button[type=submit]');btn.disabled=true;try{if(e('user').value.trim().toLowerCase()!==CREDENTIAL_USER||await sha256(e('pass').value)!==CREDENTIAL_SHA){notice('login-error','Username atau password belum sesuai.');e('pass').value='';return;}notice('login-error','');try{global.sessionStorage.setItem(SESSION,JSON.stringify({v:VERSION,until:Date.now()+12*3600000}));}catch(_){}e('pass').value='';appOpen();}catch(_){notice('login-error','Login belum berhasil. Coba lagi.');}finally{authBusy=false;btn.disabled=false;}});
    e('eye').addEventListener('click',()=>{const show=e('pass').type==='password';e('pass').type=show?'text':'password';e('eye').textContent=show?'Tutup':'Lihat';e('eye').setAttribute('aria-label',show?'Sembunyikan password':'Tampilkan password');});
    e('logout').addEventListener('click',()=>{try{global.sessionStorage.removeItem(SESSION);}catch(_){}signed=false;e('app').hidden=true;e('login').hidden=false;root.classList.remove('ma-open');e('user').value='';e('pass').value='';});
    e('help').addEventListener('click',()=>{e('guide').open=!e('guide').open;e('guide').scrollIntoView({behavior:'smooth',block:'center'});});
    e('form').addEventListener('submit',ev=>{ev.preventDefault();if(!signed)return;try{const x=buildPrompt(s);e('result').value=x.text;e('copy').disabled=false;e('download').disabled=false;e('result-meta').textContent=`${s.subject} • Kelas ${s.classLevel} • ${x.minutes} menit • ${s.output==='docx'?'Target Word (.docx)':'Teks AI'}`;notice('error','');notice('status','Prompt berhasil dibuat. Salin ke layanan AI dan periksa Modul Ajar yang dihasilkan.');e('result').focus();}catch(err){notice('error',err.message);notice('status','');e('error').scrollIntoView({behavior:'smooth',block:'center'});}});
    e('copy').addEventListener('click',async()=>{if(!e('result').value)return;try{await global.navigator.clipboard.writeText(e('result').value);notice('status','Prompt berhasil disalin.');}catch(_){e('result').focus();e('result').select();let ok=false;try{ok=doc.execCommand('copy');}catch(_){}notice('status',ok?'Prompt berhasil disalin.':'Prompt sudah dipilih. Tekan Ctrl+C untuk menyalin.');}});
    e('download').addEventListener('click',()=>{const text=e('result').value;if(!text)return;const blob=new Blob(['\ufeff'+text],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=H('a',{'href':url,'download':`EDUMIND_PROMPT_MODULAJAR_${s.subject.toUpperCase().replace(/\s/g,'_')}_KELAS_${s.classLevel}.txt`});root.append(a);a.click();a.remove();global.setTimeout(()=>URL.revokeObjectURL(url),1000);});
    e('reset').addEventListener('click',()=>{if(!global.confirm('Kosongkan seluruh isian dan prompt yang tersimpan?'))return;try{global.localStorage.removeItem(STORAGE);}catch(_){}s=defaultState();syncAll();invalid();e('result').value='';e('copy').disabled=true;e('download').disabled=true;e('result-meta').textContent='Prompt akan muncul setelah formulir diisi.';});
    e('example').addEventListener('click',()=>{const grade=s.grade,cl=s.classLevel,sub=s.subject;s={...defaultState(),grade,classLevel:cl,subject:sub};s.topic=allTopics(sub).find(t=>t.recommendedFrom<=cl)?.id||allTopics(sub)[0].id;s.focus=SKILLS[sub][0][0];s.sourceType=sub==='Bahasa Arab'?'cp':'internal';s.author='Ahmad Fauzi, S.Pd.';s.school='Sekolah Islam Edumind';s.baseline=sub==='Bahasa Arab'?'Peserta didik mengenal huruf Arab dan beberapa ungkapan sederhana.':sub==='Nahwu'?'Peserta didik telah mengenal contoh isim, fi’il, dan huruf.':'Peserta didik telah mengenal garis besar kehidupan Rasulullah ﷺ.';s.media='Buku ajar yang digunakan sekolah, papan tulis, kartu materi, dan LKPD.';s.references='Buku ajar yang digunakan sekolah (lengkapi penulis, judul, dan penerbit berdasarkan buku yang benar).';s.principal='Kepala Sekolah';s.sourceName='';s.elements='';s.cp='';syncAll();invalid();notice('status','Contoh dimuat. Nama sumber, elemen, dan CP/acuan sengaja tetap kosong agar diisi dari dokumen yang benar.');save();});
    restore();syncAll();try{const sess=JSON.parse(global.sessionStorage.getItem(SESSION)||'null');if(sess?.v===VERSION&&sess.until>Date.now())appOpen();}catch(_){}
  };
  if(doc.readyState==='loading')doc.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})(typeof window!=='undefined'?window:globalThis);