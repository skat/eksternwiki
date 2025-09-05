<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:fase2.1="http://skat.dk/begrebsmodel/2009/01/15/" xmlns:n1="http://www.altova.com/samplexml/other-namespace" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

	<xsl:output method="xml" indent="yes" omit-xml-declaration="no" encoding="UTF-8" media-type="text"/>

	<xsl:template match="/">
		<xsl:apply-templates/>
	</xsl:template>

	<xsl:template match="fase2.1:SagOpret_O">
		<xsl:element name="fase2.1:RemedySagOpret_O">
			<xsl:apply-templates/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="fase2.1:RemedySagOpret_I">
		<xsl:element name="fase2.1:SagOpret_I">
			<xsl:apply-templates/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="fase2.1:Sag">
		<xsl:element name="fase2.1:Sag">
			<xsl:element name="fase2.1:SagOplysninger">
				<xsl:element name="fase2.1:SagProfilValg">
					<xsl:apply-templates select="fase2.1:SagProfilOplysninger"/>
				</xsl:element>
				<xsl:apply-templates select="fase2.1:SagTitel"/>
				<xsl:apply-templates select="fase2.1:SagBemærkning"/>
				<xsl:apply-templates select="fase2.1:SagPlanlagtAfslutningDato"/>
				<xsl:apply-templates select="fase2.1:SagTidFacet"/>
				<xsl:apply-templates select="fase2.1:SagDiverseFacet"/>
				<xsl:element name="fase2.1:SagPartListe">
					<xsl:apply-templates select="fase2.1:SagPart"/>
				</xsl:element>
				<xsl:element name="fase2.1:SagEmneordListe"/>
				<xsl:element name="fase2.1:SagErindringListe"/>
				<xsl:element name="fase2.1:SagFriDatoListe"/>
				<xsl:element name="fase2.1:SagFriOplysningListe">
					<xsl:apply-templates select="fase2.1:SagFriOplysning"/>
				</xsl:element>
				<xsl:element name="fase2.1:SagRelationListe"/>
			</xsl:element>
		</xsl:element>
	</xsl:template>

	<xsl:template match="fase2.1:SagPart">
		<xsl:call-template name="echo">
			<xsl:with-param name="content">
				<xsl:apply-templates select="fase2.1:PartRolleBetegnelse"/>
				<xsl:element name="fase2.1:SagPartIDValg">
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
							<xsl:message>An identifier is seriously missing in SagPart</xsl:message>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:element>
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
