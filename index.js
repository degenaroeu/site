// Sistema de navegación entre páginas
function navigateTo(page) {
  // Ocultar todas las páginas
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.remove("active")
  })

  // Mostrar la página seleccionada
  if (page === "blog") {
    document.getElementById("blog-page").classList.add("active")
  } else if (page === "home") {
    document.getElementById("home-page").classList.add("active")
  } else {
    document.getElementById("home-page").classList.add("active")
    // Scroll a la sección correspondiente
    const section = document.getElementById(page)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  // Actualizar navegación activa
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-page") === page) {
      link.classList.add("active")
    }
  })

  // Cerrar menú móvil si está abierto
  const navLinks = document.querySelector(".nav-links")
  const menuBtn = document.querySelector(".menu-btn")
  if (navLinks) navLinks.classList.remove("active")
  if (menuBtn) menuBtn.textContent = "☰"

  // Scroll al inicio si cambiamos de página
  if (page === "blog" || page === "home") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
}

// Navegación a posts de blog individuales
function navigateToBlogPost(postId) {
  // Ocultar todas las páginas
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.remove("active")
  })

  // Mostrar el post seleccionado
  const postPage = document.getElementById(`${postId}-page`)
  if (postPage) {
    postPage.classList.add("active")
  }

  // Scroll al inicio
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })

  // Actualizar navegación activa
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-page") === "blog") {
      link.classList.add("active")
    }
  })
}

// Navegación y efectos de scroll
const navbar = document.querySelector(".navbar")
const menuBtn = document.querySelector(".menu-btn")
const navLinks = document.querySelector(".nav-links")
const backToTop = document.getElementById("backToTop")

// Menú móvil
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    menuBtn.textContent = navLinks.classList.contains("active") ? "✕" : "☰"
  })
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) navLinks.classList.remove("active")
    if (menuBtn) menuBtn.textContent = "☰"
  })
})

// Cambiar estilo de navbar y mostrar botón de volver arriba al hacer scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    if (navbar) navbar.classList.add("scrolled")
    if (backToTop) backToTop.classList.add("visible")
  } else {
    if (navbar) navbar.classList.remove("scrolled")
    if (backToTop) backToTop.classList.remove("visible")
  }
})

// Botón volver arriba
if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Animación de elementos al hacer scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  },
  { threshold: 0.1 },
)

document.querySelectorAll("section:not(.hero) h2, .about-img, .about-content, .blog-card").forEach((el) => {
  el.style.opacity = "0"
  observer.observe(el)
})

// Filtros de blog
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Actualizar botón activo
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")

    // Filtrar tarjetas de blog
    document.querySelectorAll("#blog-page .blog-card").forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })
})

// Partículas de fondo
const canvas = document.getElementById("particles")
if (canvas) {
  const ctx = canvas.getContext("2d")
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const particles = []
  const particleCount = 100
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 0.5
      this.speedX = Math.random() * 1 - 0.5
      this.speedY = Math.random() * 1 - 0.5
      this.color = `rgba(192, 132, 252, ${Math.random() * 0.5 + 0.2})`
    }
  
    update() {
      this.x += this.speedX
      this.y += this.speedY
  
      if (this.x < 0 || this.x > canvas.width) {
        this.speedX = -this.speedX
      }
  
      if (this.y < 0 || this.y > canvas.height) {
        this.speedY = -this.speedY
      }
    }
  
    draw() {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  
  function init() {
    particles.length = 0
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
  
      // Conectar partículas cercanas
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
  
        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(192, 132, 252, ${0.1 * (1 - distance / 100)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  
    requestAnimationFrame(animate)
  }
  
  // Inicializar partículas
  init()
  animate()
  
  // Ajustar canvas al cambiar tamaño de ventana
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
  })
}

// ===============================================
// SISTEMA DE TRADUCCIÓN CORREGIDO
// ===============================================

// Traducciones
const translations = {
  es: {
    // Navegación
    navHome: "Inicio",
    navAbout: "Sobre Mí",
    navBlog: "Blog",
    navContact: "Contacto",

    // Hero
    heroTitle: "Hola, soy <span>Esteban :)</span>",
    heroSubtitle: "Cloud Engineer & Web Developer",
    heroBtnBlog: "Blog",
    heroBtnContact: "Contactar",

    // Sobre Mí
    aboutTitle: "Sobre Mí",
    aboutSubtitle: "Conóceme un poco más",
    aboutP1:
      "Profesional italo-argentino con más de 15 años de experiencia en entornos corporativos multinacionales. A lo largo de mi trayectoria, he trabajado en proyectos críticos sobre infraestructuras on-premise, cloud e híbridas, aportando soluciones sólidas en contextos de alta exigencia tecnológica y organizacional.",
    aboutP2:
      "Mi especialización se centra en la arquitectura de sistemas, gestión de entornos híbridos, modernización de infraestructuras y migraciones a la nube. Combinando una visión estratégica con capacidades técnicas, he contribuido a optimizar operaciones, mejorar la resiliencia de los sistemas y facilitar procesos de transformación digital.",
    aboutP3:
      "Me destaco por un enfoque proactivo, orientado a resultados y basado en buenas prácticas, trabajando de forma colaborativa con equipos multidisciplinarios. Mi objetivo es seguir aportando valor a través de la innovación tecnológica, la mejora continua y la alineación entre IT y negocio.",

    // Blog
    blogTitle: "Últimas Publicaciones",
    blogBtnAll: "Ver todas las publicaciones",
    blogReadMore: "Leer más",
    blogArchiveTitle: "Mi Blog",
    blogArchiveDescription:
      "Comparto mis pensamientos, experiencias y conocimientos sobre cloud computing, infraestructura y tecnologías emergentes.",
    blogFilterAll: "Todos",
    blogFilterCloud: "Cloud",
    blogFilterDevOps: "DevOps",
    blogFilterAI: "IA",
    blogPrev: "Artículo anterior",
    blogNext: "Artículo siguiente",
    blogRelated: "Artículos relacionados",

    // Footer
    footerRights: "© 2025 Esteban De Genaro - Todos los derechos reservados",
    footerDesigned: "Diseñado con ❤️ por Esteban",

    // Blog Posts
    post1Title: "Arquitectura Multi-Cloud: Estrategias para 2025",
    post1Date: "4 Mayo, 2025",
    post1Category: "Categoría: Cloud",
    post1Author: "Por: Esteban",
    post1Excerpt:
      "Descubre las mejores prácticas para implementar arquitecturas multi-cloud que aprovechan las fortalezas de AWS, Azure y GCP. Estrategias para optimizar costos y rendimiento...",

    post2Title: "Terraform: Infraestructura como Código en la Práctica",
    post2Date: "28 Abril, 2025",
    post2Category: "Categoría: DevOps",
    post2Author: "Por: Esteban",
    post2Excerpt:
      "La gestión de infraestructura como código se ha vuelto esencial. En este artículo, comparto técnicas avanzadas para Terraform y cómo implementar CI/CD para tu infraestructura...",

    post3Title: "IA en la Nube: Transformando Operaciones IT",
    post3Date: "15 Abril, 2025",
    post3Category: "Categoría: IA",
    post3Author: "Por: Esteban",
    post3Excerpt:
      "La inteligencia artificial está revolucionando la gestión de infraestructuras cloud. Explora cómo los servicios de IA de AWS, Azure y GCP están optimizando operaciones...",

    post4Title: "Kubernetes: Orquestación de Contenedores a Escala",
    post4Date: "5 Abril, 2025",
    post4Category: "Categoría: Cloud",
    post4Author: "Por: Esteban",
    post4Excerpt:
      "Kubernetes se ha convertido en el estándar para la orquestación de contenedores. Aprende las mejores prácticas para desplegar y gestionar aplicaciones en producción...",

    post5Title: "CI/CD: Automatización de Despliegues Modernos",
    post5Date: "28 Marzo, 2025",
    post5Category: "Categoría: DevOps",
    post5Author: "Por: Esteban",
    post5Excerpt:
      "Los pipelines de CI/CD son fundamentales para el desarrollo moderno. En esta guía completa, te muestro cómo implementar automatización efectiva para tus proyectos...",

    post6Title: "MLOps: Operaciones de Machine Learning",
    post6Date: "15 Marzo, 2025",
    post6Category: "Categoría: IA",
    post6Author: "Por: Esteban",
    post6Excerpt:
      "MLOps combina machine learning, DevOps y ingeniería de datos. Descubre cómo gestionar el ciclo de vida completo de modelos de ML en producción..."
  },
  it: {
    // Navigazione
    navHome: "Home",
    navAbout: "Chi Sono",
    navBlog: "Blog",
    navContact: "Contatti",

    // Hero
    heroTitle: "Ciao, sono <span>Esteban :)</span>",
    heroSubtitle: "Ingegnere Cloud & Sviluppatore Web",
    heroBtnBlog: "Blog",
    heroBtnContact: "Contattami",

    // Chi Sono
    aboutTitle: "Chi Sono",
    aboutSubtitle: "Conoscimi meglio",
    aboutP1:
      "Professionista italo-argentino con oltre 15 anni di esperienza in ambienti aziendali multinazionali. Durante la mia carriera, ho lavorato su progetti critici su infrastrutture on-premise, cloud e ibride, fornendo soluzioni solide in contesti di elevata esigenza tecnologica e organizzativa.",
    aboutP2:
      "
