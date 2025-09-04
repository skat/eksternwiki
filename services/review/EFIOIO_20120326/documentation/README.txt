Ændringer i leverance 20120323:
1) Tilføjelse af to nye underretninger
2) Opdatering af enumerations
3) Tilføjelse af optionelt felt vedr. subsidiær hæftelse i hæftelsesstrukturen

Ændringerne påvirker servicene MFFordringIndberet og MFUnderretSamlingHent.

Disse schemaer er ændret:
- MFHaeftelseStruktur.xsd 
- MFUnderretSamlingHent_O.xsd
- FordringAfskrivningAarsagKode.xsd
- HovedFordringReturAarsagKode.xsd
- HovedFordringTilbagekaldAarsagKode.xsd
- ModtagFordringDokumentArtKode.xsd

Disse schemaer er tilføjet:
- HaeftelseSubsidiaerAutoafskrivningMarkering.xsd
  (anvendes af MFHaeftelseStruktur.xsd)
- TransportRettighedshaverElementIndStrukturType.xsd
  (anvendes af MFUnderretNyTransportAdministratorStrukturType.xsd)
- MFUnderretNyTransportAdministratorStrukturType.xsd (ny underrretning)
- MFUnderretKundeAEndringStrukturType.xsd (ny underrretning)

Mapningsarket indeholder opdateret underark som dokumenterer mapning af enumerations mellem SKAT og OIO
