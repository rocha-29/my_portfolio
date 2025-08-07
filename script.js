document.addEventListener('DOMContentLoaded', () => {
    // 🎯 Efecto del círculo interactivo que sigue el mouse
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();

    // 📱 Menú hamburguesa responsivo
    const toggleButton = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    toggleButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // 📧 Formulario de contacto usando Formspree con mensaje en la misma página
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const response = await fetch("https://formspree.io/f/mjkovdzq", {
                method: "POST",
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            if (response.ok) {
                form.innerHTML = `<p style="color: #00b4d8; font-weight: bold;">Thanks! Your message has been received. I’ll read it as soon as possible.</p>`;
            } else {
                alert("There was an error. Please try again.");
            }
        });
    }
});
