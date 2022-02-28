<?php
/*$inifile=file('/opt/opac-global/web/newlib/cgi-bin/newlib/rcp.ini');*/
$inifile=file('D:/opac-global.trunk/web/newlib/cgi-bin/newlib/rcp.ini');
$inisize = count($inifile);
$eba_receiver="";
$eba_kpp="";
$eba_inn="";
$eba_oktmo="";
$eba_account="";
$eba_bank="";
$eba_bik="";
$eba_corr_account="";
$eba_kbk="";
$eba_payment="";
$price="2500";
$readerdata=$readermail;
if(isset($readercode))
{
	if($readercode != "")
		$readerdata=$readercode;
}
for ($j=0; $j<$inisize; $j++)
{
	$iniarr=explode('=', $inifile[$j]);
	if(strpos($inifile[$j], 'eba_receiver')!==false)
	{
		$eba_receiver=trim($iniarr[1]);
	}
	if(strpos($inifile[$j], 'eba_kpp')!==false)
	{
		$eba_kpp=trim($iniarr[1]);
	}
	if(strpos($inifile[$j], 'eba_inn')!==false)
	{
		$eba_inn=trim($iniarr[1]);
	}
	if(strpos($inifile[$j], 'eba_oktmo')!==false)
	{
		$eba_oktmo=trim($iniarr[1]);
	}
	if(strpos($inifile[$j], 'eba_account')!==false)
	{
		$eba_account=trim($iniarr[1]);
	}
	if(strpos($inifile[$j], 'eba_bank')!==false)
	{
		$eba_bank=trim($iniarr[1]);
	}
	if(strpos($inifile[$j], 'eba_bik')!==false)
	{
		$eba_bik=trim($iniarr[1]);
	}
	if(strpos($inifile[$j], 'eba_corr_account')!==false)
	{
		$eba_corr_account=trim($iniarr[1]);
	}
	if(strpos($inifile[$j], 'eba_kbk')!==false)
	{
		$eba_kbk=trim($iniarr[1]);
	}
	if(strpos($inifile[$j], 'eba_payment')!==false)
	{
		$eba_payment=trim($iniarr[1]);
	}
}
$filetext= <<<HTML
<html>
<head>
<title>Извещение</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<table style="width:182mm; height:142mm; border:solid 1pt black;" cellpadding="0" cellspacing="0"><tbody><tr><td class="lefttd" style="vertical-align:top; width:50mm; height:71mm; text-align:center; font: bold 10pt/16pt Times, serif !important; border-bottom:#000000 1px solid; border-right:#000000 1px solid;">Извещение</td><td style="font: normal 9pt/9pt Times, serif; vertical-align:top; border-bottom:#000000 1px solid;"><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Получатель:&#160;</b><div style="width:103mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_receiver</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">КПП:&#160;</b><div style="width:30mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_kpp</div><b style="float:left;">&#160;&#160;ИНН:&#160;</b><div style="width:30mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_inn</div></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">ОКТМО:&#160;</b><div style="width:30mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_oktmo</div><b style="float:left;">&#160;&#160;P/сч.:&#160;</b><div style="width:50mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_account</div></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">в:&#160;</b><div style="width:120mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_bank</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">БИК:&#160;</b><div style="width:30mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_bik</div><b style="float:left;">&#160;&#160;К/сч.:&#160;</b><div style="width:50mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_corr_account</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Код бюджетной классификации (КБК):&#160;</b><div style="width:50mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_kbk</div></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Платеж:&#160;</b><div style="width:110mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_payment $readerdata</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Плательщик:&#160;</b><div style="width:101.5mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">&#160;</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Адрес плательщика:&#160;</b><div style="width:90mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">&#160;</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">ИНН плательщика:&#160;</b><div style="width:26mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">&#160;</div><b style="float:left;">&#160;&#160;№ л/сч. плательщика:&#160;</b><div style="width:27mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">&#160;</div></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Сумма:&#160;</b><div style="width:20mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$price</div><b style="float:left;">&#160;руб.&#160;&#160;</b><div style="width:10mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">00</div><b style="float:left;">&#160;коп.</b><br clear="all"/><br clear="all"/><br clear="all"/><span style="float:left;">Подпись:&#160;________________________&#160;&#160;Дата:&#160;" ___ "&#160;__________&#160;&#160;20___ г.</span><br clear="all"/><br clear="all"/></li></td></tr><tr><td class="lefttd" style="vertical-align:top; width:50mm; height:71mm; text-align:center; font: bold 10pt/16pt Times, serif !important; border-right:#000000 1px solid;">Квитанция</td><td style="font: normal 9pt/9pt Times, serif; vertical-align:top;"><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Получатель:&#160;</b><div style="width:103mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_receiver</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">КПП:&#160;</b><div style="width:30mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_kpp</div><b style="float:left;">&#160;&#160;ИНН:&#160;</b><div style="width:30mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_inn</div></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">ОКТМО:&#160;</b><div style="width:30mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_oktmo</div><b style="float:left;">&#160;&#160;P/сч.:&#160;</b><div style="width:50mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_account</div></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">в:&#160;</b><div style="width:120mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_bank</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">БИК:&#160;</b><div style="width:30mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_bik</div><b style="float:left;">&#160;&#160;К/сч.:&#160;</b><div style="width:50mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_corr_account</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Код бюджетной классификации (КБК):&#160;</b><div style="width:50mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_kbk</div></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Платеж:&#160;</b><div style="width:110mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$eba_payment $readerdata</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Плательщик:&#160;</b><div style="width:101.5mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">&#160;</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Адрес плательщика:&#160;</b><div style="width:90mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">&#160;</div><br clear="all"/></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">ИНН плательщика:&#160;</b><div style="width:26mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">&#160;</div><b style="float:left;">&#160;&#160;№ л/сч. плательщика:&#160;</b><div style="width:27mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">&#160;</div></li><li style="list-style-type: none; padding: 6px 0px 0px 5px; clear:both;"><b style="float:left;">Сумма:&#160;</b><div style="width:20mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">$price</div><b style="float:left;">&#160;руб.&#160;&#160;</b><div style="width:10mm; font: normal 11pt/9pt Times, serif !important; border-bottom:solid 1px black; text-align:center; float:left;">00</div><b style="float:left;">&#160;коп.</b><br clear="all"/><br clear="all"/><br clear="all"/><span style="float:left;">Подпись:&#160;________________________&#160;&#160;Дата:&#160;" ___ "&#160;__________&#160;&#160;20___ г.</span><br clear="all"/><br clear="all"/></li></td></tr></tbody></table>
</body>
</html>



HTML;

?>