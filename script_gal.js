document.addEventListener('DOMContentLoaded', () => {

  function initializeLightbox(imageElements) {
    if (!imageElements || imageElements.length === 0) {
      return;
    }

    let currentIndex = 0;
    let activeLightbox = null; 

    function createLightboxDOM() {
      const lightboxDiv = document.createElement('div');
      lightboxDiv.className = 'lightbox'; 
      lightboxDiv.style.display = 'none'; 

      const closeBtn = document.createElement('span');
      closeBtn.className = 'close';
      closeBtn.innerHTML = '×'; 

      const lightboxImg = document.createElement('img');
      lightboxImg.className = 'lightbox-img';

      const prevBtn = document.createElement('a');
      prevBtn.className = 'prev';
      prevBtn.innerHTML = '❮'; 

      const nextBtn = document.createElement('a');
      nextBtn.className = 'next';
      nextBtn.innerHTML = '❯'; 

      lightboxDiv.appendChild(closeBtn);
      lightboxDiv.appendChild(lightboxImg);
      lightboxDiv.appendChild(prevBtn);
      lightboxDiv.appendChild(nextBtn);
      
      document.body.appendChild(lightboxDiv); 
      return { lightboxDiv, closeBtn, lightboxImg, prevBtn, nextBtn }; 
    }

    const dom = createLightboxDOM(); 
    activeLightbox = dom.lightboxDiv; 

    function showImage(index) {
  
      currentIndex = (index + imageElements.length) % imageElements.length;

      activeLightbox.style.display = "block"; 
      dom.lightboxImg.src = imageElements[currentIndex].src; 
      dom.lightboxImg.alt = imageElements[currentIndex].alt || "Imagen ampliada"; 


      if (imageElements.length <= 1) {
        dom.prevBtn.style.display = "none";
        dom.nextBtn.style.display = "none";
      } else {
        dom.prevBtn.style.display = "block";
        dom.nextBtn.style.display = "block";
      }
    }

    function closeLightbox() {
      activeLightbox.style.display = "none"; 
      document.removeEventListener('keydown', handleKeydownLightbox); 
    }

    function handleKeydownLightbox(e) {
      if (activeLightbox && activeLightbox.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
          showImage(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
          showImage(currentIndex + 1);
        } else if (e.key === 'Escape') {
          closeLightbox();
        }
      }
    }
    

    imageElements.forEach((img, index) => {
      img.addEventListener("click", (e) => {
 
        showImage(index); 
        document.addEventListener('keydown', handleKeydownLightbox); 
      });
    });


    dom.closeBtn.addEventListener("click", closeLightbox);
    dom.prevBtn.addEventListener("click", (e) => { 
      e.stopPropagation(); 
      showImage(currentIndex - 1); 
    });
    dom.nextBtn.addEventListener("click", (e) => { 
      e.stopPropagation(); 
      showImage(currentIndex + 1); 
    });

  
    activeLightbox.addEventListener("click", (e) => { 
      if (e.target === activeLightbox) {
        closeLightbox();
      }
    });
  } 


  const inspoImagesParaLightbox = document.querySelectorAll(".inspiraciones .lightbox-trigger");
  if (inspoImagesParaLightbox.length > 0) {
      initializeLightbox(inspoImagesParaLightbox);
  } else {
      console.warn("Lightbox Grande: No se encontraron imágenes con la clase '.inspiraciones .lightbox-trigger'");
  }

});