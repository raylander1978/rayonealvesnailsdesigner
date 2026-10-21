// ===================== DOM READY =====================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initGalleryCarousel();
    initTestimonialsCarousel();
    initContactForm();
    initScrollAnimations();
    initCounterAnimations();
    initBackToTop();
    initActiveNavLink();
});

// ===================== NAVBAR =====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===================== MOBILE MENU =====================
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const links = document.querySelectorAll('.nav-link');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===================== GALLERY CAROUSEL =====================
function initGalleryCarousel() {
    const track = document.getElementById('carouselTrack');
    const slides = track.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');
    
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let totalPages = Math.ceil(slides.length / slidesPerView);
    let autoplayInterval;

    function getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalPages - 1));
        const slideWidth = 100 / slidesPerView;
        track.style.transform = `translateX(-${currentIndex * slidesPerView * slideWidth}%)`;
        updateDots();
    }

    function nextSlide() {
        goToSlide(currentIndex >= totalPages - 1 ? 0 : currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex <= 0 ? totalPages - 1 : currentIndex - 1);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    prevBtn.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });
    nextBtn.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        startAutoplay();
    }, { passive: true });

    // Responsive
    window.addEventListener('resize', () => {
        slidesPerView = getSlidesPerView();
        totalPages = Math.ceil(slides.length / slidesPerView);
        currentIndex = Math.min(currentIndex, totalPages - 1);
        createDots();
        goToSlide(currentIndex);
    });

    createDots();
    startAutoplay();
}

// ===================== TESTIMONIALS CAROUSEL =====================
function initTestimonialsCarousel() {
    const track = document.getElementById('depoTrack');
    const slides = track.querySelectorAll('.depoimento-slide');
    const prevBtn = document.getElementById('depoPrev');
    const nextBtn = document.getElementById('depoNext');
    const dotsContainer = document.getElementById('depoDots');
    
    let currentIndex = 0;
    let slidesPerView = getDepoSlidesPerView();
    let totalPages = Math.ceil(slides.length / slidesPerView);
    let autoplayInterval;

    function getDepoSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        return 2;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalPages - 1));
        const slideWidth = 100 / slidesPerView;
        track.style.transform = `translateX(-${currentIndex * slidesPerView * slideWidth}%)`;
        updateDots();
    }

    function nextSlide() {
        goToSlide(currentIndex >= totalPages - 1 ? 0 : currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex <= 0 ? totalPages - 1 : currentIndex - 1);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    prevBtn.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });
    nextBtn.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        startAutoplay();
    }, { passive: true });

    // Responsive
    window.addEventListener('resize', () => {
        slidesPerView = getDepoSlidesPerView();
        totalPages = Math.ceil(slides.length / slidesPerView);
        currentIndex = Math.min(currentIndex, totalPages - 1);
        createDots();
        goToSlide(currentIndex);
    });

    createDots();
    startAutoplay();
}

// ===================== CONTACT FORM (WHATSAPP) =====================
function initContactForm() {
    const form = document.getElementById('contatoForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const servico = document.getElementById('servico').value;
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !servico || !mensagem) {
            showFormFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        let whatsappMsg = `Olá Rayone! Meu nome é *${nome}*.`;
        
        if (telefone) {
            whatsappMsg += `\nMeu telefone: ${telefone}`;
        }
        
        whatsappMsg += `\n\n*Serviço desejado:* ${servico}`;
        whatsappMsg += `\n\n*Mensagem:*\n${mensagem}`;
        whatsappMsg += `\n\n_Mensagem enviada pelo site._`;

        const encodedMsg = encodeURIComponent(whatsappMsg);
        const whatsappURL = `https://wa.me/5531971643629?text=${encodedMsg}`;

        window.open(whatsappURL, '_blank');
        
        showFormFeedback('Redirecionando para o WhatsApp... ✨', 'success');
        
        setTimeout(() => {
            form.reset();
        }, 2000);
    });

    function showFormFeedback(message, type) {
        // Remove existing feedback
        const existing = form.querySelector('.form-feedback');
        if (existing) existing.remove();

        const feedback = document.createElement('div');
        feedback.className = `form-feedback form-feedback-${type}`;
        feedback.style.cssText = `
            padding: 12px 20px;
            border-radius: 10px;
            margin-bottom: 15px;
            font-size: 0.9rem;
            text-align: center;
            animation: fadeInUp 0.3s ease;
            ${type === 'success' 
                ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
                : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
        `;
        feedback.textContent = message;

        form.insertBefore(feedback, form.firstChild);

        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-10px)';
            feedback.style.transition = 'all 0.3s ease';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }
}

// ===================== SCROLL ANIMATIONS =====================
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.servico-card, .sobre-content, .contato-content, .section-header, .depoimento-card'
    );

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ===================== COUNTER ANIMATIONS =====================
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.ceil(current).toLocaleString('pt-BR');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString('pt-BR');
                        }
                    };

                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ===================== BACK TO TOP =====================
function initBackToTop() {
    const btn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===================== ACTIVE NAV LINK =====================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===================== PHONE MASK =====================
const phoneInput = document.getElementById('telefone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 2) {
            value = `(${value}`;
        } else if (value.length <= 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length <= 11) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
        
        e.target.value = value;
    });
}
