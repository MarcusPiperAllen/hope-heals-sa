document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

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
            const name = formData.get('name');
            const email = formData.get('email');
            const amount = formData.get('amount');
            const message = formData.get('message');
            
            const subject = encodeURIComponent('New Pledge for HOPE Heals');
            const body = encodeURIComponent(
`New Pledge Submission

Name: ${name}
Email: ${email}
Pledge Amount: $${amount}
${message ? `Message: ${message}` : ''}`
            );
            
            const mailtoLink = `mailto:hopehealssanantonio@gmail.com?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
            
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
                <p>Thank you for your pledge. A confirmation email is ready to send. Please click "Send" in your email app to complete your pledge submission.</p>
                <button class="btn btn-primary" onclick="this.closest('.thank-you-modal').remove()">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('show'), 10);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const CONTACT_EMAIL = 'hopehealssanantonio@gmail.com';
        const statusEl = document.getElementById('contact-form-status');

        const setStatus = (message, isError) => {
            if (!statusEl) return;
            statusEl.textContent = message;
            statusEl.hidden = false;
            statusEl.classList.toggle('is-error', !!isError);
        };

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = (formData.get('name') || '').toString().trim();
            const email = (formData.get('email') || '').toString().trim();
            const subjectValue = (formData.get('subject') || '').toString();
            const message = (formData.get('message') || '').toString().trim();

            const subjectSelect = document.getElementById('contact-subject');
            const subjectLabel = subjectSelect && subjectSelect.selectedIndex >= 0
                ? subjectSelect.options[subjectSelect.selectedIndex].text
                : subjectValue;

            const subject = `[HHSA Contact] ${subjectLabel}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;

            const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            setStatus(`Opening your email app to send this message to ${CONTACT_EMAIL}. If nothing opens, please email us directly at ${CONTACT_EMAIL}.`, false);

            let opened = true;
            try {
                const newWin = window.open(mailtoLink, '_self');
                if (newWin === null) {
                    opened = false;
                }
            } catch (err) {
                opened = false;
            }

            if (!opened) {
                setStatus(`We couldn't open your email app automatically. Please email your message directly to ${CONTACT_EMAIL}.`, true);
            }
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
