document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const qrContainer = document.getElementById('qr-code');
    if (qrContainer && typeof QRCode !== 'undefined') {
        const currentUrl = window.location.href.split('#')[0] + '#involved';
        QRCode.toCanvas(document.createElement('canvas'), currentUrl, {
            width: 150,
            margin: 2,
            color: {
                dark: '#1a365d',
                light: '#ffffff'
            }
        }, function(error, canvas) {
            if (!error) {
                qrContainer.appendChild(canvas);
            }
        });
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();
            const startValue = 0;
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
                
                const isYear = counter.classList.contains('counter-year');
                counter.textContent = isYear ? currentValue : currentValue.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = isYear ? target : target.toLocaleString();
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }

    const counterSection = document.querySelector('.impact-counter');
    let counterAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    if (counterSection) {
        counterObserver.observe(counterSection);
    }

    const amountBtns = document.querySelectorAll('.amount-btn');
    const amountInput = document.getElementById('pledge-amount');
    
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            amountBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            amountInput.value = this.getAttribute('data-amount');
        });
    });
    
    if (amountInput) {
        amountInput.addEventListener('input', function() {
            amountBtns.forEach(b => b.classList.remove('active'));
        });
    }

    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    const pledgeForm = document.getElementById('pledge-form');
    if (pledgeForm) {
        pledgeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                amount: formData.get('amount'),
                message: formData.get('message')
            };
            
            console.log('Pledge submitted:', data);
            
            showThankYouModal();
            this.reset();
            amountBtns.forEach(b => b.classList.remove('active'));
        });
    }

    function showThankYouModal() {
        const existingModal = document.getElementById('thank-you-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'thank-you-modal';
        modal.className = 'thank-you-modal';
        modal.innerHTML = `
            <div class="thank-you-content">
                <div class="thank-you-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </div>
                <h3>Thank You!</h3>
                <p>Thank you for your commitment to HOPE Heals San Antonio. We will reach out to you soon regarding the next steps for your contribution.</p>
                <button class="btn btn-primary" onclick="this.closest('.thank-you-modal').remove()">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('show'), 10);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            console.log('Contact form submitted:', data);
            
            showToast('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
