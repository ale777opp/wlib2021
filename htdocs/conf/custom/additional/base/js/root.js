/*----------------------------------- базовые функции ------------------------------------*/

var isIE=(navigator.userAgent.indexOf('MSIE')!=-1)&&(!window.opera)?true:false;
var curs=(document.compatMode=='CSS1Compat')?'pointer':'hand';
var docEl=null;
var arrwin=[];
var countwin=0;
var frmh=1000;
var movable=false;
var _x=0;
var _y=0;
var scalable=false;
var __x, __y, __xx, __yy, __l, __t, __r, __b, __w, __h, sw, sh, cx, cy, dx, dy, xm, ym;
var wraparr=new Array();
var price="0";
var typesearch="simple";
var typework="";
var skipfirst="";
var voclab="";
var endvoc="";
var vocobj="";
var vocstart=1;
var firstterm="";
var indxterms="";
var andor=0;
var lastterm="";
var vstr="";
var vvstr="";
var cstr="";
var ustr="";
var fobject=null;
var menu=null;
var addfilters="";
var lockedfilters="";
var swfterm="";
var addid="";
var seeid="";
var flag45=false;
var portion=15;
var begin=1;
var portioncount=0;
var portionarr=[];
var quant=0;
var promocod="";
var readerobj=null;
var treeobj=null;
var rez=[];
var siglaid=null;
var basequant="";
var realdbaf="";
var iddbbibl="";
var editqueryflag=false;
var searchlabel='';
var searchtermin='';
var scrollobj=null;
var showtext="";
var showrubterm="";
var livsrc=null;
var livlabel="";
var lightarr=[];
var lightstring="";
var savedstring="";
var lockedstring="";
var bodyclass="";
var titlesearch="";
var searchurl="";
var imgurl="";
var showstr="";
/*массив слов, исключенных из подсветки*/
var pretexts=[];
pretexts["без"]="";
pretexts["безо"]="";
pretexts["близ"]="";
pretexts["вне"]="";
pretexts["для"]="";
pretexts["изо"]="";
pretexts["или"]="";
pretexts["меж"]="";
pretexts["над"]="";
pretexts["обо"]="";
pretexts["ото"]="";
pretexts["под"]="";
pretexts["подо"]="";
pretexts["пред"]="";
pretexts["предо"]="";
pretexts["при"]="";
pretexts["про"]="";
pretexts["ради"]="";
pretexts["чем"]="";

/*позиционирование и события*/

function getSrc(e)
{
	if(e)
		return e.target;
	else
		return event.srcElement||docEl.event.srcElement;
}

function getCode(e)
{
	e=(e)?e:(event||docEl.event);
	var code=e.keyCode;
	return code;
}

function getEtype(e)
{
	e=(e)?e:(event||docEl.event);
	return e.type;
}

function getCtrl(e)
{
	e=(e)?e:(event||docEl.event);
	var code=e.ctrlKey;
	return code;
}

function getBody()
{
	if(document.documentElement)
		return document.documentElement;
	else
		return document.body;
}

function getX(e)
{
	var doc=getBody();
	if(e)
		return e.pageX;
	else
		if(isIE)
			return event.clientX+doc.scrollLeft;
		else
			return event.clientX;
}

function getY(e)
{
	var doc=getBody();
	if(e)
		return parseInt(e.pageY);
	else
		if(isIE)
			return event.clientY+doc.scrollTop;
		else 
			return event.clientY;
}

function getXY(e)
{
	var x = 0, y = 0;
	if (!e) e = window.event;
	if (e.pageX || e.pageY)
	{
		x = e.pageX;
		y = e.pageY;
	}
	else if (e.clientX || e.clientY)
	{
		x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
		y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
	}
	return {"x":x, "y":y};
}

var elem_rect=
{
    x:function(elem){
        var b = document.body,
            e = document.documentElement,
            x = window.pageXOffset || e.scrollLeft || b.scrollLeft,
            c = e.clientLeft || b.clientLeft || 0;
        return Math.round(elem.getBoundingClientRect().left+x-c);
    },
    y:function(elem){
        var b = document.body,
            e = document.documentElement,
            y = window.pageYOffset || e.scrollTop || b.scrollTop,
            c = e.clientTop || b.clientTop || 0;
        return Math.round(elem.getBoundingClientRect().top+y-c);
    }
}

function getAbsolutePosition(elem)
{
	var obj={x:0,y:0};
	while(elem)
	{
		obj.x+=elem.offsetLeft;
		obj.y+=elem.offsetTop;
		elem=elem.offsetParent;
	}
	return obj;
}

function pageOffset()
{
	var obj={x:0,y:0};
	if(docEl==null)
	{
		if(this.nodeName)
			docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
		else
			docEl=this;
	}
	obj.x += docEl.pageXOffset || docEl.document.documentElement.scrollLeft || docEl.document.body.scrollLeft;
	obj.y += docEl.pageYOffset || docEl.document.documentElement.scrollTop  || docEl.document.body.scrollTop;
	return obj;
}

function getOffset(elem)
{
    if(elem.getBoundingClientRect)
	{
        return getOffsetRect(elem);
    }
	else
	{
        return getOffsetSum(elem);
    }
}

function getOffsetSum(elem)
{
    var top=0, left=0;
    while(elem)
	{
        top = top + parseInt(elem.offsetTop);
        left = left + parseInt(elem.offsetLeft);
        elem = elem.offsetParent;
    }
    return {top: top, left: left};
}

function getOffsetRect(elem)
{
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docElem = document.documentElement;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
	return { top: Math.round(top), left: Math.round(left) };
}

function getCurrStyle(obj)
{
	if(obj.currentStyle)
		return obj.currentStyle;
	else
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		return docEl.getComputedStyle(obj,null);
	}
}

/*конец позиционирование и события*/

/*экранировани символов и строковые преобразования*/

function addslash(v)
{
	var ret="";
	for(var i=0;i < v.length;i++)
	{
		if("\\^$*+?{}[]().:!=|-,/".indexOf(v.charAt(i))!=-1)
		{
			ret +="\\"+v.charAt(i);
		}
		else
		{
			ret +=v.charAt(i);
		}
	}
	return ret;
}

function replaceSlash(val)
{
	val=val.replace(/\\/g,'\\\\');
	return val;
}

function encodeVal(s)
{
	var encodeval=encodeURIComponent(s);
	encodeval=encodeval.replace(/~/g,'%7E');
	encodeval=encodeval.replace(/!/g,'%21');
	encodeval=encodeval.replace(/\(/g,'%28');
	encodeval=encodeval.replace(/\)/g,'%29');
	encodeval=encodeval.replace(/'/g,'%27');
	encodeval=encodeval.replace(/\%20/g,'+');
	return encodeval;
}

function delbrackets(val)
{
	val=val.replace(/\\\(/g,'(');
	val=val.replace(/\\\)/g,')');
	return val;
}
function brackets(val)
{
	val=val.replace(/\(/g,'\\(');
	val=val.replace(/\)/g,'\\)');
	return val;
}

function convertbrackets(val)
{
	val=val.replace(/\(/g,'[bracket]');
	val=val.replace(/\)/g,'[/bracket]');
	val=val.replace(/\'/g,'[apos]');
	val=val.replace(/\"/g,'[quot]');
	return val;
}

function convertseef(val)
{
	val=val.replace(/\(/g,'[bracket]');
	val=val.replace(/\)/g,'[/bracket]');
	val=val.replace(/\'/g,'[apos]');
	val=val.replace(/\"/g,'[quot]');
	val=val.replace(/\\/g,'[backslash]');
	return val;
}

function prepareTerm1(val)
{
	val=val.replace(/\[apos\]/g,"'");
	val=val.replace(/\[\/apos\]/g,"'");
	val=val.replace(/\[quot\]/g,'"');
	val=val.replace(/\[bracket\]/g,"");
	val=val.replace(/\[\/bracket\]/g,"");
	return val;
}

function prepareTerm(val)
{
	val=val.replace(/\[backslash\]\[apos\]/g,"\\\'");
	val=val.replace(/\[backslash\]\[quot\]/g,'\\\"');
	val=val.replace(/\[apos\]/g,"'");
	val=val.replace(/\[\/apos\]/g,"'");
	val=val.replace(/\[quot\]/g,'"');
	val=val.replace(/\&quot;/g,'"');
	val=val.replace(/\&amp;/g,'&');
	val=val.replace(/\[backslash\]/g,'\\\\');
	val=val.replace(/\[bracket\]/g,"(");
	val=val.replace(/\[\/bracket\]/g,")");
	return val;
}

function prepareTerm2(val)
{
	val=val.replace(/\(/g,'');
	val=val.replace(/\)/g,'');
	val=val.replace(/\,/g,'');
	val=val.replace(/\[/g,'');
	val=val.replace(/\]/g,'');
	val=val.replace(/&amp;/g,'&');
	return val;
}

function convertlimits(val)
{
	val=val.replace(/\'/g,'[apos]');
	val=val.replace(/\"/g,'[quot]');
	val=val.replace(/\(/g,'[bracket]');
	val=val.replace(/\)/g,'[/bracket]');
	return val;
}

function convertlimits2(val)
{
	val=val.replace(/\\\\/g,'[backslash]');
	val=val.replace(/\\\'/g,'[apos]');
	val=val.replace(/\\\"/g,'[quot]');
	val=val.replace(/\'/g,'[apos]');
	val=val.replace(/\"/g,'[quot]');
	val=val.replace(/\(/g,'[bracket]');
	val=val.replace(/\)/g,'[/bracket]');
	var tmp=/\\{1,}\[/g;
	if(tmp.test(val))
		val=val.replace(tmp,'[');
	return val;
}

function convertlinksearchstr(val)
{
	val=val.replace(/\[apos\]/g," ");
	val=val.replace(/\[\/apos\]/g," ");
	return val;
}

function convertlightstring(val)
{
	val=val.replace(/\[apos\] AND \[apos\]/g," ");
	val=val.replace(/\[apos\] OR \[apos\]/g," ");
	val=val.replace(/\[apos\] NOT \[apos\]/g," ");
	val=val.replace(/\[\/apos\] AND \[apos\]/g," ");
	val=val.replace(/\[\/apos\] OR \[apos\]/g," ");
	val=val.replace(/\[\/apos\] NOT \[apos\]/g," ");
	val=val.replace(/\[\/bracket\] AND \[bracket\]/g," ");
	val=val.replace(/\[\/bracket\] OR \[bracket\]/g," ");
	val=val.replace(/\[\/bracket\] NOT \[bracket\]/g," ");
	val=val.replace(/\[apos\]/g," ");
	val=val.replace(/\[\/apos\]/g," ");
	val=val.replace(/\[quot\]/g,' ');
	val=val.replace(/\&quot;/g,' ');
	val=val.replace(/\'/g,' ');
	val=val.replace(/\"/g,' ');
	val=val.replace(/\\/g,' ');
	val=val.replace(/\./g,' ');
	val=val.replace(/\-/g,' ');
	val=val.replace(/\,/g,' ');
	val=val.replace(/\*/g,' ');
	val=val.replace(/\[backslash\]/g,' ');
	val=val.replace(/\[bracket\]/g," ");
	val=val.replace(/\[\/bracket\]/g," ");
	val=val.replace(/\[/g,' ');
	val=val.replace(/\]/g,' ');
	val=val.replace(/\(/g,' ');
	val=val.replace(/\)/g,' ');
	val=val.replace(/\#/g,' ');
	val=val.replace(/\$/g,' ');
	val=val.replace(/\s{1,}/g," ");
	return val;
}

function findaddlabel(val)
{
	var lstr="";
	var farr=val.split(' ');
	for(var i=0; i<farr.length; i++)
	{
		var elem=trimSpaces(farr[i]);
		if(elem.indexOf('[bracket]') != -1)
			elem=elem.substring(elem.lastIndexOf('[bracket]')+9);
		if((elem!="")&&(typeof dbs[numdbBIBL]["labels"][elem] != "undefined"))
		{
			lstr=elem;
			break;
		}
	}
	if(lstr != "")
		return lstr;
	else
		return null;
}

function convertlightstring1(val)
{
	var lstr="";
	var count=0;
	for(var i=0; i<val.length; i++)
	{
		var elem=trimSpaces(val[i]);
		//elem=Trim2(elem);
		if((elem!="")&&(typeof dbs[numdbBIBL]["labels"][elem] == "undefined"))
		{
			if(count > 0)
				lstr+=' ';
			lstr+=elem;
			count++;
		}
	}
	return lstr;
}

function convertlightstring2(val)
{
	var farr=val.split(' ');
	var flarr=[];
	var count=0;
	for(var i=0; i<farr.length; i++)
	{
		var elem=trimSpaces(farr[i]);
		if(elem.length > 2)
		{
			if(typeof pretexts[elem.toLowerCase()] == "undefined")
			{
				if(elem.length > 4)
					flarr[count]=elem.substring(0,elem.length-2);
				else
					flarr[count]=elem.substring(0,elem.length-1);
				count++;
			}
		}
	}
	var lstr=flarr.join(' ');
	if(count > 0)
		return lstr;
	else
		return null;
}

function convertlightstring3(val)
{
	var str=convertlightstring(val);
	var lstr="";
	var larr=str.split('</i>');
	var count=0;
	for(var i=0; i<larr.length; i++)
	{
		if(larr[i]!="")
		{
			var elem="";
			if(larr[i].indexOf('<i>')!=-1)
				elem=larr[i].substring(0,larr[i].indexOf('<i>'));
			else
				elem=larr[i];
			if(elem != "")
			{
				var earr=elem.split(' ');
				for(var j=0; j<earr.length; j++)
				{
					if(earr[j] != "")
					{
						if(earr[j].length > 2)
						{
							if(/[0-9]/.test(earr[j]) == false)
							{
								if(typeof pretexts[earr[j].toLowerCase()] == "undefined")
								{
									if(count > 0)
										lstr+=' ';
									lstr+=earr[j];
									count++;
								}
							}
						}
					}
				}
			}
		}
	}
	return lstr;
}

function escapeRegExp(stringToGoIntoTheRegex)
{
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function prepareShowstring(s)
{
	if(s.indexOf('[bracket]')!=-1)
	{
		var ndb=numDB;
		if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
			ndb=_iddb;
		if(typeof dbs[ndb]!="undefined")
		{
			for(var key in dbs[ndb]["labels"])
			{
				var tmp1=escapeRegExp('[bracket]'+key+' ');
				var tmp2='[bracket]'+dbs[ndb]["labels"][key][0]+' ';
				s=s.replace(new RegExp(tmp1,'g'),tmp2);
			}
		}
	}
	s=s.replace(/ NOT /g,' НЕ ');
	s=s.replace(/ AND /g,' И ');
	s=s.replace(/ OR /g,' ИЛИ ');
	s=s.replace(/\[apos\]/g,' ');	
	s=s.replace(/\[\/apos\]/g,' ');
	s=s.replace(/\[br\]/g,' ');
	s=s.replace(/\[quot\]/g,' ');
	s=s.replace(/\[bracket\]/g,' ');	
	s=s.replace(/\[backslash\]/g,' ');	
	s=s.replace(/\[\/bracket\]/g,' ');
	s=s.replace(/\&quot\;/g,' ');
	s=s.replace(/\"/g,' ');
	s=s.replace(/\'/g,' ');
	s=s.replace(/\\/g,' ');
	s=s.replace(/\(/g,' ');
	s=s.replace(/\)/g,' ');
	s=s.replace(/\[/g,' ');
	s=s.replace(/\]/g,' ');
	s=s.replace(/\s{1,}/g," ");
	return s;
}

function prepareStr(s)
{
	var tmp=/\\{1,}/g;
	if(tmp.test(s))
		s=s.replace(tmp,'\\');
	return s;
}

function replaceS(val)
{
	val=val.replace(/\\/g,'\\\\');
	val=val.replace(/&quot;/g,'"');
	val=val.replace(/&apos;/g,"'");
	val=val.replace(/&#034;/g,'"');
	val=val.replace(/&#039;/g,"'");
	return val;
}

function replaceSymb(val)
{
	val=val.replace(/\\/g,'\\\\');
	val=val.replace(/\"/g,'\\\"');
	val=val.replace(/\'/g,"\\\'");
	//val=val.replace(/\\\\/g,'\\\\');
	return val;
}

function replaceSymb1(val)
{
	val=val.replace(/\&/g,'[amp]');
	return val;
}

function replaceSymb2(val)
{
	val=val.replace(/\\/g,'\\\\');
	val=val.replace(/\"/g,'\\\"');
	return val;
}

function replaceSymb3(val)
{
	val=val.replace(/\'/g,'');
	val=val.replace(/\"/g,'');
	return val;
}

function replaceSymb4(val)
{
	val=val.replace(/\'/g,'&apos;');
	val=val.replace(/\"/g,'&quot;');
	return val;
}

function replaceSymb5(val)
{
	val=val.replace(/\'/g,"\\'");
	val=val.replace(/\"/g,'\\"');
	return val;
}

function replaceSymb7(val)
{
	val=val.replace(/\'/g,'');
	val=val.replace(/\"/g,'');
	val=val.replace(/\\/g,'');
	return val;
}

function replaceS6(val)
{
	val=val.replace(/([a-zA-Zа-яА-ЯёЁ]|[0-9]+)\'([a-zA-Zа-яА-ЯёЁ]|[0-9]+)/g,"$1\\\'$2");
	val=val.replace(/\'\'/g,"'\\\'");
	val=val.replace(/\"/g,'\\\"');
	val=val.replace(/([a-zA-Zа-яА-ЯёЁ]|[0-9]+)\\([a-zA-Zа-яА-ЯёЁ]|[0-9]+)/g,"$1\\\\$2");
	return val;
}

function replaceMail(val)
{
	val=val.replace(/\\/g,'\\\\');
	val=val.replace(/\"/g,'\\\"');
	val=val.replace(/\'/g,"\\\'");
	val=val.replace(/\@/g,'[at]');
	val=val.replace(/\&/g,'[amp]');
	return val;
}

function trimBrackets(val)
{
	var tmp=/(^\s*\[\/*bracket\]\s*)|(\s*\[\/*bracket\]\s*$)/;
	while(tmp.test(val))
	{
		val=val.replace(tmp,'');
	}
	if((val!='OR')&&(val!='AND')&&(val!='NOT'))
		val=val+'|';
	return val;
}

function Trim2(val)
{
	val=val.replace(/[\<|\>|\"|\*|\'|\%|\:|\.|\,|\-|\_|\;|\(|\)|\&|\/]/g,'');
	return val;
}

function trimSpaces(val)
{
	val=val.replace(/^\s*/g,'');
	val=val.replace(/\s*$/g,'');
	val=val.replace(/\s{1,}/g," ");
	return val;
}

function Trim1(val)
{
	val=val.replace(/\.* *\, *`\-*/g,'');
	val=val.replace(/\.* *\, *\-*/g,'');
	val=val.replace(/\.* *\, *\-*/g,'');
	val=val.replace(/\. *\-*/g,'');
	val=val.replace(/^\. */g,'');
	return val;
}

function Trim()
{
	var val=new String(this);
	val=val.replace(/^\s*/g,'');
	val=val.replace(/\s*$/g,'');
	return val;
}

String.prototype.Trim=Trim;

Array.prototype.clean = function ()
{
	this.forEach(function (el, b, c)
	{
		if (el == undefined || el == null || el == "")
			c.splice(b,1);
	});
}

function findParent(el,cls)
{
    while ((el = el.parentNode) && el.className.indexOf(cls) < 0);
    return el;
}

var bbcodes=/*таблица соответствия ББ-кодов*/
{
	"(\\[i class=)(\\w+)(\\])":"<span class=\"$2\" onclick=\"showLable(this)\">",
	"[em]":"<em>",
	"[/em]":"</em>",
	"[b]":"<b>",
	"[/b]":"</b>",
	"[u]":"<u>",
	"[/u]":"</u>",
	"[br]":"<br/>",
	"[br/]":"<br/>",
	"[/br]":"",
	"[hr]":"<hr/>",
	"[hr/]":"<hr/>",
	"[div]":"<div>",
	"[/div]":"</div>",
	"[ANNOT]":"<div class=\"annot\">",
	"[/ANNOT]":"</div>",
	"[PHOTOTEXT]":"<div class=\"phototext\">",
	"[/PHOTOTEXT]":"</div>",
	"[VIDEOTEXT]":"<div class=\"videotext\">",
	"[/VIDEOTEXT]":"</div>",
	"[AUDIOTEXT]":"<div class=\"audiotext\">",
	"[/AUDIOTEXT]":"</div>",
	"[p]":"<p>",
	"[/p]":"</p>",
	"[ul]":"<ul class=\"bbc\">",
	"[/ul]":"</ul>",
	"[ol]":"<ol>",
	"[/ol]":"</ol>",
	"[li]":"<li>",
	"[/li]":"</li>",
	"[dl]":"<dl>",
	"[/dl]":"</dl>",
	"[dt]":"<dt>",
	"[/dt]":"</dt>",
	"[dd]":"<dd>",
	"[/dd]":"</dd>", 
	"[url]":"<a target=\"_blank\" href=\"",
	"[/url]":"\">",
	"[/urla]":"</a>",
	"[size=20]":"<span class=\"size20\">",
	"[size=18]":"<span class=\"size18\">",
	"[/size]":"</span>",
	"[lev0]":"<div class=\"space0\">",
	"[/lev0]":"</div>",
	"[lev1]":"<div class=\"space1\" data-title=\"увеличить\" onclick=\"zoomPicture(this)\">",
	"[/lev1]":"</div>",
	"[lev2]":"<div class=\"space2\">",
	"[/lev2]":"</div>",
	"[lev3]":"<span class=\"lev3\">",
	"[/lev3]":"</span>",
	"[indent]":"<span class=\"indent\">",
	"[/indent]":"</span>",
	"[quote]":"<blockquote>",
	"[/quote]":"</blockquote>",
	"[i]":"<span class=\"i\">",
	"[/i]":"</span>",
	"[color=red]":"<span class=\"red\">",
	"[color=blue]":"<span class=\"blue\">",
	"[color=orange]":"<span class=\"orange\">",
	"[color=violet]":"<span class=\"violet\">",
	"[/color]":"</span>",
	"[big]":"<span class=\"big\">",
	"[/big]":"</span>",
	"[show]":"<img src=\"",
	"[/show]":"\" hspace=\"10\" vspace=\"10\" align=\"right\" height=\"100\" />",
	"[img]":"<img src=\"",
	"[/img]":"\" hspace=\"10\" vspace=\"10\" align=\"right\" height=\"100\" />",
	//"[obj]":"<embed src=\"/ih/ih/img/uppod.swf\" type=\"application/x-shockwave-flash\" allowfullscreen=\"true\" flashvars=\"m=video&amp;file=",
	//"[/obj]":"\"></embed>",
	"[objT]":"<figcaption>",
	"[/objT]":"</figcaption>",
	"[h1]":"<div style=\"float:left\">",
	"[/h1]":"</div>",
	"[obj]":"<video src=\"",
	"[/obj]":"\" controls></video>",
	"[video]":"<video src=\"",
	"[/video]":"\" controls></video>",
	"[audio]":"<audio src=\"",
	"[/audio]":"\" controls></audio>",
	"[photo]":"<figure tabindex=\"1\"><img src=\"",
	"[/photo]":"\" title=\"\" alt=\"\" border=\"0\" hspace=\"0\" vspace=\"0\"/></figure>",
	"[uri]":"<a target=\"_blank\" href=\"",
	"[uriT]":"\">",
	"[/a]":"</a>",
	"[/uri]":"</a>",
	"[iframe":"<iframe",
	"][/iframe]":"></iframe>",
	"[amp]":"&",
	"[space] [/space]":"; ",
	/*"[i class=RP]":"<span class=\"RP\" onclick=\"showLable(this)\">",
	"[i class=AU]":"<span class=\"AU\" onclick=\"showLable(this)\">",
	"[i class=SH]":"<span class=\"SH\" onclick=\"showLable(this)\">",
	"[i class=TM]":"<span class=\"TM\" onclick=\"showLable(this)\">",
	"[i class=PU]":"<span class=\"PU\" onclick=\"showLable(this)\">",
	"[i class=PM]":"<span class=\"PM\" onclick=\"showLable(this)\">",
	"[i class=SE]":"<span class=\"SE\" onclick=\"showLable(this)\">",
	"[i class=KL]":"<span class=\"KL\" onclick=\"showLable(this)\">",
	"[i class=FGOS]":"<span class=\"FGOS\" onclick=\"showLable(this)\">",
	"[i class=FG]":"<span class=\"FG\" onclick=\"showLable(this)\">",
	"[i class=SC]":"<span class=\"SC\" onclick=\"showLable(this)\">",
	"[i class=TS]":"<span class=\"TS\" onclick=\"showLable(this)\">",
	"[i class=MS]":"<span class=\"MS\" onclick=\"showLable(this)\">",
	"[i class=KW]":"<span class=\"KW\" onclick=\"showLable(this)\">",
	"[i class=BC]":"<span class=\"BC\" onclick=\"showLable(this)\">",
	"[i class=UD]":"<span class=\"UD\" onclick=\"showLable(this)\">",
	"[i class=CA]":"<span class=\"CA\" onclick=\"showLable(this)\">",*/
	"[hide]":"<input class=\"searcht\" type=\"hidden\" value=\"",
	"[/hide]":"\"/>",
	"[code class=AF]":"<span class=\"AF\" title=\"см. в Авторитетном файле\" onclick=\"showLable(this)\"><input type=\"hidden\" value=\"",
	"[/code]":"\"/></span>"
};

function parseBB(v)/*замена ББ-кодов на теги*/
{
	var count=0;
	for(var key in bbcodes)
	{
		if(count == 0)
		{
			var tmp1=eval("/"+key+"/gi");
			if(tmp1.test(v))
			{
				v=v.replace(tmp1,bbcodes[key]);
			}
		}
		else
		{
			var tmp=eval("/"+addslash(key)+"/gi");
			if(tmp.test(v))
			{
				v=v.replace(tmp,bbcodes[key]);
			}
		}
		count++;
	}
	return v;
}

function deleteBB(v)/*удаление ББ-кодов*/
{
	for(var key in bbcodes)
	{
		var tmp=eval("/"+addslash(key)+"/gi");
		if(tmp.test(v))
		{
			v=v.replace(tmp,"");
		}
	}
	return v;
}


/*конец экранирование символов и строковые преобразования*/

function IsAlfaDigit(val)/*символ является цифрой или буквой латинского алфавита*/
{
	var temp=/\w/;
	var len=val.length;
	for(var i=0; i<len; i++)
	{
		if(!temp.test(val.charAt(i)))
		{
			return false;
		}
	}
	return true;
}

function makearr(a,s)/*разбиение элементов в массиве по разделителю*/
{
	arr=a.split(s);
	for(var i=0; i<arr.length; i++)
	{
		if(arr[i]!="")
		{
			if(arr[i].indexOf(s)==-1)
				rez.push(arr[i]);
			else
				rez.push(makearr(arr[i]));
		}
	}
	return rez;
}

function findArrIndex(k,arr)/*индекс элемента в массиве*/
{
	var l=arr.length;
	for(var i=0; i<l; i++)
	{
		if(arr[i][1].id == k)
		{
			return i;
		}
	}
	return -1;
}

function unique(u)/*подавление повторов в массиве*/
{
	var result = [], i = 0, j = 0, length = u.length;
	while (i < length)
	{
		var I = u[i++][0], k = j;
		while (k-- && result[k][0] !== I);
		if (k < 0) result[j++] = [I,u[i-1][1]];
	}
	return result;
}

function getcNode(rNode)/*поиск узла в дереве xml*/
{
	var cNode=null;
	if(rNode.hasChildNodes())
	{
		var children = rNode.childNodes;
		for(var j=0; j<children.length; j++)
		{
			if(children[j].nodeType==1)
			{
				cNode=children[j];
				break;
			}
		}
	}
	return cNode;
}

function getcNodeByName(rNode,name)/*поиск узла в дереве по имени xml*/
{
	var cNode=null;
	if(rNode.hasChildNodes())
	{
		var children = rNode.childNodes;
		for(var j=0; j<children.length; j++)
		{
			if(children[j].nodeType==1)
			{
				if(children[j].nodeName.toLowerCase()==name)
				{
					cNode=children[j];
					break;
				}
			}
		}
	}
	return cNode;
}

/*отправка запросов*/

function sendForm(queryArr,target,action,method,width,height)
{
	this.queryArr=queryArr;
	this.target=target || "_self";
	this.action=action || pathactrcp;
	this.method=method || "post";
	this.width=width || screen.availWidth;
	this.height=height || screen.availHeight;
	this.formSubmit=formSubmit;
	this.ajaxForm=ajaxForm;
}

function formSubmit()
{
	var today=new Date();
	var seconds=today.getTime();
	var NameWin="n"+seconds+Math.floor(Math.random()*9999);
	var Scr="alwaysRaised=yes,menubar=yes,width=" + this.width + ",height=" + this.height +
		",left=" + parseInt(((screen.availWidth-1)-this.width)/2) + ",top=" + parseInt(((screen.availHeight-1)-this.height)/2) +
		",resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no";
	var doc, src;
	if(typeof this.target=="string")
	{
		switch(this.target)
		{
			case "_new":	var win=window.open('', NameWin);
							if(win!=null)
							{
								doc=win.document;
								src=win.name;
								doc.open();
								doc.write('<html><head><title>send</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta http-equiv="Content-Script-Type" content="text/javascript"/><meta http-equiv="cache-control" content="no-cache"/></head><body style="background: #fff; font: bold 18px Times, serif; color: red; text-align: center;"><p>Пожалуйста, подождите...</p></body></html>');
								doc.close();
							}
							else
							{
								alert("Невозможно завершить операцию!\nВаш броузер блокирует всплывающие окна.");
								return;
							}
							break;
			default:	doc=document;
						src=this.target;
						break;
		}
	}
	else
	{
		if((this.target.window)&&(this.target.window.document))
			doc=this.target.window.document;
		else
			doc=this.target.contentDocument || this.target.contentWindow.document;
		if((this.target.window)&&(this.target.window.name))
			src=this.target.window.name;
		else
			src=this.target.name;
	}
	if(typework!="")
	{
		if((typework=="authorization")||(typework.indexOf('template')!=-1))
			this.queryArr.push(["_oldsean",numsean]);
		else
			this.queryArr.push(["_numsean",numsean]);
	}
	if(typeof _auth!="undefined")
		this.queryArr.push(["_auth",_auth]);
	var cont=take(document.body);
	if(cont.hasclass('blind_panel'))
	{
		if((typeof _sheet !="undefined")&&(cont.hasclass(_sheet)))
			cont.delclass(_sheet);
		bodyclass=document.body.className;
	}
	else
		bodyclass="";
	if(bodyclass!="")
		this.queryArr.push(["_bodyclass",bodyclass]);
	var frm=doc.createElement('form');
	for(var i=0; i<this.queryArr.length; i++)
	{
		var field=doc.createElement('input');
		field.type="hidden";
		field.name=this.queryArr[i][0];
		field.value=this.queryArr[i][1];
		frm.appendChild(field);
	}
	doc.body.appendChild(frm);
	frm.action=this.action;
	frm.method=this.method;
	frm.target=src;
	frm.submit();
}

var ajaxForm= 
{
	XHRobj: function ()
	{
		try
		{
			return new XMLHttpRequest() || new window.XDomainRequest();
		}
		catch(e) {}
		try
		{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) {}
		try 
		{
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (e) {}			  	           
		return null;
	},
	send: function(arr,callback,act,hdr,callerror,add,json,method)
	{
		var xhr=ajaxForm.XHRobj();
		var pstr="";
		if(act==null)
			act=pathactrcp;
		if(arr!=null)
			pstr=serializeData(arr);
		else
		{
			if((typeof json !="undefined")&&(json!=0))
				pstr=json;
		}
		if(xhr)
		{
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == 4)
				{
					if (xhr.status == 200)
					{
						if(callback!=null)
						{
							callback(xhr,add);
						}
						xhr=null;
					}
					else
					{
						if(callerror!=null)
						{
							callerror(xhr);
						}
					}
				}
			}
			if(pstr!="")
			{
				if(typeof method == "undefined")
					method="post";
				xhr.open(method, act, true);
				if((typeof hdr=="undefined")||(hdr==null))
				{
					xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
				}
				else
				{
					for(var i=0; i<hdr.length; i++)
					{
						xhr.setRequestHeader(hdr[i].name,hdr[i].value);
					}
				}
				xhr.send(pstr);
			}
			else
			{
				xhr.open("get", act, true);
				if((typeof hdr!="undefined")&&(hdr!=null))
				{
					for(var i=0; i<hdr.length; i++)
					{
						xhr.setRequestHeader(hdr[i].name,hdr[i].value);
					}
				}
				xhr.send(null);
			}
		}
	}
};

function serializeData(arr)
{
	var qstr="";
	for(var i=0; i<arr.length; i++)
	{
		qstr+=arr[i][0]+"="+encodeURIComponent(arr[i][1]);
		if(i<arr.length-1)
			qstr+="&";
	}
	return qstr;
}

function prepareQueryString(arr,ndb)/*сериализация строки запроса*/
{
	if(typeof ndb!="undefined")
		arr=addGlobalsToQuery(arr,ndb);
	else
		arr=addGlobalsToQuery(arr);
	var qstr="";
	for(var i=0; i<arr.length; i++)
	{
		qstr+="<"+arr[i][0]+">"+arr[i][1];
		if(i<arr.length-1)
			qstr+="[separator]";
	}
	return qstr;
}

function addGlobalsToQuery(arr,ndb)/*добавление постоянных параметров к запросу*/
{
	var db=numdbBIBL;
	if(typeof numDB!="undefined")
	{
		db=numDB;
	}
	else
	{
		if(typeof _localiddb!="undefined")
			db=_iddb;
	}
	if(typeof ndb !="undefined")
	{
		db=ndb;
	}
	if((typeof dbs[db]!="undefined")&&(typeof dbs[db]["brokerid"]!="undefined"))
	{
		arr.push(["_brokerid",dbs[db]["brokerid"]]);
		arr.push(["$brokerid",db+":"+dbs[db]["brokerid"]]);
	}
	if((typeof dbs[db]!="undefined")&&(typeof dbs[db]["fundlogin"]!="undefined"))
	{
		arr.push(["userId",dbs[db]["fundlogin"]]);
	}
	else
	{
		arr.push(["userId",identif]);
	}
	if(typework!="")
	{
		if(typework=="search")
		{
			var larr=[];
			var lstr="";
			if((typeof iddb!="undefined")&&(typeof iddb[db]!="undefined"))
			{
				if(typeof iddb[db][5]!="undefined")
				{
					larr=iddb[db][5];
					for(var i=0; i<larr.length; i++)
					{
						//alert(larr[i][0]);
						if((larr[i][0]=="043")||(larr[i][0]=="058")||(larr[i][0]=="059")||(larr[i][0]=="076")||(larr[i][0]=="066")||(larr[i][0]=="068")||(larr[i][0]=="069")||(larr[i][0]=="070")||(larr[i][0]=="077")||(larr[i][0]=="078")||(larr[i][0]=="079"))
							lstr+=larr[i][0]+'[ID]'+larr[i][1]+'[END]';
					}
				}
			}
			if(lstr!="")
				arr.push(["$linkstring",lstr]);
			if((typesearch=="simple")||(typesearch=="expand")||(typesearch=="professional")||(typesearch=="fulltext")||(typesearch=="combined"))
			{
				if(typeof SearchLevels != "undefined")
				{
					for(var i=0;i<SearchLevels.length;i++)
						arr.push(["level[" + i + "]",SearchLevels[i]]);
				}
				arr.push(["highlight/limit",portion]);
				arr.push(["highlight/fields[0]","TEXT"]);
				//arr.push(["highlight/fields[0]","*"]);
				//arr.push(["highlight/tagPost","[/em]"]);
				//arr.push(["highlight/tagPre","[em]"]);
			}
			if(lockedfilters!="")
				arr.push(["$lockedfilters",lockedfilters]);
			if(swfterm!="")
				arr.push(["$swfterm",swfterm]);
			if(typeof usesort!="undefined")
			{
				arr.push(["$usesort",usesort]);
				if(typeof usesortlabel!="undefined")
					arr.push(["$usesortlabel",usesortlabel]);
			}
			arr.push(["$typesearch",typesearch]);
			if((typeof _newrecs != "undefined")&&(_newrecs != ""))
				arr.push(["$newrecs",_newrecs]);
			if(typeof _month != "undefined")
				arr.push(["$month",_month]);
			if(typeof _year != "undefined")
				arr.push(["$year",_year]);
			if((typeof _sign != "undefined")&&(_sign != null))
				arr.push(["$sign",_sign]);
		}
		if(showstr != "")
		{
			arr.push(["$bibliostring",convertlightstring3(showstr)]);
		}
		if(typeof uselight!="undefined")
		{
			if(lightstring!="")
			{
				var fls=trimSpaces(lightstring);
				var lls=convertlightstring2(fls);
				if(lls != null)
				{
					arr.push(["$lightstring",lls.toLowerCase()]);
					arr.push(["$lockedstring",lls.toLowerCase()])
				}
			}
			else
			{
				if(lockedstring!="")
				{
					arr.push(["$lockedstring",lockedstring.toLowerCase()]);
					if(savedstring!="")
						arr.push(["$lightstring",savedstring.toLowerCase()]);
					else
						arr.push(["$lightstring",lockedstring.toLowerCase()]);
				}
			}
		}
		if(typeof _localiddb!="undefined")
		{
			arr.push(["$localiddb",_localiddb]);
			arr.push(["_iddb",_iddb]);
		}
		else
		{
			if(typework=="searchallbases")
				arr.push(["_iddb",numdbBIBL]);
			else
				arr.push(["_iddb",db]);
		}
		if(typeof _skin!="undefined")
			arr.push(["$skin",_skin]);
		if(typeof _ltitle!="undefined")
			arr.push(["$ltitle",replaceSymb(_ltitle)]);
		if(typeof _lind!="undefined")
			arr.push(["$lind",replaceSymb(_lind)]);
		if(typeof _laddress!="undefined")
			arr.push(["$laddress",replaceSymb(_laddress)]);
		if(typeof _sigla!="undefined")
			arr.push(["$sigla",_sigla]);
		if(typeof _site!="undefined")
			arr.push(["$site",_site]);
		if(typeof _elcat!="undefined")
			arr.push(["$elcat",_elcat]);
		if(addfilters!="")
		{
			addfilters=addfilters.replace(/\"/g,'\\\"');
			addfilters=prepareStr(addfilters);
			arr.push(["$addfilters",addfilters]);
		}
		arr.push(["$typework",typework]);
	}
	if(basequant!="")
		arr.push(["$basequant",basequant]);
	else
	{
		if(typeof _basequant!="undefined")
			arr.push(["$basequant",_basequant]);
	}
	if(flag45)
		arr.push(["$flag45","yes"]);
	return arr;
}

function callToRCP(qArr,trg,pathactrcp,method,w,h)
{
	var qFrm=new sendForm(qArr,trg,pathactrcp,method,w,h);
	qFrm.formSubmit();
	qFrm=null;
}

function ajaxToRCP(qArr,collback,act,hdr,collerror,add,json,method)
{
	if(typeof add=="undefined")
		add=0;
	if(typeof json=="undefined")
		json=0;
	var qFrm=new sendForm(qArr,collback,act,hdr,collerror,add,json,method);
	qFrm.ajaxForm.send(qArr,collback,act,hdr,collerror,add,json,method);
	qFrm=null;
}

/*конец отправка запросов*/

/*класс для работы с DOM*/

function _take(arg)
{
	this.d=document;
	if(docEl!=null)
		this.d=docEl.document;
	if (typeof arg=='string')
		this.n=this.d.getElementById(arg);
	else
		 this.n=arg;
}

_take.prototype=
{
	text: function(arg)
	{
		var chld=new _take(this.d.createTextNode(arg));
		this.n.appendChild(chld.n);
		try
		{
			return chld;
		}
		finally
		{
			chld=null;
		}
	},
	create: function(tag,arg)
	{
		var chld=new _take(this.d.createElement(tag));
		for (var key in arg)
		{
			var value = arg[key];
			if(key=='textNode')
				chld.n.appendChild(this.d.createTextNode(value));
			else if(key=='className')
				eval('chld.n.'+key+'=value');
			else if(key.substring(0,2)=='on')
				eval('chld.n.'+key+'='+value);
			else if(key=='style')
			{
				for (prop in value)
					eval('chld.n.'+key+'.'+prop+'=value[prop]');
			}
			else
			{
				chld.n.setAttribute(key, value);
			}
		}
		this.n.appendChild(chld.n);
		try
		{
			return chld;
		}
		finally
		{
			chld=null;
		}
	},
	createNS: function(NS,tag,arg)
	{
		var chld=new _take(this.d.createElementNS(NS,tag));
		for (var key in arg)
		{
			var value = arg[key];
			if(key.substring(0,2)=='on')
				eval('chld.n.'+key+'='+value);
			else if(key=='style')
			{
				for (prop in value)
					eval('chld.n.'+key+'.'+prop+'=value[prop]');
			}
			else
			{
				var attr=this.d.createAttribute(key);
				chld.n.setAttributeNS(null,key,value);
			}
		}
		this.n.appendChild(chld.n);
		try
		{
			return chld;
		}
		finally
		{
			chld=null;
		}
	},
	tags: function(tag)
	{
		if(this.n!=null)
			return this.n.getElementsByTagName(tag.toLowerCase());
		else
			return;
	},
	setattr: function(NS,attr,val)
	{
		if(this.n!=null)
		{
			if(NS!=null)
			{
				this.n.removeAttributeNS(null,attr)
				return this.n.setAttributeNS(null,attr,val);
			}
			else
			{
				this.n.removeAttribute(attr)
				return this.n.setAttribute(attr, val);
			}
		}
		else
			return;
	},
	getpart: function(NS,tag,sign)
	{
		if(this.n!=null)
		{
			var arr=new Array();
			var parr=[];
			if(NS!=null)
				parr=this.d.getElementsByTagNameNS(NS,tag.toLowerCase());
			else
				parr=this.n.getElementsByTagName(tag.toLowerCase());
			for (var i=0; i<parr.length; i++)
			{
				for(var key in sign)
				{
					if(eval("parr[i]."+key).indexOf(sign[key])!=-1)
						arr.push(parr[i]);
				}
			}
			try
			{
				return arr;
			}
			finally
			{
				arr=null;
			}
		}
	},
	hasclass: function(sign)
	{
		if(this.n!=null)
		{
			var elcl=this.n.className;
			return (elcl.length > 0 && (elcl == sign || new RegExp("(^|\\s)" + sign + "(\\s|$)").test(elcl)));
		}
	},
	addclass: function(sign)
	{
		if(this.n!=null)
		{
			if(!(new _take(this.n)).hasclass(sign))
				 this.n.className += (this.n.className ? ' ' : '') + sign;
		}
	},
	delclass: function(sign)
	{
		if(this.n!=null)
		{
			if((new _take(this.n)).hasclass(sign))
				 this.n.className = this.n.className.replace(new RegExp("(^|\\s+)" + sign + "(\\s+|$)"), ' ').Trim();
		}
	},
	switchclass: function(sign1,sign2)
	{
		if(this.n!=null)
		{
			var obj=new _take(this.n);
			if(obj.hasclass(sign1))
			{
				obj.delclass(sign1);
				obj.addclass(sign2);
			}
			else
			{
				obj.delclass(sign2);
				obj.addclass(sign1);
			}
		}
	},
	getsign: function(tag,sign)
	{
		if(this.n!=null)
		{
			var arr=new Array();
			var parr=this.n.getElementsByTagName(tag.toLowerCase());
			for (var i=0; i<parr.length; i++)
			{
				for(var key in sign)
				{
					if(key=='className')
					{
						var tmp = new RegExp("(^|\\s)" + sign[key]+ "(\\s|$)");
						if(tmp.test(parr[i].className))
							arr.push(parr[i]);
					}
					else
					{
						if(sign[key]=='')
						{
							if(eval("parr[i]."+key))
								arr.push(parr[i]);
						}
						else
						{
							if (eval("parr[i]."+key)==sign[key])
								arr.push(parr[i]);
						}
					}
				}
			}
			try
			{
				return arr;
			}
			finally
			{
				arr=null;
			}
		}
	},
	getx: function()
	{
		if(this.n!=null)
			return this.n.offsetLeft;
		else
			return;
	},
	gety: function()
	{
		if(this.n!=null)
			return this.n.offsetTop;
		else
			return;
	},
	getw: function()
	{
		if(this.n!=null)
			return this.n.offsetWidth;
		else
			return;
	},
	geth: function()
	{
		if(this.n!=null)
			return this.n.offsetHeight;
		else
			return;
	},
	getb: function()
	{
		if(this.n!=null)
			return this.n.offsetHeight+this.n.offsetTop;
		else
			return;
	},
	getr: function()
	{
		if(this.n!=null)
			return this.n.offsetWidth+this.n.offsetLeft;
		else
			return;
	},
	setx: function(x)
	{
		if(this.n!=null)
			return this.n.style.left=x+"px";
		else
			return;
	},
	sety: function(y)
	{
		if(this.n!=null)
			return this.n.style.top=y+"px";
		else
			return;
	},
	setw: function(w)
	{
		if(this.n!=null)
			return this.n.style.width=w+"px";
		else
			return;
	},
	seth: function(h)
	{
		if(this.n!=null)
			return this.n.style.height=h+"px";
		else
			return;
	},
	transparency: function(arg)
	{
		if(this.n!=null)
		{
			var support = "opacity" in this.n.style;
			if(support)
				return (arg!=10)?this.n.style.opacity='0.'+arg:this.n.style.opacity='10';
			else
				return (arg!=10)?this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+arg+'0)':this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
		}
		else
			return;
	},
	fade: function(arg)
	{
		if(this.n!=null)
		{
			var support = "opacity" in this.n.style;
			if(support)
				return this.n.style.opacity=arg/100;
			else
				return this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+arg+')';
		}
		else
			return;
	},
	visualise: function()
	{
		if(this.n!=null)
			return this.n.style.visibility="visible";
		else
			return;
	},
	conceal: function()
	{
		if(this.n!=null)
			return this.n.style.visibility="hidden";
		else
			return;
	},
	show: function()
	{
		if(this.n!=null)
			return this.n.style.display="";
		else
			return;
	},
	hide: function()
	{
		if(this.n!=null)
			return this.n.style.display="none";
		else
			return;
	},
	addevent: function(e,t,f)
	{
		if(this.d.addEventListener)
			this.d.addEventListener(e,t,false);
		else
			eval('this.d'+'.on'+e+'='+'t');
	},  
	stopevent: function(event)
	{
		if(this.d.stopPropagation)
			this.d.stopPropagation();
		else
			this.d.cancelBubble=true;
	},  
	delevent: function(t,f)
	{
		if(this.d.attachEvent)
			this.d.detachEvent('on'+t,f,true);
		else
			this.d.removeEventListener(t,f,false);
	},
	initevent: function(e)
	{
		var event=this.d.createEvent('Event');
		event.initEvent(e, true, true);
		this.n.dispatchEvent(event);
	}
};

function take(arg)
{
	return new _take(arg);
}

/*конец класс для работы с DOM*/

/*слой-имитация нового окна*/

var delta_x = 0;
var delta_y = 0;
var delta_w = 0;
var delta_h = 0;
var w_block = 0;
var h_block = 0;

function startMove(e)/*начало движения слоя-окна*/
{
	movable=true;
	var o;
	var c;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		c=e.srcElement;
		o=e.srcElement.parentNode.parentNode;
		x = e.clientX;
		y = e.clientY;
	}
	else
	{
		c=e.target;
		o=e.target.parentNode.parentNode;
		x = e.pageX;
		y = e.pageY;
	}
	if(c.className=='pheader')
	{
		delta_x = o.offsetLeft - x;
		delta_y = o.offsetTop - y;
		o.onmousemove = moveThis;
	}
}

function stopMove(e)/*остановка движения слоя-окна*/
{
	movable=false;
	document.onmousemove = null;
	e = e || window.event;
	e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true);
}

function moveThis(e)/*движение слоя-окна*/
{
	if(!movable)
		return;
	var o;
	var c;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		c=e.srcElement;
		o=e.srcElement.parentNode.parentNode;
		x = e.clientX;
		y = e.clientY;
	}
	else
	{
		c=e.target;
		o=e.target.parentNode.parentNode;
		x = e.pageX;
		y = e.pageY;
	}
	if(docEl.getSelection)
		docEl.getSelection().removeAllRanges();
    else
		if(docEl.document.selection && docEl.document.selection.clear)
			docEl.document.selection.clear();
	if(c.className=='pheader')
	{
		o.style.top = delta_y + y + "px";
		o.style.left = delta_x + x + "px";
	}
}

function startScale(e)/*начало масштабирования слоя-окна*/
{
	scalable=true;
	var o;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		o=e.srcElement;
		x = e.clientX;
		y = e.clientY;
	}
	else
	{
		o=e.target;
		x = e.pageX;
		y = e.pageY;
	}
	if(o.className.indexOf('dialog')!=-1)
	{
		var obj=take(o);
		__l=obj.getx();
		__t=obj.gety();
		__x=x + pageOffset().x-obj.getx();
		__y=y + pageOffset().y-obj.gety();
		__w=obj.getw();
		__h=obj.geth();
		__r=obj.getr();
		__b=obj.getb();
		__xx=x + pageOffset().x;
		__yy=y + pageOffset().y;
		obj=null;
		o.onmousemove=toScale;
	}
}

function stopScale(e)/*остановка масштабирования слоя-окна*/
{
	scalable=false;
	document.onmousemove = null;
	e = e || window.event;
	e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true);
}

function toScale(e)/*масштабирование слоя-окна*/
{
	if(!scalable)
		return;
	var o;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		o=e.srcElement;
		x = e.clientX;
		y = e.clientY;
	}
	else
	{
		o=e.target;
		x = e.pageX;
		y = e.pageY;
	}
	if(docEl.getSelection)
		docEl.getSelection().removeAllRanges();
    else
		if(docEl.document.selection && docEl.document.selection.clear)
			docEl.document.selection.clear();
	if(o.className.indexOf('dialog')!=-1)
	{
		var obj=take(o);
		var h=(isIE)?docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight:window.innerHeight;
		var w=(isIE)?docEl.document.body.clientWidth||docEl.document.documentElement.clientWidth:docEl.innerWidth;
		var oX = parseInt(o.style.left);
		var oY = parseInt(o.style.top);
		var oW = o.offsetWidth;
		var oH = o.offsetHeight;
		cx=e.clientX + pageOffset().x;
		cy=e.clientY + pageOffset().y;
		dx=cx-__x;
		dy=cy-__y;
		xm=__r-oW/2;
		ym=__b-oH/2;
		var minw=100;
		var minh=100;
		if((cx==xm)||(cy==ym))
		{
			obj=null;
			return;
		}
		if(cx<xm)
		{
			sw=__r-dx;
		}
		if(cx>xm)
		{
			sw=__w+(cx-__xx);
			dx=oX;
		}
		if(cy>ym)
		{
			sh=__h+(cy-__yy);
			dy=__t;
		}
		if(cy<ym)
		{
			sh=__b-dy;
		}

		if(obj.gety()<pageOffset().y)
		{
			dy=pageOffset().y;
			sh=__b-dy;
		}
		if(obj.getx()<pageOffset().x)
		{
			dx=pageOffset().x;
			sw=__r-dx;
		}
		if((obj.getr()-pageOffset().x)>w)
			sw=w-__l-5;
		if((obj.getb()-pageOffset().y)>h)
			sh=h-__t-5;
		if((sw>minw)&&(sh>minh))
		{
			obj.setx(dx);
			obj.sety(dy);
			obj.setw(sw);
			obj.seth(sh);
			var fobj=take(o.firstChild);
			var lobj=take(o.firstChild.lastChild);
			fobj.setw(sw-10);
			fobj.seth(sh-10);
			lobj.setw(sw-10);
			lobj.seth(sh-35);
			__r=dx+sw;
			__b=dy+sh;
			__l=dx;
			__t=dy;
			__w=sw;
			__h=sh;
			__xx=cx;
			__yy=cy;
			fobj=null;
			lobj=null;
			obj=null;
		}
	}
}

function stopEffects(e)/*отмена движения и масштабирования*/
{
	movable=false;
	scalable=false;
	document.onmousemove = null;
	e = e || window.event;
	e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true);
}

function unWrapLayer(e)/*сворачивание слоя-окна*/
{
	stopEffects(e);
	var o;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		o=e.srcElement;
	}
	else
		o=e.target;
	o.className='wrap';
	o.onmousedown=wrapLayer;
	o.title='Развернуть';
	var doc=o.parentNode.parentNode.parentNode;
	var tdoc=take(doc);
	var ind=doc.id;
	hideBgDiv(ind+'bgdiv');
	if(typeof (wraparr[ind])=='undefined')
		wraparr[ind]=new Array();
	if(wraparr[ind].length!=0)
		wraparr[ind].length=0;
	wraparr[ind]=([tdoc.getw(),tdoc.geth()]);
	tdoc.seth(40);
	var fobj=take(doc.firstChild);
	var lobj=take(doc.lastChild);
	var llobj=take(doc.lastChild.lastChild);
	fobj.seth(40);
	lobj.seth(32);
	llobj.hide();
	tdoc.setx(0);
	var h=(isIE)?docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight:docEl.innerHeight;
	tdoc.sety(h-40);
	doc.style.overflow='hidden';
	tdoc=fobj=lobj=llobj=null;
}

function wrapLayer(e)/*разворачивание слоя-окна*/
{
	stopEffects(e);
	var o;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		o=e.srcElement;
	}
	else
		o=e.target;
	o.className='unwrap';
	o.onmousedown=unWrapLayer;
	o.title='Свернуть';
	var doc=o.parentNode.parentNode.parentNode;
	var tdoc=take(doc);
	var ind=doc.id;
	showBgDiv(ind+'bgdiv');
	var y=(isIE)?((docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight)-wraparr[ind][1])/2:(docEl.innerHeight-wraparr[ind][1])/2;
	var x=(isIE)?((docEl.document.body.clientWidth||docEl.document.documentElement.clientWidth)-wraparr[ind][0])/2:(docEl.innerWidth-wraparr[ind][0])/2;
	tdoc.setx(x);
	tdoc.sety(y);
	var fobj=take(doc.firstChild);
	var lobj=take(doc.lastChild);
	var llobj=take(doc.lastChild.lastChild);
	fobj.seth(wraparr[ind][1]);
	lobj.seth(wraparr[ind][1]-10);
	llobj.show();
	tdoc.seth(wraparr[ind][1]);
	tdoc.setw(wraparr[ind][0]);
	var i=0;
	for(var key in wraparr)
	{
		if(key==ind)
		{
			wraparr.splice(i,1);
			break;
		}
		i++;
	}
	tdoc=fobj=lobj=llobj=null;
}

function delLayerWin()/*удаление слоя-окна*/
{
	try
	{
		var i=arrwin.length-1;
		var par=arrwin[i][0];
		var div=arrwin[i][1];
		var arg=arrwin[i][2];
		arrwin.splice(i,1);
		countwin--;
		deleteBgDiv(div);
		par.removeChild(div);
		var body=(docEl!=null)?docEl.document.body:document.body;
		if(countwin < 1)
			body.style.overflow='';
		var calendar=take(body).getsign('div',{className:'calendar'});
		var len=calendar.length;
		if(len > 0)
		{
			for(var i=0; i<len; i++)
			{
				body.removeChild(calendar[i]);
			}
		}
		if(arg!="")
			eval(arg);
		if(countwin < 1)
		{
			if(scrollobj!=null)
			{
				scrollobj.scrollIntoView();
			}
			scrollobj=null;
		}
	}
	catch(e){};
}

function createBgDiv(ind,count)/*подложка слоя-окна*/
{
	if(docEl==null)
	{
		if(this.nodeName)
			docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
		else
			docEl=this;
	}
	var container=docEl.document.body;
	var tcontainer=take(container);
	var bgdiv=tcontainer.create('div',{id: ind, className: 'bgdiv', style: {position:'absolute', top: '0px', left: '0px', width: container.scrollWidth+'px', height: container.scrollHeight+'px', zIndex: 99999+count}});
	bgdiv.transparency(5);
	if(isIE)
	{
		var div=take(ind);
		if(div.n.previousSibling)
		{
			if((div.n.previousSibling.previousSibling)&&(div.n.previousSibling.previousSibling.id.indexOf('win')!=-1))
			{
				var par=div.n.previousSibling.previousSibling;
				var tpar=take(par);
				tpar.hide();
				tpar=null;
			}
		}
		div=null;
	}
	return bgdiv;
}

function deleteBgDiv(ind)/*удаление подложки слоя-окна*/
{
	if(typeof ind!="string")
		ind=ind.previousSibling;
	var div=take(ind);
	if(div.n!=null)
	{
		if(isIE)
		{
			if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
			{
				var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;
				var tpar=take(par);
				tpar.show();
				tpar=null;
			}
		}
		div.n.parentNode.removeChild(div.n);
		div=null;
	}
	return;
}

function hideBgDiv(ind)/*для IE скрытие подложки при сворачивании слоя-окна*/
{
	var div=take(ind);
	if(div.n!=null)
	{
		div.hide();
		if(isIE)
		{
			if(div.n.parentNode)
			{
				if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
				{
					var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;
					var tpar=take(par);
					tpar.show();
					tpar=null;
				}
			}
		}
	}
	div=null;
	return;
}

function showBgDiv(ind)/*для IE открытие подложки при разворачивании слоя-окна*/
{
	var div=take(ind);
	if(div.n!=null)
	{
		div.show();
		if(isIE)
		{
			if(div.n.parentNode)
			{
				if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
				{
					var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;
					var tpar=take(par);
					tpar.hide();
					tpar=null;
				}
			}
		}
	}
	div=null;
	return;
}

function showLayerWin(ind,arg)/*открытие слоя-окна*/
{
	var msg=layopen=layclose=divframe=callback=disabled="";
	var t=w=h=len=0;
	var src="about:blank";
	var scrolling="no";
	var callbackname="Выполнить";
	var cls="dialog";
	var browsed="";
	var forlinks="";
	var closename="Закрыть";
	var multipart="application/x-www-form-urlencoded";
	var dispatcher="closeThisWin";
	var closeel=null;
	docEl=self;
	if(arg!=null)
	{
		for (var key in arg)
		{
			var value = arg[key];
			if(key=='target')/*где строить окно*/
				docEl=eval(value);
			if(key=='cls')/*стиль окна*/
				cls=value;
			if(key=='browsed')/*просмотр ЭД*/
				browsed=value;
			if(key=='forlinks')/*ссылки*/
				forlinks=value;
			if(key=='message')/*имя окна*/
				msg=value;
			if(key=='src')/*если divframe:1, - src iframe*/
				src=value;
			else if(key=='width')/*ширина окна*/
				w=value;
			else if(key=='height')/*высота окна*/
				h=value;
			else if(key=='layopen')/*сворачивание фреймсета*/
				layopen=value;
			else if(key=='layclose')/*разворачивание фреймсета*/
				layclose=value;
			else if(key=='divframe')/*если divframe:1, - строить iframe*/
				divframe=value;
			else if(key=='scrolling')/*если scrolling есть, - включить прокрутку*/
				scrolling=value;
			else if(key=='callback')/*если есть кнопка "Выполнить" - функция, которая выполняется по нажатию*/
				callback=value;
			else if(key=='callbackname')/*если есть кнопка "Выполнить" - ее название*/
				callbackname=value;
			else if(key=='closename')/*кнопка "Закрыть" - ее название*/
				closename=value;
			else if(key=='multipart')/*если файл - multipart/form-data*/
				multipart=value;
			else if(key=='dispatcher')/*если нужен особый обработчик ESC / ENTER*/
				dispatcher=value;
			else if(key=='disabled')/*если есть кнопка "Выполнить" и она по умолчанию неактивна*/
				disabled=value;
		}
		if(layopen!="")
			eval(layopen);
	}
	if(browsed=="")
	{
		docEl.scrollTo(0,0);
		docEl.document.body.style.overflow='hidden';
	}
	var ww=document.compatMode=='CSS1Compat' && !window.opera?docEl.document.documentElement.clientWidth:docEl.document.body.clientWidth;
	var dl=document.compatMode=='CSS1Compat' && !window.opera?docEl.document.documentElement.scrollLeft:docEl.document.body.scrollLeft;
	var dt=document.compatMode=='CSS1Compat' && !window.opera?docEl.document.documentElement.scrollTop:docEl.document.body.scrollTop;
	var hw=document.compatMode=='CSS1Compat' && !window.opera?docEl.document.documentElement.clientHeight:docEl.document.body.clientHeight;
	var container=(docEl!=null)?docEl.document.body:document.body;
	var tcontainer=take(container);
	if(browsed=="")
	{
		if(w=="")
			w=ww-20;
		else
		{
			if(w.indexOf('%')!=-1)
				w=ww/100*(w.substring(0,w.length-1));
		}
		if(h=="")
			h=hw-20;
		else
		{
			if(h.indexOf('%')!=-1)
				h=hw/100*(h.substring(0,h.length-1));
		}
		len=(ww-w)/2+dl;
		t=(hw-h)/2+dt;
	}
	else
	{
		w=ww-2;
		h=hw-2;
		len=10+dl;
		t=1+dt;
	}
	if(forlinks!="")
	{
		w=w-100;
		len=len+50;
	}
	var inner=null;
	var bgdiv=null;
	var div=null;
	if(cls.indexOf('dialog')!=-1)
	{
		if(browsed!="")
		{
			if(navigator.userAgent.toLowerCase().indexOf('chrome') != -1)
			{
				w=screen.availWidth-10;
				h=screen.availHeight-60;
			}
			div=tcontainer.create('div',{className: 'dialog3', style: {background:'#fff',width: w+'px', height: (h-30)+'px', zIndex: 99999+countwin+1, overflow: 'hidden', margin: '0px', padding: '0px'}, id: ind+''+countwin});
			inner=div.create('div',{style: {border:'none', margin: '0px',padding:'0px', background: '#fff', width: w+'px', height: (h-30)+'px', overflow: 'hidden', cursor: 'default', zIndex: 99999+countwin+2}});
			closeel=1;
		}
		else
		{
			bgdiv=createBgDiv(ind+''+countwin+'bgdiv',countwin);
			div=tcontainer.create('div',{className: cls, style: {width: w+'px', height: h+'px', zIndex: 99999+countwin+1, overflow: 'hidden', margin: '0px', padding: '0px', cursor: 'se-resize'}, id: ind+''+countwin, onmousedown: 'startScale', onmouseup: 'stopScale', onmouseout: 'stopScale', onmouseover: 'stopScale'});
			var inner=div.create('div',{style: {border:'none', margin: '5px',padding:'0px', width: (w-10)+'px', height: (h-10)+'px', overflow: 'hidden', cursor: 'default', zIndex: 99999+countwin+2}});
			var p=inner.create('p',{textNode:msg,className: 'pheader', style:{textAlign:'center',zIndex: 99999+countwin+3}, onmousedown: 'startMove', onmouseup: 'stopMove', onmouseout: 'stopMove', onmouseover: 'stopMove'});
			p.create('span',{textNode: 'X', title: 'Закрыть', className: 'del', onmousedown: dispatcher});
			p.create('span',{textNode: '_', title: 'Свернуть', className: 'unwrap', onmousedown: unWrapLayer});
		}
		if(divframe!="")
		{
			var theh=(browsed!="")?(h-30):(h-35);
			var thew=(browsed!="")?w:(w-10);
			var ifr=null;
			if(forlinks=="")
			{
				ifr=inner.create('iframe',{name: ind+'frame', id: ind+'frame', style: {width: thew+'px', height: theh+'px', zIndex: 99999+countwin+4}, border: '0', frameBorder: '0', marginWidth: '0', marginHeight: '0', scrolling: scrolling, src: src});
			}
			else
			{
				ifr=inner.create('iframe',{name: ind+'frame', id: ind+'frame', style: {width: (w-10)+'px', height: (h-125)+'px', zIndex: 99999+countwin+4}, frameborder: '0', marginwidth: '0', marginheight: '0', scrolling: scrolling, src: src});
				var pin=inner.create('p',{style: {textAlign: 'center',marginTop: '10px'}});
				pin.create('input', {className: 'button2', id: 'closebut',value: closename, onmousedown: dispatcher, type: 'button'});
				pin=null;
			}
			ifr=null;
		}
		else
		{
			var frm=null;
			frm=inner.create('form',{id: ind+'form', enctype: multipart,onsubmit: 'function(){return false;}', className: 'winform', style: {cursor: 'default', margin: '0px', padding: '0px', overflow: 'auto', width: '100%', height: (h-100)+'px'}});
			var lpc=frm.create('div',{style: {font: 'normal 10pt/24pt Arial', padding: '10px 0 10px 50px'},  textNode: 'Пожалуйста, подождите ...'});
			lpc.n.innerHTML+='<div class="progress small"><div></div></div>';
			var pin=null;
			if(forlinks=="")
			{
				pin=inner.create('p',{style: {textAlign: 'center',paddingTop: '10px'}});
				if(callback!="")
				{
					if(disabled!="")
						pin.create('input', {className: 'button', id: 'callbut', value: callbackname, onkeyup: callback, onmousedown: callback, type: 'button', disabled: 'true'});
					else
						pin.create('input', {className: 'button', id: 'callbut', value: callbackname, onkeyup: callback, onmousedown: callback, type: 'button'});
				}
				pin.create('input', {className: 'button2', id: 'closebut',value: closename, onmousedown: dispatcher, type: 'button'});
			}
			frm=pin=null;
		}
	}
	else
	{
		var div=tcontainer.create('div',{className: cls, style: {zIndex: 99999+countwin+1, margin: '0px', padding: '0px'}, id: ind+''+countwin});
		var frm=div.create('form',{id:ind+'form'});
		if(cls!='loader')
		{
			var lpc=frm.create('div',{style: {font: 'normal 10pt/24pt Arial', padding: '10px 0 10px 50px'},  textNode: 'Пожалуйста, подождите ...'});
			lpc.n.innerHTML+='<div class="progress small"><div></div></div>';
		}
		else
		{
			var lpc=frm.create('div',{style: {width:'100%',height:'100%'}});
			lpc.n.innerHTML+='<div class="progress"><div></div></div>';
		}
	}
	if(closeel==null)
		div.addevent('keyup',eval(dispatcher));
	arrwin[countwin]=[div.n.parentNode,div.n,layclose];
	countwin++;
	frmh=container.clientHeight||window.innerHeight;
	if(browsed=="")
	{
		container.style.overflow="hidden";
	}
	div.setx(len);
	div.sety(t);
	tcontainer=bgdiv=div=inner=p=null;
	return;
}

function closeThisWin(event)/*удаление слоя-окна по нажатию клавиш*/
{
	stopEffects(event);
	var etype=getEtype(event).toLowerCase();
	if(etype=='keyup')
	{
		var Key=getCode(event);
		if(Key==27)
		{
			delLayerWin();
			return false;
		}
		else
			return;
	}
	else
	{
		delLayerWin();
		return false;
	}
}

/*конец слой-имитация нового окна*/

function printErrAjax(ind,root)/*вывод слоя-окна с ошибкой xml*/
{
	var arg={'message':'ОШИБКА','target':self,'width':'590','height':'450'};
	showLayerWin(ind,arg);
	var div=take(ind+'form');
	div.n.innerHTML="";
	div.create('div',{id: 'type11', textNode: 'ОШИБКА'});
	var mess=div.create('div',{id: 'message11'});
	var act=div.create('div',{id: 'action11'});
	if(root.hasChildNodes())
	{
		var children = root.childNodes;
		for(var j=0; j<children.length; j++)
		{
			if(children[j].nodeType==1)
			{
				if(children[j].nodeName=='message')
				{
					var kids=children[j].childNodes;
					for(var i=0; i<kids.length; i++)
					{
						if((kids[i].nodeType==1)&&(kids[i].nodeName=='entry'))
						{
							var text=kids[i].text||kids[i].textContent;
							mess.create('p',{textNode: text});
						}
					}
				}
				if(children[j].nodeName=='action')
				{
					var kids=children[j].childNodes;
					for(var i=0; i<kids.length; i++)
					{
						if((kids[i].nodeType==1)&&(kids[i].nodeName=='entry'))
						{
							var text=kids[i].text||kids[i].textContent;
							act.create('p',{textNode: text});
						}
					}

				}
				if(children[j].nodeName=='reason')
				{
					var kids=children[j].childNodes;
					for(var i=0; i<kids.length; i++)
					{
						if((kids[i].nodeType==1)&&(kids[i].nodeName=='message'))
						{
							var kinds=kids[i].childNodes;
							for(var z=0; z<kinds.length; z++)
							{
								if((kinds[z].nodeType==1)&&(kinds[z].nodeName=='entry'))
								{
									var text=kinds[z].text||kinds[z].textContent;
									mess.create('p',{textNode: text});
								}
							}
						}
					}

				}
			}
		}
	}
	else
	{
		mess.create('p',{textNode: 'Неизвестная ошибка выполнения.'});
		act.create('p',{textNode: 'Обратитесь к администратору системы'});
	}
	div=mess=act=null;
}

function WriteError(t,h)/*вывод слоя-окна с ошибкой*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(t);
	win.document.close();*/
	if(typeof t!="object")
	{
		t={};
		t._message_0="Указанный пользователь в системе не зарегистрирован.";
		t._action_1="Введите правильные данные";
	}
	else
	{
		if(typeof t._action_1 == "undefined")
			t._action_1="Введите правильные данные";
	}
	var arg={'cls':'dialog2','message':'ОШИБКА','target':self,'width':'500','height':'400'};
	if(typeof h=="string")
	{
		if(h=='index')
		{
			arg["dispatcher"]="function c(){goToLocation('index');}";
		}
		else
		{
			arg["dispatcher"]='historyBack';
		}
	}
	showLayerWin('errorwin',arg);
	var div=take('errorwinform');
	div.n.innerHTML="";
	div.create('p',{textNode: t._message_0});
	div.create('p',{textNode: t._action_1});
}

function historyBack()/*имитация кнопки "назад" браузера*/
{
	history.go(-1);
}

/*открытие/закрытие скрытых слоев*/

function disPlay(o)
{
	if(o.parentNode.nextSibling!=null)
	{
		var obj=o.parentNode.nextSibling;
		if(obj.style.display!="none")
		{
			obj.style.display="none";
			o.parentNode.className="folder";
			o.title="Развернуть";
		}
		else
		{
			obj.style.display="";
			o.parentNode.className="folder_";
			o.title="Свернуть";
		}
	}
}

function showHide2(o,ind)
{
	var par=o.parentNode;
	var next=par.nextSibling;
	var cls=o.className;
	if(par.className=='tabs')
	{
		var parr=take(par).tags('span');
		var narr=take(next).getsign('div',{className:'adddiv'});
		for(var i=0; i<parr.length; i++)
		{
			parr[i].className='add1';
		}
		for(var i=0; i<narr.length; i++)
		{
			narr[i].style.display='none';
		}
	}
	if(cls=='add1')
	{
		o.className='add2 border';
		take(ind).n.style.display='';
	}
	else
	{
		o.className='add1';
		take(ind).n.style.display='none';
	}
}

function showHide1(o)
{
	var obj=o.nextSibling;
	if(obj!=null)
	{
		obj.style.display=(obj.style.display=="none")?"":"none";
		o.title=(o.title=="Развернуть")?"Свернуть":"Развернуть";
		o.className=(o.className.indexOf('_')!=-1)?o.className.substring(0,o.className.indexOf('_')):o.className+'_';
	}
}

function toggleWrap(o)
{
	var obj=take(o.parentNode);
	obj.switchclass('wrap','unwrap');
}

function showHide(o)
{
	if(o.nextSibling!=null)
	{
		var obj=o.nextSibling;
		if(obj.style.display!="none")
		{
			obj.style.display="none";
			o.className="add1";
			o.title="Развернуть";
		}
		else
		{
			obj.style.display="";
			o.className="add2";
			o.title="Свернуть";
		}
	}
}

function showHideM(o,g)
{
	var obj=take(o);
	if(obj.n.className.indexOf('_')!=-1)
	{
		obj.n.className=obj.n.className.substring(0,obj.n.className.indexOf('_'));
	}
	else
	{
		obj.n.className=obj.n.className+'_';
	}
	if(typeof g!="undefined")
	{
		var obj1=take(g);
		if(obj1.n.className.indexOf('_')!=-1)
		{
			obj1.n.className=obj1.n.className.substring(0,obj1.n.className.indexOf('_'));
		}
		else
		{
			obj1.n.className=obj1.n.className+'_';
		}
	}
}

/*конец открытие/закрытие скрытых слоев*/

function goToLocation(o,lind)/*переключение между страницами сайта*/
{
	if((o.indexOf('regform')!=-1)&&(typeof regfromlayer != "undefined"))
	{
		createRegLayer();
		return;
	}
	else if((o.indexOf('privat')!=-1)&&(typeof regfromlayer != "undefined"))
	{
		createAuthLayer();
		return;
	}
	else
	{
		var fr=take(document.body).create('form',{method: 'POST', action: '/'+foldername+'/'});
		if((typeof o=="string")&&(o.indexOf('close')==-1))
		{
			if(typeof numsean!="undefined")
				fr.create('input',{type: 'hidden', name: '_numsean', value: numsean});
			if(typeof _localiddb!="undefined")
			{
				fr.create('input',{type: 'hidden', name: '_localiddb', value: _localiddb});
				fr.create('input',{type: 'hidden', name: '_iddb', value: _iddb});
			}
			else
				fr.create('input',{type: 'hidden', name: '_iddb', value: numDB});
			if(typeof _skin!="undefined")
				fr.create('input',{type: 'hidden', name: '_skin', value: _skin});
			if(typeof _ltitle!="undefined")
				fr.create('input',{type: 'hidden', name: '_ltitle', value: replaceSymb(_ltitle)});
			if(typeof _lind!="undefined")
				fr.create('input',{type: 'hidden', name: '_lind', value: replaceSymb(_lind)});
			if(typeof lind!="undefined")
				fr.create('input',{type: 'hidden', name: '_lind', value: replaceSymb(lind)});
			if(typeof _laddress!="undefined")
				fr.create('input',{type: 'hidden', name: '_laddress', value: replaceSymb(_laddress)});
			if(typeof _sigla!="undefined")
				fr.create('input',{type: 'hidden', name: '_sigla', value: _sigla});
			if(typeof _site!="undefined")
				fr.create('input',{type: 'hidden', name: '_site', value: _site});
			if(typeof _elcat!="undefined")
				fr.create('input',{type: 'hidden', name: '_elcat', value: _elcat});
			if(addfilters!="")
			{
				addfilters=addfilters.replace(/\"/g,'\\\"');
				addfilters=prepareStr(addfilters);
				fr.create('input',{type: 'hidden', name: '_addfilters', value: addfilters});
			}
			if(typeof _linkstring!="undefined")
				fr.create('input',{type: 'hidden', name: '_linkstring', value: _linkstring});
			if(typeof _cataloguer!="undefined")
				fr.create('input',{type: 'hidden', name: '_cataloguer', value: _cataloguer});
			if(typeof _typework!="undefined")
				fr.create('input',{type: 'hidden', name: '_typework', value: _typework});
			if(basequant!="")
				fr.create('input',{type: 'hidden', name: '_basequant', value: basequant});
			else
			{
				if(typeof _basequant!="undefined")
					fr.create('input',{type: 'hidden', name: '_basequant', value: _basequant});
			}
			var fio="";
			if(!flag45)
			{
				if(typeof AO!="undefined")
					fio=AO;
			}
			else
				fr.create('input',{type: 'hidden', name: '_flag45', value: 'yes'});
			fr.create('input',{type: 'hidden', name: 'fio', value: fio});
			if(o.indexOf('individual')!=-1)
				fr.create('input',{type: 'hidden', name: '_typereg', value: o});
			if(o.indexOf('promo')!=-1)
				fr.create('input',{type: 'hidden', name: '_typereg', value: o});
			if(o.indexOf('regform')!=-1)
				fr.create('input',{type: 'hidden', name: '_typereg', value: o});
			if(o.indexOf('privat')!=-1)
			{
				if(typeof _str != "undefined")
					fr.create('input',{type: 'hidden', name: '_str', value: _str});
				if(typeof _showstr != "undefined")
					fr.create('input',{type: 'hidden', name: '_showstr', value: _showstr});
			}
			if((typeof codeMenu!="undefined")&&(codeMenu != ""))
				fr.create('input',{type: 'hidden', name: '_codemenu', value: codeMenu});
			if(o.indexOf('index')==-1)
			{
				if((o.indexOf('history')==-1)&&(o.indexOf('sigla')==-1)&&(o.indexOf('participants')==-1))
				{
					if(typeof pages[o] != "undefined")
						fr.create('input',{type: 'hidden', name: 'p', value: pages[o].directory+'/'+o});
				}
				else
				{
					if(o.indexOf('participants')!=-1)
					{
						searchFundHolders(null,'Юр. Лицо');
						return;
					}
					else if(o.indexOf('sigla')!=-1)
					{
						openSigla(null,_localiddb,_skin);
						return;
					}
					else
					{
						if(typeof modules[o] != "undefined")
							fr.create('input',{type: 'hidden', name: 'm', value: modules[o].directory+'/'+o+'.php'});
					}
				}
			}
			if((o.indexOf('teacher')!=-1)||(o.indexOf('student')!=-1))
				fr.create('input',{type: 'hidden', name: 'typecat', value: o});
			if(typeof _auth!="undefined")
				fr.create('input',{type: 'hidden', name: '_auth', value: _auth});
			if(typeof _repoauthor!="undefined")
				fr.create('input',{type: 'hidden', name: '_repoauthor', value: _repoauthor});
			if(typeof _profile!="undefined")
				fr.create('input',{type: 'hidden', name: '_profile', value: _profile});
			var cont=take(document.body);
			if(cont.hasclass('blind_panel'))
			{
				if((typeof _sheet !="undefined")&&(cont.hasclass(_sheet)))
					cont.delclass(_sheet);
				bodyclass=document.body.className;
			}
			else
				bodyclass="";
			if(bodyclass!="")
				fr.create('input',{type: 'hidden', name: '_bodyclass', value: bodyclass});
			if(typeof _rubricator !="undefined")
				fr.create('input',{type: 'hidden', name: '_rubricator', value: _rubricator});
		}
		fr.n.submit();
	}
}

/*---- добавление функций к списку для запуска по событию onload ----*/

var onloadfuncs=new Array();

function registrOnloadFunctions(func)
{
	var oldonload = window.onload;
	if(typeof window.onload != 'function')
	{
		window.onload = func;
	}
	else
	{
		onloadfuncs.push(oldonload);
		onloadfuncs.push(func);
		window.onload = function()
		{
			for(i=0; i<onloadfuncs.length; i++)
			{
				onloadfuncs[i]();
			}
		}
	}
}

/*---- добавление функций к списку для запуска по событию onload ----*/

/*----------------------------------- базовые функции ------------------------------------*/