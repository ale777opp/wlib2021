<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="utf-8"/>
	<xsl:template name="reason">
		<br/>
		<xsl:choose>
			<xsl:when test="reason">
				<xsl:if test="@srcFile">
					<xsl:value-of select="@srcFile" /> (<xsl:value-of select="@srcLine" />):
				</xsl:if>
				<xsl:for-each select="message/entry">
					<xsl:value-of select="."/><br/>
				</xsl:for-each>

				<xsl:for-each select="reason">
					<xsl:call-template name="reason"/>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<span class="last_reason">
					<xsl:if test="@srcFile">
						<xsl:value-of select="@srcFile" /> (<xsl:value-of select="@srcLine" />):
					</xsl:if>
					<xsl:for-each select="message/entry">
						<xsl:value-of select="."/><br/>
					</xsl:for-each>
				</span>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="/document/error">
		<html>
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
				<title>Ошибка</title>
				<meta http-equiv="cache-control" content="no-cache"/>
				<link rel="stylesheet" type="text/css" href="/opacg/html/common/css/common.css"/>
				<script type="text/javascript" src="/opacg/html/common/js/menu.js"></script>
				<script type="text/javascript">
					//<![CDATA[[
					function init()
					{
						if(top.windowManager)
						{
							var realOpener = top.windowManager.getWindowOpener(self.name);
							if (realOpener)
							{
								document.getElementById("close").style.display = "block";
							}
							else
							{
								document.getElementById("back").style.display = "block";
							}
							top.windowManager.setSize(self.name, "toolbox");
						}
						else
							document.getElementById("close").style.display = "block";
					}
					function back()
					{
						history.back();
					}
					//]]>
				</script>
				<style type="text/css">
					/*<![CDATA[[*/
					body, html
					{
						height:100%;
					}
					body
					{
						background-color:#FAFAF1;
						margin:0px;
						padding:0px;
						padding-top:15px;
						padding-bottom:15px;
						overflow:hidden;
					}
					#message
					{
						overflow:auto;
						margin:0px;
						padding:15px;
						padding-left:10px;
						padding-right:10px;
						background-color:#ffffff;
						text-align:left;
						height:60%;
						border-top-style:solid;
						border-bottom-style:solid;
						border-width:1px;
						border-color:inactivecaption;
					}
					#action
					{
						overflow:hidden;
						color:#0000aa;
						text-align:center;
						height:30%;
					}
					#type
					{
						overflow:hidden;
						text-align:center;
						color:#aa0000;
						font-size:150%;
						font-weight:bold;
						height:10%;
					}
					#close
					{
						display:none;
						text-align:center;
					}
					#back
					{
						display:none;
						text-align:center;
					}
					div
					{
						padding-left:10px;
						padding-right:10px;
					}
					.last_reason
					{
						font-weight:bold;
					}
					/*]]>*/
				</style>
			</head>
			<body onload="init()">
				<div id="type">
					<xsl:choose>
						<xsl:when test="@type = 'Unknown'">
							Ошибка<br/>
						</xsl:when>
						<xsl:when test="@type = 'CGI'">
							Ошибка CGI-интерфейса
						</xsl:when>
						<xsl:when test="@type = 'Init'">
							Ошибка инициализации cgi-приложения
						</xsl:when>
						<xsl:when test="@type = 'Query'">
							Ошибочно составленный запрос
						</xsl:when>
						<xsl:when test="@type = 'Network'">
							Ошибка работы сети
						</xsl:when>
						<xsl:when test="@type = 'Protocol'">
							Ошибка системного протокола
						</xsl:when>
						<xsl:when test="@type = 'Server'">
							Ошибка сервера
						</xsl:when>
						<xsl:when test="@type = 'Service'">
							Ошибка сервиса
						</xsl:when>
					</xsl:choose>
				</div>
				<div id="message">
					<xsl:if test="@srcFile">
						<xsl:value-of select="@srcFile" /> (<xsl:value-of select="@srcLine" />):
					</xsl:if>
					<!--xsl:copy-of select="message/*|message/text()"/-->
					<xsl:for-each select="message/entry">
						<xsl:value-of select="."/><br/>
					</xsl:for-each>
					<xsl:for-each select="reason">
						<xsl:call-template name="reason"/>
					</xsl:for-each>
				</div>
				<div id="action">
					<br/>
					<xsl:for-each select="action/entry">
						<xsl:value-of select="."/><br/>
					</xsl:for-each>
					<div id="close">
						<br/>
						<input type="button" value="Закрыть" onclick="close_window()"/> 
					</div>
					<div id="back">
						<br/>
						<input type="button" value="Назад" onclick="back()"/>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="/">
		<xsl:apply-templates/>
	</xsl:template>
</xsl:stylesheet>