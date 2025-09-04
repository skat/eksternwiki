�ndringer i leverance 20110831:
- Tilf�jet bem�rkning i servicebeskrivelserne om brug af DateInterval i MFFordringIndberet og MFUnderretSamlingHent (de to andre bruger ikke perioder)
  Bem�rkningen g�r p� at kun start og slutdatoen anvendes.
- ModtagFordringAktionStatusAendretDato har �ndret type fra date til dateTime, hvilket p�virker MFFordringIndberet og MFKvitteringHent
- RenteValgStruktur er �ndret v�sentligt
- RenteSats (OIO-navn RenteSatsProcent)mappes ikke l�ngere, hvilket (kun) p�virker RenteValgStruktur og dermed MFFordringIndberet
- DMIFordringModtagelseDato (OIO-navn FordringModtagelseDatoTid) mappes ikke l�ngere
- Tilf�jet bem�rkning omkring manglende underliggende funktionalitet i beskrivelsen af MFH�ftelseStruktur
- H�ftelseUnderBobehandling (OIO-navn HaeftelseUnderBobehandlingIndikator) mappes ikke l�ngere

Andre bem�rkninger:
- Hvis der med DateInterval angives en �ben periode, selvom forretningsservicen kr�ver en lukket periode, b�r det udl�se en fejl
  Hvis slutdato s�ttes lig startdato angiver det en �ben periode, dvs. en periode unden en reel slutdato
