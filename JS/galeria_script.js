const botonbuscar = document.getElementById('boton_buscar');
const campobusqueda = document.getElementById('campo_busqueda');
const resultadosbusqueda = document.getElementById('resultados_busqueda');

const urlbaseApi = 'https://images-api.nasa.gov/search';

function manejarBusqueda() {
    const terminobuscar = campobusqueda.value.trim();
    
    if (terminobuscar === '') {
        alert('Ingresa algo para buscar.');
        return;
    }
    
    resultadosbusqueda.innerHTML = '<p class="mensaje_inicial">Buscando...</p>';
    
    obtenerDatosGaleria(terminobuscar);
}

function obtenerDatosGaleria(query) {
    
    const urlApiGaleria = `${urlbaseApi}?q=${encodeURIComponent(query)}&media_type=image`;
    
    fetch(urlApiGaleria)
        .then(function(respuesta) {
            if (!respuesta.ok) {
                throw new Error(`Error: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then(function(datosjson) {
            const resultados = datosjson.collection.items;
            mostrarResultados(resultados);
        })
        .catch(function(error) {
            console.error('Error en la búsqueda:', error);
            resultadosbusqueda.innerHTML = `<p class="mensaje_inicial" style="color: red;">Error al conectar: ${error.message}</p>`;
        });
}

