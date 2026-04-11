const movableImage = document.getElementById('movableImage');
const imageElement = movableImage.querySelector('img');
const keys = {};
const speed = 8;

// Animation frame configuration
let currentDirection = 'forward'; // 'forward', 'backward', 'left', 'right'
let animationFrame = 0;
let animationSpeed = 5;
let frameCounter = 0;

// Character sprite paths
const characterAnimations = {
  forward: [
    'assets/characters/player/forward/f_neutral.png',
    'assets/characters/player/forward/f_walk_1.png',
    'assets/characters/player/forward/f_walk_2.png'
  ],
  backward: [
    'assets/characters/player/backward/b_neutral.png',
    'assets/characters/player/backward/b_walk_1.png',
    'assets/characters/player/backward/b_walk_2.png'
  ],
  left: [
    'assets/characters/player/left/l_neutral.png',
    'assets/characters/player/left/l_walk_1.png',
    'assets/characters/player/left/l_walk_2.png'
  ],
  right: [
    'assets/characters/player/right/r_neutral.png',
    'assets/characters/player/right/r_walk_1.png',
    'assets/characters/player/right/r_walk_2.png'
  ]
};

// Boundary system
class Boundary {
  constructor(name, type, bounds) {
    this.name = name;
    this.type = type; // 'rectangle', 'circle', 'polygon'
    this.bounds = bounds;
    this.uncrossable = true;
  }
}

// Define all boundaries
const boundaries = [
  // Horizontal path boundary (example)
  new Boundary('horizontalPath', 'rectangle', {
    left: (window.innerWidth - 200) / 2,
    right: (window.innerWidth - 200) / 2 + 200,
    top: window.innerHeight / 2 - 50,
    bottom: window.innerHeight / 2 + 50
  })
];

// Check if new position crosses any uncrossable boundary
function isPositionValid(x, y, width, height) {
  for (let boundary of boundaries) {
    if (!boundary.uncrossable) continue;

    if (boundary.type === 'rectangle') {
      // Check all four boundaries
      const charRight = x + width;
      const charBottom = y + height;

      // Left boundary
      if (x < boundary.bounds.left && charRight > boundary.bounds.left) {
        return false;
      }
      // Right boundary
      if (x < boundary.bounds.right && charRight > boundary.bounds.right) {
        return false;
      }
      // Top boundary
      if (y < boundary.bounds.top && charBottom > boundary.bounds.top) {
        return false;
      }
      // Bottom boundary
      if (y < boundary.bounds.bottom && charBottom > boundary.bounds.bottom) {
        return false;
      }
    }

    if (boundary.type === 'circle') {
      const charCenterX = x + width / 2;
      const charCenterY = y + height / 2;
      const dist = Math.hypot(
        charCenterX - boundary.bounds.centerX,
        charCenterY - boundary.bounds.centerY
      );
      const charRadius = Math.max(width, height) / 2;
      
      if (dist + charRadius > boundary.bounds.radius) {
        return false;
      }
    }

    if (boundary.type === 'polygon') {
      // Point-in-polygon check (simplified)
      const charCenterX = x + width / 2;
      const charCenterY = y + height / 2;
      
      if (isPointInPolygon(charCenterX, charCenterY, boundary.bounds.points)) {
        return false;
      }
    }
  }

  return true;
}

// Utility: Point-in-polygon collision detection
function isPointInPolygon(x, y, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x,
      yi = points[i].y;
    const xj = points[j].x,
      yj = points[j].y;

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function updateAnimation(direction) {
  if (direction !== currentDirection) {
    currentDirection = direction;
    animationFrame = 0;
  }

  frameCounter++;
  if (frameCounter >= animationSpeed) {
    frameCounter = 0;
    animationFrame = (animationFrame + 1) % characterAnimations[direction].length;
  }

  imageElement.src = characterAnimations[direction][animationFrame];
}

function moveImage() {
  let isMoving = false;
  let newLeft = movableImage.offsetLeft;
  let newTop = movableImage.offsetTop;

  const charWidth = movableImage.offsetWidth;
  const charHeight = movableImage.offsetHeight;

  // Horizontal movement
  if (keys['a']) {
    const testLeft = movableImage.offsetLeft - speed;
    if (isPositionValid(testLeft, newTop, charWidth, charHeight)) {
      newLeft = testLeft;
      updateAnimation('left');
      isMoving = true;
    }
  } else if (keys['d']) {
    const testLeft = movableImage.offsetLeft + speed;
    if (isPositionValid(testLeft, newTop, charWidth, charHeight)) {
      newLeft = testLeft;
      updateAnimation('right');
      isMoving = true;
    }
  }

  // Vertical movement
  if (keys['w']) {
    const testTop = movableImage.offsetTop - speed;
    if (isPositionValid(newLeft, testTop, charWidth, charHeight)) {
      newTop = testTop;
      updateAnimation('backward');
      isMoving = true;
    }
  } else if (keys['s']) {
    const testTop = movableImage.offsetTop + speed;
    if (isPositionValid(newLeft, testTop, charWidth, charHeight)) {
      newTop = testTop;
      updateAnimation('forward');
      isMoving = true;
    }
  }

  movableImage.style.left = `${newLeft}px`;
  movableImage.style.top = `${newTop}px`;

  // Return to neutral if not moving
  if (!isMoving) {
    updateAnimation('forward');
  }

  requestAnimationFrame(moveImage);
}

moveImage();
