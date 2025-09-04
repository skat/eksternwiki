var hjaelp = null;
var email = null;
var layout = "&layout=353121";
if ((screen.width == 640) && (screen.height == 480)) {
  var w1 = 630; var h1 = 315; var l1 = 0; var t1 = 20; // Hjælp, vejledning m.v.
  var w4 = 630; var h4 = 315; var l4 = 0; var t4 = 20; // Diverse (rute m.v.)
}
else if ((screen.width == 800) && (screen.height == 600)) {
  var w1 = 630; var h1 = 355; var l1 = 20; var t1 = 20;
  var w4 = 630; var h4 = 345; var l4 = 92; var t4 = 92;
}
else { // ((screen.width >= 1024) && (screen.height >= 768))
  var w1 = 650; var h1 = 460; var l1 = 20; var t1 = 20;
  var w4 = 630; var h4 = 500; var l4 = 92; var t4 = 92;
}

function aabn_hjaelp_vindue(file) {
  var krom = "width="+w1+",height="+h1+",left="+l1+",top="+t1+",scrollbars=yes,menubar=yes,toolbar=yes,status=yes,resizable=yes";
  hjaelp = window.open(hjaelp_mappe+file+layout,'Hjaelp',krom);
  hjaelp.focus();
}
function aabn_email_vindue() {
//  if (email&& email.open && !email.closed) {
//    email.window.focus();
//  }
//  else {
    var krom = "width="+w4+",height="+h4+",left="+l4+",top="+t4+",scrollbars=yes,menubar=yes,status=yes,resizable=yes";
    email = window.open(indlaes_side,'Email',krom);
    email.window.focus();
    document.email.submit();
}