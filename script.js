document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const body = document.body;
    const colorOptions = document.querySelectorAll('.color-option');
    const animationButtons = document.querySelectorAll('.animation-btn');
    const demoElement = document.getElementById('demo-element');
    const resetButton = document.getElementById('reset-btn');
    
    // Load saved preferences from localStorage
    loadPreferences();
    
    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Apply theme to body
            const color = this.dataset.color;
            body.className = color;
            
            // Save to localStorage
            localStorage.setItem('themeColor', color);
        });
    });
    
    // Animation selection
    animationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons
            animationButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Remove all animation classes from demo element
            demoElement.classList.remove(
                'bounce-animation',
                'pulse-animation',
                'rotate-animation',
                'shake-animation'
            );
            
            // Apply selected animation
            const animation = this.dataset.animation;
            demoElement.classList.add(`${animation}-animation`);
            
            // Save to localStorage
            localStorage.setItem('selectedAnimation', animation);
        });
    });
    
    // Demo element click - trigger animation
    demoElement.addEventListener('click', function() {
        // Add a temporary "active" class for click effect
        this.classList.add('active');
        
        // Remove after animation completes
        setTimeout(() => {
            this.classList.remove('active');
        }, 300);
    });
    
    // Reset preferences
    resetButton.addEventListener('click', function() {
        // Clear localStorage
        localStorage.removeItem('themeColor');
        localStorage.removeItem('selectedAnimation');
        
        // Reset UI
        body.className = '';
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        animationButtons.forEach(btn => btn.classList.remove('selected'));
        demoElement.className = 'demo-element';
        
        // Apply default animation
        demoElement.classList.add('pulse-animation');
    });
    
    // Function to load saved preferences
    function loadPreferences() {
        // Load theme color
        const savedColor = localStorage.getItem('themeColor');
        if (savedColor) {
            body.className = savedColor;
            document.querySelector(`.color-option.${savedColor}`).classList.add('selected');
        }
        
        // Load animation
        const savedAnimation = localStorage.getItem('selectedAnimation');
        if (savedAnimation) {
            demoElement.classList.add(`${savedAnimation}-animation`);
            document.querySelector(`.animation-btn[data-animation="${savedAnimation}"]`).classList.add('selected');
        } else {
            // Default animation if none saved
            demoElement.classList.add('pulse-animation');
        }
    }
});