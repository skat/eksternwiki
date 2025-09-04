Ændringer i leverance 20110831:
- Tilføjet bemærkning i servicebeskrivelserne om brug af DateInterval i MFFordringIndberet og MFUnderretSamlingHent (de to andre bruger ikke perioder)
  Bemærkningen går på at kun start og slutdatoen anvendes.
- ModtagFordringAktionStatusAendretDato har ændret type fra date til dateTime, hvilket påvirker MFFordringIndberet og MFKvitteringHent
- RenteValgStruktur er ændret væsentligt
- RenteSats (OIO-navn RenteSatsProcent)mappes ikke længere, hvilket (kun) påvirker RenteValgStruktur og dermed MFFordringIndberet
- DMIFordringModtagelseDato (OIO-navn FordringModtagelseDatoTid) mappes ikke længere
- Tilføjet bemærkning omkring manglende underliggende funktionalitet i beskrivelsen af MFHæftelseStruktur
- HæftelseUnderBobehandling (OIO-navn HaeftelseUnderBobehandlingIndikator) mappes ikke længere

Andre bemærkninger:
- Hvis der med DateInterval angives en åben periode, selvom forretningsservicen kræver en lukket periode, bør det udløse en fejl
  Hvis slutdato sættes lig startdato angiver det en åben periode, dvs. en periode unden en reel slutdato
