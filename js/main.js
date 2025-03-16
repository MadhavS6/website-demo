// Custom cursor
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });
    
    // Add/remove cursor active class on click
    document.addEventListener('mousedown', function() {
        if (cursor) cursor.classList.add('cursor-active');
    });
    
    document.addEventListener('mouseup', function() {
        if (cursor) cursor.classList.remove('cursor-active');
    });
    
    // Create floating balloons in the hero section
    createFloatingBalloons();
    
    // Initialize the gallery lightbox
    initGalleryLightbox();
    
    // Initialize the balloon pop challenge with a longer delay
    // to ensure it doesn't interfere with initial page load
    setTimeout(() => {
        initBalloonChallenge();
        console.log('Balloon challenge initialized');
    }, 2000);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // If user clicks on the cake section link, show the balloon challenge
                if (targetId === '#cake') {
                    const challenge = document.getElementById('balloon-challenge');
                    if (challenge && challenge.style.display === 'none') {
                        challenge.style.display = 'block';
                    }
                }
            }
        });
    });
});

// Create floating balloons in the hero section
function createFloatingBalloons() {
    const colors = ['#ff85a2', '#ffa8b6', '#ffd166', '#83d0c9', '#ef8354'];
    const balloonsContainer = document.querySelector('.floating-balloons');
    
    if (!balloonsContainer) return;
    
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        
        // Random properties
        const size = Math.random() * 40 + 30;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        // Set balloon style
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.2}px`;
        balloon.style.backgroundColor = color;
        balloon.style.left = `${left}%`;
        balloon.style.animationDelay = `${delay}s`;
        balloon.style.animationDuration = `${duration}s`;
        
        // Create balloon string
        const string = document.createElement('div');
        string.className = 'balloon-string';
        balloon.appendChild(string);
        
        balloonsContainer.appendChild(balloon);
    }
    
    // Add CSS for the floating balloons
    const style = document.createElement('style');
    style.textContent = `
        .floating-balloon {
            position: absolute;
            bottom: -100px;
            border-radius: 50%;
            animation: floatUp linear infinite;
            opacity: 0.7;
        }
        
        .balloon-string {
            position: absolute;
            bottom: -20px;
            left: 50%;
            width: 1px;
            height: 30px;
            background-color: rgba(0, 0, 0, 0.3);
            transform: translateX(-50%);
        }
        
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-1000px) rotate(20deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the balloon pop challenge
function initBalloonChallenge() {
    console.log('Starting balloon challenge init');
    const balloonContainer = document.querySelector('.balloons-container');
    const cakeReveal = document.getElementById('cake-reveal');
    const challenge = document.getElementById('balloon-challenge');
    
    console.log('Balloon container:', balloonContainer);
    console.log('Cake reveal:', cakeReveal);
    console.log('Challenge container:', challenge);
    
    if (!balloonContainer) {
        console.error('Balloon container not found');
        return;
    }
    
    if (!cakeReveal) {
        console.error('Cake reveal not found');
        return;
    }
    
    if (!challenge) {
        console.error('Challenge container not found');
        return;
    }
    
    // Set display to none initially, let user navigate to it manually
    // This prevents auto-showing the challenge on page load
    if (challenge.style.display === 'block') {
        challenge.style.display = 'none';
    }
    
    // Clear any existing balloons first
    balloonContainer.innerHTML = '';
    
    const balloonColors = [
        '#ff85a2', '#ffa8b6', '#ffd166', '#83d0c9', '#ef8354',
        '#ff9a76', '#c5a3ff', '#ffd5c2', '#f28482', '#8ac926'
    ];
    
    // Create balloons with direct styles instead of relying on CSS
    for (let i = 0; i < 9; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.backgroundColor = balloonColors[i % balloonColors.length];
        
        // Add inline styles for balloon
        balloon.style.width = '80px';
        balloon.style.height = '100px';
        balloon.style.borderRadius = '50%';
        balloon.style.position = 'relative';
        balloon.style.cursor = 'pointer';
        balloon.style.transition = 'all 0.2s ease';
        balloon.style.display = 'flex';
        balloon.style.alignItems = 'center';
        balloon.style.justifyContent = 'center';
        balloon.style.color = 'white';
        balloon.style.fontSize = '24px';
        balloon.style.margin = '10px';
        
        // Add balloon string
        balloon.innerHTML = `<div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 2px; height: 30px; background-color: rgba(0, 0, 0, 0.3);"></div>`;
        
        // Add emoji to balloon
        const emojis = ['🎁', '🎈', '🎊', '🎉', '💖', '✨', '🌟', '🎵', '🎂'];
        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = emojis[i];
        balloon.appendChild(emojiSpan);
        
        // Randomize balloon positions in 3x3 grid
        const row = Math.floor(i / 3);
        const col = i % 3;
        balloon.style.gridRow = row + 1;
        balloon.style.gridColumn = col + 1;

        // Hide emoji initially
        emojiSpan.style.opacity = '0';
        emojiSpan.style.transition = 'opacity 0.3s';
        
        // Only show emoji on hover
        balloon.addEventListener('mouseenter', () => {
            emojiSpan.style.opacity = '1';
        });
        
        balloon.addEventListener('mouseleave', () => {
            emojiSpan.style.opacity = '0'; 
        });
        
        // Add balloon click event
        balloon.addEventListener('click', function(e) {
            if (i === 8) { // The cake balloon (last one)
                popBalloon(e, this, true);
            } else {
                popBalloon(e, this, false);
            }
        });
        
        balloonContainer.appendChild(balloon);
        console.log(`Balloon ${i+1} created`);
    }
    
    console.log('Balloons created:', balloonContainer.children.length);
}

// Balloon pop function
function popBalloon(e, balloon, isWinningBalloon) {
    console.log('Popping balloon, winning:', isWinningBalloon);
    
    // Create pop effect
    const pop = document.createElement('div');
    pop.className = 'balloon-pop';
    pop.style.left = (e.clientX) + 'px';
    pop.style.top = (e.clientY) + 'px';
    document.body.appendChild(pop);
    
    // Add CSS for the pop effect if not already added
    if (!document.querySelector('.balloon-pop-style')) {
        const style = document.createElement('style');
        style.className = 'balloon-pop-style';
        style.textContent = `
            .balloon-pop {
                position: fixed;
                width: 30px;
                height: 30px;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
                border-radius: 50%;
                z-index: 1000;
                pointer-events: none;
                animation: popEffect 0.5s forwards;
            }
            
            @keyframes popEffect {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove the balloon
    balloon.style.transform = 'scale(0)';
    balloon.style.opacity = '0';
    
    // Play pop sound
    const popSound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
    popSound.play().catch(() => {}); // Catch errors if browser blocks autoplay
    
    // If winning balloon, reveal cake
    if (isWinningBalloon) {
        setTimeout(() => {
            document.getElementById('balloon-challenge').style.display = 'none';
            const cakeReveal = document.getElementById('cake-reveal');
            cakeReveal.style.display = 'block';
            
            // Launch confetti
            launchConfetti();
        }, 500);
    }
    
    // Remove pop effect after animation
    setTimeout(() => {
        document.body.removeChild(pop);
    }, 500);
}

// Launch confetti celebration
function launchConfetti() {
    if (typeof confetti === 'function') {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            
            const particleCount = 50 * (timeLeft / duration);
            
            // Since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
            }));
        }, 250);
    }
}

// Initialize Gallery Lightbox with Keyboard and Gesture Navigation
function initGalleryLightbox() {
    // Create lightbox elements
    const lightboxWrapper = document.createElement('div');
    lightboxWrapper.className = 'lightbox-wrapper';
    lightboxWrapper.style.display = 'none';
    
    // Create lightbox content
    lightboxWrapper.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-container">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&lsaquo;</button>
            <button class="lightbox-next">&rsaquo;</button>
            <div class="lightbox-content">
                <img src="" alt="Gallery Image" class="lightbox-image">
            </div>
            <div class="lightbox-caption"></div>
            <div class="lightbox-counter"></div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(lightboxWrapper);
    
    // Create gesture hint element
    const gestureHint = document.createElement('div');
    gestureHint.className = 'gesture-hint';
    gestureHint.innerHTML = `
        <i class="fas fa-hand-point-up"></i>
        <span>Use arrow keys or swipe to navigate</span>
    `;
    document.body.appendChild(gestureHint);
    
    // Add styles for lightbox
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        .lightbox-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            touch-action: none;
        }
        
        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            animation: fadeIn 0.3s forwards;
        }
        
        .lightbox-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 80%;
            max-height: 80vh;
            transition: transform 0.3s ease-out;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 5px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            animation: zoomIn 0.3s forwards;
        }
        
        @keyframes zoomIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        .lightbox-caption {
            color: white;
            font-size: 18px;
            margin-top: 20px;
            text-align: center;
            max-width: 80%;
        }
        
        .lightbox-counter {
            color: white;
            font-size: 14px;
            margin-top: 10px;
            opacity: 0.7;
        }
        
        .lightbox-close, .lightbox-prev, .lightbox-next {
            background: none;
            border: none;
            color: white;
            font-size: 40px;
            cursor: pointer;
            padding: 20px;
            border-radius: 50%;
            position: absolute;
            transition: all 0.2s;
            z-index: 1000;
            opacity: 0.7;
            background-color: rgba(0, 0, 0, 0.2);
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-close:hover, .lightbox-prev:hover, .lightbox-next:hover {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-close {
            top: 20px;
            right: 20px;
        }
        
        .lightbox-prev {
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .lightbox-next {
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        /* Swipe animation classes */
        .swipe-left {
            animation: swipeLeft 0.3s forwards;
        }
        
        .swipe-right {
            animation: swipeRight 0.3s forwards;
        }
        
        @keyframes swipeLeft {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(-50px); opacity: 0; }
        }
        
        @keyframes swipeRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(50px); opacity: 0; }
        }
        
        .swipe-new-left {
            animation: swipeNewLeft 0.3s forwards;
        }
        
        .swipe-new-right {
            animation: swipeNewRight 0.3s forwards;
        }
        
        @keyframes swipeNewLeft {
            from { transform: translateX(50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes swipeNewRight {
            from { transform: translateX(-50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(lightboxStyles);
    
    // Get elements
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.querySelector('.lightbox-wrapper');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxContent = document.querySelector('.lightbox-content');
    
    // Variables to track current image and touch events
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;
    
    // Open lightbox when gallery image is clicked
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Close lightbox when close button or overlay is clicked
    lightboxClose.addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-overlay').addEventListener('click', (e) => {
        if (e.target === document.querySelector('.lightbox-overlay')) {
            closeLightbox();
        }
    });
    
    // Navigate with prev/next buttons
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.style.display || lightbox.style.display === 'none') return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    // Touch and gesture support
    lightboxContent.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].clientX;
    }, { passive: true });
    
    lightboxContent.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    // Track two-finger trackpad swipes with wheel events
    let wheelTimeout;
    let wheelDirection = 0;
    
    lightbox.addEventListener('wheel', (e) => {
        // Detect horizontal scrolling which is typical for trackpad gestures
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            
            clearTimeout(wheelTimeout);
            
            // Accumulate the delta to detect direction
            wheelDirection += e.deltaX;
            
            wheelTimeout = setTimeout(() => {
                if (wheelDirection > 50) {
                    showPrevImage();
                } else if (wheelDirection < -50) {
                    showNextImage();
                }
                wheelDirection = 0;
            }, 100);
        }
    }, { passive: false });
    
    // Handle swipe gestures
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = startX - endX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swiped left, show next image
                showNextImage();
            } else {
                // Swiped right, show previous image
                showPrevImage();
            }
        }
    }
    
    // Open lightbox function
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Show gesture hint
        const gestureHint = document.querySelector('.gesture-hint');
        gestureHint.classList.add('show');
        
        // Determine which hint to show based on device
        if (isMobileDevice()) {
            gestureHint.innerHTML = `<i class="fas fa-hand-point-up"></i> <span>Swipe to navigate images</span>`;
        } else if (isTrackpadDevice()) {
            gestureHint.innerHTML = `<i class="fas fa-hand-point-up"></i> <span>Use trackpad gestures or arrow keys</span>`;
        } else {
            gestureHint.innerHTML = `<i class="fas fa-keyboard"></i> <span>Use ← → arrow keys to navigate</span>`;
        }
        
        // Hide hint after 5 seconds
        setTimeout(() => {
            gestureHint.classList.remove('show');
        }, 5000);
    }
    
    // Close lightbox function
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Show previous image
    function showPrevImage() {
        // Add swipe animation
        lightboxContent.classList.add('swipe-right');
        
        setTimeout(() => {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightboxContent();
            
            // Add incoming animation
            lightboxContent.classList.remove('swipe-right');
            lightboxContent.classList.add('swipe-new-right');
            
            setTimeout(() => {
                lightboxContent.classList.remove('swipe-new-right');
            }, 300);
        }, 200);
    }
    
    // Show next image
    function showNextImage() {
        // Add swipe animation
        lightboxContent.classList.add('swipe-left');
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateLightboxContent();
            
            // Add incoming animation
            lightboxContent.classList.remove('swipe-left');
            lightboxContent.classList.add('swipe-new-left');
            
            setTimeout(() => {
                lightboxContent.classList.remove('swipe-new-left');
            }, 300);
        }, 200);
    }
    
    // Update lightbox content
    function updateLightboxContent() {
        const currentImg = galleryItems[currentIndex];
        lightboxImage.src = currentImg.src;
        lightboxCaption.textContent = currentImg.alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
    }
    
    // Check if device is mobile
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Check if device likely has a trackpad
    function isTrackpadDevice() {
        return /Macintosh|MacIntel|MacPPC|Mac68K|Mac|MacBook|MacBook Pro|MacBook Air/i.test(navigator.userAgent) ||
               /Windows NT|Win32|Win64|Windows/i.test(navigator.userAgent);
    }
}

// Image gallery lazy loading and animation
window.addEventListener('load', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    galleryItems.forEach(item => {
        // Add animation class
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Add hover effect to indicate clickability
        const img = item.querySelector('img');
        if (img) {
            img.style.cursor = 'pointer';
            
            // Create and append overlay with zoom icon
            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            overlay.innerHTML = '';
            item.appendChild(overlay);
        }
        
        // Observe the item
        observer.observe(item);
    });
    
    // Add CSS for the fadeIn animation and gallery overlays
    const style = document.createElement('style');
    style.textContent = `
        .fadeIn {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .gallery-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s;
            color: white;
            font-size: 24px;
        }
        
        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// Add parallax scrolling effect to sections
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    document.querySelectorAll('section').forEach(section => {
        const offset = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrollPosition >= offset - window.innerHeight && scrollPosition < offset + height) {
            const speed = section.getAttribute('data-speed') || 0.2;
            const yPos = -(scrollPosition - offset) * speed;
            
            section.style.backgroundPositionY = yPos + 'px';
        }
    });
}); 