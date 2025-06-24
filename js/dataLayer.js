// Inicialización del dataLayer
window.dataLayer = window.dataLayer || [];
var timeVideo = 0;
let closebtn = false;
// Función para registrar click on Historia
function trackHistoriaInteraction() {
    dataLayer.push({
        'event': 'click_element',
        'CDAction': 'Banner - Clic Historia',
        'CDLabel': 'Historia',
        'CDFunnel': 'PE - Convocatoria - 2025'
    });
}
function trackClosePauseVideo({ tipo, valor = null }) {
    const video = document.getElementById('modal-video');
    if(valor != null)
    {
        timeVideo = valor;
    }
    else
    {
        dataLayer.push({
            'event': 'pec_2025_videos',
            'CDCategory': 'Historia',
            'CDAction': '02. Progreso ' + timeVideo,
            'CDValue': video.currentSrc,
            'CDFunnel': 'PE - Convocatoria - 2025'
        });
    }
}

// Función para registrar campos de formulario completados
function trackFormFieldCompleted(fieldDescription) {
    // Campos sensibles que solo enviarán "completado" como valor
    dataLayer.push({
        'event': 'form_field',
        'CDLabel': fieldDescription,
        'CDFunnel': 'PE - Convocatoria - 2025'
    });
}
// Función para registrar interacciones con formulario
function trackFormAction(idCliente, action) {
    dataLayer.push({
        'event': 'pe_2025_registro',
        'CDAction': action,
        'CDCategory': localStorage.getItem('oficina'),
        'CDLabel': localStorage.getItem('giro'),
        'CDValue': idCliente,
        'CDFunnel': 'PE - Convocatoria - 2025',
    });
}

// Función para registrar carga de archivos
function trackFileUpload(fileType, filePath) {
    dataLayer.push({
        'event': 'form_field',
        'CDLabel': fileType,
        'CDFunnel': 'PE - Convocatoria - 2025'
    });
}
// Inicialización de listeners cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    
    // Tracking de historia
    const historiaText = document.querySelector('.text-play');
    if (historiaText) {
        // Detecta si el clic fue en el botón "Historia"
        document.querySelector('.button-play')?.addEventListener('click', function () {
            trackHistoriaInteraction();
            dataLayer.push({
                'event': 'pec_2025_videos',
                'CDCategory': 'Historia',
                'CDAction': '01. Inicio',
                'CDValue': 'https://www.multimedia.gentera.com.mx/compartamos/PEC_2025/Yastas/video-historia.mp4',
                'CDFunnel': 'PE - Convocatoria - 2025'
            });
        });
        historiaText.addEventListener('click', function() {
            trackHistoriaInteraction();
        });
    }

    const video = document.getElementById('modal-video');
    const cerrarBtn = document.getElementById('btnCloseModal');

    if(video != null)
    {
        // Para llevar registro de qué porcentajes ya se enviaron
        const progresosEnviados = new Set();

        // Evento para capturar el progreso en múltiplos de 5%
        video.addEventListener('timeupdate', () => {
            const duracion = video.duration;
            if (!duracion) return;

            const porcentaje = (video.currentTime / duracion) * 100;
            const progresoRedondeado = Math.floor(porcentaje / 5) * 5;

            if (
            progresoRedondeado >= 5 &&
            progresoRedondeado <= 95 &&
            !progresosEnviados.has(progresoRedondeado)
            ) {
            progresosEnviados.add(progresoRedondeado);
            trackClosePauseVideo({ tipo: 'progreso', valor: `${progresoRedondeado}%` });
            }
        });

        // Evento cierre (cuando se presiona el botón cerrar)
        cerrarBtn.addEventListener('click', () => {
            closebtn = true;
            trackClosePauseVideo({ tipo: 'cerrar' });
        });
        
        // Tracking de Registrarse
        const registerButtons = document.querySelectorAll('.btn-register');
        registerButtons.forEach(regButton => {
            regButton.addEventListener('click', function() {
                dataLayer.push({
                    'event': 'pe_2025_registro',
                    'CDAction': '00. Clic Regístrate',
                    'CDFunnel': 'PE - Convocatoria - 2025'
                });
            });
        });
        
        // Tracking de Registrarse
        const hereButtons = document.querySelectorAll('.btn-continue:not(.bt-politica)');
        hereButtons.forEach(regButton => {
            regButton.addEventListener('click', function() {
                dataLayer.push({
                    'event': 'pe_2025_registro',
                    'CDAction': '00. Clic Regístrate',
                    'CDFunnel': 'PE - Convocatoria - 2025'
                });
            });
        });
        const continueButtons = document.querySelectorAll('.btn-continue.bt-politica');
        continueButtons.forEach(regButton => {
            regButton.addEventListener('click', function() {
                dataLayer.push({
                    'event': 'pe_2025_registro',
                    'CDAction': '01. Aviso de privacidad',
                    'CDFunnel': 'PE - Convocatoria - 2025'
                });
                setTimeout(function(){
                    window.location.href="/paso1/"
                }, 500)
            });
        });

    }
    
    // FORM STEP 1 - Tracking de campos del formulario
    if (document.getElementById('step1Form')) {
        // Campos del Step 1
        const step1Fields = [
            { id: 'idCliente', name: 'IDCliente', desc: '01. ID Comercio ' },
            { id: 'nombre', name: 'nombre', desc: '02. Nombre' },
            { id: 'apellido', name: 'apellido', desc: '03. Apellido' },
            { id: 'celular', name: 'celular', desc: '04. Teléfono'  },
            { id: 'oficina', name: 'oficina', desc: '05. Oficina de Servicio' },
            { id: 'estado', name: 'estado', desc: '06. Estado de la república ' },
            { id: 'municipio', name: 'municipio', desc: '07.Municipio' },
            { id: 'giro', name: 'giro', desc: '08. Giro de Negocio' }
        ];

        // Agregar listeners a cada campo
            // Solo registrar una vez por campo
            const trackedFields = new Set();

            step1Fields.forEach(field => {
                const element = document.getElementById(field.id);
                if (!element) return;

                const handler = () => {
                    if (element.value.trim() !== '' && !trackedFields.has(field.id)) {
                        trackFormFieldCompleted(field.desc);
                        trackedFields.add(field.id);
                    }
                };

                // Usar sólo un tipo de evento por campo, según el tipo de input
                if (element.tagName === 'SELECT') {
                    element.addEventListener('change', handler);
                } else {
                    element.addEventListener('blur', handler);
                }
            });
        // Tracking cuando se envía el step 1
        document.getElementById('step1Form').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío normal para tracking
            const element = document.getElementById('idCliente');
            trackFormAction(element.value || '', '02. Datos del comicionista');
            localStorage.setItem('idcliente', element.value);
            setTimeout(function(){
                window.location.href="../paso2/"
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
                window.location.href="../paso3/"
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
                //window.location.href="../gracias/"

            }, 500)
            grecaptcha.execute();
        });
    }
    
    if (document.getElementById('endRegister')) {
        dataLayer.push({
            'event': 'registro_emprendedores',
            'CDAction': '05. Registro Completado',
            'CDCategory': localStorage.getItem('oficina'),
            'CDLabel': localStorage.getItem('giro'),
            'CDValue': localStorage.getItem('idcliente'),
            'CDFunnel': 'PE - Convocatoria - 2025',
            'lead_id': document.getElementsByClassName("confirmation-number")[0].textContent.trim()
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

    // Tracking de redes sociales
    const socialLinks = document.querySelectorAll('.social-bt');
    if(socialLinks != null)
    {
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
    }

});