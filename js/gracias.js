
$(document).ready(function(){
	$("#msok").hide();
	$("#msdup").hide();

	if (typeof(Storage) !== 'undefined') {
		if (sessionStorage.getItem('msPEC') ==='-3'){		
		   $("#msok").hide();
		   $("#msdup").show();
		   $("#registroFechaDup").text(sessionStorage.getItem('FechaPEC'));
		   $("#registroFolioDup").text(sessionStorage.getItem('FolioPEC'));
		}else{
			$("#msok").show();
			$("#msdup").hide();
			$("#registroFecha").text(sessionStorage.getItem('FechaPEC'));
			$("#registroFolio").text(sessionStorage.getItem('FolioPEC'));
		}
	}else{
		var query = window.location.search.substring(1);
		vars = query.split('&');
		if (vars[0].split('=')[1] ==='-3'){		
		   $("#msok").hide();
		   $("#msdup").show();
		   $("#registroFechaDup").text(vars[2].split('=')[1]);
		   $("#registroFolioDup").text(vars[1].split('=')[1]);
		}else{
			$("#msok").show();
			$("#msdup").hide();
			$("#registroFecha").text(vars[2].split('=')[1]);
			$("#registroFolio").text(vars[1].split('=')[1]);
		}		
	}

	localStorage.clear();
});
    
