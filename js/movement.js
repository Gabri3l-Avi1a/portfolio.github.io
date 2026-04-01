const movableImage = document.getElementById('movableImage');
const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key.toLowerCase()] = false;
});

function moveImage() {
    if (keys['w']) {
        movableImage.style.top = `${movableImage.offsetTop - 10}px`;
    }
    if (keys['s']) {
        movableImage.style.top = `${movableImage.offsetTop + 10}px`;
    }
    if (keys['a']) {
        movableImage.style.left = `${movableImage.offsetLeft - 10}px`;
    }
    if (keys['d']) {
        movableImage.style.left = `${movableImage.offsetLeft + 10}px`;
    }
    requestAnimationFrame(moveImage);
}

moveImage();
