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
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
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

function donate() {
    // Obtener el nombre de usuario desde localStorage
    const username = localStorage.getItem('username');

    if (!username) {
        alert("Nombre de usuario no encontrado. Inicie sesión nuevamente.");
        return;
    }

    // Obtener la cantidad donada desde el HTML
    const cantidadDonada = parseInt(document.getElementById("numberDona").value, 10);

    // Verificar si la cantidad donada es un número válido
    if (isNaN(cantidadDonada) || cantidadDonada <= 0) {
        alert("Ingrese una cantidad válida para donar.");
        return;
    }

    // Realizar la inserción de la nueva donación
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3305/donate', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const donationData = JSON.parse(xhr.responseText);
                alert('Donación exitosa');
                // Puedes realizar acciones adicionales después de una donación exitosa si es necesario
            } catch (error) {
                console.error('Error al analizar la respuesta JSON:', error);
                alert('Error al procesar la donación. Por favor, inténtelo de nuevo. (Error al analizar la respuesta JSON)');
            }
        } else {
            console.error('Error en la donación:', xhr.statusText);
            alert('Error al procesar la donación. Por favor, inténtelo de nuevo.');
        }
    };

    xhr.onerror = function () {
        console.error('Error en la donación');
        alert('Error al procesar la donación. Por favor, inténtelo de nuevo.');
    };

    // Enviar la solicitud de donación al servidor
    xhr.send(JSON.stringify({ username: username, cantidad: cantidadDonada }));
}

// Función para actualizar la información de donaciones en la página
async function updateDonationInfo() {
    window.location.reload();
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Función para obtener información inicial
async function obtenerInformacionInicial() {
    try {
        // Realizar la solicitud al servidor para obtener la información inicial
        const response = await fetch('http://localhost:3305/informacion-inicial');

        if (response.ok) {
            const data = await response.json();
            // Actualizar la cantidad total, la cantidad restante y el número de aportaciones en el frontend
            document.getElementById("donationTotal").textContent = data.donationTotal || 0; 
            document.getElementById("amountLeft").textContent = data.amountLeft || 15000;
            document.getElementById("amountTotal").textContent = data.amountTotal || 0;
        } else {
            // Manejar el caso de error al obtener la información inicial
            console.error('Error al obtener información inicial:', response.statusText);
        }
    } catch (error) {
        console.error('Error al obtener información inicial:', error);
    }
}

// Llamar a la función al cargar la página
window.addEventListener('load', obtenerInformacionInicial);