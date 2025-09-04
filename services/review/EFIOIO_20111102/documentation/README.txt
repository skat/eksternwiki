Ændringer i leverance 20111101:
- Nyt element OplysningDatoTid indgår i MFHaeftelseStruktur.xsd, 
  MFAendrFordringStruktur.xsd, MFAendrTransportStruktur.xsd. 
  Det er et læsningstimestamp, som bruges ifm. optimistisk låsning
- RenteSatsProcent tilføjet til RenteValgStruktur og dermed MFFordringIndberet
- Vigtig bemærkning i servicebeskrivelsen for MFFordringIndberet omkring 
  begrænset understøttelse af koder i CivilstandSamlivsforholdKode som 
  benyttes af MFHaeftelseStruktur.xsd
- MFOpretFordringStruktur.xsd: ModtagFordringPaaklagetIndikator er nu valgfri
- MFHaeftelseStruktur.xsd: HaeftelseForligIndikator, HaeftelseFormKode og HaeftelseStartDato er nu valgfri
- AlternativKontaktReferenceTypeKode: tilføjet enum-værdien "AdresseloesPersonMedCPR"
- Mapningsarket indeholder nyt underark som dokumenterer mapning af enumerations mellem SKAT og OIO


Dvs. disse strukturer er ændret:
  MFHaeftelseStruktur.xsd
  MFAendrFordringStruktur.xsd
  MFAendrTransportStruktur.xsd
  MFOpretFordringStruktur.xsd
  RenteValgStruktur.xsd