let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";  
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000); // Badilisha picha kila sekunde 3
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
document.querySelectorAll('.faq-item h3').forEach(item => {
    item.addEventListener('click', () => {
        const paragraph = item.nextElementSibling;
        paragraph.style.display = paragraph.style.display === 'block' ? 'none' : 'block'; // Badilisha kati ya kuonyesha/kuficha
    });
});
