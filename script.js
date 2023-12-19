document.addEventListener("DOMContentLoaded", function() {
    animateSection1();
    document.getElementById('scrollButton').addEventListener('click', function() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
});

let isScrolling;
let frameIndex = 28;
window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(function() {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.pageYOffset;
        const scrollFraction = currentScroll / totalScroll;
        const maxFrameIndex = 249;
        const minFrameIndex = 29;
        const totalFrames = maxFrameIndex - minFrameIndex;
        frameIndex = Math.round(minFrameIndex + totalFrames * scrollFraction);
        document.getElementById('animation1').style.backgroundImage = `url('${currentFrame(frameIndex)}')`;
    }, 66);
}, false);

function currentFrame(index) {
    return `/Users/dz382/Documents/GitHub/Versuni/btl-tryouts/homepage-assets/home-entrance-desktop${index.toString().padStart(3, '0')}.jpg`;
}

function animateSection1() {
    animateImages('animation1', 0, 28, 100, () => {
        document.getElementById('scrollButton').style.display = 'block';
    });
}

function animateImages(elementId, startIndex, endIndex, frameDuration, callback) {
    let element = document.getElementById(elementId);
    let currentFrameIndex = startIndex;
    const animationInterval = setInterval(() => {
        if (currentFrameIndex > endIndex) {
            clearInterval(animationInterval);
            if (callback) callback();
            return;
        }
        element.style.backgroundImage = `url('${currentFrame(currentFrameIndex)}')`;
        currentFrameIndex++;
    }, frameDuration);
}
