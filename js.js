// ani 2 ảnh
window.addEventListener('DOMContentLoaded', () => {
    const imgs = document.querySelectorAll('.gt_img');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.3
    });

    imgs.forEach(img => observer.observe(img));
});




// 3 ảnh
window.addEventListener('scroll', () => 
{
    document.querySelectorAll('.img_small').forEach(el => 
    {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0)
        {
            // el.classList.add('album_hihi');
            el.classList.remove('js_left');
            el.classList.remove('js_right');
        }
    });
});

window.addEventListener('scroll', () => {
    const el = document.querySelector('.img_big');
    if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.remove('js_center');
        }
    }
});

// lời mời




// cf nha
document.addEventListener('DOMContentLoaded', () => {
    const cfContainer = document.querySelector('.cf_container');

    if (cfContainer) {
        const observer2 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.3
        });

        observer2.observe(cfContainer);
    }
});




// ani album
window.addEventListener('scroll', () => 
{
    document.querySelectorAll('.js_album').forEach(el => 
    {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0)
        {
            // el.classList.add('album_hihi');
            el.classList.remove('album_left');
            el.classList.remove('album_right');
        }
        // else
        // {
        //     el.classList.add('album_left');
        //     el.classList.add('album_right');
        // }
    });
});

// thank
document.addEventListener('DOMContentLoaded', () => {
    const thankDesc = document.querySelector('.thank_desc');

    if (thankDesc) {
        const observer3 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.3 });

        observer3.observe(thankDesc);
    }
});


// nhạc
window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('myAudio');
    const indicator = document.getElementById('audioIndicator');
  
    const playAudio = () => {
      if (!audio.paused) return;
  
      audio.play()
        .then(() => {
          console.log('Phát nhạc thành công');
          indicator.style.display = 'none'; // ẩn cái loa
          removeListeners();
        })
        .catch((err) => {
          console.warn('Trình duyệt chặn phát nhạc:', err);
          // Vẫn giữ loa lại để chờ thao tác khác
        });
    };
  
    const removeListeners = () => {
      ['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, playAudio);
        document.removeEventListener(evt, playAudio);
      });
    };
  
    // Gán tất cả sự kiện tương tác
    ['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(evt => {
      window.addEventListener(evt, playAudio);
      document.addEventListener(evt, playAudio);
    });
  });
  
  




  

// =====================================================================
// Theme đỏ: tên khách từ URL, mở thiệp, cánh hoa, hiện dần khi cuộn
// =====================================================================
document.documentElement.classList.add('js');

// Tên khách: ?ten=Anh%20Nam  (cũng nhận name, to, guest, khach)
function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    for (const key of ['ten', 'name', 'to', 'guest', 'khach']) {
        const v = (params.get(key) || '').replace(/\s+/g, ' ').trim();
        if (v) return v.normalize('NFC').slice(0, 60);
    }
    return '';
}

window.addEventListener('DOMContentLoaded', () => {
    // Điền tên khách (textContent nên không chèn được HTML)
    const guest = getGuestName();
    document.querySelectorAll('[data-guest]').forEach(el => {
        el.textContent = guest || 'Quý khách';
    });
    if (guest) document.title = 'Thiệp mời ' + guest + ' - Xuân Hiểu & Quỳnh Trang';

    // Cánh hoa rơi
    const colors = ['#c8283a', '#e04a5b', '#f2a0a8', '#b31b2b', '#e2b455'];
    const petals = document.getElementById('petals');
    function startPetals() {
        if (!petals || petals.childElementCount) return;
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('i');
            const size = 10 + Math.random() * 12;
            p.className = 'petal';
            p.style.left = (Math.random() * 100) + '%';
            p.style.width = size + 'px';
            p.style.height = size * 1.3 + 'px';
            p.style.background = colors[i % colors.length];
            p.style.setProperty('--t', (10 + Math.random() * 8).toFixed(1) + 's');
            p.style.setProperty('--dl', (Math.random() * 10).toFixed(1) + 's');
            p.style.setProperty('--x', (30 + Math.random() * 60).toFixed(0) + 'px');
            petals.appendChild(p);
        }
    }

    // Mở thiệp: hai cánh cửa mở ra, bắt đầu nhạc
    const root = document.documentElement;
    const cover = document.getElementById('cover');
    const openBtn = document.getElementById('openCard');
    function openCard() {
        if (root.classList.contains('opened')) return;
        root.classList.add('opened');
        window.scrollTo(0, 0);
        const audio = document.getElementById('myAudio');
        if (audio) audio.play().catch(() => {});
        setTimeout(startPetals, 1200);
        setTimeout(() => { if (cover) cover.style.display = 'none'; }, 2300);
    }
    if (openBtn) openBtn.addEventListener('click', openCard);
    else root.classList.add('opened');

    // Hiện dần từng phần khi cuộn
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
    }, { threshold: 0.25 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});
