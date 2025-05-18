document.addEventListener('DOMContentLoaded', function () {
    const numFlakes = 100; 
    const body = document.body; 

    function createSnowflake() {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');

    
        flake.style.left = Math.random() * window.innerWidth + 'px';
        flake.style.top = (Math.random() * -window.innerHeight - 20) + 'px'; 

   
        const size = Math.random() * 4 + 1; 
        flake.style.width = size + 'px';
        flake.style.height = size + 'px';
        flake.style.opacity = Math.random() * 0.7 + 0.3; 


        flake.dataset.speedY = Math.random() * 2 + 1; 
        flake.dataset.speedX = (Math.random() - 0.5) * 2; 
        
       
        flake.dataset.angle = Math.random() * 20 - 10; 

        body.appendChild(flake);
        return flake;
    }

    const snowflakes = [];
    for (let i = 0; i < numFlakes; i++) {
        snowflakes.push(createSnowflake());
    }

    function animateSnow() {
        snowflakes.forEach(flake => {
            let top = parseFloat(flake.style.top);
            let left = parseFloat(flake.style.left);
            const speedY = parseFloat(flake.dataset.speedY);
            const speedX = parseFloat(flake.dataset.speedX); 
            const angle = parseFloat(flake.dataset.angle);

            top += speedY;
            left += speedX * 2; 

            flake.style.top = top + 'px';
            flake.style.left = left + 'px';
            flake.style.transform = `rotate(${angle}deg)`;


           
            if (top > window.innerHeight + 20 || left < -20 || left > window.innerWidth + 20) {
                flake.style.left = Math.random() * window.innerWidth + 'px';
                flake.style.top = (Math.random() * -200 - 20) + 'px';
               
                flake.dataset.speedY = Math.random() * 2 + 1;
                flake.dataset.speedX = (Math.random() - 0.5) * 2;
            }
        });

        requestAnimationFrame(animateSnow);
    }

    const style = document.createElement('style');
    style.textContent = `
        .snowflake {
            position: fixed;
            background-color: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 0; /* Detrás del contenido principal */
            box-shadow: 0 0 5px rgba(200, 220, 255, 0.5); /* Sutil brillo azulado */
        }
    `;
    document.head.appendChild(style);

    requestAnimationFrame(animateSnow);
});