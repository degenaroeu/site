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
      "La mia specializzazione si concentra sull'architettura dei sistemi, sulla gestione di ambienti ibridi, sulla modernizzazione delle infrastrutture e sulle migrazioni al cloud. Combinando una visione strategica con capacità tecniche, ho contribuito a ottimizzare le operazioni, migliorare la resilienza dei sistemi e facilitare i processi di trasformazione digitale.",
    aboutP3:
      "Mi distinguo per un approccio proattivo, orientato ai risultati e basato sulle migliori pratiche, lavorando in modo collaborativo con team multidisciplinari. Il mio obiettivo è continuare a fornire valore attraverso l'innovazione tecnologica, il miglioramento continuo e l'allineamento tra IT e business.",

    // Blog
    blogTitle: "Ultimi Articoli",
    blogBtnAll: "Vedi tutti gli articoli",
    blogReadMore: "Leggi di più",
    blogArchiveTitle: "Il Mio Blog",
    blogArchiveDescription: "Condivido i miei pensieri, esperienze e conoscenze su cloud computing, infrastruttura e tecnologie emergenti.",
    blogFilterAll: "Tutti",
    blogFilterCloud: "Cloud",
    blogFilterDevOps: "DevOps",
    blogFilterAI: "IA",
    blogPrev: "Articolo precedente",
    blogNext: "Articolo successivo",
    blogRelated: "Articoli correlati",

    // Footer
    footerRights: "© 2025 Esteban De Genaro - Tutti i diritti riservati",
    footerDesigned: "Progettato con ❤️ da Esteban",

    // Blog Posts
    post1Title: "Architettura Multi-Cloud: Strategie per il 2025",
    post1Date: "4 Maggio, 2025",
    post1Category: "Categoria: Cloud",
    post1Author: "Di: Esteban",
    post1Excerpt:
      "Scopri le migliori pratiche per implementare architetture multi-cloud che sfruttano i punti di forza di AWS, Azure e GCP. Strategie per ottimizzare costi e prestazioni...",

    post2Title: "Terraform: Infrastruttura come Codice nella Pratica",
    post2Date: "28 Aprile, 2025",
    post2Category: "Categoria: DevOps",
    post2Author: "Di: Esteban",
    post2Excerpt:
      "La gestione dell'infrastruttura come codice è diventata essenziale. In questo articolo, condivido tecniche avanzate per Terraform e come implementare CI/CD per la tua infrastruttura...",

    post3Title: "IA nel Cloud: Trasformazione delle Operazioni IT",
    post3Date: "15 Aprile, 2025",
    post3Category: "Categoria: IA",
    post3Author: "Di: Esteban",
    post3Excerpt:
      "L'intelligenza artificiale sta rivoluzionando la gestione delle infrastrutture cloud. Esplora come i servizi di IA di AWS, Azure e GCP stanno ottimizzando le operazioni...",

    post4Title: "Kubernetes: Orchestrazione di Container su Scala",
    post4Date: "5 Aprile, 2025",
    post4Category: "Categoria: Cloud",
    post4Author: "Di: Esteban",
    post4Excerpt:
      "Kubernetes è diventato lo standard per l'orchestrazione dei container. Impara le migliori pratiche per distribuire e gestire applicazioni in produzione...",

    post5Title: "CI/CD: Automazione dei Deploy Moderni",
    post5Date: "28 Marzo, 2025",
    post5Category: "Categoria: DevOps",
    post5Author: "Di: Esteban",
    post5Excerpt:
      "Le pipeline CI/CD sono fondamentali per lo sviluppo moderno. In questa guida completa, ti mostro come implementare l'automazione efficace per i tuoi progetti...",

    post6Title: "MLOps: Operazioni di Machine Learning",
    post6Date: "15 Marzo, 2025",
    post6Category: "Categoria: IA",
    post6Author: "Di: Esteban",
    post6Excerpt:
      "MLOps combina machine learning, DevOps e ingegneria dei dati. Scopri come gestire il ciclo di vita completo dei modelli ML in produzione..."
  },
  en: {
    // Navigation
    navHome: "Home",
    navAbout: "About Me",
    navBlog: "Blog",
    navContact: "Contact",

    // Hero
    heroTitle: "Hello, I'm <span>Esteban :)</span>",
    heroSubtitle: "Cloud Engineer & Web Developer",
    heroBtnBlog: "Blog",
    heroBtnContact: "Contact Me",

    // About Me
    aboutTitle: "About Me",
    aboutSubtitle: "Get to know me better",
    aboutP1:
      "Italian-Argentine professional with over 15 years of experience in multinational corporate environments. Throughout my career, I have worked on critical projects involving on-premise, cloud, and hybrid infrastructures, providing solid solutions in contexts of high technological and organizational demands.",
    aboutP2:
      "My specialization focuses on systems architecture, hybrid environment management, infrastructure modernization, and cloud migrations. Combining a strategic vision with technical capabilities, I have contributed to optimizing operations, improving system resilience, and facilitating digital transformation processes.",
    aboutP3:
      "I stand out for a proactive approach, results-oriented and based on best practices, working collaboratively with multidisciplinary teams. My goal is to continue adding value through technological innovation, continuous improvement, and alignment between IT and business.",

    // Blog
    blogTitle: "Latest Posts",
    blogBtnAll: "View all posts",
    blogReadMore: "Read more",
    blogArchiveTitle: "My Blog",
    blogArchiveDescription:
      "I share my thoughts, experiences, and knowledge about cloud computing, infrastructure, and emerging technologies.",
    blogFilterAll: "All",
    blogFilterCloud: "Cloud",
    blogFilterDevOps: "DevOps",
    blogFilterAI: "AI",
    blogPrev: "Previous article",
    blogNext: "Next article",
    blogRelated: "Related articles",

    // Footer
    footerRights: "© 2025 Esteban De Genaro - All rights reserved",
    footerDesigned: "Designed with ❤️ by Esteban",

    // Blog Posts
    post1Title: "Multi-Cloud Architecture: Strategies for 2025",
    post1Date: "May 4, 2025",
    post1Category: "Category: Cloud",
    post1Author: "By: Esteban",
    post1Excerpt:
      "Discover best practices for implementing multi-cloud architectures that leverage the strengths of AWS, Azure, and GCP. Strategies to optimize costs and performance...",

    post2Title: "Terraform: Infrastructure as Code in Practice",
    post2Date: "April 28, 2025",
    post2Category: "Category: DevOps",
    post2Author: "By: Esteban",
    post2Excerpt:
      "Infrastructure as code management has become essential. In this article, I share advanced techniques for Terraform and how to implement CI/CD for your infrastructure...",

    post3Title: "AI in the Cloud: Transforming IT Operations",
    post3Date: "April 15, 2025",
    post3Category: "Category: AI",
    post3Author: "By: Esteban",
    post3Excerpt:
      "Artificial intelligence is revolutionizing cloud infrastructure management. Explore how AI services from AWS, Azure, and GCP are optimizing operations...",

    post4Title: "Kubernetes: Container Orchestration at Scale",
    post4Date: "April 5, 2025",
    post4Category: "Category: Cloud",
    post4Author: "By: Esteban",
    post4Excerpt:
      "Kubernetes has become the standard for container orchestration. Learn best practices for deploying and managing applications in production...",

    post5Title: "CI/CD: Modern Deployment Automation",
    post5Date: "March 28, 2025",
    post5Category: "Category: DevOps",
    post5Author: "By: Esteban",
    post5Excerpt:
      "CI/CD pipelines are fundamental for modern development. In this comprehensive guide, I show you how to implement effective automation for your projects...",

    post6Title: "MLOps: Machine Learning Operations",
    post6Date: "March 15, 2025",
    post6Category: "Category: AI",
    post6Author: "By: Esteban",
    post6Excerpt:
      "MLOps combines machine learning, DevOps, and data engineering. Discover how to manage the complete lifecycle of ML models in production..."
  }
}

// Función para cambiar el idioma - Versión corregida manteniendo selectores originales
function changeLanguage(lang) {
  console.log("Cambiando idioma a:", lang)

  // Guardar preferencia
  localStorage.setItem("preferredLanguage", lang)
  document.documentElement.setAttribute("lang", lang)

  const t = translations[lang]

  // Actualizar navegación
  document.querySelectorAll(".nav-link").forEach((link) => {
    const page = link.getAttribute("data-page")
    if (page === "home") link.textContent = t.navHome
    if (page === "about") link.textContent = t.navAbout
    if (page === "blog") link.textContent = t.navBlog
    if (page === "contact") link.textContent = t.navContact
  })

  // Actualizar footer
  document.querySelectorAll(".footer-links a").forEach((link) => {
    const onclick = link.getAttribute("onclick")
    if (onclick && onclick.includes("home")) link.textContent = t.navHome
    if (onclick && onclick.includes("about")) link.textContent = t.navAbout
    if (onclick && onclick.includes("blog")) link.textContent = t.navBlog
    if (link.getAttribute("href") && link.getAttribute("href").includes("mailto")) link.textContent = t.navContact
  })

  // Actualizar Hero
  const heroTitle = document.querySelector(".hero-title")
  const heroSubtitle = document.querySelector(".hero-subtitle")
  const heroBtnBlog = document.querySelector(".hero-buttons .btn-primary")
  const heroBtnContact = document.querySelector(".hero-buttons .btn-secondary")
  
  if (heroTitle) heroTitle.innerHTML = t.heroTitle
  if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle
  if (heroBtnBlog) heroBtnBlog.textContent = t.heroBtnBlog
  if (heroBtnContact) heroBtnContact.textContent = t.heroBtnContact

  // Actualizar Sobre Mí
  const aboutSectionTitle = document.querySelector("#about .section-title")
  const aboutContentH3 = document.querySelector(".about-content h3")
  
  if (aboutSectionTitle) aboutSectionTitle.textContent = t.aboutTitle
  if (aboutContentH3) aboutContentH3.textContent = t.aboutSubtitle

  const aboutParagraphs = document.querySelectorAll(".about-content p")
  if (aboutParagraphs.length >= 3) {
    aboutParagraphs[0].textContent = t.aboutP1
    aboutParagraphs[1].textContent = t.aboutP2
    aboutParagraphs[2].textContent = t.aboutP3
  }

  // Actualizar Blog Preview
  const blogPreviewTitle = document.querySelector("#blog-preview .section-title")
  const blogBtnAll = document.querySelector("#blog-preview .btn-secondary")
  
  if (blogPreviewTitle) blogPreviewTitle.textContent = t.blogTitle
  if (blogBtnAll) blogBtnAll.textContent = t.blogBtnAll

  // Actualizar Blog Cards en Home
  const homeCards = document.querySelectorAll("#blog-preview .blog-card")
  if (homeCards.length >= 3) {
    // Primera tarjeta
    const card1Title = homeCards[0].querySelector(".blog-title")
    const card1Date = homeCards[0].querySelector(".blog-date")
    const card1Excerpt = homeCards[0].querySelector(".blog-excerpt")
    const card1Link = homeCards[0].querySelector(".blog-link")
    
    if (card1Title) card1Title.textContent = t.post1Title
    if (card1Date) card1Date.textContent = t.post1Date
    if (card1Excerpt) card1Excerpt.textContent = t.post1Excerpt
    if (card1Link) card1Link.textContent = t.blogReadMore

    // Segunda tarjeta
    const card2Title = homeCards[1].querySelector(".blog-title")
    const card2Date = homeCards[1].querySelector(".blog-date")
    const card2Excerpt = homeCards[1].querySelector(".blog-excerpt")
    const card2Link = homeCards[1].querySelector(".blog-link")
    
    if (card2Title) card2Title.textContent = t.post2Title
    if (card2Date) card2Date.textContent = t.post2Date
    if (card2Excerpt) card2Excerpt.textContent = t.post2Excerpt
    if (card2Link) card2Link.textContent = t.blogReadMore

    // Tercera tarjeta
    const card3Title = homeCards[2].querySelector(".blog-title")
    const card3Date = homeCards[2].querySelector(".blog-date")
    const card3Excerpt = homeCards[2].querySelector(".blog-excerpt")
    const card3Link = homeCards[2].querySelector(".blog-link")
    
    if (card3Title) card3Title.textContent = t.post3Title
    if (card3Date) card3Date.textContent = t.post3Date
    if (card3Excerpt) card3Excerpt.textContent = t.post3Excerpt
    if (card3Link) card3Link.textContent = t.blogReadMore
  }

  // Actualizar Footer - usando selectores originales
  const footerBottom = document.querySelector(".footer-bottom")
  if (footerBottom && footerBottom.querySelectorAll("p").length >= 2) {
    footerBottom.querySelectorAll("p")[0].textContent = t.footerRights
    footerBottom.querySelectorAll("p")[1].textContent = t.footerDesigned
  }

  // Actualizar página de blog
  const archiveTitle = document.querySelector(".archive-title")
  const archiveDescription = document.querySelector(".archive-description")
  
  if (archiveTitle) {
    archiveTitle.textContent = t.blogArchiveTitle
  }
  if (archiveDescription) {
    archiveDescription.textContent = t.blogArchiveDescription
  }
  
  // Actualizar filtros
  const filterButtons = document.querySelectorAll(".filter-btn")
  if (filterButtons.length >= 4) {
    filterButtons[0].textContent = t.blogFilterAll
    filterButtons[1].textContent = t.blogFilterCloud
    filterButtons[2].textContent = t.blogFilterDevOps
    filterButtons[3].textContent = t.blogFilterAI
  }

  // Actualizar tarjetas de blog en la página de archivo
  const archiveCards = document.querySelectorAll("#blog-page .blog-card")
  archiveCards.forEach((card, index) => {
    const cardTitle = card.querySelector(".blog-title")
    const cardDate = card.querySelector(".blog-date")
    const cardExcerpt = card.querySelector(".blog-excerpt")
    const cardLink = card.querySelector(".blog-link")
    
    // Mapear cada tarjeta a su post correspondiente
    let postKey = `post${index + 1}`
    
    if (t[postKey + "Title"] && cardTitle) cardTitle.textContent = t[postKey + "Title"]
    if (t[postKey + "Date"] && cardDate) cardDate.textContent = t[postKey + "Date"]
    if (t[postKey + "Excerpt"] && cardExcerpt) cardExcerpt.textContent = t[postKey + "Excerpt"]
    if (cardLink) cardLink.textContent = t.blogReadMore
  })

  // Actualizar páginas de blog individuales - usando selectores originales
  for (let i = 1; i <= 6; i++) {
    const postPage = document.getElementById(`post${i}-page`)
    if (postPage) {
      const postTitle = postPage.querySelector(".post-title")
      const metaSpans = postPage.querySelectorAll(".post-meta span")
      
      if (postTitle && t[`post${i}Title`]) {
        postTitle.textContent = t[`post${i}Title`]
      }
      
      if (metaSpans.length >= 3) {
        if (t[`post${i}Date`]) metaSpans[0].textContent = t[`post${i}Date`]
        if (t[`post${i}Category`]) metaSpans[1].textContent = t[`post${i}Category`]
        if (t[`post${i}Author`]) metaSpans[2].textContent = t[`post${i}Author`]
      }

      // Actualizar navegación de posts
      const prevLink = postPage.querySelector(".post-nav-link.prev")
      const nextLink = postPage.querySelector(".post-nav-link.next")

      if (prevLink) prevLink.textContent = t.blogPrev
      if (nextLink) nextLink.textContent = t.blogNext

      // Actualizar artículos relacionados
      const relatedTitle = postPage.querySelector(".related-posts h3")
      if (relatedTitle) relatedTitle.textContent = t.blogRelated

      // Actualizar enlaces "Leer más" en artículos relacionados
      postPage.querySelectorAll(".related-posts .blog-link").forEach((link) => {
        link.textContent = t.blogReadMore
      })
    }
  }
}

// Inicializar selector de idiomas
document.querySelectorAll(".language-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang")

    // Desactivar todos los botones primero
    document.querySelectorAll(".language-btn").forEach((b) => {
      b.classList.remove("active")
    })

    // Activar el botón seleccionado
    btn.classList.add("active")

    // Cambiar el idioma
    changeLanguage(lang)
  })
})

// Cargar idioma preferido del usuario o usar español por defecto
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("preferredLanguage") || "es"

  // Activar el botón correspondiente
  document.querySelectorAll(".language-btn").forEach((btn) => {
    if (btn.getAttribute("data-lang") === savedLanguage) {
      btn.classList.add("active")
    } else {
      btn.classList.remove("active")
    }
  })

  // Aplicar el idioma
  changeLanguage(savedLanguage)
})
