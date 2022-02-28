<?php
if(isset($_POST['collind']))
{
	/*указать путь к плагину (для вывода структуры коллекций ПБ). см. пример ниже*/
	$pluginpath='http://194.226.24.48/reports/plugins/collection_hierarchy?db=12&id=';
	$path=$pluginpath.''.$_POST['collind'].'&name='.urlencode($_POST['colltitle']);
	$rezult = file_get_contents($path);
	$json=json_decode($rezult);
	if(isset($json->collection))
	{
		echo 'var rezult='.$rezult.';';
	}
	else
	{
		echo 'var error={_message_0: ["Не удалось получить структуру коллекции с идентификатором: '.$_POST['collind'].'."],_action_1: [""]};';
	}
}
?>