// drag.js

document.addEventListener("DOMContentLoaded", function () {
    const background = document.getElementById("background");

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    // Ensure the background is positioned correctly initially
    const initializePosition = () => {
        background.style.position = 'absolute';
        background.style.left = '0px';
        background.style.top = '0px';
    };

    initializePosition();

    background.addEventListener("mousedown", function (e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = background.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        document.body.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            background.style.left = initialLeft + dx + "px";
            background.style.top = initialTop + dy + "px";
        }
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
        document.body.style.cursor = "default";
    });

    document.addEventListener("mouseleave", function () {
        isDragging = false;
        document.body.style.cursor = "default";
    });
});
