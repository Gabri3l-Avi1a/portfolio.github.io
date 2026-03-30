const square = document.getElementById('square');
let x = window.innerWidth / 2 - 50;
let y = window.innerHeight / 2 - 50;
const speed = 20;

square.style.left = x + 'px';
square.style.top = y + 'px';

const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

function update() {
  if (keys['w']) y -= speed;
  if (keys['a']) x -= speed;
  if (keys['s']) y += speed;
  if (keys['d']) x += speed;

  square.style.left = x + 'px';
  square.style.top = y + 'px';

  requestAnimationFrame(update);
}

update();