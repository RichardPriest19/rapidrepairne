// filename: script.js
// Enhanced JavaScript for Vehicle Paint Repairs Website

// ==================== PROMO MODAL ====================
function showPromoModal() {
    const modal = document.getElementById('promoModal');
    if (modal) {
        // Get current page path
        const currentPage = window.location.pathname;
        
        // Check if user has already seen the modal on THIS specific page
        const lastPageSeen = sessionStorage.getItem('promoModalLastPage');
       
        // Show modal if it's a different page or first visit
        if (lastPageSeen !== currentPage) {
            // Show modal after a delay
            setTimeout(() => {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }, 3000); // Show after 3 seconds
           
            // Mark this page as seen
            sessionStorage.setItem('promoModalLastPage', currentPage);
        }
    }
}
function closePromoModal() {
    const modal = document.getElementById('promoModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}
// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('promoModal');
    if (modal && e.target === modal) {
        closePromoModal();
    }
});

// ==================== MOBILE MENU ====================
// Enhanced mobile menu with better event handling for touch devices
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        // Remove any existing listeners to prevent duplicates
        const newButton = mobileMenuButton.cloneNode(true);
        mobileMenuButton.parentNode.replaceChild(newButton, mobileMenuButton);
        
        // Add click event
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            console.log('Menu toggled. Hidden:', mobileMenu.classList.contains('hidden'));
        });
        
        // Add touch event for better mobile support
        newButton.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            console.log('Menu toggled (touch). Hidden:', mobileMenu.classList.contains('hidden'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!newButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('shadow-xl');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.classList.add('shadow-xl');
        }
        
        lastScroll = currentScroll;
    });
}

// ==================== GALLERY TABS ====================
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.add('hidden'));
    
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
        
        // Add fade-in animation
        selectedTab.style.opacity = '0';
        setTimeout(() => {
            selectedTab.style.transition = 'opacity 0.5s ease-in';
            selectedTab.style.opacity = '1';
        }, 10);
    }

    // Update button styles
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('bg-yellow-400', 'text-gray-900');
        button.classList.add('bg-white', 'text-gray-800');
    });
    
    // Find and style the active button
    const activeButton = Array.from(buttons).find(btn => {
        const onclickStr = btn.getAttribute('onclick');
        return onclickStr && onclickStr.includes(tabId);
    });
    
    if (activeButton) {
        activeButton.classList.add('bg-yellow-400', 'text-gray-900');
        activeButton.classList.remove('bg-white', 'text-gray-800');
    }
}

// ==================== IMAGE MODAL ====================
function showImage(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalLabel = document.getElementById('imageModalLabel');
    
    if (modal && modalImage && modalLabel) {
        modalImage.src = src;
        modalLabel.textContent = alt || 'Gallery Image';
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside the image
document.addEventListener('click', (e) => {
    const modal = document.getElementById('imageModal');
    if (modal && e.target === modal) {
        closeImageModal();
    }
});

// ==================== HERO CAROUSEL ====================
let currentHeroSlide = 0;
let heroSliderInterval;
const heroSlides = document.querySelectorAll('#heroSlider .slider-slide');

function showHeroSlide(index) {
    const slider = document.getElementById('heroSlider');
    if (!slider || heroSlides.length === 0) return;
    
    currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
    slider.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
    updateHeroSliderIndicators();
}

function nextHeroSlide() {
    showHeroSlide(currentHeroSlide + 1);
}

function prevHeroSlide() {
    showHeroSlide(currentHeroSlide - 1);
}

function goToHeroSlide(index) {
    showHeroSlide(index);
    stopHeroSlider();
    startHeroSlider();
}

function updateHeroSliderIndicators() {
    const indicators = document.querySelectorAll('.hero-slider-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentHeroSlide) {
            indicator.classList.remove('bg-white/50');
            indicator.classList.add('bg-white');
        } else {
            indicator.classList.remove('bg-white');
            indicator.classList.add('bg-white/50');
        }
    });
}

function startHeroSlider() {
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider && heroSlides.length > 0) {
        heroSliderInterval = setInterval(nextHeroSlide, 4000); // Auto-advance every 4 seconds
    }
}

function stopHeroSlider() {
    clearInterval(heroSliderInterval);
}







// ==================== BEFORE & AFTER SLIDER ====================
let currentSlide = 0;
let sliderInterval;
const beforeAfterSlides = document.querySelectorAll('#slider .slider-slide');
const beforeAfterContainer = document.getElementById('slider');

function showSlide(index) {
    if (!beforeAfterContainer || beforeAfterSlides.length === 0) return;
    
    currentSlide = (index + beforeAfterSlides.length) % beforeAfterSlides.length;
    beforeAfterContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateSliderIndicators();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(index) {
    showSlide(index);
    stopSlider();       // optional: pause auto-play on manual click
    startSlider();      // restart auto-play
}

function updateSliderIndicators() {
    const indicators = document.querySelectorAll('#slider .slider-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.remove('bg-white/50');
            indicator.classList.add('bg-white');
        } else {
            indicator.classList.remove('bg-white');
            indicator.classList.add('bg-white/50');
        }
    });
}

function startSlider() {
    if (beforeAfterSlides.length > 0) {
        sliderInterval = setInterval(nextSlide, 5000); // slower than hero
    }
}

function stopSlider() {
    clearInterval(sliderInterval);
}




































// ==================== SCROLL ANIMATIONS ====================
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .pricing-card, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ==================== LAZY LOAD IMAGES ====================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero carousel
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider && heroSlides.length > 0) {
        startHeroSlider();
        updateHeroSliderIndicators();
        
        // Pause hero slider on hover
        const heroSliderContainer = heroSlider.parentElement.parentElement;
        if (heroSliderContainer) {
            heroSliderContainer.addEventListener('mouseenter', stopHeroSlider);
            heroSliderContainer.addEventListener('mouseleave', startHeroSlider);
        }
    }
    
    // Initialize gallery tabs
    const carsTab = document.getElementById('cars');
    if (carsTab) {
        showTab('cars');
    }
    
    // Initialize slider
    const slider = document.getElementById('slider');
    if (slider && beforeAfterSlides.length > 0) {
        startSlider();
        updateSliderIndicators();
        
        // Pause slider on hover
        const sliderContainer = slider.parentElement;
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
        }
    }
    
    // Initialize animations
    animateOnScroll();
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Initialize promo modal
    showPromoModal();
    
    // Add loading class removal
    document.body.classList.add('loaded');
});

// ==================== UTILITY FUNCTIONS ====================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==================== PERFORMANCE MONITORING ====================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    console.log(`Native lazy loading supported. ${images.length} images will lazy load.`);
} else {
    // Fallback to custom lazy loading
    console.log('Using custom lazy loading implementation.');
}
