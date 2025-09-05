<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:fase2.1="http://skat.dk/begrebsmodel/2009/01/15/" xmlns:n1="http://www.altova.com/samplexml/other-namespace" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

	<xsl:output method="xml" indent="yes" omit-xml-declaration="no" encoding="UTF-8" media-type="text"/>

	<xsl:template match="/">
		<xsl:apply-templates/>
	</xsl:template>


	<xsl:template match="fase2.1:DokumentMultiOpret_O">
		<xsl:element name="fase2.1:RemedyDokumentOpret_O">
			<xsl:apply-templates select="fase2.1:Kontekst"/>
			<xsl:apply-templates mode="response"/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="fase2.1:Sag" mode="response">
		<xsl:element name="{name()}">
			<xsl:apply-templates select="./fase2.1:SagNummer"/>
			<xsl:apply-templates select="./fase2.1:DokumentListe/fase2.1:Dokument" mode="response"/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="fase2.1:Dokument" mode="response">
		<xsl:element name="{name()}">
			<xsl:apply-templates select="fase2.1:SagAktNummer"/>
			<xsl:apply-templates select="fase2.1:DokumentNummer"/>
		</xsl:element>
	</xsl:template>



	<xsl:template match="fase2.1:RemedyDokumentOpret_I">
		<xsl:element name="fase2.1:DokumentMultiOpret_I">
			<xsl:apply-templates select="fase2.1:Kontekst"/>
			<xsl:apply-templates select="fase2.1:DokumentOplysninger"/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="fase2.1:DokumentOplysninger">
		<xsl:element name="fase2.1:DokumentListeOplysninger">
			<xsl:if test="string-length(./fase2.1:SagNummer)>0">
				<xsl:element name="fase2.1:SagIdentifikationValg">
					<xsl:element name="fase2.1:EnhedsagIdentifikation">
						<xsl:apply-templates select="fase2.1:SagNummer"/>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:element name="fase2.1:DokumentListe">
				<xsl:apply-templates select="fase2.1:Dokument"/>
			</xsl:element>
		</xsl:element>
	</xsl:template>

	<xsl:template match="fase2.1:Dokument">
		<xsl:call-template name="echo">
			<xsl:with-param name="content">
				<xsl:apply-templates select="fase2.1:DokumentProfilOplysninger"/>

				<xsl:element name="fase2.1:DokumentIndex">0</xsl:element>

				<xsl:apply-templates select="fase2.1:DokumentTitel"/>
				<xsl:apply-templates select="fase2.1:DokumentFilIndhold"/>
				<xsl:apply-templates select="fase2.1:DokumentFilType"/>
				<xsl:apply-templates select="fase2.1:DokumentFilEncoding"/>
				<xsl:apply-templates select="fase2.1:DokumentOprindelse"/>

				<xsl:element name="fase2.1:Aktering">0</xsl:element>

				<xsl:apply-templates select="fase2.1:DokumentBrevDato"/>
				<xsl:apply-templates select="fase2.1:ArkiveringFormKode"/>
				<xsl:apply-templates select="fase2.1:DokumentPostlisteTypeKode"/>
				<xsl:apply-templates select="fase2.1:OrganisatoriskEnhedNiveauEt"/>
				<xsl:apply-templates select="fase2.1:OrganisatoriskEnhedNiveauTo"/>
				<xsl:apply-templates select="fase2.1:OrganisatoriskEnhedNiveauTre"/>
				<xsl:apply-templates select="fase2.1:DokumentPart"/>

				<xsl:element name="fase2.1:DokumentHenvisningListe">
					<xsl:apply-templates select="fase2.1:DokumentHenvisning"/>
				</xsl:element>

				<xsl:element name="fase2.1:DokumentErindringListe"/>
				<xsl:element name="fase2.1:DokumentFriDatoListe"/>
				<xsl:element name="fase2.1:DokumentFriOplysningListe"/>
				<xsl:element name="fase2.1:DokumentEmneordListe"/>
			</xsl:with-param>
		</xsl:call-template>
	</xsl:template>

	<xsl:template match="fase2.1:DokumentProfilOplysninger">
		<xsl:element name="fase2.1:DokumentProfilValg">
			<xsl:copy-of select="."/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="fase2.1:DokumentPart">
		<xsl:element name="fase2.1:DokumentPartListe">
			<xsl:call-template name="echo">
				<xsl:with-param name="content">
					<xsl:apply-templates select="fase2.1:PartRolleBetegnelse"/>
					<xsl:element name="fase2.1:DokumentPartIDValg">
						<xsl:choose>
							<xsl:when test="string-length(./fase2.1:PersonCPRNummer)>0">
								<xsl:element name="fase2.1:CPRIdentifikation">
									<xsl:apply-templates select="fase2.1:PersonCPRNummer"/>
								</xsl:element>
							</xsl:when>
							<xsl:when test="string-length(./fase2.1:VirksomhedSENummer)>0">
								<xsl:element name="fase2.1:SEIdentifikation">
									<xsl:apply-templates select="fase2.1:VirksomhedSENummer"/>
								</xsl:element>
							</xsl:when>
							<xsl:when test="string-length(./fase2.1:VirksomhedCVRNummer)>0">
								<xsl:element name="fase2.1:CVRIdentifikation">
									<xsl:apply-templates select="fase2.1:VirksomhedCVRNummer"/>
								</xsl:element>
							</xsl:when>
							<xsl:otherwise>
								<xsl:message>An identifier is seriously missing in DokumentPart</xsl:message>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:element>
				</xsl:with-param>
			</xsl:call-template>
		</xsl:element>
	</xsl:template>

	<xsl:template match="fase2.1:DokumentHenvisning">
		<xsl:call-template name="echo">
			<xsl:with-param name="content">
				<xsl:element name="fase2.1:IdentifikationValg">
					<xsl:apply-templates select="fase2.1:DokumentNummer"/>
				</xsl:element>
				<xsl:apply-templates select="fase2.1:DokumentRolleBetegnelse"/>
			</xsl:with-param>
		</xsl:call-template>
	</xsl:template>

	<xsl:template match="text()">
		<xsl:value-of select="."/>
	</xsl:template>

	<xsl:template match="*">
		<xsl:element name="{name()}">
			<xsl:for-each select="@*">
				<xsl:attribute name="{name()}"><xsl:value-of select="."/></xsl:attribute>
			</xsl:for-each>
			<xsl:apply-templates/>
		</xsl:element>
	</xsl:template>

	<xsl:template name="echo">
		<xsl:param name="content"/>
		<xsl:element name="{name()}">
			<xsl:for-each select="@*">
				<xsl:attribute name="{name()}"><xsl:value-of select="."/></xsl:attribute>
			</xsl:for-each>
			<xsl:if test="$content">
				<xsl:copy-of select="$content"/>
			</xsl:if>
		</xsl:element>
	</xsl:template>

</xsl:stylesheet>
