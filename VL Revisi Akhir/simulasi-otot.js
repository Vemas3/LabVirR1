const simulasiOtot = {
    // State
    isPushing: false,
    animationFrame: null,

    // Init
    init: function() {
        this.pushContainer = document.getElementById('pushContainer');
        this.manusia = document.getElementById('manusia');
        this.meja = document.getElementById('meja');
        this.forceArrow = document.getElementById('forceArrow');
        this.startBtn = document.getElementById('startBtn');
        this.resultText = document.getElementById('resultText');
    },

    // Mulai Mendorong
    mulaiMendorong: function() {
        if (this.isPushing) return;
        
        this.isPushing = true;
        this.startBtn.disabled = true;
        
        // Show force arrow
        this.forceArrow.style.opacity = '1';
        this.forceArrow.style.transform = 'translateX(-50%)';
        
        // Add walking animation
        this.manusia.classList.add('walking');
        
        // Animate human and table moving together
        this.animate();
    },

    // Animation Loop
    animate: function() {
        const self = this;
        let start = null;
        const duration = 2000;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            if (progress < 1) {
                // Move both human and table together
                const moveDistance = 300 * progress;
                self.pushContainer.style.transform = 'translateX(' + moveDistance + 'px)';
                
                self.animationFrame = requestAnimationFrame(step);
            } else {
                self.isPushing = false;
                self.startBtn.disabled = false;
                self.startBtn.innerHTML = '🔄 Ulangi Dorongan';
                self.tampilkanHasil();
            }
        }
        
        requestAnimationFrame(step);
    },

    // Tampilkan Hasil
    tampilkanHasil: function() {
        this.resultText.innerHTML = this.createResultUI(
            '💪 Gaya Otot Bekerja!',
            '• Manusia: BERGERAK MAJU 🚶<br>' +
            '• Meja: BERGERAK MAJU 🪑<br>' +
            '• Gerakan: BERSAMAAN ✅<br>' +
            '• Arah: SESUAI DORONGAN ➡️',
            'Ketika manusia mendorong meja, kedua benda bergerak bersamaan. Ini membuktikan gaya otot dapat menggerakkan benda. Manusia memberikan gaya dorong, dan meja menerima gaya tersebut sehingga keduanya bergerak ke arah yang sama!'
        );
    },

    // Reset
    reset: function() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        this.pushContainer.style.transition = 'all 0.5s ease';
        this.pushContainer.style.transform = 'translateX(0)';
        
        this.forceArrow.style.opacity = '0';
        this.forceArrow.style.transform = 'translateX(-50%)';
        
        this.manusia.classList.remove('walking');
        
        setTimeout(() => {
            this.pushContainer.style.transition = '';
        }, 500);
        
        this.startBtn.disabled = false;
        this.startBtn.innerHTML = '💪 Mulai Mendorong';
        this.isPushing = false;
        
        this.resultText.innerHTML = 'Klik "Mulai Mendorong" untuk melihat gaya otot bekerja!';
    },

    // Helper: Create Result UI
    createResultUI: function(title, highlight, content) {
        return '<div class="result-item">' +
            '<strong>' + title + ':</strong><br><br>' +
            '<span class="highlight">' + highlight + '</span><br><br>' +
            content +
            '</div>';
    }
};