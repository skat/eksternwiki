<h1 class="sectionedit1" id="personselvangivelseopret">PersonSelvangivelseOpret</h1>

<h2 class="sectionedit2" id="om_servicen">Om servicen</h2>
<div class="level2">

<p>
Servicen gør det muligt at integrere indberetningen af oplysningsskemaet for personer med revisorapplikationer og dermed foretage indberetningen direkte uden at indtaste oplysningerne i Tast Selv Borger.
</p>

<p>
Servicens input er grupperet i et antal angivelser. Hver angivelse består af et antal beløb identificeret med et feltnummer samt et antal separate felter til øvrige oplysninger såsom koder og afkrydsningsfelter.
</p>

</div>

<h2 class="sectionedit3" id="oio-service_leverancer">OIO-service leverancer</h2>
<div class="level2">

<p>
Leverancerne indeholder wsdl&#039;en med tilhørende schemaer. Wsdl&#039;en ligger i folderen af samme navn. Schemaet PersonSelvangivelseOpretInterface.xsd som definerer interfacet, ligger i folderen „Service“. En del schemaer har referencer til schemaer på digitaliser.dk. Det anbefales at anvende et værktøj til at læse schemaerne.
</p>

<p>
Package.zip indeholder samtlige schemaer og er primært rettet mod kodegenerering.
</p>

<p>
I underfolderen „documentation“ under de enkelte leverancer, er der et regneark som lister beløbsfelterne. Desuden er gyldige koder for kodefelterne beskrevet.
</p>

<p>
Ved indberetning af navn og adresse vedr. privat renter, børnebidrag og ægtefællebidrag må antal tegn IKKE overskride det som anvendes i TastSelv:
</p>
<div class="table sectionedit4"><table class="inline">
	<tr class="row0">
		<td class="col0"> PERSFORNVN </td><td class="col1"> C(34) </td>
	</tr>
	<tr class="row1">
		<td class="col0"> PERSEFTERNVN </td><td class="col1"> C(34) </td>
	</tr>
	<tr class="row2">
		<td class="col0"> VEJNVN </td><td class="col1"> C(20) </td>
	</tr>
	<tr class="row3">
		<td class="col0"> HUSNR </td><td class="col1"> C(7) </td>
	</tr>
	<tr class="row4">
		<td class="col0"> POSTNR </td><td class="col1"> C(15) </td>
	</tr>
	<tr class="row5">
		<td class="col0"> BYNVN </td><td class="col1"> C(34) </td>
	</tr>
</table></div>

<p>
Under GældTilPrivatRenteUdgiftAngivelseListe skal adresselinjer udfyldes således:
</p>
<div class="table sectionedit5"><table class="inline">
	<tr class="row0">
		<td class="col0"> PersonNavnForNavn </td><td class="col1"> PERSFORNVN </td>
	</tr>
	<tr class="row1">
		<td class="col0"> PersonNavnEfterNavn </td><td class="col1"> PERSEFTERNVN </td>
	</tr>
	<tr class="row2">
		<td class="col0"> AlternativAdresseAdresseLinie1 </td><td class="col1"> VEJNVN </td>
	</tr>
	<tr class="row3">
		<td class="col0"> AlternativAdresseAdresseLinie2 </td><td class="col1"> HUSNR </td>
	</tr>
	<tr class="row4">
		<td class="col0"> AlternativAdresseAdresseLinie3 </td><td class="col1"> POSTNR </td>
	</tr>
	<tr class="row5">
		<td class="col0"> AlternativAdresseAdresseLinie4 </td><td class="col1"> BYNVN </td>
	</tr>
	<tr class="row6">
		<td class="col0"> AlternativAdresseAdresseLinie5 </td><td class="col1"> anvendes ikke </td>
	</tr>
	<tr class="row7">
		<td class="col0"> AlternativAdresseAdresseLinie6 </td><td class="col1"> anvendes ikke </td>
	</tr>
	<tr class="row8">
		<td class="col0"> AlternativAdresseAdresseLinie7 </td><td class="col1"> anvendes ikke </td>
	</tr>
	<tr class="row9">
		<td class="col0"> LandKode </td><td class="col1"> LANDKOD </td>
	</tr>
</table></div>

<p>
Under på BørneBidragAngivelseListe skal adresselinjer udfyldes således:
</p>
<div class="table sectionedit6"><table class="inline">
	<tr class="row0">
		<td class="col0"> PersonNavnForNavn </td><td class="col1"> PERSFORNVN </td>
	</tr>
	<tr class="row1">
		<td class="col0"> PersonNavnEfterNavn </td><td class="col1"> PERSEFTERNVN </td>
	</tr>
	<tr class="row2">
		<td class="col0"> AlternativAdresseAdresseLinie1 </td><td class="col1"> VEJNVN </td>
	</tr>
	<tr class="row3">
		<td class="col0"> AlternativAdresseAdresseLinie2 </td><td class="col1"> HUSNR </td>
	</tr>
	<tr class="row4">
		<td class="col0"> AlternativAdresseAdresseLinie3 </td><td class="col1"> POSTNR </td>
	</tr>
	<tr class="row5">
		<td class="col0"> AlternativAdresseAdresseLinie4 </td><td class="col1"> BYNVN </td>
	</tr>
	<tr class="row6">
		<td class="col0"> AlternativAdresseAdresseLinie5 </td><td class="col1"> anvendes ikke </td>
	</tr>
	<tr class="row7">
		<td class="col0"> AlternativAdresseAdresseLinie6 </td><td class="col1"> anvendes ikke </td>
	</tr>
	<tr class="row8">
		<td class="col0"> AlternativAdresseAdresseLinie7 </td><td class="col1"> anvendes ikke </td>
	</tr>
	<tr class="row9">
		<td class="col0"> LandKode </td><td class="col1"> LANDKOD </td>
	</tr>
</table></div>

<p>
Under ÆgtefælleBidragAngivelseListe skal adresselinjer udfyldes således:
</p>
<div class="table sectionedit7"><table class="inline">
	<tr class="row0">
		<td class="col0"> PersonNavnForNavn </td><td class="col1"> PERSFORNVN </td>
	</tr>
	<tr class="row1">
		<td class="col0"> PersonNavnEfterNavn </td><td class="col1"> PERSEFTERNVN </td>
	</tr>
	<tr class="row2">
		<td class="col0"> AlternativAdresseAdresseLinie1 </td><td class="col1"> VEJNVN </td>
	</tr>
	<tr class="row3">
		<td class="col0"> AlternativAdresseAdresseLinie2 </td><td class="col1"> HUSNR </td>
	</tr>
	<tr class="row4">
		<td class="col0"> AlternativAdresseAdresseLinie3 </td><td class="col1"> POSTNR </td>
	</tr>
	<tr class="row5">
		<td class="col0"> AlternativAdresseAdresseLinie4 </td><td class="col1"> BYNVN </td>
	</tr>
	<tr class="row6">
		<td class="col0"> AlternativAdresseAdresseLinie5 </td><td class="col1"> anvendes ikke </td>
	</tr>
	<tr class="row7">
		<td class="col0"> AlternativAdresseAdresseLinie6 </td><td class="col1"> anvendes ikke </td>
	</tr>
	<tr class="row8">
		<td class="col0"> AlternativAdresseAdresseLinie7 </td><td class="col1"> anvendes ikke </td>
	</tr>
	<tr class="row9">
		<td class="col0"> LandKode </td><td class="col1"> LANDKOD </td>
	</tr>
</table></div>

<p>
Seneste version:<br/>

</p>
<ul>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20241010/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20241010/oioservice/">20241010</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20241010/oioservice/documentation/CHANGELOG_20241010.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20241010/oioservice/documentation/CHANGELOG_20241010.txt">ændringslog</a></div>
</li>
</ul>

<p>
Tidligere versioner:<br/>

</p>
<ul>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20240131/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20240131/oioservice/">20240131</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20240131/oioservice/documentation/CHANGELOG_20240131.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20240131/oioservice/documentation/CHANGELOG_20240131.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20221114/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20221114/oioservice/">20221114</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20221114/oioservice/documentation/ChangeLogSAPRO20221114.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20221114/oioservice/documentation/ChangeLogSAPRO20221114.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211215/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211215/oioservice/">20211215</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211215/oioservice/documentation/SApro_OIOXML_Changelog_2021.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211215/oioservice/documentation/SApro_OIOXML_Changelog_2021.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211214/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211214/oioservice/">20211214</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211214/oioservice/documentation/SApro_OIOXML_Changelog_2021.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211214/oioservice/documentation/SApro_OIOXML_Changelog_2021.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211122/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211122/oioservice/">20211122</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211122/oioservice/documentation/SApro_OIOXML_Changelog_2021.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20211122/oioservice/documentation/SApro_OIOXML_Changelog_2021.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20201109/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20201109/oioservice/">20201109</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20201109/oioservice/documentation/Changelog_oioXML_Full.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20201109/oioservice/documentation/Changelog_oioXML_Full.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20191213/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20191213/oioservice/">20191213</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20191213/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20191213/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20181210/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20181210/oioservice/">20181210</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20181210/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20181210/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20181127/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20181127/oioservice/">20181127</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20181127/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20181127/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20161027/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20161027/oioservice/">20161027</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20161027/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20161027/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20160909/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20160909/oioservice/">20160909</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20160909/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20160909/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20160118/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20160118/oioservice/">20160118</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20160118/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20160118/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20151111/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20151111/oioservice/">20151111</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20151111/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20151111/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141222/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141222/oioservice/">20141222</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141222/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141222/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141201/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141201/oioservice/">20141201</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141201/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141201/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141027/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141027/oioservice/">20141027</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141027/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141027/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141014/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141014/oioservice/">20141014</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141014/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141014/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141001/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141001/oioservice/">20141001</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141001/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20141001/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140410/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140410/oioservice/">20140410</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140410/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140410/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140325/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140325/oioservice/">20140325</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140325/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140325/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140320/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140320/oioservice/">20140320</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140320/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140320/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140314/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140314/oioservice/">20140314</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140314/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140314/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140228/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140228/oioservice/">20140228</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140228/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140228/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140218/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140218/oioservice/">20140218</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140218/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140218/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140217/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140217/oioservice/">20140217</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140217/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20140217/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20131205/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20131205/oioservice/">20131205</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20131205/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20131205/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130419/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130419/oioservice/">20130419</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130419/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130419/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130208/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130208/oioservice/">20130208</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130208/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130208/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130117/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130117/oioservice/">20130117</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130117/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130117/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130114/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130114/oioservice/">20130114</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130114/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20130114/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121212/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121212/oioservice/">20121212</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121212/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121212/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121206/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121206/oioservice/">20121206</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121206/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121206/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121130/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121130/oioservice/">20121130</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121130/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121130/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121112/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121112/oioservice/">20121112</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121112/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121112/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121001/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121001/oioservice/">20121001</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121001/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20121001/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20120615/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/Selvangivelsen/20120615/oioservice/">20120615</a></div>
</li>
</ul>

</div>
