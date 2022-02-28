<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="utf-8" indent="no"/>
<xsl:strip-space elements="*"/>
<!--шаблон карточки -->
<xsl:template match="/">
<html>
<head>
<title>BIBPRINT</title>
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<style type="text/css">
body
{
	margin:0;
	padding:0;
	overflow:hidden;
}
#cont
{
	position:relative;
	width:100%;
	height:100%;
}
</style>
</head>
<body onload="parent.reSize(document.body.scrollHeight)">
<div id="cont">
<xsl:for-each select="//BIBCARD/entry">
<xsl:variable name="pos"><xsl:number/></xsl:variable>
<xsl:if test="$pos='1'">
<xsl:variable name="length"><xsl:value-of select="@font div 4.7"/></xsl:variable>
<style type="text/css">
.bibcard_bar {width: <xsl:value-of select="bar/@width*$length"/>mm; float: left; overflow: hidden;}
.bibcard_field {width: <xsl:value-of select="115-(bar/@width*$length)"/>mm; float: right; overflow: hidden}
.bibcard span {display:block;font: <xsl:value-of select="@font"/>pt monospace; margin: 0px; padding: 0px; overflow-x: hidden; white-space: nowrap;}
</style>
</xsl:if>

<xsl:if test="field/area">

<div class="bibcard">
<!--
	<xsl:if test="@seeNext">
		<span class="bibcard_number"><xsl:value-of select="$pos"/></span>
	</xsl:if>
 -->
	<xsl:if test="top">
		<div class="bibcard_top"><xsl:apply-templates select="top//s"/></div>
	</xsl:if>
	<xsl:if test="bar|field">
		<xsl:call-template name="cont"/>
	</xsl:if>
	<xsl:if test="bottom">
		<div class="bibcard_bottom"><xsl:apply-templates select="bottom//s"/></div>
	</xsl:if>
<!--
	<xsl:apply-templates select="@seeNext"/>
 -->
</div>

</xsl:if>

</xsl:for-each>
</div>
</body>
</html>
</xsl:template>
<!--конец шаблона карточки, начало отдельных шаблонов -->

<!-- порядковый номер карточки -->
<xsl:template name="number">
	<span class="bibcard_number"><xsl:value-of select="position()"/></span>
</xsl:template>
<!-- конец порядковый номер карточки -->

<!-- смотри следующую карточку -->
<xsl:template match="@seeNext">
	<xsl:if test=".='true'"><span class="bibcard_next">См. след. карт.</span></xsl:if>
</xsl:template>
<!-- конец смотри следующую карточку -->

<!-- лево/право -->
<xsl:template name="cont">
<xsl:if test="bar[area] and field">
	<div class="bibcard_bar">
		<xsl:apply-templates select="bar//s"/>
	</div>
	<div class="bibcard_field">
		<xsl:apply-templates select="field//s"/>
	</div>
</xsl:if>
<xsl:if test="bar[area] and not(field)">
	<div class="bibcard_bar1">
		<xsl:apply-templates select="bar//s"/>
	</div>
</xsl:if>
<xsl:if test="field[area] and not(bar)">
	<div class="bibcard_field1">
		<xsl:apply-templates select="field//s"/>
	</div>
</xsl:if>
<xsl:if test="field[not(area)] and not(bar)"/>
<xsl:if test="bar[not(area)] and field[not(area)]" />
<xsl:if test="field[area] and bar[not(area)]">
<div class="bibcard_bar">
</div>
<div class="bibcard_field">
	<xsl:apply-templates select="field//s"/>
</div>
</xsl:if>
</xsl:template>
<!-- конец лево/право -->

<!-- шаблон строки -->
<xsl:template match="s">
<xsl:for-each select="entry">
<xsl:choose>
	<xsl:when test="../../@font and ../../@hAlign">
		<xsl:choose>
			<xsl:when test="@tab and @hr">
				<span style='text-align: {../../@hAlign}; text-decoration: {@hr}; font: {../../@font} {//entry[@type]/@font}pt monospace'>
					<xsl:call-template name="spaces"> 
						<xsl:with-param name="count" select="@tab"/> 
					</xsl:call-template><xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:when test="@tab and not(@hr)">
				<span style='text-align: {../../@hAlign}; font: {../../@font} {//entry[@type]/@font}pt monospace'>
					<xsl:call-template name="spaces"> 
						<xsl:with-param name="count" select="@tab"/> 
					</xsl:call-template><xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:when test="not(@tab) and @hr">
				<span style='text-align: {../../@hAlign}; text-decoration: {@hr}; font: {../../@font} {//entry[@type]/@font}pt monospace'>
					<xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:otherwise>
				<span style='text-align: {../../@hAlign}; font: {../../@font} {//entry[@type]/@font}pt monospace'>
					<xsl:value-of select="@val"/>
				</span>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:when>
	<xsl:when test="../../@font and not(../../@hAlign)">
		<xsl:choose>
			<xsl:when test="@tab and @hr">
				<span style='text-decoration: {@hr}; font: {../../@font} {//entry[@type]/@font}pt monospace'>
					<xsl:call-template name="spaces"> 
						<xsl:with-param name="count" select="@tab"/> 
					</xsl:call-template><xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:when test="@tab and not(@hr)">
				<span style='font: {../../@font} {//entry[@type]/@font}pt monospace'>
					<xsl:call-template name="spaces"> 
						<xsl:with-param name="count" select="@tab"/> 
					</xsl:call-template><xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:when test="not(@tab) and @hr">
				<span style='text-decoration: {@hr}; font: {../../@font} {//entry[@type]/@font}pt monospace'>
					<xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:otherwise>
				<span style='font: {../../@font} {//entry[@type]/@font}pt monospace'>
					<xsl:value-of select="@val"/>
				</span>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:when>
	<xsl:when test="not(../../@font) and ../../@hAlign">
		<xsl:choose>
			<xsl:when test="@tab and @hr">
				<span style='text-align: {../../@hAlign}; text-decoration: {@hr}'>
					<xsl:call-template name="spaces"> 
						<xsl:with-param name="count" select="@tab"/> 
					</xsl:call-template><xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:when test="@tab and not(@hr)">
				<span style='text-align: {../../@hAlign}'>
					<xsl:call-template name="spaces"> 
						<xsl:with-param name="count" select="@tab"/> 
					</xsl:call-template><xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:when test="not(@tab) and @hr">
				<span style='text-align: {../../@hAlign}; text-decoration: {@hr}'>
					<xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:otherwise>
				<span style='text-align: {../../@hAlign}'>
					<xsl:value-of select="@val"/>
				</span>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:when>
	<xsl:otherwise>
		<xsl:choose>
			<xsl:when test="@tab and @hr">
				<span style='text-decoration: {@hr}'>
					<xsl:call-template name="spaces"> 
						<xsl:with-param name="count" select="@tab"/> 
					</xsl:call-template><xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:when test="@tab and not(@hr)">
				<span>
					<xsl:call-template name="spaces"> 
						<xsl:with-param name="count" select="@tab"/> 
					</xsl:call-template><xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:when test="not(@tab) and @hr">
				<span style='text-decoration: {@hr}'>
					<xsl:value-of select="@val"/>
				</span>
			</xsl:when>
			<xsl:otherwise>
				<span>
					<xsl:value-of select="@val"/>
				</span>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:otherwise>
</xsl:choose>
</xsl:for-each>
</xsl:template>
<!-- конец шаблона строки -->

<!-- шаблон простановки пробелов -->
<xsl:template name="spaces"> 
<xsl:param name="count"/> 
<xsl:if test="$count>0"> 
<xsl:text>&#160;</xsl:text> 
<xsl:call-template name="spaces"> 
<xsl:with-param name="count" select="number($count)-1"/> 
</xsl:call-template> 
</xsl:if> 
</xsl:template>
<!-- конец отдельных шаблонов -->
</xsl:stylesheet>