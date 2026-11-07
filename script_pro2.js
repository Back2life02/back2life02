
document.addEventListener('DOMContentLoaded', () => {
  const dialogoBox = document.getElementById('gatoh');
  const textoElemento = document.getElementById('texto-dialogo');

  if (!dialogoBox || !textoElemento) {
    console.error("Elementos del diálogo (Galería) no encontrados.");
    return;
  }

  const dialogosPorImagen = {
    "inspo1": "La quema de basura en las inmediaciones de la estación Oceanía del Metro de la Ciudad de México provocó un incendio que dañó el cableado eléctrico de la Línea B, ocasionando una suspensión del servicio en 11 estaciones diferentes el cual duró 14 horas y afectó a miles de personas. El mal manejo de los residuos provocó que se afectarán las actividades diarias de varias personas y costos altos en reparaciones. El manejo adecuado de los residuos es importante para no sólo perjudicar el ambiente si no a toda una comunidad o población.",
    "inspo2": "La Gran mancha de basura del Pacífico es una enorme zona de acumulación de residuos plásticos, estos generan microplásticos capaces de alterar los ecosistemas marinos. Un estudio reciente postuló que estas partículas podrían estar relacionadas con la alteración de color y luminosidad del océano, este estudio se llevo a cabo según observaciones realizadas mediante satélites. Además de poner el ecosistema marino en peligro es importante recordar, que estos microplásticos proliferan en partículas diminutas que las hacen muy difíciles de identificar y terminan dañando la cadena alimenticia.",
    "inspo3": "Las recientes lluvias y la acumulación de basura en Hermosillo, han ayudado a la proliferación de la reproducción del mosquito Aedes aegypti, transmisor del dengue, lla Secretaría de Salud intensificó las jornadas de control larvario mediante recorridos casa por casa, principalmente en la colonia Paseo del Pedregal. Durante estas revisiones se identificaron posibles criaderos en macetas, cubetas, bebederos de mascotas, botellas, juguetes, corcholatas y láminas que retienen agua de lluvia. Luis Machado, biólogo; explicó que los huevecillos pueden permanecer adheridos a las paredes de los recipientes.",
    "inspo4": "Corea del Sur convirtió un antiguo basurero ubicado en la ciudad de Icheon en un parque ecológico de 71,229 m2, recuperando un espacio contaminado para la protección de flora y fauna. El proyecto demuestra que los terrenos que sufren de acumulación de residuos pueden recuperarse y ser transformados en espacios que favorezcan el ecosistema y ayuden al planeta, además de combatir la problemática de los residuos, reducir el impacto ambiental de los basureros y darles un nuevo uso",
    "inspo5": "En Querétaro, México, se recolectaron más de 40 toneladas de basura del Centro Histórico posterior a la celebración de Día de Muertos, gracias al trabajo del personal de Servicios Públicos Municipales, estas labores de limpieza mejoraron las condiciones de calles, plazas y jardines. Con esta ayuda se evitó que los residuos se acumulen en espacios públicos, y tener una ciudad más limpia y saludable. Aunque gracias a su ayuda, la primera respuesta debería de ser de la ciudadanía al tirar sus desechos en los contenedores y evitando ensuciar las calles. ",
    "inspo6": "En las playas Villa del Mar y Playón de Hornos, en Veracruz, se realizó una jornada de limpieza en la cual 50 personas, de distintas organizaciones, lograron recolectar 100 kilogramos de basura durante un recorrido de 600 metros. Esta actividad formó parte de la Campaña Nacional de Limpieza de Playas y Costas 2025-2030. Con esto se evitó que los residuos plásticos permanezcan en las costas y lleguen al mar, donde pueden dañar los ecosistemas y fauna marina. Estas se hacen con el fin de fomentar la participación ciudadana y crear conciencia sobre el estado de nuestras playas. ",
  };

  const velocidadEscritura = 30; 
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