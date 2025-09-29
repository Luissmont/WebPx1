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
    
    resultadosbusqueda.innerHTML = '<p class="mensaje_inicial">Buscando..</p>';
    
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

function mostrarResultados(resultados) {
    
    resultadosbusqueda.innerHTML = '';

    if (resultados.length === 0) {
        resultadosbusqueda.innerHTML = '<p class="mensaje_inicial">No se encontraron resultados.</p>';
        return;
    }

    resultados.forEach(function(item) {
        
        const datostarjeta = item.data[0];
        const urlminiatura = item.links ? item.links[0].href : ''; 
        
        const titulo = datostarjeta.title || 'Sin Título';
        const descripcion = datostarjeta.description || 'Sin descripción.';
        
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta_resultado_austera';
        
        let html_tarjeta = `
            <img src="${urlminiatura}" alt="${titulo}" class="miniatura_imagen_austera">
            <div class="cuerpo_tarjeta_austera">
                <h3 class="titulo_tarjeta_austera">${titulo}</h3>
                <p class="descripcion_tarjeta_austera">${descripcion.substring(0, 100)}...</p>
            </div>
        `;
        
        tarjeta.innerHTML = html_tarjeta;
        
        resultadosbusqueda.appendChild(tarjeta);
    });
}

botonbuscar.addEventListener('click', manejarBusqueda);
campobusqueda.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        manejarBusqueda();
    }
});