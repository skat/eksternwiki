function VisNyHjaelpSide(side)
{
	if (navigator.userAgent.indexOf("MSIE 3") != -1)
	{
		var NySide = window.open(side,"ForskudsopgoerelsenHjaelp","menubar=yes,titlebar=yes,status=yes,scrollbars=yes,resizable=yes,toolbar=yes,TOP=100,LEFT=100,HEIGHT=500,WIDTH=700");
	}
	else
	{
		var NySide = window.open(side,"ForskudsopgoerelsenHjaelp","menubar=yes,titlebar=yes,status=yes,scrollbars=yes,resizable=yes,toolbar=yes,TOP=100,LEFT=100,HEIGHT=500,WIDTH=700");
		NySide.focus();
	}
}
function check_key(rowobj){
  if (window.event.keyCode=13){
    rowobj.click();
  }
}
function showHighlight(rowobj) {
    rowobj.className = "SKMP_Fokus";
//  rowobj.style.background = 'navy';
//  rowobj.style.cursor = 'hand';
//  rowobj.style.color = 'white';
//  rowobj.style.fontWeight = 'bold';
}

function clearHighlight(rowobj) 
{
    rowobj.className = "SKMP_IkkeFokus";
//    rowobj.style.background = 'white';
//  rowobj.style.cursor = 'auto';
//  rowobj.style.color = 'black';
//  rowobj.style.fontWeight = 'normal';
}

function VisSkmpPdfSide(DocIndex, dato, Lager, aid) {
  OpenDialog( 'Blank.htm', 'Forskudsopgoerelsen', '700', '700', 'yes', 'yes', 'no', 'yes', 'no', true, true, aabneVinduer );
  document.visside.aid.value = aid;
  document.visside.Lager.value = Lager;
  document.visside.DocIndex.value = DocIndex;
  document.visside.Koerselsdato.value = dato;
  document.visside.target = 'Forskudsopgoerelsen';
  document.visside.submit();
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

