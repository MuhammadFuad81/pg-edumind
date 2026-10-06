const PG_CODE = 'bank_soal_pendidikan_pancasila_061026';
        const SESSION_KEY = 'akds_session_' + PG_CODE;
        const AUTOSAVE_KEY = 'akds_autosave_' + PG_CODE;

        const PILIHAN_KELAS = {
            'SD/MI': ['Fase A Kelas 1', 'Fase A Kelas 2', 'Fase B Kelas 3', 'Fase B Kelas 4', 'Fase C Kelas 5', 'Fase C Kelas 6'],
            'SMP/MTs': ['Fase D Kelas 7', 'Fase D Kelas 8', 'Fase D Kelas 9'],
            'SMA/MA': ['Fase E Kelas 10', 'Fase F Kelas 11', 'Fase F Kelas 12'],
            'SMK': ['Fase E Kelas 10', 'Fase F Kelas 11', 'Fase F Kelas 12']
        };
        const CAPAIAN_PEMBELAJARAN = {
            A: "Fase A - Pancasila: Mengenal bendera negara, lagu kebangsaan, simbol dan sila-sila Pancasila dalam lambang negara Garuda Pancasila dan simbol Pancasila beserta sila-sila Pancasila; menerapkan nilai-nilai Pancasila di lingkungan keluarga. Undang-Undang Dasar Negara Republik Indonesia Tahun 1945: Mengenal aturan di lingkungan keluarga; menunjukkan dan menceritakan sikap mematuhi aturan di lingkungan keluarga. Bhinneka Tunggal Ika: Mengenal semboyan Bhinneka Tunggal Ika; mengidentifikasi dan menghargai identitas dirinya sesuai dengan jenis kelamin, hobi, bahasa, serta agama dan kepercayaan di lingkungan sekitar. Negara Kesatuan Republik Indonesia: Mengenal karakteristik lingkungan tempat tinggal dan sekolah sebagai bagian dari wilayah Negara Kesatuan Republik Indonesia; menceritakan dan mempraktikkan bekerja sama menjaga lingkungan sekitar dalam keberagaman.",
            B: "Fase B - Pancasila: Mengidentifikasi makna sila-sila Pancasila dan penerapannya dalam kehidupan sehari-hari; mengenal karakter para perumus Pancasila; menunjukkan sikap bangga menjadi anak Indonesia yang memiliki bahasa Indonesia sebagai bahasa persatuan di lingkungan sekitar. Undang-Undang Dasar Negara Republik Indonesia Tahun 1945: Mengidentifikasi dan melaksanakan aturan di sekolah dan lingkungan tempat tinggal; mengidentifikasi dan menerapkan hak yang didapat dan kewajiban sebagai anggota keluarga dan sebagai warga sekolah. Bhinneka Tunggal Ika: Membedakan dan menghargai identitas, keluarga, dan teman-temannya sesuai budaya, suku bangsa, bahasa, agama dan kepercayaannya di lingkungan sekitar. Negara Kesatuan Republik Indonesia: Mengidentifikasi lingkungan tempat tinggal (RT, RW, desa atau kelurahan, dan kecamatan) sebagai bagian dari wilayah Negara Kesatuan Republik Indonesia; menunjukkan perilaku bekerja sama dalam berbagai bentuk keberagaman suku bangsa, sosial, dan budaya di Indonesia yang terikat persatuan dan kesatuan di lingkungan sekitar.",
            C: "Fase C - Pancasila: Memahami kronologi sejarah kelahiran Pancasila; meneladani sikap para perumus Pancasila dan menerapkan di lingkungan masyarakat; menghubungkan sila-sila dalam Pancasila sebagai suatu kesatuan yang utuh; menguraikan makna nilai-nilai Pancasila sebagai dasar negara dan pandangan hidup bangsa. Undang-Undang Dasar Negara Republik Indonesia Tahun 1945: Mengimplementasikan bentuk-bentuk norma, hak, dan kewajiban dalam kedudukannya sebagai warga negara; mengenal Pembukaan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945; mempraktikkan musyawarah untuk membuat kesepakatan dan aturan bersama serta menerapkannya dalam lingkungan keluarga dan sekolah. Bhinneka Tunggal Ika: Menyajikan hasil identifikasi sikap menghormati, menjaga, dan melestarikan keberagaman budaya sesuai semboyan dalam bingkai Bhinneka Tunggal Ika di lingkungan sekitar. Negara Kesatuan Republik Indonesia: Mengenal wilayahnya dalam konteks kabupaten/kota dan provinsi sebagai bagian dari wilayah Negara Kesatuan Republik Indonesia; menunjukkan perilaku gotong royong untuk menjaga persatuan di lingkungan sekolah dan sekitar sebagai wujud bela negara.",
            D: "Fase D - Pancasila: Memahami sejarah kelahiran Pancasila; memahami kedudukan Pancasila sebagai dasar negara, pandangan hidup bangsa, dan ideologi negara serta penerapannya dalam kehidupan sehari-hari; memahami makna keterkaitan Pancasila dengan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, Bhinneka Tunggal Ika, dan Negara Kesatuan Republik Indonesia. Undang-Undang Dasar Negara Republik Indonesia Tahun 1945: Menerapkan norma dan aturan; memahami tata urutan peraturan perundang-undangan yang berlaku di Indonesia; menggunakan hak dan menerapkan kewajiban sebagai warga negara; memahami sejarah, fungsi, dan kedudukan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945; mempraktikkan kemerdekaan berpendapat sebagai warga negara dalam era keterbukaan informasi. Bhinneka Tunggal Ika: Mengidentifikasi keberagaman suku bangsa, agama dan kepercayaan, ras, dan antargolongan dalam bingkai Bhinneka Tunggal Ika dan menerima keberagaman dalam kehidupan bermasyarakat; memahami pentingnya pelestarian tradisi, kearifan lokal, dan budaya daerah sebagai identitas nasional; menumbuhkan sikap tanggung jawab dan berperan aktif melestarikan praktik tradisi, kearifan lokal, dan budaya daerah dalam masyarakat global. Negara Kesatuan Republik Indonesia: Memahami Proklamasi Kemerdekaan Republik Indonesia; memahami wilayah Negara Kesatuan Republik Indonesia dalam konteks wawasan nusantara; berpartisipasi aktif untuk menjaga keutuhan wilayah Negara Kesatuan Republik Indonesia.",
            E: "Fase E - Pancasila: Menganalisis cara pandang para perumus Pancasila tentang dasar negara; menganalisis kedudukan Pancasila sebagai dasar negara, pandangan hidup bangsa, dan ideologi negara. Undang-Undang Dasar Negara Republik Indonesia Tahun 1945: Menerapkan perilaku taat hukum berdasarkan peraturan yang berlaku untuk mewujudkan harmoni dengan sesama manusia dan lingkungan; menganalisis tata urutan peraturan perundang-undangan di Indonesia; menganalisis makna kedudukan Pancasila sebagai sumber dari segala sumber hukum negara. Bhinneka Tunggal Ika: Menyajikan makna semboyan Bhinneka Tunggal Ika sebagai modal sosial; memahami prinsip gotong royong sebagai perwujudan sistem ekonomi Pancasila yang inklusif dan berkeadilan. Negara Kesatuan Republik Indonesia: Memahami peran dan kedudukannya sebagai warga negara Indonesia; memahami sistem pertahanan dan keamanan negara; menganalisis peran Indonesia dalam hubungan antarnegara; memahami nilai-nilai Pancasila dalam konteks pembangunan nasional.",
            F: "Fase F - Pancasila: Mendeskripsikan rumusan dan keterkaitan sila-sila dalam Pancasila; menganalisis peluang dan tantangan penerapan nilai-nilai Pancasila dalam kehidupan global dalam konteks Pancasila sebagai ideologi negara; membiasakan perilaku yang sesuai dengan nilai-nilai Pancasila sebagai identitas nasional dalam kehidupan sehari-hari. Undang-Undang Dasar Negara Republik Indonesia Tahun 1945: Menganalisis dinamika pemberlakuan Undang-Undang Dasar 1945; menunjukkan sikap demokratis berdasarkan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 dalam era keterbukaan informasi; menganalisis kasus pelanggaran hak dan pengingkaran kewajiban warga negara serta merumuskan solusi sebagai upaya perlindungan hukum; menganalisis makna kesatuan Pancasila dengan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945. Bhinneka Tunggal Ika: Menganalisis potensi konflik dan memberi solusi yang berkeadilan terhadap permasalahan keberagaman di masyarakat; merancang kegiatan bersama dengan prinsip gotong royong dalam praktik hidup sehari-hari. Negara Kesatuan Republik Indonesia: Mendemonstrasikan praktik demokrasi berlandaskan Pancasila dalam kehidupan berbangsa dan bernegara; menganalisis dan merumuskan solusi terkait ancaman, tantangan, hambatan, dan gangguan (ATHG) yang dihadapi Indonesia; menganalisis sistem pemerintahan Indonesia dan peran lembaga-lembaga negara dalam bidang politik, ekonomi, sosial, budaya, pertahanan, dan keamanan."
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
            cpField.value = CAPAIAN_PEMBELAJARAN[fase] || CAPAIAN_PEMBELAJARAN.B;

            if (status) {
                status.textContent = 'CP Pendidikan Pancasila dari dokumen rujukan diperbarui otomatis berdasarkan fase yang dipilih.';
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

        function loadContohPendidikanPancasilaKelas3() {
            document.getElementById('jenjang_pendidikan').value = 'SD/MI';
            updateJenjangDanPilihan('Fase B Kelas 3');
            document.getElementById('fase_kelas').value = 'Fase B Kelas 3';
            document.getElementById('mata_pelajaran').value = 'Pendidikan Pancasila';
            document.getElementById('bab_ke').value = 'BAB 1';
            document.getElementById('judul_bab').value = 'Aku Menerapkan Nilai-Nilai Pancasila';
            document.getElementById('topik_unit').value = 'Makna sila-sila Pancasila dan penerapannya dalam kehidupan sehari-hari, pengenalan karakter para perumus Pancasila, serta sikap bangga menggunakan bahasa Indonesia sebagai bahasa persatuan.';
            document.getElementById('capaian_pembelajaran').value = CAPAIAN_PEMBELAJARAN.B;
            document.getElementById('tujuan_pembelajaran').value = 'Murid mampu mengidentifikasi makna sila-sila Pancasila dan contoh penerapannya dalam kehidupan sehari-hari, mengenal karakter para perumus Pancasila, serta menunjukkan sikap bangga menjadi anak Indonesia.';
            document.getElementById('indikator_soal').value = 'Murid mampu menentukan makna sila Pancasila, memilih perilaku yang sesuai dengan nilai Pancasila, mengenali keteladanan karakter para perumus Pancasila, dan mengidentifikasi sikap bangga sebagai anak Indonesia sesuai materi pada Bab 1.';
            document.getElementById('nama_file_pdf').value = '';
            document.getElementById('bab_sumber').value = 'Bab 1';
            document.getElementById('halaman_sumber').value = '';
            document.getElementById('fokus_file_referensi').value = 'Makna sila-sila Pancasila, penerapan nilai Pancasila dalam kehidupan sehari-hari, karakter para perumus Pancasila, dan sikap bangga sebagai anak Indonesia sesuai materi pada Bab 1';
            document.getElementById('bahasa_soal').value = 'Bahasa Indonesia baku, komunikatif, jelas, dan sesuai usia siswa SD';
            document.getElementById('gaya_soal').value = 'Berbasis situasi kewargaan dan kehidupan sehari-hari';
            const counts = { jumlah_pg: 15, jumlah_pg_kompleks: 0, jumlah_benar_salah: 0, jumlah_menjodohkan: 0, jumlah_isian: 5, jumlah_uraian: 5, jumlah_studi_kasus: 0 };
            Object.entries(counts).forEach(([id, value]) => { document.getElementById(id).value = value; });
            updateJumlahSoalTotal();
            updateCapaianPembelajaran();
            showValidation('Contoh Pendidikan Pancasila Kelas 3 Bab 1 berhasil dimuat.', false);
            saveFormState();
        }

        function clearForm() {
            localStorage.removeItem(AUTOSAVE_KEY);
            loadContohPendidikanPancasilaKelas3();
            document.getElementById('nama_sekolah').value = '';
            document.getElementById('outputPrompt').textContent = 'Formulir telah direset ke contoh Pendidikan Pancasila Kelas 3 Bab 1.';
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
            const konteks = getSelectedCheckboxes('konteks_soal', 'Kehidupan Sehari-hari, Lingkungan Sekolah, Keberagaman dan Kewargaan Indonesia');
            const gunakanStimulus = value('stimulus_soal');
            const stimulus = gunakanStimulus === 'Ya' ? getSelectedCheckboxes('jenis_stimulus', 'Teks Bacaan, Gambar/Ilustrasi') : 'Tidak menggunakan stimulus';
            const bahasa = value('bahasa_soal');
            const gaya = value('gaya_soal');
            const peruntukan = value('catatan_peruntukan') || 'Fleksibel untuk asesmen diagnostik, formatif, sumatif, latihan, atau ujian sesuai kebutuhan guru';
            const formatBank = value('format_bank_soal');
            const formatOutput = value('format_output_ai');
            const komponen = getSelectedCheckboxes('komponen_bank_soal', 'Nomor Soal, Butir Soal, Kunci Jawaban');
            const kunci = value('sertakan_kunci_jawaban');
            const pembahasan = value('sertakan_pembahasan');
            const penskoran = value('sertakan_pedoman_penskoran');
            const catatan = value('catatan_khusus_penyusunan_soal') || 'Hindari soal jebakan; gunakan Bahasa Indonesia baku dan jelas; jangan mengarang nomor pasal, tanggal, fakta sejarah, kewenangan lembaga, atau ketentuan hukum yang tidak didukung sumber; utamakan penalaran kewargaan sesuai fase.';
            const tambahan = value('instruksiTambahan');

            const prompt = `Bertindaklah sebagai pakar Pendidikan Pancasila, ahli evaluasi pendidikan, dan penyusun bank soal Kurikulum Merdeka yang teliti. Susun bank soal yang valid, kontekstual, sesuai fase perkembangan murid, berorientasi pada penalaran kewargaan, dan siap digunakan berdasarkan parameter berikut.

### 0. ATURAN SUMBER MATERI - WAJIB
- Jika file materi ajar dilampirkan dalam percakapan ini, baca file tersebut terlebih dahulu dan jadikan sebagai ACUAN UTAMA. Jangan mengarang fakta sejarah, tanggal, tokoh, nomor pasal, bunyi peraturan, kewenangan lembaga, konsep kewargaan, contoh kasus, atau materi lain di luar cakupan file.
- Nama file yang diharapkan: ${namaPdf}
- Bagian rujukan: ${babSumber}; ${halamanSumber}
- Fokus materi: ${fokusFile}
- CP pada formulir dipetakan otomatis dari dokumen Capaian Pembelajaran Pendidikan Pancasila sesuai fase. Selaraskan TP dan indikator dengan CP tersebut serta isi file materi yang dilampirkan; jangan memperluas soal keluar dari materi file.
- Jika tidak ada file yang dilampirkan, gunakan CP/kompetensi, TP, indikator, topik, dan catatan pada formulir sebagai batas materi.
- Pastikan istilah Pancasila, UUD Negara Republik Indonesia Tahun 1945, Bhinneka Tunggal Ika, NKRI, norma, hak-kewajiban, demokrasi, hukum, keberagaman, dan kewargaan digunakan secara tepat sesuai materi dan fase.
- Gunakan konteks kewargaan yang santun, inklusif, non-diskriminatif, menghargai keberagaman Indonesia, dan relevan dengan kehidupan murid. Hindari stereotip SARA, propaganda partisan, serta soal yang meminta murid menyetujui pandangan politik tertentu.

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
            link.download = 'prompt-bank-soal-pendidikan-pancasila.txt';
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

            document.querySelectorAll('#app-content input, #app-content textarea, #app-content select').forEach(element => {
                element.addEventListener('change', scheduleAutosave);
                if (!element.readOnly) element.addEventListener('input', scheduleAutosave);
            });

            if (sessionStorage.getItem(SESSION_KEY) === 'active') showApp();
            else showLogin();
        });

        document.addEventListener('contextmenu', event => event.preventDefault());
