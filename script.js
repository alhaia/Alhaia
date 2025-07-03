// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background change on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(46, 91, 186, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #c41e3a 0%, #2e5bba 100%)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Gallery lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item:not(.add-photo)');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h4').textContent;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${title}">
                    <h3>${title}</h3>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close lightbox
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            function closeLightbox() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Add photo functionality
    const addPhotoCard = document.querySelector('.add-photo');
    
    addPhotoCard.addEventListener('click', function() {
        alert('لإضافة صور جديدة:\n1. ضع ملفات الصور في مجلد الموقع\n2. أضف عنصر gallery-item جديد في HTML\n3. استخدم نفس التنسيق للصور الموجودة');
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.goal-card, .gallery-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mobile menu toggle
    const nav = document.querySelector('.nav');
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navToggle.style.display = 'none';
    
    document.querySelector('.header-content').appendChild(navToggle);
    
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
    });
    
    // Show/hide mobile menu button based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
        } else {
            navToggle.style.display = 'none';
            nav.classList.remove('nav-open');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
});

// Add CSS for lightbox and mobile menu
const additionalCSS = `
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    text-align: center;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 10px;
}

.lightbox-content h3 {
    color: white;
    margin-top: 1rem;
    font-size: 1.2rem;
}

.lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    transition: color 0.3s ease;
}

.lightbox-close:hover {
    color: #c41e3a;
}

.nav-toggle {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

@media (max-width: 768px) {
    .nav {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(46, 91, 186, 0.95);
        backdrop-filter: blur(10px);
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
    }
    
    .nav-open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
    }
    
    .nav ul {
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
    }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

