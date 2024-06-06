const bgDiv = document.getElementById('background');

let isDragging = false;
let lastX, lastY;

bgDiv.addEventListener('mouseenter', (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    bgDiv.style.cursor = 'grabbing';
});

bgDiv.addEventListener('mouseleave', () => {
    isDragging = false;
    bgDiv.style.cursor = 'grab';
});

bgDiv.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const walkX = e.clientX - lastX;
    const walkY = e.clientY - lastY;
    window.scrollBy(-walkX, -walkY);
    lastX = e.clientX;
    lastY = e.clientY;
});
