// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksLi = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    
    // Animate Links
    navLinksLi.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            navLinksLi.forEach(link => {
                link.style.animation = '';
            });
        }
        
        // Scroll to section
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Add animation to skills and projects on scroll
const skillElements = document.querySelectorAll('.skill');
const projectElements = document.querySelectorAll('.project-card');

const animateOnScroll = () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    skillElements.forEach(skill => {
        const skillTop = skill.getBoundingClientRect().top;
        if (skillTop < triggerBottom) {
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0)';
        }
    });
    
    projectElements.forEach(project => {
        const projectTop = project.getBoundingClientRect().top;
        if (projectTop < triggerBottom) {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state
skillElements.forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px)';
    skill.style.transition = 'all 0.5s ease';
});

projectElements.forEach(project => {
    project.style.opacity = '0';
    project.style.transform = 'translateY(20px)';
    project.style.transition = 'all 0.5s ease';
});

// Run on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelector('input[type="text"]:nth-of-type(2)').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Here you would typically send the form data to a server
    console.log({ name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

