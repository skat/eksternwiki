// vindues-objekter
var regnskab = null;
var hjaelp = null;
var slsp = null;
var spec_befor = null;
var spec_fortrykt = null;
var orient = null;
var befor = null;
var ejd = null;
var udlejd = null;
var nyUdlejd = null; 
var genanbringelse = null;
var udlindk = null;
var aktie = null;
var aktiehenstand = null;
var spec_aktiehenstand = null; 
var gl_l = 0;
var gl_t = 0;
var krom;

//aktuelle dimensioner
var w;
var h;
var l;
var t;

function vinduesParametre(vinduestype){
  if ((screen.width == 640) && (screen.height == 480)) {
    w = 640; h = 315; l = 0; t = 20; // alle billeder
  }
  else if ((screen.width == 800) && (screen.height == 600)) {
	  if(vinduestype == 1){// 1 er smalt vindue, 2 er bredt
	  	w = 640;
	  	h = 345;
	  	l = gl_l;
	  	t = gl_t;
	  	gl_l = gl_l + 20;
	  	gl_t = gl_t + 20; 
	  }else{
	  	w = 770;
	  	h = 445;
	  	l = gl_l;
	  	t = gl_t;
	  	gl_l = gl_l + 20;
	  	gl_t = gl_t + 20; 
	  }
  
  }
  else { // ((screen.width >= 1024) && (screen.height >= 768))
 	if(vinduestype == 1){
	  	w = 650;
	  	h = 500;
	  	l = gl_l;
	  	t = gl_t;
	  	gl_l = gl_l + 20;
	  	gl_t = gl_t + 20; 
	  }else{
	  	w = 770;
	  	h = 500;
	  	l = gl_l;
	  	t = gl_t;
	  	gl_l = gl_l + 20;
	  	gl_t = gl_t + 20; 
	  }
  }
  krom = "width="+w+",height="+h+",left="+l+",top="+t+",scrollbars=yes,menubar=yes,status=yes,resizable=yes";
  if(gl_l >= 180){
  	gl_l = 0;
  	gl_t = 0;
  	}
}

function aabn_regnskab_vindue() {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else if (regnskab && regnskab.open && !regnskab.closed) {
    regnskab.window.focus();
  }
  else {
  	vinduesParametre(2); // bredt vindue
    regnskab = window.open(indlaes_side,'Regnskab',krom);
    regnskab.window.focus();
    document.regnskab.submit();
  }
}

function aabn_genanbringelse_vindue() {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else if (genanbringelse && genanbringelse.open && !genanbringelse.closed) {
    genanbringelse.window.focus();
  }
  else {
    vinduesParametre(2); // bredt vindue
    genanbringelse = window.open(indlaes_side,'Genanbringelse',krom);
    genanbringelse.window.focus();
    document.genanbringelse.submit();
  }
}

function aabn_udlindk_vindue() {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else if (udlindk && udlindk.open && !udlindk.closed) {
    udlindk.window.focus();
  }
  else {
    vinduesParametre(2); // bredt vindue
    udlindk = window.open(indlaes_side,'Udlindk',krom);
    udlindk.window.focus();
    document.udlindk.submit();
  }
}
function aabn_ejd_vindue(enr, lbnr) {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else if (ejd && ejd.open && !ejd.closed) {
    ejd.window.focus();
  }
  else {
    vinduesParametre(2);  // bredt vindue
    ejd = window.open(indlaes_side,'Ejd',krom);
    ejd.window.focus();
    document.ejd.enr.value = enr;
    document.ejd.lbnr.value = lbnr;
    document.ejd.submit();
  }
}
function aabn_udlejd_vindue(enr, lbnr) {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else if (udlejd && udlejd.open && !udlejd.closed) {
    udlejd.window.focus();
  }
  else {
   	vinduesParametre(2);  // bredt vindue
    udlejd = window.open(indlaes_side,'Udlejd',krom);
    udlejd.window.focus();
    document.udlejd.enr.value = enr;
    document.udlejd.lbnr.value = lbnr;
    document.udlejd.submit();
  }
}
function aabn_aktie_vindue() {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else if (aktie && aktie.open && !aktie.closed) {
    aktie.window.focus();
  }
  else {
    vinduesParametre(2);  // bredt vindue
    aktie = window.open(indlaes_side,'Aktie',krom);
    aktie.window.focus();
    document.aktie.submit();
  }
}
function aabn_aktiehenstand_vindue() {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else if (aktiehenstand && aktiehenstand.open && !aktiehenstand.closed) {
    aktiehenstand.window.focus();
  }
  else {
    vinduesParametre(2);  // bredt vindue
    aktiehenstand = window.open(indlaes_side,'Aktiehenstand',krom);
    aktiehenstand.window.focus();
    document.aktiehenstand.submit();
  }
}

function aabn_nyUdlejd_vindue() {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else if (nyUdlejd && nyUdlejd.open && !nyUdlejd.closed) {
    nyUdlejd.window.focus();
  }
  else {
    vinduesParametre(2);  // bredt vindue
    nyUdlejd = window.open(indlaes_side,'NyUdlejd',krom);
    nyUdlejd.window.focus();
    document.nyUdlejd.submit();
  }
}
function aabn_hjaelp_vindue(file) {
  vinduesParametre(2);
  hjaelp = window.open(hjaelp_mappe+file,'Hjaelp',krom);
  hjaelp.focus();
}

function aabn_orient_vindue(file) {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else {
    vinduesParametre(2);  // bredt vindue
    orient = window.open(indlaes_side,'Orient',krom);
    orient.window.focus();
    document.orient.rubriknr.value = file;
    document.orient.submit();
  }
}

function aabn_spec_fortrykt_vindue(rubriknr, rubriksum) {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else {
    vinduesParametre(1); // smalt vindue
    spec_fortrykt = window.open(indlaes_side,'Spec_fortrykt',krom);
    spec_fortrykt.window.focus();
    document.spec_fortrykt.rubriknr.value = rubriknr;
    document.spec_fortrykt.rubriksum.value = rubriksum;
    document.spec_fortrykt.submit();
  }
}

function aabn_slsp_vindue(file) {
  vinduesParametre(2);
  slsp = window.open(file,'slsp',krom);
  slsp.focus();
}

function aabn_spec_befor_vindue() {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else {
    vinduesParametre(1);  // smalt vindue
    spec_befor = window.open(indlaes_side,'Spec_befor',krom);
    spec_befor.window.focus();
    document.spec_befor.submit();
  }
}

function aabn_befor_vindue() {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else if (befor && befor.open && !befor.closed) {
    befor.window.focus();
  }
  else {
    vinduesParametre(1);  // smalt vindue
    befor = window.open(indlaes_side, 'Befor',krom);
    befor.window.focus();
    document.befor.submit();
  }
}

function aabn_spec_aktiehenstand_vindue() {
  if (!indlaest) {
    meddelelse_om_indlaesning();
  }
  else {
    vinduesParametre(2);  // bredt vindue
    spec_aktiehenstand = window.open(indlaes_side,'Spec_aktiehenstand',krom);
    spec_aktiehenstand.window.focus();
    document.spec_aktiehenstand.submit();
  }
}