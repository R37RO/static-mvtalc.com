// Maa Vaishnavi TALC Industries - Complete Website JavaScript with Media Page - FIXED

class MVTalcWebsite {
    constructor() {
        this.currentPage = 'home';
        this.isLoaded = false;
        this.isNavigating = false;
        this.observers = new Map();
        this.animations = new Map();
        this.counters = new Map();
        this.lightboxOpen = false;
        this.currentGalleryFilter = 'all';
        
        this.init();
    }

    init() {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupWebsite());
        } else {
            this.setupWebsite();
        }
    }

    setupWebsite() {
        console.log('🚀 Initializing Maa Vaishnavi TALC Industries website...');
        
        // Core setup
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupMobileNavigation();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupContactForm();
        this.setupInteractiveElements();
        this.setupImageHandling();
        this.setupCertificationPopups();
        this.setupMediaPageFeatures(); // NEW: Media page functionality
        this.setupPerformanceOptimizations();
        this.setupAccessibilityFeatures();
        
        // Complete loading when window loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.completeLoading();
            }, 1500);
        });

        console.log('✅ Website setup completed successfully!');
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        console.log('📱 Setting up enhanced loading screen...');

        // Create enhanced loading progress
        const loadingContent = loadingScreen.querySelector('.loading-content');
        const progressContainer = document.createElement('div');
        progressContainer.className = 'loading-progress-container';
        progressContainer.innerHTML = `
            <div class="loading-progress-bar">
                <div class="loading-progress-fill"></div>
            </div>
            <div class="loading-percentage">0%</div>
            <div class="loading-status">Initializing Excellence...</div>
        `;
        
        loadingContent.appendChild(progressContainer);
        
        // Realistic loading simulation
        const progressFill = progressContainer.querySelector('.loading-progress-fill');
        const percentage = progressContainer.querySelector('.loading-percentage');
        const status = progressContainer.querySelector('.loading-status');
        
        const loadingStages = [
            { progress: 15, status: 'Loading premium assets...', duration: 200 },
            { progress: 35, status: 'Initializing components...', duration: 300 },
            { progress: 55, status: 'Setting up navigation...', duration: 250 },
            { progress: 75, status: 'Preparing animations...', duration: 200 },
            { progress: 90, status: 'Optimizing performance...', duration: 200 },
            { progress: 100, status: 'Ready for excellence!', duration: 150 }
        ];
        
        let currentStage = 0;
        let currentProgress = 0;
        
        const updateProgress = () => {
            if (currentStage < loadingStages.length) {
                const stage = loadingStages[currentStage];
                const targetProgress = stage.progress;
                
                const animate = () => {
                    if (currentProgress < targetProgress) {
                        currentProgress += Math.random() * 3 + 1.5;
                        if (currentProgress > targetProgress) currentProgress = targetProgress;
                        
                        progressFill.style.width = `${currentProgress}%`;
                        percentage.textContent = `${Math.floor(currentProgress)}%`;
                        
                        if (currentProgress < targetProgress) {
                            setTimeout(animate, 50);
                        } else {
                            status.textContent = stage.status;
                            currentStage++;
                            setTimeout(updateProgress, stage.duration);
                        }
                    }
                };
                animate();
            }
        };
        
        updateProgress();
    }

    completeLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                loadingScreen.remove();
            }, 800);
        }
        
        this.isLoaded = true;
        console.log('✅ Loading completed, initializing page animations...');
        
        // Initialize page animations
        setTimeout(() => {
            this.initializePageAnimations();
            this.startCounterAnimations();
        }, 300);
        
        // Add page entrance animation
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(10px)';
        document.body.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);
    }

    setupNavigation() {
        console.log('🧭 Setting up navigation system...');
        
        // FIXED: More robust event delegation for navigation
        document.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check for navigation links with data-page attribute
            let targetElement = e.target;
            let navLink = null;
            
            // Traverse up to find nav link
            while (targetElement && targetElement !== document) {
                if (targetElement.hasAttribute && targetElement.hasAttribute('data-page')) {
                    navLink = targetElement;
                    break;
                }
                if (targetElement.classList && targetElement.classList.contains('nav-link')) {
                    navLink = targetElement;
                    break;
                }
                targetElement = targetElement.parentElement;
            }
            
            if (navLink) {
                const targetPage = navLink.dataset.page;
                console.log(`🔗 Navigation clicked: ${targetPage}`);
                if (targetPage && targetPage !== this.currentPage) {
                    this.navigateToPage(targetPage);
                }
                return;
            }
            
            // Check for hash-based navigation
            let hashLink = null;
            targetElement = e.target;
            
            while (targetElement && targetElement !== document) {
                if (targetElement.tagName === 'A' && targetElement.getAttribute('href') && targetElement.getAttribute('href').startsWith('#')) {
                    hashLink = targetElement;
                    break;
                }
                targetElement = targetElement.parentElement;
            }
            
            if (hashLink && !hashLink.dataset.page) {
                const href = hashLink.getAttribute('href');
                if (href && href !== '#') {
                    const targetPage = href.substring(1);
                    const validPages = ['home', 'about', 'products', 'services', 'team', 'media', 'contact'];
                    
                    console.log(`🔗 Hash navigation clicked: ${targetPage}`);
                    if (validPages.includes(targetPage) && targetPage !== this.currentPage) {
                        this.navigateToPage(targetPage);
                        return;
                    }
                }
            }
            
            // Check for logo clicks - navigate to home
            let logoLink = null;
            targetElement = e.target;
            
            while (targetElement && targetElement !== document) {
                if (targetElement.classList && targetElement.classList.contains('nav-brand')) {
                    logoLink = targetElement;
                    break;
                }
                targetElement = targetElement.parentElement;
            }
            
            if (logoLink) {
                console.log('🔗 Logo clicked - navigating to home');
                if (this.currentPage !== 'home') {
                    this.navigateToPage('home');
                }
                return;
            }
            
            // Check for button clicks that should navigate
            let buttonLink = null;
            targetElement = e.target;
            
            while (targetElement && targetElement !== document) {
                if (targetElement.classList && targetElement.classList.contains('btn') && targetElement.hasAttribute('data-page')) {
                    buttonLink = targetElement;
                    break;
                }
                if (targetElement.tagName === 'A' && targetElement.classList && targetElement.classList.contains('btn') && targetElement.hasAttribute('data-page')) {
                    buttonLink = targetElement;
                    break;
                }
                targetElement = targetElement.parentElement;
            }
            
            if (buttonLink) {
                const targetPage = buttonLink.dataset.page;
                console.log(`🔗 Button navigation clicked: ${targetPage}`);
                if (targetPage && targetPage !== this.currentPage) {
                    this.navigateToPage(targetPage);
                }
                return;
            }
            
            // If we got here, allow default behavior for other elements
            e.stopPropagation();
        }, true); // Use capture phase for better event handling

        // Handle browser navigation
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            const validPages = ['home', 'about', 'products', 'services', 'team', 'media', 'contact'];
            const targetPage = validPages.includes(hash) ? hash : 'home';
            
            if (targetPage !== this.currentPage) {
                this.navigateToPage(targetPage, false);
            }
        });

        // Set initial page based on hash
        const initialHash = window.location.hash.slice(1);
        const validPages = ['home', 'about', 'products', 'services', 'team', 'media', 'contact'];
        if (validPages.includes(initialHash)) {
            this.currentPage = initialHash;
            this.showPage(initialHash);
        }

        console.log('✅ Navigation setup complete');
    }

    navigateToPage(targetPage, updateHash = true) {
        if (this.isNavigating || targetPage === this.currentPage) return;
        
        console.log(`🚀 Navigating from ${this.currentPage} to ${targetPage}`);
        
        this.isNavigating = true;
        
        // Update URL hash
        if (updateHash) {
            history.pushState(null, '', `#${targetPage}`);
        }
        
        // Update active nav link
        this.updateActiveNavLink(targetPage);
        
        // Get page elements
        const currentPageEl = document.getElementById(`page-${this.currentPage}`);
        const targetPageEl = document.getElementById(`page-${targetPage}`);
        
        if (!targetPageEl) {
            console.error(`❌ Target page element not found: page-${targetPage}`);
            this.isNavigating = false;
            return;
        }

        console.log(`📄 Found target page element: page-${targetPage}`);

        // Simple page transition
        const transitionDuration = 300;
        
        // Hide current page immediately
        this.hideAllPages();
        
        // Show target page immediately
        targetPageEl.classList.remove('hidden');
        targetPageEl.style.opacity = '0';
        targetPageEl.style.transform = 'translateX(20px)';
        
        // Trigger reflow
        targetPageEl.offsetHeight;
        
        // Animate in
        setTimeout(() => {
            targetPageEl.style.transition = `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            targetPageEl.style.opacity = '1';
            targetPageEl.style.transform = 'translateX(0)';
        }, 50);
        
        // Update current page
        this.currentPage = targetPage;
        
        setTimeout(() => {
            this.isNavigating = false;
            this.triggerPageAnimations(targetPage);
            this.closeMobileMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Clear inline styles
            targetPageEl.style.cssText = '';
            
            // Initialize Media page features if navigating to media
            if (targetPage === 'media') {
                this.initializeMediaPage();
            }
            
            console.log(`✅ Navigation to ${targetPage} completed`);
        }, transitionDuration);
    }

    showPage(targetPage) {
        this.hideAllPages();
        const targetPageEl = document.getElementById(`page-${targetPage}`);
        if (targetPageEl) {
            targetPageEl.classList.remove('hidden');
            this.updateActiveNavLink(targetPage);
        }
    }

    hideAllPages() {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
            page.style.cssText = ''; // Clear any inline styles
        });
    }

    updateActiveNavLink(targetPage) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (link.dataset.page === targetPage || link.getAttribute('href') === `#${targetPage}`) {
                link.classList.add('active');
                this.addRippleEffect(link);
            }
        });
    }

    addRippleEffect(element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = rect.width / 2;
        const y = rect.height / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x - size / 2}px;
            top: ${y - size / 2}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    setupMobileNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (!navToggle || !navMenu) return;

        console.log('📱 Setting up mobile navigation...');

        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });

        console.log('✅ Mobile navigation setup complete');
    }

    toggleMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (!navToggle || !navMenu) return;

        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log('📱 Mobile menu opened');
    }

    closeMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        console.log('📱 Mobile menu closed');
    }

    setupScrollAnimations() {
        console.log('🎬 Setting up scroll animations...');
        
        const observerOptions = {
            threshold: [0, 0.1, 0.2],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('fade-in-up', 'animate');
                    
                    // Stagger child animations
                    const children = element.querySelectorAll('.premium-card, .service-card, .industry-card, .value-card, .team-member, .contact-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('fade-in-up', 'animate');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe animated elements
        const animatedElements = document.querySelectorAll(`
            .services-grid,
            .industries-grid,
            .values-grid,
            .team-grid,
            .contact-grid,
            .departments-grid,
            .infra-grid,
            .cert-showcase,
            .section-header,
            .story-content,
            .mv-grid,
            .specs-grid,
            .process-timeline,
            .services-detailed-grid,
            .certificates-grid,
            .awards-row,
            .gallery-masonry,
            .timeline,
            .downloads-grid
        `);

        animatedElements.forEach(element => {
            element.classList.add('fade-in-up');
            observer.observe(element);
        });

        this.observers.set('scroll', observer);
        
        console.log('✅ Scroll animations setup complete');
    }

    setupCounterAnimations() {
        console.log('🔢 Setting up counter animations...');
        
        const counterElements = document.querySelectorAll('.stat-number[data-target]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.dataset.target);
                    const duration = 2000;
                    
                    this.animateCounter(element, 0, target, duration);
                    counterObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.5
        });

        counterElements.forEach(element => {
            counterObserver.observe(element);
        });

        this.observers.set('counter', counterObserver);
        
        console.log('✅ Counter animations setup complete');
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easedProgress = this.easeOutCubic(progress);
            const current = Math.floor(start + (range * easedProgress));
            
            if (end >= 1000) {
                element.textContent = this.formatNumber(current);
            } else {
                element.textContent = current;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = this.formatNumber(end);
                element.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        };
        
        requestAnimationFrame(animate);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    startCounterAnimations() {
        console.log('🚀 Starting hero counter animations...');
        
        const heroStats = document.querySelectorAll('.hero-stats .stat-number[data-target]');
        heroStats.forEach((stat, index) => {
            const target = parseInt(stat.dataset.target);
            setTimeout(() => {
                this.animateCounter(stat, 0, target, 2500);
            }, 800 + (index * 200));
        });
    }

    setupContactForm() {
        console.log('📧 Setting up contact form...');
        
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'contactForm') {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            }
        });

        // Add form validation
        const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });

        console.log('✅ Contact form setup complete');
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        } else if (field.type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }

        if (!isValid) {
            this.showFieldError(field, message);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = '#EF4444';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #EF4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            font-weight: 500;
        `;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    handleFormSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        
        console.log('📧 Processing form submission...');
        
        // Validate all fields
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Please correct the errors in the form before submitting.', 'error');
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = `
            <span style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <span>Sending Message...</span>
            </span>
        `;

        // Collect form data
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        console.log('Form data:', data);

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            
            this.showNotification(
                `Thank you, ${data.name || 'valued customer'}! Your message has been sent successfully. Our team will contact you within 24 hours to discuss your talc requirements.`,
                'success'
            );
            
            form.reset();
            console.log('✅ Form submitted successfully');
        }, 2500);
    }

    setupCertificationPopups() {
        console.log('🏆 Setting up certification popups...');
        
        // Create popup modal HTML
        const popupHTML = `
            <div id="certificationModal" class="modal hidden">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="modalTitle">Certification Details</h3>
                        <button class="modal-close" id="modalClose">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="cert-image-container">
                            <img id="modalImage" src="" alt="Certificate">
                        </div>
                        <div class="cert-details">
                            <h4 id="modalCertName">Certificate Name</h4>
                            <p id="modalDescription">Certificate description</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        
        // Add popup styles
        const popupStyles = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 1;
                visibility: visible;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            
            .modal.hidden {
                opacity: 0;
                visibility: hidden;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 1rem;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow: hidden;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            
            .modal-close:hover {
                background-color: #f3f4f6;
            }
            
            .modal-body {
                padding: 1.5rem;
                display: grid;
                grid-template-columns: 200px 1fr;
                gap: 1.5rem;
                align-items: center;
            }
            
            .cert-image-container {
                text-align: center;
            }
            
            .cert-image-container img {
                max-width: 100%;
                height: auto;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            
            .cert-details h4 {
                color: #1f2937;
                margin-bottom: 0.5rem;
                font-size: 1.25rem;
            }
            
            .cert-details p {
                color: #6b7280;
                line-height: 1.6;
            }
            
            @media (max-width: 768px) {
                .modal-body {
                    grid-template-columns: 1fr;
                    text-align: center;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = popupStyles;
        document.head.appendChild(styleSheet);
        
        // Set up certification data
        const certifications = {
            'iso': {
                name: 'ISO 9001:2015',
                image: 'https://mvtalc.com/wp-content/uploads/2020/09/isotill2017-232x300.png',
                description: 'Quality Management System Certification - This certificate validates our commitment to quality management systems, ensuring consistent quality processes, customer satisfaction, and continuous improvement.'
            },
            'msme': {
                name: 'MSME Registration',
                image: 'https://mvtalc.com/wp-content/uploads/2021/08/Udyog-msme-246x300.png',
                description: 'UDYAM-UK-07-0002622 - Certified under the Micro, Small & Medium Enterprises development program, recognizing our contribution to India\'s manufacturing sector.'
            }
        };
        
        // Add click handlers for certification cards - FIXED EVENT HANDLING
        document.addEventListener('click', (e) => {
            let certCard = e.target;
            
            // Traverse up to find certificate card
            while (certCard && certCard !== document) {
                if (certCard.classList && certCard.classList.contains('certificate-card')) {
                    break;
                }
                certCard = certCard.parentElement;
            }
            
            if (certCard && certCard.classList.contains('certificate-card')) {
                e.preventDefault();
                e.stopPropagation();
                const certId = certCard.dataset.cert;
                
                if (certId && certifications[certId]) {
                    this.showCertificationPopup(certifications[certId]);
                }
                return;
            }
        });
        
        // Close popup handlers
        document.addEventListener('click', (e) => {
            if (e.target.id === 'modalClose' || e.target.classList.contains('modal-overlay')) {
                this.closeCertificationPopup();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCertificationPopup();
                this.closeLightbox();
            }
        });
        
        console.log('✅ Certification popups setup complete');
    }
    
    showCertificationPopup(cert) {
        const modal = document.getElementById('certificationModal');
        const modalImage = document.getElementById('modalImage');
        const modalCertName = document.getElementById('modalCertName');
        const modalDescription = document.getElementById('modalDescription');
        
        modalImage.src = cert.image;
        modalImage.alt = cert.name;
        modalCertName.textContent = cert.name;
        modalDescription.textContent = cert.description;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        console.log(`📜 Showing certification popup: ${cert.name}`);
    }
    
    closeCertificationPopup() {
        const modal = document.getElementById('certificationModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
        
        console.log('📜 Closing certification popup');
    }

    // NEW: Media Page Features
    setupMediaPageFeatures() {
        console.log('📸 Setting up Media page features...');
        
        this.setupGalleryFiltering();
        this.setupGalleryLightbox();
        this.setupDownloadButtons();
        
        console.log('✅ Media page features setup complete');
    }

    setupGalleryFiltering() {
        console.log('🔍 Setting up gallery filtering...');
        
        // FIXED: Gallery filtering with better event handling
        document.addEventListener('click', (e) => {
            let filterBtn = e.target;
            
            // Traverse up to find filter button
            while (filterBtn && filterBtn !== document) {
                if (filterBtn.classList && filterBtn.classList.contains('filter-btn')) {
                    break;
                }
                filterBtn = filterBtn.parentElement;
            }
            
            if (filterBtn && filterBtn.classList.contains('filter-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const filter = filterBtn.dataset.filter;
                
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                filterBtn.classList.add('active');
                
                // Filter gallery items
                this.filterGalleryItems(filter);
                this.currentGalleryFilter = filter;
                
                console.log(`🔍 Gallery filtered by: ${filter}`);
                return;
            }
        });
    }

    filterGalleryItems(filter) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                // Staggered animation
                setTimeout(() => {
                    item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    setupGalleryLightbox() {
        console.log('🖼️ Setting up gallery lightbox...');
        
        // Create lightbox HTML
        const lightboxHTML = `
            <div id="galleryLightbox" class="lightbox hidden">
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close" id="lightboxClose">&times;</button>
                    <div class="lightbox-image-container">
                        <img id="lightboxImage" src="" alt="">
                        <div class="lightbox-nav">
                            <button class="lightbox-prev" id="lightboxPrev">‹</button>
                            <button class="lightbox-next" id="lightboxNext">›</button>
                        </div>
                    </div>
                    <div class="lightbox-info">
                        <h4 id="lightboxTitle">Image Title</h4>
                        <p id="lightboxDescription">Image description</p>
                        <div class="lightbox-counter">
                            <span id="lightboxCounter">1 of 10</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        // Add lightbox styles
        const lightboxStyles = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 1;
                visibility: visible;
                transition: opacity 0.4s ease, visibility 0.4s ease;
            }
            
            .lightbox.hidden {
                opacity: 0;
                visibility: hidden;
            }
            
            .lightbox-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                background: white;
                border-radius: 1rem;
                overflow: hidden;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                display: grid;
                grid-template-columns: 1fr 300px;
                min-height: 500px;
            }
            
            .lightbox-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 10;
                transition: background-color 0.2s;
            }
            
            .lightbox-close:hover {
                background: rgba(0, 0, 0, 0.8);
            }
            
            .lightbox-image-container {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f8f9fa;
                overflow: hidden;
            }
            
            .lightbox-image-container img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                object-position: center;
            }
            
            .lightbox-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: 0 1rem;
                pointer-events: none;
            }
            
            .lightbox-prev,
            .lightbox-next {
                background: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                pointer-events: auto;
                transition: all 0.2s;
            }
            
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: rgba(0, 0, 0, 0.8);
                transform: scale(1.1);
            }
            
            .lightbox-info {
                padding: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background: white;
            }
            
            .lightbox-info h4 {
                font-size: 1.5rem;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 1rem;
            }
            
            .lightbox-info p {
                color: #6b7280;
                line-height: 1.6;
                margin-bottom: 2rem;
            }
            
            .lightbox-counter {
                background: #f3f4f6;
                padding: 0.5rem 1rem;
                border-radius: 2rem;
                text-align: center;
                font-weight: 600;
                color: #374151;
                margin-top: auto;
            }
            
            @media (max-width: 768px) {
                .lightbox-content {
                    grid-template-columns: 1fr;
                    grid-template-rows: 1fr auto;
                    max-width: 95vw;
                    max-height: 95vh;
                }
                
                .lightbox-info {
                    padding: 1rem;
                }
            }
        `;
        
        const lightboxStyleSheet = document.createElement('style');
        lightboxStyleSheet.textContent = lightboxStyles;
        document.head.appendChild(lightboxStyleSheet);
        
        // FIXED: Setup gallery item clicks with better event handling
        document.addEventListener('click', (e) => {
            let galleryItem = e.target;
            
            // Traverse up to find gallery item
            while (galleryItem && galleryItem !== document) {
                if (galleryItem.classList && galleryItem.classList.contains('gallery-item')) {
                    break;
                }
                galleryItem = galleryItem.parentElement;
            }
            
            if (galleryItem && galleryItem.classList.contains('gallery-item')) {
                e.preventDefault();
                e.stopPropagation();
                this.openLightbox(galleryItem);
                return;
            }
        });
        
        // Setup lightbox navigation
        document.addEventListener('click', (e) => {
            if (e.target.id === 'lightboxClose' || e.target.classList.contains('lightbox-overlay')) {
                this.closeLightbox();
            } else if (e.target.id === 'lightboxPrev') {
                this.navigateLightbox(-1);
            } else if (e.target.id === 'lightboxNext') {
                this.navigateLightbox(1);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightboxOpen) {
                if (e.key === 'ArrowLeft') {
                    this.navigateLightbox(-1);
                } else if (e.key === 'ArrowRight') {
                    this.navigateLightbox(1);
                }
            }
        });
    }

    openLightbox(galleryItem) {
        const img = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('h4').textContent;
        const description = galleryItem.querySelector('p').textContent;
        
        // Get all visible gallery items for navigation
        this.currentLightboxItems = Array.from(document.querySelectorAll('.gallery-item'))
            .filter(item => item.style.display !== 'none')
            .filter(item => this.currentGalleryFilter === 'all' || item.dataset.category === this.currentGalleryFilter);
        
        this.currentLightboxIndex = this.currentLightboxItems.indexOf(galleryItem);
        
        const lightbox = document.getElementById('galleryLightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        const lightboxCounter = document.getElementById('lightboxCounter');
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
        lightboxCounter.textContent = `${this.currentLightboxIndex + 1} of ${this.currentLightboxItems.length}`;
        
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.lightboxOpen = true;
        
        console.log(`🖼️ Opened lightbox for: ${title}`);
    }

    navigateLightbox(direction) {
        if (!this.currentLightboxItems || this.currentLightboxItems.length === 0) return;
        
        this.currentLightboxIndex += direction;
        
        if (this.currentLightboxIndex < 0) {
            this.currentLightboxIndex = this.currentLightboxItems.length - 1;
        } else if (this.currentLightboxIndex >= this.currentLightboxItems.length) {
            this.currentLightboxIndex = 0;
        }
        
        const currentItem = this.currentLightboxItems[this.currentLightboxIndex];
        const img = currentItem.querySelector('img');
        const title = currentItem.querySelector('h4').textContent;
        const description = currentItem.querySelector('p').textContent;
        
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        const lightboxCounter = document.getElementById('lightboxCounter');
        
        // Add transition effect
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            lightboxCounter.textContent = `${this.currentLightboxIndex + 1} of ${this.currentLightboxItems.length}`;
            
            lightboxImage.style.opacity = '1';
        }, 150);
        
        console.log(`🖼️ Navigated to image ${this.currentLightboxIndex + 1}`);
    }

    closeLightbox() {
        const lightbox = document.getElementById('galleryLightbox');
        if (lightbox) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
            this.lightboxOpen = false;
        }
        
        console.log('🖼️ Closed lightbox');
    }

    setupDownloadButtons() {
        console.log('📥 Setting up download buttons...');
        
        document.addEventListener('click', (e) => {
            let downloadBtn = e.target;
            
            // Traverse up to find download button
            while (downloadBtn && downloadBtn !== document) {
                if (downloadBtn.classList && downloadBtn.classList.contains('download-btn')) {
                    break;
                }
                downloadBtn = downloadBtn.parentElement;
            }
            
            if (downloadBtn && downloadBtn.classList.contains('download-btn')) {
                e.preventDefault();
                e.stopPropagation();
                this.handleDownload(downloadBtn);
                return;
            }
        });
    }

    handleDownload(button) {
        const downloadItem = button.closest('.download-item');
        const title = downloadItem.querySelector('h4').textContent;
        
        // Show downloading state
        const originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `
            <span style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <span>Downloading...</span>
            </span>
        `;
        
        // Simulate download
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = originalText;
            
            this.showNotification(
                `${title} download will be available soon. Please contact our team at mvtalcind@gmail.com for immediate access to the document.`,
                'info'
            );
            
            console.log(`📥 Download requested: ${title}`);
        }, 2000);
    }

    initializeMediaPage() {
        console.log('📸 Initializing Media page...');
        
        // Reset gallery filter to 'all'
        this.currentGalleryFilter = 'all';
        
        // Ensure all gallery items are visible
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
        
        // Reset filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === 'all') {
                btn.classList.add('active');
            }
        });
        
        console.log('✅ Media page initialized');
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(notification => {
            notification.remove();
        });

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
            padding: 1.5rem;
            max-width: 400px;
            min-width: 320px;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border-left: 4px solid ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#0EA5E9'};
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        `;
        
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        
        notification.innerHTML = `
            <div style="font-size: 1.5rem;">${icon}</div>
            <div style="flex: 1; color: #374151; line-height: 1.5; font-size: 0.95rem;">${message}</div>
            <button onclick="this.parentNode.remove()" style="background: none; border: none; color: #6B7280; cursor: pointer; font-size: 1.5rem; padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">&times;</button>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto close
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 400);
            }
        }, 5000);
    }

    setupInteractiveElements() {
        console.log('🎯 Setting up interactive elements...');
        
        // Enhanced button interactions
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.btn');
            if (button && !button.disabled) {
                this.createRippleEffect(button, e);
            }
        });

        // Enhanced card hover effects
        const cards = document.querySelectorAll('.premium-card, .service-card, .industry-card, .value-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Smooth scroll for anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]:not([data-page])');
            if (link) {
                const href = link.getAttribute('href');
                if (href === '#' || href.includes('page-')) return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });

        console.log('✅ Interactive elements setup complete');
    }

    createRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupImageHandling() {
        console.log('🖼️ Setting up enhanced image handling...');
        
        // Simple image loading - remove complex handling that might interfere
        const images = document.querySelectorAll('img');
        images.forEach((img) => {
            // Handle load errors with simpler approach
            img.addEventListener('error', (e) => {
                console.warn(`⚠️ Image failed to load: ${e.target.src}`);
                // Don't modify the image, just log the error
            });
            
            img.addEventListener('load', () => {
                console.log(`✅ Image loaded successfully: ${img.src}`);
            });
        });

        console.log('✅ Image handling setup complete');
    }

    setupPerformanceOptimizations() {
        console.log('⚡ Setting up performance optimizations...');
        
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 10);
        }, { passive: true });

        // Preload critical resources
        this.preloadCriticalResources();

        console.log('✅ Performance optimizations complete');
    }

    handleScroll() {
        // Update header background opacity based on scroll
        const header = document.querySelector('.header');
        if (header) {
            const scrollY = window.pageYOffset;
            const opacity = Math.min(scrollY / 100, 1);
            header.style.background = `rgba(255, 255, 255, ${0.95 + (opacity * 0.05)})`;
        }
    }

    preloadCriticalResources() {
        const criticalImages = [
            'https://mvtalc.com/wp-content/uploads/2020/09/Factory_wide.jpg',
            'https://mvtalc.com/wp-content/uploads/2021/08/cropped-LOGOGST.png',
            'https://mvtalc.com/wp-content/uploads/2020/08/mineworking.jpg',
            'https://mvtalc.com/wp-content/uploads/2020/09/machine.jpg',
            'https://mvtalc.com/wp-content/uploads/2020/09/macbull.jpg',
            'https://mvtalc.com/wp-content/uploads/2020/09/finallaboutuscollage-1-1170x760.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        console.log('🚀 Critical resources preloaded');
    }

    setupAccessibilityFeatures() {
        console.log('♿ Setting up accessibility features...');
        
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #0EA5E9;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 100000;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content ID
        const mainContent = document.getElementById('pageContainer');
        if (mainContent) {
            mainContent.id = 'main-content';
        }

        console.log('✅ Accessibility features setup complete');
    }

    triggerPageAnimations(page) {
        const pageElement = document.getElementById(`page-${page}`);
        if (!pageElement) return;

        console.log(`🎬 Triggering animations for ${page} page`);

        // Reset animations
        pageElement.querySelectorAll('.fade-in-up').forEach(el => {
            el.classList.remove('animate');
        });

        // Trigger with delays
        const animatedElements = pageElement.querySelectorAll('.fade-in-up, .premium-card, .service-card, .industry-card, .value-card, .team-member, .contact-item');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in-up', 'animate');
            }, index * 50);
        });

        // Trigger counters on the current page
        const counters = pageElement.querySelectorAll('.stat-number[data-target]');
        counters.forEach((counter, index) => {
            const target = parseInt(counter.dataset.target);
            setTimeout(() => {
                this.animateCounter(counter, 0, target, 2000);
            }, 500 + (index * 200));
        });
    }

    initializePageAnimations() {
        console.log('🎭 Initializing page animations...');
        
        setTimeout(() => {
            this.triggerPageAnimations(this.currentPage);
            
            // Initialize Media page if it's the current page
            if (this.currentPage === 'media') {
                this.initializeMediaPage();
            }
        }, 300);
    }

    // Public API methods
    goToPage(page) {
        this.navigateToPage(page);
    }

    showNotificationPublic(message, type = 'info') {
        this.showNotification(message, type);
    }
}

// Add required CSS for enhanced animations and interactions
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .fade-in-up.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #0EA5E9 !important;
        outline-offset: 2px !important;
    }
    
    .premium-card,
    .service-card,
    .industry-card,
    .value-card,
    .team-member,
    .contact-item,
    .department-card {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
    }
    
    .field-error {
        animation: shake 0.3s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .loading-progress-bar {
        background: rgba(14, 165, 233, 0.1);
        border-radius: 4px;
        overflow: hidden;
        height: 6px;
        margin: 1rem 0;
    }
    
    .loading-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #0EA5E9, #F97316);
        border-radius: 4px;
        transition: width 0.3s ease;
    }
    
    .loading-percentage {
        color: #0EA5E9;
        font-weight: 600;
        text-align: center;
        margin-bottom: 0.5rem;
    }
    
    .loading-status {
        color: rgba(203, 213, 225, 0.9);
        text-align: center;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(enhancedStyles);

// Initialize the website
console.log('🎉 Initializing Maa Vaishnavi TALC Industries website...');
const mvtalcWebsite = new MVTalcWebsite();

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('🚨 Website error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 Unhandled promise rejection:', e.reason);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`🚀 Website loaded in ${loadTime}ms`);
        }, 0);
    });
}

// Handle browser navigation
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('mvtalc_currentPage', mvtalcWebsite.currentPage);
});

// Restore previous page on reload
window.addEventListener('load', () => {
    const savedPage = sessionStorage.getItem('mvtalc_currentPage');
    if (savedPage && savedPage !== 'home') {
        setTimeout(() => {
            mvtalcWebsite.goToPage(savedPage);
        }, 100);
    }
});

// Export for external use and debugging
window.MVTalcWebsite = mvtalcWebsite;

console.log('✅ Maa Vaishnavi TALC Industries website loaded successfully!');
console.log('🏭 Ready to showcase premium talc excellence!');
console.log('📸 Media page features enabled!');