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

**BankHent**

BankHent.wsdl

**Versionshistorik**

Seneste version:

20210624 - ændringslog

Tidligere versioner:

20170809

20170804

20170726

20160301

20160121

20150210

20120704
