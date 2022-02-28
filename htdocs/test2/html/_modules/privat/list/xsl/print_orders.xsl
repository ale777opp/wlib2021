<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="utf-8" indent="no"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
<head>
<title>OPAC-Global</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta http-equiv="cache-control" content="no-cache"/>
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<style type="text/css">
body {background: #fff; margin: 0px; padding: 0px;}
.body{height:<xsl:value-of select="//height"/>px; overflow:auto}
#orders div {width: 80mm; margin: 1mm; padding: 0mm 0mm 5mm 0mm; font-family: Tahoma, Helvetica, Sans-Serif; font-size: 8pt;}
.fu {text-align: center; font-size: 8pt; border-bottom: solid 1px black; margin: 0mm 0mm 5mm 0mm; padding: 0mm;}
.titl {font-weight: bold; font-size: 10pt;}
.ao {margin: 0mm; padding: 0mm; border-bottom: solid 1px black;}
.au {margin: 0mm; padding: 0mm;}
.ti {margin: 0mm; padding: 0mm; text-align: center;}
.o {text-align: center; margin: 0mm; padding: 0mm;}
.und {text-decoration: underline; margin: 0mm; padding: 0mm; font-size: 10pt;}
.divider {border-bottom: dashed 1px silver; margin: 5mm 0mm 5mm 0mm; padding: 0mm;}
.sign {text-align: center; margin: 0mm; padding: 0mm;}
.sign1 {text-align: left; margin: 0mm; padding: 0mm;}
.sign2 {font-size: 10pt; text-align: left; margin: 5mm 0mm 5mm 0mm; padding: 0mm;border-bottom: dashed 1px black;}
.barcode {width: 80mm; height: 27px; overflow: hidden; margin: 5mm 0mm 5mm 0mm; padding: 0mm;}
table {width: 80mm; border: 0px; font-size: 10pt;}
td {border: solid 1px black; border-collapse: collapse;}
table.c {text-align: center}
table.n {border: 0px;}
table.n td {border: 0px;}
</style>
<style type="text/css" media="print">
#orders {display: block;height:auto !important}
.body {height:auto !important}
.order {page-break-after: always !important;}
</style>
<script>
function printOrder()
{
	self.focus();
	self.print();
}
</script>
</head>
<body onload="printOrder()">
<div class="body">
<div id="orders">
<xsl:for-each select="//result/entry">
<xsl:variable name="ind" select="generate-id()"/>
<div id="ind{$ind}"><xsl:if test="position()!=last()"><xsl:attribute name="class">order</xsl:attribute></xsl:if>
<xsl:apply-templates select="."/>
<table width="100%" class="c" cellspacing="0" cellpadding="0">
<tr><td >Нет<br />в биб-ке</td><td>Занято</td><td>В переплете</td><td>Нет<br/>на месте</td></tr><tr><td>&#160;</td><td>&#160;</td><td>&#160;</td><td>&#160;</td></tr>
</table>
<p class="divider">&#160;</p>
<!--<xsl:apply-templates select="."/>
<p class="sign2">Подп. раб.чит.зала </p>
<p class="sign2">Подп. читателя </p>-->
</div>
</xsl:for-each>
</div>
</div>
</body>
</html>
</xsl:template>

<xsl:template match="//result/entry">
<p class="fu"><xsl:call-template name="fu" /></p>
<p class="sign">(номер заказа)</p>
<table cellpadding="0" cellspacing="0">
<tr><td style="width: 45mm"><p class="und"><xsl:value-of select="//place"/></p><p class="sign1">(место выдачи заказа)</p></td><td><p class="und">ПЕРЕДАТЬ</p><p class="sign1">(тип заказа)</p></td></tr>
<tr><td colspan="2"></td></tr>
</table>
<p class="ao"><xsl:call-template name="ao" /></p>
<xsl:call-template name="document" />
<table class="n" cellpadding="0" cellspacing="0">
<tr><td style="width: 45mm"><p class="und"><xsl:value-of select="//time"/></p><p class="sign1">(время приема)</p></td><td style="width: 45mm"><p class="und"><xsl:value-of select="//date"/></p><p class="sign1">(дата)</p></td></tr>
</table>
</xsl:template>

<xsl:template name="fu">
	Код читателя: <span class="titl"><b><xsl:value-of select="//code"/></b></span>
	<!--№ читательского билета: <span class="titl"><b></b></span>-->
</xsl:template>

<xsl:template name="ao">
	ФИО читателя: <b><xsl:value-of select="//fio"/></b>
</xsl:template>

<xsl:template name="document">
<table cellpadding="0" cellspacing="0">
<tr><td colspan="2" style="width: 60mm"><p class="und"><b><xsl:value-of select="REQUEST/entry[1]"/></b></p><p class="sign1">(шифр)</p></td>
<td rowspan="2" style="width: 30mm"><p class="und"><xsl:value-of select="REQUEST/entry[4]"/></p><p class="sign1">(инв.номера)</p></td></tr>
<tr><td style="width: 30mm"><p class="und"><xsl:value-of select="REQUEST/entry[2]"/></p><p class="sign1">(авт.знак)</p></td><td style="width: 30mm"><p class="und"><xsl:value-of select="REQUEST/entry[3]"/></p><p class="sign1">(формат)</p></td></tr>
</table>
<p class="au"><u>Автор: </u><span class="titl"><b><xsl:value-of select="REQUEST/entry[5]"/></b></span></p>
<p class="ti"><span class="titl"><b><xsl:value-of select="REQUEST/entry[6]"/></b></span></p>
<p class="sign">(название книги, журнала)</p>
<table class="n" cellpadding="0" cellspacing="0">
<tr><td style="width: 45mm;vertical-align:top">Место и год издания <span class="und"><xsl:value-of select="REQUEST/entry[11]"/> <xsl:value-of select="REQUEST/entry[7]"/></span></td><td style="width: 45mm;vertical-align:top">Том, часть, выпуск <span class="und"><b><xsl:value-of select="REQUEST/entry[8]"/></b></span></td></tr>
<tr><td style="width: 45mm">Язык издания <span class="und"></span></td><td style="width: 45mm;vertical-align:top">стр. <span class="und"><xsl:value-of select="REQUEST/entry[10]"/></span></td></tr>
</table>
</xsl:template>
</xsl:stylesheet>

