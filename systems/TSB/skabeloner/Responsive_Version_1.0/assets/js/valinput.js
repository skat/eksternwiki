function validerKode(input) {
  var input_navn = input.name; 
  var input_vaerdi = input.value;
  var tastselvkod = formater_input_vaerdi(input_vaerdi);
  var fejlkod = fejl_tastselvkod(tastselvkod);
  if (fejlkod != "") {
    alert("Tast Selv-kode er ikke indberettet korrekt.");
    fokus_rubrik(input_navn);
  }
  else {
    document.forms[0].elements[input_navn].value = tastselvkod;
  }
}

function valider_tastselvkod(input) {
  var input_navn = input.name; 
  var input_vaerdi = input.value;
  var tastselvkod = formater_input_vaerdi(input_vaerdi);
  var fejlkod = fejl_tastselvkod(tastselvkod);
  if (fejlkod != "") {
    alert("Tast Selv-kode er ikke indberettet korrekt.");
    fokus_rubrik(input_navn);
  }
  else {
    document.forms[0].elements[input_navn].value = tastselvkod;
  }
}

function fejl_tastselvkod(tastselvkod) {
  var fejlkod = "";
  if (tastselvkod.length == 0) {
     return fejlkod;
  }
  if (!(tastselvkod.length > 6 && tastselvkod.length < 17)) {
     fejlkod = 1;
  }
  return fejlkod;
}

function validerPnr(input) {
  var input_navn = input.name;
  var input_vaerdi = input.value;

  var pnr = formater_input_vaerdi(input_vaerdi);
  var fejlkod = fejl_pnr(pnr);
  if (fejlkod != "") {
    alert("Personnummer er ikke indberettet korrekt.");
    fokus_rubrik(input_navn);
  }
  else {
    document.forms[0].elements[input_navn].value = pnr;
  }
}

function fejl_pnr(pnr) {
  var input_maske = /(^\d{10}$)|(^\d{6}\-\d{4}$)/;
  var fejlkod = "";
  if (window.RegExp && pnr.length > 0) {
    var pnr_uden_special_tegn = fjern_special_tegn(pnr,' ');
    if (!input_maske.test(pnr_uden_special_tegn)) {
      fejlkod = 1;
    }
    pnr_uden_special_tegn = fjern_special_tegn(pnr_uden_special_tegn,'-');
    if (fejlkod == "") {
      if (pnr_uden_special_tegn == "0000000000") {
        fejlkod = 2;
      }
      else if (fejl_pnr_modulus(pnr_uden_special_tegn) == true
       &&      pnr_skip_modulus(pnr) != true) {
          fejlkod = 3;
      }
    }
  }
  return fejlkod;
}

function pnr_skip_modulus(pnr_uden_special_tegn) {

  var male = (pnr_uden_special_tegn % 2 != 0);
  var matchNo = pnr_uden_special_tegn.substring(0,6);
 
  if ((male == true) && (pnrMaleSkip.indexOf(matchNo) != -1) 
  ||  (male == false) && (pnrFemaleSkip.indexOf(matchNo) != -1) )
    return true;
  
  return false;
}

function fejl_pnr_modulus(pnr_uden_special_tegn) {

  var vaegte = "4327654321";
  var produkt = 0;
  var tvaersum = 0;
  for (var i = 0; i < pnr_uden_special_tegn.length; i++) {
    var pnr_ciffer = parseInt(pnr_uden_special_tegn.charAt(i),10); 
    var vaegte_ciffer = parseInt(vaegte.charAt(i),10);
    produkt = pnr_ciffer * vaegte_ciffer;
    tvaersum += produkt;
  } 
  if (tvaersum % 11 != 0) {
    return true;
  }
  else {
    return false;
  }
}

function formater_input_vaerdi(vaerdi) {

  var retur_vaerdi = vaerdi;
  while(retur_vaerdi.charAt(0) == " ") {				// Fjerner foranstående blanke
    retur_vaerdi = retur_vaerdi.substring(1,retur_vaerdi.length);
  }
  while(retur_vaerdi.charAt(retur_vaerdi.length-1) == " ") {	// Fjerner efterstående blanke
    retur_vaerdi = retur_vaerdi.substring(0,retur_vaerdi.length-1);
  }
  return retur_vaerdi;
}

function fjern_special_tegn(vaerdi,special_tegn) {
  var objRegExp = new RegExp(special_tegn,'gi');
  return vaerdi.replace(objRegExp,'');
}

function fokus_rubrik(inputnavn) {
  document.forms[0].elements[inputnavn].focus();
  document.forms[0].elements[inputnavn].select();
}
