
// Initialize everything when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeStarRating();
    loadInitialReviews();
});

function initializeStarRating() {
    const stars = document.querySelectorAll('.rating .star');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            stars.forEach(s => s.classList.remove('selected'));
            const rating = this.dataset.rating;
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('selected');
            }
        });

        star.addEventListener('mouseenter', function() {
            const rating = this.dataset.rating;
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('hover');
            }
        });

        star.addEventListener('mouseleave', function() {
            stars.forEach(s => s.classList.remove('hover'));
        });
    });
}

function submitReview() {
    const name = document.getElementById('reviewName').value;
    const reviewText = document.getElementById('reviewText').value;
    const selectedStars = document.querySelectorAll('.rating .star.selected').length;

    if (!name || !reviewText || selectedStars === 0) {
        alert('Please fill in all fields and select a rating.');
        return;
    }

    const review = {
        name: name,
        rating: selectedStars,
        text: reviewText,
        date: new Date().toLocaleDateString()
    };

    addReviewToCarousel(review);
    resetForm();
}

function addReviewToCarousel(review) {
    const track = document.getElementById('carouselTrack');
    const slide = document.createElement('li');
    slide.className = 'carousel-slide';
    
    slide.innerHTML = `
        <div class="review-card">
            <div class="avatar">${review.name.charAt(0).toUpperCase()}</div>
            <h3>${review.name}</h3>
            <p>${'★'.repeat(review.rating)}</p>
            <p class="review-text">"${review.text}"</p>
            <p class="date">${review.date}</p>
        </div>
    `;

    track.appendChild(slide);
    initializeCarousel();
}

function resetForm() {
    document.getElementById('reviewName').value = '';
    document.getElementById('reviewText').value = '';
    document.querySelectorAll('.rating .star').forEach(star => {
        star.classList.remove('selected', 'hover');
    });
}

function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.carousel-nav');
    
    let currentIndex = 0;

    function getVisibleSlides() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function updateSlidePositions() {
        const containerWidth = track.parentElement.getBoundingClientRect().width;
        const slideWidth = containerWidth / getVisibleSlides();
        
        // Set the width of each slide
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
        
        // Update track width
        track.style.width = `${slideWidth * slides.length}px`;
        
        // Move to current position without animation
        moveToSlide(currentIndex, false);
    }

    function moveToSlide(index, animate = true) {
        if (index < 0 || index > slides.length - getVisibleSlides()) return;
        
        const containerWidth = track.parentElement.getBoundingClientRect().width;
        const slideWidth = containerWidth / getVisibleSlides();
        const moveAmount = slideWidth * index;

        track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
        track.style.transform = `translateX(-${moveAmount}px)`;
        
        currentIndex = index;

        // Update button states
        prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1";
        nextButton.style.opacity = 
            currentIndex >= slides.length - getVisibleSlides() ? "0.5" : "1";

        // Update navigation dots
        const dots = Array.from(dotsNav.children);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - getVisibleSlides()) {
            moveToSlide(currentIndex + 1);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveToSlide(currentIndex - 1);
        }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateSlidePositions();
        }, 250);
    });

    updateSlidePositions();
    updateCarouselNavigation();
}

function updateCarouselNavigation() {
    const track = document.getElementById('carouselTrack');
    const dotsNav = document.querySelector('.carousel-nav');
    dotsNav.innerHTML = '';
    
    Array.from(track.children).forEach((_, index) => {
        const button = document.createElement('button');
        button.className = 'nav-indicator' + (index === 0 ? ' active' : '');
        button.setAttribute('aria-label', `Slide ${index + 1}`);
        button.addEventListener('click', () => moveToSlide(index));
        dotsNav.appendChild(button);
    });
}

function loadInitialReviews() {
    const initialReviews = [
        {
            name: "Suhas Patil",
            rating: 5,
            text: "This customer did not write a review.",
            date: "26/12/2024"
        },
        {
            name: "Abhishek Kumar",
            rating: 5,
            text: "Our tour journey from 17 Dec 2024 to 26 Dec 2024 was amazing!",
            date: "26/12/2024"
        },
        {
            name: "Aditya Rajak",
            rating: 5,
            text: "Nice service.",
            date: "25/12/2024"
        },
        {
            name: "Priya Sharma",
            rating: 5,
            text: "Great experience, highly recommended.",
            date: "25/12/2024"
        },
        {
            name: "Ravi Verma",
            rating: 5,
            text: "Exceptional service and friendly drivers.",
            date: "24/12/2024"
        }
    ];

    initialReviews.forEach(review => addReviewToCarousel(review));
}