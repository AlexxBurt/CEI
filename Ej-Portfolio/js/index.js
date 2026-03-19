/**
 * Portfolio - Intersection Observer Example
 * W3C Standards & SUITCSS Methodology
 */

// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
    observerOptions: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    },
    selectors: {
        cards: '.Card',
        services: '.Service',
        skills: '.Skill',
        testimonials: '.Testimonial',
        cta: '.CTA',
        sidebar: '.Sidebar',
        links: '.Sidebar-link'
    },
    classNames: {
        card: 'Card--visible',
        service: 'Service--visible',
        skill: 'Skill--visible',
        testimonial: 'Testimonial--visible',
        cta: 'CTA--visible'
    }
};

// ========================================
// INTERSECTION OBSERVER FACTORY
// ========================================

/**
 * Factory para crear observadores con clases personalizadas
 */
const createObserver = (selector, visibleClass) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(visibleClass);
                const label = entry.target.dataset.label || selector;
                console.log(`[Portfolio] Element visible: ${label}`);
            }
        });
    }, CONFIG.observerOptions);

    const elements = document.querySelectorAll(selector);
    elements.forEach(el => observer.observe(el));

    return observer;
};

// ========================================
// INITIALIZATION HANDLERS
// ========================================

/**
 * Inicializar todos los Intersection Observers
 */
const initIntersectionObservers = () => {
    console.log('[Portfolio] Initializing Intersection Observers');
    
    createObserver(CONFIG.selectors.cards, CONFIG.classNames.card);
    createObserver(CONFIG.selectors.services, CONFIG.classNames.service);
    createObserver(CONFIG.selectors.skills, CONFIG.classNames.skill);
    createObserver(CONFIG.selectors.testimonials, CONFIG.classNames.testimonial);
    createObserver(CONFIG.selectors.cta, CONFIG.classNames.cta);
};

/**
 * Manejar click en tarjetas
 */
const handleCardClick = (event) => {
    const card = event.currentTarget;
    const label = card.dataset.label;
    console.log(`[Portfolio] Card clicked: ${label}`);
};

/**
 * Inicializar event listeners en elementos interactivos
 */
const initElementListeners = () => {
    // Cards
    document.querySelectorAll(CONFIG.selectors.cards).forEach(card => {
        card.addEventListener('click', handleCardClick);
    });

    // Services
    document.querySelectorAll(CONFIG.selectors.services).forEach(service => {
        service.addEventListener('click', (event) => {
            const label = service.dataset.label;
            console.log(`[Portfolio] Service clicked: ${label}`);
        });
    });

    // CTA Button
    const ctaButton = document.querySelector('.CTA-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            console.log('[Portfolio] CTA button clicked');
            alert('¡Gracias por tu interés! Contacto próximamente.');
        });
    }
};

/**
 * Inicializar navegación del sidebar
 */
const initSidebarNavigation = () => {
    document.querySelectorAll(CONFIG.selectors.links).forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    console.log(`[Portfolio] Navigating to: ${targetId}`);
                }
            }
        });
    });
};

// ========================================
// MAIN INITIALIZATION
// ========================================

/**
 * Inicializar toda la aplicación
 */
const init = () => {
    console.log('[Portfolio] Initializing application');
    
    initIntersectionObservers();
    initElementListeners();
    initSidebarNavigation();
    
    console.log('[Portfolio] Application initialized');
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
