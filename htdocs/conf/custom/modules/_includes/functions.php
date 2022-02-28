<?php
	function OsIs($OS)
	{
		$tmp = php_uname();
		$tmp = strpos($tmp, $OS);
		if($tmp || $tmp === 0)
			return true;
		return false;
	}
	$osSlash='';
	if(OsIs('Linux'))
		$osSlash='/';
	else
		$osSlash='\\';
	$serverName = getenv ("SERVER_NAME");
	$serverAddr = getenv ("SERVER_ADDR");
	$serverPort = getenv ("SERVER_PORT");
	$hostName = getenv("HTTP_HOST");
	$dirname=dirname(__FILE__);
	$array = explode($osSlash,$dirname);
	$len = count($array);
	$folderName=$array[$len-2];
	$historyfolder='';
	//for($i=0; $i<$len-1; $i++)
	for($i=0; $i<$len-2; $i++)
	{
		$historyfolder.=$array[$i].'/';
	}
	function resPaginator($start,$length,$size,$s=NULL,$name)
	{
		$str='';
		$action='';
		$N1=ceil($size/$length);
		$N2=ceil($N1/10);
		$N3=ceil(($start+1)/$length);
		$N4=ceil($N3/10);
		$i1=($N4-1)*10+1;
		$N5=$N4*10;
		$i2;
		if($N1>$N5)
			$i2=$N4*10;
		else
			$i2=$N1;
		switch ($name)
		{
			case '0': $action.='See(null,null,null,';
			break;
			case '1': $action.='nextFh(';
			break;
			case '2': $action.='showOrderList(';
			break;
			case '3': $action.='showAllLists(';
			break;
			case '4': $action.='nextFp(';
			break;
			case '5': $action.='searchNewsSite(null,null,null,';
			break;
			case '6': $action.='searchPhoto(null,null,null,null,';
			break;
			case '7': $action.='searchNewRecs(null,null,';
			break;
			case '8': $action.='showAllCollectionsNew(null,';
			break;
			case '9': $action.='seeAddStatP(';
			break;
			case '10': $action.='seeAddStatDigit(';
			break;
			case '11': $action.='seeAddStatDigitMy(';
			break;
			case '12': $action.='seeAddStatInd(';
			break;
			case '13': $action.='searchPubTheme(null,null,';
			break;
			case '14': $action.='nextEvents(this,';
			break;
			default: $action.='nextSearch(';
			break;
		}
		if($i1 > 1)
		{
			$str.='<a title="в начало" class="new3" href="javascript: '.$action.'1';
			if(!is_null($s))
				$str.=','.$s;
			$str.=')"> </a>';
		}
		if($N4 > 1)
		{
			$str.='<a class="new1" href="javascript: '.$action.''.($N4-2).'*10 + 1';
			if(!is_null($s))
				$str.=','.$s;
			$str.=')"> </a>';
		}
		for(;$i1<=$i2; $i1++)
		{
			if($i1==$N3)
			{
				$str.='<span class="now">'.$i1.'</span>';
			}
			else
			{
				$str.='<a class="new" href="javascript:  '.$action.''.$i1;
				if(!is_null($s))
					$str.=','.$s;
				$str.=')">'.$i1.'</a>';
			}
		}
		if($N2 > $N4)
		{
			$str.='<a class="new2" href="javascript:  '.$action.''.$N4.'*10 + 1';
			if(!is_null($s))
				$str.=','.$s;
			$str.=')"> </a>';
			$str.='<a title="в конец" class="new4" href="javascript:  '.$action.''.$N1;
			if(!is_null($s))
				$str.=','.$s;
			$str.=')"> </a>';
		}
		return $str;
	}
	function prepareISBN($str)
	{
		//$from = array("978", "979", " ", "-");
		//$from = array(" ", "-");
		//return str_replace($from, "", $str);
		return $str;
	}
	function bookinfo($str)
	{
		$newstr = str_replace("\u0026", "&", $str);
		return json_decode($newstr);
	}
	function beginsWith($tmp, $strval)
	{
		return (substr($strval, 0, strlen($tmp))==$tmp);
	}
	function prepareJson($str)
	{
		$str = preg_replace('/[\x00-\x1F\x7F]/u', '', $str); 
		$from = array("[%]", "[amp]", "\'", "\t");
		$to = array("%", "&", "\\\'", "&#09;");
		$newstr = str_replace($from, $to, $str);
		//echo "\n"."\n".$str."\n"."\n".$newstr."\n"."\n";
		return json_decode($newstr);
	}
	function deleteSymb($str)
	{
		$from = array("\"", "\'", "\\");
		$to = array("", "", "");
		$newstr = str_replace($from, $to, $str);
		return $newstr;
	}
	function parseBB($str)
	{
		$from = array("[anchT]","[anchor]","[/link]","[linkT]","[link]","[code class=AF]","[/code]","[space] [/space]","[/LINK]","[LINK]","[/HINT]","[HINT]","[/a]","[uriT]","[uri]","[span]","[/span]","[i class=AU]","[i class=SH]","[i class=KW]","[i class=GC]","[quote]", "[/quote]","[b]", "[/b]","[em]", "[/em]", "[u]", "[/u]", "[br]", "[br/]", "[hr]", "[hr/]", "[div]", "[/div]", "[p]", "[/p]", "[ul]", "[/ul]", "[ol]", "[/ol]", "[li]", "[/li]", "[size=18]", "[size=20]", "[/size]", "[i]", "[/i]", "[indent]", "[/indent]", "[divshotformicons]", "[/divshotformicons]", "[IMG]","[/IMG]");
		$to = array("\">","<span id=\"anch_","</span>","')\">","<span onmousedown=\"goToElement('anch_","<span class=\"AF\" title=\"см. в Авторитетном файле\" onmousedown=\"showLable(this)\"><input type=\"hidden\" value=\"","\"/></span>","; ","</sup>","<sup>",")","(","</span>","')\">","<span onmousedown=\"window.open('","<span>","</span>","<span title=\"Найти еще записи этого автора\" class=\"AU\" onmousedown=\"showLable(this)\">","<span class=\"SH\" onmousedown=\"showLable(this)\">","<span class=\"KW\" onmousedown=\"showLable(this)\">","<span class=\"GC\" onmousedown=\"showLable(this)\">","<blockquote>", "</blockquote>","<b>", "</b>","<em>", "</em>", "<u>", "</u>", "<br/>", "<br/>", "<hr/>", "<hr/>", "<div>", "</div>", "<p>", "</p>", "<ul class=\"bbc\">", "</ul>", "<ol>", "</ol>", "<li>", "</li>", "<span class=\"size18\">", "<span class=\"size20\">", "</span>", "<span class=\"i\">", "</span>", "<span class=\"indent\">", "</span>", "<span style=\"display:none\">", "</span>", "<img src=\"", "\" class=\"imgadd\"/>");
		$newstr = str_replace($from, $to, $str);
		return $newstr;
	}
	function backlight($from, $str)
	{
		$t = explode(" ", $from);
		$t =array_unique($t);
		//var_dump($t);
		preg_match_all('/<[^>]*>/', $str, $tags);
        $tags=array_unique($tags);
        $tagList = array();
        $num = 0;
        foreach($tags[0] as $val)
        {
            $tagList[++$num] = $val;
            $str = str_replace($val, '<'.$num.'>',$str);
        }
		//foreach($t as $i)
		//	if(!is_numeric($i))
		//		$str = preg_replace('#[\w]*'.$i.'[\w]*#iu', '<em>$0</em>', $str);
		//foreach($t as $i)
		//	if(!is_numeric($i))
		//		$str = preg_replace('#'.$i.'[\w]*#iu', '<em>$0</em>', $str);
		foreach($t as $i)
			if(!is_numeric($i))
				$str = preg_replace('#'.$i.'[\p{L}]{1,2}#iu', '<em>$0</em>', $str);
		foreach($tagList as $num => $value)
            $str = str_replace('<' . $num . '>', $value, $str);
		return $str;
	}
	function printResponseVars($str,$rn)
	{
		$newstr = "\n".'<script>'."\n";
		foreach ($str as $a => $v)
		{
			$r = strpos($a, 'result_'); 
			if($r === false)
			{
				if(is_string($v))
				{
					if(beginsWith('_',$a))
					{
						$newstr .= 'var '.$a.'="'.addslashes($v).'";'."\n";
						$f = strpos($a, '_flag45');
						if($f !== false)
							$GLOBALS['flag45']=1;
					}
				}
				$i = strpos($a, 'iddb_'); 
				if($i !== false)
				{
					if(isset($v->title))
						$rn.=$v->title;
				}
			}
		}
		$newstr .= '</script>'."\n";
		return array($newstr,$rn);
	}
	function writeSingleRubricator($tnode,$level,$fname)
	{
		if(($level!=1)&&($tnode->nodeName!='rubricator')&&($tnode->hasChildNodes()))
		{
			echo '<ul';
			if($level > 2)
				echo ' class="dn"';
			echo '>';
		}
		for($i=0; $i<$tnode->childNodes->length; $i++)
		{ 
			$new_node = $tnode->childNodes->item($i);
			$cls='list';
			$tit='';
			if($new_node->hasChildNodes())
			{
				$cls='folder';
				$tit=' title="Развернуть" onmousedown="disPlayBranch(this)"';
			}
			if($new_node->getAttribute('title'))
			{
				echo '<li class="'.$cls.'" data-level="'.$level.'"><span'.$tit.'></span><a title="Искать" id="rub_'.$new_node->getAttribute('count').'" class="decolorize" href="javascript:void(0)" onmousedown="colorize(this)">'.$new_node->getAttribute('title').'</a><input type="hidden" name="lr" value="'.$new_node->getAttribute('value').'"/>';
				if($cls=='list')
					echo '</li>';
				else
				{
					if($level == 1)
						echo '<i></i>';
				}
			}
			writeSingleRubricator($new_node, $level+1, $fname);
		}
		if(($level!=1)&&($tnode->nodeName!='rubricator')&&($tnode->hasChildNodes()))
			echo '</li></ul>';
	}
	function showTree($tnode,$level,$fname)
	{
		if(($level!=1)&&($tnode->nodeName!='rubricator')&&($tnode->hasChildNodes()))
			echo '<div style="display:none">';
		for($i=0; $i<$tnode->childNodes->length; $i++)
		{ 
			$new_node = $tnode->childNodes->item($i);
			$cls='list';
			$tit='';
			if($new_node->hasChildNodes())
			{
				$cls='folder';
				$tit=' title="Развернуть" onmousedown="disPlay(this)"';
			}
			if($new_node->getAttribute('title'))
			{
				echo '<div class="'.$cls.'" style="margin-left:'.$level.'px"><span'.$tit.'><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="19" height="9"/></span><a id="rub_'.$new_node->getAttribute('count').'" class="decolorize" href="javascript:void(0)" onmousedown="colorize(this)">'.$new_node->getAttribute('title').'</a><input type="hidden" name="lr" value="'.$new_node->getAttribute('value').'"/></div>';
			}
			showTree($new_node, $level+3, $fname);
		}
		if(($level!=1)&&($tnode->nodeName!='rubricator')&&($tnode->hasChildNodes()))
			echo '</div>';
	}
	function copyFile($to,$from)
	{
		if(file_exists($to))
		{
			if(!@copy($to, $from))
				die('</head><body><form id="frm"><img width="700" height="500" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/></form><script> var obj={_message_0: ["Не удалось скопировать файл '.$from.'!"],_action_1: [" "]};  WriteError(obj,"back")</script></body></html>');
		}
	}
	function createDirectory($directorypath)
	{
		if(!is_dir($directorypath)) 
		{
			if(!@mkdir($directorypath))
			{
				die(' </head><body><form id="frm"><img width="700" height="500" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/></form><script> var obj={_message_0: ["Не удалось создать  директорию '.$directorypath.'!"],_action_1: [" "]};  WriteError(obj,"back")</script></body></html>');
			}
		}
	}
	function writeFile($filepath,$str)
	{
		if(!$file = fopen($filepath,'w+'))
		{
			die('var obj={_message_0: ["Ошибка открытия файла '.$filepath.'"],_action_1: [" "]};');
		}
		else
		{
			fputs($file, $str) || die('var obj={_message_0: ["Не удалось записать данные в файл '.$filepath.'"],_action_1: [" "]};');
			fclose ($file);
		}
	}
	function my_mb_ucfirst($str)
	{
		$fc = mb_strtoupper(mb_substr($str, 0, 1, 'UTF-8'), 'UTF-8');
		return $fc.mb_substr($str, 1, mb_strlen($str, 'UTF-8'), 'UTF-8');
	}
?>