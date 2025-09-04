function initMenuHoejder() {
  justerHoejreMenu(getHoejde("skts-tastselv-menu-aarsopgoerelse-ramme"));
  setInterval(function () { checkHoejder(); }, 1000);
}

function getHoejde(id) {
  var elem = document.getElementById(id);
  return elem.offsetHeight;

}

function harForskelligeHoejder(leftMenuHeight) {
  var rightMenuHeight = getHoejde("skts-tastselv-menu-forskudsopgoerelse-ramme");
  return Math.abs(rightMenuHeight - leftMenuHeight) > 2;
}

function checkHoejder() {
  var leftMenuHeight = getHoejde("skts-tastselv-menu-aarsopgoerelse-ramme");
  if (harForskelligeHoejder(leftMenuHeight)) {
    justerHoejreMenu(leftMenuHeight);

  }
}

function foroegHoejde(inc) {
  var rightMenuAdjust = document.getElementById("skts-tastselv-menu-ramme-hoejde-justering");
  var heightAdjust = rightMenuAdjust.offsetHeight + inc;
  if (heightAdjust > 0) {
    rightMenuAdjust.style.height = heightAdjust + "px";
  }    
}

/*
* Justerer højden på højremenuen ved at bruge den ekstra tomme højde (skts-tastselv-menu-ramme-hoejde-justering)
* Den sætter højden på den til forskellen på de 2 menuer.
* 
*/
function justerHoejreMenu(height) {
  var rightMenuAdjust = document.getElementById("skts-tastselv-menu-ramme-hoejde-justering");
  var rightMenu = document.getElementById("skts-tastselv-menu-forskudsopgoerelse-ramme");
  foroegHoejde(height - getHoejde("skts-tastselv-menu-forskudsopgoerelse-ramme"));
}
