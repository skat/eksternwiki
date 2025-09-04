�ndringer i leverance 20111101:
- Nyt element OplysningDatoTid indg�r i MFHaeftelseStruktur.xsd, 
  MFAendrFordringStruktur.xsd, MFAendrTransportStruktur.xsd. 
  Det er et l�sningstimestamp, som bruges ifm. optimistisk l�sning
- RenteSatsProcent tilf�jet til RenteValgStruktur og dermed MFFordringIndberet
- Vigtig bem�rkning i servicebeskrivelsen for MFFordringIndberet omkring 
  begr�nset underst�ttelse af koder i CivilstandSamlivsforholdKode som 
  benyttes af MFHaeftelseStruktur.xsd
- MFOpretFordringStruktur.xsd: ModtagFordringPaaklagetIndikator er nu valgfri
- MFHaeftelseStruktur.xsd: HaeftelseForligIndikator, HaeftelseFormKode og HaeftelseStartDato er nu valgfri
- AlternativKontaktReferenceTypeKode: tilf�jet enum-v�rdien "AdresseloesPersonMedCPR"
- Mapningsarket indeholder nyt underark som dokumenterer mapning af enumerations mellem SKAT og OIO


Dvs. disse strukturer er �ndret:
  MFHaeftelseStruktur.xsd
  MFAendrFordringStruktur.xsd
  MFAendrTransportStruktur.xsd
  MFOpretFordringStruktur.xsd
  RenteValgStruktur.xsd