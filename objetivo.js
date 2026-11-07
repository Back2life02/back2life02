document.addEventListener('DOMContentLoaded', () => {
  const dialogoBox = document.getElementById('dialogo-tutoriales');
  const textoElemento = document.getElementById('texto-dialogo-tutoriales');

  if (!dialogoBox || !textoElemento) {
    console.error("Elementos del diálogo de tutoriales no encontrados.");
    return;
  }

  const dialogosPorElemento = {
    "video1": "Muy buen tutorial para principiantes, no sabía que ver igual es practicar.",
    "video2": "Tutorial básico de color.",
    "playlist1": "Aquí acomodé los tutoriales más adecuados para principiantes, te enseña lo básico.",
    "playlist2": "Si te sientes más cómodo con tu arte, intenta los tutoriales aquí, sirven mucho para establecer mejor tus bases.",
    "playlist3": "Algo más difícil y solo para avanzados, sirve para mejorar tu arte aún más.",
    "playlist4": "Extras que no supe ordenar."
  };

  const velocidadEscritura = 45; 
  let timeoutEscritura;
  let dialogoActivo = false; 
  let dialogoFijadoPorClick = false; 
  let elementoHoverActual = null;

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
  
  function posicionarDialogo(triggerElement) {
    if (!dialogoBox || !triggerElement) return;

    const rect = triggerElement.getBoundingClientRect();
    const dialogoRect = dialogoBox.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const scrollY = window.scrollY;

    let top = rect.top + scrollY + (rect.height / 2) - (dialogoRect.height / 2);
    let left = rect.right + 20; 

    if (left + dialogoRect.width > viewportWidth - 15) {
        left = rect.left - dialogoRect.width - 20;
    }
    if (left < 15) left = 15;
    
 
    const espacioMinimoSuperior = 70; 
    if (top < scrollY + espacioMinimoSuperior) top = scrollY + espacioMinimoSuperior;
    if (top + dialogoRect.height > scrollY + window.innerHeight - 15) {
        top = scrollY + window.innerHeight - 15 - dialogoRect.height;
    }

    dialogoBox.style.top = `${top}px`;
    dialogoBox.style.left = `${left}px`;
  }

  function mostrarDialogo(dialogoId, triggerElement) {
    if (!dialogoBox || !textoElemento) return;

    const textoParaMostrar = dialogosPorElemento[dialogoId] || "¡Este recurso es genial! Miau.";

    clearTimeout(timeoutEscritura);
    textoElemento.textContent = '';
    textoElemento.classList.remove('escritura-completa');
    
    dialogoActivo = true;

    if (getComputedStyle(dialogoBox).position === 'absolute') { 
        posicionarDialogo(triggerElement);
    }
    
    dialogoBox.classList.add('visible');
    escribirTexto(textoParaMostrar, null);
  }

  function ocultarDialogo() {
    if (dialogoFijadoPorClick && dialogoBox.classList.contains('visible')) return; 

    dialogoActivo = false;
    clearTimeout(timeoutEscritura); 
    
    if (dialogoBox) dialogoBox.classList.remove('visible');
    
    setTimeout(() => { 
        if (!dialogoActivo && textoElemento && dialogoBox && !dialogoBox.classList.contains('visible')) { 
            textoElemento.textContent = '';
            textoElemento.classList.remove('escritura-completa');
        }
    }, 350);
  }

  const elementosConDialogo = document.querySelectorAll('.tarjeta-video[data-dialogo-id], .tarjeta-playlist[data-dialogo-id]');
  
  elementosConDialogo.forEach(elem => {
    const dialogoId = elem.dataset.dialogoId;
    if (!dialogoId) return; 

    elem.addEventListener('mouseenter', () => {
      if (!dialogoFijadoPorClick) {
        elementoHoverActual = elem;
        mostrarDialogo(dialogoId, elementoHoverActual);
      }
    });

    elem.addEventListener('mouseleave', () => {
      if (!dialogoFijadoPorClick) { 
        elementoHoverActual = null;
        ocultarDialogo();
      }
    });

    elem.addEventListener('click', (e) => {

      dialogoFijadoPorClick = true; 
      elementoHoverActual = elem;
      mostrarDialogo(dialogoId, elementoHoverActual);
    });
  });

  document.addEventListener('click', (e) => {
    if (dialogoFijadoPorClick) {
      const esElementoConDialogo = e.target.closest('.tarjeta-video[data-dialogo-id], .tarjeta-playlist[data-dialogo-id]');
      const esDentroDelDialogo = e.target.closest('#dialogo-tutoriales');

      if (!esElementoConDialogo && !esDentroDelDialogo) {
        dialogoFijadoPorClick = false;
        elementoHoverActual = null;
        ocultarDialogo();
      }
    }
  }); 
  
});