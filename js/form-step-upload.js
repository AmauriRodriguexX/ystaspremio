/**
 * Función para manejar la carga de archivos multimedia
 * Valida los formatos y tamaños de archivos permitidos
 * Incluye funcionalidad para eliminar archivos seleccionados
 */
function manejarCargaArchivos() {
    // Referencias a elementos del DOM
    const videoInput = document.getElementById('videoInput');
    const fotoInput = document.getElementById('fotoInput');
    const videoPreview = document.getElementById('videoPreview');
    const fotoPreview = document.getElementById('fotoPreview');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const fotoPlaceholder = document.getElementById('fotoPlaceholder');
    const checkboxAcepto = document.getElementById('checkboxAcepto');
    const btnEnviar = document.getElementById('btnEnviar');
    const errorVideoMsg = document.getElementById('errorVideo');
    const errorFotoMsg = document.getElementById('errorFoto');
    const errorCheckboxMsg = document.getElementById('errorCheckbox');

    // Referencias a los botones de eliminar
    const btnEliminarVideo = document.getElementById('btnEliminarVideo');
    const btnEliminarFoto = document.getElementById('btnEliminarFoto');

    // Variables para seguimiento de archivos válidos
    let videoValido = false;
    let fotoValida = false;

    // Función para verificar si se pueden habilitar el botón de enviar
    function verificarEstadoBotonEnviar() {
        btnEnviar.disabled = !(videoValido && fotoValida && checkboxAcepto.checked);

        // Actualizar apariencia del botón
        if (btnEnviar.disabled) {
            btnEnviar.classList.add('btn-disabled');
            btnEnviar.classList.remove('btn-primary');
        } else {
            btnEnviar.classList.remove('btn-disabled');
            btnEnviar.classList.add('btn-primary');
        }
    }

    // Función para limpiar video
    function limpiarVideo() {
        videoInput.value = '';
        videoPreview.src = '';
        videoPreview.style.display = 'none';
        videoPlaceholder.style.display = 'flex';
        btnEliminarVideo.style.display = 'none';
        errorVideoMsg.textContent = '';
        videoValido = false;
        verificarEstadoBotonEnviar();

        // Liberar URL del objeto para evitar memory leaks
        if (videoPreview.src) {
            URL.revokeObjectURL(videoPreview.src);
        }
    }

    // Función para limpiar foto
    function limpiarFoto() {
        fotoInput.value = '';
        fotoPreview.src = '';
        fotoPreview.style.display = 'none';
        fotoPlaceholder.style.display = 'flex';
        btnEliminarFoto.style.display = 'none';
        errorFotoMsg.textContent = '';
        fotoValida = false;
        verificarEstadoBotonEnviar();

        // Liberar URL del objeto para evitar memory leaks
        if (fotoPreview.src) {
            URL.revokeObjectURL(fotoPreview.src);
        }
    }

    // Event listeners para botones de eliminar
    if (btnEliminarVideo) {
        btnEliminarVideo.addEventListener('click', function(e) {
            e.preventDefault();
            limpiarVideo();
        });
    }

    if (btnEliminarFoto) {
        btnEliminarFoto.addEventListener('click', function(e) {
            e.preventDefault();
            limpiarFoto();
        });
    }

    // Validar video
    videoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        errorVideoMsg.textContent = '';
        videoValido = false;

        // Limpiar vista previa
        videoPreview.src = '';
        videoPreview.style.display = 'none';
        videoPlaceholder.style.display = 'flex';
        btnEliminarVideo.style.display = 'none';

        if (file) {
            // Verificar formato
            const validFormats = ['video/mp4', 'video/mov', 'video/quicktime'];
            if (!validFormats.includes(file.type)) {
                errorVideoMsg.textContent = 'Formato no válido. Utiliza MP4 o MOV.';
                return;
            }

            // Verificar tamaño (25MB)
            const maxSize = 25 * 1024 * 1024; // 25MB en bytes
            if (file.size > maxSize) {
                errorVideoMsg.textContent = 'El video no debe superar los 25MB.';
                return;
            }

            // Mostrar vista previa
            const videoURL = URL.createObjectURL(file);
            videoPreview.src = videoURL;
            videoPreview.style.display = 'block';
            videoPlaceholder.style.display = 'none';
            btnEliminarVideo.style.display = 'block';

            videoValido = true;
        }

        verificarEstadoBotonEnviar();
    });

    // Validar foto
    fotoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        errorFotoMsg.textContent = '';
        fotoValida = false;

        // Limpiar vista previa
        fotoPreview.src = '';
        fotoPreview.style.display = 'none';
        fotoPlaceholder.style.display = 'flex';
        btnEliminarFoto.style.display = 'none';

        if (file) {
            // Verificar formato
            const validFormats = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!validFormats.includes(file.type)) {
                errorFotoMsg.textContent = 'Formato no válido. Utiliza JPG, JPEG o PNG.';
                return;
            }

            // Verificar tamaño (5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB en bytes
            if (file.size > maxSize) {
                errorFotoMsg.textContent = 'La imagen no debe superar los 5MB.';
                return;
            }

            // Mostrar vista previa
            const imageURL = URL.createObjectURL(file);
            fotoPreview.src = imageURL;
            fotoPreview.style.display = 'block';
            fotoPlaceholder.style.display = 'none';
            btnEliminarFoto.style.display = 'block';

            fotoValida = true;
        }

        verificarEstadoBotonEnviar();
    });

    // Controlar estado del checkbox
    checkboxAcepto.addEventListener('change', function() {
        errorCheckboxMsg.textContent = '';
        verificarEstadoBotonEnviar();
    });

    // Manejar envío del formulario
    const formulario = document.getElementById('uploadForm');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {

            let formValido = true;

            // Validar que se haya subido un video
            if (!videoValido) {
                errorVideoMsg.textContent = 'Por favor, sube un video válido.';
                formValido = false;
            }

            // Validar que se haya subido una foto
            if (!fotoValida) {
                errorFotoMsg.textContent = 'Por favor, sube una fotografía válida.';
                formValido = false;
            }

            // Validar que se haya aceptado el uso de imagen
            if (!checkboxAcepto.checked) {
                errorCheckboxMsg.textContent = 'Debes aceptar el uso de tu imagen.';
                formValido = false;
            }

        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    manejarCargaArchivos();
});
