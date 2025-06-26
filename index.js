<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Esteban De Genaro</title>
    <link rel="stylesheet" href="https://site-rho-teal.vercel.app/estilos.css" />
</head>
<body>
    <div class="container">
        <!-- Partículas de fondo -->
        <canvas class="particles" id="particles"></canvas>
        
        <!-- Barra de navegación -->
        <nav class="navbar">
            <a href="#" class="logo" onclick="navigateTo('home')">Esteban De Genaro</a>
            <div class="nav-links">
                <a href="#" onclick="navigateTo('home')" class="nav-link active" data-page="home">Inicio</a>
                <a href="#" onclick="navigateTo('about')" class="nav-link" data-page="about">Sobre Mí</a>
                <a href="#" onclick="navigateTo('blog')" class="nav-link" data-page="blog">Blog</a>
                <a href="mailto:esteban@degenaro.eu?subject=Mensaje%20desde%20sitio%20web&body=Hola%20Esteban,%20me%20contacto%20para%20generar%20una%20meet.%20Muchas%20gracias." class="nav-link" data-page="contact">Contacto</a>
                <div class="language-selector">
                    <button class="language-btn active" data-lang="es" title="Español">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="20" height="15">
                            <path fill="#c60b1e" d="M0 0h640v480H0z"/>
                            <path fill="#ffc400" d="M0 120h640v240H0z"/>
                        </svg>
                    </button>
                    <button class="language-btn" data-lang="it" title="Italiano">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="20" height="15">
                            <path fill="#fff" d="M0 0h640v480H0z"/>
                            <path fill="#009246" d="M0 0h213.3v480H0z"/>
                            <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
                        </svg>
                    </button>
                    <button class="language-btn" data-lang="en" title="English">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="20" height="15">
                            <path fill="#012169" d="M0 0h640v480H0z"/>
                            <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
                            <path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
                            <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
                            <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="menu-btn">☰</div>
        </nav>

        <!-- Botón volver arriba -->
        <a href="#" class="back-to-top" id="backToTop">↑</a>
        
        <!-- PÁGINA PRINCIPAL -->
        <div class="page active" id="home-page">
            <!-- Hero Section -->
            <section class="hero" id="home">
                <div class="hero-bg"></div>
                <div class="hero-content">
                    <h1 class="hero-title fade-in-up">Hola, soy <span>Esteban :)</span></h1>
                    <p class="hero-subtitle fade-in-up delay-1">Cloud Engineer & Web Developer</p>
                    <div class="hero-buttons fade-in-up delay-3">
                        <a href="#" onclick="navigateTo('blog')" class="btn btn-primary">Blog</a>
                        <a href="mailto:esteban@degenaro.eu?subject=Mensaje%20desde%20sitio%20web&body=Hola%20Esteban,%20me%20contacto%20para%20generar%20una%20meet.%20Muchas%20gracias." class="btn btn-secondary">Contactar</a>
                    </div>
                </div>
            </section>
            
            <!-- Sobre Mí -->
            <section id="about">
                <h2 class="section-title">Sobre Mí</h2>
                <div class="about">
                    <div class="about-img">
                        <img src="https://degenaro.eu/profile_pic.png?height=600&width=600" alt="Mi foto">
                    </div>
                    <div class="about-content">
                        <h3>Conóceme un poco más</h3>
                        <p>
                            Profesional italo-argentino con más de 15 años de experiencia en entornos corporativos multinacionales. A lo largo de mi trayectoria, he trabajado en proyectos críticos sobre infraestructuras on-premise, cloud e híbridas, aportando soluciones sólidas en contextos de alta exigencia tecnológica y organizacional.
                        </p>
                        <p>
                            Mi especialización se centra en la arquitectura de sistemas, gestión de entornos híbridos, modernización de infraestructuras y migraciones a la nube. Combinando una visión estratégica con capacidades técnicas, he contribuido a optimizar operaciones, mejorar la resiliencia de los sistemas y facilitar procesos de transformación digital.
                        </p>
                        <p>
                            Me destaco por un enfoque proactivo, orientado a resultados y basado en buenas prácticas, trabajando de forma colaborativa con equipos multidisciplinarios. Mi objetivo es seguir aportando valor a través de la innovación tecnológica, la mejora continua y la alineación entre IT y negocio.
                        </p>                        
                        <div class="skills">
                            <div class="skill-tag">AWS</div>
                            <div class="skill-tag">Azure</div>
                            <div class="skill-tag">GCP</div>
                            <div class="skill-tag">OCI</div>
                            <div class="skill-tag">Docker / EKS</div>
                            <div class="skill-tag">SQL / NoSQL</div>
                            <div class="skill-tag">Windows / Linux</div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Blog Preview -->
            <section id="blog-preview" class="blog-section">
                <h2 class="section-title">Últimas Publicaciones</h2>
                <div class="blog-grid">
                    <div class="blog-card">
                        <img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Arquitectura Multi-Cloud" class="blog-img">
                        <div class="blog-content">
                            <p class="blog-date">4 Mayo, 2025</p>
                            <h3 class="blog-title">Arquitectura Multi-Cloud: Estrategias para 2025</h3>
                            <p class="blog-excerpt">Descubre las mejores prácticas para implementar arquitecturas multi-cloud que aprovechan las fortalezas de AWS, Azure y GCP. Estrategias para optimizar costos y rendimiento...</p>
                            <a href="#" onclick="navigateToBlogPost('post1')" class="btn btn-primary blog-link">Leer más</a>
                        </div>
                    </div>
                    
                    <div class="blog-card">
                        <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Terraform Infrastructure" class="blog-img">
                        <div class="blog-content">
                            <p class="blog-date">28 Abril, 2025</p>
                            <h3 class="blog-title">Terraform: Infraestructura como Código en la Práctica</h3>
                            <p class="blog-excerpt">La gestión de infraestructura como código se ha vuelto esencial. En este artículo, comparto técnicas avanzadas para Terraform y cómo implementar CI/CD para tu infraestructura...</p>
                            <a href="#" onclick="navigateToBlogPost('post2')" class="btn btn-primary blog-link">Leer más</a>
                        </div>
                    </div>
                    
                    <div class="blog-card">
                        <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="IA en la Nube" class="blog-img">
                        <div class="blog-content">
                            <p class="blog-date">15 Abril, 2025</p>
                            <h3 class="blog-title">IA en la Nube: Transformando Operaciones IT</h3>
                            <p class="blog-excerpt">La inteligencia artificial está revolucionando la gestión de infraestructuras cloud. Explora cómo los servicios de IA de AWS, Azure y GCP están optimizando operaciones...</p>
                            <a href="#" onclick="navigateToBlogPost('post3')" class="btn btn-primary blog-link">Leer más</a>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 3rem;">
                    <a href="#" onclick="navigateTo('blog')" class="btn btn-secondary">Ver todas las publicaciones</a>
                </div>
            </section>
        </div>
        
        <!-- PÁGINA DE BLOG (ARCHIVO) -->
        <div class="page" id="blog-page">
            <div class="blog-archive">
                <div class="archive-header">
                    <h1 class="archive-title">Mi Blog</h1>
                    <p class="archive-description">Comparto mis pensamientos, experiencias y conocimientos sobre cloud computing, infraestructura y tecnologías emergentes.</p>
                </div>
                
                <div class="archive-filters">
                    <button class="filter-btn active" data-filter="all">Todos</button>
                    <button class="filter-btn" data-filter="cloud">Cloud</button>
                    <button class="filter-btn" data-filter="devops">DevOps</button>
                    <button class="filter-btn" data-filter="ai">IA</button>
                </div>
                
                <div class="blog-grid">
                    <div class="blog-card" data-category="cloud">
                        <img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Arquitectura Multi-Cloud" class="blog-img">
                        <div class="blog-content">
                            <p class="blog-date">4 Mayo, 2025</p>
                            <h3 class="blog-title">Arquitectura Multi-Cloud: Estrategias para 2025</h3>
                            <p class="blog-excerpt">Descubre las mejores prácticas para implementar arquitecturas multi-cloud que aprovechan las fortalezas de AWS, Azure y GCP. Estrategias para optimizar costos y rendimiento...</p>
                            <a href="#" onclick="navigateToBlogPost('post1')" class="btn btn-primary blog-link">Leer más</a>
                        </div>
                    </div>
                    
                    <div class="blog-card" data-category="devops">
                        <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Terraform Infrastructure" class="blog-img">
                        <div class="blog-content">
                            <p class="blog-date">28 Abril, 2025</p>
                            <h3 class="blog-title">Terraform: Infraestructura como Código en la Práctica</h3>
                            <p class="blog-excerpt">La gestión de infraestructura como código se ha vuelto esencial. En este artículo, comparto técnicas avanzadas para Terraform y cómo implementar CI/CD para tu infraestructura...</p>
                            <a href="#" onclick="navigateToBlogPost('post2')" class="btn btn-primary blog-link">Leer más</a>
                        </div>
                    </div>
                    
                    <div class="blog-card" data-category="ai">
                        <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="IA en la Nube" class="blog-img">
                        <div class="blog-content">
                            <p class="blog-date">15 Abril, 2025</p>
                            <h3 class="blog-title">IA en la Nube: Transformando Operaciones IT</h3>
                            <p class="blog-excerpt">La inteligencia artificial está revolucionando la gestión de infraestructuras cloud. Explora cómo los servicios de IA de AWS, Azure y GCP están optimizando operaciones...</p>
                            <a href="#" onclick="navigateToBlogPost('post3')" class="btn btn-primary blog-link">Leer más</a>
                        </div>
                    </div>
                    
                    <div class="blog-card" data-category="cloud">
                        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Kubernetes Orchestration" class="blog-img">
                        <div class="blog-content">
                            <p class="blog-date">5 Abril, 2025</p>
                            <h3 class="blog-title">Kubernetes: Orquestación de Contenedores a Escala</h3>
                            <p class="blog-excerpt">Kubernetes se ha convertido en el estándar para la orquestación de contenedores. Aprende las mejores prácticas para desplegar y gestionar aplicaciones en producción...</p>
                            <a href="#" onclick="navigateToBlogPost('post4')" class="btn btn-primary blog-link">Leer más</a>
                        </div>
                    </div>
                    
                    <div class="blog-card" data-category="devops">
                        <img src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="CI/CD Pipeline" class="blog-img">
                        <div class="blog-content">
                            <p class="blog-date">28 Marzo, 2025</p>
                            <h3 class="blog-title">CI/CD: Automatización de Despliegues Modernos</h3>
                            <p class="blog-excerpt">Los pipelines de CI/CD son fundamentales para el desarrollo moderno. En esta guía completa, te muestro cómo implementar automatización efectiva para tus proyectos...</p>
                            <a href="#" onclick="navigateToBlogPost('post5')" class="btn btn-primary blog-link">Leer más</a>
                        </div>
                    </div>
                    
                    <div class="blog-card" data-category="ai">
                        <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Machine Learning Operations" class="blog-img">
                        <div class="blog-content">
                            <p class="blog-date">15 Marzo, 2025</p>
                            <h3 class="blog-title">MLOps: Operaciones de Machine Learning</h3>
                            <p class="blog-excerpt">MLOps combina machine learning, DevOps y ingeniería de datos. Descubre cómo gestionar el ciclo de vida completo de modelos de ML en producción...</p>
                            <a href="#" onclick="navigateToBlogPost('post6')" class="btn btn-primary blog-link">Leer más</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- PÁGINAS DE BLOG INDIVIDUALES -->
        <!-- Blog Post 1 -->
        <div class="page" id="post1-page">
            <div class="blog-post">
                <article>
                    <header class="post-header">
                        <h1 class="post-title">Arquitectura Multi-Cloud: Estrategias para 2025</h1>
                        <div class="post-meta">
                            <span class="post-date">4 Mayo, 2025</span>
                            <span class="post-category">Categoría: Cloud</span>
                            <span class="post-author">Por: Esteban</span>
                        </div>
                    </header>
                    
                    <img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Arquitectura Multi-Cloud" class="post-featured-img">
                    
                    <div class="post-content">
                        <p>La adopción de estrategias multi-cloud se ha convertido en una tendencia dominante en el panorama empresarial actual. En 2025, las organizaciones están aprovechando las fortalezas específicas de diferentes proveedores cloud para optimizar costos, rendimiento y resiliencia.</p>
                        
                        <h2>1. Fundamentos de una Estrategia Multi-Cloud Efectiva</h2>
                        <p>Una arquitectura multi-cloud bien diseñada no consiste simplemente en distribuir cargas de trabajo entre proveedores, sino en hacerlo estratégicamente.</p>
                        
                        <h2>2. Patrones de Arquitectura Multi-Cloud</h2>
                        <p>Varios patrones han emergido como soluciones efectivas para diferentes casos de uso.</p>
                        
                        <h2>Conclusión</h2>
                        <p>La arquitectura multi-cloud representa el futuro de la infraestructura empresarial, ofreciendo flexibilidad, resiliencia y optimización sin precedentes.</p>
                    </div>
                    
                    <div class="post-navigation">
                        <a href="#" onclick="navigateToBlogPost('post6')" class="post-nav-link prev">← Artículo anterior</a>
                        <a href="#" onclick="navigateToBlogPost('post2')" class="post-nav-link next">Artículo siguiente →</a>
                    </div>
                    
                    <div class="related-posts">
                        <h3 class="related-title">Artículos relacionados</h3>
                        <div class="blog-grid">
                            <div class="blog-card">
                                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Kubernetes" class="blog-img">
                                <div class="blog-content">
                                    <p class="blog-date">5 Abril, 2025</p>
                                    <h3 class="blog-title">Kubernetes: Orquestación de Contenedores a Escala</h3>
                                    <a href="#" onclick="navigateToBlogPost('post4')" class="btn btn-primary blog-link">Leer más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
        
        <!-- Blog Post 2 -->
        <div class="page" id="post2-page">
            <div class="blog-post">
                <article>
                    <header class="post-header">
                        <h1 class="post-title">Terraform: Infraestructura como Código en la Práctica</h1>
                        <div class="post-meta">
                            <span class="post-date">28 Abril, 2025</span>
                            <span class="post-category">Categoría: DevOps</span>
                            <span class="post-author">Por: Esteban</span>
                        </div>
                    </header>
                    
                    <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Terraform Infrastructure" class="post-featured-img">
                    
                    <div class="post-content">
                        <p>La infraestructura como código (IaC) ha transformado radicalmente la forma en que las organizaciones despliegan y gestionan sus recursos en la nube.</p>
                        
                        <h2>1. Estructuración de Proyectos Terraform</h2>
                        <p>Una organización efectiva del código es fundamental para proyectos a gran escala.</p>
                        
                        <h2>2. Gestión de Estado en Equipos Distribuidos</h2>
                        <p>El manejo adecuado del estado es crítico cuando múltiples equipos trabajan en la misma infraestructura.</p>
                        
                        <h2>Conclusión</h2>
                        <p>Terraform ha evolucionado de ser una simple herramienta de aprovisionamiento a convertirse en un componente central de las estrategias de nube modernas.</p>
                    </div>
                    
                    <div class="post-navigation">
                        <a href="#" onclick="navigateToBlogPost('post1')" class="post-nav-link prev">← Artículo anterior</a>
                        <a href="#" onclick="navigateToBlogPost('post3')" class="post-nav-link next">Artículo siguiente →</a>
                    </div>
                    
                    <div class="related-posts">
                        <h3 class="related-title">Artículos relacionados</h3>
                        <div class="blog-grid">
                            <div class="blog-card">
                                <img src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="CI/CD Pipeline" class="blog-img">
                                <div class="blog-content">
                                    <p class="blog-date">28 Marzo, 2025</p>
                                    <h3 class="blog-title">CI/CD: Automatización de Despliegues Modernos</h3>
                                    <a href="#" onclick="navigateToBlogPost('post5')" class="btn btn-primary blog-link">Leer más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
        
        <!-- Blog Post 3 -->
        <div class="page" id="post3-page">
            <div class="blog-post">
                <article>
                    <header class="post-header">
                        <h1 class="post-title">IA en la Nube: Transformando Operaciones IT</h1>
                        <div class="post-meta">
                            <span class="post-date">15 Abril, 2025</span>
                            <span class="post-category">Categoría: IA</span>
                            <span class="post-author">Por: Esteban</span>
                        </div>
                    </header>
                    
                    <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="IA en la Nube" class="post-featured-img">
                    
                    <div class="post-content">
                        <p>La convergencia de la inteligencia artificial y la computación en la nube está redefiniendo fundamentalmente cómo se gestionan las infraestructuras IT.</p>
                        
                        <h2>1. AIOps: El Futuro de las Operaciones IT</h2>
                        <p>Las plataformas de AIOps están revolucionando la gestión de infraestructuras.</p>
                        
                        <h2>2. Servicios de IA Nativos en Principales Clouds</h2>
                        <p>Cada proveedor ha desarrollado soluciones específicas para integrar IA en sus plataformas.</p>
                        
                        <h2>Conclusión</h2>
                        <p>La integración de IA en las operaciones cloud representa un cambio paradigmático en la gestión de infraestructuras.</p>
                    </div>
                    
                    <div class="post-navigation">
                        <a href="#" onclick="navigateToBlogPost('post2')" class="post-nav-link prev">← Artículo anterior</a>
                        <a href="#" onclick="navigateToBlogPost('post4')" class="post-nav-link next">Artículo siguiente →</a>
                    </div>
                    
                    <div class="related-posts">
                        <h3 class="related-title">Artículos relacionados</h3>
                        <div class="blog-grid">
                            <div class="blog-card">
                                <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="MLOps" class="blog-img">
                                <div class="blog-content">
                                    <p class="blog-date">15 Marzo, 2025</p>
                                    <h3 class="blog-title">MLOps: Operaciones de Machine Learning</h3>
                                    <a href="#" onclick="navigateToBlogPost('post6')" class="btn btn-primary blog-link">Leer más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>

        <!-- Blog Post 4 -->
        <div class="page" id="post4-page">
            <div class="blog-post">
                <article>
                    <header class="post-header">
                        <h1 class="post-title">Kubernetes: Orquestación de Contenedores a Escala</h1>
                        <div class="post-meta">
                            <span class="post-date">5 Abril, 2025</span>
                            <span class="post-category">Categoría: Cloud</span>
                            <span class="post-author">Por: Esteban</span>
                        </div>
                    </header>
                    
                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Kubernetes Orchestration" class="post-featured-img">
                    
                    <div class="post-content">
                        <p>Kubernetes se ha consolidado como la plataforma de orquestación de contenedores más adoptada en el mundo empresarial, transformando la forma en que desplegamos y gestionamos aplicaciones a escala.</p>
                        
                        <h2>1. Fundamentos de Kubernetes en Producción</h2>
                        <p>Implementar Kubernetes en entornos de producción requiere una comprensión profunda de sus componentes y patrones de diseño.</p>
                        
                        <h2>2. Estrategias de Despliegue y Escalado</h2>
                        <p>Las estrategias de despliegue en Kubernetes permiten actualizaciones sin tiempo de inactividad y rollbacks seguros.</p>
                        
                        <h2>Conclusión</h2>
                        <p>Kubernetes ha democratizado la orquestación de contenedores, permitiendo a las organizaciones escalar sus aplicaciones de manera eficiente y confiable.</p>
                    </div>
                    
                    <div class="post-navigation">
                        <a href="#" onclick="navigateToBlogPost('post3')" class="post-nav-link prev">← Artículo anterior</a>
                        <a href="#" onclick="navigateToBlogPost('post5')" class="post-nav-link next">Artículo siguiente →</a>
                    </div>
                    
                    <div class="related-posts">
                        <h3 class="related-title">Artículos relacionados</h3>
                        <div class="blog-grid">
                            <div class="blog-card">
                                <img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Multi-Cloud" class="blog-img">
                                <div class="blog-content">
                                    <p class="blog-date">4 Mayo, 2025</p>
                                    <h3 class="blog-title">Arquitectura Multi-Cloud: Estrategias para 2025</h3>
                                    <a href="#" onclick="navigateToBlogPost('post1')" class="btn btn-primary blog-link">Leer más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>

        <!-- Blog Post 5 -->
        <div class="page" id="post5-page">
            <div class="blog-post">
                <article>
                    <header class="post-header">
                        <h1 class="post-title">CI/CD: Automatización de Despliegues Modernos</h1>
                        <div class="post-meta">
                            <span class="post-date">28 Marzo, 2025</span>
                            <span class="post-category">Categoría: DevOps</span>
                            <span class="post-author">Por: Esteban</span>
                        </div>
                    </header>
                    
                    <img src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="CI/CD Pipeline" class="post-featured-img">
                    
                    <div class="post-content">
                        <p>Los pipelines de CI/CD han revolucionado el desarrollo de software, permitiendo entregas más rápidas, confiables y con menor riesgo de errores en producción.</p>
                        
                        <h2>1. Diseño de Pipelines Efectivos</h2>
                        <p>Un pipeline de CI/CD bien diseñado automatiza todo el proceso desde el commit hasta la producción, incluyendo pruebas, validaciones y despliegues.</p>
                        
                        <h2>2. Estrategias de Testing Automatizado</h2>
                        <p>La automatización de pruebas es fundamental para garantizar la calidad del software en cada etapa del pipeline.</p>
                        
                        <h2>Conclusión</h2>
                        <p>La implementación efectiva de CI/CD no solo acelera el desarrollo, sino que también mejora la calidad y confiabilidad de las aplicaciones.</p>
                    </div>
                    
                    <div class="post-navigation">
                        <a href="#" onclick="navigateToBlogPost('post4')" class="post-nav-link prev">← Artículo anterior</a>
                        <a href="#" onclick="navigateToBlogPost('post6')" class="post-nav-link next">Artículo siguiente →</a>
                    </div>
                    
                    <div class="related-posts">
                        <h3 class="related-title">Artículos relacionados</h3>
                        <div class="blog-grid">
                            <div class="blog-card">
                                <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Terraform" class="blog-img">
                                <div class="blog-content">
                                    <p class="blog-date">28 Abril, 2025</p>
                                    <h3 class="blog-title">Terraform: Infraestructura como Código en la Práctica</h3>
                                    <a href="#" onclick="navigateToBlogPost('post2')" class="btn btn-primary blog-link">Leer más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>

        <!-- Blog Post 6 -->
        <div class="page" id="post6-page">
            <div class="blog-post">
                <article>
                    <header class="post-header">
                        <h1 class="post-title">MLOps: Operaciones de Machine Learning</h1>
                        <div class="post-meta">
                            <span class="post-date">15 Marzo, 2025</span>
                            <span class="post-category">Categoría: IA</span>
                            <span class="post-author">Por: Esteban</span>
                        </div>
                    </header>
                    
                    <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Machine Learning Operations" class="post-featured-img">
                    
                    <div class="post-content">
                        <p>MLOps representa la convergencia entre Machine Learning, DevOps e ingeniería de datos, estableciendo prácticas para el despliegue y mantenimiento de modelos de ML en producción.</p>
                        
                        <h2>1. Ciclo de Vida de Modelos ML</h2>
                        <p>La gestión del ciclo de vida de modelos de machine learning requiere herramientas y procesos específicos para entrenamiento, validación, despliegue y monitoreo.</p>
                        
                        <h2>2. Monitoreo y Mantenimiento de Modelos</h2>
                        <p>Los modelos de ML en producción requieren monitoreo continuo para detectar degradación de rendimiento y drift en los datos.</p>
                        
                        <h2>Conclusión</h2>
                        <p>MLOps es esencial para escalar iniciativas de machine learning y garantizar que los modelos generen valor de negocio de manera sostenible.</p>
                    </div>
                    
                    <div class="post-navigation">
                        <a href="#" onclick="navigateToBlogPost('post5')" class="post-nav-link prev">← Artículo anterior</a>
                        <a href="#" onclick="navigateToBlogPost('post1')" class="post-nav-link next">Artículo siguiente →</a>
                    </div>
                    
                    <div class="related-posts">
                        <h3 class="related-title">Artículos relacionados</h3>
                        <div class="blog-grid">
                            <div class="blog-card">
                                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="IA en la Nube" class="blog-img">
                                <div class="blog-content">
                                    <p class="blog-date">15 Abril, 2025</p>
                                    <h3 class="blog-title">IA en la Nube: Transformando Operaciones IT</h3>
                                    <a href="#" onclick="navigateToBlogPost('post3')" class="btn btn-primary blog-link">Leer más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
        
        <!-- Footer -->
        <footer>
            <div class="footer-content">
                <div class="footer-logo">Esteban De Genaro</div>
                <div class="footer-links">
                    <a href="#" onclick="navigateTo('home')">Inicio</a>
                    <a href="#" onclick="navigateTo('about')">Sobre Mí</a>
                    <a href="#" onclick="navigateTo('blog')">Blog</a>
                    <a href="mailto:esteban@degenaro.eu?subject=Mensaje%20desde%20sitio%20web&body=Hola%20Esteban,%20me%20contacto%20para%20generar%20una%20meet.%20Muchas%20gracias.">Contacto</a>
                </div>
                <div class="footer-bottom">
                    <p class="footer-rights">© 2025 Esteban De Genaro - Todos los derechos reservados</p>
                    <p class="footer-designed">Diseñado con ❤️ por Esteban</p>
                </div>
            </div>
        </footer>
    </div>
    <script src="index.js" defer></script>
</body>
</html>
