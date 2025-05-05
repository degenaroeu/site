        // Sistema de navegación entre páginas
        function navigateTo(page) {
            // Ocultar todas las páginas
            document.querySelectorAll('.page').forEach(p => {
                p.classList.remove('active');
            });
            
            // Mostrar la página seleccionada
            if (page === 'blog') {
                document.getElementById('blog-page').classList.add('active');
            } else if (page === 'home') {
                document.getElementById('home-page').classList.add('active');
            } else {
                document.getElementById('home-page').classList.add('active');
                // Scroll a la sección correspondiente
                const section = document.getElementById(page);
                if (section) {
                    window.scrollTo({
                        top: section.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Actualizar navegación activa
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === page) {
                    link.classList.add('active');
                }
            });
            
            // Cerrar menú móvil si está abierto
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.menu-btn').textContent = '☰';
            
            // Scroll al inicio si cambiamos de página
            if (page === 'blog' || page === 'home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
        
        // Navegación a posts de blog individuales
        function navigateToBlogPost(postId) {
            // Ocultar todas las páginas
            document.querySelectorAll('.page').forEach(p => {
                p.classList.remove('active');
            });
            
            // Mostrar el post seleccionado
            document.getElementById(`${postId}-page`).classList.add('active');
            
            // Scroll al inicio
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Actualizar navegación activa
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === 'blog') {
                    link.classList.add('active');
                }
            });
        }
        
        // Navegación y efectos de scroll
        const navbar = document.querySelector('.navbar');
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const backToTop = document.getElementById('backToTop');
        
        // Menú móvil
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.textContent = '☰';
            });
        });
        
        // Cambiar estilo de navbar y mostrar botón de volver arriba al hacer scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                backToTop.classList.add('visible');
            } else {
                navbar.classList.remove('scrolled');
                backToTop.classList.remove('visible');
            }
        });
        
        // Botón volver arriba
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Animación de elementos al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('section:not(.hero) h2, .about-img, .about-content, .blog-card').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
        
        // Filtros de blog
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Actualizar botón activo
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filtrar tarjetas de blog
                document.querySelectorAll('.blog-card').forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Formulario de contacto
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const currentLang = localStorage.getItem('preferredLanguage') || 'es';
            alert(translations[currentLang]['contact-form-success']);
            this.reset();
        });
        
        // Partículas de fondo
        const canvas = document.getElementById('particles');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 100;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = `rgba(192, 132, 252, ${Math.random() * 0.5 + 0.2})`;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x < 0 || this.x > canvas.width) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y < 0 || this.y > canvas.height) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function init() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Conectar partículas cercanas
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(192, 132, 252, ${0.1 * (1 - distance/100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        // Inicializar partículas
        init();
        animate();
        
        // Ajustar canvas al cambiar tamaño de ventana
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

        // Sistema de traducción
        const translations = {
            es: {
                // Navegación
                'nav-home': 'Inicio',
                'nav-about': 'Sobre Mí',
                'nav-blog': 'Blog',
                'nav-contact': 'Contacto',
                
                // Hero
                'hero-title': 'Hola, soy <span>Esteban :)</span>',
                'hero-subtitle': 'Cloud Engineer & Web Developer',
                'hero-description': 'Transformando ideas en experiencias digitales excepcionales.',
                'hero-btn-blog': 'Ver Blog',
                'hero-btn-contact': 'Contactar',
                
                // Sobre Mí
                'about-title': 'Sobre Mí',
                'about-subtitle': 'Conóceme un poco más',
                'about-p1': 'Soy un profesional apasionado con experiencia en [tu campo]. Me especializo en [tus habilidades principales] y me encanta enfrentar nuevos desafíos que me permitan crecer profesionalmente.',
                'about-p2': 'A lo largo de mi carrera, he desarrollado habilidades en [menciona algunas habilidades clave], lo que me ha permitido [logros importantes]. Mi enfoque siempre ha sido [tu filosofía de trabajo].',
                'about-p3': 'Fuera del ámbito profesional, disfruto [tus hobbies o intereses], lo que me ayuda a mantener un equilibrio entre mi vida personal y profesional.',
                
                // Blog
                'blog-title': 'Últimas Publicaciones',
                'blog-btn-all': 'Ver todas las publicaciones',
                'blog-read-more': 'Leer más',
                'blog-archive-title': 'Mi Blog',
                'blog-archive-description': 'Comparto mis pensamientos, experiencias y conocimientos sobre desarrollo web, diseño y tecnología.',
                'blog-filter-all': 'Todos',
                'blog-filter-design': 'Diseño',
                'blog-filter-development': 'Desarrollo',
                'blog-filter-technology': 'Tecnología',
                'blog-prev': '← Artículo anterior',
                'blog-next': 'Artículo siguiente →',
                'blog-related': 'Artículos relacionados',
                
                // Contacto
                'contact-title': 'Contacto',
                'contact-email': 'Email',
                'contact-phone': 'Teléfono',
                'contact-location': 'Ubicación',
                'contact-form-name': 'Tu Nombre',
                'contact-form-email': 'Tu Email',
                'contact-form-message': 'Tu Mensaje',
                'contact-form-submit': 'Enviar Mensaje',
                'contact-form-success': '¡Gracias por tu mensaje! Te responderé lo antes posible.',
                
                // Footer
                'footer-rights': '© 2025 Tu Nombre - Todos los derechos reservados',
                'footer-designed': 'Diseñado con ❤️ por Tu Nombre',
                
// Blog Posts - Español
'post1-title': 'Tendencias de Diseño Web para 2025',
'post1-date': '4 Mayo, 2025',
'post1-category': 'Categoría: Diseño',
'post1-author': 'Por: Tu Nombre',
'post1-excerpt': 'Descubre las últimas tendencias en diseño web que están revolucionando la industria este año. Desde diseños minimalistas hasta experiencias inmersivas...',
'post1-content-intro': 'El diseño web está en constante evolución, adaptándose a las nuevas tecnologías, preferencias de los usuarios y tendencias estéticas. En 2025, estamos viendo una convergencia fascinante de minimalismo, funcionalidad y experiencias inmersivas que están redefiniendo cómo interactuamos con los sitios web.',
'post1-heading1': '1. Minimalismo 2.0',
'post1-content1': 'El minimalismo sigue siendo una tendencia dominante, pero ha evolucionado. Ya no se trata solo de espacios en blanco y diseños simples. El Minimalismo 2.0 combina la simplicidad con elementos interactivos sutiles, microinteracciones y toques de color estratégicos que guían la atención del usuario sin abrumar la interfaz.',
'post1-heading2': '2. Diseño Inmersivo',
'post1-content2': 'Con el avance de las tecnologías web, los diseños inmersivos están ganando popularidad. Estos incorporan elementos 3D, parallax avanzado, y experiencias interactivas que responden al movimiento del usuario. El objetivo es crear una conexión más profunda entre el usuario y el contenido.',
'post1-heading3': '3. Modo Oscuro como Estándar',
'post1-content3': 'El modo oscuro ha pasado de ser una característica opcional a un estándar de diseño. Además de reducir la fatiga visual y ahorrar batería en dispositivos móviles, los temas oscuros ofrecen oportunidades creativas para destacar elementos clave con contrastes dramáticos.',
'post1-heading4': '4. Tipografía Experimental',
'post1-content4': 'Las fuentes personalizadas y experimentales están tomando protagonismo. Los diseñadores están utilizando tipografías únicas como elemento central del diseño, con tamaños variables, animaciones y disposiciones no convencionales que desafían las normas tradicionales.',
'post1-heading5': '5. Neomorfismo Evolucionado',
'post1-content5': 'El neomorfismo, que combina elementos del skeuomorfismo y el diseño plano, ha evolucionado para ofrecer interfaces que parecen tangibles sin sacrificar la usabilidad. Esta tendencia crea elementos de interfaz que parecen emerger de la propia superficie de la pantalla.',
'post1-heading-conclusion': 'Conclusión',
'post1-conclusion': 'El diseño web en 2025 se centra en crear experiencias memorables que equilibran la estética con la funcionalidad. Los diseñadores están encontrando formas innovadoras de sorprender a los usuarios mientras mantienen la usabilidad y la accesibilidad como prioridades. Adoptar estas tendencias puede ayudarte a crear sitios web que no solo se vean contemporáneos, sino que también ofrezcan experiencias significativas a tus usuarios.',

'post2-title': 'Cómo Optimizar el Rendimiento de tu Sitio Web',
'post2-date': '28 Abril, 2025',
'post2-category': 'Categoría: Desarrollo',
'post2-author': 'Por: Tu Nombre',
'post2-excerpt': 'La velocidad de carga es crucial para la experiencia del usuario y el SEO. En este artículo, comparto técnicas efectivas para mejorar el rendimiento de tu sitio...',
'post2-content-intro': 'La velocidad de carga de un sitio web es uno de los factores más importantes para el éxito online. Un sitio lento no solo frustra a los usuarios, sino que también afecta negativamente al SEO y las conversiones. En este artículo, compartiré técnicas efectivas para optimizar el rendimiento de tu sitio web.',
'post2-heading1': '1. Optimización de Imágenes',
'post2-content1': 'Las imágenes suelen ser los elementos más pesados de un sitio web. Optimizarlas correctamente puede reducir drásticamente los tiempos de carga:',
'post2-heading2': '2. Minificación y Compresión',
'post2-content2': 'Reducir el tamaño de tus archivos CSS, JavaScript y HTML puede mejorar significativamente los tiempos de carga:',
'post2-heading3': '3. Aprovecha el Caché del Navegador',
'post2-content3': 'Configurar correctamente el caché del navegador permite que los visitantes recurrentes carguen tu sitio mucho más rápido:',
'post2-heading4': '4. Optimiza el Renderizado',
'post2-content4': 'Mejorar cómo se renderiza tu sitio puede tener un gran impacto en la percepción de velocidad:',
'post2-heading5': '5. Utiliza CDN',
'post2-content5': 'Una Red de Distribución de Contenido (CDN) puede reducir drásticamente la latencia sirviendo tu contenido desde servidores más cercanos a tus usuarios:',
'post2-heading-conclusion': 'Conclusión',
'post2-conclusion': 'Optimizar el rendimiento de tu sitio web no es una tarea única, sino un proceso continuo. Utiliza herramientas como Lighthouse, WebPageTest o PageSpeed Insights para medir tu progreso y descubrir áreas de mejora. Recuerda que cada milisegundo cuenta cuando se trata de retener usuarios y mejorar conversiones.',

'post3-title': 'El Futuro del Desarrollo Web con IA',
'post3-date': '15 Abril, 2025',
'post3-category': 'Categoría: Tecnología',
'post3-author': 'Por: Tu Nombre',
'post3-excerpt': 'La inteligencia artificial está transformando la forma en que creamos sitios web. Explora cómo las herramientas de IA están revolucionando el desarrollo web...',
'post3-content-intro': 'La inteligencia artificial está transformando rápidamente la forma en que diseñamos y desarrollamos sitios web. Lo que antes requería semanas de codificación manual ahora puede realizarse en horas o incluso minutos con la ayuda de herramientas impulsadas por IA. Exploremos cómo esta revolución está cambiando el panorama del desarrollo web.',
'post3-heading1': '1. Generación de Código Asistida por IA',
'post3-content1': 'Los asistentes de codificación impulsados por IA como GitHub Copilot, Tabnine y otros están transformando la forma en que los desarrolladores escriben código. Estas herramientas pueden:',
'post3-heading2': '2. Diseño Web Generativo',
'post3-content2': 'Las herramientas de diseño generativo están revolucionando el proceso creativo:',
'post3-heading3': '3. Personalización Impulsada por IA',
'post3-content3': 'La IA está llevando la personalización web a un nuevo nivel:',
'post3-heading4': '4. Desarrollo Sin Código (No-Code) y Bajo Código (Low-Code)',
'post3-content4': 'Las plataformas potenciadas por IA están democratizando el desarrollo web:',
'post3-heading5': '5. Accesibilidad Mejorada',
'post3-content5': 'La IA está ayudando a crear web más inclusivas:',
'post3-heading6': 'Desafíos y Consideraciones Éticas',
'post3-content6': 'A pesar de sus beneficios, la IA en el desarrollo web plantea importantes cuestiones:',
'post3-heading-conclusion': 'Conclusión',
'post3-conclusion': 'La IA no está reemplazando a los desarrolladores web, sino transformando su rol. Los profesionales que aprendan a colaborar eficazmente con estas herramientas podrán crear experiencias web más sofisticadas, accesibles y personalizadas en menos tiempo. El futuro del desarrollo web será una asociación creativa entre humanos e inteligencia artificial.',
            },
            it: {
                // Navigazione
                'nav-home': 'Home',
                'nav-about': 'Chi Sono',
                'nav-blog': 'Blog',
                'nav-contact': 'Contatti',
                
                // Hero
                'hero-title': 'Ciao, sono <span>Esteban :)</span>',
                'hero-subtitle': 'Sviluppatore & Designer',
                'hero-description': 'Trasformo idee in esperienze digitali eccezionali.',
                'hero-btn-blog': 'Vedi Blog',
                'hero-btn-contact': 'Contattami',
                
                // Chi Sono
                'about-title': 'Chi Sono',
                'about-subtitle': 'Conoscimi meglio',
                'about-p1': 'Sono un professionista appassionato con esperienza in [il tuo campo]. Mi specializzo in [le tue competenze principali] e adoro affrontare nuove sfide che mi permettano di crescere professionalmente.',
                'about-p2': 'Durante la mia carriera, ho sviluppato competenze in [menziona alcune competenze chiave], che mi hanno permesso di [risultati importanti]. Il mio approccio è sempre stato [la tua filosofia di lavoro].',
                'about-p3': 'Al di fuori dell\'ambito professionale, mi piace [i tuoi hobby o interessi], che mi aiutano a mantenere un equilibrio tra la mia vita personale e professionale.',
                
                // Blog
                'blog-title': 'Ultimi Articoli',
                'blog-btn-all': 'Vedi tutti gli articoli',
                'blog-read-more': 'Leggi di più',
                'blog-archive-title': 'Il Mio Blog',
                'blog-archive-description': 'Condivido i miei pensieri, esperienze e conoscenze su sviluppo web, design e tecnologia.',
                'blog-filter-all': 'Tutti',
                'blog-filter-design': 'Design',
                'blog-filter-development': 'Sviluppo',
                'blog-filter-technology': 'Tecnologia',
                'blog-prev': '← Articolo precedente',
                'blog-next': 'Articolo successivo →',
                'blog-related': 'Articoli correlati',
                
                // Contatti
                'contact-title': 'Contatti',
                'contact-email': 'Email',
                'contact-phone': 'Telefono',
                'contact-location': 'Posizione',
                'contact-form-name': 'Il Tuo Nome',
                'contact-form-email': 'La Tua Email',
                'contact-form-message': 'Il Tuo Messaggio',
                'contact-form-submit': 'Invia Messaggio',
                'contact-form-success': 'Grazie per il tuo messaggio! Ti risponderò il prima possibile.',
                
                // Footer
                'footer-rights': '© 2025 Il Tuo Nome - Tutti i diritti riservati',
                'footer-designed': 'Progettato con ❤️ da Il Tuo Nome',

// Blog Posts - Italiano
'post1-title': 'Tendenze di Web Design per il 2025',
'post1-date': '4 Maggio, 2025',
'post1-category': 'Categoria: Design',
'post1-author': 'Di: Il Tuo Nome',
'post1-excerpt': 'Scopri le ultime tendenze nel web design che stanno rivoluzionando il settore quest\'anno. Dai design minimalisti alle esperienze immersive...',
'post1-content-intro': 'Il web design è in costante evoluzione, adattandosi alle nuove tecnologie, alle preferenze degli utenti e alle tendenze estetiche. Nel 2025, stiamo assistendo a una convergenza affascinante di minimalismo, funzionalità ed esperienze immersive che stanno ridefinendo il modo in cui interagiamo con i siti web.',
'post1-heading1': '1. Minimalismo 2.0',
'post1-content1': 'Il minimalismo rimane una tendenza dominante, ma si è evoluto. Non si tratta più solo di spazi bianchi e design semplici. Il Minimalismo 2.0 combina la semplicità con elementi interattivi sottili, microinterazioni e tocchi di colore strategici che guidano l\'attenzione dell\'utente senza sovraccaricare l\'interfaccia.',
'post1-heading2': '2. Design Immersivo',
'post1-content2': 'Con l\'avanzamento delle tecnologie web, i design immersivi stanno guadagnando popolarità. Questi incorporano elementi 3D, parallasse avanzato ed esperienze interattive che rispondono al movimento dell\'utente. L\'obiettivo è creare una connessione più profonda tra l\'utente e il contenuto.',
'post1-heading3': '3. Modalità Scura come Standard',
'post1-content3': 'La modalità scura è passata dall\'essere una caratteristica opzionale a uno standard di design. Oltre a ridurre l\'affaticamento visivo e risparmiare batteria sui dispositivi mobili, i temi scuri offrono opportunità creative per evidenziare elementi chiave con contrasti drammatici.',
'post1-heading4': '4. Tipografia Sperimentale',
'post1-content4': 'I caratteri personalizzati e sperimentali stanno assumendo un ruolo di primo piano. I designer stanno utilizzando tipografie uniche come elemento centrale del design, con dimensioni variabili, animazioni e disposizioni non convenzionali che sfidano le norme tradizionali.',
'post1-heading5': '5. Neomorfismo Evoluto',
'post1-content5': 'Il neomorfismo, che combina elementi dello skeuomorfismo e del design piatto, si è evoluto per offrire interfacce che sembrano tangibili senza sacrificare l\'usabilità. Questa tendenza crea elementi di interfaccia che sembrano emergere dalla superficie stessa dello schermo.',
'post1-heading-conclusion': 'Conclusione',
'post1-conclusion': 'Il web design nel 2025 si concentra sulla creazione di esperienze memorabili che bilanciano estetica e funzionalità. I designer stanno trovando modi innovativi per sorprendere gli utenti mantenendo usabilità e accessibilità come priorità. Adottare queste tendenze può aiutarti a creare siti web che non solo appaiono contemporanei, ma offrono anche esperienze significative ai tuoi utenti.',

'post2-title': 'Come Ottimizzare le Prestazioni del tuo Sito Web',
'post2-date': '28 Aprile, 2025',
'post2-category': 'Categoria: Sviluppo',
'post2-author': 'Di: Il Tuo Nome',
'post2-excerpt': 'La velocità di caricamento è cruciale per l\'esperienza utente e la SEO. In questo articolo, condivido tecniche efficaci per migliorare le prestazioni del tuo sito...',
'post2-content-intro': 'La velocità di caricamento di un sito web è uno dei fattori più importanti per il successo online. Un sito lento non solo frustra gli utenti, ma influisce anche negativamente sulla SEO e sulle conversioni. In questo articolo, condividerò tecniche efficaci per ottimizzare le prestazioni del tuo sito web.',
'post2-heading1': '1. Ottimizzazione delle Immagini',
'post2-content1': 'Le immagini sono spesso gli elementi più pesanti di un sito web. Ottimizzarle correttamente può ridurre drasticamente i tempi di caricamento:',
'post2-heading2': '2. Minificazione e Compressione',
'post2-content2': 'Ridurre le dimensioni dei tuoi file CSS, JavaScript e HTML può migliorare significativamente i tempi di caricamento:',
'post2-heading3': '3. Sfrutta la Cache del Browser',
'post2-content3': 'Configurare correttamente la cache del browser consente ai visitatori ricorrenti di caricare il tuo sito molto più velocemente:',
'post2-heading4': '4. Ottimizza il Rendering',
'post2-content4': 'Migliorare il modo in cui viene renderizzato il tuo sito può avere un grande impatto sulla percezione della velocità:',
'post2-heading5': '5. Utilizza CDN',
'post2-content5': 'Una Rete di Distribuzione dei Contenuti (CDN) può ridurre drasticamente la latenza servendo i tuoi contenuti da server più vicini ai tuoi utenti:',
'post2-heading-conclusion': 'Conclusione',
'post2-conclusion': 'Ottimizzare le prestazioni del tuo sito web non è un\'attività una tantum, ma un processo continuo. Utilizza strumenti come Lighthouse, WebPageTest o PageSpeed Insights per misurare i tuoi progressi e scoprire aree di miglioramento. Ricorda che ogni millisecondo conta quando si tratta di trattenere gli utenti e migliorare le conversioni.',

'post3-title': 'Il Futuro dello Sviluppo Web con l\'IA',
'post3-date': '15 Aprile, 2025',
'post3-category': 'Categoria: Tecnologia',
'post3-author': 'Di: Il Tuo Nome',
'post3-excerpt': 'L\'intelligenza artificiale sta trasformando il modo in cui creiamo siti web. Esplora come gli strumenti di IA stanno rivoluzionando lo sviluppo web...',
'post3-content-intro': 'L\'intelligenza artificiale sta trasformando rapidamente il modo in cui progettiamo e sviluppiamo siti web. Ciò che prima richiedeva settimane di codifica manuale ora può essere realizzato in ore o addirittura minuti con l\'aiuto di strumenti basati sull\'IA. Esploriamo come questa rivoluzione sta cambiando il panorama dello sviluppo web.',
'post3-heading1': '1. Generazione di Codice Assistita dall\'IA',
'post3-content1': 'Gli assistenti di codifica basati sull\'IA come GitHub Copilot, Tabnine e altri stanno trasformando il modo in cui gli sviluppatori scrivono codice. Questi strumenti possono:',
'post3-heading2': '2. Web Design Generativo',
'post3-content2': 'Gli strumenti di design generativo stanno rivoluzionando il processo creativo:',
'post3-heading3': '3. Personalizzazione Guidata dall\'IA',
'post3-content3': 'L\'IA sta portando la personalizzazione web a un nuovo livello:',
'post3-heading4': '4. Sviluppo No-Code e Low-Code',
'post3-content4': 'Le piattaforme potenziate dall\'IA stanno democratizzando lo sviluppo web:',
'post3-heading5': '5. Accessibilità Migliorata',
'post3-content5': 'L\'IA sta aiutando a creare web più inclusivi:',
'post3-heading6': 'Sfide e Considerazioni Etiche',
'post3-content6': 'Nonostante i suoi benefici, l\'IA nello sviluppo web solleva importanti questioni:',
'post3-heading-conclusion': 'Conclusione',
'post3-conclusion': 'L\'IA non sta sostituendo gli sviluppatori web, ma sta trasformando il loro ruolo. I professionisti che imparano a collaborare efficacemente con questi strumenti potranno creare esperienze web più sofisticate, accessibili e personalizzate in meno tempo. Il futuro dello sviluppo web sarà una partnership creativa tra umani e intelligenza artificiale.',
            },
            en: {
                // Navigation
                'nav-home': 'Home',
                'nav-about': 'About Me',
                'nav-blog': 'Blog',
                'nav-contact': 'Contact',
                
                // Hero
                'hero-title': 'Hello, I\'m <span>Your Name</span>',
                'hero-subtitle': 'Developer & Designer',
                'hero-description': 'Transforming ideas into exceptional digital experiences.',
                'hero-btn-blog': 'View Blog',
                'hero-btn-contact': 'Contact Me',
                
                // About Me
                'about-title': 'About Me',
                'about-subtitle': 'Get to know me better',
                'about-p1': 'I\'m a passionate professional with experience in [your field]. I specialize in [your main skills] and I love facing new challenges that allow me to grow professionally.',
                'about-p2': 'Throughout my career, I\'ve developed skills in [mention some key skills], which has allowed me to [important achievements]. My approach has always been [your work philosophy].',
                'about-p3': 'Outside of the professional realm, I enjoy [your hobbies or interests], which helps me maintain a balance between my personal and professional life.',
                
                // Blog
                'blog-title': 'Latest Posts',
                'blog-btn-all': 'View all posts',
                'blog-read-more': 'Read more',
                'blog-archive-title': 'My Blog',
                'blog-archive-description': 'I share my thoughts, experiences, and knowledge about web development, design, and technology.',
                'blog-filter-all': 'All',
                'blog-filter-design': 'Design',
                'blog-filter-development': 'Development',
                'blog-filter-technology': 'Technology',
                'blog-prev': '← Previous article',
                'blog-next': 'Next article →',
                'blog-related': 'Related articles',
                
                // Contact
                'contact-title': 'Contact',
                'contact-email': 'Email',
                'contact-phone': 'Phone',
                'contact-location': 'Location',
                'contact-form-name': 'Your Name',
                'contact-form-email': 'Your Email',
                'contact-form-message': 'Your Message',
                'contact-form-submit': 'Send Message',
                'contact-form-success': 'Thank you for your message! I\'ll get back to you as soon as possible.',
                
                // Footer
                'footer-rights': '© 2025 Your Name - All rights reserved',
                'footer-designed': 'Designed with ❤️ by Your Name',

// Blog Posts - English
'post1-title': 'Web Design Trends for 2025',
'post1-date': 'May 4, 2025',
'post1-category': 'Category: Design',
'post1-author': 'By: Your Name',
'post1-excerpt': 'Discover the latest trends in web design that are revolutionizing the industry this year. From minimalist designs to immersive experiences...',
'post1-content-intro': 'Web design is constantly evolving, adapting to new technologies, user preferences, and aesthetic trends. In 2025, we\'re seeing a fascinating convergence of minimalism, functionality, and immersive experiences that are redefining how we interact with websites.',
'post1-heading1': '1. Minimalism 2.0',
'post1-content1': 'Minimalism remains a dominant trend, but it has evolved. It\'s no longer just about white space and simple designs. Minimalism 2.0 combines simplicity with subtle interactive elements, microinteractions, and strategic color touches that guide user attention without overwhelming the interface.',
'post1-heading2': '2. Immersive Design',
'post1-content2': 'With the advancement of web technologies, immersive designs are gaining popularity. These incorporate 3D elements, advanced parallax, and interactive experiences that respond to user movement. The goal is to create a deeper connection between the user and the content.',
'post1-heading3': '3. Dark Mode as Standard',
'post1-content3': 'Dark mode has gone from being an optional feature to a design standard. In addition to reducing eye strain and saving battery on mobile devices, dark themes offer creative opportunities to highlight key elements with dramatic contrasts.',
'post1-heading4': '4. Experimental Typography',
'post1-content4': 'Custom and experimental fonts are taking center stage. Designers are using unique typography as a central design element, with variable sizes, animations, and unconventional layouts that challenge traditional norms.',
'post1-heading5': '5. Evolved Neomorphism',
'post1-content5': 'Neomorphism, which combines elements of skeuomorphism and flat design, has evolved to offer interfaces that feel tangible without sacrificing usability. This trend creates interface elements that appear to emerge from the screen surface itself.',
'post1-heading-conclusion': 'Conclusion',
'post1-conclusion': 'Web design in 2025 focuses on creating memorable experiences that balance aesthetics with functionality. Designers are finding innovative ways to surprise users while maintaining usability and accessibility as priorities. Adopting these trends can help you create websites that not only look contemporary but also offer meaningful experiences to your users.',

'post2-title': 'How to Optimize Your Website Performance',
'post2-date': 'April 28, 2025',
'post2-category': 'Category: Development',
'post2-author': 'By: Your Name',
'post2-excerpt': 'Loading speed is crucial for user experience and SEO. In this article, I share effective techniques to improve your site\'s performance...',
'post2-content-intro': 'Website loading speed is one of the most important factors for online success. A slow site not only frustrates users but also negatively affects SEO and conversions. In this article, I\'ll share effective techniques to optimize your website\'s performance.',
'post2-heading1': '1. Image Optimization',
'post2-content1': 'Images are often the heaviest elements on a website. Optimizing them correctly can drastically reduce loading times:',
'post2-heading2': '2. Minification and Compression',
'post2-content2': 'Reducing the size of your CSS, JavaScript, and HTML files can significantly improve loading times:',
'post2-heading3': '3. Leverage Browser Caching',
'post2-content3': 'Properly configuring browser caching allows returning visitors to load your site much faster:',
'post2-heading4': '4. Optimize Rendering',
'post2-content4': 'Improving how your site renders can have a big impact on perceived speed:',
'post2-heading5': '5. Use CDN',
'post2-content5': 'A Content Delivery Network (CDN) can drastically reduce latency by serving your content from servers closer to your users:',
'post2-heading-conclusion': 'Conclusion',
'post2-conclusion': 'Optimizing your website\'s performance is not a one-time task but an ongoing process. Use tools like Lighthouse, WebPageTest, or PageSpeed Insights to measure your progress and discover areas for improvement. Remember that every millisecond counts when it comes to retaining users and improving conversions.',

'post3-title': 'The Future of Web Development with AI',
'post3-date': 'April 15, 2025',
'post3-category': 'Category: Technology',
'post3-author': 'By: Your Name',
'post3-excerpt': 'Artificial intelligence is transforming how we create websites. Explore how AI-powered tools are revolutionizing web development...',
'post3-content-intro': 'Artificial intelligence is rapidly transforming how we design and develop websites. What once required weeks of manual coding can now be accomplished in hours or even minutes with the help of AI-powered tools. Let\'s explore how this revolution is changing the landscape of web development.',
'post3-heading1': '1. AI-Assisted Code Generation',
'post3-content1': 'AI-powered coding assistants like GitHub Copilot, Tabnine, and others are transforming how developers write code. These tools can:',
'post3-heading2': '2. Generative Web Design',
'post3-content2': 'Generative design tools are revolutionizing the creative process:',
'post3-heading3': '3. AI-Driven Personalization',
'post3-content3': 'AI is taking web personalization to a new level:',
'post3-heading4': '4. No-Code and Low-Code Development',
'post3-content4': 'AI-powered platforms are democratizing web development:',
'post3-heading5': '5. Enhanced Accessibility',
'post3-content5': 'AI is helping create more inclusive websites:',
'post3-heading6': 'Challenges and Ethical Considerations',
'post3-content6': 'Despite its benefits, AI in web development raises important questions:',
'post3-heading-conclusion': 'Conclusion',
'post3-conclusion': 'AI is not replacing web developers but transforming their role. Professionals who learn to collaborate effectively with these tools will be able to create more sophisticated, accessible, and personalized web experiences in less time. The future of web development will be a creative partnership between humans and artificial intelligence.',
            }
        };

        // Función para cambiar el idioma
        function changeLanguage(lang) {
            // Guardar preferencia de idioma
            localStorage.setItem('preferredLanguage', lang);
            
            // Actualizar botones de idioma
            document.querySelectorAll('.language-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                }
            });
            
            // Actualizar textos de navegación
            document.querySelectorAll('.nav-link').forEach(link => {
                const key = link.getAttribute('data-page');
                link.textContent = translations[lang][`nav-${key}`];
            });
            
            // Actualizar textos del hero
            document.querySelector('.hero-title').innerHTML = translations[lang]['hero-title'];
            document.querySelector('.hero-subtitle').textContent = translations[lang]['hero-subtitle'];
            document.querySelector('.hero-content p:not(.hero-subtitle)').textContent = translations[lang]['hero-description'];
            document.querySelector('.hero-buttons .btn-primary').textContent = translations[lang]['hero-btn-blog'];
            document.querySelector('.hero-buttons .btn-secondary').textContent = translations[lang]['hero-btn-contact'];
            
            // Actualizar sección Sobre Mí
            document.querySelector('#about .section-title').textContent = translations[lang]['about-title'];
            document.querySelector('.about-content h3').textContent = translations[lang]['about-subtitle'];
            const aboutParagraphs = document.querySelectorAll('.about-content p');
            aboutParagraphs[0].textContent = translations[lang]['about-p1'];
            aboutParagraphs[1].textContent = translations[lang]['about-p2'];
            aboutParagraphs[2].textContent = translations[lang]['about-p3'];
            
            // Actualizar sección Blog
            document.querySelector('#blog-preview .section-title').textContent = translations[lang]['blog-title'];
            document.querySelectorAll('.blog-link').forEach(link => {
                link.textContent = translations[lang]['blog-read-more'];
            });
            document.querySelector('#blog-preview .btn-secondary').textContent = translations[lang]['blog-btn-all'];
            
            // Actualizar sección Contacto
            document.querySelector('#contact .section-title').textContent = translations[lang]['contact-title'];
            document.querySelectorAll('.contact-text h4')[0].textContent = translations[lang]['contact-email'];
            document.querySelectorAll('.contact-text h4')[1].textContent = translations[lang]['contact-phone'];
            document.querySelectorAll('.contact-text h4')[2].textContent = translations[lang]['contact-location'];
            
            // Actualizar formulario de contacto
            document.querySelector('#contactForm input[type="text"]').placeholder = translations[lang]['contact-form-name'];
            document.querySelector('#contactForm input[type="email"]').placeholder = translations[lang]['contact-form-email'];
            document.querySelector('#contactForm textarea').placeholder = translations[lang]['contact-form-message'];
            document.querySelector('#contactForm button').textContent = translations[lang]['contact-form-submit'];
            
            // Actualizar footer
            document.querySelectorAll('.footer-bottom p')[0].textContent = translations[lang]['footer-rights'];
            document.querySelectorAll('.footer-bottom p')[1].textContent = translations[lang]['footer-designed'];
            
            // Actualizar página de blog
            if (document.querySelector('.archive-title')) {
                document.querySelector('.archive-title').textContent = translations[lang]['blog-archive-title'];
                document.querySelector('.archive-description').textContent = translations[lang]['blog-archive-description'];
                
                // Actualizar filtros
                const filterButtons = document.querySelectorAll('.filter-btn');
                filterButtons[0].textContent = translations[lang]['blog-filter-all'];
                filterButtons[1].textContent = translations[lang]['blog-filter-design'];
                filterButtons[2].textContent = translations[lang]['blog-filter-development'];
                filterButtons[3].textContent = translations[lang]['blog-filter-technology'];
            }
            
            // Actualizar navegación de posts
            document.querySelectorAll('.post-nav-link.prev').forEach(link => {
                link.textContent = translations[lang]['blog-prev'];
            });
            document.querySelectorAll('.post-nav-link.next').forEach(link => {
                link.textContent = translations[lang]['blog-next'];
            });
            
            // Actualizar títulos de artículos relacionados
            document.querySelectorAll('.related-posts h3').forEach(title => {
                title.textContent = translations[lang]['blog-related'];
            });

            // Actualizar tarjetas de blog en la página principal
            document.querySelectorAll('.blog-card').forEach((card, index) => {
                const postNum = index + 1;
                if (postNum <= 3) { // Solo tenemos 3 posts principales
                    const title = card.querySelector('.blog-title');
                    const date = card.querySelector('.blog-date');
                    const excerpt = card.querySelector('.blog-excerpt');
                    const readMore = card.querySelector('.blog-link');
                    
                    if (title) title.textContent = translations[lang][`post${postNum}-title`];
                    if (date) date.textContent = translations[lang][`post${postNum}-date`];
                    if (excerpt) excerpt.textContent = translations[lang][`post${postNum}-excerpt`];
                    if (readMore) readMore.textContent = translations[lang]['blog-read-more'];
                }
            });
            
            // Actualizar páginas de blog individuales
            for (let i = 1; i <= 3; i++) {
                const postPage = document.getElementById(`post${i}-page`);
                if (postPage) {
                    const title = postPage.querySelector('.post-title');
                    const date = postPage.querySelector('.post-meta span:nth-child(1)');
                    const category = postPage.querySelector('.post-meta span:nth-child(2)');
                    const author = postPage.querySelector('.post-meta span:nth-child(3)');
                    
                    if (title) title.textContent = translations[lang][`post${i}-title`];
                    if (date) date.textContent = translations[lang][`post${i}-date`];
                    if (category) category.textContent = translations[lang][`post${i}-category`];
                    if (author) author.textContent = translations[lang][`post${i}-author`];
                    
                    // Actualizar contenido del artículo
                    const contentIntro = postPage.querySelector('.post-content p:first-child');
                    if (contentIntro) contentIntro.textContent = translations[lang][`post${i}-content-intro`];
                    
                    // Actualizar encabezados y párrafos
                    const headings = postPage.querySelectorAll('.post-content h2');
                    const paragraphs = postPage.querySelectorAll('.post-content p:not(:first-child)');
                    
                    headings.forEach((heading, index) => {
                        if (translations[lang][`post${i}-heading${index + 1}`]) {
                            heading.textContent = translations[lang][`post${i}-heading${index + 1}`];
                        } else if (index === headings.length - 1 && translations[lang][`post${i}-heading-conclusion`]) {
                            heading.textContent = translations[lang][`post${i}-heading-conclusion`];
                        }
                    });
                    
                    // Actualizar párrafos que siguen a los encabezados
                    let paragraphIndex = 0;
                    headings.forEach((heading, index) => {
                        // Encontrar el siguiente párrafo después de este encabezado
                        let nextParagraph = heading.nextElementSibling;
                        while (nextParagraph && nextParagraph.tagName !== 'P' && nextParagraph.tagName !== 'UL') {
                            nextParagraph = nextParagraph.nextElementSibling;
                        }
                        
                        if (nextParagraph && nextParagraph.tagName === 'P') {
                            if (index === headings.length - 1 && translations[lang][`post${i}-conclusion`]) {
                                nextParagraph.textContent = translations[lang][`post${i}-conclusion`];
                            } else if (translations[lang][`post${i}-content${index + 1}`]) {
                                nextParagraph.textContent = translations[lang][`post${i}-content${index + 1}`];
                            }
                        }
                    });
                }
            }
        }

        // Inicializar selector de idiomas
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                changeLanguage(lang);
            });
        });

        // Cargar idioma preferido del usuario o usar español por defecto
        document.addEventListener('DOMContentLoaded', () => {
            const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';
            changeLanguage(savedLanguage);
        });