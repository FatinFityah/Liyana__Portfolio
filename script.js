// Add this to your script.js file (replace existing content)
// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500); // Small delay for smooth transition
    }
});
// Smooth page transition function
function smoothNavigate(url) {
    document.body.classList.add('page-transition');
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Add smooth transitions to all navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav a:not(.nav-contact):not(.nav-about)');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only apply smooth transition for internal links
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();
                smoothNavigate(href);
            }
        });
    });
    
    // Remove transition class when page loads
    document.body.classList.remove('page-transition');
});

// Card flip functionality for About <-> Contact transition
const cardFlipper = document.getElementById('cardFlipper');
const navContact = document.querySelectorAll('.nav-contact');
const navAbout = document.querySelectorAll('.nav-about');

// Flip to Contact page
if (navContact.length > 0) {
    navContact.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            cardFlipper.classList.add('flipped');
            history.pushState(null, '', 'contact.html');
        });
    });
}

// Flip back to About page
if (navAbout.length > 0) {
    navAbout.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            cardFlipper.classList.remove('flipped');
            history.pushState(null, '', 'about.html');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle phone number reveal
const contactReveal = document.querySelector('.contact-reveal');
if (contactReveal) {
    contactReveal.addEventListener('click', (e) => {
        e.preventDefault();
        contactReveal.textContent = '+60 17-810 5824';
        contactReveal.href = 'tel:+60178105824';
        contactReveal.style.pointerEvents = 'none';
    });
}

// Handle contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add submission animation
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 1000);
    });
}

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.about-section, .contact-item, .project-card').forEach(el => {
    observer.observe(el);
});

// Scroll to Top Button Functionality
// Add this code to BOTH script.js AND projects.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll to top button
    initScrollToTop();
});

function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    
    if (!scrollButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
