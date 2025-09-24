/**
 * Lenana Girls High School - Main JavaScript File
 * Contains functionality for:
 * 1. Mobile navigation toggle (hamburger menu)
 * 2. Form validation for contact form
 * 3. Smooth scrolling for anchor links
 */

// Wait for DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            // Toggle active class on hamburger menu and nav links
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickInsideHamburger = hamburgerMenu.contains(event.target);
        
        if (!isClickInsideNav && !isClickInsideHamburger && navLinks.classList.contains('active')) {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Form Validation for Contact Form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset previous error states
            resetFormErrors();
            
            // Validate form fields
            let isValid = true;
            
            // Name validation
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Email validation
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Message validation
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real application, you would submit the form data to a server here
                // For this example, we'll just show a success message
                const formContainer = document.querySelector('.contact-form');
                formContainer.innerHTML = '<div class="success-message"><h3>Thank You!</h3><p>Your message has been sent successfully. We will get back to you soon.</p></div>';
            }
        });
    }
    
    // Helper function to show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.error');
        errorElement.textContent = message;
    }
    
    // Helper function to reset form errors
    function resetFormErrors() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(function(formGroup) {
            formGroup.classList.remove('error');
        });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                event.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(function(item) {
        const itemHref = item.getAttribute('href');
        
        if (itemHref === currentPage || (currentPage === '' && itemHref === 'index.html')) {
            item.classList.add('active');
        }
    });
});