/**
 * Interactive Birthday Card for Shrawani's Birthday Website
 * Creates a 3D-effect birthday card that users can open and interact with
 */

class BirthdayCard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Birthday card container not found');
            return;
        }
        
        this.isOpen = false;
        this.createCard();
        this.addEventListeners();
    }
    
    createCard() {
        // Clear container
        this.container.innerHTML = '';
        this.container.className = 'birthday-card-container';
        
        // Create card elements
        this.card = document.createElement('div');
        this.card.className = 'birthday-card';
        
        // Create front of the card
        this.cardFront = document.createElement('div');
        this.cardFront.className = 'card-front';
        this.cardFront.innerHTML = `
            <div class="card-decoration"></div>
            <h2>Happy Birthday Shrawani!</h2>
            <p>Click to open</p>
            <div class="sparkle sparkle-1"></div>
            <div class="sparkle sparkle-2"></div>
            <div class="sparkle sparkle-3"></div>
        `;
        
        // Create inside of the card
        this.cardInside = document.createElement('div');
        this.cardInside.className = 'card-inside';
        this.cardInside.innerHTML = `
            <div class="card-inside-left">
                <h3>Dear Shrawani,</h3>
                <p>On your special day, I wish you a year filled with joy, love, health, and success. May all your dreams and wishes come true!</p>
                <p>Many happy returns of the day!</p>
                <p class="signature">With love,<br>Your Friends & Family</p>
                <div class="card-decoration bottom-deco"></div>
            </div>
            <div class="card-inside-right">
                <div class="gift">
                    <div class="gift-top"></div>
                    <div class="gift-box"></div>
                    <div class="gift-ribbon"></div>
                    <div class="gift-tag">For You!</div>
                </div>
                <div class="message-bubble">Click the gift!</div>
            </div>
        `;
        
        // Add elements to the card
        this.card.appendChild(this.cardFront);
        this.card.appendChild(this.cardInside);
        this.container.appendChild(this.card);
        
        // Add styles
        this.addCardStyles();
    }
    
    addCardStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .birthday-card-container {
                position: relative;
                width: 100%;
                max-width: 800px;
                height: 500px;
                margin: 0 auto;
                perspective: 1500px;
            }
            
            .birthday-card {
                position: relative;
                width: 100%;
                height: 100%;
                transition: transform 1s;
                transform-style: preserve-3d;
                cursor: pointer;
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            }
            
            .birthday-card.open {
                transform: rotateY(-180deg);
            }
            
            .card-front, .card-inside {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 20px;
                backface-visibility: hidden;
                overflow: hidden;
            }
            
            .card-front {
                background: linear-gradient(135deg, #ff85a2, #ff9db6);
                color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                z-index: 2;
                font-family: 'Dancing Script', cursive;
            }
            
            .card-front h2 {
                font-size: 3rem;
                margin-bottom: 10px;
                text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
            }
            
            .card-front p {
                font-size: 1.2rem;
                margin-top: 20px;
                animation: pulse 2s infinite;
            }
            
            .card-decoration {
                position: absolute;
                width: 120%;
                height: 120px;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23ffffff" fill-opacity="0.2"/></svg>');
                background-size: 100px;
                transform: rotate(-10deg);
                top: 20px;
                left: -10%;
                opacity: 0.7;
            }
            
            .bottom-deco {
                top: auto;
                bottom: 20px;
                transform: rotate(10deg);
            }
            
            .sparkle {
                position: absolute;
                width: 20px;
                height: 20px;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><polygon points="16,0 19,12 32,16 19,20 16,32 13,20 0,16 13,12" fill="%23ffffff"/></svg>');
                background-size: contain;
                animation: twinkle 1.5s infinite;
            }
            
            .sparkle-1 {
                top: 20%;
                left: 20%;
                animation-delay: 0s;
            }
            
            .sparkle-2 {
                top: 30%;
                right: 20%;
                animation-delay: 0.5s;
            }
            
            .sparkle-3 {
                bottom: 30%;
                left: 30%;
                animation-delay: 1s;
            }
            
            @keyframes twinkle {
                0% { transform: scale(1) rotate(0deg); opacity: 0.3; }
                50% { transform: scale(1.5) rotate(45deg); opacity: 1; }
                100% { transform: scale(1) rotate(90deg); opacity: 0.3; }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .card-inside {
                background: white;
                transform: rotateY(180deg);
                display: flex;
                padding: 30px;
            }
            
            .card-inside-left {
                flex: 1;
                padding: 20px;
                border-right: 2px dashed #ffd3de;
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: relative;
                overflow: hidden;
            }
            
            .card-inside-left h3 {
                font-family: 'Dancing Script', cursive;
                font-size: 2rem;
                color: var(--primary-color);
                margin-bottom: 20px;
            }
            
            .card-inside-left p {
                margin-bottom: 15px;
                font-size: 1rem;
                line-height: 1.6;
                color: #555;
            }
            
            .signature {
                font-family: 'Dancing Script', cursive;
                font-size: 1.5rem;
                color: var(--primary-color);
                margin-top: 20px;
            }
            
            .card-inside-right {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
            }
            
            .gift {
                width: 120px;
                height: 120px;
                position: relative;
                cursor: pointer;
                transform-style: preserve-3d;
                transition: transform 0.5s;
            }
            
            .gift:hover {
                transform: scale(1.1) rotate(-5deg);
            }
            
            .gift-box {
                position: absolute;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--accent-color), #ffd787);
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .gift-top {
                position: absolute;
                width: 120%;
                height: 30px;
                background: linear-gradient(135deg, var(--accent-color), #ffd787);
                border-radius: 10px;
                top: -15px;
                left: -10%;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                z-index: 1;
            }
            
            .gift-ribbon {
                position: absolute;
                width: 20px;
                height: 140%;
                background: var(--primary-color);
                top: -20%;
                left: calc(50% - 10px);
                z-index: 2;
            }
            
            .gift-ribbon:before {
                content: '';
                position: absolute;
                width: 140%;
                height: 20px;
                background: var(--primary-color);
                top: 30px;
                left: -20%;
                z-index: 3;
            }
            
            .gift-tag {
                position: absolute;
                right: -30px;
                top: 10px;
                background: white;
                padding: 5px 10px;
                border-radius: 15px;
                transform: rotate(15deg);
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                font-family: 'Dancing Script', cursive;
                color: var(--primary-color);
                font-size: 0.9rem;
                z-index: 4;
            }
            
            .message-bubble {
                position: absolute;
                top: -40px;
                background: white;
                padding: 10px 15px;
                border-radius: 20px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                font-size: 0.9rem;
                visibility: hidden;
                opacity: 0;
                transition: all 0.3s;
            }
            
            .message-bubble:after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                border-width: 10px 8px 0 8px;
                border-style: solid;
                border-color: white transparent transparent transparent;
            }
            
            .gift:hover + .message-bubble {
                visibility: visible;
                opacity: 1;
                top: -55px;
            }
            
            @media (max-width: 768px) {
                .birthday-card-container {
                    height: 400px;
                }
                
                .card-inside {
                    flex-direction: column;
                    padding: 15px;
                }
                
                .card-inside-left {
                    border-right: none;
                    border-bottom: 2px dashed #ffd3de;
                    padding: 15px;
                }
                
                .card-inside-left h3 {
                    font-size: 1.5rem;
                    margin-bottom: 10px;
                }
                
                .card-inside-left p {
                    font-size: 0.9rem;
                    margin-bottom: 10px;
                }
                
                .signature {
                    font-size: 1.2rem;
                    margin-top: 10px;
                }
                
                .card-inside-right {
                    padding-top: 15px;
                }
                
                .gift {
                    width: 80px;
                    height: 80px;
                }
                
                .gift-top {
                    height: 20px;
                    top: -10px;
                }
                
                .gift-ribbon {
                    width: 15px;
                    left: calc(50% - 7.5px);
                }
                
                .gift-ribbon:before {
                    height: 15px;
                    top: 20px;
                }
                
                .gift-tag {
                    right: -20px;
                    font-size: 0.8rem;
                    padding: 3px 8px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    addEventListeners() {
        // Toggle card open/close state
        this.card.addEventListener('click', (e) => {
            if (!e.target.closest('.gift')) {
                this.toggleCard();
            }
        });
        
        // Add gift click handler
        const gift = this.card.querySelector('.gift');
        if (gift) {
            gift.addEventListener('click', () => {
                this.openGift();
            });
        }
    }
    
    toggleCard() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.card.classList.add('open');
        } else {
            this.card.classList.remove('open');
        }
    }
    
    openGift() {
        // Show surprise message
        const surpriseModal = document.createElement('div');
        surpriseModal.className = 'surprise-modal';
        surpriseModal.innerHTML = `
            <div class="surprise-content">
                <h3>Surprise!</h3>
                <p>Happy Birthday to the most amazing person! Wishing you all the happiness and joy today and always!</p>
                <div class="surprise-emoji">🎂 🎁 🎉 🥳 🎈</div>
                <button class="surprise-close">Close</button>
            </div>
        `;
        document.body.appendChild(surpriseModal);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .surprise-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s forwards;
            }
            
            .surprise-content {
                background: white;
                padding: 30px;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                transform: scale(0.9);
                animation: zoomIn 0.5s forwards;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            }
            
            .surprise-content h3 {
                font-family: 'Dancing Script', cursive;
                font-size: 2rem;
                color: var(--primary-color);
                margin-bottom: 15px;
            }
            
            .surprise-content p {
                margin-bottom: 20px;
                font-size: 1.1rem;
                line-height: 1.6;
                color: #555;
            }
            
            .surprise-emoji {
                font-size: 2rem;
                margin: 20px 0;
                animation: bounce 1s infinite alternate;
            }
            
            .surprise-close {
                background-color: var(--primary-color);
                color: white;
                border: none;
                padding: 10px 25px;
                border-radius: 50px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s;
                margin-top: 10px;
            }
            
            .surprise-close:hover {
                background-color: var(--secondary-color);
                transform: translateY(-3px);
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes zoomIn {
                from { transform: scale(0.5); }
                to { transform: scale(1); }
            }
            
            @keyframes bounce {
                from { transform: translateY(0); }
                to { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
        
        // Launch confetti
        if (typeof launchConfetti === 'function') {
            launchConfetti();
        }
        
        // Start fireworks
        if (window.birthdayFireworks) {
            window.birthdayFireworks.start();
        }
        
        // Play music
        if (window.birthdayMusic && !window.birthdayMusic.isPlaying) {
            window.birthdayMusic.playMusic();
        }
        
        // Close button handler
        const closeButton = surpriseModal.querySelector('.surprise-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                document.body.removeChild(surpriseModal);
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create birthday card
    setTimeout(() => {
        if (document.getElementById('birthday-card-container')) {
            window.birthdayCard = new BirthdayCard('birthday-card-container');
        }
    }, 1000);
}); 