function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".pop-out-element");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

// Fonction pour afficher le projet agrandi
let currentOpenDemo = null;

function showDemo(expandedDesk) {
  if (currentOpenDemo && currentOpenDemo !== expandedDesk) {
    closeDemo(currentOpenDemo);
  }
  const expandedDemoVideo = expandedDesk.querySelector(".expanded-demo-video");

  const container = expandedDesk.closest(".container-project-detail");

  // Set display and add class
  expandedDesk.style.display = "flex";
  expandedDesk.classList.add("expanded");

  expandedDemoVideo.style.display = "block";
  expandedDemoVideo.play();
  currentOpenDemo = expandedDesk;
}

// Fonction pour cacher le projet agrandi
function closeDemo(expandedDesk) {
  const expandedDemoVideo = expandedDesk.querySelector(".expanded-demo-video");

  expandedDesk.style.animation = "popIn 0.7s ease forwards";

  expandedDesk.addEventListener(
    "animationend",
    function () {
      expandedDesk.classList.remove("expanded");
      expandedDemoVideo.style.display = "none";
      expandedDemoVideo.pause();
      expandedDesk.style.display = "none";
      expandedDesk.style.animation = "";
      if (currentOpenDemo === expandedDesk) {
        currentOpenDemo = null;
      }
    },
    { once: true }
  );
}

document.querySelectorAll(".close-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const projetDemo = this.closest(".expanded-desk");
    closeDemo(projetDemo);
  });
});

document.querySelectorAll(".live-demo-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const projetDemo = this.closest(".container-project-detail").querySelector(
      ".expanded-desk"
    );
    const video = projetDemo.querySelector(".expanded-demo-video");

    if (window.innerWidth <= 768) {
      // Sur mobile, on n'affiche que la vidéo
      video.style.display = "block";
      video.play();
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        // Firefox
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        // IE/Edge
        video.msRequestFullscreen();
      }
    } else {
      // Sur desktop, on garde le comportement actuel
      showDemo(projetDemo);
    }
  });
});

// Ajoutez un gestionnaire d'événements pour fermer la vidéo sur mobile
document.addEventListener("click", function (event) {
  if (
    window.innerWidth <= 768 &&
    event.target.classList.contains("expanded-demo-video")
  ) {
    event.target.pause();
    event.target.closest(".projet-demo").style.display = "none";
  }
});

//swiper
// Swiper.js Configuration
const swiperPopular = new Swiper(".projet__swiper", {
  loop: true,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
swiperPopular.on("slideChange", () => {
  if (currentOpenDemo) {
    closeDemo(currentOpenDemo);
  }
});
document.getElementById("arrow").addEventListener("click", function () {
  const nextSection = document.querySelector("#about");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
});
