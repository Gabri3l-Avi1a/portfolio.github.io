const movableImage = document.getElementById('movableImage');

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w': 
            movableImage.style.top = `${movableImage.offsetTop - 10}px`;
            break;
        case 's': 
            movableImage.style.top = `${movableImage.offsetTop + 10}px`;
            break;
        case 'a': 
            movableImage.style.left = `${movableImage.offsetLeft - 10}px`;
            break;
        case 'd': 
            movableImage.style.left = `${movableImage.offsetLeft + 10}px`;
            break;
    }
});
