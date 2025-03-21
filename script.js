document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initHeroSlider();
    initDishSlider();
    initMenuTabs();
    initFAQToggle();
    initFormValidation();
    initParallaxEffect();
    initScrollAnimation();
    initHeaderScroll();
    initSmoothScroll();
    setMinDate();
    
    // Set active nav link based on current page
    setActiveNavLink();
  });
  
  // Header Scroll Effect
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
  }
  
  // Mobile Menu Toggle with improved accessibility
  function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileToggle || !mobileMenu) return;
    
    const handleToggle = function() {
        const isExpanded = mobileMenu.classList.contains('active');
        mobileMenu.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle hamburger to X
        const bars = mobileToggle.querySelectorAll('.bar');
        if (mobileMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    };
    
    // Click event
    mobileToggle.addEventListener('click', handleToggle);
    
    // Keyboard accessibility
    mobileToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !mobileToggle.contains(event.target)) {
            
            mobileMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger icon
            const bars = mobileToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
  }
  
  // Hero Slider
  function initHeroSlider() {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;
    
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slides.length === 0) return;
    let currentSlide = 0;
    let slideInterval = null;
  
    function showSlide(index) {
      // Handle index boundaries
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      // Hide all slides
      slides.forEach(slide => slide.classList.remove('active'));
      
      // Show current slide
      slides[index].classList.add('active');
      
      // Update dots if they exist
      if (dots.length) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
      }
      
      currentSlide = index;
    }
  
    function startSlideInterval() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000);
    }
  
    // Initialize slider
    showSlide(0);
    startSlideInterval();
    
    // Add event listeners to dots with improved accessibility
    if (dots.length) {
      dots.forEach((dot, index) => {
        // Make dots keyboard focusable
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Show slide ${index + 1}`);
        
        // Click event
        dot.addEventListener('click', () => {
          showSlide(index);
          startSlideInterval(); // Reset interval after manual navigation
        });
        
        // Keyboard accessibility
        dot.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showSlide(index);
            startSlideInterval();
          }
        });
      });
    }
  }

  // Featured Dishes Slider
  function initDishSlider() {
    const dishSlider = document.querySelector('.dish-slider');
    if (!dishSlider) return;
    
    const slides = dishSlider.querySelectorAll('.dish-slide');
    const dots = document.querySelectorAll('.dish-dot');
    const prevBtn = document.querySelector('.dish-arrow.prev');
    const nextBtn = document.querySelector('.dish-arrow.next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
      // Handle index boundaries
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      // Hide all slides
      slides.forEach(slide => slide.classList.remove('active'));
      
      // Show current slide
      slides[index].classList.add('active');
      
      // Update dots if they exist
      if (dots.length) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
      }
      
      currentSlide = index;
    }
    
    // Initialize slider
    showSlide(0);
    
    // Add event listeners to navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
      });
      
      // Keyboard accessibility
      prevBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showSlide(currentSlide - 1);
        }
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
      });
      
      // Keyboard accessibility
      nextBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showSlide(currentSlide + 1);
        }
      });
    }
    
    // Add event listeners to dots with improved accessibility
    if (dots.length) {
      dots.forEach((dot, index) => {
        // Make dots keyboard focusable
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Show dish ${index + 1}`);
        
        // Click event
        dot.addEventListener('click', () => {
          showSlide(index);
        });
        
        // Keyboard accessibility
        dot.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showSlide(index);
          }
        });
      });
    }
    
    // Auto slide
    let slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6000);
    
    // Pause auto slide on hover or focus
    dishSlider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    dishSlider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 6000);
    });
    
    // Also pause on focus for keyboard users
    dishSlider.addEventListener('focusin', () => {
      clearInterval(slideInterval);
    });
    
    dishSlider.addEventListener('focusout', (e) => {
      // Only restart if focus moved outside the slider
      if (!dishSlider.contains(e.relatedTarget)) {
        slideInterval = setInterval(() => {
          showSlide(currentSlide + 1);
        }, 6000);
      }
    });
  }

  // Menu Tabs
  function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (menuTabs.length === 0 || menuCategories.length === 0) return;
    
    menuTabs.forEach(tab => {
      // Add proper accessibility attributes
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', '0');
      
      const handleTabActivation = function() {
        // Remove active class from all tabs
        menuTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        
        // Add active class to clicked tab
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        
        // Hide all categories
        menuCategories.forEach(cat => cat.classList.remove('active'));
        
        // Show corresponding category
        const category = tab.getAttribute('data-category');
        const activeCategory = document.getElementById(category);
        if (activeCategory) {
          activeCategory.classList.add('active');
        }
      };
      
      // Mouse click
      tab.addEventListener('click', handleTabActivation);
      
      // Keyboard support
      tab.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTabActivation();
        }
      });
    });
  }

  // FAQ Toggle
  function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (question && answer) {
        // Add accessibility attributes
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        
        const handleToggle = function() {
          // Toggle active class
          const isExpanded = item.classList.contains('active');
          
          // Close all other FAQ items
          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
              const otherQuestion = otherItem.querySelector('.faq-question');
              const otherAnswer = otherItem.querySelector('.faq-answer');
              if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
              if (otherAnswer) otherAnswer.setAttribute('aria-hidden', 'true');
              
              // Change icon for other items
              const otherIcon = otherItem.querySelector('.faq-toggle i');
              if (otherIcon) {
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
              }
            }
          });
          
          // Toggle current item
          item.classList.toggle('active');
          question.setAttribute('aria-expanded', !isExpanded);
          answer.setAttribute('aria-hidden', isExpanded);
          
          // Change icon for current item
          const icon = question.querySelector('.faq-toggle i');
          if (icon) {
            if (item.classList.contains('active')) {
              icon.classList.remove('fa-plus');
              icon.classList.add('fa-minus');
            } else {
              icon.classList.remove('fa-minus');
              icon.classList.add('fa-plus');
            }
          }
        };
        
        // Mouse click
        question.addEventListener('click', handleToggle);
        
        // Keyboard support
        question.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        });
      }
    });
  }

  // Form Validation
  function initFormValidation() {
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(contactForm)) {
          // Form is valid, show success message
          alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại với bạn sớm nhất.');
          contactForm.reset();
        }
      });
    }
    
    // Booking Form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(bookingForm)) {
          // Form is valid, show success message
          alert('Cảm ơn bạn đã đặt bàn! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.');
          bookingForm.reset();
        }
      });
    }
  }

  // Form Validation Helper
  function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Reset all error messages
    const errorElements = form.querySelectorAll('.form-error');
    errorElements.forEach(el => {
      el.style.display = 'none';
      el.textContent = '';
    });
    
    // Check required fields
    requiredFields.forEach(field => {
      const errorElement = document.getElementById(`${field.id}-error`);
      
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        if (errorElement) {
          errorElement.textContent = 'Vui lòng điền thông tin này';
          errorElement.style.display = 'block';
          errorElement.setAttribute('role', 'alert');
        }
      } else {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        
        // Additional validation for email
        if (field.type === 'email' && !isValidEmail(field.value)) {
          isValid = false;
          field.classList.add('error');
          field.setAttribute('aria-invalid', 'true');
          
          if (errorElement) {
            errorElement.textContent = 'Vui lòng nhập địa chỉ email hợp lệ';
            errorElement.style.display = 'block';
            errorElement.setAttribute('role', 'alert');
          }
        }
        
        // Additional validation for phone
        if (field.type === 'tel' && !isValidPhone(field.value)) {
          isValid = false;
          field.classList.add('error');
          field.setAttribute('aria-invalid', 'true');
          
          if (errorElement) {
            errorElement.textContent = 'Vui lòng nhập số điện thoại hợp lệ';
            errorElement.style.display = 'block';
            errorElement.setAttribute('role', 'alert');
          }
        }
      }
    });
    
    return isValid;
  }

  // Email validation
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Phone validation
  function isValidPhone(phone) {
    const re = /^[0-9\+\-\s]{8,15}$/;
    return re.test(String(phone));
  }

  // Parallax Effect
  function initParallaxEffect() {
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (!parallaxBg) return;
    
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const parallaxOffset = scrollPosition * 0.4;
      
      // Use transform for better performance
      parallaxBg.style.transform = `translateY(${parallaxOffset}px)`;
    });
  }

  // Scroll Animation with Enhanced Element Selection
  function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .contact-form-container, .info-item, .faq-item');
    
    if (animatedElements.length === 0) return;
    
    const elementInView = (el, scrollOffset = 0) => {
      const elementTop = el.getBoundingClientRect().top;
      return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.8);
    };
    
    const displayScrollElement = (element) => {
      element.classList.add('animate__animated');
      element.classList.add('animate__fadeInUp');
      element.classList.add('animate-fade-in');
    };
    
    const hideScrollElement = (element) => {
      element.classList.remove('animate__animated');
      element.classList.remove('animate__fadeInUp');
      element.classList.remove('animate-fade-in');
    };
    
    const handleScrollAnimation = () => {
      animatedElements.forEach((el) => {
        if (elementInView(el, 100)) {
          displayScrollElement(el);
        } else {
          hideScrollElement(el);
        }
      });
    };
    
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Check on initial load
  }

  // Set min date for booking form to today
  function setMinDate() {
    const dateInput = document.getElementById('booking-date');
    if (!dateInput) return;
    
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    dateInput.min = formattedDate;
    
    // Also set max date to 6 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    const maxDD = String(maxDate.getDate()).padStart(2, '0');
    const maxMM = String(maxDate.getMonth() + 1).padStart(2, '0');
    const maxYYYY = maxDate.getFullYear();
    
    const formattedMaxDate = `${maxYYYY}-${maxMM}-${maxDD}`;
    dateInput.max = formattedMaxDate;
  }

  // Set Active Navigation Link
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (href === currentPage || 
          (currentPage === 'index.html' && href === './') || 
          (currentPage === '' && href === './') || 
          (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Smooth Scroll for Anchor Links
  function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    if (anchors.length === 0) return;
    
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update focus for accessibility
          history.pushState(null, '', targetId);
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
          
          // Close mobile menu if open
          const mobileMenu = document.querySelector('.mobile-menu');
          const mobileToggle = document.querySelector('.mobile-toggle');
          
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger icon
            const bars = mobileToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
          }
        }
      });
    });
  }