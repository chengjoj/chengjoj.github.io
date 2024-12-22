let velocity = 1; // Initial speed
const logo = document.getElementById('logo');
const resetButton = document.getElementById('reset-button');
const audio = new Audio('path_to_your_audio.mp3');

// Function to move the logo in a figure-8 pattern
function moveLogo() {
    const logoContainer = document.getElementById('logo-container');
    const maxX = logoContainer.offsetWidth;
    const maxY = logoContainer.offsetHeight;
    const x = Math.sin(Date.now() / 500) * maxX / 2;
    const y = Math.cos(Date.now() / 500) * maxY / 2;
    logo.style.transform = `translate(${x}px, ${y}px)`;
}

// Function to increase the speed and play audio on click
logo.onclick = function() {
    velocity += 0.1; // Increase speed
    logo.style.transition = `transform ${velocity}s`;
    audio.play(); // Play audio
};

// Function to reset the logo position and velocity
resetButton.onclick = function() {
    velocity = 1; // Reset speed
    logo.style.transition = `transform ${velocity}s`;
    logo.style.transform = 'translate(-50%, -50%)';
};

// Call the moveLogo function periodically to move the logo
setInterval(moveLogo, 16); // Adjust the interval to control the smoothness of the movement
