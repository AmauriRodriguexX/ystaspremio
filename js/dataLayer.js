// Inicialización del dataLayer
window.dataLayer = window.dataLayer || [];

// Función para registrar click on Historia
function trackHistoriaInteraction() {
    dataLayer.push({
        'event': 'click_element',
        'CDAction': 'Banner - Clic Historia',
        'CDLabel': 'Historia',
        'CDFunnel': 'PE - Convocatoria - 2025'
    });
}

// Función para registrar visualización de video
function trackVideoInteraction(action, urlVideo, label) {
    dataLayer.push({
        'event': 'pec_2025_videos',
        'CDCategory': 'Historia',
        'CDAction': action,
        'CDValue': urlVideo,
        'CDFunnel': 'PE - Convocatoria - 2025'
    });
}

// Función para registrar interacciones con formulario
function trackInteractionPolitica() {
    dataLayer.push({
        'event': 'pe_2025_registro',
        'CDAction': '01. Aviso de privacidad',
        'CDFunnel': 'PE - Convocatoria - 2025'
    });
}

// Función para registrar interacciones con formulario
function trackFormAction(idCliente, action) {
    dataLayer.push({
        'event': 'pe_2025_registro',
        'CDAction': action,
        'CDCategory': 'Alimentos',
        'CDLabel': 'OS',
        'CDValue': idCliente,
        'CDFunnel': 'PE - Convocatoria - 2025',
    });
}


// Función para registrar click en redes sociales
function trackSocialClick(socialNetwork, action) {
    dataLayer.push({
        'event': 'click_element',
        'CDAction': action,
        'CDLabel': socialNetwork,
        'CDFunnel': 'PE - Convocatoria - 2025'
    });
}

// Función para registrar campos de formulario completados
function trackFormFieldCompleted(fieldDescription) {
    // Campos sensibles que solo enviarán "completado" como valor

    dataLayer.push({
        'event': 'pe_2025_registro',
        'CDLabel': fieldDescription,
        'CDFunnel': 'PE - Convocatoria - 2025'
    });
}


// Función para registrar carga de archivos
function trackFileUpload(fileType, filePath) {
    dataLayer.push({
        'event': 'pe_2025_registro',
        'CDLabel': fileType,
        'CDFunnel': 'PE - Convocatoria - 2025'
    });
}


// Inicialización de listeners cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {

    // Tracking de historia
    const historiaText = document.querySelector('.text-play');
    if (historiaText) {
        historiaText.addEventListener('mouseenter', function() {
            trackHistoriaInteraction();
        });
    }

    // Tracking de video
    const videoButtons = document.querySelectorAll('.button-play');
    videoButtons.forEach(playButton => {
        playButton.addEventListener('click', function() {
            // Obtener los atributos data-* personalizados
            const action = this.getAttribute('data-action') || 'play';
            const videoUrl = this.getAttribute('data-url') || '';
            const label = this.getAttribute('data-label') || '';

            trackVideoInteraction(action, videoUrl, label);
        });
    });

    // Tracking de registro
    const politicaButton = document.querySelector('.bt-politica');
    if(politicaButton) {
        politicaButton.addEventListener('click', function (e) {
            if (!this.classList.contains('btn-disabled')) {
                trackInteractionPolitica();
                setTimeout(function(){
                    window.location.href="/paso1/"
                }, 1000)
            }
        });
    }

    // Tracking de Registrarse
    const continueButtons = document.querySelectorAll('.btn-continue');
    continueButtons.forEach(regButton => {
        regButton.addEventListener('click', function() {
            dataLayer.push({
                'event': 'pe_2025_registro',
                'CDAction': '00. Clic Regístrate',
                'CDFunnel': 'PE - Convocatoria - 2025'
            });
        });
    });

    // Tracking de redes sociales
    const socialLinks = document.querySelectorAll('.social-bt');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            let socialNetwork = '';
            let socialAction="Footer - Clic redes sociales"
            const href = this.getAttribute('href');

            if (href.includes('facebook')) {
                socialNetwork = 'Footer - Facebook';
            } else if (href.includes('instagram')) {
                socialNetwork = 'Footer - Instagram';
            } else if (href.includes('youtube')) {
                socialNetwork = 'Footer - YouTube';
            } else if (href.includes('tiktok')) {
                socialNetwork = 'Footer - TikTok';
            }

            trackSocialClick(socialNetwork, socialAction);
        });
    });

    const descubrLinks = document.querySelectorAll('.links');
    descubrLinks.forEach(link => {
        link.addEventListener('click', function() {
            const href = this.getAttribute('href');
            let descubreLink = '';
            let descubreAction="Footer - Clic Descubre"

            if (href.includes('credito')) {
                descubreLink = 'Descubre - Créditos';
            } else if (href.includes('ahorros')) {
                descubreLink = 'Descubre - Ahorros';
            } else if (href.includes('inversiones')) {
                descubreLink = 'Descubre - Inversiones';
            } else if (href.includes('seguro')) {
                descubreLink = 'Descubre - Seguros';
            }else if (href.includes('privacidad')) {
                descubreLink = 'Footer - Aviso de privacidad';
                descubreAction="Footer -Clic Aviso de privacidad"
            }else if (href.includes('terminos')) {
                descubreLink = 'DFooter - Términos y condiciones';
                descubreAction="Footer - Clic Términos y condiciones"
            }

            trackSocialClick(descubreLink, descubreAction);
        });
    });

    // FORM STEP 1 - Tracking de campos del formulario
    if (document.getElementById('step1Form')) {
        // Campos del Step 1
        const step1Fields = [
            { id: 'idCliente', name: 'IDCliente', desc: '01. ID Cliente ' },
            { id: 'nombre', name: 'nombre', desc: '02. Nombre' },
            { id: 'apellido', name: 'apellido', desc: '03. Apellido' },
            { id: 'celular', name: 'celular', desc: '04. Teléfono'  },
            { id: 'oficina', name: 'oficina', desc: '05. Oficina de Servicio' },
            { id: 'estado', name: 'estado', desc: '06. Estado de la república ' },
            { id: 'municipio', name: 'municipio', desc: '07.Municipio' },
            { id: 'giro', name: 'giro', desc: '08. Giro de Negocio' }
        ];

        // Agregar listeners a cada campo
        step1Fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (element) {
                // Para inputs y selects, detectar cuando pierden foco
                element.addEventListener('blur', function() {
                    if (this.value.trim() !== '') {
                        trackFormFieldCompleted(field.desc);
                    }
                });

                // Para selects, también detectar cambios
                if (element.tagName === 'SELECT') {
                    element.addEventListener('change', function() {
                        if (this.value !== '') {
                            trackFormFieldCompleted(field.desc);
                        }
                    });
                }
            }
        });

        // Tracking cuando se envía el step 1
        document.getElementById('step1Form').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío normal para tracking
            const element = document.getElementById('idCliente');
            trackFormAction(element.value || '', '02. Datos de cliente');
            localStorage.setItem('idcliente', element.value);
            setTimeout(function(){
                window.location.href="/paso2/"
            }, 500)
        });
    }

    // FORM STEP 2 - Tracking de campos del formulario
    if (document.getElementById('step2Form')) {
        // Campos del Step 2
        const step2Fields = [
            { id: 'nombre2', name: 'nombre2', desc: '09. Nombre del colaborador' },
            { id: 'apellidos2', name: 'apellidos2', desc: '10. Apellidos' },
            { id: 'celular2', name: 'celular2', desc: '11. Teléfono'  },
            { id: 'justificacion', name: 'justificacion', desc: '12. Justificación de la nominación' },
        ];

        // Agregar listeners a cada campo
        step2Fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (element) {
                // Para inputs y textareas, detectar cuando pierden foco
                element.addEventListener('blur', function() {
                    if (this.value.trim() !== '') {
                        trackFormFieldCompleted( field.desc);
                    }
                });
            }
        });

        // Tracking cuando se envía el step 2
        document.getElementById('step2Form').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío normal para tracking
            console.log('03. Colaborador')
            trackFormAction(localStorage.getItem('idcliente') || '', '03. Colaborador');
            setTimeout(function(){
                window.location.href="/paso3/"
            }, 500)
        });
    }

    // FORM STEP 3 - Tracking de archivos y checkbox
    if (document.getElementById('uploadForm')) {
        // Tracking de carga de video
        const videoInput = document.getElementById('videoInput');
        if (videoInput) {
            videoInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const fileName = this.files[0].name;
                    const filePath = `/uploads/videos/${fileName}`;
                    trackFileUpload('13. Video', filePath);
                }
            });
        }

        // Tracking de carga de foto
        const fotoInput = document.getElementById('fotoInput');
        if (fotoInput) {
            fotoInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const fileName = this.files[0].name;
                    const filePath = `/uploads/fotos/${fileName}`;
                    trackFileUpload('14. Fotografía', filePath);
                }
            });
        }

        // Tracking de checkbox
        const checkboxAcepto = document.getElementById('checkboxAcepto');
        if (checkboxAcepto) {
            checkboxAcepto.addEventListener('change', function() {
                if (this.checked) {
                    trackFormFieldCompleted( '15. Checkbox');
                }
            });
        }

        // Tracking cuando se envía el formulario completo
        document.getElementById('uploadForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío normal para tracking

            trackFormAction(localStorage.getItem('idcliente') || '', '04. Multimedia');
            setTimeout(function(){
                window.location.href="/gracias/"
            }, 500)

        });
    }

    if (document.getElementById('endRegister')) {
        dataLayer.push({
            'event': 'registro_emprendedores',
            'CDAction': '05. Registro Completado',
            'CDCategory': 'Alimentos',
            'CDLabel': 'OS',
            'CDValue': localStorage.getItem('idcliente'),
            'CDFunnel': 'PE - Convocatoria - 2025',
            'lead_id': '276870'
        });

        const blogButton = document.getElementById('btnBlog');
        if(blogButton) {
            blogButton.addEventListener('click', function (e) {
                dataLayer.push({
                    'event': 'click_element',
                    'CDAction': 'Banner sigue creciendo - Ir a blog',
                    'CDLabel': 'Ir a blog',
                    'CDFunnel': 'PE - Convocatoria - 2025'
                });
            });
        }

        const sitioButton = document.getElementById('btnSitio');
        if(sitioButton) {
            sitioButton.addEventListener('click', function (e) {
                dataLayer.push({
                    'event': 'click_element',
                    'CDAction': 'Banner sigue creciendo - Sitio oficial',
                    'CDLabel': 'Sitio oficial',
                    'CDFunnel': 'PE - Convocatoria - 2025'
                });
            });
        }
    }

    setupModalVideoTracking()
});






// Función para enviar el evento al dataLayer
function sendVideoProgressEvent(action, videoUrl) {
    dataLayer.push({
        'event': 'pec_2025_videos',
        'CDCategory': 'Historia',
        'CDAction': action,
        'CDValue': videoUrl,
        'CDFunnel': 'PE - Convocatoria - 2025'
    });

    console.log(`Video progress tracked: ${action}`);
}

// Configurar el seguimiento para todos los videos en modaless
function setupModalVideoTracking() {
    // Buscar todos los modales que contienen videos
    const videoModals = document.querySelectorAll('.modal:has(video)');

    videoModals.forEach(modal => {
        // Cuando se abre el modal, configurar el tracking para su video
        modal.addEventListener('shown.bs.modal', function() {
            const modalVideo = this.querySelector('video');

            if (modalVideo) {
                // Reiniciar el tracking para este video específico
                const reportedProgress = {
                    '25': false,
                    '50': false,
                    '75': false,
                    '99': false,
                };

                // Obtener la URL del video
                let videoUrl = '';

                if (modalVideo.src) {
                    videoUrl = modalVideo.src;
                } else if (modalVideo.querySelector('source')) {
                    videoUrl = modalVideo.querySelector('source').src;
                }

                // Normalizar la URL para el dataLayer
                videoUrl = videoUrl.split('?')[0];

                // Listener para el evento timeupdate
                const timeUpdateHandler = function() {
                    const percentComplete = Math.floor((modalVideo.currentTime / modalVideo.duration) * 100);

                    if (percentComplete >= 25 && !reportedProgress['25']) {
                        sendVideoProgressEvent('02. Progreso 25%', videoUrl);
                        reportedProgress['25'] = true;
                    }

                    if (percentComplete >= 50 && !reportedProgress['50']) {
                        sendVideoProgressEvent('02. Progreso 50%', videoUrl);
                        reportedProgress['50'] = true;
                    }

                    if (percentComplete >= 75 && !reportedProgress['75']) {
                        sendVideoProgressEvent('02. Progreso 75%', videoUrl);
                        reportedProgress['75'] = true;
                    }
                    if (percentComplete >= 100 && !reportedProgress['9']) {
                        sendVideoProgressEvent('03. Completado', videoUrl);
                        reportedProgress['100'] = true;
                    }
                };

                // Añadir el listener al video
                modalVideo.addEventListener('timeupdate', timeUpdateHandler);

                // Reiniciar el seguimiento si el video se reinicia
                modalVideo.addEventListener('seeking', function() {
                    if (modalVideo.currentTime < modalVideo.duration * 0.25) {
                        reportedProgress['25'] = false;
                    }
                    if (modalVideo.currentTime < modalVideo.duration * 0.5) {
                        reportedProgress['50'] = false;
                    }
                    if (modalVideo.currentTime < modalVideo.duration * 0.75) {
                        reportedProgress['75'] = false;
                    }
                    if (modalVideo.currentTime < modalVideo.duration * 0.99) {
                        reportedProgress['100'] = false;
                    }
                });

                // Cuando se cierra el modal, limpiar listeners para evitar duplicados
                modal.addEventListener('hidden.bs.modal', function() {
                    modalVideo.removeEventListener('timeupdate', timeUpdateHandler);
                });
            }
        });
    });
}



