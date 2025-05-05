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
    document.querySelector(".nav-links").classList.remove("active")
    document.querySelector(".menu-btn").textContent = "☰"
  
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
    document.getElementById(`${postId}-page`).classList.add("active")
  
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
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    menuBtn.textContent = navLinks.classList.contains("active") ? "✕" : "☰"
  })
  
  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active")
      menuBtn.textContent = "☰"
    })
  })
  
  // Cambiar estilo de navbar y mostrar botón de volver arriba al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
      backToTop.classList.add("visible")
    } else {
      navbar.classList.remove("scrolled")
      backToTop.classList.remove("visible")
    }
  })
  
  // Botón volver arriba
  backToTop.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
  
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
      document.querySelectorAll(".blog-card").forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
  
  // Formulario de contacto
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault()
    alert("¡Gracias por tu mensaje! Te responderé lo antes posible.")
    this.reset()
  })
  
  // Partículas de fondo
  const canvas = document.getElementById("particles")
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
  
  // ===============================================
  // SISTEMA DE TRADUCCIÓN SIMPLIFICADO
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
        "Comparto mis pensamientos, experiencias y conocimientos sobre desarrollo web, diseño y tecnología.",
      blogFilterAll: "Todos",
      blogFilterDesign: "Diseño",
      blogFilterDevelopment: "Desarrollo",
      blogFilterTechnology: "Tecnología",
      blogPrev: "← Artículo anterior",
      blogNext: "Artículo siguiente →",
      blogRelated: "Artículos relacionados",
  
      // Contacto
      contactTitle: "Contacto",
      contactFormName: "Tu Nombre",
      contactFormEmail: "Tu Email",
      contactFormMessage: "Tu Mensaje",
      contactFormSubmit: "Enviar Mensaje",
  
      // Footer
      footerRights: "© 2025 Tu Nombre - Todos los derechos reservados",
      footerDesigned: "Diseñado con ❤️ por Esteban",
  
      // Blog Posts
      post1Title: "Tendencias de Diseño Web para 2025",
      post1Date: "4 Mayo, 2025",
      post1Category: "Categoría: Diseño",
      post1Author: "Por: Tu Nombre",
      post1Excerpt:
        "Descubre las últimas tendencias en diseño web que están revolucionando la industria este año. Desde diseños minimalistas hasta experiencias inmersivas...",
  
      post2Title: "Cómo Optimizar el Rendimiento de tu Sitio Web",
      post2Date: "28 Abril, 2025",
      post2Category: "Categoría: Desarrollo",
      post2Author: "Por: Tu Nombre",
      post2Excerpt:
        "La velocidad de carga es crucial para la experiencia del usuario y el SEO. En este artículo, comparto técnicas efectivas para mejorar el rendimiento de tu sitio...",
  
      post3Title: "El Futuro del Desarrollo Web con IA",
      post3Date: "15 Abril, 2025",
      post3Category: "Categoría: Tecnología",
      post3Author: "Por: Tu Nombre",
      post3Excerpt:
        "La inteligencia artificial está transformando la forma en que creamos sitios web. Explora cómo las herramientas de IA están revolucionando el desarrollo web...",
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
      blogArchiveDescription: "Condivido i miei pensieri, esperienze e conoscenze su sviluppo web, design e tecnologia.",
      blogFilterAll: "Tutti",
      blogFilterDesign: "Design",
      blogFilterDevelopment: "Sviluppo",
      blogFilterTechnology: "Tecnologia",
      blogPrev: "← Articolo precedente",
      blogNext: "Articolo successivo →",
      blogRelated: "Articoli correlati",
  
      // Contatti
      contactTitle: "Contatti",
      contactFormName: "Il Tuo Nome",
      contactFormEmail: "La Tua Email",
      contactFormMessage: "Il Tuo Messaggio",
      contactFormSubmit: "Invia Messaggio",
  
      // Footer
      footerRights: "© 2025 Il Tuo Nome - Tutti i diritti riservati",
      footerDesigned: "Progettato con ❤️ da Esteban",
  
      // Blog Posts
      post1Title: "Tendenze di Web Design per il 2025",
      post1Date: "4 Maggio, 2025",
      post1Category: "Categoria: Design",
      post1Author: "Di: Il Tuo Nome",
      post1Excerpt:
        "Scopri le ultime tendenze nel web design che stanno rivoluzionando il settore quest'anno. Dai design minimalisti alle esperienze immersive...",
  
      post2Title: "Come Ottimizzare le Prestazioni del tuo Sito Web",
      post2Date: "28 Aprile, 2025",
      post2Category: "Categoria: Sviluppo",
      post2Author: "Di: Il Tuo Nome",
      post2Excerpt:
        "La velocità di caricamento è cruciale per l'esperienza utente e la SEO. In questo articolo, condivido tecniche efficaci per migliorare le prestazioni del tuo sito...",
  
      post3Title: "Il Futuro dello Sviluppo Web con l'IA",
      post3Date: "15 Aprile, 2025",
      post3Category: "Categoria: Tecnologia",
      post3Author: "Di: Il Tuo Nome",
      post3Excerpt:
        "L'intelligenza artificiale sta trasformando il modo in cui creiamo siti web. Esplora come gli strumenti di IA stanno rivoluzionando lo sviluppo web...",
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
        "I share my thoughts, experiences, and knowledge about web development, design, and technology.",
      blogFilterAll: "All",
      blogFilterDesign: "Design",
      blogFilterDevelopment: "Development",
      blogFilterTechnology: "Technology",
      blogPrev: "← Previous article",
      blogNext: "Next article →",
      blogRelated: "Related articles",
  
      // Contact
      contactTitle: "Contact",
      contactFormName: "Your Name",
      contactFormEmail: "Your Email",
      contactFormMessage: "Your Message",
      contactFormSubmit: "Send Message",
  
      // Footer
      footerRights: "© 2025 Your Name - All rights reserved",
      footerDesigned: "Designed with ❤️ by Esteban",
  
      // Blog Posts
      post1Title: "Web Design Trends for 2025",
      post1Date: "May 4, 2025",
      post1Category: "Category: Design",
      post1Author: "By: Your Name",
      post1Excerpt:
        "Discover the latest trends in web design that are revolutionizing the industry this year. From minimalist designs to immersive experiences...",
  
      post2Title: "How to Optimize Your Website Performance",
      post2Date: "April 28, 2025",
      post2Category: "Category: Development",
      post2Author: "By: Your Name",
      post2Excerpt:
        "Loading speed is crucial for user experience and SEO. In this article, I share effective techniques to improve your site's performance...",
  
      post3Title: "The Future of Web Development with AI",
      post3Date: "April 15, 2025",
      post3Category: "Category: Technology",
      post3Author: "By: Your Name",
      post3Excerpt:
        "Artificial intelligence is transforming how we create websites. Explore how AI-powered tools are revolutionizing web development...",
    },
  }
  
  // Función para cambiar el idioma - Versión simplificada
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
      if (onclick.includes("home")) link.textContent = t.navHome
      if (onclick.includes("about")) link.textContent = t.navAbout
      if (onclick.includes("blog")) link.textContent = t.navBlog
      if (onclick.includes("contact")) link.textContent = t.navContact
    })
  
    // Actualizar Hero
    document.querySelector(".hero-title").innerHTML = t.heroTitle
    document.querySelector(".hero-subtitle").textContent = t.heroSubtitle
    document.querySelector(".hero-buttons .btn-primary").textContent = t.heroBtnBlog
    document.querySelector(".hero-buttons .btn-secondary").textContent = t.heroBtnContact
  
    // Actualizar Sobre Mí
    document.querySelector("#about .section-title").textContent = t.aboutTitle
    document.querySelector(".about-content h3").textContent = t.aboutSubtitle
  
    const aboutParagraphs = document.querySelectorAll(".about-content p")
    if (aboutParagraphs.length >= 3) {
      aboutParagraphs[0].textContent = t.aboutP1
      aboutParagraphs[1].textContent = t.aboutP2
      aboutParagraphs[2].textContent = t.aboutP3
    }
  
    // Actualizar Blog Preview
    document.querySelector("#blog-preview .section-title").textContent = t.blogTitle
    document.querySelector("#blog-preview .btn-secondary").textContent = t.blogBtnAll
  
    // Actualizar Blog Cards en Home
    const homeCards = document.querySelectorAll("#blog-preview .blog-card")
    if (homeCards.length >= 3) {
      // Primera tarjeta
      homeCards[0].querySelector(".blog-title").textContent = t.post1Title
      homeCards[0].querySelector(".blog-date").textContent = t.post1Date
      homeCards[0].querySelector(".blog-excerpt").textContent = t.post1Excerpt
      homeCards[0].querySelector(".blog-link").textContent = t.blogReadMore
  
      // Segunda tarjeta
      homeCards[1].querySelector(".blog-title").textContent = t.post2Title
      homeCards[1].querySelector(".blog-date").textContent = t.post2Date
      homeCards[1].querySelector(".blog-excerpt").textContent = t.post2Excerpt
      homeCards[1].querySelector(".blog-link").textContent = t.blogReadMore
  
      // Tercera tarjeta
      homeCards[2].querySelector(".blog-title").textContent = t.post3Title
      homeCards[2].querySelector(".blog-date").textContent = t.post3Date
      homeCards[2].querySelector(".blog-excerpt").textContent = t.post3Excerpt
      homeCards[2].querySelector(".blog-link").textContent = t.blogReadMore
    }
  
    // Actualizar Contacto
    document.querySelector("#contact .section-title").textContent = t.contactTitle
  
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.querySelector('input[type="text"]').placeholder = t.contactFormName
      contactForm.querySelector('input[type="email"]').placeholder = t.contactFormEmail
      contactForm.querySelector("textarea").placeholder = t.contactFormMessage
      contactForm.querySelector('button[type="submit"]').textContent = t.contactFormSubmit
    }
  
    // Actualizar Footer
    const footerBottom = document.querySelector(".footer-bottom")
    if (footerBottom && footerBottom.querySelectorAll("p").length >= 2) {
      footerBottom.querySelectorAll("p")[0].textContent = t.footerRights
      footerBottom.querySelectorAll("p")[1].textContent = t.footerDesigned
    }
  
    // Actualizar página de blog
    const archiveTitle = document.querySelector(".archive-title")
    if (archiveTitle) {
      archiveTitle.textContent = t.blogArchiveTitle
      document.querySelector(".archive-description").textContent = t.blogArchiveDescription
  
      // Actualizar filtros
      const filterButtons = document.querySelectorAll(".filter-btn")
      if (filterButtons.length >= 4) {
        filterButtons[0].textContent = t.blogFilterAll
        filterButtons[1].textContent = t.blogFilterDesign
        filterButtons[2].textContent = t.blogFilterDevelopment
        filterButtons[3].textContent = t.blogFilterTechnology
      }
  
      // Actualizar tarjetas de blog en la página de archivo
      const archiveCards = document.querySelectorAll("#blog-page .blog-card")
      archiveCards.forEach((card) => {
        const category = card.getAttribute("data-category")
        const title = card.querySelector(".blog-title").textContent
  
        // Identificar qué post es basado en el título o categoría
        if (
          title.includes("Tendencias") ||
          title.includes("Trends") ||
          title.includes("Tendenze") ||
          category === "design"
        ) {
          card.querySelector(".blog-title").textContent = t.post1Title
          card.querySelector(".blog-date").textContent = t.post1Date
          card.querySelector(".blog-excerpt").textContent = t.post1Excerpt
        } else if (
          title.includes("Optimizar") ||
          title.includes("Optimize") ||
          title.includes("Ottimizzare") ||
          category === "development"
        ) {
          card.querySelector(".blog-title").textContent = t.post2Title
          card.querySelector(".blog-date").textContent = t.post2Date
          card.querySelector(".blog-excerpt").textContent = t.post2Excerpt
        } else if (title.includes("IA") || title.includes("AI") || category === "technology") {
          card.querySelector(".blog-title").textContent = t.post3Title
          card.querySelector(".blog-date").textContent = t.post3Date
          card.querySelector(".blog-excerpt").textContent = t.post3Excerpt
        }
  
        card.querySelector(".blog-link").textContent = t.blogReadMore
      })
    }
  
    // Actualizar páginas de blog individuales
    for (let i = 1; i <= 3; i++) {
      const postPage = document.getElementById(`post${i}-page`)
      if (postPage) {
        // Determinar qué post es
        let postTitle, postDate, postCategory, postAuthor
  
        if (i === 1) {
          postTitle = t.post1Title
          postDate = t.post1Date
          postCategory = t.post1Category
          postAuthor = t.post1Author
        } else if (i === 2) {
          postTitle = t.post2Title
          postDate = t.post2Date
          postCategory = t.post2Category
          postAuthor = t.post2Author
        } else if (i === 3) {
          postTitle = t.post3Title
          postDate = t.post3Date
          postCategory = t.post3Category
          postAuthor = t.post3Author
        }
  
        // Actualizar encabezado del post
        postPage.querySelector(".post-title").textContent = postTitle
  
        const metaSpans = postPage.querySelectorAll(".post-meta span")
        if (metaSpans.length >= 3) {
          metaSpans[0].textContent = postDate
          metaSpans[1].textContent = postCategory
          metaSpans[2].textContent = postAuthor
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
  