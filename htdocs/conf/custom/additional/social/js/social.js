/*------------ соцсети ---------*/

var Share = {
	Url: function(o, purl, pimg, pdesc)
	{
		if(typeof purl=="undefined")
		{
			this.titl=document.title;
			var meta = document.getElementsByTagName('meta');
			for(var i=0; i<meta.length; i++)
			{
				if(meta[i].name.toLowerCase()=="description")
				{
					this.desc=meta[i].content;
					break;
				}
			}
			this.URL='http://'+servername+'/'+foldername;
			this.IMG='http://'+servername+''+pathimg+'/logo_big.png';
		}
		else
		{
			if(pimg=="")
			{
				if(o.parentNode.parentNode.firstChild.firstChild.nodeName.toLowerCase()=='figure')
				{
					pimg=o.parentNode.parentNode.firstChild.firstChild.firstChild.src;
				}
			}
			this.URL=purl;
			this.IMG=pimg;
			this.desc=replaceSymb3(pdesc);
			if(this.desc.indexOf('[/size]')!=-1)
			{
				this.titl=this.desc.substring(this.desc.indexOf('[size=20]')+9,this.desc.indexOf('[/size]'));
				this.desc=this.desc.substring(this.desc.indexOf('[/size]')+7);
				this.desc=deleteBB(this.desc);
			}
			else
				this.titl=this.desc;
		}
		this.caller=eval('this.'+o.className);
		this.caller();
	},
	vkontakte: function()
	{
		url  = 'https://vk.com/share.php?';
		url += 'url='          + encodeURIComponent(this.URL);
		url += '&title='       + encodeURIComponent(this.titl);
		url += '&description=' + encodeURIComponent(this.desc);
		url += '&image='       + encodeURIComponent(this.IMG);
		url += '&noparse=true';
		Share.popup(url);
	},
	facebook: function()
	{
		url  = 'https://www.facebook.com/share.php?display=popup&';
		url += 'u='       + encodeURIComponent(this.URL);
		url += '&title='     + encodeURIComponent(this.titl);
		url += '&picture='     + encodeURIComponent(this.IMG);
		url += '&description='     + encodeURIComponent(this.desc);
		Share.popup(url);
	},
	odnoklassniki: function()
	{
		//url  = 'https://connect.ok.ru/dk?st.cmd=WidgetSharePreview';
		//url += '&st.shareUrl=' + encodeURIComponent(this.URL);
		//url += '&title='    + encodeURIComponent(this.titl);
		//url += '&st.comments=';
		url  = 'https://connect.ok.ru/offer?';
		url += 'url=' + encodeURIComponent(this.URL);
		url += '&title='     + encodeURIComponent(this.titl);
		url += '&description='     + encodeURIComponent(this.desc);
		Share.popup(url);
	},
	twitter: function()
	{
		url  = 'https://twitter.com/intent/tweet?';
		url += 'text='      + encodeURIComponent(this.titl);
		url += '&url='      + encodeURIComponent(this.URL);
		url += '&hashtags='	+ encodeURIComponent('это интересно');
		/*url += '&via=Nekrasovka_lib';*/
		Share.popup(url);
	},
	popup: function(url)
	{
		var Scr="alwaysRaised=yes,menubar=yes,width=600,height=400,left=" + parseInt(((screen.availWidth-1)-600)/2) + ",top=" + parseInt(((screen.availHeight-1)-400)/2) +
		",resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no";
		var win=window.open(url,'',Scr);
	}
};

/*--------- конец соцсети ------*/