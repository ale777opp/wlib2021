
/*календарь*/
var curDate=new Date();

var Month=curDate.getMonth();

var Year=curDate.getFullYear();

var maxYear=Year+1;

var minYear=1920;

var validd1=31;

var validm=12;

var dd=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();

var mm=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;

var cd=Year+mm+dd;

function isLeapyear(theyear)
{
	return (!(theyear%4)&&(theyear%100||!(theyear%400)))?true:false;
}

function setValidDay(v,y,ind)
{
	var validnumber;
	if(v=='02')
		(isLeapyear(y))?validnumber=29:validnumber=28;
	else if((v=='04')||(v=='06')||(v=='09')||(v=='11'))
		validnumber=30;
	else
		validnumber=31;
	if((parseInt(take(ind).n.value,10)>validnumber)||(take(ind).n.value.length<2))
		take(ind).n.value=validnumber;
}

var monthDays=new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

var months=new Array('Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь');

var cobj=null;

function CreateCal(e)
{
	var obj=new calObj(getSrc(e).id);
	obj.calPrint(e);
}

function CreateCal2(e)
{
	var obj=new calObj(getSrc(e).id,'2005',maxYear);
	obj.calPrint(e);
}

function CreateCal1(e)
{
	var obj=new calObj(getSrc(e).id,'1920');
	obj.calPrint(e);
}

function calObj(ind,minyear,maxyear,closebut,cls)
{
	this.id="_"+ind;
	this.year=Year;
	this.month=Month;
	this.day=curDate.getDate();
	this.minyear=minyear || minYear;
	this.maxyear=maxyear || maxYear;
	this.className=cls || "calendar";
	this.closebut=closebut || true;
	this.years=new Array();
	var len=this.maxyear-this.minyear;
	this.week=new Array('Пн','Вт','Ср','Чт','Пт','Сб','Вс');
	this.setCal=setCal;
	this.calPrint=calPrint;
	this.fillCels=fillCels;
	maxYear=this.maxyear;
	minYear=this.minyear;
}

function fillCels(e)
{
	var par=this.parentNode.parentNode;
	var ind=getSrc(e).parentNode.id.substring(getSrc(e).parentNode.id.indexOf('_')+1);
	var y=parseInt(take('y_'+ind).n.value);
	var m=(parseInt(take('m_'+ind).n.className)+1<10)?'0'+(parseInt(take('m_'+ind).n.className)+1):parseInt(take('m_'+ind).n.className)+1;
	var dd=getSrc(e).innerHTML;
	dd=(parseInt(dd)+1<10)?'0'+(parseInt(dd)):parseInt(dd);
	take('d'+ind).n.value=dd;
	take('m'+ind).n.value=m;
	take('y'+ind).n.value=y;
	putDT(e);
	calDel(par.id);
}

function setCal(e)
{
	var par=take('numeric'+cobj.id);
	par.n.innerHTML="";
	var nDate=new Date(Year,Month,0);
	if(isLeapyear(Year))
		monthDays[1]=29;
	else
		monthDays[1]=28;
	var days=monthDays[Month];
	var start=nDate.getDay();
	days+=start;
	var i=0;
	for(i=0; i<start; i++)
		par.create('span', {className: 'empty', textNode: '.'});
	for(i=start; i<days; i++)
	{
		var cls;
		if((i%7==5)||(i%7==6))
			cls='rest';
		else
			cls='work';
		var span=par.create('span',{textNode: (i-start+1), className: cls, title: ' выбрать ', onmousedown: 'fillCels'});
		if((i-start+1)==curDate.getDate())
		{
			span.n.className='now';
		}
	}
	if(((i%7)<7)&&(i%7)!=0)
	{
		for(var j=(i%7); j<7; j++)
			par.create('span', {className: 'empty', textNode: '.'});
	}
	take('m'+cobj.id).n.className=Month;
	take('m'+cobj.id).n.innerHTML=months[Month];
	take('y'+cobj.id).n.value=Year;
}

function putCMonth(e)
{
	var obj=getSrc(e);
	var elem=obj.parentNode;
	var par=elem.parentNode;
	var mobj=take(elem.id.substring(1)).n;
	Month=mobj.className=obj.className;
	mobj.innerHTML=obj.innerHTML;
	par.removeChild(elem);
}

function changeMonth(e)
{
	var elem=getSrc(e);
	var par=elem.parentNode;
	var cmo=take(par).create('ul',{id: 'm'+elem.id,className:'cselect'});
	for(var i=0; i<months.length; i++)
	{
		var opt=cmo.create('li', {textNode: months[i], className: i,onmousedown:'putCMonth'});
		if(i==Month)
			opt.n.className='active';
	}
}

function calPrint(e)
{
	calDel(this.id);
	cobj=this;
	var elem=take(document.body).create('div', {id: this.id, className: this.className});
	if(this.closebut)
	{
		var header=elem.create('div',{className:'close'});
		header.create('span', {textNode: 'X', title: 'Закрыть', className: 'del', onmousedown: 'function(){calDel("'+this.id+'");};'});
	}
	var top=elem.create('div',{className: 'top'});
	top.create('span', {className: 'arl',title:'назад', onclick: 'setMounth',textNode:'<'});
	top.create('span', {id: 'm'+this.id,title:'изменить', textNode: months[this.month], className: this.month,onmousedown:'changeMonth'});
	top.create('span', {className: 'arr',title:'вперед', onclick: 'setMounth',textNode:'>'});
	top.create('span', {className: 'arl',title:'назад', onclick: 'setYear',textNode:'<'});
	top.create('input', {type: 'text',title:'изменить', id: 'y'+this.id, value: this.year, maxLength: '4', onkeyup: 'setYear', onblur: 'setYear'});
	top.create('span', {className: 'arr',title:'вперед', onclick: 'setYear',textNode:'>'});
	var days=elem.create('div',{className: 'days'});
	var len=this.week.length;
	for(var i=0; i<len; i++)
	{
		days.create('span',{textNode: this.week[i]});
	}
	var num=elem.create('div',{id: 'numeric'+this.id});
	this.setCal(e);
	X=getX(e);
	Y=getY(e);
	var r=(isIE)?parseInt(document.body.clientWidth-X):parseInt(window.innerWidth-X);
	var t=(isIE)?parseInt(document.body.clientHeight-Y):parseInt(window.innerHeight-Y);
	var w=elem.getw();
	var h=elem.geth();
	var sX=sY=0;
	if(r<w) sX=parseInt(X-w);
	else sX=parseInt(X);
	if(t<h) sY=parseInt(Y-h);
	else sY=parseInt(Y);
	elem.setx(sX);
	elem.sety(sY);
}

function setMounth(e)
{
	var c=0;
	if(getSrc(e).className=='arr')
		c=1;
	var oldm=parseInt(take('m'+cobj.id).n.className);
	var curm=(c==0)?oldm-1:oldm+1;
	if(curm>11)
	{
		curm=0;
	}
	if(curm<0)
	{
		curm=11;
	}
	Month=curm;
	setCal(e);
}

function setYear(e)
{
	var cury=Year;
	if(getSrc(e).nodeName.toLowerCase()=='input')
	{
		if(getSrc(e).value.length<4)
			return;
		else
			cury=getSrc(e).value;
	}
	else
	{
		var c=0;
		if(getSrc(e).className=='arr')
			c=1;
		var oldy=parseInt(take('y'+cobj.id).n.value);
		var cury=(c==0)?oldy-1:oldy+1;
	}
	if((cury>maxYear)||(cury<minYear))
		cury=curDate.getFullYear();
	Year=cury;
	setCal(e);
}

function calDel(ind)
{
	var div=take(ind).n;
	if(div!=null)
	{
		div.parentNode.removeChild(div);
		curDate=new Date();
		Month=curDate.getMonth();
		Year=curDate.getFullYear();
	}
	else
		return;
	cobj=null;
}
/*end календарь*/

/*проверка правильности введенной даты*/
function correctVal(e)
{
	var elem=getSrc(e);
	if(elem.nodeName.toLowerCase()!='input')
		return;
	var val=elem.value;
	if(!IsInt(val))
	{
		alert('Значение должно быть цифровым!');
		elem.focus();
		return;
	}
	var pref=getSrc(e).id.substring(0,1);
	var tail=getSrc(e).id.substring(1,getSrc(e).id.length);
	var etype=(!isIE)?e.type:window.event.type;
	switch(pref)
	{
		case 'd':	if(((val=='')||(val.length<2))&&(etype=="blur"))
						elem.value=dd;
					if(val.length==2)
					{
						if((parseInt(val,10)>validd1)||(parseInt(val,10)==0))
							elem.value=dd;
						if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
							elem.value="0"+parseInt(val,10);
						var y=(take('y'+tail).n.value.length==4)?parseInt(take('y'+tail).n.value,10):minYear;
						if(take('m'+tail).n.value!="")
							setValidDay(take('m'+tail).n.value,y,'d'+tail);
						if((getCode(e)==39)&&(etype!="blur"))
							take('m'+tail).n.focus();
					}
		break;
		case 'm':	if((take('d'+tail).n.value.length<2)||(parseInt(take('d'+tail).n.value)>validd1))
						take('d'+tail).n.value=dd;
					if(((val=='')||(val.length<2))&&(etype=="blur"))
						elem.value=mm;
					if(val.length==2)
					{
						var y=(take('y'+tail).n.value.length==4)?parseInt(take('y'+tail).n.value,10):minYear;
						if((parseInt(val,10)>validm)||(parseInt(val,10)==0))
							elem.value=mm;
						if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
							elem.val="0"+parseInt(val,10);
						setValidDay(parseInt(val,10),y,'d'+tail);
						if((getCode(e)==37)&&(etype!="blur"))
							take('d'+tail).n.focus();
						if((getCode(e)==39)&&(etype!="blur"))
							take('y'+tail).n.focus();
					}
		break;
		case 'y':	if(take('m'+tail).n.value.length<2)
						take('m'+tail).n.value=mm;
					if(take('d'+tail).n.value.length<2)
						take('d'+tail).n.value=dd;
					if(((val=='')||(parseInt(val,10)<minYear)||(parseInt(val,10)>maxYear))&&(etype=="blur"))
						elem.value=Year;
					setValidDay(take('m'+tail).n.value,parseInt(elem.value,10),'d'+tail);
					if((getCode(e)==37)&&(etype!="blur"))
						take('m'+tail).n.focus();
		break;
		case 'h':	if((val=='')||(val.length<2))
						elem.value='00';
					if(val.length==2)
					{
						if((parseInt(val,10)>23)||(parseInt(val,10)==0))
							elem.value='00';
						if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
							elem.value="0"+parseInt(val,10);
					}
		break;
		case 's':	if(take('h'+tail).n.value.length<2)
						take('h'+tail).n.value='00';
					if((val=='')||(val.length<2))
						elem.value='00';
					if(val.length==2)
					{
						if((parseInt(val,10)>59)||(parseInt(val,10)==0))
							elem.value='00';
						if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
							elem.val="0"+parseInt(val,10);
					}
		break;
		default: break;
	}
}

function setValidDate(y,m,d)
{
	var str="";
	if((y.length<4)||(parseInt(y,10)<parseInt(Year,10))||(parseInt(y,10)>parseInt(maxYear,10)))
		y=Year;
	str+=y;
	if(m.length<2)
		m='0'+m;
	else
	{
		if(parseInt(m,10)>12)
			m='12';
	}
	str+=m;
	if(d.length<2)
		d='0'+d;
	else
	{
		var vd=findDay(y,m);
		if(parseInt(d,10)>vd)
			d=vd;
	}
	str+=d;
	if(parseInt(str)<parseInt(cd))
		str=cd;
	return str;
}

function findDay(y,m)
{
	var validnumber;
	if(m=='02')
		(isLeapyear(y))?validnumber=29:validnumber=28;
	else if((m=='04')||(m=='06')||(m=='09')||(m=='11'))
		validnumber=30;
	else
		validnumber=31;
	return validnumber;
}

/*end проверка правильности введенной даты*/

function putDT(e)
{	
	if(getSrc(e).nodeName.toLowerCase()!='span')
		correctVal(e);
	viewNext();
}

function viewNext()
{
	limitOrderData();
	if(take('inext').n!=null)
		take('inext').show();
	if(take('timeordcontainer').n!=null)
		take('timeordcontainer').hide();
	if(take('iconfirm').n!=null)
		take('iconfirm').hide();
}

function IsInt(val)
{
	var temp=/\d/;
	for(var i=0; i<val.length; i++)
	{
		if(!temp.test(val.charAt(i)))
		{
			return false;
		}
	}
	return true;
}

var orderlimit=null;/*86400000*5 - заказ на дату не более 5 дней с момента заказа или null*/

function limitOrderData()
{
	if(orderlimit!=null)
	{
		if((take('inext').n!=null)&&(take('timeordcontainer').n!=null))
		{
			var currd=curDate.getTime();
			var limitdate=curDate.getTime()+orderlimit;
			var inputdate=(new Date(take('y11').n.value,parseInt(take('m11').n.value,10)-1,take('d11').n.value)).getTime();
			if((limitdate < inputdate)||(currd > inputdate))
			{
				inputdate=limitdate;
			}
			var dd=(new Date(inputdate)).getDate()+'';
			var mm=((new Date(inputdate)).getMonth()+1)+'';
			var yy=(new Date(inputdate)).getFullYear();
			if(dd.length<2)
				dd='0'+dd;
			if(mm.length<2)
				mm='0'+mm;
			take('y11').n.value=yy;
			take('m11').n.value=mm;
			take('d11').n.value=dd;
		}
	}
}

function setEventMonth(o)
{
	var elem=take('m_10').n;
	var cl=parseInt(elem.className,10);
	if(o.className=="arl")
	{
		if(cl > 0)
		{
			elem.className=cl-1;
			elem.innerHTML=months[cl-1];
		}
	}
	else
	{
		if(cl < 11)
		{
			elem.className=cl+1;
			elem.innerHTML=months[cl+1];
		}
	}
	setEventMonthes();
}

function setEventYear(o)
{
	var elem=take('y_10').n;
	var cl=parseInt(elem.className,10);
	var y=(new Date).getFullYear();
	if(o.className=="arr")
	{
		if(cl < y)
		{
			elem.className=cl+1;
			elem.innerHTML=cl+1;
		}
	}
	else
	{
		elem.className=cl-1;
		elem.innerHTML=cl-1;
	}
	setEventMonthes();
}

function setEventMonthes()
{
	var elem=take('numeric_10');
	var y1=(new Date).getFullYear();
	var m1=(new Date).getMonth();
	var y=take('y_10');
	var m=take('m_10');
	elem.n.innerHTML="";
	for(var i=11; i >= 0; i--)
	{
		var cls='';
		if(y1 == parseInt(y.n.className,10))
		{
			if(i <= parseInt(m1,10))
			{
				cls='u red curs';
			}
			else
			{
				cls='';
			}
		}
		else
		{
			cls='u red curs';
		}
		if(cls!="")
		{
			elem.create('span',{className:cls,onmousedown:'function(){setEvent(\''+parseInt(y.n.className,10)+'\',\''+i+'\')}',textNode:months[i]});
		}
		else
		{
			elem.create('span',{textNode:months[i]});
		}
	}
}
