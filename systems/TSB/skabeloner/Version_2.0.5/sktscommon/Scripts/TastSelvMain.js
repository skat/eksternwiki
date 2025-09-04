var jqfunc;

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
  if (foldUdTekstId !== null) {
    foldudTekstObjekt = document.getElementById(foldUdTekstId);
  }

  var foldudParentObjekt = null;
  if (foldudParentId !== null) {
    foldudParentObjekt = document.getElementById(foldudParentId);
  }

  if (foldudObjekt.className == "skts-foldet-ind") { // Fold ud
    foldudObjekt.className = "skts-foldet-ud";
    if (foldudTekstObjekt !== null) {
      if (harTooltip) {
        foldudTekstObjekt.className = foldudTekstObjekt.className.replace("skts-tooltip", "");
      }
      foldudTekstObjekt.innerHTML = " - fold ind";
    }

    if (foldudParentObjekt !== null) {
      foldudParentObjekt.className += " " + foldudParentNyKlasse;
    }
  } else { // Fold ind
    foldudObjekt.className = "skts-foldet-ind";
    if (foldudTekstObjekt !== null) {
      if (harTooltip) {
        foldudTekstObjekt.className += "skts-tooltip";
        foldudTekstObjekt.innerHTML = " Folder ud";
      } else {
        foldudTekstObjekt.innerHTML = " - fold ud";
      }
    }

    if (foldudParentObjekt !== null) {
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
/* Email validator */

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

function erEmailValid(input_vaerdi) {
  var email = formaterInputVaerdi(input_vaerdi);
  var fejlkod = fejlEmail(email);
  if (fejlkod !== "") {
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
  } else {
    return true;
  }
}

function validerEmailInput(input) {
  if (!erEmailValid(input.value)) {
    if (!(skts_isFirefox || skts_isSafari)) { // Fokus virker ikke i disse browsere
      fokusRubrik(input);
    } else if (skts_isFirefox) { // I Firefox kan den sæte fokus efter en timeout
      setTimeout(function () {
        fokusRubrik(input);
      }, 200);
    } else if (skts_isSafari) { // onblut/alert/fokus viker ikke ordentligt i Safari
      // Do nothing 
    }
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

function fokusRubrik(input) {
  input.focus();
  if(!(/^select/).test(input.type))
    input.select();
}



/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*
*
* Check for ændringer på siden
*
*/
/*****************************************************************************************************************/
function checkForladSide() {
  if (checkAendringer() === true) {
    return meddelelseAendring();
  }
  else {
    return true;
  }
}

function checkAendringer() {

  // Check først om siden er 'dirty'
  var dirty = document.getElementById("skts-dirty");
  if (dirty.value == "true") {
    return true;
  }

  var obj = document.getElementsByTagName('input');
  for (i = 0; i < obj.length; i++) {
    if (((obj[i].type) == 'checkbox') && ((obj[i].checked) != (obj[i].defaultChecked))) return true;
    if (((obj[i].type) == 'radio') && ((obj[i].checked) != (obj[i].defaultChecked))) return true;
    if (((obj[i].type) == 'text') && ((obj[i].value) != (obj[i].defaultValue))) return true;
  }

  selectObjects = document.getElementsByTagName('select');
  for (i = 0; i < selectObjects.length; i++) {
    var selectObject = selectObjects[i];
    var optionList = selectObject.getElementsByTagName("option"); // Get all options under this select object
    if (!optionList[selectObject.selectedIndex].defaultSelected) return true;
  }

  obj = document.getElementsByTagName('textarea');
  for (i = 0; i < obj.length; i++) {
    if (((obj[i].value) != (obj[i].defaultValue))) return true;
  }


  return false;
}

function meddelelseAendring() {
  var msg = "Ønsker du at forlade siden uden at anvende ændringerne?\n\n"; 
  if (confirm(msg)) {
    return true;
  }
  else {
    return false;
  }
}


/* Finder alle elementer som har klassen klassenavn defineret og tilføjer et onclick til det */
function tilfoejCheckAendringerMedKlassenavn(klassenavn) {
  if (!document.getElementsByClassName) {
    document.getElementsByClassName = myGetElementsByClassName;    
  }
  var elements = document.getElementsByClassName(klassenavn);
  for (i = 0; i < elements.length; i++) {
    tilfoejOnClick(elements[i]);
  }
}

/* tager en liste af id'er og leder efter alle de anchors som ligger under det id og tilføjer et onclick på dem */
function tilfoejCheckAendringerMedIdListe(idListe) {
  for (var i = 0; i < idListe.length; i++) {
    var htmlElement = document.getElementById(idListe[i]);
    if (htmlElement !== null) {
      var anchors = htmlElement.getElementsByTagName('a');
      for (var j = 0; j < anchors.length; j++) {
        tilfoejOnClick(anchors[j]);
      }
    }
  }
}


function tilfoejOnClick(elem) {
  elem.onclick = (function () {
    var origOnClick = elem.onclick; // Gemmer den oprindelige funktions pointer i en variabel så denne kan blive kaldt.
    return function () { // Returner den nye onclick funktion som udfører checkForlade side, efterfulgt af den gamle onclick
      if (!checkForladSide()) { // Hvis vi skal forlade siden, returnerer vi false, for så bliver der ikke udført mere.
        return false;
      }
      if (origOnClick !== null) { // Hvis der var en gammel onclick, bliver den udført
        return origOnClick();
      }
    };
  })();
}

// i tilfælde af at browseren ikke har defineret en getElementsByClassName() så er der en her
function myGetElementsByClassName(cl) {
  var retnode = [];
  var myclass = new RegExp('\\b'+cl+'\\b');
  var elem = document.getElementsByTagName('*');
  for (var i = 0; i < elem.length; i++) {
    var classes = elem[i].className;
    if (myclass.test(classes)) {
      retnode.push(elem[i]);
    }
  }
  return retnode;
}

/*
* JQuery specific functions. 
* Dette køres ved hver page refresh når siden er færdig med at loade
*/
$(document).ready(function() {
  window.jqfunc = function() {

    /********* Jquery plugins *********/
    $.getIEVersion = function() {
      var rv = { "is_ie": false, "version": 0 };
      if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        if (re.test(ua) !== null)
          rv = parseFloat( RegExp.$1 );
        rv = { "is_ie": true, "version": rv };
      }
      return rv;
    };

    $.fn.toggleVisual = function(callback) {
      visible = !$(this).hasClass('skts-visualhidden');
      if (visible) {
        $(this).slideUp(500, function() {
          $(this).addClass('skts-visualhidden');
          $(this).show();
        });
      } else {
        $(this).removeClass('skts-visualhidden');
        $(this).hide();
        $(this).slideDown(500, function() {
        });
      }
      return callback(!visible);
    };

    $.fn.findfold = function() {
      fold = this.children(".skts-fold");
      if(!fold.hasClass("skts-fold")) {
        // search siblings
        var coll = this.nextUntil(null, ".skts-fold");
        fold = $(coll[0]);
        if(!fold.hasClass("skts-fold")) {
          // search siblings of parent
          coll = this.parent().nextUntil(null, ".skts-fold");
          fold = $(coll[0]);
          if(!fold.hasClass("skts-fold")) {
            fold = false;
          }
        }
      }
      return fold;
    };

    $.showSpecific = function (el) {
      var fold = $('#' + el.attr('id') + '-fold');
      var type = el.attr('type');

      $.each(el.closest('.skts-layout2-input-gruppe').find('input'), function() {
        var fold = $('#' + $(this).attr('id') + '-fold');
        if(!$(this).prop("checked")) {
          $(fold).slideUp(500, function() {
            $(this).addClass('skts-visualhidden'); 
          }).switchKbdNavigable(false);
        }
      });
      foldDo(el, fold);
    };

    $.foldIt = function (el) { 
      var type = el.attr('type');
      // close all other radio buttons
      if(type === "radio") {
        $.each(el.closest('.skts-layout2-input-gruppe').find(':radio'), function() {
          if(!$(this).prop("checked"))
            $(this).nextUntil('.skts-fold').next().slideUp(500, function() {
              $(this).addClass('skts-visualhidden');
              $(this).show();
            });
        });
      }

      fold = el.findfold();
      if(!fold)
        return;

      foldDo(el, fold);
    };

    $.fn.switchKbdNavigable = function(visible) {
      if(visible) {
        $(this).find('input, select, a').removeAttr('tabindex');
        var fold = $(this).find('.skts-fold');
        if(fold !== null)
          fold.find('input, select, a').attr('tabindex', '-1');
      }
      else
        $(this).find('input, select, a').attr('tabindex', '-1');
    };

    $.fn.showVisual = function(callback) {
      visible = !$(this).hasClass('skts-visualhidden');
      if(!visible) {
        $(this).removeClass('skts-visualhidden').hide().slideDown(500);
        visible = true;
      }
      return callback(visible);
    };
    /********* End plugins ***********/

    /********* Private methods *******/
    foldDo = function (el, fold) { 
      var arrow = el.find('a.skts-pil:first');

      if(el.attr('type') === 'radio') {
        fold.showVisual( function(visible) {
          fold.switchKbdNavigable(visible);
        });
      } else {
        fold.toggleVisual(function(visible) {
          if(visible) {
            arrow.addClass("skts-pil-ud");
            arrow.removeClass("skts-pil-ind");
          } else {
            arrow.removeClass("skts-pil-ud");
            arrow.addClass("skts-pil-ind");
          }
          fold.switchKbdNavigable(visible);
        }); 
      }
    };
    /********* End private methods ***/

    /********* Event handling ********/

    var browser = $.getIEVersion();

    if(browser.is_ie)  {
      $("body").addClass("ie");
    }

    /* Remove title to show skts-tooltip only (and not browser tooltip */
      $('[title]').mouseover(function () {
        $this = $(this);
        $this.data('title', $this.attr('title'));
        // Using null here wouldn't work in IE, but empty string will work just fine.
        $this.attr('title', '');
      }).mouseout(function () {
        $this = $(this);
        $this.attr('title', $this.data('title'));
      });

      // get rid of kbd nav on folded elements
      var folds = $('.skts-fold').addClass('skts-visualhidden');
      $.each($(folds), function() {
        $(this).find("input, select, a").attr("tabindex", "-1");
      });
      var details = $('.skts-layout1-detaljer');
      $.each($(details), function() {
        $(this).find("input, select, a").attr("tabindex", "-1");
      });

      $('.skts-layout1-detaljer').addClass('skts-visualhidden');
      $('.skts-foldet-element-step1').addClass('skts-visualhidden');

      /* Eventhandlers */
      $(".skts-layout1-sammen").on("click", function() { 
        setClick($(this));
      });
      $(".skts-layout1-sammen").keypress(function(e) { 
        if(e.which == 13) {
          setClick($(this));
          e.preventDefault();
        }
      });

      $(".skts-layout1-sammen-ext").on("click", function() { 
        setClick($(this));
      });
      $(".skts-layout1-sammen-ext").keypress(function(e) { 
        if(e.which == 13) {
          setClick($(this));
          e.preventDefault();
        }
      });

      $('.skts-vis-mere').on("click.global", function() {
        $.foldIt($(this));
      });
      $('.skts-vis-mere').on("keypress", function(e) { 
        if(e.which == 13) {
          $.foldIt($(this));
          e.preventDefault();
        }
      });

      /* Function to handle folding of skts-layout1 lines
      */
      function setClick(el) {
        var arrow = el.find('a.skts-pil:first');
        var details = el.next('.skts-layout1-detaljer');
        if(!details.length)
          details = el.prev('.skts-layout1-detaljer');

        if(arrow.hasClass("skts-pil-ud"))
        {
          arrow.addClass("skts-pil-ind");
          arrow.removeClass("skts-pil-ud");

          if(el.hasClass("skts-layout1-linje-ulige"))
          {
            el.removeClass("skts-layout1-border-left-set");
            el.removeClass("skts-layout1-border-right-set");
          }
        } else {
          arrow.addClass("skts-pil-ud");
          arrow.removeClass("skts-pil-ind");
          if(el.hasClass("skts-layout1-linje-ulige"))
          {
            el.addClass("skts-layout1-border-left-set");
            el.addClass("skts-layout1-border-right-set");
          }
        }
        if(details.hasClass('skts-visualhidden')) {
          var lc = details.find(" > :last-child");
          lc.addClass("skts-layout1-padding-bottom");
          details.removeClass('skts-visualhidden').hide().slideDown(500, function() {
            details.switchKbdNavigable(true); 
          });
        } else {
          details.slideUp(500, function() { 
            $(this).addClass('skts-visualhidden'); 
            details.switchKbdNavigable(false); 
          });
        }
        arrow.focus();
        return false;
      }

      /* Color every other line */
      var i = 0;
      $(".skts-layout1-foldblok :not(p)").each(function () {
        i = 0;
        $(this).nextUntil(":not(p)").filter("p[class^=skts-layout1-sammen]").each( function() {
          if(i % 2 === 0) {
            $(this).addClass("skts-layout1-linje-lige");
            $(this).next('.skts-layout1-detaljer').addClass('skts-layout1-linje-lige');
          } else {
            $(this).addClass("skts-layout1-linje-ulige");
            $(this).next('.skts-layout1-detaljer').addClass('skts-layout1-linje-ulige');
          }
          i++;
        });
      });	


    $('.skts-confirmation').on('click', function () {
        var text = 'Du skal være opmærksom på, at din browser kan gemme en kopi af det pdf-dokument. du åbner.\n\n';
        text += 'Hvis andre har adgang til denne computer, anbefaler vi derfor, at du sletter browserens midlertidige filer, ';
        text += 'når du er færdig med at bruge TastSelv. Du kan få hjælp til dette, efter du er logget af TastSelv.';
        var conf = confirm(text);
        if(!conf)
          return false;
    }); 

  };

  jqfunc();

});

