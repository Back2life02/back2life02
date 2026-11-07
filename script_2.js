const images = document.querySelectorAll(".inspiraciones img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

function showImage(index) {
  lightbox.style.display = "block";
  lightboxImg.src = images[index].src;
  currentIndex = index;
}

images.forEach((img, index) => {
  img.addEventListener("click", () => showImage(index));
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});
const inspoImages = document.querySelectorAll('.inspo-img');

  inspoImages.forEach(img => {
    img.addEventListener('click', () => {

      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = 9999;


      const enlargedImg = document.createElement('img');
      enlargedImg.src = img.src;
      enlargedImg.style.maxWidth = '90%';
      enlargedImg.style.maxHeight = '90%';
      enlargedImg.style.borderRadius = '10px';
      enlargedImg.style.boxShadow = '0 0 25px rgba(255,255,255,0.3)';
      overlay.appendChild(enlargedImg);

      overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
      });

      document.body.appendChild(overlay);
    });
  });
 