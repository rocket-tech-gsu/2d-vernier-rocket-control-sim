const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Function to load your sprite image
function loadImage(src) {
  const image = new Image();
  return new Promise((resolve) => {
    image.onload = () => resolve(image);
    image.src = src;
  });
}

// Assuming you have a sprite image 'mySprite.png'
let spriteImage;
loadImage('mySprite.jpg').then(image => {
  spriteImage = image;
  startRenderLoop();
});

// Sprite data
let sprite = {
    x: canvas.width / 2,   // Initial center x-coordinate
    y: canvas.height / 2,  // Initial center y-coordinate
    heading: 0,            // Heading angle in radians
    speed: 2               // Pixels to move per frame
};

function startRenderLoop() {
  // Set the canvas dimensions to the window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let lastTime = performance.now();

  function render() {
    const now = performance.now();
    const deltaTime = (now - lastTime) / 1000; // Time in seconds
    lastTime = now;

    update(deltaTime);
    draw();

    requestAnimationFrame(render); 
  }

  requestAnimationFrame(render); 
}

const keyStates = {
    left: false,
    up: false,
    right: false,
    down: false
};

function handleKeyDown(event) {
    switch (event.key) {
        case 'ArrowLeft':  keyStates.left = true;  break;
        case 'ArrowUp':    keyStates.up = true;    break;
        case 'ArrowRight': keyStates.right = true; break;
        case 'ArrowDown':  keyStates.down = true;  break;
    }
}

function handleKeyUp(event) {
    switch (event.key) {
        case 'ArrowLeft':  keyStates.left = false;  break;
        case 'ArrowUp':    keyStates.up = false;    break;
        case 'ArrowRight': keyStates.right = false; break;
        case 'ArrowDown':  keyStates.down = false;  break;
    }
}

// Attach event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function update(deltaTime) {
  // Example movement controls
  if (keyStates.left) {
    sprite.heading -= 0.1; // Adjust for desired rotation speed
  }
  if (keyStates.right) {
    sprite.heading += 0.1;
  }
  if (keyStates.up) {
    sprite.x += sprite.speed * Math.cos(sprite.heading);
    sprite.y += sprite.speed * Math.sin(sprite.heading);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Save canvas state
  ctx.save();

  // Translate and rotate based on center
  ctx.translate(sprite.x, sprite.y);
  ctx.rotate(sprite.heading);

  // Draw sprite (offset to center on 0, 0)
  ctx.drawImage(spriteImage, -spriteImage.width / 2, -spriteImage.height / 2);

  // Restore canvas state
  ctx.restore(); 
}
