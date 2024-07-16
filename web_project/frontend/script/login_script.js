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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', function() {
        console.log('Botón clicado');
        const username = document.getElementById('textUsername').value;
        const password = document.getElementById('textPassword').value;

        // Enviar solicitud POST al servidor
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3305/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                if (data.success) {
                    // Guardar el nombre de usuario en localStorage
                    localStorage.setItem('username', username);

                    alert('Inicio de sesión exitoso');

                    // Redirigir a otra página después del inicio de sesión
                    window.location.href = 'index.html';
                } else {
                    alert('Credenciales incorrectas');
                }
            } else {
                console.error('Error en la solicitud:', xhr.statusText);
            }
        };

        xhr.onerror = function() {
            console.error('Error en la solicitud');
        };

        xhr.send(JSON.stringify({ user_username: username, user_password: password }));
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logoutButton').addEventListener('click', function() {
        // Limpiar el nombre de usuario en localStorage al hacer clic en el botón de cerrar sesión
        localStorage.removeItem('username');
        alert('Cierre de sesión exitoso');
    });
});

// Asignar la función de inicio de sesión al hacer clic en el botón
document.getElementById("loginButton").addEventListener("click", iniciarSesion);