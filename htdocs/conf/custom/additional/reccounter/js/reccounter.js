/*анимированный счетчик "всего записей в каталоге"*/

function findBaseQuantity()
{
	if(typeof _basequant!="undefined")
	{
		basequant=_basequant;
		showBaseCounter('stop');
	}
	else
	{
		var arr=take('rcounter').tags('ul');
		for(var i=0; i<arr.length; i++)
		{
			arr[i].classList.add('animate');
		}
		setTimeout('openBaseInfo()',300);
	}
}

function openBaseInfo()
{
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_html","error"]);
	querylist.push(["_service","STORAGE:opacfindd:FindSize"]);
	querylist.push(["_version","1.1.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numdbBIBL]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,openBaseInfoCallback);
}

function openBaseInfoCallback(x)
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		;
	}
	else
	{
		basequant=response[0]._size;
		showBaseCounter();
	}
}

function showBaseCounter(o)
{
	var arr=take('rcounter').tags('ul');
	var rsize=7;
	var rdelta=rsize-basequant.length;
	var fullquant='';
	for(var j=0; j<rdelta; j++)
		fullquant+='0';
	fullquant+=basequant;
	var i = 0;
	(function() {
		if (i < arr.length) {
			arr[i].firstChild.innerHTML=fullquant.charAt(i);
			arr[i].classList.remove('animate');
			i++;
			if(typeof o != "undefined")
				arguments.callee();
			else
				setTimeout(arguments.callee, 300);
		}
	})();
}

/*конец анимированный счетчик "всего записей в каталоге"*/