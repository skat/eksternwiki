# PersonKontrolOplysningHent

**R75-person**

PersonKontrolOplysningHent er en OIO-service, som gør det muligt at få detaljerede skattemæssige oplysninger om personer (R75-person). R75 trækker på informationer fra en række af SKAT's systemer og anvendes primært til kontrolformål. SKATs samarbejdspartnere kan få adgang til disse oplysninger med henblik på sagsbehandling eller rådgivning. Servicen er et alternativ til rekvirering af manuelle udtræk eller adgang via Tast Selv Borger. Servicen gør det muligt at integrere oplysningerne i egne beregnings- eller sagsbehandlingsapplikationer.

**Adgang**

Adgang til oplysningerne kræver lovhjemmel og gives efter individuel aftale. Der gives kun adgang til oplysninger, som er relevant til formålet.

Servicen giver kun læseadgang. Det er ikke muligt at foretage rettelser ad denne vej.


**Hvilke oplysninger kan man få?**

Udtrækket indeholder oplysninger om betalte skatter, selvangivne oplysninger, virksomhedsoplysninger, moms, oplysningssedler, diverse fradrag, løn, ydelser og øvrige indtægter, formue og pension, ejendomme og køretøjer. Der er tale om de samme oplysninger, som borgeren selv har adgang til via Skatteoplysninger.

Bilag 1 i XML-guiden beskriver hvilke specifikke oplysninger, der udstilles.


**Strukturel opbygning**

Servicen returnerer en generisk struktur med et antal grupperede felter. Hvert felt består af ét eller flere underfelter. Disse underfelter er af en specifik type (fx beløb) og beskrives yderligere med en „kvalifikator“. Markeringsfelter kan suppleres med en kode eller tekst.



<h2 class="sectionedit7" id="bankhent">BankHent</h2>
<div class="level2">

<p>
<a href="https://eksternwiki.skat.dk/systems/SLSP/BankHent20161024/OIOXML/BankHent_20161024/BankHent.wsdl" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/systems/SLSP/BankHent20161024/OIOXML/BankHent_20161024/BankHent.wsdl">BankHent.wsdl</a>
</p>

</div>
<div class='secedit editbutton_section editbutton_7'><form class="button btn_secedit" method="post" action="/personkontroloplysninghent"><div class="no"><input type="hidden" name="do" value="edit" /><input type="hidden" name="rev" value="1730466562" /><input type="hidden" name="summary" value="[BankHent] " /><input type="hidden" name="target" value="section" /><input type="hidden" name="hid" value="bankhent" /><input type="hidden" name="codeblockOffset" value="0" /><input type="hidden" name="range" value="1940-2053" /><button type="submit" title="BankHent">Redigér</button></div></form></div>
<h2 class="sectionedit8" id="versionshistorik">Versionshistorik</h2>
<div class="level2">

<p>
Seneste version:<br/>

</p>
<ul>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20210624/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20210624/oioservice/">20210624</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20210624/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20210624/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
</ul>

<p>
Tidligere versioner:<br/>

</p>
<ul>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20170809/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20170809/oioservice/">20170809</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20170804/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20170804/oioservice/">20170804</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20170726/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20170726/oioservice/">20170726</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20160301/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20160301/oioservice/">20160301</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20160301/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20160301/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20160121/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20160121/oioservice/">20160121</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20160121/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20160121/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20150210/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20150210/oioservice/">20150210</a></div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20120704/oioservice/" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20120704/oioservice/">20120704</a> - <a href="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20120704/oioservice/documentation/changelog.txt" class="interwiki iw_this" title="https://github.com/skat/eksternwiki/tree/main/projects/R75-P/20120704/oioservice/documentation/changelog.txt">ændringslog</a></div>
</li>
</ul>

</div>
