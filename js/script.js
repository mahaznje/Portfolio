function toggleMenu() {
  const sidebar = document.getElementById('sidebarMenu')
  const overlay = document.getElementById('overlay')
  const humb = document.getElementById('hamburger-icon')
  sidebar.classList.toggle('open')
  overlay.classList.toggle('active')
  humb.classList.toggle('close')
}

document.getElementById('arrow').addEventListener('click', function () {
  const nextSection = document.querySelector('#about')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
})

document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.pop-out-element')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  sections.forEach((section) => {
    observer.observe(section)
  })
})

// Fonction pour afficher le projet agrandi
let currentOpenDemo = null

function showDemo(expandedDesk) {
  if (currentOpenDemo && currentOpenDemo !== expandedDesk) {
    closeDemo(currentOpenDemo)
  }
  const expandedDemoVideo = expandedDesk.querySelector('.expanded-demo-video')

  const container = expandedDesk.closest('.container-project-detail')

  // Set display and add class
  expandedDesk.style.display = 'flex'
  expandedDesk.classList.add('expanded')

  expandedDemoVideo.style.display = 'block'

  expandedDemoVideo.play()
  currentOpenDemo = expandedDesk
}

// Fonction pour cacher le projet agrandi
function closeDemo(expandedDesk) {
  const expandedDemoVideo = expandedDesk.querySelector('.expanded-demo-video')

  expandedDesk.style.animation = 'popIn 0.7s ease forwards'

  expandedDesk.addEventListener(
    'animationend',
    function () {
      expandedDesk.classList.remove('expanded')
      expandedDemoVideo.style.display = 'none'
      expandedDemoVideo.pause()
      expandedDesk.style.display = 'none'
      expandedDesk.style.animation = ''
      if (currentOpenDemo === expandedDesk) {
        currentOpenDemo = null
      }
    },
    { once: true }
  )
}

document.querySelectorAll('.close-btn').forEach((button) => {
  button.addEventListener('click', function () {
    const projetDemo = this.closest('.expanded-desk')
    const video = projetDemo.querySelector('.expanded-demo-video')

    video.pause()
    video.currentTime = 0
    video.style.display = 'none'
    projetDemo.style.display = 'none'
    projetDemo.classList.remove('expanded')
  })
})
document.querySelectorAll('.expanded-demo-video').forEach((video) => {
  video.addEventListener('click', function () {
    this.pause()
    this.currentTime = 0
    this.style.display = 'none'
  })
})

document.querySelectorAll('.live-demo-btn').forEach((button) => {
  button.addEventListener('click', function () {
    const projetDemo = this.closest('.container-project-detail')
    const video = projetDemo.querySelector('.expanded-demo-video')

    if (window.innerWidth <= 468) {
      // Cacher tout sauf la vidéo
      video.style.display = 'block'
      video.currentTime = 0
      video.play()
    } else {
      // Desktop → comportement habituel
      const expandedDesk = projetDemo.querySelector('.expanded-desk')
      showDemo(expandedDesk)
    }
  })
})

// Ajoutez un gestionnaire d'événements pour fermer la vidéo sur mobile
document.addEventListener('click', function (event) {
  if (
    window.innerWidth <= 768 &&
    event.target.classList.contains('expanded-demo-video')
  ) {
    event.target.pause()
    event.target.closest('.projet-demo').style.display = 'none'
  }
})

//swiper
// Swiper.js Configuration
const swiperPopular = new Swiper('.projet__swiper', {
  loop: true,
  grabCursor: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

swiperPopular.on('slideChange', () => {
  if (currentOpenDemo) {
    closeDemo(currentOpenDemo)
  }
})
