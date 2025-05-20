document.addEventListener('DOMContentLoaded', function () {
    const numParticles = 30; 
    const particleContainer = document.body;
    const particles = [];

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('ember');

        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + Math.random() * 100 + 50;

        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';


        const size = Math.random() * 3 + 1; 
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        

        particle.style.opacity = Math.random() * 0.3 + 0.1; 
        particle.dataset.initialOpacity = parseFloat(particle.style.opacity);

        const colors = ['var(--accent-fire-orange)', 'var(--accent-ember-yellow)', '#FF7F50']; 
        const baseColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = baseColor;
        

        particle.style.boxShadow = `0 0 ${Math.random()*4 + 2}px ${Math.random()*1 + 0.5}px ${baseColor}, 0 0 6px 2px rgba(255,120,0,0.3)`; 


        particle.dataset.speedY = -(Math.random() * 1.0 + 0.3); 
        particle.dataset.speedX = (Math.random() - 0.5) * 0.7;  
        particle.dataset.life = Math.random() * 250 + 150; 
        
        particle.style.zIndex = Math.random() < 0.7 ? 1 : 1001; 

        particleContainer.appendChild(particle);
        return particle;
    }

    for (let i = 0; i < numParticles; i++) {
        particles.push(createParticle());
    }

    function animateParticles() {
        particles.forEach((particle, index) => {
            let top = parseFloat(particle.style.top);
            let left = parseFloat(particle.style.left);
            const speedY = parseFloat(particle.dataset.speedY);
            const speedX = parseFloat(particle.dataset.speedX);
            let life = parseFloat(particle.dataset.life);
            const initialOpacity = parseFloat(particle.dataset.initialOpacity);

            top += speedY;
            left += speedX + Math.sin(top * 0.06 + index) * 0.2; 
            life -= 1;

            const lifeRatio = life / (parseFloat(particle.dataset.life) + 50); 
            particle.style.opacity = Math.max(0, lifeRatio * initialOpacity * 1.5); 

            particle.style.top = top + 'px';
            particle.style.left = left + 'px';
            particle.dataset.life = life;

            if (life <= 0 || top < -30) { 
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = window.innerHeight + Math.random() * 30 + 10 + 'px';
                particle.dataset.life = Math.random() * 250 + 150;
                
                const newInitialOpacity = Math.random() * 0.3 + 0.1; 
                particle.style.opacity = newInitialOpacity;
                particle.dataset.initialOpacity = newInitialOpacity;

                const size = Math.random() * 3 + 1;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                const colors = ['var(--accent-fire-orange)', 'var(--accent-ember-yellow)', '#FF7F50'];
                const baseColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = baseColor;
                particle.style.boxShadow = `0 0 ${Math.random()*4 + 2}px ${Math.random()*1 + 0.5}px ${baseColor}, 0 0 6px 2px rgba(255,120,0,0.3)`;
            }
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
});