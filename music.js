/**
 * Background Music Controller
 * Laboratorium Virtual SD
 * Author: Frissenda Septrianur Marinda Karno Putri - 220611100069
 */

// Cek apakah music control sudah ada di halaman
if (document.getElementById('bgMusic')) {
    
    // Inisialisasi variabel
    let isPlaying = false;
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    const musicIcon = document.getElementById('musicIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    
    // Load preferensi dari localStorage
    const savedState = localStorage.getItem('musicPlaying');
    const savedVolume = localStorage.getItem('musicVolume');
    
    // Set volume dari localStorage atau default 30%
    if (savedVolume) {
        bgMusic.volume = savedVolume / 100;
        if (volumeSlider) volumeSlider.value = savedVolume;
        updateIcon(savedVolume);
    } else {
        bgMusic.volume = 0.3;
    }
    
    // Auto-play jika sebelumnya sedang play (dengan user interaction check)
    if (savedState === 'true') {
        isPlaying = true;
        if (musicIcon) musicIcon.textContent = '🔊';
        if (musicBtn) musicBtn.title = 'Pause Music';
        
        // Coba play, jika gagal tunggu user interaction
        bgMusic.play().catch(() => {
            isPlaying = false;
            if (musicIcon) musicIcon.textContent = '🔇';
        });
    }
    
    // Toggle Play/Pause
    function toggleMusic() {
        if (!bgMusic) return;
        
        if (isPlaying) {
            bgMusic.pause();
            if (musicIcon) musicIcon.textContent = '🔇';
            if (musicBtn) musicBtn.title = 'Play Music';
            localStorage.setItem('musicPlaying', 'false');
        } else {
            bgMusic.play().catch(error => {
                console.log('Autoplay perlu interaksi user');
                if (musicIcon) musicIcon.textContent = '⚠️';
            });
            if (musicIcon) musicIcon.textContent = '🔊';
            if (musicBtn) musicBtn.title = 'Pause Music';
            localStorage.setItem('musicPlaying', 'true');
        }
        isPlaying = !isPlaying;
    }
    
    // Set Volume
    function setVolume(value) {
        if (!bgMusic) return;
        bgMusic.volume = value / 100;
        localStorage.setItem('musicVolume', value);
        updateIcon(value);
    }
    
    // Update icon berdasarkan volume
    function updateIcon(value) {
        if (!musicIcon) return;
        if (value == 0) {
            musicIcon.textContent = '🔇';
        } else if (value < 50) {
            musicIcon.textContent = '🔉';
        } else {
            musicIcon.textContent = '🔊';
        }
    }
    
    // Auto-play pada interaksi user pertama (bypass browser policy)
    let firstInteraction = false;
    document.addEventListener('click', function handleFirstClick() {
        if (!firstInteraction && !isPlaying) {
            // Optional: Auto-play setelah klik pertama
            // bgMusic.play().then(() => {
            //     isPlaying = true;
            //     if (musicIcon) musicIcon.textContent = '🔊';
            //     localStorage.setItem('musicPlaying', 'true');
            // }).catch(e => console.log('Play manual'));
        }
        firstInteraction = true;
        document.removeEventListener('click', handleFirstClick);
    }, { once: true });
    
    // Expose functions ke window agar bisa dipanggil dari HTML
    window.toggleMusic = toggleMusic;
    window.setVolume = setVolume;
}