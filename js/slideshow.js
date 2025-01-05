let slideIndex = 1;
let slideInterval;

// Start automatic slideshow
function startSlideshow() {
    showSlides(slideIndex);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    // Show current slide and activate corresponding dot
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active-dot";
}

// Image carousel functionality
function initializeCarousel() {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        let currentIndex = 0;
        images[0].classList.add('active');

        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 1800);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    startSlideshow();
    initializeCarousel();
});