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



obtenerDatosAstronautas();