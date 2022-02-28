<?php
	/*интеграция с ЭБС*/
	//ebs?name=LAN&token=d32a87d8a97cb971827b046567fd32e2e964abff&url=/book/89921
	
	if(isset($_GET['name']))
	{
		include ($_GET['name'].'.php'); 
	}
	else
		echo '<html><head><title>Не удалось подключиться к ЭБС</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body>Не удалось подключиться к ЭБС</body></html>';
?>