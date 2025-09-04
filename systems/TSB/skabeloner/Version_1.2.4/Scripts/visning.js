var klap_op = true;

<!-- ----------------- overgruppe indkomst og fradrag ----------------------- -->
function aendreVisIndkomstFradrag(klap_op_st){
	omdanKlapOp(klap_op_st);
	aendreVisIndkomstMedAM(klap_op);
	aendreVisIndkomstUdenAM(klap_op);
	aendreVisFradragPers(klap_op);
	aendreVisKapIndk(klap_op);
	aendreVisfradragKap(klap_op);
	aendreVisfradragLign(klap_op);
	fold_unfold(klap_op, 'indkomstfradrag_fold', 'indkomstfradrag_unfold', 'indkomstfradragknap');
	
}

<!-- --- aendre visning af undergrupper under indkomst og fradrag --- -->
function aendreVisIndkomstMedAM(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_indkmedam', 'synlig_top_indkmedam');
	}else{
		if(document.indberetning.ejfortryktindkmedam.value=='true'){
			if(!(udfyldtefelterindkmedam())){
				klapGruppeI('synlig_tr_indkmedam', 'synlig_top_indkmedam');
			}
		}	
	}

	if(document.indberetning.emptyrubrik11f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_11', 'rubrik11');
	}
	if(document.indberetning.emptyrubrik12f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_12', 'rubrik12');
	}
	if(document.indberetning.emptyrubrik14f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_14', 'rubrik14');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_15', 'rubrik15');
}
function aendreVisIndkomstUdenAM(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_indkudenam', 'synlig_top_indkudenam');
	}else{
		if(document.indberetning.ejfortryktindkudenam.value=='true'){
			if(!(udfyldtefelterindkudenam())){
				klapGruppeI('synlig_tr_indkudenam', 'synlig_top_indkudenam');
			}
		}	
	}
	if(document.indberetning.emptyrubrik16f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_16', 'rubrik16');
	}
	if(document.indberetning.emptyrubrik17f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_17', 'rubrik17');
	}
	if(document.indberetning.emptyrubrik18f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_18', 'rubrik18');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_19', 'rubrik19');
	aendreVisTrRubrik(klap_op, 'synlig_tr_20', 'rubrik20');
	aendreVisTrRubrik(klap_op, 'synlig_tr_419', 'rubrik419');
	aendreVisTrRubrik(klap_op, 'synlig_tr_420', 'rubrik420');
	aendreVisTrRubrik(klap_op, 'synlig_tr_497', 'rubrik497');
}
function aendreVisFradragPers(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_fradragpers', 'synlig_top_fradragpers');
	}else{
		if(document.indberetning.ejfortryktfradragpers.value=='true'){
			if(!(udfyldtefelterfradragpers())){
				klapGruppeI('synlig_tr_fradragpers', 'synlig_top_fradragpers');
			}
		}			
	}
	if(document.indberetning.emptyrubrik21f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_21', 'rubrik21');
	}
	if(document.indberetning.emptyrubrik22f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_22', 'rubrik22');
	}
	if(document.indberetning.emptyrubrik23f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_23', 'rubrik23');
	}
	if(document.indberetning.emptyrubrik24f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_24', 'rubrik24');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_25', 'rubrik25');
	aendreVisTrRubrik(klap_op, 'synlig_tr_27', 'rubrik27');
	aendreVisTrRubrik(klap_op, 'synlig_tr_437', 'rubrik437');
	aendreVisTrRubrik(klap_op, 'synlig_tr_491', 'rubrik491');
	if(document.indberetning.emptyrubrik459f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_459', 'rubrik459');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_29', 'rubrik29');
}
function aendreVisKapIndk(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_kapindk', 'synlig_top_kapindk');
	}else{
		if(document.indberetning.ejfortryktkapindk.value=='true'){
			if(!(udfyldtefelterkapindk())){
				klapGruppeI('synlig_tr_kapindk', 'synlig_top_kapindk');
			}
		}	
	}
	if(document.indberetning.emptyrubrik30f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_30', 'rubrik30');
	}
	if(document.indberetning.emptyrubrik31f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_31', 'rubrik31');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_32', 'rubrik32');
	if(document.indberetning.emptyrubrik33f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_33', 'rubrik33');
	}
	if(document.indberetning.emptyrubrik34f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_34', 'rubrik34');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_35', 'rubrik35');
	if(document.indberetning.emptyrubrik37f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_37', 'rubrik37');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_36', 'rubrik36');
	if(document.indberetning.emptyrubrik38f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_38', 'rubrik38');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_39', 'rubrik39');
	aendreVisTrRubrik(klap_op, 'synlig_tr_40', 'rubrik40');
}
function aendreVisfradragKap(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_fradragkap', 'synlig_top_fradragkap');
	}else{
		if(document.indberetning.ejfortryktfradragkap.value=='true'){
			if(!(udfyldtefelterfradragkap())){
				klapGruppeI('synlig_tr_fradragkap', 'synlig_top_fradragkap');
			}
		}	
	}

	if(document.indberetning.emptyrubrik41f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_41', 'rubrik41');
	}
	if(document.indberetning.emptyrubrik42f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_42', 'rubrik42');
	}
	if(document.indberetning.emptyrubrik43f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_43', 'rubrik43');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_44', 'rubrik44');
}
function aendreVisfradragLign(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_fradraglign', 'synlig_top_fradraglign');
	}else{
		if(document.indberetning.ejfortryktfradraglign.value=='true'){
			if(!(udfyldtefelterfradraglign())){
				klapGruppeI('synlig_tr_fradraglign', 'synlig_top_fradraglign');
			}
		}	
	}
	if(document.indberetning.emptyrubrik50f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_50', 'rubrik50');
	}
	if(document.indberetning.emptyrubrik51f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_51', 'rubrik51');
	}
	if(document.indberetning.emptyrubrik52f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_52', 'rubrik52');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_53', 'rubrik53');
	if(document.indberetning.emptyrubrik54f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_54', 'rubrik54');
	}
	if(document.indberetning.emptyrubrik55f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_55', 'rubrik55');
	}
	if(document.indberetning.emptyrubrik447f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_447', 'rubrik447');
	}
	if(document.indberetning.emptyrubrik448f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_448', 'rubrik448');
	}
	if(document.indberetning.emptyrubrik56f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_56', 'rubrik56');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_57', 'rubrik57');
	aendreVisTrRubrik(klap_op, 'synlig_tr_58', 'rubrik58');
	if(document.indberetning.emptyrubrik59f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_59', 'rubrik59');
	}
	if(document.indberetning.emptyrubrik460f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_460', 'rubrik460');
	}
}
<!-- --- finde ud af om indtastningsfelter under indkomst og fradrag er tomme --- -->
function udfyldtefelterindkmedam(){
	if(erUdfyldtBeloeb('rubrik11')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik12')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik14')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik15')){
		return true;
	}
	return false;
}
function udfyldtefelterindkudenam(){
	if(erUdfyldtBeloeb('rubrik16')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik17')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik18')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik19')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik20')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik419')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik420')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik497')){
		return true;
	}
	return false;
}
function udfyldtefelterfradragpers(){
		if(erUdfyldtBeloeb('rubrik21')){
			return true;
		}
		if(erUdfyldtBeloeb('rubrik22')){
			return true;
		}
		if(erUdfyldtBeloeb('rubrik23')){
			return true;
		}
		if(erUdfyldtBeloeb('rubrik24')){
			return true;
		}
		if(erUdfyldtBeloeb('rubrik25')){
			return true;
		}
		if(erUdfyldtBeloeb('rubrik27')){
			return true;
		}
		if(erUdfyldtBeloeb('rubrik437')){
			return true;
		}
		if(erUdfyldtBeloeb('rubrik491')){
			return true;
		}
		if(erUdfyldtBeloeb('rubrik459')){
			return true;
		}
		if(erUdfyldtBeloeb('rubrik29')){
			return true;
		}
		return false;
}
function udfyldtefelterkapindk(){
	if(erUdfyldtBeloeb('rubrik30')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik31')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik32')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik33')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik34')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik35')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik36')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik37')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik38')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik39')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik40')){
		return true;
	}
	return false;
}
function udfyldtefelterfradragkap(){
	if(erUdfyldtBeloeb('rubrik41')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik42')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik43')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik44')){
		return true;
	}
	return false;
}
function udfyldtefelterfradraglign(){
	if(erUdfyldtBeloeb('rubrik50')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik51')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik52')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik53')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik54')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik55')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik447')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik448')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik56')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik57')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik58')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik59')){
		return true;
	} 
	if(erUdfyldtBeloeb('rubrik460')){
		return true;
	}
	return false;
}
<!-- ----------------- slut overgruppe indkomst og fradrag  ----------------------- -->
<!-- ----------------- overgruppe aktier ------------------------------------------ -->
function aendreVisAktie(klap_op_st){
	omdanKlapOp(klap_op_st);
	aendreVisAktieIndkomst(klap_op);
	aendreVisAndenAktie(klap_op);
	aendreVisAktieUdbytte(klap_op);
	fold_unfold(klap_op, 'aktie_fold', 'aktie_unfold', 'aktieknap');
	
}
<!-- --- aendre visning af undergrupper under aktier --- -->
function aendreVisAktieIndkomst(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_aktieindk', 'synlig_top_aktieindk');
	}else{
		if(document.indberetning.ejfortryktaktieindk.value=='true'){
			if(!(udfyldtefelteraktieindk())){
				klapGruppeI('synlig_tr_aktieindk', 'synlig_top_aktieindk');
			}
		}	
	}
	if(document.indberetning.emptyrubrik61f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_61', 'rubrik61');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_62', 'rubrik62');
	if(document.indberetning.emptyrubrik63f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_63', 'rubrik63');
	}
	if(document.indberetning.emptyrubrik64f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_64', 'rubrik64');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_65', 'rubrik65');
}
function aendreVisAndenAktie(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_andenaktie', 'synlig_top_andenaktie');
	}else{
		if(document.indberetning.ejfortryktandenaktie.value=='true'){
			if(!(udfyldtefelterandenaktie())){
				klapGruppeI('synlig_tr_andenaktie', 'synlig_top_andenaktie');
			}
		}	
	}

	if(document.indberetning.emptyrubrik66f.value=='true'){
		aendreVisTrRubrik(klap_op, 'synlig_tr_66', 'rubrik66');
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_67', 'rubrik67');
}
function aendreVisAktieUdbytte(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_aktieudbytte', 'synlig_top_aktieudbytte');
	}else{
		if(!(udfyldtefelteraktieudbytte())){
				klapGruppeI('synlig_tr_aktieudbytte', 'synlig_top_aktieudbytte');
		}	
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_68', 'rubrik68');
}
<!-- --- finde ud af om indtastningsfelter under aktier er tomme --- -->
function udfyldtefelteraktieindk(){
	if(erUdfyldtBeloeb('rubrik61')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik62')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik63')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik64')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik65')){
		return true;
	}
	return false;
}
function udfyldtefelterandenaktie(){
	if(erUdfyldtBeloeb('rubrik61')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik62')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik63')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik64')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik65')){
		return true;
	}
	return false;
}
function udfyldtefelteraktieudbytte(){
	if(erUdfyldtBeloeb('rubrik68')){
		return true;
	}
	return false;
}
<!-- ----------------- slut overgruppe aktier ------------------------------------------ -->
<!-- ----------------- overgruppe skatteordning ------------------------------------------ -->
function aendreVisVirkskat(skat_valg){
	resetKapitalVirk();
	if(skat_valg==''){
		aendreKapitalordning(false);
		aendreVirksomhedsordning(false);
		document.indberetning.rubrik141_blank.checked=true;
	}
	if(skat_valg=='2'){
		aendreUdtraed(true);
		aendreKapitalVirk(false);
		document.indberetning.rubrik141_2.checked=true;
	}
	if(skat_valg=='4'){
		aendreKapitalordning(true);
		aendreVirksomhedsordning(false);
		document.indberetning.rubrik141_4.checked=true;
	}
	if(skat_valg=='1'){
		aendreKapitalordning(false);
		aendreVirksomhedsordning(true);
		document.indberetning.rubrik141_1.checked=true;
	}
}
function aendreUdtraed(klap_op){
	aendreVisTrRubrik(klap_op, 'synlig_tr_144', 'rubrik144');
	aendreVisTrRubrik(klap_op, 'synlig_tr_151', 'rubrik151');
	aendreVisTrRubrik(klap_op, 'synlig_tr_151A', 'rubrik151A');
}
function aendreKapitalVirk(klap_op){
	aendreVisTrRubrik(klap_op, 'synlig_tr_142', 'rubrik142');
	aendreVisTrRubrik(klap_op, 'synlig_tr_143', 'rubrik143');
	aendreVisTrRubrik(klap_op, 'synlig_tr_148', 'rubrik148');
	aendreVisTrRubrik(klap_op, 'synlig_tr_149', 'rubrik149');
	aendreVisTrRubrik(klap_op, 'synlig_tr_150', 'rubrik150');
	aendreVisTrRubrik(klap_op, 'synlig_tr_152', 'rubrik152');
}
function aendreKapitalordning(klap_op){
	aendreVisTrRubrik(klap_op, 'synlig_tr_142', 'rubrik142');
	aendreVisTrRubrik(klap_op, 'synlig_tr_143', 'rubrik143');
	aendreVisTrRubrik(klap_op, 'synlig_tr_144', 'rubrik144');
}
function resetKapitalVirk(){
	document.indberetning.rubrik142.value = "";
	document.indberetning.rubrik143.value = "";
	document.indberetning.rubrik144.value = "";
	document.indberetning.rubrik148.value = "";
	document.indberetning.rubrik149.value = "";
	document.indberetning.rubrik150.value = "";
	document.indberetning.rubrik151.value = "";
	document.indberetning.rubrik151A.value = "";
	document.indberetning.rubrik152.value = "";
}
function aendreVirksomhedsordning(klap_op){
	aendreVisTrRubrik(klap_op, 'synlig_tr_148', 'rubrik148');
	aendreVisTrRubrik(klap_op, 'synlig_tr_149', 'rubrik149');
	aendreVisTrRubrik(klap_op, 'synlig_tr_150', 'rubrik150');
	aendreVisTrRubrik(klap_op, 'synlig_tr_151', 'rubrik151');
	aendreVisTrRubrik(klap_op, 'synlig_tr_151A', 'rubrik151A');
	aendreVisTrRubrik(klap_op, 'synlig_tr_152', 'rubrik152');
}

<!-- ----------------- slut overgruppe skatteordning ------------------------------------------ -->

<!-- ----------------- overgruppe oevrigevirk ------------------------------------------ -->
function aendreVisOevrigevirkOvergruppe(klap_op_st){
	omdanKlapOp(klap_op_st);
	aendreVisOevrigevirk(klap_op);
	aendreVisTabfrem(klap_op);
	fold_unfold(klap_op, 'oevrigevirk_fold', 'oevrigevirk_unfold', 'oevrigevirkknap');
}
<!-- --- aendre visning af undergrupper under oevrigevirkr --- -->
function aendreVisOevrigevirk(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_oevrigevirk', 'synlig_top_oevrigevirk');
	}else{
		if(!(udfyldtefelteroevrigevirk())){
				klapGruppeI('synlig_tr_oevrigevirk', 'synlig_top_oevrigevirk');
		}
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_115', 'rubrik115');
	aendreVisTrRubrik(klap_op, 'synlig_tr_308', 'rubrik308');
	aendreVisTrRubrik(klap_op, 'synlig_tr_116', 'rubrik116');
	aendreVisTrCheckboxRadio(klap_op, 'synlig_tr_125', 'rubrik125');
	aendreVisTrRubrik(klap_op, 'synlig_tr_132', 'rubrik132');
	aendreVisTrRubrik(klap_op, 'synlig_tr_133', 'rubrik133');
	aendreVisTrRubrik(klap_op, 'synlig_tr_134', 'rubrik134');
	aendreVisTrRubrik(klap_op, 'synlig_tr_135', 'rubrik135');
	aendreVisTrRubrik(klap_op, 'synlig_tr_136', 'rubrik136');
	aendreVisTrRubrik(klap_op, 'synlig_tr_137', 'rubrik137');
	aendreVisTrRubrik(klap_op, 'synlig_tr_138', 'rubrik138');
	aendreVisTrRubrik(klap_op, 'synlig_tr_139', 'rubrik139');
	aendreVisTrRubrik(klap_op, 'synlig_tr_462', 'rubrik462');
	
}
function aendreVisTabfrem(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_tabfrem', 'synlig_top_tabfrem');
	}else{
		if(!(udfyldtefeltertabfrem())){
				klapGruppeI('synlig_tr_tabfrem', 'synlig_top_tabfrem');
		}
	}
	aendreVisTrRubrik(klap_op, 'synlig_tr_84', 'rubrik84');
	aendreVisTrRubrik(klap_op, 'synlig_tr_85', 'rubrik85');
	aendreVisTrRubrik(klap_op, 'synlig_tr_86', 'rubrik86');
}
<!-- --- finde ud af om indtastningsfelter under oevrigevirk er tomme --- -->
function udfyldtefelteroevrigevirk(){
	if(erUdfyldtBeloeb('rubrik115')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik308')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik116')){
		return true;
	}
	if(erUdfyldtBoxRadio('rubrik125')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik132')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik133')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik134')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik135')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik136')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik137')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik138')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik139')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik462')){
		return true;
	}
	return false;
}
function udfyldtefeltertabfrem(){
	if(erUdfyldtBeloeb('rubrik84')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik85')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik86')){
		return true;
	}
	return false;
}
<!-- ----------------- slut overgruppe oevrigevirk ------------------------------------------ -->

<!-- ----------------- overgruppe forskudtregn ------------------------------------------ -->
function aendreVisForskudtRegnOvergruppe(klap_op_st){
	omdanKlapOp(klap_op_st);
	aendreVisForskudtregn(klap_op);
	aendreVisKunstnere(klap_op);
	aendreVisKapafkast(klap_op);
	fold_unfold(klap_op, 'forskudtregn_fold', 'forskudtregn_unfold', 'forskudtregnknap');
}
<!-- --- aendre visning af undergruppe under forskudtregn --- -->
function aendreVisForskudtregn(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_forskudtregn', 'synlig_top_forskudtregn');
	}else{
		if(!(udfyldtefelterforskudtregn())){
				klapGruppeI('synlig_tr_forskudtregn', 'synlig_top_forskudtregn');
			}
	}
	
	aendreVisTrRubrik(klap_op, 'synlig_tr_91', 'rubrik91');
	aendreVisTrRubrik(klap_op, 'synlig_tr_92', 'rubrik92');
	aendreVisTrRubrik(klap_op, 'synlig_tr_93', 'rubrik93');
}
function aendreVisKunstnere(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_kunstnere', 'synlig_top_kunstnere');
	}else{
		if(!(udfyldtefelterkunstnere())){
				klapGruppeI('synlig_tr_kunstnere', 'synlig_top_kunstnere');
			}
	}

	aendreVisTrRubrik(klap_op, 'synlig_tr_156', 'rubrik156');
	aendreVisTrRubrik(klap_op, 'synlig_tr_157', 'rubrik157');
	aendreVisTrRubrik(klap_op, 'synlig_tr_158', 'rubrik158');
	aendreVisTrRubrik(klap_op, 'synlig_tr_159', 'rubrik159');
}
function aendreVisKapafkast(klap_op){
	if(klap_op){
		klapGruppeOp('synlig_tr_kapafkast', 'synlig_top_kapafkast');
	}else{
		if(!(udfyldtefelterkapafkast())){
				klapGruppeI('synlig_tr_kapafkast', 'synlig_top_kapafkast');
			}
	}
	
	aendreVisTrRubrik(klap_op, 'synlig_tr_162', 'rubrik162');
}
<!-- --- finde ud af om indtastningsfelter under forskudtregn er tomme --- -->
function udfyldtefelterforskudtregn(){
	if(erUdfyldtBeloeb('rubrik91')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik92')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik93')){
		return true;
	}
	return false;
}
function udfyldtefelterkunstnere(){
	if(erUdfyldtBeloeb('rubrik156')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik157')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik158')){
		return true;
	}
	if(erUdfyldtBeloeb('rubrik159')){
		return true;
	}
	return false;
}
function udfyldtefelterkapafkast(){
	if(erUdfyldtBeloeb('rubrik162')){
		return true;
	}
	return false;
}
<!-- ----------------- slut overgruppe forskudtregn ------------------------------------------ -->

<!-- --------------------------------------  fællesrutiner ------------------------------ -->
function omdanKlapOp(klap_op_st) {
	if(klap_op_st=='true'){
		klap_op = true;
	}else{
		klap_op = false;
	}
}
function erUdfyldtBeloeb(rubrik_id) {
	if(document.indberetning.elements[rubrik_id].value) {
		return true;
	}
    return false;
}
function erUdfyldtBoxRadio(rubrik_id) {
	if(document.indberetning.elements[rubrik_id].checked==true) {
		return true;
	}
    return false;
}
function aendreVisTrRubrik(klap_op, vis_tr_id, rubrik_id){
	 if (klap_op) {
		 document.getElementById(vis_tr_id).style.display = '';
	 } else {
		 if(erUdfyldtBeloeb(rubrik_id)==false){
			 document.getElementById(vis_tr_id).style.display = 'None';

		 }
	 }
}
function aendreVisTrCheckboxRadio(klap_op, vis_tr_id, rubrik_id){
	 if (klap_op) {
		 document.getElementById(vis_tr_id).style.display = '';
	 } else {
		 if( document.indberetning.elements[rubrik_id].checked==false){
			 document.getElementById(vis_tr_id).style.display = 'None';
		 }
	 }
}
function klapGruppeOp(vis_tr_id, vis_top_id){
	document.getElementById(vis_tr_id).style.display = '';
	document.getElementById(vis_top_id).style.display = '';
}
function klapGruppeI(vis_tr_id, vis_top_id){
	document.getElementById(vis_tr_id).style.display = 'None';
	document.getElementById(vis_top_id).style.display = 'None';
}
function fold_unfold(klap_op, fold_id, unfold_id, knap_id){
	if(klap_op){
		document.getElementById(fold_id).style.display = '';
		document.getElementById(unfold_id).style.display = 'None';
		document.indberetning.elements[knap_id].value = 'true';
	}else{
		document.getElementById(fold_id).style.display = 'None';
		document.getElementById(unfold_id).style.display = '';
		document.indberetning.elements[knap_id].value = 'false';
	}
}

