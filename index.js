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
        "Comparto mis pensamientos, experiencias y conocimientos sobre cloud computing, infraestructura y tecnologías emergentes.",
      blogFilterAll: "Todos",
      blogFilterCloud: "Cloud",
      blogFilterDevOps: "DevOps",
      blogFilterAI: "IA",
      blogPrev: "← Artículo anterior",
      blogNext: "Artículo siguiente →",
      blogRelated: "Artículos relacionados",
  
      // Contacto
      contactTitle: "Contacto",
      contactFormName: "Nombre",
      contactFormEmail: "Email",
      contactFormMessage: "Mensaje",
      contactFormSubmit: "Enviar Mensaje",
  
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
      post1Content: [
        "La adopción de estrategias multi-cloud se ha convertido en una tendencia dominante en el panorama empresarial actual. En 2025, las organizaciones están aprovechando las fortalezas específicas de diferentes proveedores cloud para optimizar costos, rendimiento y resiliencia. Este enfoque, sin embargo, trae consigo desafíos significativos de integración, seguridad y gestión.",
        "1. Fundamentos de una Estrategia Multi-Cloud Efectiva",
        "Una arquitectura multi-cloud bien diseñada no consiste simplemente en distribuir cargas de trabajo entre proveedores, sino en hacerlo estratégicamente:",
        "• Aprovecha las fortalezas específicas de cada proveedor (AWS para escalabilidad, Azure para integración con entornos Microsoft, GCP para análisis de datos y ML)",
        "• Implementa una capa de abstracción que minimice el acoplamiento con servicios específicos de cada proveedor",
        "• Establece un modelo de gobernanza unificado que mantenga la coherencia entre entornos",
        "• Desarrolla una estrategia de gestión de costos que optimice el gasto en cada plataforma",
        "2. Patrones de Arquitectura Multi-Cloud",
        "Varios patrones han emergido como soluciones efectivas para diferentes casos de uso:",
        "• Distribución por Funcionalidad: Asignar cargas de trabajo específicas al proveedor más adecuado",
        "• Redundancia Activa-Activa: Ejecutar aplicaciones críticas simultáneamente en múltiples nubes para máxima disponibilidad",
        "• Bursting Híbrido: Mantener cargas base en infraestructura privada con capacidad de expansión a nubes públicas durante picos de demanda",
        "• Segmentación Geográfica: Utilizar diferentes proveedores en distintas regiones para optimizar latencia y cumplimiento normativo",
        "3. Herramientas de Orquestación y Gestión",
        "El éxito de una estrategia multi-cloud depende en gran medida de las herramientas utilizadas para su gestión:",
        "• Plataformas de orquestación como Kubernetes con implementaciones federadas",
        "• Herramientas de IaC como Terraform o Pulumi para provisionar recursos de manera consistente",
        "• Soluciones de gestión de identidad centralizadas para control de acceso unificado",
        "• Plataformas de observabilidad que proporcionen visibilidad integral entre nubes",
        "4. Consideraciones de Seguridad",
        "La seguridad en entornos multi-cloud requiere un enfoque holístico:",
        "• Implementación de un modelo de seguridad Zero Trust que trascienda fronteras entre nubes",
        "• Estrategias de cifrado coherentes para datos en reposo y en tránsito",
        "• Gestión centralizada de secretos y credenciales",
        "• Automatización de evaluaciones de cumplimiento normativo en todos los entornos",
        "5. Optimización de Costos",
        "Gestionar eficientemente los costos en múltiples nubes es uno de los mayores desafíos:",
        "• Implementación de políticas de etiquetado consistentes para atribución de costos",
        "• Uso de herramientas de FinOps que proporcionen visibilidad unificada del gasto",
        "• Aprovechamiento de modelos de precios específicos de cada proveedor",
        "• Automatización de apagado de recursos no utilizados en todos los entornos",
        "Conclusión",
        "La arquitectura multi-cloud representa el futuro de la infraestructura empresarial, ofreciendo flexibilidad, resiliencia y optimización sin precedentes. Sin embargo, su implementación exitosa requiere una planificación meticulosa, herramientas adecuadas y un enfoque disciplinado."
      ],
  
      post2Title: "Terraform: Infraestructura como Código en la Práctica",
      post2Date: "28 Abril, 2025",
      post2Category: "Categoría: DevOps",
      post2Author: "Por: Esteban",
      post2Excerpt:
        "La gestión de infraestructura como código se ha vuelto esencial. En este artículo, comparto técnicas avanzadas para Terraform y cómo implementar CI/CD para tu infraestructura...",
      post2Content: [
        "La infraestructura como código (IaC) ha transformado radicalmente la forma en que las organizaciones despliegan y gestionan sus recursos en la nube. Terraform, desarrollado por HashiCorp, se ha consolidado como una de las herramientas más potentes y versátiles en este ámbito. En este artículo, exploraremos técnicas avanzadas para aprovechar al máximo Terraform en entornos empresariales complejos.",
        "1. Estructuración de Proyectos Terraform para Entornos Empresariales",
        "Una organización efectiva del código es fundamental para proyectos a gran escala:",
        "• Implementación de una estructura modular que permita la reutilización de componentes",
        "• Separación de configuraciones por entorno (desarrollo, pruebas, producción) mediante workspaces o directorios",
        "• Uso de repositorios independientes para módulos compartidos",
        "• Implementación de convenciones de nomenclatura consistentes para recursos y variables",
        "2. Gestión de Estado en Equipos Distribuidos",
        "El manejo adecuado del estado es crítico cuando múltiples equipos trabajan en la misma infraestructura:",
        "• Configuración de backends remotos como S3, Azure Blob Storage o Google Cloud Storage",
        "• Implementación de bloqueos de estado para prevenir operaciones concurrentes",
        "• Segmentación del estado por componentes o equipos mediante configuraciones parciales",
        "• Estrategias de respaldo y recuperación para estados críticos",
        "3. Integración con CI/CD para Infraestructura",
        "La automatización del ciclo de vida de la infraestructura ofrece numerosos beneficios:",
        "• Implementación de pipelines que ejecuten validación, planificación y aplicación de cambios",
        "• Configuración de aprobaciones manuales para cambios en entornos críticos",
        "• Integración de pruebas automatizadas para validar la infraestructura desplegada",
        "• Generación de documentación automática a partir del código de infraestructura",
        "4. Patrones Avanzados con Terraform",
        "Técnicas sofisticadas para resolver desafíos complejos:",
        "• Composición de Módulos: Creación de abstracciones de alto nivel que encapsulen patrones comunes",
        "• Meta-Argumentos: Uso de count, for_each y depends_on para control granular",
        "• Expresiones Dinámicas: Aprovechamiento de funciones y expresiones condicionales para configuraciones adaptativas",
        "• Providers Aliased: Gestión de múltiples regiones o cuentas en una sola configuración",
        "5. Seguridad y Cumplimiento como Código",
        "Incorporación de prácticas de seguridad en el flujo de IaC:",
        "• Implementación de análisis estático con herramientas como tfsec o checkov",
        "• Definición de políticas como código mediante Sentinel o OPA",
        "• Gestión segura de secretos con Vault o servicios de gestión de secretos nativos de la nube",
        "• Auditoría continua de configuraciones para detectar desviaciones de las mejores prácticas",
        "Conclusión",
        "Terraform ha evolucionado de ser una simple herramienta de aprovisionamiento a convertirse en un componente central de las estrategias de nube modernas. Su capacidad para trabajar con múltiples proveedores lo hace ideal para entornos híbridos y multi-cloud."
      ],
  
      post3Title: "IA en la Nube: Transformando Operaciones IT",
      post3Date: "15 Abril, 2025",
      post3Category: "Categoría: IA",
      post3Author: "Por: Esteban",
      post3Excerpt:
        "La inteligencia artificial está revolucionando la gestión de infraestructuras cloud. Explora cómo los servicios de IA de AWS, Azure y GCP están optimizando operaciones...",
      post3Content: [
        "La convergencia de la inteligencia artificial y la computación en la nube está redefiniendo fundamentalmente cómo se gestionan las infraestructuras IT. Los principales proveedores cloud (AWS, Azure, GCP y OCI) han integrado capacidades de IA que permiten automatizar, optimizar y predecir aspectos críticos de las operaciones tecnológicas. Esta evolución está transformando equipos reactivos en organizaciones proactivas y predictivas.",
        "1. AIOps: El Futuro de las Operaciones IT",
        "Las plataformas de AIOps (Inteligencia Artificial para Operaciones IT) están revolucionando la gestión de infraestructuras:",
        "• Detección de anomalías en tiempo real mediante análisis de patrones en métricas y logs",
        "• Correlación automática de eventos para identificar causas raíz de incidentes complejos",
        "• Predicción de fallos y degradaciones de rendimiento antes de que afecten a usuarios",
        "• Automatización de respuestas a incidentes comunes, reduciendo tiempos de resolución",
        "2. Servicios de IA Nativos en Principales Clouds",
        "Cada proveedor ha desarrollado soluciones específicas para integrar IA en sus plataformas:",
        "• AWS: DevOps Guru, Amazon Lookout for Metrics y CloudWatch Anomaly Detection",
        "• Azure: Azure Monitor con detección de anomalías y Azure Advisor",
        "• Google Cloud: Operations Suite con Intelligent Operations y Error Reporting",
        "• Oracle Cloud: OCI Operations Insights y Management Cloud con Machine Learning",
        "3. Optimización Inteligente de Recursos",
        "La IA está transformando cómo se gestionan y optimizan los recursos cloud:",
        "• Dimensionamiento automático basado en patrones de uso históricos y predicciones de carga",
        "• Recomendaciones de ahorro de costos mediante análisis de utilización y compromisos óptimos",
        "• Balanceo de cargas predictivo que anticipa picos de tráfico",
        "• Optimización de configuraciones para maximizar rendimiento y minimizar costos",
        "4. Seguridad Potenciada por IA",
        "Los sistemas de seguridad basados en IA ofrecen protección avanzada:",
        "• Detección de comportamientos anómalos que podrían indicar brechas de seguridad",
        "• Análisis de configuraciones para identificar vulnerabilidades y desviaciones de mejores prácticas",
        "• Respuesta automatizada a amenazas en tiempo real",
        "• Evaluación continua de postura de seguridad con recomendaciones adaptativas",
        "5. MLOps: Gestionando el Ciclo de Vida de Modelos de IA",
        "La gestión de modelos de machine learning se ha convertido en un componente crítico:",
        "• Plataformas para entrenamiento, despliegue y monitorización de modelos",
        "• Detección de degradación de modelos y reentrenamiento automático",
        "• Gestión de versiones y linaje de datos para reproducibilidad",
        "• Integración con pipelines de CI/CD para automatizar el despliegue de modelos",
        "Conclusión",
        "La integración de IA en las operaciones cloud representa un cambio paradigmático en la gestión de infraestructuras. Las organizaciones que adopten estas tecnologías no solo mejorarán su eficiencia operativa, sino que también podrán ofrecer niveles de servicio superiores con menos recursos."
      ]
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
      blogPrev: "← Articolo precedente",
      blogNext: "Articolo successivo →",
      blogRelated: "Articoli correlati",
  
      // Contatti
      contactTitle: "Contatti",
      contactFormName: "Nome",
      contactFormEmail: "Email",
      contactFormMessage: "Messaggio",
      contactFormSubmit: "Invia Messaggio",
  
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
      post1Content: [
        "L'adozione di strategie multi-cloud è diventata una tendenza dominante nel panorama aziendale attuale. Nel 2025, le organizzazioni stanno sfruttando i punti di forza specifici di diversi provider cloud per ottimizzare costi, prestazioni e resilienza. Questo approccio, tuttavia, comporta sfide significative di integrazione, sicurezza e gestione.",
        "1. Fondamenti di una Strategia Multi-Cloud Efficace",
        "Un'architettura multi-cloud ben progettata non consiste semplicemente nel distribuire carichi di lavoro tra provider, ma nel farlo strategicamente:",
        "• Sfrutta i punti di forza specifici di ciascun provider (AWS per la scalabilità, Azure per l'integrazione con ambienti Microsoft, GCP per l'analisi dei dati e ML)",
        "• Implementa un livello di astrazione che minimizzi l'accoppiamento con servizi specifici di ciascun provider",
        "• Stabilisce un modello di governance unificato che mantenga la coerenza tra gli ambienti",
        "• Sviluppa una strategia di gestione dei costi che ottimizzi la spesa su ciascuna piattaforma",
        "2. Modelli di Architettura Multi-Cloud",
        "Diversi modelli sono emersi come soluzioni efficaci per diversi casi d'uso:",
        "• Distribuzione per Funzionalità: Assegnare carichi di lavoro specifici al provider più adatto",
        "• Ridondanza Attiva-Attiva: Eseguire applicazioni critiche simultaneamente su più cloud per la massima disponibilità",
        "• Bursting Ibrido: Mantenere carichi di base nell'infrastruttura privata con capacità di espansione su cloud pubblici durante i picchi di domanda",
        "• Segmentazione Geografica: Utilizzare diversi provider in diverse regioni per ottimizzare latenza e conformità normativa",
        "3. Strumenti di Orchestrazione e Gestione",
        "Il successo di una strategia multi-cloud dipende in gran parte dagli strumenti utilizzati per la sua gestione:",
        "• Piattaforme di orchestrazione come Kubernetes con implementazioni federate",
        "• Strumenti di IaC come Terraform o Pulumi per provisioning risorse in modo coerente",
        "• Soluzioni di gestione delle identità centralizzate per un controllo degli accessi unificato",
        "• Piattaforme di osservabilità che forniscono visibilità integrale tra i cloud",
        "4. Considerazioni sulla Sicurezza",
        "La sicurezza negli ambienti multi-cloud richiede un approccio olistico:",
        "• Implementazione di un modello di sicurezza Zero Trust che trascenda i confini tra i cloud",
        "• Strategie di crittografia coerenti per i dati a riposo e in transito",
        "• Gestione centralizzata di segreti e credenziali",
        "• Automazione delle valutazioni di conformità normativa in tutti gli ambienti",
        "5. Ottimizzazione dei Costi",
        "Gestire efficientemente i costi su più cloud è una delle sfide maggiori:",
        "• Implementazione di politiche di etichettatura coerenti per l'attribuzione dei costi",
        "• Utilizzo di strumenti FinOps che forniscono visibilità unificata della spesa",
        "• Sfruttamento di modelli di prezzo specifici di ciascun provider",
        "• Automazione dello spegnimento delle risorse inutilizzate in tutti gli ambienti",
        "Conclusione",
        "L'architettura multi-cloud rappresenta il futuro dell'infrastruttura aziendale, offrendo flessibilità, resilienza e ottimizzazione senza precedenti. Tuttavia, la sua implementazione di successo richiede una pianificazione meticolosa, strumenti adeguati e un approccio disciplinato."
      ],
  
      post2Title: "Terraform: Infrastruttura come Codice nella Pratica",
      post2Date: "28 Aprile, 2025",
      post2Category: "Categoria: DevOps",
      post2Author: "Di: Esteban",
      post2Excerpt:
        "La gestione dell'infrastruttura come codice è diventata essenziale. In questo articolo, condivido tecniche avanzate per Terraform e come implementare CI/CD per la tua infrastruttura...",
      post2Content: [
        "L'infrastruttura come codice (IaC) ha trasformato radicalmente il modo in cui le organizzazioni distribuiscono e gestiscono le loro risorse nel cloud. Terraform, sviluppato da HashiCorp, si è consolidato come uno degli strumenti più potenti e versatili in questo campo. In questo articolo, esploreremo tecniche avanzate per sfruttare al massimo Terraform in ambienti aziendali complessi.",
        "1. Strutturazione di Progetti Terraform per Ambienti Aziendali",
        "Un'organizzazione efficace del codice è fondamentale per progetti su larga scala:",
        "• Implementazione di una struttura modulare che consenta il riutilizzo dei componenti",
        "• Separazione delle configurazioni per ambiente (sviluppo, test, produzione) tramite workspace o directory",
        "• Utilizzo di repository indipendenti per moduli condivisi",
        "• Implementazione di convenzioni di nomenclatura coerenti per risorse e variabili",
        "2. Gestione dello Stato in Team Distribuiti",
        "La gestione adeguata dello stato è critica quando più team lavorano sulla stessa infrastruttura:",
        "• Configurazione di backend remoti come S3, Azure Blob Storage o Google Cloud Storage",
        "• Implementazione di blocchi di stato per prevenire operazioni concorrenti",
        "• Segmentazione dello stato per componenti o team mediante configurazioni parziali",
        "• Strategie di backup e recupero per stati critici",
        "3. Integrazione con CI/CD per l'Infrastruttura",
        "L'automazione del ciclo di vita dell'infrastruttura offre numerosi vantaggi:",
        "• Implementazione di pipeline che eseguono validazione, pianificazione e applicazione delle modifiche",
        "• Configurazione di approvazioni manuali per modifiche in ambienti critici",
        "• Integrazione di test automatizzati per validare l'infrastruttura distribuita",
        "• Generazione di documentazione automatica dal codice dell'infrastruttura",
        "4. Pattern Avanzati con Terraform",
        "Tecniche sofisticate per risolvere sfide complesse:",
        "• Composizione di Moduli: Creazione di astrazioni di alto livello che incapsulano pattern comuni",
        "• Meta-Argomenti: Uso di count, for_each e depends_on per un controllo granulare",
        "• Espressioni Dinamiche: Sfruttamento di funzioni ed espressioni condizionali per configurazioni adattive",
        "• Provider con Alias: Gestione di più regioni o account in una singola configurazione",
        "5. Sicurezza e Conformità come Codice",
        "Incorporazione di pratiche di sicurezza nel flusso IaC:",
        "• Implementazione di analisi statica con strumenti come tfsec o checkov",
        "• Definizione di politiche come codice tramite Sentinel o OPA",
        "• Gestione sicura dei segreti con Vault o servizi di gestione dei segreti nativi del cloud",
        "• Audit continuo delle configurazioni per rilevare deviazioni dalle migliori pratiche",
        "Conclusione",
        "Terraform si è evoluto da semplice strumento di provisioning a componente centrale delle strategie cloud moderne. La sua capacità di lavorare con più provider lo rende ideale per ambienti ibridi e multi-cloud."
      ],
  
      post3Title: "IA nel Cloud: Trasformazione delle Operazioni IT",
      post3Date: "15 Aprile, 2025",
      post3Category: "Categoria: IA",
      post3Author: "Di: Esteban",
      post3Excerpt:
        "L'intelligenza artificiale sta rivoluzionando la gestione delle infrastrutture cloud. Esplora come i servizi di IA di AWS, Azure e GCP stanno ottimizzando le operazioni...",
      post3Content: [
        "La convergenza dell'intelligenza artificiale e del cloud computing sta ridefinendo fondamentalmente il modo in cui vengono gestite le infrastrutture IT. I principali provider cloud (AWS, Azure, GCP e OCI) hanno integrato capacità di IA che consentono di automatizzare, ottimizzare e prevedere aspetti critici delle operazioni tecnologiche. Questa evoluzione sta trasformando team reattivi in organizzazioni proattive e predittive.",
        "1. AIOps: Il Futuro delle Operazioni IT",
        "Le piattaforme AIOps (Intelligenza Artificiale per Operazioni IT) stanno rivoluzionando la gestione delle infrastrutture:",
        "• Rilevamento di anomalie in tempo reale mediante analisi di pattern in metriche e log",
        "• Correlazione automatica degli eventi per identificare cause principali di incidenti complessi",
        "• Previsione di guasti e degradazioni delle prestazioni prima che influiscano sugli utenti",
        "• Automazione delle risposte agli incidenti comuni, riducendo i tempi di risoluzione",
        "2. Servizi IA Nativi nei Principali Cloud",
        "Ogni provider ha sviluppato soluzioni specifiche per integrare l'IA nelle proprie piattaforme:",
        "• AWS: DevOps Guru, Amazon Lookout for Metrics e CloudWatch Anomaly Detection",
        "• Azure: Azure Monitor con rilevamento anomalie e Azure Advisor",
        "• Google Cloud: Operations Suite con Intelligent Operations ed Error Reporting",
        "• Oracle Cloud: OCI Operations Insights e Management Cloud con Machine Learning",
        "3. Ottimizzazione Intelligente delle Risorse",
        "L'IA sta trasformando il modo in cui vengono gestite e ottimizzate le risorse cloud:",
        "• Dimensionamento automatico basato su pattern di utilizzo storici e previsioni di carico",
        "• Raccomandazioni di risparmio sui costi mediante analisi dell'utilizzo e impegni ottimali",
        "• Bilanciamento del carico predittivo che anticipa i picchi di traffico",
        "• Ottimizzazione delle configurazioni per massimizzare le prestazioni e minimizzare i costi",
        "4. Sicurezza Potenziata dall'IA",
        "I sistemi di sicurezza basati sull'IA offrono protezione avanzata:",
        "• Rilevamento di comportamenti anomali che potrebbero indicare violazioni della sicurezza",
        "• Analisi delle configurazioni per identificare vulnerabilità e deviazioni dalle migliori pratiche",
        "• Risposta automatizzata alle minacce in tempo reale",
        "• Valutazione continua della postura di sicurezza con raccomandazioni adattive",
        "5. MLOps: Gestione del Ciclo di Vita dei Modelli IA",
        "La gestione dei modelli di machine learning è diventata un componente critico:",
        "• Piattaforme per addestramento, distribuzione e monitoraggio dei modelli",
        "• Rilevamento del degrado dei modelli e riaddestramento automatico",
        "• Gestione delle versioni e della provenienza dei dati per la riproducibilità",
        "• Integrazione con pipeline CI/CD per automatizzare la distribuzione dei modelli",
        "Conclusione",
        "L'integrazione dell'IA nelle operazioni cloud rappresenta un cambiamento paradigmatico nella gestione delle infrastrutture. Le organizzazioni che adottano queste tecnologie non solo miglioreranno la loro efficienza operativa, ma potranno anche offrire livelli di servizio superiori con meno risorse."
      ]
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
      blogPrev: "← Previous article",
      blogNext: "Next article →",
      blogRelated: "Related articles",
  
      // Contact
      contactTitle: "Contact",
      contactFormName: "Name",
      contactFormEmail: "Email",
      contactFormMessage: "Message",
      contactFormSubmit: "Send Message",
  
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
      post1Content: [
        "The adoption of multi-cloud strategies has become a dominant trend in today's business landscape. In 2025, organizations are leveraging the specific strengths of different cloud providers to optimize costs, performance, and resilience. This approach, however, brings significant challenges in integration, security, and management.",
        "1. Foundations of an Effective Multi-Cloud Strategy",
        "A well-designed multi-cloud architecture isn't simply about distributing workloads across providers, but doing so strategically:",
        "• Leverages the specific strengths of each provider (AWS for scalability, Azure for integration with Microsoft environments, GCP for data analytics and ML)",
        "• Implements an abstraction layer that minimizes coupling with provider-specific services",
        "• Establishes a unified governance model that maintains consistency across environments",
        "• Develops a cost management strategy that optimizes spending on each platform",
        "2. Multi-Cloud Architecture Patterns",
        "Several patterns have emerged as effective solutions for different use cases:",
        "• Functionality Distribution: Assigning specific workloads to the most suitable provider",
        "• Active-Active Redundancy: Running critical applications simultaneously on multiple clouds for maximum availability",
        "• Hybrid Bursting: Maintaining base loads on private infrastructure with expansion capability to public clouds during demand peaks",
        "• Geographic Segmentation: Using different providers in different regions to optimize latency and regulatory compliance",
        "3. Orchestration and Management Tools",
        "The success of a multi-cloud strategy largely depends on the tools used for its management:",
        "• Orchestration platforms like Kubernetes with federated implementations",
        "• IaC tools like Terraform or Pulumi to provision resources consistently",
        "• Centralized identity management solutions for unified access control",
        "• Observability platforms that provide comprehensive visibility across clouds",
        "4. Security Considerations",
        "Security in multi-cloud environments requires a holistic approach:",
        "• Implementation of a Zero Trust security model that transcends cloud boundaries",
        "• Consistent encryption strategies for data at rest and in transit",
        "• Centralized management of secrets and credentials",
        "• Automation of regulatory compliance assessments across all environments",
        "5. Cost Optimization",
        "Efficiently managing costs across multiple clouds is one of the biggest challenges:",
        "• Implementation of consistent tagging policies for cost attribution",
        "• Use of FinOps tools that provide unified spending visibility",
        "• Leveraging provider-specific pricing models",
        "• Automation of unused resource shutdown across all environments",
        "Conclusion",
        "Multi-cloud architecture represents the future of enterprise infrastructure, offering unprecedented flexibility, resilience, and optimization. However, its successful implementation requires meticulous planning, appropriate tools, and a disciplined approach."
      ],
  
      post2Title: "Terraform: Infrastructure as Code in Practice",
      post2Date: "April 28, 2025",
      post2Category: "Category: DevOps",
      post2Author: "By: Esteban",
      post2Excerpt:
        "Infrastructure as code management has become essential. In this article, I share advanced techniques for Terraform and how to implement CI/CD for your infrastructure...",
      post2Content: [
        "Infrastructure as Code (IaC) has radically transformed how organizations deploy and manage their resources in the cloud. Terraform, developed by HashiCorp, has established itself as one of the most powerful and versatile tools in this field. In this article, we'll explore advanced techniques to make the most of Terraform in complex enterprise environments.",
        "1. Structuring Terraform Projects for Enterprise Environments",
        "Effective code organization is fundamental for large-scale projects:",
        "• Implementation of a modular structure that allows component reuse",
        "• Separation of configurations by environment (development, testing, production) using workspaces or directories",
        "• Use of independent repositories for shared modules",
        "• Implementation of consistent naming conventions for resources and variables",
        "2. State Management in Distributed Teams",
        "Proper state handling is critical when multiple teams work on the same infrastructure:",
        "• Configuration of remote backends such as S3, Azure Blob Storage, or Google Cloud Storage",
        "• Implementation of state locks to prevent concurrent operations",
        "• State segmentation by components or teams through partial configurations",
        "• Backup and recovery strategies for critical states",
        "3. Integration with CI/CD for Infrastructure",
        "Automating the infrastructure lifecycle offers numerous benefits:",
        "• Implementation of pipelines that execute validation, planning, and application of changes",
        "• Configuration of manual approvals for changes in critical environments",
        "• Integration of automated tests to validate deployed infrastructure",
        "• Automatic documentation generation from infrastructure code",
        "4. Advanced Patterns with Terraform",
        "Sophisticated techniques to solve complex challenges:",
        "• Module Composition: Creation of high-level abstractions that encapsulate common patterns",
        "• Meta-Arguments: Use of count, for_each, and depends_on for granular control",
        "• Dynamic Expressions: Leveraging functions and conditional expressions for adaptive configurations",
        "• Aliased Providers: Management of multiple regions or accounts in a single configuration",
        "5. Security and Compliance as Code",
        "Incorporating security practices into the IaC flow:",
        "• Implementation of static analysis with tools like tfsec or checkov",
        "• Definition of policies as code using Sentinel or OPA",
        "• Secure management of secrets with Vault or cloud-native secret management services",
        "• Continuous auditing of configurations to detect deviations from best practices",
        "Conclusion",
        "Terraform has evolved from a simple provisioning tool to become a central component of modern cloud strategies. Its ability to work with multiple providers makes it ideal for hybrid and multi-cloud environments."
      ],
  
      post3Title: "AI in the Cloud: Transforming IT Operations",
      post3Date: "April 15, 2025",
      post3Category: "Category: AI",
      post3Author: "By: Esteban",
      post3Excerpt:
        "Artificial intelligence is revolutionizing cloud infrastructure management. Explore how AI services from AWS, Azure, and GCP are optimizing operations...",
      post3Content: [
        "The convergence of artificial intelligence and cloud computing is fundamentally redefining how IT infrastructures are managed. The major cloud providers (AWS, Azure, GCP, and OCI) have integrated AI capabilities that enable automation, optimization, and prediction of critical aspects of technological operations. This evolution is transforming reactive teams into proactive and predictive organizations.",
        "1. AIOps: The Future of IT Operations",
        "AIOps platforms (Artificial Intelligence for IT Operations) are revolutionizing infrastructure management:",
        "• Real-time anomaly detection through pattern analysis in metrics and logs",
        "• Automatic event correlation to identify root causes of complex incidents",
        "• Prediction of failures and performance degradations before they affect users",
        "• Automation of responses to common incidents, reducing resolution times",
        "2. Native AI Services in Major Clouds",
        "Each provider has developed specific solutions to integrate AI into their platforms:",
        "• AWS: DevOps Guru, Amazon Lookout for Metrics, and CloudWatch Anomaly Detection",
        "• Azure: Azure Monitor with anomaly detection and Azure Advisor",
        "• Google Cloud: Operations Suite with Intelligent Operations and Error Reporting",
        "• Oracle Cloud: OCI Operations Insights and Management Cloud with Machine Learning",
        "3. Intelligent Resource Optimization",
        "AI is transforming how cloud resources are managed and optimized:",
        "• Automatic scaling based on historical usage patterns and load predictions",
        "• Cost-saving recommendations through utilization analysis and optimal commitments",
        "• Predictive load balancing that anticipates traffic spikes",
        "• Configuration optimization to maximize performance and minimize costs",
        "4. AI-Powered Security",
        "AI-based security systems offer advanced protection:",
        "• Detection of anomalous behaviors that could indicate security breaches",
        "• Configuration analysis to identify vulnerabilities and deviations from best practices",
        "• Automated real-time threat response",
        "• Continuous security posture assessment with adaptive recommendations",
        "5. MLOps: Managing the Lifecycle of AI Models",
        "The management of machine learning models has become a critical component:",
        "• Platforms for training, deployment, and monitoring of models",
        "• Detection of model degradation and automatic retraining",
        "• Version management and data lineage for reproducibility",
        "• Integration with CI/CD pipelines to automate model deployment",
        "Conclusion",
        "The integration of AI into cloud operations represents a paradigm shift in infrastructure management. Organizations that adopt these technologies will not only improve their operational efficiency but will also be able to deliver superior service levels with fewer resources."
      ]
    }
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
        filterButtons[1].textContent = t.blogFilterCloud
        filterButtons[2].textContent = t.blogFilterDevOps
        filterButtons[3].textContent = t.blogFilterAI
      }
  
      // Actualizar tarjetas de blog en la página de archivo
      const archiveCards = document.querySelectorAll("#blog-page .blog-card")
      archiveCards.forEach((card) => {
        const category = card.getAttribute("data-category")
        const title = card.querySelector(".blog-title").textContent
  
        // Identificar qué post es basado en el título o categoría
        if (
          title.includes("Arquitectura") ||
          title.includes("Architecture") ||
          title.includes("Architettura") ||
          category === "cloud" && title.includes("Multi-Cloud")
        ) {
          card.querySelector(".blog-title").textContent = t.post1Title
          card.querySelector(".blog-date").textContent = t.post1Date
          card.querySelector(".blog-excerpt").textContent = t.post1Excerpt
        } else if (
          title.includes("Terraform") ||
          category === "devops"
        ) {
          card.querySelector(".blog-title").textContent = t.post2Title
          card.querySelector(".blog-date").textContent = t.post2Date
          card.querySelector(".blog-excerpt").textContent = t.post2Excerpt
        } else if (
          title.includes("IA") || 
          title.includes("AI") || 
          category === "ai"
        ) {
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
        let postTitle, postDate, postCategory, postAuthor, postContent
  
        if (i === 1) {
          postTitle = t.post1Title
          postDate = t.post1Date
          postCategory = t.post1Category
          postAuthor = t.post1Author
          postContent = t.post1Content
        } else if (i === 2) {
          postTitle = t.post2Title
          postDate = t.post2Date
          postCategory = t.post2Category
          postAuthor = t.post2Author
          postContent = t.post2Content
        } else if (i === 3) {
          postTitle = t.post3Title
          postDate = t.post3Date
          postCategory = t.post3Category
          postAuthor = t.post3Author
          postContent = t.post3Content
        }

        // Actualizar encabezado del post
        postPage.querySelector(".post-title").textContent = postTitle

        const metaSpans = postPage.querySelectorAll(".post-meta span")
        if (metaSpans.length >= 3) {
          metaSpans[0].textContent = postDate
          metaSpans[1].textContent = postCategory
          metaSpans[2].textContent = postAuthor
        }

        // Actualizar contenido del post
        const postContentDiv = postPage.querySelector(".post-content")
        if (postContentDiv && postContent) {
          // Limpiar contenido actual
          postContentDiv.innerHTML = ""
          
          // Agregar nuevo contenido
          postContent.forEach((paragraph) => {
            const p = document.createElement("p")
            
            // Verificar si es un título
            if (paragraph.startsWith("1.") || paragraph.startsWith("2.") || 
                paragraph.startsWith("3.") || paragraph.startsWith("4.") || 
                paragraph.startsWith("5.") || paragraph.startsWith("Conclusión") ||
                paragraph.startsWith("Conclusion") || paragraph.startsWith("Conclusione")) {
              const h2 = document.createElement("h2")
              h2.textContent = paragraph
              postContentDiv.appendChild(h2)
            } 
            // Verificar si es una lista
            else if (paragraph.startsWith("•")) {
              // Si es el primer elemento de lista, crear la lista
              if (!postContentDiv.lastElementChild || postContentDiv.lastElementChild.tagName !== "UL") {
                const ul = document.createElement("ul")
                postContentDiv.appendChild(ul)
              }
              
              const li = document.createElement("li")
              li.textContent = paragraph.substring(1).trim()
              postContentDiv.lastElementChild.appendChild(li)
            } 
            // Párrafo normal
            else {
              p.textContent = paragraph
              postContentDiv.appendChild(p)
            }
          })
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