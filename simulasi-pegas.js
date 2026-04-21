/**
 * Simulasi Gaya Pegas
 * Laboratorium Virtual SD
 * Author: Frissenda Septrianur Marinda Karno Putri - 220611100069
 */

const simulasiPegas = {
    jumpCount: 0,
    isJumping: false,
    jumpInterval: null,
    posisiY: 180,
    kecepatan: 0,

    config: {
        pegasKonstanta: 0.5,
        damping: 0.98,
        maxJumps: 5
    },

    init: function() {
        this.manusia = document.getElementById('manusia');
        this.trampolin = document.getElementById('trampolin');
        this.jumpCountEl = document.getElementById('jumpCount');
        this.forceIndicator = document.getElementById('forceIndicator');
        this.forceBar = document.getElementById('forceBar');
        this.forceText = document.getElementById('forceText');
        this.startBtn = document.getElementById('startBtn');
        this.resultText = document.getElementById('resultText');
    },

    mulaiLompat: function() {
        if (this.isJumping) return;
        
        this.isJumping = true;
        this.jumpCount = 0;
        this.jumpCountEl.textContent = '0';
        
        this.startBtn.disabled = true;
        this.startBtn.innerHTML = '🤸 Sedang Melompat...';
        
        const self = this;
        this.jumpInterval = setInterval(function() {
            self.lompat();
        }, 1200);
        
        setTimeout(function() {
            self.stopLompat();
        }, 6000);
    },

    tambahLompatan: function() {
        if (!this.isJumping) {
            this.lompat();
        }
    },

    lompat: function() {
        const self = this;
        
        this.jumpCount++;
        this.jumpCountEl.textContent = this.jumpCount;
        
        this.forceIndicator.style.opacity = '1';
        this.forceBar.style.width = '100%';
        this.forceText.textContent = '100%';
        
        this.trampolin.classList.add('pressed');
        
        setTimeout(function() {
            self.manusia.classList.add('jumping');
            self.trampolin.classList.remove('pressed');
            
            self.forceBar.style.width = '0%';
            self.forceText.textContent = '0%';
            
            setTimeout(function() {
                self.manusia.classList.remove('jumping');
                self.forceIndicator.style.opacity = '0';
            }, 1000);
        }, 300);
    },

    stopLompat: function() {
        clearInterval(this.jumpInterval);
        this.isJumping = false;
        
        this.startBtn.disabled = false;
        this.startBtn.innerHTML = '🤸 Mulai Lompat';
        
        this.tampilkanHasil();
    },

    tampilkanHasil: function() {
        this.resultText.innerHTML = this.createResultUI(
            '🌀 Gaya Pegas Bekerja!',
            '• Jumlah lompatan: ' + this.jumpCount + ' kali',
            '• Saat mendarat: <span class="highlight">TRAMPOLIN TERTEKAN</span> ⬇️<br>' +
            '• Pegas meregang: <span class="highlight">ENERGI TERSIMPAN</span> 💾<br>' +
            '• Pegas kembali: <span class="highlight">MANUSIA TERLONTAR</span> ⬆️<br>' +
            '• Hasil: <span class="highlight">LOMPATAN BERKALI-KALI</span> 🔄<br><br>' +
            'Ketika manusia mendarat di trampolin, pegas-pegas trampolin tertekan dan menyimpan energi.'
        );
    },

    reset: function() {
        clearInterval(this.jumpInterval);
        
        this.manusia.classList.remove('jumping');
        this.trampolin.classList.remove('pressed');
        
        this.startBtn.disabled = false;
        this.startBtn.innerHTML = '🤸 Mulai Lompat';
        
        this.jumpCount = 0;
        this.jumpCountEl.textContent = '0';
        this.forceIndicator.style.opacity = '0';
        this.isJumping = false;
        
        this.resultText.innerHTML = 'Klik "Mulai Lompat" untuk melihat gaya pegas bekerja!';
    },

    createResultUI: function(title, highlight, content) {
        return '<div class="result-item">' +
            '<strong>' + title + ':</strong><br><br>' +
            '<span class="highlight">' + highlight + '</span><br>' +
            content +
            '</div>';
    }
};