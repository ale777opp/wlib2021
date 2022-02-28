/*--------------- поиск по карте -------------------*/

function nMap(options)/*отрисовка карты*/
{
	var kw=1, kh=1, width=mapwidth, height=mapheight, cls="", cls2="", depth='1.5', fillc='#eeeeee', strokec='#ffffff', overhandler='mapOver', outhandler='mapOut', clickhandler='zoomRegion';
	if(typeof options['width'] != "undefined")
		width=parseInt(options['width']);
	if(typeof options['height'] != "undefined")
		height=parseInt(options['height']);
	if(typeof options['cls'] != "undefined")
		cls=options['cls'];
	if(typeof options['cls2'] != "undefined")
		cls2=options['cls2'];
	if(typeof options['depth'] != "undefined")
		depth=options['depth'];
	if(typeof options['fill'] != "undefined")
		fillc=options['fill'];
	if(typeof options['stroke'] != "undefined")
		strokec=options['stroke'];
	if(typeof options['overhandler'] != "undefined")
		overhandler=options['overhandler'];
	if(typeof options['outhandler'] != "undefined")
		outhandler=options['outhandler'];
	if(typeof options['clickhandler'] != "undefined")
		clickhandler=options['clickhandler'];

	if(options['zoomk']!=undefined)
	{
		kw=kh=parseFloat(options['zoomk']);
	}
	var parent = take(options['element']);
	if(parent.n == null)
	{
		var ind='searchmap';
		if(take('searchmap1').n!=null)
			ind='searchmap1';
		parent=take(ind).create('div',{id:options['element']});
	}
	var s=eval(options['id']);
	if (window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"))
	{
		if(take('svg_'+options['id']).n==null)
		{
			var svgNS = "http://www.w3.org/2000/svg";
			var arg={};
			arg.id='svg_'+options['id'];
			arg.width=width;
			arg.height=height;
			if(cls!="")
			{
				parent.setattr(svgNS,'class',cls);

			}
			var svg = parent.createNS(svgNS, 'svg:svg', arg);
			var list=[];
			for (k in s)
			{
				for (k1 in s[k])
				{
					var l=s[k][k1].length;
					if (l>2) {
						var str='M'+parseInt(s[k][k1][0]*kw)+' '+parseInt(s[k][k1][1]*kh)+' ';
						for (i=2;i<l-1;i+=2) {
							str+='L'+parseInt(s[k][k1][i]*kw)+' '+parseInt(s[k][k1][i+1]*kh)+' ';
							}
						str+='z';
						}
				}
				if(typeof s[k][4] != "undefined")
					fillc=s[k][4];
				if(typeof s[k][5] != "undefined")
					strokec=s[k][5];
				if(typeof s[k][7] != "undefined")
					overhandler=s[k][7];
				if(typeof s[k][8] != "undefined")
					outhandler=s[k][8];
				if(typeof s[k][9] != "undefined")
					clickhandler=s[k][9];
				svg.createNS(svgNS, 'path', {id: 'svg_'+options['id']+'_'+k+'_'+s[k][2], 'class': s[k][1], 'stroke-linejoin': 'round', 'stroke-width': depth, stroke: strokec, fill: fillc, onmousedown: clickhandler, onmouseover: overhandler, onmouseout: outhandler, d: str});
				if(cls!="")
					list.push(['svg_'+options['id']+'_'+k+'_'+s[k][2],s[k][1]]);
			}
			list=list.sort();
			if(cls!="")
			{
				take('svg_mapfull').setattr(svgNS,'class','o02');
				var rcdiv=parent.create('div',{id:'regions_container',className:options['id']});
				var rect=rcdiv.create('div',{textNode:'Закрыть',className:'del',onclick:'mapClose'});
				if(typeof listregions != "undefined")
				{
					var rc=rcdiv.create('ol');
					for(i=0;i<list.length; i++)
					{
						var li=rc.create('li');
						li.create('span',{className:list[i][0],onmousedown: clickhandler, onmouseover: overhandler, onmouseout: outhandler,textNode:list[i][1]});
					}
				}
				setTimeout(function(){parent.setattr(svgNS,'class',cls2);}, 20);
			}
		}
	}
}

function setMap(mapname,cords,clickhandler,zoomk,width,height,cls,cls2,depth,fill,stroke,overhandler,outhandler)/*настройка параметров для вывода карты*/
{
	var arg={};
	arg.element=mapname;
	arg.id=cords;
	if((typeof clickhandler != "undefined")&&(clickhandler!=null))
		arg.clickhandler=clickhandler;
	if((typeof zoomk != "undefined")&&(zoomk!=null))
		arg.zoomk=zoomk;
	if((typeof width != "undefined")&&(width!=null))
		arg.width=width;
	if((typeof height != "undefined")&&(height!=null))
		arg.height=height;
	if((typeof stroke != "undefined")&&(stroke!=null))
		arg.stroke=stroke;
	if((typeof fill != "undefined")&&(fill!=null))
		arg.fill=fill;
	if((typeof cls!="undefined")&&(cls!=null))
		arg.cls=cls;
	if((typeof cls2!="undefined")&&(cls2!=null))
		arg.cls2=cls2;
	if((typeof depth!="undefined")&&(depth!=null))
		arg.depth=depth;
	var map=new nMap(arg);
}

function showSearchMap()/*показать / скрыть карту*/
{
	take('expand_search').hide();
	take('sbuttons').hide();
	take('simple_search').show();
	var mc=take('map_container');
	var sm=take('searchmap');
	var cont=take('main');
	if(cont.n != null)
	{
		if(mc.n == null)
		{
			mc=cont.create('div',{id:'map_container',className:'map_hide'});
			sm=mc.create('div',{id:'searchmap',className:'map_hide'});
		}
	}
	if(sm.n.innerHTML=="")
		setMap('searchmap','mapfull');
	mc.switchclass('map_show','map_hide');
	sm.switchclass('map_show','map_hide');
	if(take('callsearchmap').n != null)
		take('callsearchmap').switchclass('sel','sel_');
	if(take('simple').n != null)
	{
		if(take('simple').hasclass('sel_'))
		{
			take('simple').delclass('sel_')
			take('simple').addclass('sel')
		}
	}
	if(take('expand').n != null)
	{
		if(take('expand').hasclass('sel_'))
		{
			take('expand').delclass('sel_')
			take('expand').addclass('sel')
		}
	}
	if(take('professional').n != null)
	{
		if(take('professional').hasclass('sel_'))
		{
			take('professional').delclass('sel_')
			take('professional').addclass('sel')
		}
	}
	if(take('fundholders').n != null)
	{
		if(take('fundholders').hasclass('sel_'))
		{
			take('fundholders').delclass('sel_')
			take('fundholders').addclass('sel')
		}
	}
	typesearch='simple';
}

function zoomRegion(e)/*открыть увеличенныую область карты в новом слое*/
{
	deleteHint();
	var obj=getSrc(e);
	var t=obj.nodeName;
	var otpl=obj.id.split('_');
	var num=otpl[3];
	var o=otpl[0]+'_'+otpl[1]+'_'+otpl[2].substring(0,2);
	var arr=take(obj).getpart('http://www.w3.org/2000/svg',t,{id:o});
	var ll=[];
	var rr=[];
	var tt=[];
	var bb=[];
	for(var i=0; i<arr.length; i++)
	{
		ll.push(arr[i].getBoundingClientRect().left.toFixed());
		rr.push(arr[i].getBoundingClientRect().right.toFixed());
		tt.push(arr[i].getBoundingClientRect().top.toFixed());
		bb.push(arr[i].getBoundingClientRect().bottom.toFixed());
	}
	var l = getMinValue(ll);
	var r = getMaxValue(rr);
	var t = getMinValue(tt);
	var b = getMaxValue(bb);
	var w=r-l;
	var h=b-t;
	var k=take(obj.parentNode.parentNode).getw();
	var k1=take(obj.parentNode.parentNode).geth();
	var k2=parseFloat(w/mapwidth).toFixed(2);
	var zoom=1;
	if(w>h)
	{
		zoom=parseFloat(k/w).toFixed(2);
	}
	else
	{
		zoom=parseFloat(k1/h).toFixed(2);
	}
	zoom=parseFloat(zoom*0.44).toFixed(2);
	var cls='zoom1';
	var cls2='zoom2';
	setMap('small_map',num,'searchMap',zoom,k+50,k,cls,cls2);
}

function mapClose(e)/*закрыть увеличенную область*/
{
	deleteHint();
	var par=take(getSrc(e).parentNode.parentNode);
	var rc=take('regions_container');
	par.setattr('http://www.w3.org/2000/svg','class','zoom0');
	setTimeout(function(){par.n.parentNode.removeChild(par.n)}, 1000);
	take('svg_mapfull').setattr('http://www.w3.org/2000/svg','class','o1');
}

function getMinValue(array)/*выбор большей координаты*/
{
    var min = array[0];
    for (var i = 0; i < array.length; i++)
	{
        if (min > array[i]) min = array[i];
    }
    return min;
}

function getMaxValue(array)/*выбор меньшей координаты*/
{
    var max = array[0];
    for(var i = 0; i < array.length; i++)
	{
        if(max < array[i]) max = array[i]; 
    }
    return max;
}

function mapOver(e)/*подсветка области*/
{
	deleteHint();
	var elem=getSrc(e);
	var tn=elem.nodeName;
	var obj=null;
	var flag=false;
	if(tn.toLowerCase()=='span')
		obj=take(elem.className).n;
	else
	{
		flag=true;
		obj=elem;
	}
	var t=obj.nodeName;
	var otpl=obj.id.split('_');
	var ids=eval(otpl[1]);
	var num=otpl[2];
	var o=otpl[0]+'_'+otpl[1]+'_'+otpl[2].substring(0,2);
	if(flag)
	{
		var hinttext=ids[num][1];
		var div=take(document.body).create('span',{id: 'maphint',textNode:hinttext});
		var x=obj.getBoundingClientRect().left;
		var y=obj.getBoundingClientRect().top-50;
		div.setx(x);
		div.sety(y);
	}
	var hcolor="#cccccc";
	if(typeof ids[num][6] != "undefined")
		hcolor=ids[num][6];
	var svgNS = "http://www.w3.org/2000/svg";
	var arr=take(obj).getpart(svgNS,t,{id:o});
	for(var i=0; i<arr.length; i++)
	{
		if (window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"))
			arr[i].setAttributeNS(null, 'fill', hcolor);
		else
			arr[i].childNodes[0].color=hcolor;
	}
}

function mapOut(e)/*снятие подсветки области*/
{
	deleteHint();
	var elem=getSrc(e);
	var tn=elem.nodeName;
	var obj=null;
	if(tn.toLowerCase()=='span')
		obj=take(elem.className).n;
	else
		obj=elem;
	var t=obj.nodeName;
	var otpl=obj.id.split('_');
	var ids=eval(otpl[1]);
	var num=otpl[2];
	var o=otpl[0]+'_'+otpl[1]+'_'+otpl[2].substring(0,2);
	var hcolor="#eee";
	if(typeof ids[num][4] != "undefined")
		hcolor=ids[num][4];
	var svgNS = "http://www.w3.org/2000/svg";
	var arr=take(obj).getpart(svgNS,t,{id:o});
	for(var i=0; i<arr.length; i++)
	{
		if (window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"))
			arr[i].setAttributeNS(null, 'fill', hcolor);
		else
			arr[i].childNodes[0].color=hcolor;
	}
}

function deleteHint()/*удаление всплывающей подсказки*/
{
	if(take('maphint').n!=null)
		take('maphint').n.parentNode.removeChild(take('maphint').n);
	return;
}

function searchMap(e)/*поиск по карте*/
{
	var elem=getSrc(e);
	var tn=elem.nodeName;
	var obj=null;
	if(tn.toLowerCase()=='span')
		obj=take(elem.className).n;
	else
		obj=elem;
	var otpl=obj.id.split('_');
	var num=otpl[2];
	var ids=eval(otpl[1]);
	var lab=ids[num][3];
	var term=ids[num][2];
	if(take('searchmap1').n != null)
	{
		typesearch="combined";
		livsrc=null;
		livlabel="";
		showrubterm=term;
		showtext=ids[num][1];
		simpleSearch(lab);
	}
	else
	{
		typesearch="simple";
		var arg={};
		arg._str='[bracket]'+lab+' '+term+'[/bracket]';
		arg._showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+term;
		arg._addlabel=lab;
		simpleSearch(lab,arg);
	}
}

/*------------- конец поиск по карте ---------------*/