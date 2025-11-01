// ==================== Mobile Menu Toggle ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== Sticky Navbar ====================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ==================== Active Nav Link on Scroll ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Scroll to Top Button ====================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== Contact Form Configuration ====================
const BACKEND_URL = 'https://portfolio-backend-2hli.onrender.com';

// ==================== Contact Form Handling ====================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Name validation (at least 2 characters)
    if (formData.name.length < 2) {
        showNotification('Please enter a valid name', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Subject validation (at least 3 characters)
    if (formData.subject.length < 3) {
        showNotification('Subject must be at least 3 characters', 'error');
        return;
    }
    
    // Message validation (at least 10 characters)
    if (formData.message.length < 10) {
        showNotification('Message must be at least 10 characters', 'error');
        return;
    }
    
    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    submitBtn.style.cursor = 'not-allowed';
    
    try {
        console.log('Sending contact form to:', `${BACKEND_URL}/api/contact`);
        
        const response = await fetch(`${BACKEND_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showNotification('✅ Message sent successfully! Thank you for contacting me. I will get back to you soon.', 'success');
            contactForm.reset();
            
            // Scroll to top after successful submission
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 1000);
        } else {
            throw new Error(data.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        
        // Check if it's a network error
        if (error.message.includes('fetch') || error.message.includes('network')) {
            showNotification('❌ Network error. Please check your internet connection and try again.', 'error');
        } else {
            showNotification(`❌ Failed to send message. Please try again or email me directly at Shakibshalim1698@gmail.com`, 'error');
        }
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }
});

// ==================== Notification Function ====================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== Animation on Scroll ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards for scroll animations
document.querySelectorAll('section, .project-card, .achievement-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== Dynamic Year in Footer ====================
document.querySelector('.footer p').innerHTML = `&copy; ${new Date().getFullYear()} Shakib Shalim. All rights reserved.`;

// ==================== Handle Backend Wake-up (for Render free tier) ====================
// Render free tier goes to sleep after 15 minutes of inactivity
// This function helps wake it up before form submission
async function wakeUpBackend() {
    try {
        console.log('Checking backend status...');
        const response = await fetch(`${BACKEND_URL}/api/health`);
        if (response.ok) {
            console.log('Backend is ready');
        }
    } catch (error) {
        console.log('Backend is waking up...');
    }
}

// Wake up backend when user scrolls to contact section
let backendWokenUp = false;
const contactSection = document.getElementById('contact');

if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !backendWokenUp) {
                wakeUpBackend();
                backendWokenUp = true;
            }
        });
    }, { threshold: 0.3 });
    
    contactObserver.observe(contactSection);
}

// ==================== Log Page Load ====================
console.log('Portfolio loaded successfully');
console.log('Backend API:', BACKEND_URL);
console.log('Frontend URL:', window.location.href);
