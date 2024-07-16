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

// Función para registrar un nuevo usuario
async function registrarUsuario() {
    var username = document.getElementById("textUsername").value;
    var email = document.getElementById("textMail").value;
    var password = document.getElementById("textPassword").value;

    try {
        // Realizar la solicitud al servidor para registrar al usuario
        const response = await fetch('http://localhost:3305/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Registro exitoso
            document.cookie = `usuario=${username};path=/`;
            window.location.href = "index.html";
        } else {
            // Error en el registro
            alert("Error al registrar usuario");
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
    }
}

// Asignar la función de registro al hacer clic en el botón
document.getElementById("registerButton").addEventListener("click", registrarUsuario);

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