/**
 * Simulasi Gaya Gesek
 * Laboratorium Virtual SD
 * Author: Frissenda Septrianur Marinda Karno Putri - 220611100069
 */

const simulasiGesek = {
    permukaan: null,
    isRunning: false,
    posisi: 50,
    kecepatan: 0,
    animationFrame: null,

    config: {
        tanah: { gesek: 0.8, kecepatan: 2 },
        aspal: { gesek: 0.3, kecepatan: 5 }
    },

    init: function() {
        this.mobil = document.getElementById('mobil');
        this.surfaceImg = document.getElementById('surfaceImg');
        this.startBtn = document.getElementById('startBtn');
        this.resultText = document.getElementById('resultText');
        this.reset();
    },

    pilihPermukaan: function(type) {
        if (this.isRunning) return;
        
        this.permukaan = type;
        
        document.getElementById('indicatorTanah').style.display = 'none';
        document.getElementById('indicatorAspal').style.display = 'none';
        document.getElementById('optionTanah').classList.remove('selected');
        document.getElementById('optionAspal').classList.remove('selected');
        
        document.getElementById('indicator' + type.charAt(0).toUpperCase() + type.slice(1)).style.display = 'block';
        document.getElementById('option' + type.charAt(0).toUpperCase() + type.slice(1)).classList.add('selected');
        this.surfaceImg.src = 'asset/' + type + '.png';
        
        this.startBtn.disabled = false;
        
        this.resultText.innerHTML = this.createResultUI(
            '✅ Permukaan Dipilih',
            type === 'tanah' ? '🌾 Tanah' : '🛣️ Aspal',
            'Mobil akan bergerak di atas permukaan ini. Klik "Jalankan Mobil"!'
        );
    },

    jalankanMobil: function() {
        if (!this.permukaan || this.isRunning) return;
        
        this.isRunning = true;
        this.startBtn.disabled = true;
        this.kecepatan = this.config[this.permukaan].kecepatan;
        
        this.animate();
    },

    animate: function() {
        const self = this;
        
        function step() {
            if (self.posisi >= window.innerWidth - 200 || self.posisi >= 900) {
                self.isRunning = false;
                self.startBtn.disabled = false;
                self.tampilkanHasil();
                return;
            }

            self.kecepatan *= (1 - self.config[self.permukaan].gesek * 0.01);
            self.posisi += self.kecepatan;
            self.mobil.style.left = self.posisi + 'px';
            
            self.animationFrame = requestAnimationFrame(step);
        }
        
        step();
    },

    tampilkanHasil: function() {
        const isTanah = this.permukaan === 'tanah';
        
        this.resultText.innerHTML = this.createResultUI(
            (isTanah ? '🌾' : '🛣️') + ' Permukaan ' + (isTanah ? 'Tanah' : 'Aspal'),
            '• Gaya gesek: ' + (isTanah ? 'BESAR' : 'KECIL'),
            '• Kecepatan: ' + (isTanah ? 'LAMBAT' : 'CEPAT') + '<br>' +
            '• Waktu: ' + (isTanah ? '4 detik' : '2 detik') + '<br><br>' +
            (isTanah 
                ? 'Tanah yang kasar menghasilkan gaya gesek lebih besar, sehingga mobil bergerak lebih lambat.' 
                : 'Aspal yang halus menghasilkan gaya gesek lebih kecil, sehingga mobil bergerak lebih cepat.')
        );
    },

    reset: function() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        this.posisi = 50;
        this.kecepatan = 0;
        this.isRunning = false;
        this.permukaan = null;
        
        this.mobil.style.transition = 'left 0.5s ease';
        this.mobil.style.left = '50px';
        this.startBtn.disabled = true;
        
        setTimeout(() => {
            this.mobil.style.transition = '';
        }, 500);

        document.getElementById('indicatorTanah').style.display = 'none';
        document.getElementById('indicatorAspal').style.display = 'none';
        document.getElementById('optionTanah').classList.remove('selected');
        document.getElementById('optionAspal').classList.remove('selected');
        this.surfaceImg.src = 'asset/aspal.png';
        
        this.resultText.innerHTML = 'Pilih permukaan terlebih dahulu, lalu klik "Jalankan Mobil"!';
    },

    createResultUI: function(title, highlight, content) {
        return '<div class="result-item">' +
            '<strong>' + title + ':</strong><br>' +
            '<span class="highlight">' + highlight + '</span><br>' +
            content +
            '</div>';
    }
};