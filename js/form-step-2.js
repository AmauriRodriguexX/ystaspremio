/**
 * Script de validación secuencial para el formulario del paso 2
 * Habilita campos progresivamente a medida que se validan los anteriores
 */

// Orden de validación de los campos
const camposOrdenados = [
    'nombre2',
    'apellidos2',
    'celular2',
    'justificacion'
];

// Estado de validación de cada campo
const campoValidado = {
    nombre2: false,
    apellidos2: false,
    celular2: false,
    justificacion: false
};

/**
 * Inicializar el formulario
 * - Deshabilita todos los campos excepto el primero
 * - Configura los eventos de validación en tiempo real
 */
function inicializarFormulario() {
    console.log('Inicializando formulario del paso 2...');

    // Deshabilitar todos los campos excepto el primero
    camposOrdenados.forEach((campo, index) => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            if (index === 0) {
                // Habilitar solo el primer campo
                elemento.disabled = false;
            } else {
                // Deshabilitar el resto
                elemento.disabled = true;
            }
        }
    });

    // Deshabilitar el botón continuar
    const botonContinuar = document.querySelector('.btn-submit');
    if (botonContinuar) {
        botonContinuar.classList.add('btn-disabled');
        botonContinuar.disabled = true;
    }

    // Iniciar validación en tiempo real
    iniciarValidacionEnTiempoReal();

    // Inicializar contador de caracteres para justificación
    actualizarContadorCaracteres();
}

/**
 * Validar un campo específico y habilitar el siguiente si es válido
 * @param {string} campo - ID del campo a validar
 * @returns {boolean} - true si el campo es válido, false en caso contrario
 */
function validarCampo(campo) {
    const elemento = document.getElementById(campo);
    if (!elemento) return false;

    let esValido = false;

    switch (campo) {
        case 'nombre2':
            // Validar nombre (solo texto y mínimo 4 letras)
            const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{4,}$/;
            esValido = regexNombre.test(elemento.value.trim());
            if (!esValido) {
                mostrarError(elemento, 'Ingrese el nombre con al menos 4 letras (solo letras)');
            } else {
                limpiarError(elemento);
                localStorage.setItem('promNombre', elemento.value);
            }
            break;

        case 'apellidos2':
            // Validar apellidos (solo texto y mínimo 4 letras)
            const regexApellidos = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{4,}$/;
            esValido = regexApellidos.test(elemento.value.trim());
            if (!esValido) {
                mostrarError(elemento, 'Ingrese apellidos con al menos 4 letras (solo letras)');
            } else {
                limpiarError(elemento);
                localStorage.setItem('promApellidos', elemento.value);
            }
            break;

        case 'celular2':
            // Validar teléfono (exactamente 10 dígitos)
            const regexCelular = /^\d{10}$/;
            esValido = regexCelular.test(elemento.value.trim());
            if (!esValido) {
                mostrarError(elemento, 'El teléfono debe contener exactamente 10 dígitos');
            } else {
                limpiarError(elemento);
                localStorage.setItem('promNumTel', elemento.value);
            }
            break;

        case 'justificacion':
            // Validar justificación (mínimo 10 caracteres)
            esValido = elemento.value.trim().length >= 10;
            if (!esValido) {
                mostrarError(elemento, 'La justificación debe tener al menos 10 caracteres');
            } else {
                limpiarError(elemento);
                localStorage.setItem('justificacion', elemento.value);
            }
            break;
    }

    // Actualizar estado de validación
    campoValidado[campo] = esValido;

    // Si es válido, habilitar el siguiente campo o el botón de continuar
    if (esValido) {
        habilitarSiguienteCampo(campo);
    }

    return esValido;
}

/**
 * Habilitar el siguiente campo en la secuencia después de validar el actual
 * @param {string} campoActual - ID del campo actualmente validado
 */
function habilitarSiguienteCampo(campoActual) {
    const indiceActual = camposOrdenados.indexOf(campoActual);

    // Si es el último campo, habilitar el botón de continuar
    if (indiceActual === camposOrdenados.length - 1) {
        // Verificar si todos los campos están validados
        const todosValidados = Object.values(campoValidado).every(valor => valor === true);

        if (todosValidados) {
            // Habilitar botón continuar
            const botonContinuar = document.querySelector('.btn-submit');
            if (botonContinuar) {
                botonContinuar.classList.remove('btn-disabled');
                botonContinuar.disabled = false;
            }
        }
        return;
    }

    // Obtener el siguiente campo
    const siguienteCampo = camposOrdenados[indiceActual + 1];
    const siguienteElemento = document.getElementById(siguienteCampo);

    // Habilitar el siguiente campo si existe
    if (siguienteElemento) {
        siguienteElemento.disabled = false;
        //siguienteElemento.focus();

        // Agregar clase para animación
        siguienteElemento.classList.add('campo-habilitado');

        // Eliminar clase de pendiente del contenedor
        const contenedor = siguienteElemento.closest('.input-container');
        if (contenedor) {
            contenedor.classList.remove('campo-pendiente');
        }
    }
}

/**
 * Función para mostrar mensaje de error y estilo visual
 * @param {HTMLElement} elemento - El elemento del DOM que tiene el error
 * @param {string} mensaje - El mensaje de error a mostrar
 */
function mostrarError(elemento, mensaje) {
    // Limpiar error previo si existe
    limpiarError(elemento);

    // Agregar clase de error al elemento
    elemento.classList.add('is-invalid');

    // Crear elemento para mensaje de error
    const mensajeError = document.createElement('div');
    mensajeError.className = 'invalid-feedback';
    mensajeError.textContent = mensaje;

    // Agregar mensaje después del elemento
    elemento.parentNode.appendChild(mensajeError);
}

/**
 * Función para limpiar mensajes de error
 * @param {HTMLElement} elemento - El elemento del DOM al que se le limpiará el error
 */
function limpiarError(elemento) {
    elemento.classList.remove('is-invalid');

    // Buscar y eliminar mensajes de error existentes
    const mensajeError = elemento.parentNode.querySelector('.invalid-feedback');
    if (mensajeError) {
        mensajeError.remove();
    }
}

/**
 * Función para validación en tiempo real al escribir
 */
function iniciarValidacionEnTiempoReal() {
    // Configurar validación en tiempo real para cada campo
    camposOrdenados.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (!elemento) return;

        if (elemento.tagName === 'TEXTAREA') {
            // Para textarea, validar mientras escribe
            elemento.addEventListener('input', function() {
                // Actualizar contador de caracteres
                actualizarContadorCaracteres();

                // Validar solo si ya tiene contenido
                if (this.value.trim() !== '') {
                    validarCampo(campo);
                } else {
                    // Si está vacío, mostrar error solo si el campo ya había sido validado
                    if (campoValidado[campo]) {
                        validarCampo(campo);
                    }
                }
            });
        } else {
            // Para inputs, validar después de que el usuario termine de escribir
            elemento.addEventListener('input', function() {
                // Validar solo si ya tiene contenido
                if (this.value.trim() !== '') {
                    validarCampo(campo);
                } else {
                    // Si está vacío, mostrar error solo si el campo ya había sido validado
                    if (campoValidado[campo]) {
                        validarCampo(campo);
                    }
                }
            });
        }

        // También validar cuando pierde el foco
        elemento.addEventListener('blur', function() {
            validarCampo(campo);
        });
    });
}

/**
 * Actualizar contador de caracteres para el campo de justificación
 */
function actualizarContadorCaracteres() {
    const justificacion = document.getElementById('justificacion');
    const contador = document.querySelector('.character-counter');

    if (justificacion && contador) {
        const caracteresActuales = justificacion.value.length;
        contador.textContent = `${caracteresActuales} caracteres`;

        // Cambiar el color del contador según la cantidad de caracteres
        if (caracteresActuales < 10) {
            contador.classList.remove('text-success');
            contador.classList.add('text-muted');
        } else {
            contador.classList.remove('text-muted');
            contador.classList.add('text-success');
        }
    }
}

/**
 * Verificar si todos los campos están validados y habilitar botón si corresponde
 */
function verificarTodosLosCampos() {
    const todosValidados = Object.values(campoValidado).every(valor => valor === true);

    // Habilitar o deshabilitar botón según corresponda
    const botonContinuar = document.querySelector('.btn-submit');
    if (botonContinuar) {
        if (todosValidados) {
            botonContinuar.classList.remove('btn-disabled');
            botonContinuar.disabled = false;
        } else {
            botonContinuar.classList.add('btn-disabled');
            botonContinuar.disabled = true;
        }
    }
}

// Inicializar el formulario cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el formulario
    inicializarFormulario();
});
