// PARA EL SLIDER DEL HEADER
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    const indicator = link.querySelector('.indicator');

    link.addEventListener('mousemove', (e) => {
        const linkRect = link.getBoundingClientRect();
        const mouseX = e.pageX - linkRect.left;
        indicator.style.width = `${mouseX}px`;
    });

    link.addEventListener('mouseout', () => {
        indicator.style.width = '0';
    });
});

// Función para obtener el valor de una cookie por nombre
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el nombre de usuario desde localStorage
    const username = localStorage.getItem('username');

    if (username) {
        // El nombre de usuario está presente en localStorage, cambiar el contenido del elemento
        document.getElementById('mostrarUsername').innerText = username;
    } else {
        // El nombre de usuario no está presente, probablemente no haya iniciado sesión
        document.getElementById('mostrarUsername').innerText = "Iniciar Sesión";
    }
});