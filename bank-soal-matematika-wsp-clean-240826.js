const PG_CODE = 'bank_soal_matematika_240826';
        const SESSION_KEY = 'akds_session_' + PG_CODE;
        const AUTOSAVE_KEY = 'akds_autosave_' + PG_CODE;

        const PILIHAN_KELAS = {
            'SD/MI': ['Fase A Kelas 1', 'Fase A Kelas 2', 'Fase B Kelas 3', 'Fase B Kelas 4', 'Fase C Kelas 5', 'Fase C Kelas 6'],
            'SMP/MTs': ['Fase D Kelas 7', 'Fase D Kelas 8', 'Fase D Kelas 9'],
            'SMA/MA': ['Fase E Kelas 10', 'Fase F Kelas 11', 'Fase F Kelas 12'],
            'SMK': ['Fase E Kelas 10', 'Fase F Kelas 11', 'Fase F Kelas 12']
        };

        const CAPAIAN_PEMBELAJARAN = {
            A: "Fase A - Menyimak: Memahami informasi dari teks nonsastra berbentuk teks aural (teks yang dibacakan dan/atau didengarkan) berupa percakapan yang berkaitan dengan diri, keluarga, dan/atau lingkungan sekitar; dan memahami pesan teks sastra berbentuk teks aural. Membaca dan Memirsa: Membaca kata-kata sederhana dengan fasih dari bacaan dan/atau tayangan yang dipirsa tentang diri, keluarga, kesehatan, dan/atau lingkungan sekitar; dan memahami isi bacaan dan/atau tayangan yang dipirsa tentang diri, keluarga, kesehatan, dan/atau lingkungan sekitar. Berbicara dan Mempresentasikan: Merespons dengan bertanya tentang sesuatu, menjawab, dan menanggapi komentar orang lain (teman, pendidik, dan/atau orang dewasa) dengan baik dan santun dalam suatu percakapan tentang diri, keluarga, kesehatan, dan/atau lingkungan sekitar; mengungkapkan perasaan dan gagasan secara lisan dengan atau tanpa bantuan gambar; dan menceritakan kembali isi berbagai tipe teks yang dibaca, dipirsa, atau didengar tentang diri, keluarga, kesehatan, dan/atau lingkungan sekitar. Menulis: Menulis permulaan dengan benar di atas kertas dan/atau melalui media digital; mengembangkan tulisan tangan yang semakin baik; dan menulis berbagai tipe teks sederhana tentang diri, keluarga, dan/atau lingkungan sekitar dengan beberapa kalimat sederhana.",
            B: "Fase B - Menyimak: Memahami ide pokok suatu informasi dari teks nonsastra berbentuk teks aural (teks yang dibacakan dan/atau didengarkan); dan memahami isi teks sastra berbentuk teks aural. Membaca dan Memirsa: Membaca kata-kata baru dengan fasih dari bacaan dan/atau tayangan yang dipirsa; dan memahami ide pokok, ide pendukung, pesan, dan informasi dalam teks sastra dan nonsastra berbentuk cetak dan/atau elektronik. Berbicara dan Mempresentasikan: Menyajikan pendapat dengan pilihan kata dan sikap tubuh/gestur yang sesuai, menggunakan volume dan intonasi yang tepat sesuai konteks; menanggapi diskusi sesuai tata cara; dan menceritakan kembali isi dan/atau informasi dari berbagai tipe teks yang dibaca, dipirsa, atau didengar. Menulis: Menulis berbagai tipe teks sederhana dengan rangkaian kalimat yang beragam; dan menggunakan kaidah kebahasaan dan kosakata baru yang memiliki makna denotatif untuk menulis teks sesuai dengan konteks.",
            C: "Fase C - Menyimak: Menganalisis informasi dari teks nonsastra berbentuk teks aural (teks yang dibacakan dan/atau didengarkan; dan menganalisis isi teks sastra berbentuk teks aural. Membaca dan Memirsa: Membaca kata-kata dengan berbagai pola kombinasi huruf dengan fasih dari bacaan dan/atau tayangan yang dipirsa; dan menganalisis informasi serta nilai-nilai dalam teks sastra dan nonsastra berwujud teks visual dan/atau audiovisual. Berbicara dan Mempresentasikan: Mempresentasikan gagasan dari berbagai tipe teks dengan efektif dan santun; dan menyampaikan perasaan berdasarkan fakta, imajinasi (dari diri sendiri dan orang lain) secara indah dan menarik dalam bentuk teks sastra dengan penggunaan kosakata secara kreatif. Menulis: Menulis berbagai tipe teks sederhana berdasarkan gagasan, hasil pengamatan, pengalaman, dan/atau imajinasi dengan rangkaian kalimat kompleks secara kreatif, menarik, dan/atau indah; dan menggunakan kaidah kebahasaan dan kosakata baru yang memiliki makna denotatif dan konotatif.",
            D: "Fase D - Menyimak: Menganalisis gagasan, pandangan, arahan, dan/atau pesan dari teks nonsastra berbentuk teks aural (teks yang dibacakan dan/atau didengarkan); dan menganalisis unsur intrinsik teks sastra berbentuk teks aural. Membaca dan Memirsa: Menganalisis informasi berupa gagasan, pandangan, arahan, dan/atau pesan dari berbagai tipe teks berwujud teks visual dan/atau audiovisual untuk menemukan makna yang tersurat dan tersirat; menginterpretasi informasi untuk mengungkapkan kepedulian dan/atau pendapat pro/kontra dari berbagai tipe teks berwujud teks visual dan/atau audiovisual; dan mengevaluasi kualitas dan/atau kredibilitas dari berbagai tipe teks berwujud teks visual dan/atau audiovisual menggunakan sumber informasi lain. Berbicara dan Mempresentasikan: Mempresentasikan gagasan, pandangan, arahan, dan/atau pesan untuk tujuan pengajuan usul dan pemberian solusi dalam bentuk monolog, dialog logis, dan/atau berbagai tipe teks secara kritis dan kreatif; dan menyajikan ungkapan kepedulian dari berbagai tipe teks dan/atau teks multimodal. Menulis: Menulis gagasan, pandangan, arahan, pesan, pengalaman, dan/atau imajinasi dalam berbagai tipe teks secara logis, kritis, kreatif, menarik, dan/atau indah; menulis ungkapan kepedulian dan/atau pendapat pro/kontra dalam berbagai tipe teks berbentuk teks multimodal; dan menggunakan kosakata baru yang memiliki makna denotatif, konotatif, dan kiasan untuk menulis.",
            E: "Fase E - Menyimak: Mengevaluasi gagasan, pandangan, arahan, dan/atau pesan dari teks nonsastra berbentuk teks aural (teks yang dibacakan dan/atau didengarkan); dan mengevaluasi unsur intrinsik dan ekstrinsik teks sastra berbentuk teks aural. Membaca dan Memirsa: Mengevaluasi informasi berupa gagasan, pandangan, arahan, dan/atau pesan dari berbagai tipe teks berwujud visual dan/atau audiovisual untuk menemukan makna yang tersurat dan tersirat; menginterpretasi informasi untuk mengungkapkan gagasan dan perasaan (simpati, peduli, dan empati) dari berbagai tipe teks berwujud teks visual dan/atau audiovisual secara kreatif; mengevaluasi kualitas dan/atau kredibilitas dari berbagai tipe teks berwujud teks visual dan/atau audiovisual menggunakan sumber informasi lain; dan membandingkan isi teks. Berbicara dan Mempresentasikan: Mempresentasikan gagasan, pandangan, arahan, dan/atau pesan berbagai tipe teks berbentuk monolog, dialog, dan/atau gelar wicara secara sistematis, kritis, dan/atau kreatif; dan mengungkapkan kepedulian dari berbagai tipe teks dan/atau teks multimodal secara kreatif. Menulis: Menulis gagasan, pandangan, arahan, pesan, dan/atau imajinasi dalam berbagai tipe teks secara logis, kritis, dan kreatif; dan memublikasikan hasil karya di media cetak, elektronik, dan/atau digital.",
            F: "Fase F - Menyimak: Mengevaluasi gagasan, perasaan, pandangan, arahan, dan/atau pesan dari teks nonsastra berbentuk teks aural (teks yang dibacakan dan/atau didengarkan); dan mengapresiasi teks sastra berbentuk teks aural. Membaca dan Memirsa: Mengevaluasi informasi berupa gagasan, perasaan, pandangan, arahan, dan/atau pesan dari berbagai tipe teks berwujud teks visual dan/atau audiovisual untuk menemukan makna yang tersurat dan tersirat berdasarkan kaidah logika berpikir; merefleksi gagasan dan pandangan berdasarkan kaidah logika berpikir dari berbagai tipe teks berwujud teks visual dan/atau audiovisual; dan mengapresiasi berbagai tipe teks berwujud teks visual dan/atau audiovisual. Berbicara dan Mempresentasikan: Mempresentasikan gagasan, perasaan, pandangan, arahan, pesan, dan/atau kreativitas berbahasa dalam berbagai tipe teks berbentuk monolog, dialog, dan/atau gelar wicara dan/atau berbagai tipe teks secara logis, sistematis, kritis, dan kreatif sesuai dengan norma kesopanan dan budaya Indonesia; menyajikan karya sastra secara kreatif dan menarik; dan mempertahankan hasil penelitian dengan argumentasi. Menulis: Menulis gagasan, pandangan, imajinasi, dan/atau pengetahuan metakognisi dalam berbagai tipe teks secara logis, kritis, dan kreatif; dan mempublikasikan hasil karya di media cetak, elektronik, dan/atau digital."
        };

        const JUMLAH_BENTUK = [
            ['Pilihan Ganda', 'jumlah_pg'],
            ['Pilihan Ganda Kompleks', 'jumlah_pg_kompleks'],
            ['Benar-Salah', 'jumlah_benar_salah'],
            ['Menjodohkan', 'jumlah_menjodohkan'],
            ['Isian Singkat', 'jumlah_isian'],
            ['Uraian', 'jumlah_uraian'],
            ['Studi Kasus', 'jumlah_studi_kasus']
        ];

        function handleLogin(event) {
            if (event) event.preventDefault();
            const loginScreen = document.getElementById('login-screen');
            const validUsername = loginScreen.dataset.loginUsername || 'edumind';
            const validPassword = loginScreen.dataset.loginPassword || '';
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorBox = document.getElementById('login-error');

            if (username === validUsername && password === validPassword) {
                errorBox.classList.add('hidden');
                sessionStorage.setItem(SESSION_KEY, 'active');
                showApp();
            } else {
                errorBox.classList.remove('hidden');
            }
            return false;
        }

        function togglePasswordVisibility() {
            const input = document.getElementById('password');
            const button = document.getElementById('toggle-password');
            const icon = document.getElementById('password-eye-icon');
            const showPassword = input.type === 'password';

            input.type = showPassword ? 'text' : 'password';
            icon.className = showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
            button.setAttribute('aria-pressed', String(showPassword));
            button.setAttribute('aria-label', showPassword ? 'Sembunyikan password' : 'Tampilkan password');
            button.title = showPassword ? 'Sembunyikan password' : 'Tampilkan password';
            input.focus();
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
        }

        function updateJenjangDanPilihan(preferredClass) {
            const jenjang = document.getElementById('jenjang_pendidikan').value;
            const select = document.getElementById('fase_kelas');
            const previous = preferredClass || select.value;
            const classes = PILIHAN_KELAS[jenjang] || [];
            select.innerHTML = classes.map(value => `<option value="${value}">${value}</option>`).join('');
            if (classes.includes(previous)) select.value = previous;
            else if (jenjang === 'SD/MI') select.value = 'Fase A Kelas 1';
            updateCapaianPembelajaran();
            scheduleAutosave();
        }

        function updateCapaianPembelajaran() {
            const faseKelas = document.getElementById('fase_kelas').value;
            const match = faseKelas.match(/Fase\s+([A-F])/);
            const fase = match ? match[1] : 'B';
            const cpField = document.getElementById('capaian_pembelajaran');
            const status = document.getElementById('cp-status');
            const cpMatematika = window.CP_MATEMATIKA || {};
            const cp = cpMatematika[fase];

            if (!cp) {
                cpField.value = 'CP Matematika belum berhasil dimuat. Muat ulang halaman dan pastikan koneksi ke jsDelivr tersedia.';
                if (status) {
                    status.textContent = 'CP Matematika belum tersedia. Silakan muat ulang halaman.';
                    status.className = 'text-[11px] text-red-700 mt-1';
                }
                scheduleAutosave();
                return;
            }

            cpField.value = cp;

            if (status) {
                status.textContent = 'CP resmi Matematika diperbarui otomatis berdasarkan fase yang dipilih.';
                status.className = 'text-[11px] text-emerald-700 mt-1';
            }
            scheduleAutosave();
        }

        function updateIndikatorSoal() {
            const tp = document.getElementById('tujuan_pembelajaran').value.trim();
            if (tp) {
                document.getElementById('indikator_soal').value = `Peserta didik mampu menunjukkan ketercapaian tujuan berikut melalui jawaban yang tepat: ${tp}`;
            }
            scheduleAutosave();
        }

        function toggleJenisStimulus() {
            const wrapper = document.getElementById('wrapper_jenis_stimulus');
            wrapper.style.display = document.getElementById('stimulus_soal').value === 'Ya' ? '' : 'none';
            scheduleAutosave();
        }

        function ubahBab(delta) {
            const input = document.getElementById('bab_ke');
            const match = (input.value || '').match(/\d+/);
            let value = match ? parseInt(match[0], 10) : 1;
            value = Math.max(1, value + delta);
            input.value = 'BAB ' + value;
            scheduleAutosave();
        }

        function getSelectedCheckboxes(name, fallback) {
            const values = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(item => item.value);
            return values.length ? values.join(', ') : fallback;
        }

        function updateJumlahSoalTotal() {
            let total = 0;
            JUMLAH_BENTUK.forEach(([name, id]) => {
                const value = Math.max(0, Number(document.getElementById(id).value) || 0);
                total += value;
                const checkbox = document.querySelector(`input[name="bentuk_soal"][value="${name}"]`);
                if (checkbox) checkbox.checked = value > 0;
            });
            document.getElementById('jumlah_soal').value = total;
            scheduleAutosave();
        }

        function getDistribusiBentuk() {
            return JUMLAH_BENTUK
                .map(([name, id]) => [name, Math.max(0, Number(document.getElementById(id).value) || 0)])
                .filter(([, count]) => count > 0)
                .map(([name, count]) => `${name}: ${count} butir`)
                .join('; ');
        }

        function showValidation(message, isError = true) {
            const box = document.getElementById('validation-message');
            box.textContent = message;
            box.className = isError
                ? 'p-3 rounded-xl border text-sm allow-select bg-red-50 border-red-200 text-red-700'
                : 'p-3 rounded-xl border text-sm allow-select bg-emerald-50 border-emerald-200 text-emerald-700';
            box.classList.remove('hidden');
            if (isError) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function hideValidation() {
            document.getElementById('validation-message').classList.add('hidden');
        }

        function validateForm() {
            const required = [
                ['nama_sekolah', 'Nama Sekolah'],
                ['bab_ke', 'BAB Ke-'],
                ['judul_bab', 'Judul Bab'],
                ['topik_unit', 'Topik/Unit Pembelajaran'],
                ['capaian_pembelajaran', 'CP/kompetensi acuan'],
                ['tujuan_pembelajaran', 'Tujuan Pembelajaran'],
                ['indikator_soal', 'Indikator Soal']
            ];
            for (const [id, label] of required) {
                const element = document.getElementById(id);
                if (!element.value.trim()) {
                    showValidation(`${label} wajib diisi.`);
                    element.focus();
                    return false;
                }
            }

            updateJumlahSoalTotal();
            const total = Number(document.getElementById('jumlah_soal').value) || 0;
            if (total < 1) {
                showValidation('Jumlah soal harus lebih dari 0.');
                return false;
            }

            const difficulty = ['kesulitan_mudah', 'kesulitan_sedang', 'kesulitan_sulit']
                .reduce((sum, id) => sum + (Number(document.getElementById(id).value) || 0), 0);
            if (difficulty !== 100) {
                showValidation(`Total proporsi tingkat kesulitan harus 100%. Saat ini ${difficulty}%.`);
                return false;
            }
            hideValidation();
            return true;
        }

        function loadContohMatematikaKelas4() {
            document.getElementById('jenjang_pendidikan').value = 'SD/MI';
            updateJenjangDanPilihan('Fase B Kelas 4');
            document.getElementById('fase_kelas').value = 'Fase B Kelas 4';
            document.getElementById('mata_pelajaran').value = 'Matematika';
            document.getElementById('bab_ke').value = 'BAB 1';
            document.getElementById('judul_bab').value = 'Bilangan Cacah sampai 10.000';
            document.getElementById('topik_unit').value = 'Membaca, menulis, menentukan nilai tempat, membandingkan, mengurutkan, serta melakukan komposisi dan dekomposisi bilangan cacah sampai 10.000';
            updateCapaianPembelajaran();
            document.getElementById('tujuan_pembelajaran').value = 'Peserta didik mampu menunjukkan pemahaman dan intuisi bilangan pada bilangan cacah sampai 10.000 dengan membaca, menulis, menentukan nilai tempat, membandingkan, mengurutkan, serta melakukan komposisi dan dekomposisi bilangan secara tepat.';
            document.getElementById('indikator_soal').value = 'Peserta didik mampu membaca dan menulis bilangan cacah sampai 10.000, menentukan nilai tempat suatu angka, membandingkan dan mengurutkan bilangan, serta menyusun dan mengurai bilangan berdasarkan nilai tempat.';
            document.getElementById('nama_file_pdf').value = '';
            document.getElementById('bab_sumber').value = 'Bab 1';
            document.getElementById('halaman_sumber').value = '';
            document.getElementById('fokus_file_referensi').value = 'Bilangan cacah sampai 10.000, nilai tempat, perbandingan, pengurutan, komposisi, dan dekomposisi bilangan sesuai materi pada Bab 1';
            document.getElementById('bahasa_soal').value = 'Bahasa Indonesia baku, komunikatif, jelas, dan sesuai usia siswa SD';
            document.getElementById('gaya_soal').value = 'Berbasis konteks kehidupan sehari-hari';
            const counts = { jumlah_pg: 15, jumlah_pg_kompleks: 0, jumlah_benar_salah: 0, jumlah_menjodohkan: 0, jumlah_isian: 5, jumlah_uraian: 5, jumlah_studi_kasus: 0 };
            Object.entries(counts).forEach(([id, value]) => { document.getElementById(id).value = value; });
            updateJumlahSoalTotal();
            updateCapaianPembelajaran();
            showValidation('Contoh Matematika Kelas 4 Bab 1 berhasil dimuat.', false);
            saveFormState();
        }

        function clearForm() {
            localStorage.removeItem(AUTOSAVE_KEY);
            loadContohMatematikaKelas4();
            document.getElementById('nama_sekolah').value = '';
            document.getElementById('outputPrompt').textContent = 'Formulir telah direset ke contoh Matematika Kelas 4 Bab 1.';
            hideValidation();
            saveFormState();
        }

        function getFormState() {
            const state = {};
            document.querySelectorAll('#app-content input[id], #app-content textarea[id], #app-content select[id]').forEach(element => {
                state[element.id] = element.value;
            });
            state.checkboxes = Array.from(document.querySelectorAll('#app-content input[type="checkbox"]')).map(element => ({ name: element.name, value: element.value, checked: element.checked }));
            return state;
        }

        function saveFormState() {
            try {
                localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(getFormState()));
                const status = document.getElementById('autosave-status');
                if (status) status.textContent = 'Konfigurasi terakhir tersimpan otomatis di perangkat ini.';
            } catch (error) {
                const status = document.getElementById('autosave-status');
                if (status) status.textContent = 'Penyimpanan otomatis tidak tersedia pada browser ini.';
            }
        }

        let autosaveTimer;
        function scheduleAutosave() {
            clearTimeout(autosaveTimer);
            autosaveTimer = setTimeout(saveFormState, 300);
        }

        function restoreFormState() {
            let state;
            try { state = JSON.parse(localStorage.getItem(AUTOSAVE_KEY) || 'null'); } catch (error) { state = null; }
            if (!state) return false;
            if (state.jenjang_pendidikan) document.getElementById('jenjang_pendidikan').value = state.jenjang_pendidikan;
            updateJenjangDanPilihan(state.fase_kelas);
            Object.entries(state).forEach(([id, value]) => {
                if (id === 'checkboxes' || id === 'jenjang_pendidikan' || id === 'fase_kelas') return;
                const element = document.getElementById(id);
                if (element) element.value = value;
            });
            if (state.fase_kelas) document.getElementById('fase_kelas').value = state.fase_kelas;
            (state.checkboxes || []).forEach(item => {
                const element = document.querySelector(`input[type="checkbox"][name="${item.name}"][value="${item.value}"]`);
                if (element) element.checked = item.checked;
            });
            updateJumlahSoalTotal();
            toggleJenisStimulus();
            return true;
        }

        function generatePromptBankSoal() {
            if (!validateForm()) return;

            const value = id => document.getElementById(id).value.trim();
            const namaSekolah = value('nama_sekolah');
            const jenjang = value('jenjang_pendidikan');
            const faseKelas = value('fase_kelas');
            const mapel = value('mata_pelajaran');
            const babKe = value('bab_ke');
            const judulBab = value('judul_bab');
            const topikUnit = value('topik_unit');
            const cp = value('capaian_pembelajaran');
            const tp = value('tujuan_pembelajaran');
            const indikator = value('indikator_soal');
            const namaPdf = value('nama_file_pdf') || 'Tidak dicantumkan';
            const babSumber = value('bab_sumber') || babKe;
            const halamanSumber = value('halaman_sumber') || 'Tidak dicantumkan';
            const fokusFile = value('fokus_file_referensi') || topikUnit;
            const totalSoal = value('jumlah_soal');
            const distribusi = getDistribusiBentuk();
            const bentukSoal = getSelectedCheckboxes('bentuk_soal', 'Sesuai distribusi jumlah per bentuk');
            const dimensi = getSelectedCheckboxes('dimensi_profil_lulusan', 'Nalar Kritis, Kreativitas, Komunikasi');
            const level = getSelectedCheckboxes('level_kognitif', 'L1 (Knowing), L2 (Applying), L3 (Reasoning)');
            const proporsiLevel = value('proporsi_level') || 'Seimbang dan sesuai karakter materi';
            const kesulitan = `Mudah ${value('kesulitan_mudah')}%, Sedang ${value('kesulitan_sedang')}%, Sulit ${value('kesulitan_sulit')}%`;
            const konteks = getSelectedCheckboxes('konteks_soal', 'Kehidupan Sehari-hari, Lingkungan Sekolah, Budaya dan Literasi Indonesia');
            const gunakanStimulus = value('stimulus_soal');
            const stimulus = gunakanStimulus === 'Ya' ? getSelectedCheckboxes('jenis_stimulus', 'Teks Bacaan') : 'Tidak menggunakan stimulus';
            const bahasa = value('bahasa_soal');
            const gaya = value('gaya_soal');
            const peruntukan = value('catatan_peruntukan') || 'Fleksibel untuk asesmen diagnostik, formatif, sumatif, latihan, atau ujian sesuai kebutuhan guru';
            const formatBank = value('format_bank_soal');
            const formatOutput = value('format_output_ai');
            const komponen = getSelectedCheckboxes('komponen_bank_soal', 'Nomor Soal, Butir Soal, Kunci Jawaban');
            const kunci = value('sertakan_kunci_jawaban');
            const pembahasan = value('sertakan_pembahasan');
            const penskoran = value('sertakan_pedoman_penskoran');
            const catatan = value('catatan_khusus_penyusunan_soal') || 'Hindari soal jebakan dan gunakan redaksi yang santun, jelas, serta sesuai usia peserta didik.';
            const tambahan = value('instruksiTambahan');

            const prompt = `Bertindaklah sebagai pakar pembelajaran Matematika, ahli evaluasi pendidikan, dan penyusun bank soal Kurikulum Merdeka yang teliti. Susun bank soal yang valid, akurat secara matematis, sesuai fase perkembangan numerasi, kontekstual, dan siap digunakan berdasarkan parameter berikut.

### 0. ATURAN SUMBER MATERI - WAJIB
- Jika file materi ajar dilampirkan dalam percakapan ini, baca file tersebut terlebih dahulu dan jadikan sebagai ACUAN UTAMA. Jangan mengarang konsep, definisi, sifat, teorema, rumus, simbol, satuan, data, contoh, atau materi matematika di luar cakupan file.
- Nama file yang diharapkan: ${namaPdf}
- Bagian rujukan: ${babSumber}; ${halamanSumber}
- Fokus materi: ${fokusFile}
- CP pada formulir dipetakan otomatis dari dokumen resmi Matematika sesuai fase. Selaraskan TP dan indikator dengan CP tersebut serta isi file materi yang dilampirkan; jangan memperluas soal keluar dari materi file.
- Jika tidak ada file yang dilampirkan, gunakan CP/kompetensi, TP, indikator, topik, dan catatan pada formulir sebagai batas materi.
- Pastikan seluruh perhitungan, notasi, simbol, istilah, satuan, diagram, tabel, grafik, kunci jawaban, dan pembahasan akurat serta konsisten. Untuk pilihan ganda, wajib hanya ada satu jawaban paling tepat kecuali bentuk soal menyatakan sebaliknya.
- Tampilkan ekspresi matematika dengan format yang terbaca jelas. Hindari data yang kurang, angka yang menimbulkan ambiguitas, soal jebakan, dan konteks yang tidak masuk akal.
- Gunakan konteks yang santun, inklusif, komunikatif, relevan dengan kehidupan murid, dan tidak membebani soal dengan bacaan yang tidak diperlukan.

### 1. IDENTITAS
- Nama Sekolah: ${namaSekolah}
- Jenjang: ${jenjang}
- Fase/Kelas: ${faseKelas}
- Mata Pelajaran: ${mapel}

### 2. BAB DAN KOMPETENSI
- BAB: ${babKe}
- Judul Bab: ${judulBab}
- Topik/Unit: ${topikUnit}
- CP/Kompetensi Acuan: ${cp}
- Tujuan Pembelajaran: ${tp}
- Indikator Soal: ${indikator}

### 3. STRUKTUR BANK SOAL
- Total Soal: ${totalSoal} butir
- Distribusi Wajib: ${distribusi}
- Bentuk Soal: ${bentukSoal}
- Tingkat Kesulitan: ${kesulitan}
- Level Kognitif: ${level}
- Proporsi Level: ${proporsiLevel}
- Dimensi Profil Lulusan: ${dimensi}

### 4. KONTEKS DAN PENYAJIAN
- Konteks: ${konteks}
- Gunakan Stimulus: ${gunakanStimulus}
- Jenis Stimulus: ${stimulus}
- Bahasa: ${bahasa}
- Gaya: ${gaya}
- Peruntukan: ${peruntukan}

### 5. FORMAT OUTPUT
- Format Bank Soal: ${formatBank}
- Format Output dari AI: ${formatOutput}
- Komponen: ${komponen}
- Sertakan Kunci Jawaban: ${kunci}
- Sertakan Pembahasan: ${pembahasan}
- Sertakan Pedoman Penskoran: ${penskoran}

### 6. CATATAN
- Catatan Khusus: ${catatan}${tambahan ? `\n- Instruksi Tambahan: ${tambahan}` : ''}

### TUGAS AKHIR
Susun tepat ${totalSoal} butir sesuai distribusi wajib (${distribusi}). Pastikan setiap soal terhubung dengan TP dan indikator, tidak berulang, tidak saling membocorkan jawaban, serta seluruh jawaban dapat diverifikasi dari file atau parameter materi. Jika satu stimulus digunakan untuk beberapa soal, setiap butir harus tetap independen. Cantumkan sumber halaman pada setiap kelompok soal apabila file menyediakan nomor halaman.

${formatOutput.includes('.docx') ? 'Buat hasil akhir sebagai file Microsoft Word (.docx) yang rapi, siap diunduh, dengan tabel yang tidak terpotong. Lampirkan file tersebut pada jawaban.' : 'Tampilkan hasil lengkap langsung dalam percakapan tanpa placeholder atau bagian yang terpotong.'}`;

            document.getElementById('outputPrompt').textContent = prompt;
            document.getElementById('output-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
            showValidation('Prompt berhasil dibuat.', false);
            saveFormState();
        }

        function copyToClipboard() {
            const text = document.getElementById('outputPrompt').textContent;
            if (!text || text.includes('Isi data pada formulir')) {
                showValidation('Hasilkan prompt terlebih dahulu sebelum menyalin.', true);
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                const label = document.getElementById('copyText');
                label.textContent = 'Tersalin!';
                setTimeout(() => { label.textContent = 'Salin Prompt'; }, 1800);
            }).catch(() => showValidation('Prompt tidak dapat disalin otomatis. Pilih teks pada kotak output lalu salin secara manual.', true));
        }

        function downloadPromptTxt() {
            const text = document.getElementById('outputPrompt').textContent;
            if (!text || text.includes('Isi data pada formulir')) {
                showValidation('Hasilkan prompt terlebih dahulu sebelum mengunduh.', true);
                return;
            }
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'prompt-bank-soal-matematika.txt';
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        }

        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('login-button').addEventListener('click', handleLogin);
            document.getElementById('login-form').addEventListener('submit', handleLogin);
            document.getElementById('password').addEventListener('keydown', event => {
                if (event.key === 'Enter') handleLogin(event);
            });

            if (!restoreFormState()) updateJenjangDanPilihan('Fase B Kelas 4');
            updateJumlahSoalTotal();
            toggleJenisStimulus();

            document.querySelectorAll('#app-content input, #app-content textarea, #app-content select').forEach(element => {
                element.addEventListener('change', scheduleAutosave);
                if (!element.readOnly) element.addEventListener('input', scheduleAutosave);
            });

            if (sessionStorage.getItem(SESSION_KEY) === 'active') showApp();
            else showLogin();
        });

        document.addEventListener('contextmenu', event => event.preventDefault());
