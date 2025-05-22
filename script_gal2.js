
document.addEventListener('DOMContentLoaded', () => {
  const dialogoBox = document.getElementById('gatoh');
  const textoElemento = document.getElementById('texto-dialogo');

  if (!dialogoBox || !textoElemento) {
    console.error("Elementos del diálogo (Galería) no encontrados.");
    return;
  }

  const dialogosPorImagen = {
    "inspo1": "De mis primeras prácticas de dibujo y, por lo tanto, las más feas, jskjsk (2019).",
    "inspo2": "Mi primer dibujo digital, como puedes ver, los colores están... raros (2020).",
    "inspo3": "Miau, intenté dibujar a uno de mis Pokémon favoritos aquí, igual fue un regalo para una amiga (2021).",
    "inspo4": "Un art trade que tuve y me gustó mucho (2021).",
    "inspo5": "De mis mejores dibujos hasta la fecha, puedes ver lo mucho que amo dibujar a Cinderace (2022).",
    "inspo6": "Amo el coloreado de este, sigue una minihistoria de otro dibujo mío (2023).",
    "inspo7": "Me gusta pensar que son pareja, jskjsk (2025).", 
    "inspo8": "Un regalo a un streamer que vi, me gustó mucho su avatar (2025).",
    "inspo9": "Mi mejor dibujo hasta la fecha y el primero con gran impacto en las redes sociales (2025)."
  };

  const velocidadEscritura = 50; 
  let timeoutEscritura;
  let dialogoActivo = false; 
  let dialogoFijadoPorClick = false; 

  function escribirTexto(texto, callbackAlFinalizar, index = 0) {
    if (!textoElemento) return;
    if (index < texto.length && dialogoActivo) { 
      textoElemento.textContent += texto[index];
      timeoutEscritura = setTimeout(() => {
        escribirTexto(texto, callbackAlFinalizar, index + 1);
      }, velocidadEscritura);
    } else if (index >= texto.length) { 
      textoElemento.classList.add('escritura-completa');
      if (callbackAlFinalizar) callbackAlFinalizar();
    } else if (!dialogoActivo) { 
        textoElemento.textContent = ''; 
        textoElemento.classList.remove('escritura-completa');
    }
  }

  function mostrarDialogoConId(dialogoId, fijar = false) {
    if (!dialogoBox || !textoElemento) return;

    const textoParaMostrar = dialogosPorImagen[dialogoId] || "Miau... No recuerdo qué decir de este.";
    
    clearTimeout(timeoutEscritura);
    textoElemento.textContent = '';
    textoElemento.classList.remove('escritura-completa');
    
    dialogoActivo = true;
    if (fijar) { 
        dialogoFijadoPorClick = true;
    }
    dialogoBox.classList.add('visible');
    escribirTexto(textoParaMostrar, null);
  }

  function ocultarDialogo() {
    if (dialogoFijadoPorClick && dialogoBox.classList.contains('visible')) return; 

    dialogoActivo = false;
    clearTimeout(timeoutEscritura); 
    
    if (dialogoBox) { 
        dialogoBox.classList.remove('visible');
    }
    
    setTimeout(() => { 
        if (!dialogoActivo && textoElemento && !dialogoBox.classList.contains('visible')) { 
            textoElemento.textContent = '';
            textoElemento.classList.remove('escritura-completa');
        }
    }, 500); 
  }

  const todasLasImagenesConDialogo = document.querySelectorAll('.lightbox-trigger[data-dialogo-id]');
  todasLasImagenesConDialogo.forEach(img => {
    const dialogoId = img.dataset.dialogoId;
    if (!dialogoId) return; 

    img.addEventListener('mouseenter', () => {
      if (!dialogoFijadoPorClick) { 
        mostrarDialogoConId(dialogoId); 
      }
    });

    img.addEventListener('mouseleave', () => {
      if (!dialogoFijadoPorClick) { 
        ocultarDialogo();
      }
    });

    img.addEventListener('click', (e) => {

      mostrarDialogoConId(dialogoId, true); 
    });
  });
  
  document.addEventListener('click', (e) => {
    if (dialogoFijadoPorClick) {
      const esImagenConDialogo = e.target.closest('.lightbox-trigger[data-dialogo-id]');
      const esDentroDelDialogo = e.target.closest('#gatoh');
      const esDentroDelLightbox = e.target.closest('.lightbox'); 
      if (!esImagenConDialogo && !esDentroDelDialogo && !esDentroDelLightbox) {
        dialogoFijadoPorClick = false;
        ocultarDialogo();
      }
    }
  });

 
  document.addEventListener('lightboxImageChanged', (e) => {
    if (e.detail && e.detail.dialogoId) {
      mostrarDialogoConId(e.detail.dialogoId, true); 
    }
  });

  document.addEventListener('lightboxClosed', () => {

  });

});