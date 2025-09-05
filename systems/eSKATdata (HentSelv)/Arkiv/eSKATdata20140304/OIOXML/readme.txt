README vedr. 2012-tilretning af HentSelvSendData
=================================================================================================================
Der er tilf�jet nye felter som svarer til felterne i SKATXML. De nye felter er markeret med gult i Mapningsark.xls

S�rlige konverteringer:
- KommuneNummer (3-cifret integer) konverteres til CPR_MunicipalityCode som er 4-cifret string. Nummeret foranstilles med nul.
- EjendomNummer (7-cifret number) konverteres til BBR_MunicipalRealPropertyIdentifier, som er 6-cifret string. Der gives fejl, hvis der er 7 cifre i systemet.
- Hvis adresselinjen (AlternativAdresseAdresseLinie1) er l�ngere end tilladte 34 tegn, afkortes linjen.

OIO-�ndringer i forl�ngelse af SKATXML-�ndringer:

Output fra HentSelvSendData:
Der er tilf�jet et antal nye optionelle felter:
IndkomstOplysningPersonPersonLoentimerBeloeb
IndkomstOplysningPersonBruttoFeriepengeBeloeb
AarligSkatteOplysningEngangsudbetalingerBeloeb
AarligSkatteOplysningPrivatDagplejeHushjaelpBeloeb
AarligSkatteOplysningUnderholdsbidragBeloeb
AarligSkatteOplysningIndskudAlderpensionBeloeb
AarligSkatteOplysningStudieStatslaanRenteudgiftSumBeloeb
AarligSkatteOplysningRenteudgiftOffentligGaeldBeloeb
UnderholdBoerneBidragBeloeb

Desuden er der tilf�jet en liste af ejendomsoplysninger med:
EjendomEjerskabStartDato
MunicipalityCode
MunicipalRealPropertyIdentifier
PostalAddressFirstLineText
EjendomAngivelseEjerandelProcent
