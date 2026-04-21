/**
 * Simulasi Gaya Magnet
 * Laboratorium Virtual SD
 * Author: Frissenda Septrianur Marinda Karno Putri - 220611100069
 */

const simulasiMagnet = {
    benda: null,
    isRunning: false,
    animationFrame: null,

    config: {
        paku: { attracted: true, material: 'BESI/LOGAM', icon: '📌' },
        penghapus: { attracted: false, material: 'KARET', icon: '✏️' }
    },

    init: function() {
        this.testObject = document.getElementById('testObject');
        this.objectImg = document.getElementById('objectImg');
        this.objectLabel = document.getElementById('objectLabel');
        this.startBtn = document.getElementById('startBtn');
        this.resultText = document.getElementById('resultText');
        this.attractionLine = document.getElementById('attractionLine');
    },

    pilihBenda: function(type) {
        if (this.isRunning) return;
        
        this.benda = type;
        const config = this.config[type];
        
        document.getElementById('indicatorPaku').style.display = 'none';
        document.getElementById('indicatorPenghapus').style.display = 'none';
        document.getElementById('optionPaku').classList.remove('selected');
        document.getElementById('optionPenghapus').classList.remove('selected');
        
        document.getElementById('indicator' + type.charAt(0).toUpperCase() + type.slice(1)).style.display = 'block';
        document.getElementById('option' + type.charAt(0).toUpperCase() + type.slice(1)).classList.add('selected');
        this.objectImg.src = 'asset/' + type + '.png';
        this.objectLabel.innerHTML = config.icon + ' ' + type.charAt(0).toUpperCase() + type.slice(1);
        
        this.testObject.style.transition = 'all 0.5s ease';
        this.testObject.style.transform = 'translateX(0)';
        this.testObject.style.opacity = '1';
        
        this.startBtn.disabled = false;
        
        this.resultText.innerHTML = this.createResultUI(
            '✅ Benda Dipilih',
            config.icon + ' ' + type.charAt(0).toUpperCase() + type.slice(1) + ' (' + config.material + ')',
            config.attracted 
                ? 'Benda akan bergerak mendekat ke magnet.' 
                : 'Benda tidak akan bergerak (tidak tertarik magnet).<br>Klik "Tarik dengan Magnet"!'
        );
    },

    tarikBenda: function() {
        if (!this.benda || this.isRunning) return;
        
        this.isRunning = true;
        this.startBtn.disabled = true;
        this.attractionLine.style.opacity = '1';
        
        const config = this.config[this.benda];
        
        if (config.attracted) {
            this.animateAttraction();
        } else {
            this.showNoAttraction();
        }
    },

    animateAttraction: function() {
        const self = this;
        let start = null;
        const duration = 1500;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            if (progress < 1) {
                const easeIn = progress * progress * progress;
                const currentPos = -350 * easeIn;
                
                self.testObject.style.transform = 'translateX(' + currentPos + 'px)';
                self.testObject.style.opacity = 1 - (progress * 0.2);
                
                self.animationFrame = requestAnimationFrame(step);
            } else {
                self.isRunning = false;
                self.startBtn.disabled = false;
                self.attractionLine.style.opacity = '0';
                self.tampilkanHasil(true);
            }
        }
        
        requestAnimationFrame(step);
    },

    showNoAttraction: function() {
        const self = this;
        
        setTimeout(function() {
            self.isRunning = false;
            self.startBtn.disabled = false;
            self.attractionLine.style.opacity = '0';
            self.tampilkanHasil(false);
        }, 1000);
    },

    tampilkanHasil: function(isAttracted) {
        const config = this.config[this.benda];
        const className = isAttracted ? 'success' : 'fail';
        
        this.resultText.innerHTML = '<div class="result-item ' + className + '">' +
            '<strong>' + (isAttracted ? '✅' : '❌') + ' ' + config.icon + ' ' + this.benda.charAt(0).toUpperCase() + this.benda.slice(1) + ' ' + (isAttracted ? 'TERTARIK' : 'TIDAK TERTARIK') + '</strong><br><br>' +
            '• Benda: <span class="highlight">' + this.benda.charAt(0).toUpperCase() + this.benda.slice(1) + '</span><br>' +
            '• Bahan: <span class="highlight">' + config.material + '</span><br>' +
            '• Hasil: <span class="highlight">' + (isAttracted ? 'TER TARIK KE MAGNET' : 'TIDAK TER TARIK') + '</span><br>' +
            '• Gerakan: <span class="highlight">' + (isAttracted ? 'MENDEKAT KE MAGNET' : 'TIDAK BERGERAK') + '</span><br><br>' +
            (isAttracted 
                ? config.icon + ' terbuat dari besi yang merupakan bahan ferromagnetik. Magnet dapat menarik benda yang terbuat dari besi, baja, atau logam tertentu.' 
                : config.icon + ' terbuat dari ' + config.material.toLowerCase() + ' yang bukan bahan logam. Magnet tidak dapat menarik benda ini.') +
            '</div>';
    },

    reset: function() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        this.testObject.style.transition = 'all 0.5s ease';
        this.testObject.style.transform = 'translateX(0)';
        this.testObject.style.opacity = '1';
        
        this.startBtn.disabled = true;
        this.isRunning = false;
        this.benda = null;
        this.attractionLine.style.opacity = '0';
        
        document.getElementById('indicatorPaku').style.display = 'none';
        document.getElementById('indicatorPenghapus').style.display = 'none';
        document.getElementById('optionPaku').classList.remove('selected');
        document.getElementById('optionPenghapus').classList.remove('selected');
        
        this.resultText.innerHTML = 'Pilih benda terlebih dahulu, lalu klik "Tarik dengan Magnet"!';
    },

    createResultUI: function(title, highlight, content) {
        return '<div class="result-item">' +
            '<strong>' + title + ':</strong><br>' +
            '<span class="highlight">' + highlight + '</span><br>' +
            content +
            '</div>';
    }
};