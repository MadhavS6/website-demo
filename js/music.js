/**
 * Background Music Player for Shrawani's Birthday Website
 * Adds a music player with play/pause functionality and volume control
 */

class BackgroundMusic {
    constructor(options = {}) {
        this.musicUrl = options.musicUrl || 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e9124091.mp3';
        this.autoplay = options.autoplay !== undefined ? options.autoplay : false;
        this.loop = options.loop !== undefined ? options.loop : true;
        this.volume = options.volume || 0.5;
        
        this.isPlaying = false;
        this.isInitialized = false;
        
        // Create audio element
        this.audio = new Audio(this.musicUrl);
        this.audio.loop = this.loop;
        this.audio.volume = this.volume;
        
        // Create music control UI
        this.createMusicControls();
        
        // Initialize once user interacted with the page
        this.setupInitialization();
    }
    
    createMusicControls() {
        // Create music control container
        const container = document.createElement('div');
        container.className = 'music-control';
        
        // Create toggle button
        this.toggleButton = document.createElement('button');
        this.toggleButton.className = 'music-toggle';
        this.toggleButton.innerHTML = '<i class="fas fa-music"></i>';
        this.toggleButton.addEventListener('click', () => this.toggleMusic());
        
        // Create volume control
        this.volumeControl = document.createElement('input');
        this.volumeControl.type = 'range';
        this.volumeControl.className = 'music-volume';
        this.volumeControl.min = 0;
        this.volumeControl.max = 1;
        this.volumeControl.step = 0.1;
        this.volumeControl.value = this.volume;
        this.volumeControl.addEventListener('input', (e) => {
            this.setVolume(parseFloat(e.target.value));
        });
        
        // Create volume icon
        this.volumeIcon = document.createElement('span');
        this.volumeIcon.className = 'volume-icon';
        this.volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
        
        // Add elements to container
        container.appendChild(this.toggleButton);
        
        // Create controls wrapper
        const controlsWrapper = document.createElement('div');
        controlsWrapper.className = 'music-controls-wrapper';
        controlsWrapper.appendChild(this.volumeIcon);
        controlsWrapper.appendChild(this.volumeControl);
        
        container.appendChild(controlsWrapper);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .music-control {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 50px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                padding: 10px;
                display: flex;
                align-items: center;
                z-index: 1000;
                transition: all 0.3s;
                width: 50px;
                overflow: hidden;
            }
            
            .music-control:hover {
                width: 200px;
            }
            
            .music-toggle {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: var(--primary-color);
                border: none;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                outline: none;
                flex-shrink: 0;
                margin-right: 10px;
                transition: all 0.3s;
            }
            
            .music-toggle.playing {
                background-color: var(--accent-color);
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .music-controls-wrapper {
                display: flex;
                align-items: center;
                overflow: hidden;
                width: 150px;
            }
            
            .music-volume {
                width: 100px;
                margin: 0 5px;
                -webkit-appearance: none;
                height: 4px;
                background: var(--primary-color);
                border-radius: 10px;
                outline: none;
            }
            
            .music-volume::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: var(--primary-color);
                cursor: pointer;
            }
            
            .music-volume::-moz-range-thumb {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: var(--primary-color);
                cursor: pointer;
                border: none;
            }
            
            .volume-icon {
                color: var(--primary-color);
                font-size: 14px;
                width: 20px;
                text-align: center;
            }
            
            .now-playing {
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(255, 255, 255, 0.9);
                padding: 10px 20px;
                border-radius: 50px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.5s;
                pointer-events: none;
            }
            
            .now-playing.show {
                opacity: 1;
                animation: fadeInOut 5s forwards;
            }
            
            @keyframes fadeInOut {
                0% { opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Add the container to document body
        document.body.appendChild(container);
        
        // Create now playing notification
        this.nowPlaying = document.createElement('div');
        this.nowPlaying.className = 'now-playing';
        this.nowPlaying.textContent = '🎵 Now playing: Happy Birthday Song';
        document.body.appendChild(this.nowPlaying);
    }
    
    setupInitialization() {
        // List of events that indicate user interaction
        const interactionEvents = ['click', 'touchstart', 'keydown'];
        
        const initializeOnInteraction = () => {
            if (!this.isInitialized) {
                this.isInitialized = true;
                
                // If autoplay is enabled, start playing music
                if (this.autoplay) {
                    this.playMusic();
                }
                
                // Remove event listeners once initialized
                interactionEvents.forEach(event => {
                    document.removeEventListener(event, initializeOnInteraction);
                });
            }
        };
        
        // Add event listeners for user interaction
        interactionEvents.forEach(event => {
            document.addEventListener(event, initializeOnInteraction);
        });
    }
    
    playMusic() {
        try {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.toggleButton.classList.add('playing');
                this.showNowPlaying();
            }).catch(error => {
                console.error('Playback failed:', error);
            });
        } catch (error) {
            console.error('Playback failed:', error);
        }
    }
    
    pauseMusic() {
        this.audio.pause();
        this.isPlaying = false;
        this.toggleButton.classList.remove('playing');
    }
    
    toggleMusic() {
        if (this.isPlaying) {
            this.pauseMusic();
        } else {
            this.playMusic();
        }
    }
    
    setVolume(volume) {
        this.volume = volume;
        this.audio.volume = volume;
        
        // Update volume icon
        if (volume === 0) {
            this.volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (volume < 0.5) {
            this.volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            this.volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
    
    showNowPlaying() {
        this.nowPlaying.classList.add('show');
        
        setTimeout(() => {
            this.nowPlaying.classList.remove('show');
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create background music player
    window.birthdayMusic = new BackgroundMusic({
        musicUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e9124091.mp3',
        autoplay: false,
        loop: true,
        volume: 0.5
    });
}); 