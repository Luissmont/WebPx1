const claveapi = 'bJ4TTmBs22PLICJjdynMhZvqg3FXt8fw22rM33ax'; 
const urlApiApod = `https://api.nasa.gov/planetary/apod?api_key=${claveapi}&count=5`;
const contenedorGaleriaApod = document.getElementById('contenedor_galeria_apod');

function obtenerDatosApod() {
    fetch(urlApiApod)
        .then(function(respuesta) {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}. ¿Clave api correcta?`);
            }
            return respuesta.json();
        })
        .then(function(datosArray) {
            mostrarApods(datosArray);
        })
        .catch(function(error) {
            console.error('Error al obtener datos APOD:', error);
            contenedorGaleriaApod.innerHTML = `
                <div style="text-align:center; padding: 50px; color: #ff4d4d; grid-column: 1 / -1; background-color: #1E1E1E; border-radius: 8px;">
                    <h2>Error de Carga</h2>
                    <p>No se pudieron cargar las imágenes del universo. ${error.message}</p>
                </div>
            `;
        });
}

function mostrarApods(datosArray) {
    contenedorGaleriaApod.innerHTML = '';
    
    datosArray.reverse().forEach(function(datos) {
        
        if (!datos.url || (datos.media_type !== 'image' && datos.media_type !== 'video')) {
            console.warn(`APOD incompleto o no soportado encontrado en la fecha ${datos.date}.`);
            return; 
        }

        let contenidoTarjeta = '';
        const titulo = datos.title || 'Maravilla Sin Título';
        const explicacion = datos.explanation || 'Sin explicación disponible.';

        if (datos.media_type === 'video') {
            contenidoTarjeta = `
                <div class="tarjeta_interactiva mensaje_video">
                    <h3 class="titulo_tarjeta">${titulo}</h3>
                    <p>El APOD de esta fecha es un video.</p>
                    <a href="${datos.url}" target="_blank">Ver Video Completo</a>
                    <div class="info_hover">
                        <h3 class="titulo_tarjeta">${titulo}</h3>
                        <div class="texto_explicacion">
                            <strong>Fecha:</strong> ${datos.date}<br><br>
                            ${explicacion.substring(0, 300)}...
                        </div>
                    </div>
                </div>
            `;
        } else {
            contenidoTarjeta = `
                <div class="tarjeta_interactiva">
                    <img src="${datos.url}" alt="${titulo}" class="imagen_apod">
                    
                    <div class="info_hover">
                        <h3 class="titulo_tarjeta">${titulo}</h3>
                        <div class="texto_explicacion">
                            <strong>Fecha:</strong> ${datos.date}<br><br>
                            ${explicacion.substring(0, 300)}...
                        </div>
                    </div>
                </div>
            `;
        }
        
        contenedorGaleriaApod.innerHTML += contenidoTarjeta;
    });
}

obtenerDatosApod();