<?php
if(isset($_POST['pathto']))
{
	echo <<<HTML
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"/>
	<html>
	<head>
	<title>Конфигурационный файл</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Script-Type" content="text/javascript"/>


HTML;

	$pathto=$_POST['pathto'];
	if(!is_dir($pathto)) 
	{
		if (!@mkdir($_POST['pathto']))
		{
				die(' </head><body><script> var obj={_message_0: ["Не удалось создать директорию для рубрикатора!"],_action_1: [" "]}; parent.WriteError(obj); </script></body></html>');
		}
	}
	$dbname=$_POST['dbname'];
	$fname=$_POST['fname'];
	$flabel=$_POST['flabel'];
	$str='';
	if(is_dir($pathto)) 
	{
		$pname=basename($_FILES['rubfield']['name']);
		$uploadfile = $pathto.$pname;
		if(is_uploaded_file($_FILES['rubfield']['tmp_name']))
		{
			move_uploaded_file($_FILES['rubfield']['tmp_name'], $uploadfile);
			$rubricator=file($uploadfile);
			$len=count($rubricator);
			$schet=0;
			$str='';
			for($i=0; $i<$len; $i++)
			{
				$res = strpos($rubricator[$i], '<entry'); 
				if($res !== false)
				{
					$str .= str_replace('<entry', '<entry count="'.$schet.'"', $rubricator[$i]);
					$schet++;
				}
				else
				{
					$str .= $rubricator[$i];
				}
			}
			$realname=$dbname.'_rubricator_'.$fname.'.xml';
			$path=$pathto.'/'.$realname;
			$file = fopen($path,"w+");
			if (!$file)
			{
				echo ' <script> var obj={_message_0: ["Ошибка открытия файла! '.$path.'"],_action_1: [" "]}; </script>';
			}
			else
			{
				fputs($file, $str);
			}
			fclose ($file);
			if(!unlink ($uploadfile))
			{
				echo ' <script> var obj={_message_0: ["Ошибка удаления файла! '.$uploadfile.'"],_action_1: [" "]}; </script>';
			}
			else
			{
				echo ' <script> var obj={text:"Файл ['.$path.'] корректен и был успешно загружен.",dbname:"'.$dbname.'",path:"'.$realname.'",flabel:"'.$flabel.'"}; ';
			}
		}
		else
		{
			echo ' <script> var obj={_message_0: ["Файл некорректен!"],_action_1: [" "]}; ';
		}
	}
	else
	{
		echo ' <script> var obj={_message_0: ["Не удалось загрузить файл."],_action_1: ["Каталога '.$pathto.' не существует."]}; ';
	}
	echo 'parent.backLoadRubricator(obj); </script></head><body></body></html>';
}
?>
