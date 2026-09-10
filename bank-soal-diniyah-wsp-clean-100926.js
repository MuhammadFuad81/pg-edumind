const PG_CODE = 'bank_soal_diniyah_110926';
        const SESSION_KEY = 'akds_session_' + PG_CODE;
        const AUTOSAVE_KEY = 'akds_autosave_' + PG_CODE;

        const PILIHAN_KELAS = {
            'SD/MI': ['Fase A Kelas 1', 'Fase A Kelas 2', 'Fase B Kelas 3', 'Fase B Kelas 4', 'Fase C Kelas 5', 'Fase C Kelas 6'],
            'SMP/MTs': ['Fase D Kelas 7', 'Fase D Kelas 8', 'Fase D Kelas 9'],
            'SMA/MA': ['Fase E Kelas 10', 'Fase F Kelas 11', 'Fase F Kelas 12'],
            'SMK': ['Fase E Kelas 10', 'Fase F Kelas 11', 'Fase F Kelas 12']
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

        const MAPEL_GUIDANCE = {
            'PAI': 'Selaraskan soal dengan ruang lingkup Pendidikan Agama Islam secara utuh sesuai materi yang diberikan. Jaga ketepatan dalil, istilah keislaman, adab, dan penerapan nilai dalam kehidupan peserta didik.',
            'Al-Qur’an/Tafsir': 'Utamakan ketepatan teks Al-Qur’an, nama surah, nomor ayat, harakat bila ditampilkan, terjemah, kosakata, kandungan ayat, dan penjelasan tafsir sesuai sumber yang dilampirkan. Jangan menambahkan tafsir atau sebab turun ayat yang tidak tersedia pada sumber.',
            'Hadis': 'Pastikan matan, terjemah, tema, perawi, sumber hadis, dan kandungan hadis mengikuti materi rujukan. Jangan membuat lafaz, sanad, derajat, atau rujukan hadis yang tidak terdapat pada sumber.',
            'Akidah/Tauhid': 'Gunakan istilah akidah dan tauhid secara presisi sesuai materi rujukan. Hindari memperluas pembahasan ke perdebatan mazhab atau isu teologis yang tidak terdapat dalam bahan ajar.',
            'Akhlak/Adab': 'Susun soal yang menilai pemahaman, pertimbangan sikap, dan penerapan akhlak/adab secara konkret. Gunakan situasi yang dekat dengan kehidupan peserta didik dan hindari penghakiman yang berlebihan.',
            'Fikih': 'Pastikan hukum, syarat, rukun, tata cara, kategori, dan contoh fikih mengikuti sumber yang dilampirkan. Jika materi memuat perbedaan pendapat, pertahankan batas dan redaksi yang digunakan sumber; jangan menambah pendapat di luar materi.',
            'Tarikh/Sejarah Islam': 'Jaga akurasi nama tokoh, tempat, urutan peristiwa, waktu, sebab-akibat, dan pelajaran sejarah berdasarkan sumber. Jangan mengarang detail historis yang tidak didukung materi.',
            'Bahasa Arab': 'Sesuaikan soal dengan keterampilan yang diukur: mufradat, qira’ah, kitabah, istima’, kalam, atau unsur kebahasaan. Pastikan tulisan Arab, harakat bila diperlukan, makna kosakata, struktur kalimat, nahwu, dan sharaf akurat serta sesuai tingkat peserta didik. Jangan membuat kaidah atau terjemah yang tidak dapat diverifikasi dari sumber.'
        };

        function getMapelGuidance(mapel) {
            return MAPEL_GUIDANCE[mapel] || 'Susun soal sesuai karakter mata pelajaran, tingkat peserta didik, dan batas materi pada sumber yang diberikan.';
        }

        function handleLogin(event) {
            if (event) event.preventDefault();
            const loginScreen = document.getElementById('login-screen');
            const validUsername = loginScreen.dataset.loginUsername || 'edumind';
            const validPassword = loginScreen.dataset.loginPassword || 'akds-110826';
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
            else if (jenjang === 'SD/MI') select.value = 'Fase B Kelas 3';
            updateCapaianPembelajaran();
            scheduleAutosave();
        }

        function updateCapaianPembelajaran() {
            toggleMapelLainnya();
            scheduleAutosave();
        }

        function toggleMapelLainnya() {
            const select = document.getElementById('mata_pelajaran');
            const wrapper = document.getElementById('wrapper_mapel_lainnya');
            const input = document.getElementById('mata_pelajaran_lainnya');
            if (!select || !wrapper || !input) return;

            const isLainnya = select.value === 'Lainnya';
            wrapper.classList.toggle('hidden', !isLainnya);
            input.required = isLainnya;
            if (!isLainnya) input.value = '';
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

            const pilihanMapel = document.getElementById('mata_pelajaran').value;
            if (pilihanMapel === 'Lainnya') {
                const mapelLainnya = document.getElementById('mata_pelajaran_lainnya');
                if (!mapelLainnya.value.trim()) {
                    showValidation('Nama Mata Pelajaran Lainnya wajib diisi.');
                    mapelLainnya.focus();
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

        function loadContohDiniyah() {
            document.getElementById('jenjang_pendidikan').value = 'SD/MI';
            updateJenjangDanPilihan('Fase B Kelas 3');
            document.getElementById('fase_kelas').value = 'Fase B Kelas 3';
            document.getElementById('mata_pelajaran').value = 'PAI';
            document.getElementById('mata_pelajaran_lainnya').value = '';
            toggleMapelLainnya();
            document.getElementById('bab_ke').value = 'BAB 1';
            document.getElementById('judul_bab').value = "Asyiknya Belajar Surah Al-'Alaq";
            document.getElementById('topik_unit').value = "Membaca, menulis, menghafal, dan memahami pesan pokok QS. Al-'Alaq ayat 1-5 serta mengenal hukum bacaan qalqalah";
            document.getElementById('capaian_pembelajaran').value = 'Disesuaikan dengan kompetensi yang tercantum atau tersirat dalam file materi ajar yang dilampirkan pengguna.';
            document.getElementById('tujuan_pembelajaran').value = "Membaca QS. Al-'Alaq ayat 1-5 dengan tartil; menulis dan menghafalkannya dengan benar; mengenali hukum bacaan qalqalah; serta menjelaskan dan menyimpulkan pesan pokok surah.";
            document.getElementById('indikator_soal').value = "Peserta didik mampu mengidentifikasi urutan dan pesan pokok QS. Al-'Alaq ayat 1-5, membedakan qalqalah sugra dan kubra, serta menerapkan nilai rajin membaca dan belajar dalam kehidupan sehari-hari.";
            document.getElementById('nama_file_pdf').value = 'Islam_BS_KLS_III_compressed.pdf';
            document.getElementById('bab_sumber').value = 'Bab I';
            document.getElementById('halaman_sumber').value = 'Halaman buku 1-24 (halaman PDF 19-42)';
            document.getElementById('fokus_file_referensi').value = "QS. Al-'Alaq ayat 1-5, hukum bacaan qalqalah, dan pesan pokok surah";
            document.getElementById('bahasa_soal').value = 'Bahasa Indonesia sederhana, konkret, dan sesuai usia siswa SD';
            document.getElementById('gaya_soal').value = 'Berbasis konteks kehidupan sehari-hari';
            const counts = { jumlah_pg: 15, jumlah_pg_kompleks: 0, jumlah_benar_salah: 0, jumlah_menjodohkan: 0, jumlah_isian: 5, jumlah_uraian: 5, jumlah_studi_kasus: 0 };
            Object.entries(counts).forEach(([id, value]) => { document.getElementById(id).value = value; });
            updateJumlahSoalTotal();
            showValidation('Contoh Mapel Diniyah — PAI Kelas 3 Bab 1 berhasil dimuat.', false);
            saveFormState();
        }

        function clearForm() {
            localStorage.removeItem(AUTOSAVE_KEY);
            loadContohDiniyah();
            document.getElementById('nama_sekolah').value = '';
            document.getElementById('outputPrompt').textContent = 'Formulir telah direset ke contoh Mapel Diniyah — PAI Kelas 3 Bab 1.';
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
            toggleMapelLainnya();
            return true;
        }

        function generatePromptBankSoal() {
            if (!validateForm()) return;

            const value = id => document.getElementById(id).value.trim();
            const namaSekolah = value('nama_sekolah');
            const jenjang = value('jenjang_pendidikan');
            const faseKelas = value('fase_kelas');
            const pilihanMapel = value('mata_pelajaran');
            const mapel = pilihanMapel === 'Lainnya' ? value('mata_pelajaran_lainnya') : pilihanMapel;
            const panduanMapel = getMapelGuidance(mapel);
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
            const dimensi = getSelectedCheckboxes('dimensi_profil_lulusan', 'Keimanan, Nalar Kritis, Komunikasi');
            const level = getSelectedCheckboxes('level_kognitif', 'L1 (Knowing), L2 (Applying), L3 (Reasoning)');
            const proporsiLevel = value('proporsi_level') || 'Seimbang dan sesuai karakter materi';
            const kesulitan = `Mudah ${value('kesulitan_mudah')}%, Sedang ${value('kesulitan_sedang')}%, Sulit ${value('kesulitan_sulit')}%`;
            const konteks = getSelectedCheckboxes('konteks_soal', 'Keislaman/Adab, Kehidupan Sehari-hari');
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

            const prompt = `Bertindaklah sebagai pakar mata pelajaran Diniyah, ahli evaluasi pendidikan, dan penyusun bank soal yang teliti. Mata pelajaran yang sedang dipilih adalah **${mapel}**. Susun bank soal yang valid, ramah peserta didik, kontekstual, akurat terhadap sumber, dan siap digunakan berdasarkan parameter berikut.

### 0. ATURAN SUMBER MATERI - WAJIB
- Jika file materi ajar dilampirkan dalam percakapan ini, baca file tersebut terlebih dahulu dan jadikan sebagai ACUAN UTAMA. Jangan mengarang materi, ayat, hadis, hukum, istilah Arab, atau fakta sejarah di luar cakupan file.
- Nama file yang diharapkan: ${namaPdf}
- Bagian rujukan: ${babSumber}; ${halamanSumber}
- Fokus materi: ${fokusFile}
- Karena generator ini tidak memakai basis data CP/kompetensi eksternal, identifikasi dan selaraskan CP/kompetensi, TP, serta indikator dengan isi file yang dilampirkan. Isian CP, TP, dan indikator di bawah merupakan arah kerja awal yang boleh dipertajam berdasarkan file, tetapi tidak boleh diperluas keluar dari materi file.
- Jika tidak ada file yang dilampirkan, gunakan CP/kompetensi, TP, indikator, topik, dan catatan pada formulir sebagai batas materi.
- Terapkan panduan khusus mapel berikut: ${panduanMapel}
- Untuk materi yang memuat teks Arab, ayat Al-Qur’an, hadis, doa, istilah Arab, atau kutipan kitab, pastikan penulisan, harakat bila diperlukan, terjemah, dan rujukannya akurat. Jangan membuat kutipan yang tidak ada pada sumber.
- Gunakan bahasa yang santun, jelas, mendidik, tidak provokatif, dan sesuai usia peserta didik.

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
            showValidation('Prompt Bank Soal Mapel Diniyah berhasil dibuat.', false);
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
            link.download = 'prompt-bank-soal-diniyah.txt';
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

            if (!restoreFormState()) updateJenjangDanPilihan('Fase B Kelas 3');
            updateJumlahSoalTotal();
            toggleJenisStimulus();
            toggleMapelLainnya();

            document.querySelectorAll('#app-content input, #app-content textarea, #app-content select').forEach(element => {
                element.addEventListener('change', scheduleAutosave);
                if (!element.readOnly) element.addEventListener('input', scheduleAutosave);
            });

            if (sessionStorage.getItem(SESSION_KEY) === 'active') showApp();
            else showLogin();
        });

        document.addEventListener('contextmenu', event => event.preventDefault());
