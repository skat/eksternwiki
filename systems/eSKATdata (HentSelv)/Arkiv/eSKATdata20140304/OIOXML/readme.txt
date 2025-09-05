README vedr. 2012-tilretning af HentSelvSendData
=================================================================================================================
Der er tilføjet nye felter som svarer til felterne i SKATXML. De nye felter er markeret med gult i Mapningsark.xls

Særlige konverteringer:
- KommuneNummer (3-cifret integer) konverteres til CPR_MunicipalityCode som er 4-cifret string. Nummeret foranstilles med nul.
- EjendomNummer (7-cifret number) konverteres til BBR_MunicipalRealPropertyIdentifier, som er 6-cifret string. Der gives fejl, hvis der er 7 cifre i systemet.
- Hvis adresselinjen (AlternativAdresseAdresseLinie1) er længere end tilladte 34 tegn, afkortes linjen.

OIO-ændringer i forlængelse af SKATXML-ændringer:

Output fra HentSelvSendData:
Der er tilføjet et antal nye optionelle felter:
IndkomstOplysningPersonPersonLoentimerBeloeb
IndkomstOplysningPersonBruttoFeriepengeBeloeb
AarligSkatteOplysningEngangsudbetalingerBeloeb
AarligSkatteOplysningPrivatDagplejeHushjaelpBeloeb
AarligSkatteOplysningUnderholdsbidragBeloeb
AarligSkatteOplysningIndskudAlderpensionBeloeb
AarligSkatteOplysningStudieStatslaanRenteudgiftSumBeloeb
AarligSkatteOplysningRenteudgiftOffentligGaeldBeloeb
UnderholdBoerneBidragBeloeb

Desuden er der tilføjet en liste af ejendomsoplysninger med:
EjendomEjerskabStartDato
MunicipalityCode
MunicipalRealPropertyIdentifier
PostalAddressFirstLineText
EjendomAngivelseEjerandelProcent
