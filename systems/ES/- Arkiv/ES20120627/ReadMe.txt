Anders: Rettelser udf�rt pga f�lgende mail fra CSC, 20. juni 2012 09:16

**********************************************************************

I forbindelse med testen har jeg desv�rre fundet fejl i skemaerne til de to 2 webservice VirksomhedAktieklasseHistorikHent og VirksomhedHistorikHent 

VirksomhedAktieklasseHistorikHent 
Elementet AktieKapital�ndreKode skal v�re optionelt, det er ikke altid kr�vet 

VirksomhedHistorikHent 
Elementet VirksomhedOph�rDato skal v�re optionelt, det er ikke altid kr�vet
