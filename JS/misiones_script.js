const url_api = 'http://api.open-notify.org/astros.json';

const contenedorresumenmision = document.getElementById('contenedor_resumen_mision');
const listaastronautas = document.getElementById('lista_astronautas');

function obtenerDatosAstronautas() {
    fetch(url_api)
        .then(function(respuesta) {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}. API no disponible.`);
            }
            return respuesta.json(); 
        })
        .then(function(datos) {
            mostrarResumen(datos.number);
            mostrarLista(datos.people);
        })
        .catch(function(error) {
            console.error('Error al obtener datos de astronautas:', error);
            contenedorresumenmision.innerHTML = `<p class="mensaje_carga_austero" style="color: red;">Error: No se pudo conectar. ${error.message}</p>`;
            listaastronautas.innerHTML = '';
        });
}

function mostrarResumen(total) {
    contenedorresumenmision.innerHTML = `
        <p class="numero_total_austero">${total}</p>
        <p class="texto_resumen_austero">personas actualmente en el espacio.</p>
    `;
}

function mostrarLista(gente) {
    listaastronautas.innerHTML = '';

    if (gente.length === 0) {
        listaastronautas.innerHTML = '<p class="mensaje_carga_austero">No hay nadie en el espacio. ¡Raro!</p>';
        return;
    }

    gente.forEach(function(persona) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta_astronauta_austera';
        
        tarjeta.innerHTML = `
            <h3 class="nombre_astronauta_austero">${persona.name}</h3>
            <p class="nave_mision_austera">Nave: ${persona.craft}</p>
        `;
        
        listaastronautas.appendChild(tarjeta);
    });
}

obtenerDatosAstronautas();