// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- MANEJO DEL AÑO ACTUAL EN EL FOOTER ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // --- MODO OSCURO / CLARO ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    // Aplica el tema guardado al cargar la página
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    // Listener para el botón de cambio de tema
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });


    // --- VALIDACIÓN DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contactForm');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío real del formulario
            
            // Usamos la validación de Bootstrap y añadimos una clase para mostrar los errores
            if (!contactForm.checkValidity()) {
                event.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }
            
            // Validación de Email con Regex
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                emailError.textContent = 'Por favor, ingresa un formato de email válido (ej: nombre@dominio.com).';
                contactForm.classList.add('was-validated');
                return;
            } else {
                emailInput.classList.remove('is-invalid');
            }

            // Si todo es válido, procedemos
            contactForm.classList.remove('was-validated');

            // Recopilar datos del formulario
            const name = document.getElementById('name').value;
            const email = emailInput.value;
            const message = document.getElementById('message').value;
            
            // --- ¡AQUÍ ES DONDE PONES TU CORREO! ---
            // Reemplaza "tu-correo@tu-veterinaria.com" con la dirección de email real de tu clínica.
            const veterinaryEmail = "vetcare60@gmail.com"; 
            // ---------------------------------------------

            // Construir el enlace 'mailto'
            const mailtoSubject = `Consulta desde la web de VetCare de: ${name}`;
            const mailtoBody = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
            const mailtoLink = `mailto:${veterinaryEmail}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

            // Redirigir para abrir el cliente de correo del usuario
            window.location.href = mailtoLink;
            
            // Mostrar la ventana modal de confirmación después de intentar abrir el cliente de correo
            setTimeout(() => {
                confirmationModal.show();
            }, 500); // Un pequeño retardo para que la acción de redirección se inicie

            // Limpiar el formulario
            contactForm.reset();
        });
    }

    // --- SCROLL SUAVE (ya gestionado por CSS, pero esto es una alternativa JS si se necesita más control) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Evitar que el listener interfiera con los controles del carrusel o el modal
            const href = this.getAttribute('href');
            if (href === '#' || this.getAttribute('data-bs-toggle') || this.getAttribute('data-bs-target')) {
                return;
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});