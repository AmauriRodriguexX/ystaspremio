/**
 * Script de validación secuencial para el formulario
 * Habilita campos progresivamente a medida que se validan los anteriores
 */

// Orden de validación de los campos
const camposOrdenados = [
    'idCliente',
    'nombre',
    'apellido',
    'celular',
    'oficina',
    'estado',
    'municipio', // Aunque es opcional, mantiene el orden
    'giro'
];

// Estado de validación de cada campo
const campoValidado = {
    idCliente: false,
    nombre: false,
    apellido: false,
    celular: false,
    oficina: false,
    estado: false,
    municipio: true, // Opcional, se considera validado por defecto
    giro: false
};

/**
 * Inicializar el formulario
 * - Deshabilita todos los campos excepto el primero
 * - Configura los eventos de validación en tiempo real
 */
function inicializarFormulario() {
    console.log('Inicializando formulario...');

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
    const botonContinuar = document.querySelector('.btn-continue');
    if (botonContinuar) {
        botonContinuar.classList.add('btn-disabled');
        botonContinuar.disabled = true;
    }

    // Iniciar validación en tiempo real
    iniciarValidacionEnTiempoReal();

    // Configurar botón continuar
    if (botonContinuar) {
        botonContinuar.addEventListener('click', function(e) {
            e.preventDefault();

            // Verificar si todos los campos están validados
            const todosValidados = Object.values(campoValidado).every(valor => valor === true);

            if (todosValidados) {
                console.log('Formulario válido - Continuando al siguiente paso');
                //window.location.href = 'paso2.html';
            }
        });
    }
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
        case 'idCliente':
            // Validar ID (exactamente 12 dígitos)
            const regexId = /^\d{2,5}$/;
            esValido = regexId.test(elemento.value.trim());
            if (!esValido) {
                mostrarError(elemento, 'El ID debe ser entre 2 y 5 dígitos numéricos');
            } else {
                limpiarError(elemento);
            }
            break;

        case 'nombre':
            // Validar nombre (solo texto y mínimo 4 letras)
            const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{4,}$/;
            esValido = regexNombre.test(elemento.value.trim());
            if (!esValido) {
                mostrarError(elemento, 'Ingrese su nombre con al menos 4 letras (solo letras)');
            } else {
                limpiarError(elemento);
                localStorage.setItem('nombre', elemento.value);
            }
            break;

        case 'apellido':
            // Validar apellidos (solo texto y mínimo 4 letras)
            const regexApellidos = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{4,}$/;
            esValido = regexApellidos.test(elemento.value.trim());
            if (!esValido) {
                mostrarError(elemento, 'Ingrese sus apellidos con al menos 4 letras (solo letras)');
            } else {
                limpiarError(elemento);
                localStorage.setItem('apellidos', elemento.value);
            }
            break;

        case 'celular':
            // Validar teléfono (exactamente 10 dígitos)
            const regexCelular = /^\d{10}$/;
            esValido = regexCelular.test(elemento.value.trim());
            if (!esValido) {
                mostrarError(elemento, 'El teléfono debe contener exactamente 10 dígitos');
            } else {
                limpiarError(elemento);
                localStorage.setItem('numTel', elemento.value);
            }
            break;

        case 'oficina':
            // Validar selección de oficina
            esValido = elemento.selectedIndex !== 0;
            if (!esValido) {
                mostrarError(elemento, 'Por favor seleccione una oficina de servicio');
            } else {
                limpiarError(elemento);
                localStorage.setItem('oficina', elemento.options[elemento.selectedIndex].text);
            }
            break;

        case 'estado':
            // Validar selección de estado
            esValido = elemento.selectedIndex !== 0;
            if (!esValido) {
                mostrarError(elemento, 'Por favor seleccione un estado');
            } else {
                limpiarError(elemento);
                localStorage.setItem('estado', elemento.options[elemento.selectedIndex].text);
            }
            break;

        case 'municipio':
            // Campo opcional, siempre válido
            esValido = true;
            limpiarError(elemento);
            if( elemento.value != '' && elemento.value.length > 0){
                localStorage.setItem('municipio', elemento.value);
            }else{
                localStorage.setItem('municipio', 'NA');
            }
            break;

        case 'giro':
            // Validar giro de negocio (no vacío)
            esValido = elemento.value.trim() !== '';
            if (!esValido) {
                mostrarError(elemento, 'Por favor ingrese el giro de su negocio');
            } else {
                limpiarError(elemento);
                localStorage.setItem('giro', elemento.value);
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

    // Excepción: si el campo actual es 'estado', habilitar 'municipio' y 'giro'
    if (campoActual === 'estado') {
        const municipio = document.getElementById('municipio');
        const giro = document.getElementById('giro');

        if (municipio) municipio.disabled = false;
        if (giro) giro.disabled = false;
        return; // No continuar con lógica normal
    }

    // Si es el último campo, habilitar el botón de continuar
    if (indiceActual === camposOrdenados.length - 1) {
        const todosValidados = Object.values(campoValidado).every(valor => valor === true);

        if (todosValidados) {
            const botonContinuar = document.querySelector('.btn-submit');
            if (botonContinuar) {
                botonContinuar.classList.remove('btn-disabled');
                botonContinuar.disabled = false;
            }
        }
        return;
    }

    // Habilitar el siguiente campo en la secuencia
    const siguienteCampo = camposOrdenados[indiceActual + 1];
    const siguienteElemento = document.getElementById(siguienteCampo);

    if (siguienteElemento) {
        siguienteElemento.disabled = false;
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

        // Evento diferente según tipo de elemento
        if (elemento.tagName === 'SELECT') {
            // Para selects, validar en el evento change
            elemento.addEventListener('change', function() {
                validarCampo(campo);
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

            // También validar cuando pierde el foco
            elemento.addEventListener('blur', function() {
                validarCampo(campo);
            });
        }
    });
}

/**
 * Verificar si todos los campos están validados y habilitar botón si corresponde
 */
function verificarTodosLosCampos() {
    const todosValidados = Object.values(campoValidado).every(valor => valor === true);

    // Habilitar o deshabilitar botón según corresponda
    const botonContinuar = document.querySelector('.btn-continue');
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

/**
 * Cargar ejemplo de datos para la oficina y estado (selects)
 * Función para agregar opciones de prueba a los selects
 */
function cargarDatosEjemplo() {
    // Agregar oficinas de servicio
    const oficinaSelect = document.getElementById('oficina');
    if (oficinaSelect) {
        const oficinasEjemplo = [
            { value: '1', text: 'Acaponeta' },
            { value: '2', text: 'Acapulco' },
            { value: '3', text: 'Acapulco Bahia' },
            { value: '4', text: 'Acapulco Cayaco' },
            { value: '5', text: 'Acapulco Del Sol' },
            { value: '6', text: 'Acapulco Zapata' },
            { value: '7', text: 'Acatlan' },
            { value: '8', text: 'Acayucan' },
            { value: '9', text: 'Acolman' },
            { value: '10', text: 'Actopan' },
            { value: '11', text: 'Actopan Ixmiquilpan' },
            { value: '12', text: 'Aeropuerto Df' },
            { value: '13', text: 'Agua Dulce' },
            { value: '14', text: 'Agua Prieta Frontera' },
            { value: '15', text: 'Aguascalientes Norte' },
            { value: '16', text: 'Aguascalientes Oriente' },
            { value: '17', text: 'Ajalpan' },
            { value: '18', text: 'Alamo' },
            { value: '19', text: 'Almoloya' },
            { value: '20', text: 'Altamira' },
            { value: '21', text: 'Alvaro Obregon' },
            { value: '22', text: 'Amecameca' },
            { value: '23', text: 'Amozoc' },
            { value: '24', text: 'Apatzingan' },
            { value: '25', text: 'Apizaco' },
            { value: '26', text: 'Apodaca' },
            { value: '27', text: 'Apodaca Norte' },
            { value: '28', text: 'Aragon' },
            { value: '29', text: 'Arboledas' },
            { value: '30', text: 'Atlacomulco' },
            { value: '31', text: 'Atlacomulco CI' },
            { value: '32', text: 'Atlixco' },
            { value: '33', text: 'Atoyac' },
            { value: '34', text: 'Autlan De Navarro' },
            { value: '35', text: 'Axochiapan' },
            { value: '36', text: 'Ayutla' },
            { value: '37', text: 'Azcapotzalco' },
            { value: '38', text: 'Azcapotzalco CI' },
            { value: '39', text: 'Banderilla' },
            { value: '40', text: 'Benito Juarez' },
            { value: '41', text: 'Boca Del Rio' },
            { value: '42', text: 'Caborca' },
            { value: '43', text: 'Cacahoatan' },
            { value: '44', text: 'Calpulalpan' },
            { value: '45', text: 'Campeche Baluartes' },
            { value: '46', text: 'Campeche Calkini' },
            { value: '47', text: 'Campeche Real' },
            { value: '48', text: 'Cancun' },
            { value: '49', text: 'Cancun Xcaret' },
            { value: '50', text: 'Cardel Chachalacas' },
            { value: '51', text: 'Cardenas' },
            { value: '52', text: 'Carrillo Puerto' },
            { value: '53', text: 'Catemaco' },
            { value: '54', text: 'Celaya' },
            { value: '55', text: 'Celaya CI' },
            { value: '56', text: 'Celaya Salvatierra' },
            { value: '57', text: 'Celaya Salvatierra CI' },
            { value: '58', text: 'Celaya Valle' },
            { value: '59', text: 'Centla' },
            { value: '60', text: 'Cerro Azul' },
            { value: '61', text: 'Chalco' },
            { value: '62', text: 'Chalco CI' },
            { value: '63', text: 'Champoton' },
            { value: '64', text: 'Chetumal' },
            { value: '65', text: 'Chiapa De Corzo' },
            { value: '66', text: 'Chicoloapan' },
            { value: '67', text: 'Chiconcuac' },
            { value: '68', text: 'Chihuahua' },
            { value: '69', text: 'Chilpancingo' },
            { value: '70', text: 'Chilpancingo Norte' },
            { value: '71', text: 'Chilpancingo Zocalo' },
            { value: '72', text: 'Chimalhuacan' },
            { value: '73', text: 'Chimalhuacan CI' },
            { value: '74', text: 'Cholula' },
            { value: '75', text: 'Cienega De Flores' },
            { value: '76', text: 'Cintalapa' },
            { value: '77', text: 'Ciudad AcuÃ±a' },
            { value: '78', text: 'Ciudad Altamirano' },
            { value: '79', text: 'Ciudad Del Carmen' },
            { value: '80', text: 'Ciudad Hidalgo' },
            { value: '81', text: 'Ciudad Juarez' },
            { value: '82', text: 'Ciudad Mante' },
            { value: '83', text: 'Ciudad Valles Centro' },
            { value: '84', text: 'Coacalco' },
            { value: '85', text: 'Coatepec' },
            { value: '86', text: 'Coatzacoalcos' },
            { value: '87', text: 'Coatzacoalcos Oriente' },
            { value: '88', text: 'Coatzacoalcos Puerto' },
            { value: '89', text: 'Coatzintla' },
            { value: '90', text: 'Colima' },
            { value: '91', text: 'Comalcalco Paraiso' },
            { value: '92', text: 'Comalcalco Zaragoza' },
            { value: '93', text: 'Comitan' },
            { value: '94', text: 'Comitan Sabanilla' },
            { value: '95', text: 'Compostela' },
            { value: '96', text: 'Constitucion' },
            { value: '97', text: 'Cordoba' },
            { value: '98', text: 'Cordoba Cafetalera' },
            { value: '99', text: 'Cordoba Ingenio' },
            { value: '100', text: 'Cosamaloapan' },
            { value: '101', text: 'Coyoacan' },
            { value: '102', text: 'Coyoacan CI' },
            { value: '103', text: 'Coyuca De Benitez' },
            { value: '104', text: 'Cozumel' },
            { value: '105', text: 'Cuajimalpa' },
            { value: '106', text: 'Cuauhtemoc' },
            { value: '107', text: 'Cuautitlan' },
            { value: '108', text: 'Cuautitlan CI' },
            { value: '109', text: 'Cuautla' },
            { value: '110', text: 'Cuernavaca' },
            { value: '111', text: 'Cuernavaca Centro' },
            { value: '112', text: 'Cuernavaca Jiutepec' },
            { value: '113', text: 'Cuernavaca Temixco' },
            { value: '114', text: 'Cuetzalan' },
            { value: '115', text: 'Cuitlahuac' },
            { value: '116', text: 'Culiacan' },
            { value: '117', text: 'Culiacan Sur' },
            { value: '118', text: 'Culiacan Tres Rios' },
            { value: '119', text: 'Cunduacan' },
            { value: '120', text: 'Delicias' },
            { value: '121', text: 'Dolores Hidalgo' },
            { value: '122', text: 'Durango' },
            { value: '123', text: 'Durango Mercado' },
            { value: '124', text: 'Durango Victoria' },
            { value: '125', text: 'Ecatepec' },
            { value: '126', text: 'Ecatepec Sur' },
            { value: '127', text: 'Ecatepec Sur CI' },
            { value: '128', text: 'Ensenada' },
            { value: '129', text: 'Escarcega' },
            { value: '130', text: 'Escobedo' },
            { value: '131', text: 'Escuinapa' },
            { value: '132', text: 'Escuintla' },
            { value: '133', text: 'Etla' },
            { value: '134', text: 'Fresnillo' },
            { value: '135', text: 'Gomez Palacio Poniente' },
            { value: '136', text: 'Gomez Palacio Sur' },
            { value: '137', text: 'Grajales' },
            { value: '138', text: 'Guadalajara' },
            { value: '139', text: 'Guadalupe' },
            { value: '140', text: 'Guasave Sur' },
            { value: '141', text: 'Guaymas Empalme' },
            { value: '142', text: 'Guerrero' },
            { value: '143', text: 'Hermosillo Norte' },
            { value: '144', text: 'Hermosillo Poniente' },
            { value: '145', text: 'Huajuapan' },
            { value: '146', text: 'Huamantla' },
            { value: '147', text: 'Huatabampo' },
            { value: '148', text: 'Huatulco' },
            { value: '149', text: 'Huatusco' },
            { value: '150', text: 'Huauchinango' },
            { value: '151', text: 'Huauchinango CI' },
            { value: '152', text: 'Huehuetoca' },
            { value: '153', text: 'Huehuetoca CI' },
            { value: '154', text: 'Huejotzingo' },
            { value: '155', text: 'Huejutla De Reyes' },
            { value: '156', text: 'Huejutla De Reyes CI' },
            { value: '157', text: 'Huetamo' },
            { value: '158', text: 'Huimanguillo' },
            { value: '159', text: 'Huixquilucan' },
            { value: '160', text: 'Huixtla' },
            { value: '161', text: 'Iguala Independencia' },
            { value: '162', text: 'Indios Verdes' },
            { value: '163', text: 'Insurgentes' },
            { value: '164', text: 'Insurgentes CI' },
            { value: '165', text: 'Irapuato Sur' },
            { value: '166', text: 'Isla' },
            { value: '167', text: 'Ixtapaluca' },
            { value: '168', text: 'Ixtapan De La Sal' },
            { value: '169', text: 'Ixtlahuaca' },
            { value: '170', text: 'Ixtlahuaca CI' },
            { value: '171', text: 'Iztacalco' },
            { value: '172', text: 'Iztapalapa' },
            { value: '173', text: 'Iztapalapa Sur' },
            { value: '174', text: 'Jalpa' },
            { value: '175', text: 'Jaltipan' },
            { value: '176', text: 'Jilotepec' },
            { value: '177', text: 'Jojutla' },
            { value: '178', text: 'Juarez Frontera' },
            { value: '179', text: 'Juarez Las Torres' },
            { value: '180', text: 'Juarez Norte' },
            { value: '181', text: 'Juchitan De Zaragoza' },
            { value: '182', text: 'La Joya' },
            { value: '183', text: 'La Joya CI' },
            { value: '184', text: 'La Paz Sur' },
            { value: '185', text: 'La Viga' },
            { value: '186', text: 'La Viga CI' },
            { value: '187', text: 'Lagos De Moreno' },
            { value: '188', text: 'Lazaro Cardenas' },
            { value: '189', text: 'Lazaro Cardenas Aeropuerto' },
            { value: '190', text: 'Leon Hilamas' },
            { value: '191', text: 'Leon Hilamas CI' },
            { value: '192', text: 'Leon Norte' },
            { value: '193', text: 'Lerdo Costera' },
            { value: '194', text: 'Libres' },
            { value: '195', text: 'Los Mochis' },
            { value: '196', text: 'Los Mochis Sur' },
            { value: '197', text: 'Los Reyes La Paz' },
            { value: '198', text: 'Los Reyes La Paz CI' },
            { value: '199', text: 'Macuspana' },
            { value: '200', text: 'Madero' },
            { value: '201', text: 'Manzanillo' },
            { value: '202', text: 'Maravatio' },
            { value: '203', text: 'Marquelia' },
            { value: '204', text: 'Martinez De La Torre' },
            { value: '205', text: 'Matamoros' },
            { value: '206', text: 'Matamoros Playa' },
            { value: '207', text: 'Matamoros Poniente' },
            { value: '208', text: 'Matamoros Rio' },
            { value: '209', text: 'Matehuala' },
            { value: '210', text: 'Matias Romero Cementera' },
            { value: '211', text: 'Mazatan' },
            { value: '212', text: 'Mazatlan Sur' },
            { value: '213', text: 'Medellin' },
            { value: '214', text: 'Merida' },
            { value: '215', text: 'Merida Kukulcan' },
            { value: '216', text: 'Merida Poniente' },
            { value: '217', text: 'Metepec' },
            { value: '218', text: 'Mexicali Los Reyes' },
            { value: '219', text: 'Mexicali Oriente' },
            { value: '220', text: 'Milpa Alta' },
            { value: '221', text: 'Minatitlan' },
            { value: '222', text: 'Minatitlan Carrizal' },
            { value: '223', text: 'Minatitlan Pradera' },
            { value: '224', text: 'Minatitlan Refineria' },
            { value: '225', text: 'Misantla' },
            { value: '226', text: 'Mixquiahuala' },
            { value: '227', text: 'Monclova Norte' },
            { value: '228', text: 'Montemorelos' },
            { value: '229', text: 'Monterrey' },
            { value: '230', text: 'Monterrey Pastora CI' },
            { value: '231', text: 'Monterrey Sultana CI' },
            { value: '232', text: 'Monterrey Sur' },
            { value: '233', text: 'Morelia' },
            { value: '234', text: 'Morelia Norte' },
            { value: '235', text: 'Motul' },
            { value: '236', text: 'Naranjos' },
            { value: '237', text: 'Naucalpan De Juarez' },
            { value: '238', text: 'Naucalpan De Juarez CI' },
            { value: '239', text: 'Navojoa' },
            { value: '240', text: 'Nayarit Bucerias' },
            { value: '241', text: 'Nezahualcoyotl' },
            { value: '242', text: 'Nezahualcoyotl CI' },
            { value: '243', text: 'Nicolas Romero' },
            { value: '244', text: 'Nicolas Romero CI' },
            { value: '245', text: 'Nogales Norte' },
            { value: '246', text: 'Nueva Rosita' },
            { value: '247', text: 'Nuevo Casas Grandes' },
            { value: '248', text: 'Nuevo Ideal' },
            { value: '249', text: 'Nuevo Laredo' },
            { value: '250', text: 'Oaxaca' },
            { value: '251', text: 'Oaxaca Antequera' },
            { value: '252', text: 'Oaxaca Montealban' },
            { value: '253', text: 'Oaxaca Xoxo' },
            { value: '254', text: 'Oblatos Norte' },
            { value: '255', text: 'Obregon' },
            { value: '256', text: 'Ocosingo' },
            { value: '257', text: 'Ocotlan' },
            { value: '258', text: 'Ocotlan Jalisco' },
            { value: '259', text: 'Ocozocuautla' },
            { value: '260', text: 'Ojo De Agua' },
            { value: '261', text: 'Ojo De Agua CI' },
            { value: '262', text: 'Ometepec' },
            { value: '263', text: 'Orizaba' },
            { value: '264', text: 'Orizaba Cumbres' },
            { value: '265', text: 'Orizaba Del Valle' },
            { value: '266', text: 'Pachuca' },
            { value: '267', text: 'Pachuca CI' },
            { value: '268', text: 'Palenque' },
            { value: '269', text: 'Pantitlan' },
            { value: '270', text: 'Pantitlan CI' },
            { value: '271', text: 'Panuco' },
            { value: '272', text: 'Papantla' },
            { value: '273', text: 'Papantla CI' },
            { value: '274', text: 'Papantla Cumbres' },
            { value: '275', text: 'Parral' },
            { value: '276', text: 'Patzcuaro' },
            { value: '277', text: 'PeÃ±on' },
            { value: '278', text: 'Perote' },
            { value: '279', text: 'Petrolera' },
            { value: '280', text: 'Pichucalco' },
            { value: '281', text: 'Piedras Negras' },
            { value: '282', text: 'Pijijiapan' },
            { value: '283', text: 'Pinotepa Nacional' },
            { value: '284', text: 'Playa Del Carmen' },
            { value: '285', text: 'Playa Vicente' },
            { value: '286', text: 'Pochutla' },
            { value: '287', text: 'Poza Rica' },
            { value: '288', text: 'Poza Rica CI' },
            { value: '289', text: 'Poza Rica Refineria' },
            { value: '290', text: 'Poza Rica Tajin' },
            { value: '291', text: 'Progreso' },
            { value: '292', text: 'Puebla' },
            { value: '293', text: 'Puebla 5 De Mayo' },
            { value: '294', text: 'Puebla Angelopolis' },
            { value: '295', text: 'Puebla De Zaragoza' },
            { value: '296', text: 'Puebla Oriente' },
            { value: '297', text: 'Puerto Escondido' },
            { value: '298', text: 'Puerto Madero' },
            { value: '299', text: 'Puerto PeÃ±asco' },
            { value: '300', text: 'Puerto Vallarta' },
            { value: '301', text: 'Purepero' },
            { value: '302', text: 'Queretaro CaÃ±ada' },
            { value: '303', text: 'Queretaro Norte' },
            { value: '304', text: 'Queretaro Sur' },
            { value: '305', text: 'Queretaro Sur CI' },
            { value: '306', text: 'Reforma Chiapas' },
            { value: '307', text: 'Reynosa' },
            { value: '308', text: 'Reynosa Bravo' },
            { value: '309', text: 'Reynosa Poniente' },
            { value: '310', text: 'Rio Bravo' },
            { value: '311', text: 'Rio Grande' },
            { value: '312', text: 'Rio Verde' },
            { value: '313', text: 'Salamanca' },
            { value: '314', text: 'Salina Cruz' },
            { value: '315', text: 'Saltillo' },
            { value: '316', text: 'Saltillo Norte' },
            { value: '317', text: 'Saltillo Oriente' },
            { value: '318', text: 'Saltillo Sur' },
            { value: '319', text: 'San Andres Tuxtla' },
            { value: '320', text: 'San Cristobal' },
            { value: '321', text: 'San Francisco Del Rincon' },
            { value: '322', text: 'San Jose Del Cabo' },
            { value: '323', text: 'San Juan Del Rio' },
            { value: '324', text: 'San Juan Del Rio CI' },
            { value: '325', text: 'San Lorenzo' },
            { value: '326', text: 'San Lucas Poniente' },
            { value: '327', text: 'San Luis' },
            { value: '328', text: 'San Luis Altar' },
            { value: '329', text: 'San Luis CI' },
            { value: '330', text: 'San Luis Sur' },
            { value: '331', text: 'San Martin' },
            { value: '332', text: 'San Martin Volcanes' },
            { value: '333', text: 'San Mateo Atenco' },
            { value: '334', text: 'San Miguel De Allende' },
            { value: '335', text: 'San Nicolas' },
            { value: '336', text: 'San Pablo' },
            { value: '337', text: 'San Pedro De Las Colonias' },
            { value: '338', text: 'San Quintin' },
            { value: '339', text: 'San Sebastian' },
            { value: '340', text: 'Santa Cruz' },
            { value: '341', text: 'Santa Cruz CI' },
            { value: '342', text: 'Santiago' },
            { value: '343', text: 'Santiago Acahualtepec' },
            { value: '344', text: 'Santiago Ixcuintla' },
            { value: '345', text: 'Santo Tomas Ajusco' },
            { value: '346', text: 'Satelite' },
            { value: '347', text: 'Serdan' },
            { value: '348', text: 'Serdan Oriental' },
            { value: '349', text: 'Silao' },
            { value: '350', text: 'Silao CI' },
            { value: '351', text: 'Suchiate' },
            { value: '352', text: 'Tacambaro' },
            { value: '353', text: 'Tala Jalisco' },
            { value: '354', text: 'Tamazunchale' },
            { value: '355', text: 'Tampico Madero' },
            { value: '356', text: 'Tampico Norte' },
            { value: '357', text: 'Tampico Puerto' },
            { value: '358', text: 'Tantoyuca' },
            { value: '359', text: 'Tapachula Centro' },
            { value: '360', text: 'Tapachula San Jose' },
            { value: '361', text: 'Tapachula San Juan' },
            { value: '362', text: 'Tapachula Tacana' },
            { value: '363', text: 'Taxco' },
            { value: '364', text: 'Teapa' },
            { value: '365', text: 'Tecamac' },
            { value: '366', text: 'Tecamac CI' },
            { value: '367', text: 'Tecamachalco' },
            { value: '368', text: 'Tecate' },
            { value: '369', text: 'Tecoman' },
            { value: '370', text: 'Tehuacan Centro' },
            { value: '371', text: 'Tehuacan Oriente' },
            { value: '372', text: 'Tehuacan Reforma' },
            { value: '373', text: 'Tehuantepec' },
            { value: '374', text: 'Tekax' },
            { value: '375', text: 'Temoaya' },
            { value: '376', text: 'Tenancingo' },
            { value: '377', text: 'Tenosique' },
            { value: '378', text: 'Teoloyucan' },
            { value: '379', text: 'Teotihuacan' },
            { value: '380', text: 'Teotihuacan CI' },
            { value: '381', text: 'Tepeaca' },
            { value: '382', text: 'Tepic' },
            { value: '383', text: 'Texcoco' },
            { value: '384', text: 'Teziutlan' },
            { value: '385', text: 'Tezonapa' },
            { value: '386', text: 'Ticul' },
            { value: '387', text: 'Tierra Blanca' },
            { value: '388', text: 'Tierra Blanca Norte' },
            { value: '389', text: 'Tijuana' },
            { value: '390', text: 'Tijuana 2000' },
            { value: '391', text: 'Tijuana Fundadores' },
            { value: '392', text: 'Tijuana Insurgentes' },
            { value: '393', text: 'Tijuana Loma Bonita' },
            { value: '394', text: 'Tizayuca' },
            { value: '395', text: 'Tizimin' },
            { value: '396', text: 'Tlahuac' },
            { value: '397', text: 'Tlahuac CI' },
            { value: '398', text: 'Tlajomulco' },
            { value: '399', text: 'Tlalmanalco' },
            { value: '400', text: 'Tlalmanalco CI' },
            { value: '401', text: 'Tlalnepantla' },
            { value: '402', text: 'Tlapa' },
            { value: '403', text: 'Tlaquepaque Poniente' },
            { value: '404', text: 'Tlaxcala' },
            { value: '405', text: 'Tlaxcala Santa Ana' },
            { value: '406', text: 'Tlaxiaco' },
            { value: '407', text: 'Toluca' },
            { value: '408', text: 'Toluca Centro' },
            { value: '409', text: 'Toluca Oriente' },
            { value: '410', text: 'Tonala Chiapas' },
            { value: '411', text: 'Torreon' },
            { value: '412', text: 'Torreon Oriente' },
            { value: '413', text: 'Torreon San Pedro' },
            { value: '414', text: 'Tula' },
            { value: '415', text: 'Tulancingo' },
            { value: '416', text: 'Tulancingo CI' },
            { value: '417', text: 'Tultepec' },
            { value: '418', text: 'Tultitlan' },
            { value: '419', text: 'Tuxpan' },
            { value: '420', text: 'Tuxpan CI' },
            { value: '421', text: 'Tuxtepec' },
            { value: '422', text: 'Tuxtepec Cuenca' },
            { value: '423', text: 'Tuxtepec Papaloapan' },
            { value: '424', text: 'Tuxtla Colon' },
            { value: '425', text: 'Tuxtla Grijalva' },
            { value: '426', text: 'Tuxtla Mercado' },
            { value: '427', text: 'Uruapan' },
            { value: '428', text: 'Valladolid' },
            { value: '429', text: 'Valle De Chalco' },
            { value: '430', text: 'Valles Tamtoc' },
            { value: '431', text: 'Valles Tamtoc CI' },
            { value: '432', text: 'Veracruz' },
            { value: '433', text: 'Veracruz Baluarte' },
            { value: '434', text: 'Veracruz Olmeca' },
            { value: '435', text: 'Veracruz Piedras Negras' },
            { value: '436', text: 'Veracruz Playa' },
            { value: '437', text: 'Veracruz Puerto' },
            { value: '438', text: 'Victoria Norte' },
            { value: '439', text: 'Victoria Oriente' },
            { value: '440', text: 'Victoria Rio' },
            { value: '441', text: 'Villa Cuauhtemoc' },
            { value: '442', text: 'Villa Flores' },
            { value: '443', text: 'Villa Juarez' },
            { value: '444', text: 'Villa Victoria' },
            { value: '445', text: 'Villahermosa' },
            { value: '446', text: 'Villahermosa Carrizal' },
            { value: '447', text: 'Villahermosa Medellin' },
            { value: '448', text: 'Villahermosa Usumacinta' },
            { value: '449', text: 'Xalapa Colonial' },
            { value: '450', text: 'Xalapa Las Flores' },
            { value: '451', text: 'Xalapa Los Lagos' },
            { value: '452', text: 'Xalostoc Mexico' },
            { value: '453', text: 'Xalostoc Mexico CI' },
            { value: '454', text: 'Xaloztoc' },
            { value: '455', text: 'Xicotepec' },
            { value: '456', text: 'Xochimilco' },
            { value: '457', text: 'Yautepec' },
            { value: '458', text: 'Zacapoaxtla' },
            { value: '459', text: 'Zacatecas' },
            { value: '460', text: 'Zacatecas Guadalupe' },
            { value: '461', text: 'Zacatelco' },
            { value: '462', text: 'Zacatlan' },
            { value: '463', text: 'Zacualtipan' },
            { value: '464', text: 'Zacualtipan CI' },
            { value: '465', text: 'Zamora' },
            { value: '466', text: 'Zapata' },
            { value: '467', text: 'Zihuatanejo' },
            { value: '468', text: 'Zitacuaro' },
            { value: '469', text: 'Zumpango' },
            { value: '470', text: 'Zumpango Sur' },
            { value: '471', text: 'Zumpango Sur CI' }

        ];

        oficinaSelect.innerHTML = '<option selected>Selecciona una OS</option>';
        oficinasEjemplo.forEach(oficina => {
            const option = document.createElement('option');
            option.value = oficina.value;
            option.textContent = oficina.text;
            oficinaSelect.appendChild(option);
        });
    }

    // Agregar estados
    const estadoSelect = document.getElementById('estado');
    if (estadoSelect) {
        const estadosEjemplo = [
            { value: '1', text: 'Aguascalientes' },
            { value: '2', text: 'Baja California' },
            { value: '3', text: 'Baja California Sur' },
            { value: '4', text: 'Campeche' },
            { value: '5', text: 'Chiapas' },
            { value: '6', text: 'Chihuahua' },
            { value: '7', text: 'Ciudad de México' },
            { value: '8', text: 'Coahuila' },
            { value: '9', text: 'Colima' },
            { value: '10', text: 'Durango' },
            { value: '11', text: 'Estado de México' },
            { value: '12', text: 'Guanajuato' },
            { value: '13', text: 'Guerrero' },
            { value: '14', text: 'Hidalgo' },
            { value: '15', text: 'Jalisco' },
            { value: '16', text: 'Michoacán' },
            { value: '17', text: 'Morelos' },
            { value: '18', text: 'Nayarit' },
            { value: '19', text: 'Nuevo León' },
            { value: '20', text: 'Oaxaca' },
            { value: '21', text: 'Yucatán' },
            { value: '22', text: 'Puebla' },
            { value: '23', text: 'Querétaro' },
            { value: '24', text: 'Quintana Roo' },
            { value: '25', text: 'San Luis Potosí' },
            { value: '26', text: 'Sinaloa' },
            { value: '27', text: 'Sonora' },
            { value: '28', text: 'Tabasco' },
            { value: '29', text: 'Tamaulipas' },
            { value: '30', text: 'Tlaxcala' },
            { value: '31', text: 'Veracruz' },
            { value: '32', text: 'Yucatán' },
            { value: '33', text: 'Zacatecas' },
        ];

        estadoSelect.innerHTML = '<option selected>Selecciona un estado</option>';
        estadosEjemplo.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.value;
            option.textContent = estado.text;
            estadoSelect.appendChild(option);
        });
    }
}

// Inicializar el formulario cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos de ejemplo para selects
    cargarDatosEjemplo();

    // Inicializar el formulario
    inicializarFormulario();
});
