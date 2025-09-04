�ndringer i leverance 20120323:
1) Tilf�jelse af to nye underretninger
2) Opdatering af enumerations
3) Tilf�jelse af optionelt felt vedr. subsidi�r h�ftelse i h�ftelsesstrukturen

�ndringerne p�virker servicene MFFordringIndberet og MFUnderretSamlingHent.

Disse schemaer er �ndret:
- MFHaeftelseStruktur.xsd 
- MFUnderretSamlingHent_O.xsd
- FordringAfskrivningAarsagKode.xsd
- HovedFordringReturAarsagKode.xsd
- HovedFordringTilbagekaldAarsagKode.xsd
- ModtagFordringDokumentArtKode.xsd

Disse schemaer er tilf�jet:
- HaeftelseSubsidiaerAutoafskrivningMarkering.xsd
  (anvendes af MFHaeftelseStruktur.xsd)
- TransportRettighedshaverElementIndStrukturType.xsd
  (anvendes af MFUnderretNyTransportAdministratorStrukturType.xsd)
- MFUnderretNyTransportAdministratorStrukturType.xsd (ny underrretning)
- MFUnderretKundeAEndringStrukturType.xsd (ny underrretning)

Mapningsarket indeholder opdateret underark som dokumenterer mapning af enumerations mellem SKAT og OIO
