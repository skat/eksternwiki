var slut_aar = 2008;

function valider_blb(felt,input) {
  var input_navn = input.name;
  var input_vaerdi = input.value;
  var input_maxlaengde = input.maxlength;
  var blb = formater_input_vaerdi(input_vaerdi);
  var fejl_kod = fejl_blb(blb);
  if (fejl_kod != "") {
    fejlmeddelelse(felt,input_navn);
  }
  else {
    document.forms[0].elements[input_navn].value = blb;
    if (blb.length > input_maxlaengde) {
      alert("Rubrik " + felt + " er udfyldt med et for stort bel�b.");
      fokus_felt(input_navn);
    }
  }
}

function fejl_blb(blb) {
  var input_maske = /(^[-]?\d{1,}$)|(^[-]?\d{1,3}\.\d{3}$)|(^[-]?\d{1,3}\.\d{3}\.\d{3}$)/;
  var fejl_kod = "";
  if (window.RegExp && blb.length > 0) {
    if (!input_maske.test(blb)) {
      fejl_kod = 1;
    }
  }
  return fejl_kod;
}

function valider_dg(felt,input) {
  var input_navn = input.name;
  var input_vaerdi = input.value;
  var dg = formater_input_vaerdi(input_vaerdi);
  var fejl_kod = fejl_dg(dg);
  if (fejl_kod != "") {
    fejlmeddelelse(felt,input_navn);
  }
  else {
    document.forms[0].elements[input_navn].value = dg;
  }
}

function fejl_dg(dg) {
  var input_maske = /(^\d{1,}$)/;
  var fejl_kod = "";
  if (window.RegExp && dg.length > 0) {
    if (!input_maske.test(dg)) {
      fejl_kod = 1;
    }
  }
  return fejl_kod;
}

function valider_dto(felt,input) {
  var input_navn = input.name;
  var input_vaerdi = input.value;
  var dto = formater_input_vaerdi(input_vaerdi);
  var fejl_kod = fejl_dto(dto);
  if (fejl_kod != "") {
    fejlmeddelelse(felt,input_navn);
  }
  else {
    document.forms[0].elements[input_navn].value = dto;
  }
}

function fejl_dto(dto) {
  var input_maske = /(^\d{4}$)/;
  var fejl_kod = "";
  if (window.RegExp && dto.length > 0) {
    if (!input_maske.test(dto)) {
      fejl_kod = 1;
    }
    if (fejl_kod == "") {
      var dag = dto.substring(0,2);
      var maaned = dto.substring(4,2);
      if (dag < 1 || dag > 31) {
        fejl_kod = 2;
      }
      else if (maaned < 1 || maaned > 12) {
        fejl_kod = 3;
      }
      else if ((maaned == 4 || maaned == 6 || maaned == 9 || maaned == 11) && dag == 31) {
        fejl_kod = 4;
      }
      else if (maaned == 2) {
        var skudaar = (slut_aar % 4 == 0 && (slut_aar % 100 != 0 || slut_aar % 400 == 0));
        if (dag > 29 || (dag == 29 && !skudaar)) {
          fejl_kod = 5;
        }
      }
    }
  }
  return fejl_kod;
}

function valider_pct(felt,input) {
  var input_navn = input.name; 
  var input_vaerdi = input.value;
  var pct = formater_input_vaerdi(input_vaerdi);
  var fejl_kod = fejl_pct(pct);
  if (fejl_kod != "") {
    fejlmeddelelse(felt,input_navn);
  }
  else {
    document.forms[0].elements[input_navn].value = pct;
  }
}

function fejl_pct(pct) {
  var input_maske = /(^\d{1,}$)|(^\d{1,}\,\d{1}$)|(^\d{1,}\,\d{2}$)/;
  var fejl_kod = "";
  if (window.RegExp && pct.length > 0) {
    if (!input_maske.test(pct)) {
      fejl_kod = 1;
    }
  }
  return fejl_kod;
}

function formater_input_vaerdi(vaerdi) {
  var retur_vaerdi = vaerdi;
  while(retur_vaerdi.charAt(0) == " ") { // Fjerner foranstaaende blanke
    retur_vaerdi = retur_vaerdi.substring(1,retur_vaerdi.length);
  }
  while(retur_vaerdi.charAt(retur_vaerdi.length-1) == " ") { // Fjerner efterstaaende blanke
    retur_vaerdi = retur_vaerdi.substring(0,retur_vaerdi.length-1);
  }
  return retur_vaerdi;
}

function fejlmeddelelse(felt,input_navn) {
  alert("Rubrik " + felt + " er ikke udfyldt korrekt.");
  fokus_felt(input_navn);
}

function fokus_felt(input_navn) {
  if (NS == true) {  // P.g.a. fejl i NS
    felt = input_navn;
    fokus = setTimeout("document.forms[0].elements[felt].focus();",1);
    document.forms[0].elements[input_navn].select();
  }
  else {
    document.forms[0].elements[input_navn].focus();
    document.forms[0].elements[input_navn].select();
  }
}