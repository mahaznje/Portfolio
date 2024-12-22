function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.pop-out-element');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});
let currentOpenDemo = null;

// Fonction pour afficher le projet agrandi
function showDemo(expandedDesk) {
    if (currentOpenDemo && currentOpenDemo !== expandedDesk) {
        closeDemo(currentOpenDemo);
    }
    const expandedDemoVideo = expandedDesk.querySelector('.expanded-demo-video');

    expandedDesk.style.display = 'flex';
    expandedDesk.classList.add('expanded');

    expandedDemoVideo.style.display = 'block';
    expandedDemoVideo.play();
    currentOpenDemo = expandedDesk;

}

// Fonction pour cacher le projet agrandi
function closeDemo(expandedDesk) {
    const expandedDemoVideo = expandedDesk.querySelector('.expanded-demo-video');

    expandedDesk.style.animation = 'popIn 0.7s ease forwards';

    expandedDesk.addEventListener('animationend', function() {
        expandedDesk.classList.remove('expanded');
        expandedDemoVideo.style.display = 'none';
        expandedDemoVideo.pause();
        expandedDesk.style.display = 'none';
        expandedDesk.style.animation = '';
        if (currentOpenDemo === expandedDesk) {
            currentOpenDemo = null;
        }
    }, { once: true });
}

document.querySelectorAll('.live-demo-btn').forEach(button => {
    button.addEventListener('click', function() {
        const projetDemo = this.closest('.container-project-detail').querySelector('.expanded-desk');
        showDemo(projetDemo);
    });
});

    });

document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', function() {
        const projetDemo = this.closest('.expanded-desk');
        closeDemo(projetDemo);
    });
