var elTag = null;
var elType = null;
var IE = false;
var test = true; // SÆTTES TIL FALSE VED PRODUKTION

if (document.all && document.getElementById) {
  IE = true;
  if ((navigator.userAgent).indexOf("Opera") != -1) {
    IE = false;
  }
}

function check_luk_vindue() {
  if (window.opener == null && !test) {
    window.close();
  }
  else {
    window.close();
      if (window.opener != null) {
        window.opener.focus();
      }
  }
}

function check_genvejs_menu() {
  var elTag = window.event.srcElement.tagName;
  if (elTag.toLowerCase() != 'input' && elTag.toLowerCase() != 'body' && elTag.toLowerCase() != 'td') {
    return false;
  }
}

function check_enter_tast() {
  elTag = window.event.srcElement.tagName;
  elType = window.event.srcElement.type;
  if (window.event && window.event.keyCode == 13) {
    if ((elTag == 'A') || (elType == 'button') || (elType == 'image') || (elType == 'reset') ||
        (elTag == 'SELECT') || (elType == 'submit') || (elType == 'textarea')) {
      window.event.cancelBubble = false;
      window.event.returnValue = true;
    }
    else {
      window.event.cancelBubble = true;
      window.event.returnValue = false;
    }
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

function deaktiv_knapper() {
  obj = document.getElementsByTagName('input');
  for (i = 0; i < obj.length; i++) {
    if (obj[i].type == 'submit') {
      obj[i].disabled = true;
    }
  }
}

function stamopl_inputant() {
  if (document.forms[0].elements["email"] != null) {
    var email = document.forms[0].elements["email"].value;
  }
  else {
    var email = ""; 
  }
  var emailfejl = fejl_email(email);
  if (emailfejl == "") {
    deaktiv_knapper();
    return true;
  }  
  else {
    fokus_rubrik("email");
    return false;
  }  
}

if (IE == true) {
  document.oncontextmenu = check_genvejs_menu;
  document.onkeydown = check_enter_tast;
  window.onbeforeprint = check_meddelelse_skaerm;
  window.onafterprint = check_meddelelse_print;
}