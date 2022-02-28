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
	$BrokerId='localhost:18118';
	if(OsIs('Linux'))
	{
		$osSlash='/';
	}
	else
	{
		$osSlash='\\';
	}
	function copyRcp($to,$from)
	{
		$error="";
		if(is_dir($to)) 
		{
			 if(is_dir($from))
			 {
				if ($dh = opendir($from))
				{
					while (($jfile = readdir($dh)) !== false)
					{
						if((is_file($from.'/'.$jfile))&&(strpos($from.'/'.$jfile,'rcp.exe') !== false))
						{
							if(!@copy($from.'/'.$jfile, $to.'/'.$jfile))
								$error.=$jfile.' ';
						}
					}
					closedir($dh);
				}
			 }
		}
		if($error!="")
			die('</head><body><form id="frm"><img width="700" height="500" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/></form><script> var obj={_message_0: ["Не удалось скопировать файл '.$error.'!"],_action_1: [" "]};  WriteError(obj,"back")</script></body></html>');
	}
	function copyFiles($to,$from)
	{
		$error="";
		if(is_dir($to)) 
		{
			 if(is_dir($from))
			 {
				if ($dh = opendir($from))
				{
					while (($jfile = readdir($dh)) !== false)
					{
						if(is_file($from.'/'.$jfile))
						{
							if(!@copy($from.'/'.$jfile, $to.'/'.$jfile))
								$error.=$jfile.' ';
						}
					}
					closedir($dh);
				}
			 }
		}
		if($error!="")
			die('</head><body><form id="frm"><img width="700" height="500" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/></form><script> var obj={_message_0: ["Не удалось скопировать файл '.$error.'!"],_action_1: [" "]};  WriteError(obj,"back")</script></body></html>');
	}
	function copyFile($to,$from)
	{
		if(file_exists($to))
		{
			if(!@copy($to, $from))
				die('</head><body><form id="frm"><img width="700" height="500" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/></form><script> var obj={_message_0: ["Не удалось скопировать файл '.$from.'!"],_action_1: [" "]};  WriteError(obj,"back")</script></body></html>');
		}
	}
	function copyDirectory($dest,$source)
	{
		if (is_file($source))
		{
			return copy($source, $dest);
		}
		if (!is_dir($dest))
		{
			mkdir($dest);
		}
		$dir = dir($source);
		while (false !== $entry = $dir->read())
		{
			if ($entry == '.' || $entry == '..')
			{
				continue;
			}
			if ($dest !== "$source/$entry")
			{
				copyDirectory("$dest/$entry","$source/$entry" );
			}
		}
		$dir->close();
		return true;
	}
	function writeSiteMap($path,$dir,$tab)
	{
		if ($handle = opendir($path))
        {
            while (false !== ($file = readdir($handle)))
            {
				if (is_dir($path.'/'.$file) && $file != '.' && $file !='..')
				{
                    $d=basename($dir);
					$tab.=writeSiteMap($path.'/'.$file, $d.'/'.$file,'');
				}
                else if ($file != '.' && $file !='..')
				{
					if(strpos($dir, '_output')===false)
					{
						if($dir[0]=='/')
							$dir=substr($dir, 1);
						$ext=str_replace(".php","",$file);
						$tab.='"'.$ext.'":{"directory":"'.$dir.'"},';
					}
				}
            }
		}
		return $tab;
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
		if(!@$file = fopen($filepath,'w+'))
		{
			die('</head><body><form id="frm"><img width="700" height="500" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/></form><script> var obj={_message_0: ["Ошибка открытия файла '.$filepath.'"],_action_1: [" "]};  WriteError(obj,"back")</script></body></html>');
		}
		else
		{
			fputs($file, $str) || die('</head><body><form id="frm"><img width="700" height="500" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/></form><script> var obj={_message_0: ["Не удалось записать данные в файл '.$filepath.'"],_action_1: [" "]};  WriteError(obj,"back")</script><h1>строка: '.$str.'</h1></body></html>');
			fclose ($file);
		}
	}
	function showPageTree($tnode,$pagetree)
	{
		if ($tnode->nodeType == 1)
		{
			if($tnode->nodeName=='title')
			{
				$pagetree.=$tnode->nodeValue;
			}
			else
			{
				if($tnode->nodeName=='content')
				{
					$pagetree.='<div class="col_content">';
				}
				else if($tnode->nodeName=='index')
				{
					$pagetree.='<div>';
				}
				else
				{
					$pagetree.='<'.$tnode->nodeName;
					if($tnode->hasAttributes()) 
					{ 
						foreach ($tnode->attributes as $attr) 
						{ 
							$pagetree.=' '.$attr->nodeName.'="'.$attr->nodeValue.'"'; 
						} 
					}
					if(($tnode->nodeName!="input")&&($tnode->nodeName!="br")&&($tnode->nodeName!="hr")&&($tnode->nodeName!="img"))
					{
						$pagetree.='>';
					}
					else
					{
						$pagetree.='';
					}
				}
				if($tnode->hasChildNodes())
				{
					for($i=0; $i<$tnode->childNodes->length; $i++)
					{ 
						$new_node = $tnode->childNodes->item($i);
						if ($new_node->nodeType == 1)
						{
							$pagetree.=showPageTree($new_node,"");
						}
						else
							$pagetree.=$tnode->nodeValue;
					}
				}
				if ($tnode->nodeType == 1)
				{
					if($tnode->nodeName=='content')
					{
						$pagetree.='</div>';
					}
					else if($tnode->nodeName=='index')
					{
						$pagetree.='</div>';
					}
					else
					{
						if(($tnode->nodeName!="input")&&($tnode->nodeName!="br")&&($tnode->nodeName!="hr")&&($tnode->nodeName!="img"))
						{
							$pagetree.='</'.$tnode->nodeName.'>';
						}
						else
						{
							$pagetree.='/>';
						}
					}
				}
			}
		}
		return $pagetree; 
	}
?>
