document.addEventListener('DOMContentLoaded', () => {

  const dialogoFlotanteBox = document.getElementById('dialogo-personaje');
  const textoFlotanteElemento = document.getElementById('texto-dialogo-personaje');


  const dialogoFijoBox = document.getElementById('gatoh-fijo-socials'); 
  const textoFijoElemento = document.getElementById('texto-dialogo-fijo-socials');


  if (!dialogoFlotanteBox || !textoFlotanteElemento) {
    console.error("Elementos del diálogo flotante del personaje (Proceso) no encontrados.");
    
  }

 const dialogosPorImagen = { 
    "ep1": "Inicio primero por el boceto, está todo feo, pero así se inicia.",
    "ep2": "Luego viene el lineart. Algo que no sé por qué hago si siempre lo tapo.",
    "ep3": "Sigo con los colores planos y algo de detalle.",
    "ep4": "Después añado el fondo...",
    "ep5": "E integro a los personajes en el fondo.",
    "ep6": "¡El cambio más importante! ¡El render!",
    "ep7": "Alguna que otra corrección de colores...",
    "ep8": "Efectos adicionales y... listo, así quedaría el resultado final."
  };

  const velocidadEscritura = 40; 
  let timeoutEscrituraFlotante, timeoutEscrituraFijo;
  let dialogoFlotanteActivo = false; 
  let dialogoFijoActivo = false;
  let dialogoFlotanteFijadoPorClick = false; 
  let elementoDialogoFlotanteActual = null;


  function escribirTextoFlotante(texto, callback, index = 0) {
    if (!textoFlotanteElemento) return;
    if (index < texto.length && dialogoFlotanteActivo) { 
      textoFlotanteElemento.textContent += texto[index];
      timeoutEscrituraFlotante = setTimeout(() => escribirTextoFlotante(texto, callback, index + 1), velocidadEscritura);
    } else if (index >= texto.length) { 
      textoFlotanteElemento.classList.add('escritura-completa');
      if (callback) callback();
    } else if (!dialogoFlotanteActivo) { 
        textoFlotanteElemento.textContent = ''; 
        textoFlotanteElemento.classList.remove('escritura-completa');
    }
  }

  function posicionarDialogoFlotante(triggerElement) {
    if (!dialogoFlotanteBox || !triggerElement || document.body.classList.contains('lightbox-activo')) return; // No posicionar si lightbox activo

    const rect = triggerElement.getBoundingClientRect();
    const dialogoRect = dialogoFlotanteBox.getBoundingClientRect(); 
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight; 
    const scrollY = window.scrollY;

    let top = rect.top + scrollY + (rect.height / 2) - (dialogoRect.height / 2); 
    let left = rect.right + 15; 

    if (left + dialogoRect.width > viewportWidth - 10) { 
        left = rect.left - dialogoRect.width - 15; 
    }
    if (left < 10) left = 10;
    if (top < scrollY + 10) top = scrollY + 10;
    if (top + dialogoRect.height > scrollY + viewportHeight - 10) {
        top = scrollY + viewportHeight - 10 - dialogoRect.height;
    }

    dialogoFlotanteBox.style.top = `${top}px`;
    dialogoFlotanteBox.style.left = `${left}px`;
  }

  function mostrarDialogoFlotante(dialogoId, triggerElement, fijar = false) {
    if (!dialogoFlotanteBox || !textoFlotanteElemento || document.body.classList.contains('lightbox-activo')) {

        if (dialogoFlotanteBox) dialogoFlotanteBox.classList.remove('visible');
        dialogoFlotanteActivo = false;
        clearTimeout(timeoutEscrituraFlotante);
        return;
    }

    const textoParaMostrar = dialogosPorImagen[dialogoId] || "¡Oh! Este paso es un misterio...";
    
    clearTimeout(timeoutEscrituraFlotante);
    textoFlotanteElemento.textContent = '';
    textoFlotanteElemento.classList.remove('escritura-completa');
    
    dialogoFlotanteActivo = true;
    if (fijar) dialogoFlotanteFijadoPorClick = true;
    
    if (triggerElement) posicionarDialogoFlotante(triggerElement);
    
    dialogoFlotanteBox.classList.add('visible');
    escribirTextoFlotante(textoParaMostrar, null);
    if (triggerElement) elementoDialogoFlotanteActual = triggerElement;
  }

  function ocultarDialogoFlotante() {
    if (dialogoFlotanteFijadoPorClick && dialogoFlotanteBox && dialogoFlotanteBox.classList.contains('visible')) return; 

    dialogoFlotanteActivo = false;
    clearTimeout(timeoutEscrituraFlotante); 
    
    if (dialogoFlotanteBox) dialogoFlotanteBox.classList.remove('visible');
    
    setTimeout(() => { 
        if (!dialogoFlotanteActivo && textoFlotanteElemento && dialogoFlotanteBox && !dialogoFlotanteBox.classList.contains('visible')) { 
            textoFlotanteElemento.textContent = '';
            textoFlotanteElemento.classList.remove('escritura-completa');
        }
    }, 400); 
    elementoDialogoFlotanteActual = null;
  }


  function escribirTextoFijo(texto, callback, index = 0) {
    if (!textoFijoElemento) return;
    if (index < texto.length && dialogoFijoActivo) { 
      textoFijoElemento.textContent += texto[index];
      timeoutEscrituraFijo = setTimeout(() => escribirTextoFijo(texto, callback, index + 1), velocidadEscritura);
    } else if (index >= texto.length) { 
      textoFijoElemento.classList.add('escritura-completa');
      if (callback) callback();
    } else if (!dialogoFijoActivo) { 
        textoFijoElemento.textContent = ''; 
        textoFijoElemento.classList.remove('escritura-completa');
    }
  }

  function mostrarDialogoFijo(dialogoId) {
    if (!dialogoFijoBox || !textoFijoElemento || !document.body.classList.contains('lightbox-activo')) {
    
        if (dialogoFijoBox) dialogoFijoBox.style.opacity = '0'; 
        dialogoFijoActivo = false;
        clearTimeout(timeoutEscrituraFijo);
        return;
    }
    
    const textoParaMostrar = dialogosPorImagen[dialogoId] || "Miau... ¿Qué vemos aquí?";

    clearTimeout(timeoutEscrituraFijo);
    textoFijoElemento.textContent = '';
    textoFijoElemento.classList.remove('escritura-completa');

    dialogoFijoActivo = true;
    dialogoFijoBox.style.opacity = '1';
    escribirTextoFijo(textoParaMostrar, null);
  }
  
  function ocultarDialogoFijo() {
      if (!dialogoFijoBox) return;
      dialogoFijoActivo = false;
      clearTimeout(timeoutEscrituraFijo);

  }



  const todasLasImagenesConDialogo = document.querySelectorAll('.proceso-dibujo-grid .lightbox-trigger[data-dialogo-id]');
  todasLasImagenesConDialogo.forEach(img => {
    const dialogoId = img.dataset.dialogoId;
    if (!dialogoId) return; 

    const hoverTarget = img.closest('.item-proceso') || img;

    hoverTarget.addEventListener('mouseenter', () => {
      if (!dialogoFlotanteFijadoPorClick && !document.body.classList.contains('lightbox-activo')) {
        mostrarDialogoFlotante(dialogoId, img); 
      }
    });

    hoverTarget.addEventListener('mouseleave', () => {
      if (!dialogoFlotanteFijadoPorClick && !document.body.classList.contains('lightbox-activo')) { 
        ocultarDialogoFlotante();
      }
    });

    img.addEventListener('click', (e) => { // Este click también abre el lightbox
      if (!document.body.classList.contains('lightbox-activo')) {
        mostrarDialogoFlotante(dialogoId, img, true); 
      }

    });
  });
  

  document.addEventListener('click', (e) => {
    if (dialogoFlotanteFijadoPorClick && !document.body.classList.contains('lightbox-activo')) {
      const esImagenConDialogo = e.target.closest('.lightbox-trigger[data-dialogo-id]');
      const esDentroDelDialogoFlotante = e.target.closest('#dialogo-personaje');
 

      if (!esImagenConDialogo && !esDentroDelDialogoFlotante) {
        dialogoFlotanteFijadoPorClick = false;
        ocultarDialogoFlotante();
      }
    }
  }); 

 
  document.addEventListener('lightboxProcesoImageChanged', (e) => {
    if (e.detail && e.detail.dialogoId) {
      ocultarDialogoFlotante();
      mostrarDialogoFijo(e.detail.dialogoId);
    }
  });

  document.addEventListener('lightboxProcesoClosed', () => {
    ocultarDialogoFijo();
 
    if (dialogoFlotanteFijadoPorClick && elementoDialogoFlotanteActual) {
      
        const dialogoIdOriginal = elementoDialogoFlotanteActual.dataset.dialogoId;
        if (dialogoIdOriginal) {
            mostrarDialogoFlotante(dialogoIdOriginal, elementoDialogoFlotanteActual, true);
        }
    } else {
        dialogoFlotanteFijadoPorClick = false; 
    }
  });
});