
document.addEventListener('DOMContentLoaded', () => {
  function initializeLightbox(imageElements) {

    if (!imageElements || imageElements.length === 0) {
      console.warn("Lightbox (Proceso): No se encontraron elementos de imagen para inicializar.");
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
      const currentImageElement = imageElements[currentIndex];

      activeLightbox.style.display = "block"; 
      document.body.classList.add('lightbox-activo'); 
      
      dom.lightboxImg.src = currentImageElement.src; 
      dom.lightboxImg.alt = currentImageElement.alt || "Imagen ampliada"; 

      if (imageElements.length <= 1) {
        dom.prevBtn.style.display = "none";
        dom.nextBtn.style.display = "none";
      } else {
        dom.prevBtn.style.display = "block";
        dom.nextBtn.style.display = "block";
      }
      document.addEventListener('keydown', handleKeydownLightbox);

      const dialogoId = currentImageElement.dataset.dialogoId;
      if (dialogoId) {
        const event = new CustomEvent('lightboxProcesoImageChanged', { 
          detail: { 
            dialogoId: dialogoId,
            triggerElement: currentImageElement 
          } 
        });
        document.dispatchEvent(event);
      }
    }

    function closeLightbox() {
      if (activeLightbox) {
        activeLightbox.style.display = "none"; 
      }
      document.body.classList.remove('lightbox-activo');
      document.removeEventListener('keydown', handleKeydownLightbox); 
      
      const event = new CustomEvent('lightboxProcesoClosed');
      document.dispatchEvent(event);
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

  const procesoImagesParaLightbox = document.querySelectorAll(".proceso-dibujo-grid .lightbox-trigger");
  if (procesoImagesParaLightbox.length > 0) {
      initializeLightbox(procesoImagesParaLightbox);
  } else {
      console.warn("Lightbox (Proceso): No se encontraron imágenes con la clase '.proceso-dibujo-grid .lightbox-trigger'");
  }
});