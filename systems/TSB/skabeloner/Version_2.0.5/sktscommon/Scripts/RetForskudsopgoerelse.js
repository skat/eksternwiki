function EnsureSingleCheckBox(idPrefix, checkedIx) {
    var iterator = 1;
    while (true) {
        if (checkedIx != iterator) {
            var cb = document.getElementById(idPrefix + iterator);
            if (cb == null) {
                break;
            }
            cb.checked = false;
        }
        iterator++;
    }
}

var gruppeRaekkePrefix = "grupperaekke_";
var faneRaekkePrefix = "BV_FaneId_Fane_";
var btnTekstIkkeAlleFelterSynlige = "Vis øvrige rubrikker";
var btnTekstIngenFelterSynlige = "Vis rubrikker";
var AFYIndtastningIndeks = 4;
var AFYP1IndtastningIndeks = 6;
function Maximize(faneId, stopPrefix) 
{
    var limTable = document.getElementById("tblfelter");
    var rows = limTable.rows;
    var inFane = false;
    for (var i = 0; i < rows.length; i++) {
        row = rows[i];
        if (row.id == faneId) {
            inFane = true;
        }
        else if (row.id.indexOf(stopPrefix) == 0) {
            inFane = false;
        }
        if (inFane) 
        {
            row.style.display = '';
        }
    }
}
function Minimize(faneId, stopPrefix) 
{
    var limTable = document.getElementById("tblfelter");
    var rows = limTable.rows;
    var inFane = false;
    var alleFelterSkjulteIFanen = true;
    var alleFelterVisteIFanen = true;
    var i = 0;
    while( i < rows.length) {
        row = rows[i];
        if (row.id == faneId) {
            inFane = true;
            i++; // springer fane rækken over
        }
        else if (row.id.indexOf(stopPrefix) == 0) {
            inFane = false;
        }
        if (inFane) {
            var forceCollapse = (row.className == "BV_ForceCollapse"); // Hvis fanen har "forceCollapse" sat, så bliver alle felter skjult, bortset fra dem med "_vis" suffix.
            var minimerGruppeRetur = MinimerGruppe(rows, i, stopPrefix, forceCollapse);
            i = minimerGruppeRetur[0];
            var alleFelterSkjulteIGruppen = minimerGruppeRetur[1];
            var alleFelterVisteIGruppen = minimerGruppeRetur[2];
            if (!alleFelterSkjulteIGruppen)
            {
                alleFelterSkjulteIFanen = false;
            }
            if (!alleFelterVisteIGruppen) {
                alleFelterVisteIFanen = false;
            }
        }
        else {
            i++;
        }
    }
    return [alleFelterSkjulteIFanen, alleFelterVisteIFanen];
}
function MinimerGruppe(rows, ix, faneStopPrefix, forceCollapse) {
    var currentGruppeRaekker = [];
    while (rows[ix].id.indexOf(gruppeRaekkePrefix) == 0) 
    {
        currentGruppeRaekker.push(rows[ix]);
        ix++;
    }
    var skjulGruppe = true;
    var alleFelterUdfyldte = true;
    while ( ix < rows.length ) 
    {
        if (rows[ix].id.indexOf(gruppeRaekkePrefix) == 0 || rows[ix].id.indexOf(faneStopPrefix) == 0) {
            break;
        }
        var currentFeltRaekker = [];
        ix = HentFeltRaekker(currentFeltRaekker, rows, ix);
        if (VisFelt(currentFeltRaekker, forceCollapse)) {
            skjulGruppe = false;
        }
        else {
            alleFelterUdfyldte = false;
            for (var i = 0; i < currentFeltRaekker.length; i++) {
                currentFeltRaekker[i].style.display = 'None';
            }
        }
    }
    if (skjulGruppe)
    {
        for (var i =0; i< currentGruppeRaekker.length; i++)
        {
            currentGruppeRaekker[i].style.display = 'None';
        }
    }
    return [ix, skjulGruppe, alleFelterUdfyldte];
}
function HentFeltRaekker(feltRaekker, rows, ix)
{
    var curFeltNr = HentFeltNr(rows[ix]);
    feltRaekker.push(rows[ix]);
    ix++;
    for ( ; ix <  rows.length; ix++) 
    {
        if ( curFeltNr != HentFeltNr(rows[ix]) )
        {
            break;
        }
        else
        {
            feltRaekker.push(rows[ix]);
        }
    } 
    return ix;
}
function HentFeltNr(row)
{
    return row.id.substring(row.id.lastIndexOf("_") + 1);
}
function VisFelt(feltRaekker, forceCollapse) {
    if (feltRaekker.length >= 2) {
        indholdsFelt = feltRaekker[1];
        if (ServerSideVis(indholdsFelt)) { // "_vis" vinder over alle
            return true;
        }
        else if (forceCollapse) { // Næst kommer forceCollapse
            return false;
        }
        else if (!IndtastningTom(indholdsFelt, true)) {
            return true;
        }
        else if (!IndtastningTom(indholdsFelt, false)) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}
function ServerSideVis(feltRaekke) {
    return feltRaekke.className.lastIndexOf("_vis") == feltRaekke.className.lastIndexOf("_");
}
function HentIndbId(type, feltRaekke, afy)
{
    var feltAarString;
    if (afy) {
        feltAarString = "AFY";
    }
    else {
        feltAarString = "AFYP1";
    }
    var feltIdStartIx = feltRaekke.id.indexOf('_') + 1;
    var feltIdStopIx = feltRaekke.id.length;
    var feltId = feltRaekke.id.substring(feltIdStartIx, feltIdStopIx);
    return type + feltAarString + 'fnr' + feltId;
}
function IndtastningTom(feltRaekke, afy) {
    if (afy) {
        ix = AFYIndtastningIndeks;
    }
    else {
        ix = AFYP1IndtastningIndeks;
    }
    if (feltRaekke.cells.length > ix) {
        indtastningsCelle = feltRaekke.cells[ix];
        var typeIxStart = feltRaekke.className.indexOf('_') + 1;
        var typeIxStop = feltRaekke.className.indexOf('_', typeIxStart);
        if (typeIxStop == -1) {
            typeIxStop = feltRaekke.className.length;
        }
        var type = feltRaekke.className.substring(typeIxStart, typeIxStop);
        if (indtastningsCelle.firstChild != null ) {
            indtastningsFelt = indtastningsCelle.firstChild;
            if (type == 'tb') {
                if ( indtastningsFelt.value == null ) {
                    return false;
                }
                else {
                    var regExp = /\s+/g;
                    var feltValue = indtastningsFelt.value.replace(regExp,"");
                    return feltValue == "";
                }
            }
            else if (type == 'dd') {
                if (indtastningsFelt.firstChild != null) {
                    return indtastningsFelt.firstChild.selectedIndex == 0;
                }
            }
            else if (type == 'rb') {
                if (indtastningsFelt.firstChild != null) {
                    if (indtastningsFelt.firstChild.rows != null) {
                        for (var i = 0; i < indtastningsFelt.firstChild.rows.length; i++) {
                            var row = indtastningsFelt.firstChild.rows[i];
                            if (row.cells != null && row.cells[0].firstChild != null && row.cells[0].firstChild.checked) {
                                return false;
                            }
                        }
                    }
                }
            }
            else if (type == 'cb') {
                if (indtastningsFelt.firstChild != null &&
                    indtastningsFelt.firstChild.firstChild != null &&
                    indtastningsFelt.firstChild.firstChild.nextSibling != null &&
                    indtastningsFelt.firstChild.firstChild.nextSibling.checked) {
                    return false;
                }
            }
            else if (type == 'cbl') {
                var indbIdSuffix = HentIndbId(type, feltRaekke, afy);
                var iterator = 1;
                while (true) {
                    var cb = document.getElementById(indbIdSuffix + '_' + iterator);
                    if (cb == null) {
                        break;
                    }
                    if (cb.checked) {
                        return false;
                    }
                    iterator++;
                }
            }
        }
    }
    return true;
}
function ExpandClick(faneId, hiddenFieldId, btnId, stopPrefix) {
    var hiddenField = document.getElementById(hiddenFieldId);
    var btn = document.getElementById(btnId);
    if ( hiddenField.value == "True" ) // Er den expanded
    {
        var minimizeRetur = Minimize(faneId, stopPrefix);
        var alleFelterSkjulte = minimizeRetur[0];
        var alleFelterViste = minimizeRetur[1];
        if (alleFelterViste) {
            alert('Alle rubrikker er udfyldt.');
        }
        else {
            hiddenField.value = "False";
            if (alleFelterSkjulte) {
                btn.value = btnTekstIngenFelterSynlige;
            }
            else {
                btn.value = btnTekstIkkeAlleFelterSynlige;
            }
        }
        if (faneId == 'BV_FaneId_Fane_SelvstaendigErhvervsdrivende' && !alleFelterSkjulte) {
            VisFeltOgGruppe(999);
        }
    }
    else
    {
        Maximize(faneId, stopPrefix);
        hiddenField.value = "True";
        btn.value = "Saml rubrikker";
    }
}
function VisFeltOgGruppe(feltId) {
    var limTable = document.getElementById("tblfelter");
    var rows = limTable.rows;
    var senesteGruppeRaekker = [];
    var btnExpand = null;
    var feltRaekker = [];
    var ix = 0;
    var raekkenErSynlig = false;
    while (ix < rows.length) {
        if (rows[ix].id.indexOf(faneRaekkePrefix) == 0) {
            if (rows[ix].firstChild != null && rows[ix].firstChild.firstChild != null) {
                btnExpand = rows[ix].firstChild.firstChild;
            }
            ix++;
        }
        else if (rows[ix].id.indexOf(gruppeRaekkePrefix) == 0) {
            senesteGruppeRaekker = [];
            while (rows[ix].id.indexOf(gruppeRaekkePrefix) == 0) {
                senesteGruppeRaekker.push(rows[ix]);
                ix++;
            }
        }
        else if (feltId == HentFeltNr(rows[ix])) {
            if (rows[ix].style.display == '') {
                raekkenErSynlig = true;
            }
            else {
                HentFeltRaekker(feltRaekker, rows, ix);
            }
            break;
        }
        else {
            ix++;
        }
    }
    if (!raekkenErSynlig) {
        for (var i = 0; i < senesteGruppeRaekker.length; i++) {
            senesteGruppeRaekker[i].style.display = '';
        }
        for (var i = 0; i < feltRaekker.length; i++) {
            feltRaekker[i].style.display = '';
        }
        if (btnExpand != null) {
            btnExpand.value = btnTekstIkkeAlleFelterSynlige;
        }
    }
}
var aabneVinduer = {};
function OpenDialog(url, winName, width, height, showScroll, resizable, menubar, status, toolbar, forceOpen, forceNonModal, vinduer) {
    win_width = width;
    win_height = height;
    win_left = (screen.width / 2) - (win_width / 2);
    win_top = (screen.height / 2) - (win_height / 2);
    if (ModalOK() && !forceNonModal) {
        var options = "dialogwidth:" + win_width + "px;dialogheight:" + win_height + "px;dialogLeft:" + win_left + ";dialogTop:" + win_top + ";resizable:no;status:no;help:no;scroll:" + showScroll;
        try {
            window.showModalDialog(url, self, options);
        } catch (e) { } // If popup blocker is set, an exception is thrown. We ignore, as most browsers inform the user.
    }
    else {
        var vindue = vinduer[winName];
        if ( forceOpen || !vindue || vindue.closed) {
            var options = "width=" + win_width + ",height=" + win_height + ",Left=" + win_left + ",Top=" + win_top + ",resizable=" + resizable + ",status="+status+",menubar="+menubar+ ",toolbar="+toolbar+",help=no,scrollbars=" + showScroll;
            var rc = window.open(url, winName, options);
            vinduer[winName] = rc;
            try {
                rc.window.focus(); // Hvis indholdet i vinduet er PDF (Acro Reader) så kan denne fejle
            } catch (e) { }
            return true;
        }
        else {
            try {
                vindue.window.focus(); // Hvis indholdet i vinduet er PDF (Acro Reader) så kan denne fejle
            } catch (e) { } 
            return false;
        }
    }
}
function ModalOK()
{
    modal = false;
    if (navigator.appName && navigator.appName == "Microsoft Internet Explorer") {
        if (window.showModalDialog) {
            modal = true;
        }
    }
    return modal;
}
function lukAabneVinduer() {
    for (var vId in aabneVinduer) {
        var v = aabneVinduer[vId]
        if (v && !v.closed) {
            v.close();
        }
    }
}
var IE = false;
if (document.all && document.getElementById) {
    IE = true;
    if ((navigator.userAgent).indexOf("Opera") != -1) {
        IE = false;
    }
}
function checkMeddelelsePrint() {  // P.g.a. fejl i IE
    var el = document.getElementById('meddelelse');
    if (el != null) {
        el.className = "meddelelse";
    }
}
function checkMeddelelseSkaerm() {  // P.g.a. fejl i IE
    var el = document.getElementById('meddelelse');
    if (el != null) {
        el.className = "meddelelsePrintIE";
    }
}
if (IE == true) {
    window.onbeforeprint = checkMeddelelseSkaerm;
    window.onafterprint = checkMeddelelsePrint;
}
window.onunload = lukAabneVinduer;

function SetFocus(feltid)
{
	var control = document.getElementById(feltid);
	if( control != null ) 
	{
		try
		{
			control.focus();
		}
		catch(er){
		}
	}
}

function Trim(tekst)
{	
    return tekst.replace(/^\s*|\s*$/g,'');
}

var IE = false;
var indlaest = false;
if (document.all && document.getElementById) {
  IE = true;
  if ((navigator.userAgent).indexOf("Opera") != -1) {
    IE = false;
  }
}
function start() {
  indlaest = true;
}
function checkMeddelelsePrint() {  // P.g.a. fejl i IE
  var el = document.getElementById('meddelelse');
  if (el !=null) {
    el.className = "meddelelse";
  }
}
function checkMeddelelseSkaerm() {  // P.g.a. fejl i IE
  var el = document.getElementById('meddelelse');
  if (el !=null) {
    el.className = "meddelelsePrintIE";
  }
}
function gaaTilRubrik(name,divId) {
  var type = name.substring(0,2); 
  if (!indlaest) {
    meddelelseOmIndlaesning();
  }
  else if (type == 'tb') { // Text
    document.forms[0].elements[name].focus();
  }
  else if (type == 'dd') { // Select
    document.forms[0].elements[name].focus();
  }
  else if (type == 'rb' || type == 'cb') { // Radio eller Checkbox
    location.hash = divId;
  }
}
function markerFelt(name,divId) {
  var type = name.substring(0,2); 
  if (type == 'tb') { // Text
    document.forms[0].elements[name].style.borderColor = "red";
  }
  else if (type == 'dd') { // Select
    var el = document.getElementById(name).offsetWidth;
    document.getElementById(divId).style.width = el;
    document.getElementById(divId).className = "fejl";
  }
  else if (type == 'rb' || type == 'cb') { // Radio eller Checkbox
    document.getElementById(divId).className = "fejl";
  }
}
function meddelelseOmIndlaesning() {
  alert("Siden indlæses... Vent et øjeblik.");
  return;
}
if (IE == true) {
  window.onbeforeprint = checkMeddelelseSkaerm;
  window.onafterprint = checkMeddelelsePrint;
}
window.onload = start;

function aabnBefordringsVindue(){
  var windowOpened = false;
  windowOpened = OpenDialog( 'Blank.htm', 'BefordringsBgrn', '700', '800', 'yes', 'yes', 'no', 'yes', 'no', false, true, aabneVinduer );
 
  if (windowOpened) {
    document.form_befordringsbrgnHandler.logning.value = 'pre';
    document.form_befordringsbrgnHandler.pnr.value = '0103897750';
    document.form_befordringsbrgnHandler.indAar.value = '2013';
    document.form_befordringsbrgnHandler.submit();
  }
}
function rubrik51Indsaet(val){
  val = val.replace(/\./g,'');
  if ( typeof(VisFeltOgGruppe)=='function'){
    VisFeltOgGruppe('417');
  }
  var rubrik51 = document.getElementById('tbAFYfnr417');
  rubrik51.value = val;
  rubrik51.focus();
  document.form_befordringsbrgnHandler.logning.value='post';
  document.form_befordringsbrgnHandler.rubrik51.value=val;
  document.form_befordringsbrgnHandler.submit();
}



function onClick_RadioKnap() {
    var s = document.getElementById("btnOk");
    s.disabled = false;
}

//nba - 23-05-07 - #3129 - Vis besked popup
//beskedid = 0: Vis oprindelseskoder. beskedid = 1: Vis advis for parameter feltnummer		
var Felt714Vist = 0; //0=popup ikke vist. 1=popup er vist 03.07.07/NIO produktnr. 31217
var Felt361Vist = 0; //15.05.08 NIO og NBA
function openBeskedPopup(feltnummer, beskedid, felt) // Størrelse af popup styres af valgt opløsning. ny vision EDL
{
    if (feltnummer == 714) {
        if (Trim(felt.value.toString()) == "")
            return 0;
    }
    if (Felt714Vist == 1 && feltnummer == 714 && beskedid == 1) {
        return 0;
    }

    //15.05.08 NIO og NBA besked popup hvis felt 361 er indberettet med beløb størrer end 0
    if (feltnummer == 361) {
        if (Trim(felt.value.toString()) == "")
            return 0;
    }
    if (feltnummer == 361) {
        if (felt.value.toString() == "0")
            return 0;
    }


    win_width = 600//690;
    if (screen.height >= 1024)
        win_height = 450;
    else
        win_height = 600;
    win_left = (screen.width / 2) - (win_width / 2);
    win_top = (screen.height / 2) - (win_height / 2);
    //05.03.08 NIO #XXX herfra
    if (feltnummer == 714 && beskedid == 1 && Felt714Vist == 0) {
        alert("Du har indberettet dato for ind- eller udtræden af folkekirken. " +
				"Ændringen vil kun få virkning for beregning af kirkeskatten på dette års forskudsopgørelse.\n \n" +
				"Bemærk! Ind- eller udmeldelse af folkekirken skal ske ved henvendelse til de kirkelige myndigheder.\n \n" +
				"Ved den endelige skatteberegning efter årets udgang benytter SKAT oplysninger fra folkekirken om ind- og udmeldelse.");
        Felt714Vist = 1;
    }

    //15.05.08 NIO og NBA (rettet tekst 27-05-08)
    if (feltnummer == 361 && beskedid == 1 && Felt361Vist == 0) {
        alert("Du har indberettet betalt A-skat indtil dato.\n\n" +
				"Bemærk! Såfremt du er i restance, og du betaler af på din restance ved lønindeholdelse (din trækprocent er\n" +
				"forhøjet i henhold til brev fra SKAT), så kan du IKKE bruge betalt A-skat indtil dato fra din lønseddel.\n" +
				"Lønindeholdelsen er nemlig en del af den betalte A-skat, og skal derfor være trukket fra i det beløb, du skriver.\n\n" +
				"Kender du ikke lønindeholdelsesbeløbet, kan du finde det i Skattemappen under punktet\n" +
				"Aktuelle indkomstoplysninger (Løn-, ferie-, pensionsoplysninger mv., summeret.)");

        Felt361Vist = 1;
    }
    else if (feltnummer = 999) {
        if (beskedid == 1) {
            if (felt.checked) {
                alert("Du har indberettet, at din virksomhed allerede er ophørt.\nDerfor sletter vi virksomhedsbeløbene på din forskudsopgørelse.\nBåde for i år og næste år.");
            }
        }
        else if (beskedid == 2) {
            if (felt.checked) {
                alert("Du har indberettet, at din virksomhed er ophørt i årets løb.\nDerfor danner vi din forskudsopgørelse for næste år uden virksomhedsbeløb.");
            }
        }
    }
}

