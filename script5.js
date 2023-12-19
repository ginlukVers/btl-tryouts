const frameElement = document.getElementById('frame');
const startButton = document.getElementById('start-button');
const totalFrames = 249;
const initialAnimationFrames = 28;
const documentHeight = 10000; // Height for the whole scrollable document
let currentFrame = 0;
let scrollAnimationEnabled = false;
const frameRate = 1000 / 30; // 30 FPS
const scrollAnimationDuration = 5000; // Scroll animation duration in milliseconds


function updateFrame(frameIndex) {
    frameElement.src = `/Users/dz382/Documents/GitHub/Versuni/btl-tryouts/homepage-assets/home-entrance-desktop${frameIndex.toString().padStart(3, '0')}.jpg`;
}

// Initial animation from frame 1 to 28
const initialAnimationInterval = setInterval(() => {
    if (currentFrame < initialAnimationFrames) {
        updateFrame(currentFrame);
        currentFrame++;
    } else {
        clearInterval(initialAnimationInterval);
        // Set the current frame to 28 after the initial animation
        currentFrame = initialAnimationFrames - 1;
        scrollAnimationEnabled = true;
        startButton.style.display = 'block'; // Show the button
    }
}, frameRate);

window.addEventListener('scroll', () => {
    if (!scrollAnimationEnabled) return;

    const scrollFraction = (window.pageYOffset + (documentHeight / totalFrames * initialAnimationFrames)) / (documentHeight - window.innerHeight);
    const frameIndex = Math.min(
        Math.floor(scrollFraction * totalFrames),
        totalFrames - 1
    );
    updateFrame(frameIndex);
});

startButton.addEventListener('click', function() {
    document.body.style.height = `${documentHeight}px`;

    // Start smooth scrolling from the current position
    const endScrollPosition = (documentHeight / totalFrames) * (totalFrames - 1);
    smoothScrollTo(endScrollPosition, scrollAnimationDuration);
});

// Custom smooth scroll function
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        const adjustedRun = run + (documentHeight / totalFrames * initialAnimationFrames);
        const newFrameIndex = Math.min(
            Math.floor((adjustedRun / (documentHeight - window.innerHeight)) * totalFrames),
            totalFrames - 1
        );
        updateFrame(newFrameIndex);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

window.addEventListener('scroll', () => {
    if (!scrollAnimationEnabled) return;

    // Show or hide the start button based on scroll position
    if (window.pageYOffset === 0) {
        startButton.style.display = 'block';
    } else {
        startButton.style.display = 'none';
    }

    const scrollFraction = (window.pageYOffset + (documentHeight / totalFrames * initialAnimationFrames)) / (documentHeight - window.innerHeight);
    const frameIndex = Math.min(
        Math.floor(scrollFraction * totalFrames),
        totalFrames - 1
    );
    updateFrame(frameIndex);
});