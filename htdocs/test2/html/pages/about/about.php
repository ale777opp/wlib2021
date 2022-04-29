<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div class="spacer"></div>

<div id="infor">
    <tab-about :items="subMenu"></tab-about>
    <!--
	<component v-show="activeSubMenu" :is="currentMenuComponent"></component>
	<component v-show="activePage" :is="currentPageComponent" class="page"></component>
	-->
    <div class="col_title">
        <span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span>
        <span class="caption">О библиотеке</span>
    </div>
    <h1 align = "center">О библиотеке</h1>
    <div id="ask_container" >
		<div class="header"><center>Содержание</center></div>
		<div class = "spacer h15x"></div>
	</div>
</div>   
<!--
<div class="col_content">
    <div class="table mt20x h100">
        <div class="row">
            <div class="td content h100 vtop p20x">
                <div class="imgcont img1 fleft mr20x">
                    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="150" width="160"/>
                </div>
                <div class="header red mb20x pt20x pb30x">О библиотеке</div>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
                <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
                <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.</p>
                <p>Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.</p>
                <p>Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</p>
                <div class="header red mb20x pt20x pb30x aright">Lorem ipsum dolor sit amet</div>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
                <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p><p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.</p>
                <p>Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.</p>
                <p>Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</p>
                </div>
                <div class="td content w30 bge br5x h100 vtop p20x">
                        <div class="mt10x mb10x"><span class="help"></span>
                        <span class="red b">Lorem ipsum dolor sit amet</span>
                        </div>
                        <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
                    <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
                    <div class="mt10x mb10x">
                        <span class="info"></span>
                        <span class="red b">Nam liber tempor cum soluta</span>
                    </div>
                    <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.</p>
                    <p>Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.</p>
                    <p>Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</p>
                </div>
            </div>
        </div>
    </div>
</div>
-->
<div class="spacer"></div>
<script>
    Vue.component("tab-about", {
        props: ['items'],
        template: `<div class = "grid_sub_menu">
          <div v-for = "(item, index) in items"
               :class.stop = "'subMenu' + 1 + index"
               @click = "currentPageName(item.link)"
          ><span class="item"
          :class = "{errors: !item.link}"
          >{{item.title}}</span>
          </div>
        </div>
        `,
    methods: {
            /*
            currentPageName: function(p) {
                menu.$data.currentPage = p ? p : 'patch';
                menu.$data.activePage = true;
                infor.style.display = 'none';
                console.log(menu.$data.currentPage);
            },
            */
        }
    });
    var subMenu = new Vue({
        el: '#infor',
        data: {
                subMenu: [{
                    title: 'История',
                    link: 'history'
                }, {
                    title: 'Адрес и время работы',
                    link: 'address'
                }, {
                    title: '3D панорамы Галерея',
                    link: ''
                }, {
                    title: 'Противодействие коррупции',
                    link: ''
                }, {
                    title: 'Структура библиотеки, контакты',
                    link: 'structure'
                }, {
                    title: 'Реквизиты библиотеки',
                    link: 'requisites'
                }, {
                    title: 'Официальные документы',
                    link: 'norm'
                }, {
                    title: 'Попечительский совет',
                    link: 'about'
                }]
        },
    });
</script>
<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>

