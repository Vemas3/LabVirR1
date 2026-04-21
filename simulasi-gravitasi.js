/**
 * Simulasi Gaya Gravitasi
 * Laboratorium Virtual SD
 * Author: Frissenda Septrianur Marinda Karno Putri - 220611100069
 */

const simulasiGravitasi = {
    gravitasi: 9.8,
    buahList: [],

    init: function() {
        const self = this;
        const fruits = document.querySelectorAll('.fruit');
        
        fruits.forEach(function(fruit) {
            fruit.addEventListener('click', function() {
                if (!this.classList.contains('fallen')) {
                    self.jatuhkanBuah(this, this.dataset.fruit);
                }
            });
        });
    },

    jatuhkanBuah: function(element, fruitName) {
        const self = this;
        const buah = {
            element: element,
            posisiY: parseFloat(element.style.top) || 90,
            kecepatan: 0,
            nama: fruitName
        };

        this.buahList.push(buah);
        this.animateGravitasi(buah);
    },

    animateGravitasi: function(buah) {
        const self = this;
        const deltaTime = 0.016;

        function step() {
            buah.kecepatan += self.gravitasi * deltaTime * 50;
            buah.posisiY += buah.kecepatan * deltaTime;

            buah.element.style.top = buah.posisiY + 'px';
            buah.element.style.transform = 'rotate(' + buah.posisiY + 'deg)';

            if (buah.posisiY >= 350) {
                self.onGround(buah);
            } else {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    },

    onGround: function(buah) {
        buah.element.classList.add('fallen');
        buah.element.classList.remove('falling');
        buah.element.style.top = '350px';
        
        this.addFallenFruit(buah.nama);
        this.tampilkanHasil(buah.nama);
    },

    addFallenFruit: function(fruitName) {
        const fallenFruits = document.getElementById('fallenFruits');
        const fallenFruit = document.createElement('span');
        fallenFruit.className = 'fallen-fruit';
        fallenFruit.textContent = fruitName === 'apel' ? '🍎' : '🍊';
        fallenFruits.appendChild(fallenFruit);
    },

    jatuhkanSemua: function() {
        const self = this;
        const fruits = document.querySelectorAll('.fruit');
        let count = 0;
        let totalToFall = 0;
        
        fruits.forEach(function(fruit) {
            if (!fruit.classList.contains('fallen')) {
                totalToFall++;
            }
        });
        
        if (totalToFall === 0) return;
        
        fruits.forEach(function(fruit, index) {
            if (!fruit.classList.contains('fallen')) {
                setTimeout(function() {
                    self.jatuhkanBuah(fruit, fruit.dataset.fruit);
                    count++;
                    
                    if (count === totalToFall) {
                        setTimeout(function() {
                            self.tampilkanHasil('semua');
                        }, 2000);
                    }
                }, index * 400);
            }
        });
    },

    tampilkanHasil: function(fruitName) {
        const emoji = fruitName === 'apel' ? '🍎' : (fruitName === 'jeruk' ? '🍊' : '🍎');
        const label = fruitName === 'apel' ? 'Apel' : (fruitName === 'jeruk' ? 'Jeruk' : 'Semua Buah');
        
        document.getElementById('resultText').innerHTML = this.createResultUI(
            '🌍 ' + label + ' Jatuh Karena Gravitasi!',
            '• Benda: ' + emoji + ' ' + label,
            '• Gaya: <span class="highlight">GRAVITASI BUMI</span><br>' +
            '• Arah: <span class="highlight">KE BAWAH (Pusat Bumi)</span> ⬇️<br>' +
            '• Hasil: <span class="highlight">JATUH KE TANAH</span><br><br>' +
            'Buah yang tadinya menempel di pohon jatuh ke tanah karena ditarik oleh gaya gravitasi bumi.'
        );
    },

    reset: function() {
        const self = this;
        const fruits = document.querySelectorAll('.fruit');
        
        fruits.forEach(function(fruit) {
            fruit.classList.remove('falling', 'fallen');
            fruit.classList.add('on-tree');
        });
        
        document.getElementById('fallenFruits').innerHTML = '';
        document.getElementById('resultText').innerHTML = 'Klik buah di pohon untuk melihat gaya gravitasi bekerja!';
        this.buahList = [];
    },

    createResultUI: function(title, highlight, content) {
        return '<div class="result-item">' +
            '<strong>' + title + ':</strong><br><br>' +
            '<span class="highlight">' + highlight + '</span><br>' +
            content +
            '</div>';
    }
};