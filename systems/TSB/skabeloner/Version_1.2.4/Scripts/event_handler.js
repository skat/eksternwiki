var lukVindue = false;
var indlaest = false;
var inputant = 0;
var IE = false;
var NS = false;

if (document.all && document.getElementById) {
  IE = true;
  if ((navigator.userAgent).indexOf("Opera") != -1) {
    IE = false;
  }
}

if (navigator.product == "Gecko") {
  NS = true;
}

if (document.getElementById) { // Udfoeres inden indlaesning af body og efter indlaesning af styleshet
  var el = document.getElementById('defaultstyle');
  if (el !=null) {
    if (IE == true) {
      opdater_IE_style();
    }
    else if (NS == true) {
      opdater_NS_style();
    }
  }
}
function opdater_IE_style() {
	  document.styleSheets["defaultstyle"].addRule ("table.meddelelse", "filter:progid:DXImageTransform.Microsoft.Shadow(color='#777777',direction=135,strength=3)");
}
function opdater_NS_style() {
	  document.getElementById('defaultstyle').sheet.insertRule('input.deaktiveret {-moz-user-focus:ignore}', document.getElementById('defaultstyle').sheet.cssRules.length);
	  document.getElementById('defaultstyle').sheet.insertRule('table.meddelelse {-moz-border-radius:10px}', document.getElementById('defaultstyle').sheet.cssRules.length);
}

function start() {
  indlaest = true;
  CheckPdfViewValid(true);
  var el = document.getElementById('genoptagTekst');
  if (el !=null) {
  	document.forms[0].elements.genoptagTekst.focus();
  }
}

function afslut() {
  luk_ekstra_vinduer();
}


function PdfViewValid() {
    var browser_id = "";
    var pdf_view_valid = false;

    if (navigator) {
        var ualow = navigator.userAgent.toLowerCase();

        if (ualow.indexOf("msie") > -1) browser_id = "ie";
        else if (ualow.indexOf("chrome") > -1) browser_id = "chrome";
        else if (ualow.indexOf("firefox") > -1) browser_id = "firefox";
        else if (ualow.indexOf("mozilla") > -1) browser_id = "mozilla";
        else if (ualow.indexOf("opera") > -1) browser_id = "opera";
    }

    try {
        switch (browser_id) {
            // IE (on desktop) ActiveX aware
            case "ie":
                var ax = null;

                // AcroPDF.PDF from version 7
                try {
                    ax = new ActiveXObject('AcroPDF.PDF');
                }
                catch (e) {
                }

                //  PDF.PdfCtrl up to version 6
                if (ax == null) {
                    try {
                        ax = new ActiveXObject('PDF.PdfCtrl');
                    }
                    catch (e) {
                    }
                }

                if (ax != null) {
                    pdf_view_valid = true;
                }
                break;

            // Google Chrome has builtin or Adobe 
            case "chrome":
                for (key in navigator.plugins) {
                    if (navigator.plugins[key].name == "Chrome PDF Viewer" || navigator.plugins[key].name == "Adobe Acrobat") {
                        pdf_view_valid = true;
                        break;
                    }
                }
                break;

            // Firefox, mozilla, opera and others with support for navigator.plugins 
            default:
                for (key in navigator.plugins) {
                    if (navigator.plugins[key].name.indexOf("Adobe Acrobat") == 0 || navigator.plugins[key].name.indexOf("Adobe Reader") == 0) {
                        pdf_view_valid = true;
                        break;
                    }
                } 
                break;
        }
    }
    catch (e) {
    }

    return pdf_view_valid;
}

function CheckPdfViewValid(warning) {
    var valid = PdfViewValid();
    if (!valid) {
        CheckPdfViewValidAlert(warning);
    }
    return valid;
}

function CheckPdfViewValidAlert(warning) {
    if (warning) {
        alert("Warning: PDF view NOT Valid");
    }
    else {
        alert("Stop: PDF view NOT Valid");
    }
}

function check_genvejs_menu() {
  var elTag = window.event.srcElement.tagName;
  if (elTag.toLowerCase() != 'input' && elTag.toLowerCase() != 'body' && elTag.toLowerCase() != 'td') {
    return false;
  }
}

function naviger_til_fejl(name) {
	if (!indlaest) {
	    meddelelse_om_indlaesning();
	  } else { 
	    document.forms[0].elements[name].focus();
	    document.forms[0].elements[name].style.borderColor = "red";
	  }
}
function naviger_til_fejl_box(name, rubrik) {
	if (!indlaest) {
	    meddelelse_om_indlaesning();
	  } else { 
		  var divname = name + 'Div';
		    document.getElementById(divname).style.borderColor = "red";
		    document.forms[0].elements[rubrik][0].focus();
	  }
}

function check_meddelelse_print() {  // P.g.a. fejl i IE under Windows XP
  var el = document.getElementById('meddelelse');
  if (el !=null) {
    el.className = "meddelelse";
  }
}
function check_meddelelse_skaerm() {  // P.g.a. fejl i IE under Windows XP
  var el = document.getElementById('meddelelse');
  if (el !=null) {
    el.className = "meddelelse_print_IE";
  }
}

function doSubmitAdvis(knap) {
 	check_luk_vindue();
 	if(lukVindue){
 	deaktiver_knapper();
 	luk_ekstra_vinduer()
 	if(knap == 'ret'){
 	   	document.selvangivelse.action = ret_action;
 	}
 	if(knap == 'godkend'){
 	   	document.selvangivelse.action = godkend_action;
 	}
 	document.selvangivelse.submit();
 	}
}
function doSubmitIndberetning() {
 	check_luk_vindue();
 	if(lukVindue){
 	deaktiver_knapper();
 	luk_ekstra_vinduer()
 	document.indberetning.submit();
 	}
}
function doMenu() {
	luk_ekstra_vinduer()
	window.location='/borger/menu';
}

function check_luk_vindue(){
	 if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  if (befor && befor.open && !befor.closed) {
    var msg = "Vindue til opgørelse/beregning af befordringsfradrag er åbent\n"+
              "og kan indeholde ændringer, som ikke er blevet anvendt.\n\n"+
              "Af sikkerhedsmæssige årsager vil systemet lukke vinduet.\n\n"+
              "Ønsker du selv at lukke vinduet og vælge knappen \"Godkend\"\n"+
              "igen?";
    if (confirm(msg)) {
      befor.window.focus();
	  return;
    }
  }
  if (aktie && aktie.open && !aktie.closed) {
    var msg = "Vindue til aktiesystemet er åbent\n"+
              "og kan indeholde ændringer, som ikke er blevet anvendt.\n\n"+
              "Af sikkerhedsmæssige årsager vil systemet lukke vinduet.\n\n"+
              "Ønsker du selv at lukke vinduet og vælge knappen \"Godkend\"\n"+
              "igen?";
    if (confirm(msg)) {
      aktie.window.focus();
	  return;
    }
  }
    if (aktiehenstand && aktiehenstand.open && !aktiehenstand.closed) {
    var msg = "Vindue til aktieavanceberegningssystem er åbent\n"+
              "og kan indeholde ændringer, som ikke er blevet anvendt.\n\n"+
              "Af sikkerhedsmæssige årsager vil systemet lukke vinduet.\n\n"+
              "Ønsker du selv at lukke vinduet og vælge knappen \"Godkend\"\n"+
              "igen?";
    if (confirm(msg)) {
      aktiehenstand.window.focus();
	  return;
    }
  }
  if (regnskab && regnskab.open && !regnskab.closed) {
    var msg = "Vindue til regnskabsoplysninger er åbent og kan indeholde\n"+
              "ændringer, som ikke er blevet anvendt.\n\n"+
              "Af sikkerhedsmæssige årsager vil systemet lukke vinduet.\n\n"+
              "Ønsker du selv at lukke vinduet og vælge knappen \"Godkend\"\n"+
              "igen?";
    if (confirm(msg)) {
      regnskab.window.focus();
	  return;
    }
  }
  if (ejd && ejd.open && !ejd.closed) {
    var msg = "Vindue til registreret dansk ejendom er åbent og kan indeholde\n"+
              "ændringer, som ikke er blevet anvendt.\n\n"+
              "Af sikkerhedsmæssige årsager vil systemet lukke vinduet.\n\n"+
              "Ønsker du selv at lukke vinduet og vælge knappen \"Godkend\"\n"+
              "igen?";
    if (confirm(msg)) {
      ejd.window.focus();
	  return;
    }
  }
  if (udlejd && udlejd.open && !udlejd.closed) {
    var msg = "Vindue til registreret udenlandsk ejendom er åbent og kan indeholde\n"+
              "ændringer, som ikke er blevet anvendt.\n\n"+
              "Af sikkerhedsmæssige årsager vil systemet lukke vinduet.\n\n"+
              "Ønsker du selv at lukke vinduet og vælge knappen \"Godkend\"\n"+
              "igen?";
    if (confirm(msg)) {
      udlejd.window.focus();
	  return;
    }
  }
  if (nyUdlejd && nyUdlejd.open && !nyUdlejd.closed) {
    var msg = "Vindue til indberetning af udenlandsk ejendom er åbent og kan indeholde\n"+
              "ændringer, som ikke er blevet anvendt.\n\n"+
              "Af sikkerhedsmæssige årsager vil systemet lukke vinduet.\n\n"+
              "Ønsker du selv at lukke vinduet og vælge knappen \"Godkend\"\n"+
              "igen?";
    if (confirm(msg)) {
      nyUdlejd.window.focus();
	  return;
    }
  }
  if (genanbringelse && genanbringelse.open && !genanbringelse.closed) {
    var msg = "Vinduet til genanbringelse af ejendomsavancer er åbent og\n"+
              "kan indeholde ændringer, som ikke er blevet anvendt.\n\n"+
              "Af sikkerhedsmæssige årsager vil systemet lukke vinduerne.\n\n"+
              "Ønsker du selv at lukke vinduerne og vælge knappen \"Godkend\"\n"+
              "igen?";
    if (confirm(msg)) {
      genanbringelse.window.focus();
      return;
     }
   }
   if (udlindk && udlindk.open && !udlindk.closed) {
    var msg = "Vinduet til indberetning af udenlandsk indkomst er åbent og\n"+
              "kan indeholde ændringer, som ikke er blevet anvendt.\n\n"+
              "Af sikkerhedsmæssige årsager vil systemet lukke vinduerne.\n\n"+
              "Ønsker du selv at lukke vinduerne og vælge knappen \"Godkend\"\n"+
              "igen?";
    if (confirm(msg)) {
      udlindk.window.focus();
      return;
     }
   }
  lukVindue = true;
 
 }

function deaktiver_knapper() {
  obj = document.getElementsByTagName('input');
  for (i = 0; i < obj.length; i++) {
    if (obj[i].type == 'button') {
      obj[i].disabled = true;
    }
    if (obj[i].type == 'submit') {
      obj[i].disabled = true;
    }
  }
}

function luk_ekstra_vinduer() {
if (udlejd && udlejd.open && !udlejd.closed) {
    udlejd.close();
  }
  if (nyUdlejd && nyUdlejd.open && !nyUdlejd.closed) {
    nyUdlejd.close();
  }
  if (aktie && aktie.open && !aktie.closed) {
    aktie.close();
  }
    if (aktiehenstand && aktiehenstand.open && !aktiehenstand.closed) {
    aktiehenstand.close();
  }
  if (befor && befor.open && !befor.closed) {
    befor.close();
  }
  if (regnskab && regnskab.open && !regnskab.closed) {
    regnskab.close();
  }
  if (orient && orient.open && !orient.closed) {
    orient.close();
  }
  if (spec_fortrykt && spec_fortrykt.open && !spec_fortrykt.closed) {
    spec_fortrykt.close();
  }
  if (spec_befor && spec_befor.open && !spec_befor.closed) {
    spec_befor.close();
  }
  if (spec_aktiehenstand && spec_aktiehenstand.open && !spec_aktiehenstand.closed) {
    spec_aktiehenstand.close();
  }
  if (hjaelp && hjaelp.open && !hjaelp.closed) {
    hjaelp.close();
  }
  if (slsp && slsp.open && !slsp.closed) {
    slsp.close();
  }
  if (ejd && ejd.open && !ejd.closed) {
    ejd.close();
  }
  if (genanbringelse && genanbringelse.open && !genanbringelse.closed) {
    genanbringelse.close();
  }
  if (udlindk && udlindk.open && !udlindk.closed) {
    udlindk.close();
  }
}

function meddelelse_om_indlaesning() {
  alert("Siden indlæses... Vent et øjeblik.");
  return;
}

function valider_inputant() {
  if (inputant > 0) {
    return false;
  }
  else {
    inputant +=1;
	deaktiver_knapper();
    return true;
  }
}

if (IE == true) {
   document.oncontextmenu = check_genvejs_menu;
   window.onbeforeprint = check_meddelelse_skaerm;
   window.onafterprint = check_meddelelse_print;
}
<!-- Tekstbox tæller -->

function tekstCounter(felt, countfelt, maxlimit) {
  if (felt.value.length > maxlimit) { // hvis for lang ...trim!
    felt.value = felt.value.substring(0, maxlimit);
  }
  else { // ellers, opdater counter
    countfelt.value = maxlimit - felt.value.length;
  }
}

window.onload = start;
window.onunload = afslut;