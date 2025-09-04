// globale indgangsværdier 
	var normalbidrag = "af";
	var year = 2012;
	var barn = 0;
	var maaneder = 12;
	var vis_maaneder = 0;
	var dummy_forhoj;
	var dummy_maaned;
	var selv_fast;

	
// startfunktion *********************	

$(function(){

	$("#antal_born").spinner({min:0});
	$("#antal_maaneder").spinner({min:1,max:12});
	$("#wise_udregning").hide();
	$("#ramme_bornebidrag").hide();
	$("#ramme_korsel").hide();
	
	

	setTimeout(function () {$("#fastsat_selv").trigger("click");},1);
	$("#belob_maaned").val("");$("#prec_maaned").hide();$("#antal_born").hide();$("#wise_result").hide();$("#statsforvaltning").hide();$("#forhojet_bixdrag").hide();
	satvardier();
	$("#so").on("click",function () {$("#wise_udregning").slideToggle(1200)});
	$("#show_bornebidrag").on("click", function () {$("#ramme_bornebidrag").slideToggle(1200);$("#ramme_korsel").hide()}); 
	$("#show_korsel").on("click", function () {$("#ramme_korsel").slideToggle(1200);$("#ramme_bornebidrag").hide()}); 
	$("#antal_maaneder").on("spinstop",function () {dummy_maaned = 1;beregn()});
	$("#antal_born").on("spinstop",function () {barn = parseFloat($("#antal_born").val());
	if (barn == 1) {ret(4,1);};
	if (barn == 2) {ret(4,2);};
	if (barn >= 3) {ret(4,4)};
	beregn()});
	
}); /* slutter jquery startfunktion */







//****************** funtionen der kaldes ved klik på knapper ************************* // 
function ret (niveau,detail) { 
	
	if (niveau == 1) {
	$('[id*="year"]').removeClass("yes_valgt").addClass("not_valgt");
	if (detail == 1) {$("#year_2012").removeClass("not_valgt").addClass("yes_valgt").hide().fadeIn(600);year = 2012;skift_tekst();ret (2,1)}
	if (detail == 2) {$("#year_2013").removeClass("not_valgt").addClass("yes_valgt").hide().fadeIn(600);year = 2013;skift_tekst();maned();ret(2,2);}
	} // slutter niveau 1
	
	if (niveau == 2) {
	$('[id*="aaret"]').removeClass("yes_valgt").addClass("not_valgt");
	
	if (detail == 1) {$("#aaret_hele").removeClass("not_valgt").addClass("yes_valgt").hide().fadeIn(600);$("#prec_maaned").slideUp(1000);maaneder = 12;vis_maaneder = 0;if(year == 2012) {$("#dummy_yzear").show()}}
	if (detail == 2) {$("#aaret_mindre").removeClass("not_valgt").addClass("yes_valgt").hide().fadeIn(600);$("#prec_maaned").slideDown(1000);vis_maaneder = 1;
	if(year == 2013) {$("#dummy_yzear").hide(); }}
	} // slutter niveau 2

	if (niveau == 3) {
	if (normalbidrag == "paa") {$("#normal_bidrag").removeClass("not_valgt").addClass("yes_valgt").hide().fadeIn(600);normalbidrag = "af"; indsaet(); return};
	if (normalbidrag == "af") {$("#normal_bidrag").removeClass("yes_valgt").addClass("not_valgt").hide().fadeIn(600);normalbidrag = "paa";$("#belob_maaned").val(""); $("#no_result").show();$("#wise_result").hide();
	return};
	} // slutter niveau 3
	
	if (niveau == 4) {
	$('[id*="barn"]').removeClass("yes_valgt").addClass("not_valgt");
	if(detail == 1) {$("#barn_et").removeClass("not_valgt").addClass("yes_valgt").hide().fadeIn(600);$("#antal_born").val(1);barn = 1;}
	if(detail == 2) {$("#barn_to").removeClass("not_valgt").addClass("yes_valgt").hide().fadeIn(600);$("#antal_born").val(2);barn = 2;beregn_bidrag(1)}
	if(detail == 3) {$("#barn_flere").hide();$("#antal_born").show("clip");barn = parseFloat($("#antal_born").val());beregn_bidrag(1);}
	if(detail == 4) {$("#barn_flere").hide();$("#antal_born").show();barn = parseFloat($("#antal_born").val()); beregn_bidrag(1);}
	if(detail == 5) {barn = parseFloat($("#antal_born").val());}
	} //slutter niveau 4 
	
	if (niveau == 5) {
	$('[id*="bidrag"]').removeClass("yes_valgt").addClass("not_valgt");
	if(detail == 1) {$("#bidrag_normal").removeClass("not_valgt").addClass("yes_valgt").hide().fadeIn(600);$("#forhojet_bixdrag").slideUp(1000);beregn_bidrag(1);dummy_forhoj = 1}
	if(detail == 2) {$("#bidrag_forhojet").removeClass("not_valgt").addClass("yes_valgt").hide().fadeIn(600);$("#forhojet_bixdrag").slideDown(1000);$("#belob_maaned").val("");dummy_forhoj = 2}
	} // slutter niveau 5
	
	if (niveau == 6) {
	$('[id*="fastsat"]').removeClass("yes_valgt").addClass("not_valgt");
	if(detail == 1) {$("#fastsat_selv").removeClass("not_valgt").addClass("yes_valgt").hide().fadeIn(600);$("#statsforvaltning").slideUp(1000);$("#forhojet_bixdrag").hide();selv_fast = 1}
	if(detail == 2) {$("#fastsat_stat").removeClass("not_valgt").addClass("yes_valgt").hide().fadeIn(600);$("#statsforvaltning").slideDown(1000);selv_fast = 2}
	} // slutter niveau 6

	if ($("#belob_maaned").val() != "") {beregn ()}; 
	if (dummy_forhoj == 2) {if ($("#tillag").val() > 0) {beregn_bidrag(2)}};
	if (dummy_forhoj == 1) {beregn_bidrag(1)};
} // slutter funktionen

// **** funktion der kaldes hvis beløb er forskellig fra "" genererer resultat
function beregn (tester) {
	
	if (tester == 1) {if (normalbidrag == "af") {$("#normal_bidrag").removeClass("yes_valgt").addClass("not_valgt");normalbidrag = "paa"};}; 
	
	if (dummy_maaned == 1) {$("#fra_maaned").val(0.01);$("#til_maaned").val(0.01);dummy_maaned = 0}
	
	if (vis_maaneder == 1) {maaneder = parseFloat($("#antal_maaneder").val());};
	var maaned_belob = $("#belob_maaned").val();
	if (maaned_belob != "") {if (maaned_belob.match(/[a-åA-Å]/)) {$("#belob_maaned").val("")};}
	if (maaned_belob == "") {$("#no_result").show();$("#wise_result").hide();}
	
	if (maaned_belob.length >= 4 && barn == 0) {$("#ryst").hide().show("pulsate");}
	if (maaned_belob.length >= 4 && maaned_belob != "" && maaned_belob > 0 && barn > 0) {
	
	if (year == 2012) {var sats = 141};
	if (year == 2013) {var sats = 143};
	
	// beregner værdier
	var resultat = (maaned_belob-(sats*barn))* maaneder;	
	var vis_resultat = satpunktum(resultat);
	
	if (barn > 1) {var flertalbarn = " børn"} else {var flertalbarn = " barn"};
	
	$("#no_result").hide();
	$("#konk_aar").html(year + ":");
	
	$("#wise_result").slideDown(1000);
	$("#born_end").html(vis_resultat + " kr.");
	
	var testo = "[ Betalt bel&oslashb i ";
	
	// data til mellemregning
	$("#udregning").html(testo + year + " ] - [ Till&aeliggget * antal b&oslashrn ]");
	$("#udregning_2").html("[ " + satpunktum(maaned_belob) + " kr. * " + maaneder + " m&aringneder ] - [ Till&aeligget (" + sats + " kr. * " + maaneder + " m&aringneder) * " + barn + flertalbarn + " ]");
	$("#udregning_3").html("[ " + satpunktum(maaned_belob * maaneder) + " kr. ] - [ " + satpunktum(sats*maaneder) + " kr. * " + barn + flertalbarn + " ]");
	$("#udregning_4").html("[ " + satpunktum(maaned_belob * maaneder) + " kr. ] - [ " + satpunktum(sats*maaneder*barn) + " kr. ] = " + vis_resultat + " kr.");
	
	$("#show_jahre").html(" i " + year + " er " + sats +  " kr. pr. barn"); 
	
	

	
	//sætter sådan går du tekst
	
	
	} else {$("#no_result").show();$("#wise_result").hide();}// afslutter resultatvisning (hvis der er noget i inputfeltet)
	
} // slutter beregn funktionen 


function tiltastselv () {
	$("#komnu").html("åååøøøæææ");
	if (year == 2013) {window.open("https://www.tastselv.skat.dk/borger/link?appl=retforskudsopgoerelsen");};
	if (year == 2012) {window.open("https://www.tastselv.skat.dk/borger/link?appl=retaarsopgoerelsen");};
}

// funktion der sætter værdier ind i beløb pr. måned
function beregn_bidrag (vardi) {
	
	if (selv_fast == 1) {return};
	
	if (vardi == 1) {

	if (year == 2012) {$("#belob_maaned").val(1228*barn);beregn()};
	if (year == 2013) {$("#belob_maaned").val(1247*barn);beregn()};
	
	} // slutter har klikket på normalbidrag
	
	if (vardi == 2) {
	
	var procent_tillag = parseFloat($("#tillag").val());
	var grundbelob;
	
	if (year == 2012) {grundbelob = 1087; sats = 141};
	if (year == 2013) {grundbelob = 1104; sats = 143};
	
	var tillag_belob = Math.round(grundbelob * (1 + procent_tillag));
	
	var total_belob = barn * (sats + tillag_belob);
	
	$("#belob_maaned").val(total_belob);
	beregn();
	}; // slutter værdi 2
} // slutter funktion 


function sat_maaned () {
	
	var from = parseFloat($("#fra_maaned").val());
	var til = parseFloat($("#til_maaned").val());
	var antal_maaneder = til - from;
	if (from == 0.01 || til == 0.01) {return};
	if (antal_maaneder < 0) {$("#fra_maaned").val(0.01);antal_maaneder = 0};
	$("#antal_maaneder").val(antal_maaneder);
	beregn();
} // slutter funktion 

function maned () {
	var tid = new Date ();
	var maaned = tid.getMonth(); 
	$("#fra_maaned").val(maaned);
}; // slutter funktionen, der sætter måneden


// ******* funktion der sætter punktumer **********
function satpunktum(vardi) {
	
	var langde = vardi.toString().length;
	var belob_ud = vardi.toString();
	
	if (langde <= 3) {return belob_ud};
	
	if (langde >= 4 && langde <= 6) {
	var forstebogstaver = belob_ud.substr(0,langde-3); 
	var resten = belob_ud.substr(langde-3,langde);
	var belob_udskriv = forstebogstaver + "." + resten;};
	
	if (langde > 6 && langde <= 9) {
	var forstebogstaver = belob_ud.substr(0,langde-6); 
	var andenrakke = belob_ud.substr(langde-6,3); 
	var resten = belob_ud.substr(langde-3,3);
	var belob_udskriv = forstebogstaver + "." + andenrakke + "." + resten;
	};
	
	if (langde > 9) {return belob_ud};
	
	return belob_udskriv;	
} // slutter sæt punktum funktion 


function satvardier() {
	$("#fra_maaned").val(1);
	$("#til_maaned").val(12);
	$("#antal_born").val(3);
	$("#antal_maaneder").val(11);
	
};

function skiftpil () {
	var jk = $("#wise_udregning").css("display");
	if (jk == "block") {$("#pilikon").removeClass("pil_vend").addClass("pil_normal");};
	if (jk == "none") {$("#pilikon").removeClass("pil_normal").addClass("pil_vend");};
}; // slutter funktion, der skifter pil (kun i moderne browsere


