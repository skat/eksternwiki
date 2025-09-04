/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*
*
* Browser detection
*
*/
/*****************************************************************************************************************/
var skts_isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
var skts_isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var skts_isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1;
var skts_isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;
var skts_isIE = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
var skts_isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;


/* Brug til at teste ovenstående funktioner. Put den i en onload på siden, og hvis du får mere end en alert, så virker browser detektionen ikke. Bortset fra hvis det er en webkit browser.
Herunder ligger Chrome og Safari
*/
function skts_alertBrowser() {
    var browser = "undefined";
    var found = false;
    if (skts_isIE) {
        found = true;
        alert("Internet Explorer");
    }
    if (skts_isChrome) {
        found = true;
        alert("Chrome");
    }
    if (skts_isSafari) {
        found = true;
        alert("Safari");
    }
    if (skts_isWebkit) {
        found = true;
        alert("webkit");
    }
    if (skts_isOpera) {
        found = true;
        alert("Opera");
    }
    if (skts_isFirefox) {
        found = true;
        alert("Firefox");
    }

    if (!found) {
        alert("Unknown");
    }

}
/* Slut browser detection */


/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*
*
* Skip link funktioner
*
*/
/*****************************************************************************************************************/

// Sætter skip link aktion på skip linket, således at der bliver sat fokus på det skjulte link (target). Dette er fordi Chrome og Safari ellers ikke kan finde ud af det the HTML-way
// Parametre:
// skiplinkId - Id på linket
// skiplinkTargetId - Id på target anchoren som der skal skippes til (som skal have fokus)
function opsaetSkipLink(skiplinkId, skiplinkTargetId) {
    var target = document.getElementById(skiplinkTargetId);
    target.href = "#" + skiplinkTargetId;
    target.innerText = "Start af inhold";
    // I det funde eksempel, var tabindex sat til 0. Det gjorde at det skjulte element fik fokus ved tabbing, og det er ikke særlig hensigtsmæssigt.
    // Den er stadig skjult, men den brugeren vil undre sig over hvad det er der har fokus. 
    target.setAttribute("tabindex", "-1");
    document.getElementById(skiplinkId).setAttribute("onclick", "document.getElementById('" + skiplinkTargetId + "').focus();");
}


/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*
*
* Folud ud/ind funktionalitet
*
*/
/*****************************************************************************************************************/

// Show/hide funktion til hjælpetekster, samt folde ud menuer.
// Paramtre:
// foldudObjektId - Id på det objekt som skal foldes ud.
// foldUdTekstId - Id på det <span> element som der skal skiftes klasse og tekst på. Parameteren må gerne være null.
// foldudParentId - Id på forælderen til linken som skal have ændret CSS klassen, i forbindelse med klik. Typisk ændring af ikon.
//                   Parameteren må gerne være null.
// foldudParentNyKlasse - CSS klassen som foldudParentId skal tilføjes med når der er foldet ud.
function foldudToggle(foldudObjektId, foldUdTekstId, foldudParentId, foldudParentNyKlasse, harTooltip) {
    if (typeof (harTooltip) == 'undefined') { // bagud kompatibilitet, fordi det er ikke sikkert at alle gamle funktionskald, kalder med harTooltip
        harTooltip = true;
    }

    var foldudObjekt = document.getElementById(foldudObjektId);

    var foldudTekstObjekt = null;
    if (foldUdTekstId != null) {
        foldudTekstObjekt = document.getElementById(foldUdTekstId);
    }

    var foldudParentObjekt = null;
    if (foldudParentId != null) {
        foldudParentObjekt = document.getElementById(foldudParentId);
    }

    if (foldudObjekt.className == "skts-foldet-ind") { // Fold ud
        foldudObjekt.className = "skts-foldet-ud"
        if (foldudTekstObjekt != null) {
            if (harTooltip) {
                foldudTekstObjekt.className = foldudTekstObjekt.className.replace("skts-tooltip", "");
            }
            foldudTekstObjekt.innerHTML = " - fold ind";
        }

        if (foldudParentObjekt != null) {
            foldudParentObjekt.className += " " + foldudParentNyKlasse;
        }
    }
    else { // Fold ind
        foldudObjekt.className = "skts-foldet-ind"

        if (foldudTekstObjekt != null) {
            if (harTooltip) {
                foldudTekstObjekt.className += "skts-tooltip";
                foldudTekstObjekt.innerHTML = " Folder ud";
            }
            else {
                foldudTekstObjekt.innerHTML = " - fold ud";
            }
        }

        if (foldudParentObjekt != null) {
            foldudParentObjekt.className = foldudParentObjekt.className.replace(" " + foldudParentNyKlasse, "");
        }
    }
}

/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*
*
* Tabel række highlight
*
*/
/*****************************************************************************************************************/

// Tabel links highlight
function showHighlight(rowobj) {
    rowobj.className += " skts-link-fokus";
}

function clearHighlight(rowobj) {
    rowobj.className = rowobj.className.replace("skts-link-fokus", "");
}


/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*
*
* Email adresse validering
*
*/
/*****************************************************************************************************************/

function validerEmailInput(input) {
    if (!erEmailValid(input.value)) {
        if (!(skts_isFirefox || skts_isSafari)) { // Fokus virker ikke i disse browsere
            fokusRubrik(input);
        }
        else if (skts_isFirefox) { // I Firefox kan den sæte fokus efter en timeout
            setTimeout(function () {
                fokusRubrik(input);
            }, 200);
        }
        else if (skts_isSafari) { // onblut/alert/fokus viker ikke ordentligt i Safari

            // Do nothing 
        }
    }
}

/* Email validator */
function erEmailValid(input_vaerdi) {
    var email = formaterInputVaerdi(input_vaerdi);
    var fejlkod = fejlEmail(email);
    if (fejlkod != "") {
        alert("Mail-adresse er ikke indberettet korrekt.\n\n" +
              "En mail-adresse består af:\n" +
              "- brugernavn@servernavn\n\n" +
              "Eksempler:\n" +
              "- fornavn@mail.dk\n" +
              "- efternavn@mail.dk\n" +
              "- fornavn.efternavn@mail.post.dk\n" +
              "- fornavn_efternavn@mail.post.dk\n" +
              "- initialer@mail.post.dk\n" +
              "- firma@mail.post.dk\n\n" +
              "Hyppige fejl:\n" +
              "- Snabel-a (@) mangler\n" +
              "- Punktum (.) efter snabel-a (@) mangler\n" +
              "- Mindst 2 tegn efter sidste punktum (.) mangler, f.eks. dk\n" +
              "- Brugernavn indeholder ugyldige tegn, f.eks. komma (,)\n" +
              "- Servernavn indeholder ugyldige tegn, f.eks. komma (,)");
        return false;
    }
    else {
        return true;
    }
    
}

/* Informations alert til første gang årsopgørelse vises */
function alertFirsttime() {
    alert("Tak, fordi du bruger TastSelv  \n\n" +
    "Du får ikke længere årsopgørelser, ændrede forskudsopgørelser og \n" + "indbetalingskort til restskat med posten. I stedet sender vi en \n" +
    "e-mail eller sms, når der er nyt om din skat. \n\n" +
    "Du kan altid rette dine indstillinger under 'Profil' i menuen. \n\n");
}

function fejlEmail(email) {
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

function formaterInputVaerdi(vaerdi) {
    var retur_vaerdi = vaerdi;
    while (retur_vaerdi.charAt(0) == " ") { // Fjerner foranstaaende blanke
        retur_vaerdi = retur_vaerdi.substring(1, retur_vaerdi.length);
    }
    while (retur_vaerdi.charAt(retur_vaerdi.length - 1) == " ") { // Fjerner efterstående blanke
        retur_vaerdi = retur_vaerdi.substring(0, retur_vaerdi.length - 1);
    }
    return retur_vaerdi;
}

function fokusRubrik(input) {
    input.focus();
    input.select();
}


/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*
*
* Dummy funktioner som skal erstattes i skabelonerne af leverandøren
*
*/
/*****************************************************************************************************************/

function aabnPdf() {
    // Indsæt kode og evt parametre til at håndtere klik på pdf fil link
}
