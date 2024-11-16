let currentSlide = 0;

function showSlide(slideIndex) {
    const slides = document.getElementById('carousel-content');
    const totalSlides = slides.children.length;
    currentSlide = (slideIndex + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}