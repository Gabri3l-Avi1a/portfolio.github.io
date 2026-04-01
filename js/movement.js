const movableImage = document.getElementById('movableImage');
const keys = {};
const speed= 8
document.addEventListener('keydown', (event) => {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key.toLowerCase()] = false;
});

function moveImage() {
    if (keys['w']) {
        movableImage.style.top = `${movableImage.offsetTop - speed}px`;
    }
    if (keys['s']) {
        movableImage.style.top = `${movableImage.offsetTop + speed}px`;
    }
    if (keys['a']) {
        movableImage.style.left = `${movableImage.offsetLeft - speed}px`;
    }
    if (keys['d']) {
        movableImage.style.left = `${movableImage.offsetLeft + speed}px`;
    }
    requestAnimationFrame(moveImage);
}

moveImage();
