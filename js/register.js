var endPointSendData = "https://www.prospeccion.compartamos.com.mx:8583/pec-web/web/v1/solicitud/submit";
var submitThreeCounterRegister = 0;
var MSG_ERROR_GRAL="Error al ingresar la solicitud, favor de intentar mas tarde";

const VIDEO_MAX_SIZE_MB = 25;
const VIDEO_MAX_SIZE_BYTES = 1024 * 1024 * VIDEO_MAX_SIZE_MB;

const IMG_MAX_SIZE_MB = 5;
const IMG_MAX_SIZE_BYTES = 1024 * 1024 * IMG_MAX_SIZE_MB;

const registration_fields = document.querySelectorAll('#step1 input,#step1 select')

$(document).ready(function() {

	$('#msError').css({'color':'red','text-align':'center'});
	$("#msError").hide();
});

let videoValido = false;
let imagenValida = false;

function validateVideo() {

	let videoallowedExtensions = /(\.mp4|\.mov)$/i;
	let field = $('#video')[0];

	videoValido = false;

	if (field.value == '') {
		return false; 
	}

	let totalSize = field.files[0].size;

    if (totalSize > VIDEO_MAX_SIZE_BYTES) {
        return false;
    }

    if(!videoallowedExtensions.exec(field.value)) {
    	return false;
    }

	videoValido = true;
    
    return true;

}

function validateImage() {

	imagenValida = false;

	let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;;
	let field = $('#photo')[0];

	if (field.value == '') {
		return false; 
	}

	let totalSize = field.files[0].size;

    if (totalSize > IMG_MAX_SIZE_BYTES) {
        return false;
    }

    if(!allowedExtensions.exec(field.value)) {
    	return false;
    }

    imagenValida = true;
    
    return true;

}

function registrarCandidato(token){
	$("#msError").hide();
	spinnerOn('Registrando informaci\u00F3n...');
	$('.msgErrorFrm3').hide();

	var formData = armarFormulario(token);
	
	var opts = {
		 method: 'POST',
		 type: 'POST',
	     data : formData,
	     url: endPointSendData,
	     cache: false,
	     contentType: false,
	     processData: false,
	     success: function(data){
	     	console.log(data);
	    	if (data.codigo == 0){
                $('#frmSecReg').hide();
				$('#frmSecTy').show();
				localStorage.setItem('submitted-form',true);
                cleanForm();
				if(data.codigo == 0){
					
					dataLayer.push({
   						'event': 'registro_emprendedores_2025',
   						'CDAction': '05. Registro Completado',
   						'CDValue': localStorage.getItem('idcliente'),
   						'lead_id': data.solicitud.folio
						});
				}
                if (typeof(Storage) !== 'undefined') {
						setTimeout(function(){
							sessionStorage.setItem('FolioPEC', data.solicitud.folio);
							sessionStorage.setItem('FechaPEC', data.solicitud.fecAlta);
							sessionStorage.setItem('msPEC', data.codigo);
							location.href = '../gracias/'
            			}, 500)
						
					} else {
						setTimeout(function(){
							location.href = '../gracias/?msPEC' + data.codigo + '&FolioPEC' + data.solicitud.folio + '&FechaPEC' + data.solicitud.fecAlta 
            			}, 500)
					}
				
            } else {
				gestionaError(data);
            }
         },
         error: function (data, status, xhr) {

	    	try {
	    	   var data = data.responseJSON;
	    	   var msj = "Validar campos del formulario";

	    	   console.log(data);
	    	   
	   			if (data.codigo === -1) {
					msErrorsend("Token invalido, intente de nuevo");					
						   	   			
	   			} else if (data.codigo === -2 && data.errores !== null) {
	   				msj = data.mensaje + " validar: ";
	   				$.each(data.errores, function(index, item) {
	   					var labelElem = item ;

	   					if (labelElem.length > 0) {
	   						msj += "*" + labelElem;							
	   					} 
	   				});	   				
	   				
					msErrorsend(msj);							   			
	   			
				} else if (data.codigo === -3) {
					if (typeof(Storage) !== 'undefined') {
						sessionStorage.setItem('FolioPEC', data.solicitud.folio);
						sessionStorage.setItem('FechaPEC', data.solicitud.fecAlta);
						sessionStorage.setItem('msPEC', data.codigo);
						location.href = '../gracias/'
					} else {
						location.href = '../gracias/?msPEC' + data.codigo + '&FolioPEC' + data.solicitud.folio + '&FechaPEC' + data.solicitud.fecAlta 
					}
														
				} else {
					msErrorsend(MSG_ERROR_GRAL);	
	    		   	}
			} catch(err) {
				
				msErrorsend(MSG_ERROR_GRAL);				
	        	return;
			}
         },
         complete: function(data) {
        	 grecaptcha.reset();
        	 spinnerOff();
         }
	 };
	
	if(formData.fake) {
	    opts.xhr = function() { var xhr = jQuery.ajaxSettings.xhr(); xhr.send = xhr.sendAsBinary; return xhr; }
	    opts.contentType = "multipart/form-data; boundary="+data.boundary;
	    opts.data = formData.toString();
	}
	
	$.ajax(opts);
}

function armarFormulario(token){
	var formData = new FormData();
	
	formData.append('aviso', 'si');
	
	formData.append('giroNegocio', localStorage.getItem("giro"));
	formData.append('justificacion', localStorage.getItem("justificacion"));
	
	addFileField(formData, 'doc1', $('#videoInput')[0].files[0]);
	addFileField(formData, 'doc2', $('#fotoInput')[0].files[0]);

	if(localStorage.getItem('oficina') != undefined){
		formData.append('os', localStorage.getItem('oficina'));
	}else{
		formData.append('os', 'NA');
	}
	
	var strFolio='000000000000';
	strFolio = strFolio.substring(localStorage.getItem('idcliente').trim().length) + localStorage.getItem('idcliente').trim();
	formData.append('idCliente', strFolio);
	formData.append('id_comercio', localStorage.getItem('idcliente'));
	formData.append('nombre', localStorage.getItem('nombre'));
	formData.append('apellidos', localStorage.getItem('apellidos'));
	formData.append('numTel', localStorage.getItem('numTel'));
	
	formData.append('estado', localStorage.getItem('estado'));
	if (localStorage.getItem('municipio')== undefined){
		addOptionalField(formData, 'municipio', 'NA');
	}else{
		addOptionalField(formData, 'municipio', localStorage.getItem('municipio'));
	}
	formData.append('promNombre', localStorage.getItem('promNombre'));
	formData.append('promApellidos', localStorage.getItem('promApellidos'));
	formData.append('promNumTel', localStorage.getItem('promNumTel'));


	formData.append('tipo', "Comisionista");
	let cbSource = localStorage.getItem('cb_source');
	let cbMedium = localStorage.getItem('cb_medium');
	let cbCampaign = localStorage.getItem('cb_campaign');
	let cbContent = localStorage.getItem('cb_content');
	if (cbSource == undefined && cbMedium == undefined && cbCampaign == undefined && cbContent == undefined) {
		formData.append('source','N/A');
		formData.append('medium','N/A');
		formData.append('campaign','N/A');
		formData.append('content', 'N/A');
	} else {
		formData.append('source',localStorage.getItem("cb_source"));
		formData.append('medium',localStorage.getItem("cb_medium"));
		formData.append('campaign',localStorage.getItem("cb_campaign"));
		formData.append('content',localStorage.getItem("cb_content"));
	}

	let iscomisionista = '1';
	formData.append('iscomisionista', iscomisionista);

	formData.append('token', token);
	
	return formData;
}

function addOptionalField(formData, fieldName, fieldValue){
    if ($.trim(fieldValue)){
        formData.append(fieldName, fieldValue);
    }
}

function addFileField(formData, fieldName, fieldValue){
	if(fieldValue)
		formData.append(fieldName, fieldValue);
}

function gestionaError(data){
	var msjError = '';
	if (data.codigo){
		if (data.codigo == -1){
			msjError = MSG_ERROR_GRAL;
			msErrorsend(msjError);
		} else if (data.codigo == -2){
			msjError = 'No se pudo enviar la información. Favor de llenar todos los campos obligatorios.';
			msErrorsend(msjError);
		} else if (data.codigo == -3){
			$('#frmSecReg').hide();
			$('#frmSecTy').show();
			cleanForm();
			if (typeof(Storage) !== 'undefined') {
					sessionStorage.setItem('FolioPEC', data.solicitud.folio);
					sessionStorage.setItem('FechaPEC', data.solicitud.fecAlta);
					sessionStorage.setItem('msPEC', data.codigo);
					location.href = '../gracias/'
				} else {
					location.href = '../gracias/?msPEC' + data.codigo + '&FolioPEC' + data.solicitud.folio + '&FechaPEC' + data.solicitud.fecAlta 
				}
		} else if (data.codigo == -4){
			msjError = 'Formato de n&uacute;mero telefónico incorrecto.';
			var idCampo = getCampoTel(data.respuesta);
			$(idCampo).addClass('req_field');
		} else if (data.codigo == -5){
			msjError = 'El n&uacute;mero telefónico que ingresaste no es v&aacute;lido.';
			var idCampo = getCampoTel(data.respuesta);
			$(idCampo).addClass('req_field');
		} else {
			msjError = MSG_ERROR_GRAL;
		}
    } else {
    	msjError = MSG_ERROR_GRAL;
    }    
	msErrorsend(msjError);
}
function cleanForm(){

}

function spinnerOn(mensaje){
	$.blockUI({
	  css: { 
		border: 'none', 
		padding: '15px', 
		backgroundColor: '#000', 
		'-webkit-border-radius': '10px', 
		'-moz-border-radius': '10px',
		opacity: .7, 
		color: '#fff'
	  },
	  fadeIn: 0,
	  message: '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>'+mensaje,
	  baseZ: 99995,
	  overlayCSS:  {
		backgroundColor: '#000',
		opacity: 0.7,
		cursor: 'wait'
	  }
	});
  }
  
  function spinnerOff(){
	if ($(".blockUI").length != 0){
	  $.unblockUI();
	}
  }

  function msErrorsend(msg){
	$('#msError').text(msg);
	$('#msError').show();	
	var etop = $('#msError').offset().top;
		$('html, body').animate({
		  scrollTop: etop
		}, 1000);
	grecaptcha.reset();
}
