const thumbnails = document.querySelectorAll('.thumbnail');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
        modal.style.display = 'flex';
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });
});

closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.querySelectorAll('.view-more').forEach(button => {
    button.addEventListener('click', () => {
        const imageId = button.getAttribute('data-id');
        window.location.href = `gallery-details.html?id=${imageId}`;
    });
});
