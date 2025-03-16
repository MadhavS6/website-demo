/**
 * Fireworks Animation for Shrawani's Birthday Website
 * Creates a beautiful fireworks effect that can be triggered 
 * on page load or on specific events.
 */

class Fireworks {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasId;
            this.canvas.className = 'fireworks-canvas';
            document.body.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.fireworks = [];
        this.mouse = { x: 0, y: 0 };
        this.hue = 120;
        this.isRunning = false;
        
        // Set canvas to full screen
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .fireworks-canvas {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;  /* Changed to negative so it stays behind content */
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
        
        // Track mouse position for targeted fireworks
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        document.addEventListener('click', (e) => {
            if (this.isRunning) {
                this.createFirework(e.clientX, e.clientY);
            }
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    start() {
        this.isRunning = true;
        this.animate();
        
        // Auto create fireworks
        this.autoCreateInterval = setInterval(() => {
            this.createRandomFirework();
        }, 800);
    }
    
    stop() {
        this.isRunning = false;
        clearInterval(this.autoCreateInterval);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.fireworks = [];
        this.particles = [];
    }
    
    createFirework(x, y, isRandom = false) {
        // Starting point for the firework
        const startX = this.canvas.width / 2;
        const startY = this.canvas.height;
        
        // Use provided coordinates or random ones
        const targetX = x || Math.random() * this.canvas.width;
        const targetY = y || Math.random() * this.canvas.height / 2;
        
        // Create and add the firework
        const firework = {
            x: startX,
            y: startY,
            targetX: targetX,
            targetY: targetY,
            speed: 2 + Math.random() * 3,
            angle: Math.atan2(targetY - startY, targetX - startX),
            hue: this.hue + Math.random() * 50 - 25,
            brightness: 50 + Math.random() * 20,
            alpha: 1,
            radius: 2 + Math.random() * 2,
            trail: []
        };
        
        this.fireworks.push(firework);
        this.hue += 10;
    }
    
    createRandomFirework() {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height * 0.5;
        this.createFirework(x, y, true);
    }
    
    createParticles(x, y, hue) {
        const particleCount = 50 + Math.floor(Math.random() * 30);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = {
                x: x,
                y: y,
                speed: 1 + Math.random() * 5,
                angle: Math.random() * Math.PI * 2,
                friction: 0.95,
                gravity: 0.2,
                hue: hue + Math.random() * 50 - 25,
                brightness: 50 + Math.random() * 30,
                alpha: 1,
                decay: 0.015 + Math.random() * 0.03,
                radius: 1 + Math.random() * 2
            };
            
            this.particles.push(particle);
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        requestAnimationFrame(() => this.animate());
        
        // Clear canvas with fully transparent background instead of dark
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw fireworks
        this.updateFireworks();
        this.updateParticles();
    }
    
    updateFireworks() {
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const firework = this.fireworks[i];
            
            // Update position based on angle and speed
            firework.x += Math.cos(firework.angle) * firework.speed;
            firework.y += Math.sin(firework.angle) * firework.speed;
            
            // Store trail point
            firework.trail.push({ x: firework.x, y: firework.y, alpha: firework.alpha });
            
            // Limit trail length
            if (firework.trail.length > 10) {
                firework.trail.shift();
            }
            
            // Draw trail
            this.ctx.beginPath();
            for (let j = 0; j < firework.trail.length; j++) {
                const point = firework.trail[j];
                this.ctx.lineWidth = firework.radius * (j / firework.trail.length);
                this.ctx.strokeStyle = `hsla(${firework.hue}, 100%, ${firework.brightness}%, ${point.alpha})`;
                
                if (j === 0) {
                    this.ctx.moveTo(point.x, point.y);
                } else {
                    this.ctx.lineTo(point.x, point.y);
                }
            }
            this.ctx.stroke();
            
            // Check if reached target
            const distanceToTarget = Math.sqrt(
                Math.pow(firework.targetX - firework.x, 2) + 
                Math.pow(firework.targetY - firework.y, 2)
            );
            
            if (distanceToTarget < 5 || firework.y < 50) {
                // Create explosion
                this.createParticles(firework.x, firework.y, firework.hue);
                
                // Remove the firework
                this.fireworks.splice(i, 1);
            }
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position based on angle and speed
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed + particle.gravity;
            
            // Apply friction to slow down
            particle.speed *= particle.friction;
            
            // Reduce alpha (fade out)
            particle.alpha -= particle.decay;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 100%, ${particle.brightness}%, ${particle.alpha})`;
            this.ctx.fill();
            
            // Remove if faded out
            if (particle.alpha <= particle.decay) {
                this.particles.splice(i, 1);
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create fireworks instance but don't start automatically
    window.birthdayFireworks = new Fireworks('fireworks-canvas');
    
    // Remove automatic startup of fireworks
}); 