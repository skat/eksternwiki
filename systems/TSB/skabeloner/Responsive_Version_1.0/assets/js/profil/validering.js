function valider_email(input) {
  var input_navn = input.name; 
  var input_vaerdi = input.value;
  var email = formater_input_vaerdi(input_vaerdi);
  var fejlkod = fejl_email(email);
  if (fejlkod != "") {
    alert("Mail-adresse er ikke indberettet korrekt.\n\n"+
          "En mail-adresse består af:\n"+
          "- brugernavn@servernavn\n\n"+
          "Eksempler:\n"+
          "- fornavn@mail.dk\n"+
          "- efternavn@mail.dk\n"+
          "- fornavn.efternavn@mail.post.dk\n"+
          "- fornavn_efternavn@mail.post.dk\n"+
          "- initialer@mail.post.dk\n"+
          "- firma@mail.post.dk\n\n"+
          "Hyppige fejl:\n"+
          "- Snabel-a (@) mangler\n"+
          "- Punktum (.) efter snabel-a (@) mangler\n"+
          "- Mindst 2 tegn efter sidste punktum (.) mangler, f.eks. dk\n"+
          "- Brugernavn indeholder ugyldige tegn, f.eks. komma (,)\n"+
          "- Servernavn indeholder ugyldige tegn, f.eks. komma (,)"); 
    fokus_rubrik(input_navn);
  }
  else {
    document.forms[0].elements[input_navn].value = email;
  }
}
function fejl_email(email) {
  var input_maske = /^([\w\_\æ\ø\å\Æ\Ø\Å\-\&\.\*])+\@(([\w\_\æ\ø\å\Æ\Ø\Å\-\&])+\.)+([a-zA-Z]{2,10}$)/;
  var input_ej_tilladt = /^(\.)|(\&@)|(@\_)|(@\-)|(@\&)|(\&\&)|(\.\.)|(\*\*)/;
  var fejlkod = "";
  if (window.RegExp && email.length > 0) {
    if ((!input_maske.test(email)) || (input_ej_tilladt.test(email))) {
      fejlkod = 1;
    }
  }
  return fejlkod;
}

function formater_input_vaerdi(vaerdi) {
  var retur_vaerdi = vaerdi;
  while(retur_vaerdi.charAt(0) == " ") { // Fjerner foranstaaende blanke
    retur_vaerdi = retur_vaerdi.substring(1,retur_vaerdi.length);
  }
  while(retur_vaerdi.charAt(retur_vaerdi.length-1) == " ") { // Fjerner efterstående blanke
    retur_vaerdi = retur_vaerdi.substring(0,retur_vaerdi.length-1);
  }
  return retur_vaerdi;
}

function fokus_rubrik(inputnavn) {
  document.forms[0].elements[inputnavn].focus();
  document.forms[0].elements[inputnavn].select();
}