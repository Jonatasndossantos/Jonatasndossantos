// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Load Animations
    const tl = gsap.timeline();

    tl.to('nav', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
    })
    .to('.hero-content', {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.hero-visual', {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'back.out(1.7)'
    }, '-=1');

    // Feature Cards Scroll Animation
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });

    // Hover effect for buttons using GSAP
    const btn = document.querySelector('.btn');
    if(btn) {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.05, duration: 0.2 });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.2 });
        });
    }

    // --- UI CONTROLS ---

    // 1. Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;
    // Set default dark
    htmlEl.classList.add('dark');

    themeToggle.addEventListener('click', () => {
        htmlEl.classList.toggle('dark');
        // Animate button
        gsap.from(themeToggle, {
            rotation: 360,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
    });

    // 2. Speed Toggle (Slow Motion)
    const speedToggle = document.getElementById('speedToggle');
    let isSlow = false;
    
    speedToggle.addEventListener('click', () => {
        isSlow = !isSlow;
        const icon = speedToggle.querySelector('i');
        
        if (isSlow) {
            gsap.globalTimeline.timeScale(0.2); // Slow down everything to 20%
            icon.style.color = '#58a6ff'; // Active color
        } else {
            gsap.globalTimeline.timeScale(1); // Normal speed
            icon.style.color = ''; // Reset color
        }
    });

    // 3. Mute Toggle
    const muteToggle = document.getElementById('muteToggle');
    let isMuted = false;
    const iframe = document.getElementById('spline-frame');

    muteToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        const icon = muteToggle.querySelector('i');
        
        if (isMuted) {
            icon.className = 'fas fa-volume-mute';
            icon.style.color = '#ef4444'; // Red for muted
            // Note: Cannot directly mute cross-origin iframe without API.
            // Attempting to send message if Spline supports it (generic):
            iframe.contentWindow.postMessage({ type: 'mute', payload: { value: true } }, '*');
        } else {
            icon.className = 'fas fa-volume-up';
            icon.style.color = '';
            iframe.contentWindow.postMessage({ type: 'mute', payload: { value: false } }, '*');
        }
    });
});
