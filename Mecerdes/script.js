// Mercedes-Benz Vietnam Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggles = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const mainHeader = document.querySelector('.main-header');
    const heroSection = document.querySelector('.hero-section');
    const forms = document.querySelectorAll('form');
    const heroSlideshow = document.querySelector('.hero-slideshow');
    const searchButton = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('#search-modal');
    
    // Utility Functions
    const debounce = (func, delay = 100) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };
    
    // Initialize header height adjustment
    const adjustHeroMargin = () => {
        if (mainHeader && heroSection) {
            const headerHeight = mainHeader.offsetHeight;
            heroSection.style.marginTop = `${headerHeight}px`;
        }
    };
    
    // Mobile Menu Toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('no-scroll', !isExpanded);
        });
    }
    
    // Dropdown Menu Handling
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only for mobile view
            if (window.innerWidth < 1024) {
                e.preventDefault();
                const parent = this.parentNode;
                const dropdown = parent.querySelector('.dropdown-menu, .mega-menu');
                
                // Close other dropdowns
                document.querySelectorAll('.nav-item.open').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('open');
                        item.querySelector('.dropdown-menu, .mega-menu').style.maxHeight = '0';
                    }
                });
                
                // Toggle current dropdown
                parent.classList.toggle('open');
                if (parent.classList.contains('open')) {
                    dropdown.style.maxHeight = `${dropdown.scrollHeight}px`;
                } else {
                    dropdown.style.maxHeight = '0';
                }
            }
        });
    });
    
    // Car Filtering Function
    if (filterButtons.length && carCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide cards with animation
                carCards.forEach(card => {
                    card.classList.remove('fade-in');
                    
                    setTimeout(() => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.classList.add('fade-in');
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }
    
    // Testimonial Slider
    let currentTestimonial = 0;
    let testimonialInterval;
    
    const showTestimonial = (index) => {
        if (!testimonialItems.length) return;
        
        testimonialItems.forEach((item, i) => {
            item.classList.remove('active');
            if (testimonialDots && testimonialDots[i]) {
                testimonialDots[i].classList.remove('active');
            }
        });
        
        testimonialItems[index].classList.add('active');
        if (testimonialDots && testimonialDots[index]) {
            testimonialDots[index].classList.add('active');
        }
    };
    
    const nextTestimonial = () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    };
    
    const prevTestimonial = () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    };
    
    // Start automatic testimonial rotation
    const startTestimonialInterval = () => {
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 5000);
    };
    
    // Initialize testimonial slider
    if (testimonialItems.length) {
        showTestimonial(currentTestimonial);
        startTestimonialInterval();
        
        // Event listeners for testimonial controls
        if (testimonialNext) {
            testimonialNext.addEventListener('click', () => {
                nextTestimonial();
                startTestimonialInterval();
            });
        }
        
        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', () => {
                prevTestimonial();
                startTestimonialInterval();
            });
        }
        
        // Testimonial dot navigation
        if (testimonialDots.length) {
            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentTestimonial = index;
                    showTestimonial(currentTestimonial);
                    startTestimonialInterval();
                });
            });
        }
        
        // Pause rotation on hover
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            
            testimonialSlider.addEventListener('mouseleave', () => {
                startTestimonialInterval();
            });
        }
    }
    
    // Hero Slideshow
    if (heroSlideshow) {
        const slides = heroSlideshow.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.hero-dots .dot');
        let currentSlide = 0;
        let slideInterval;
        
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (dots[i]) dots[i].classList.remove('active');
            });
            
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
        };
        
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };
        
        const startSlideInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        };
        
        // Initialize slideshow
        if (slides.length > 0) {
            showSlide(0);
            startSlideInterval();
            
            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    showSlide(currentSlide);
                    startSlideInterval();
                });
            });
            
            // Pause on hover
            heroSlideshow.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            heroSlideshow.addEventListener('mouseleave', () => {
                startSlideInterval();
            });
        }
    }
    
    // Modal Handling
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            body.classList.add('modal-open');
            
            // Set focus to first focusable element
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length) {
                focusableElements[0].focus();
            }
        }
    };
    
    const closeModal = (modal) => {
        modal.classList.remove('active');
        body.classList.remove('modal-open');
    };
    
    // Modal trigger buttons
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    // Close modal buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
    
    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Search functionality
    if (searchButton && searchOverlay) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            searchOverlay.classList.add('active');
            body.classList.add('modal-open');
            
            // Focus search input
            const searchInput = searchOverlay.querySelector('input[type="text"]');
            if (searchInput) {
                setTimeout(() => {
                    searchInput.focus();
                }, 100);
            }
        });
    }
    
    // Back to top button
    if (backToTop) {
        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }));
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Form Validation
    if (forms.length) {
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let isValid = true;
                const inputs = form.querySelectorAll('input, select, textarea');
                
                inputs.forEach(input => {
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                        
                        const errorMsg = input.nextElementSibling?.classList.contains('error-message') ?
                            input.nextElementSibling :
                            document.createElement('div');
                        
                        if (!input.nextElementSibling?.classList.contains('error-message')) {
                            errorMsg.classList.add('error-message');
                            errorMsg.textContent = 'Vui lòng nhập thông tin này';
                            input.parentNode.insertBefore(errorMsg, input.nextSibling);
                        }
                    } else {
                        input.classList.remove('error');
                        if (input.nextElementSibling?.classList.contains('error-message')) {
                            input.nextElementSibling.remove();
                        }
                    }
                });
                
                if (isValid) {
                    // Add success message
                    const successMsg = document.createElement('div');
                    successMsg.classList.add('success-message');
                    successMsg.textContent = 'Thông tin đã được gửi thành công!';
                    form.appendChild(successMsg);
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        successMsg.remove();
                        
                        // Close modal if form is in modal
                        const modal = form.closest('.modal');
                        if (modal) {
                            closeModal(modal);
                        }
                    }, 2000);
                }
            });
            
            // Remove error styling on input
            form.querySelectorAll('input, select, textarea').forEach(input => {
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                    if (input.nextElementSibling?.classList.contains('error-message')) {
                        input.nextElementSibling.remove();
                    }
                });
            });
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 50) {
            mainHeader?.classList.add('scrolled');
        } else {
            mainHeader?.classList.remove('scrolled');
        }
    }));
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = mainHeader ? mainHeader.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // If menu is open, close it
                if (navMenu && navMenu.classList.contains('active')) {
                    menuToggle.click();
                }
            }
        });
    });
    
    // Initialize animations for elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            elements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            elements.forEach(element => {
                element.classList.add('visible');
            });
        }
    };
    
    // Lazy loading for images
    const lazyLoadImages = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    };
    
    // Initialize functions
    adjustHeroMargin();
    animateOnScroll();
    lazyLoadImages();
    
    // Adjust on resize
    window.addEventListener('resize', debounce(() => {
        adjustHeroMargin();
    }, 200));
});
