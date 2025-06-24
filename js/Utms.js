//MMG - PEC2024
$(document).ready(function() {
	
	let vars = utms();
	let cbSource = localStorage.getItem('cb_source');
	let cbMedium = localStorage.getItem('cb_medium');
	let cbCampaign = localStorage.getItem('cb_campaign');
	let cbContent = localStorage.getItem('cb_content');
	if(vars.length>0 && (cbSource == undefined && cbMedium == undefined && cbCampaign == undefined && cbContent == undefined)){
		localStorage.setItem('cb_source',((vars["utm_source"].trim()=='' )? 'N/A': vars["utm_source"]));
		localStorage.setItem('cb_medium',((vars["utm_medium"].trim() =='' )? 'N/A': vars["utm_medium"]));
		localStorage.setItem('cb_campaign',((vars["utm_campaign"].trim() =='' )? 'N/A': vars["utm_campaign"]));
		localStorage.setItem('cb_content',((vars["utm_content"].trim() =='')? 'N/A': vars["utm_content"]));
	}
	else{
		localStorage.setItem('cb_source','N/A');
		localStorage.setItem('cb_medium','N/A');
		localStorage.setItem('cb_campaign','N/A');
		localStorage.setItem('cb_content','N/A');
	}

});

function utms(){
  var vars = [], hash;
var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
      hash = hashes[i].split('=');
  if (hash[0]=='utm_source' || hash[0]=='utm_medium' || hash[0]=='utm_content' || hash[0]=='utm_campaign' ){
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  }
  return vars;
}
//MMG - PEC2024