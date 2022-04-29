<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div id="infor">
 	<tab-colleagues :items="subMenu"></tab-colleagues>

    <div class="col_title">
        <span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Коллегам</span>
    </div>
        <h1 align = "center">Коллегам</h1>
    <div id="colleagues_container" >
		<div class="header"><center>Содержание</center></div>
		<div class = "spacer h15x"></div>
	</div>
</div>

<script>
     menu.$root.currentMenu = "colleagues";
	    Vue.component("tab-colleagues", {
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
                    title: 'Конференции, семинары',
                    link: ''
                }, {
                    title: 'Методические документы',
                    link: ''
                }, {
                    title: 'Проекты библиотеки',
                    link: ''
                }, {
                    title: 'Издания РГБИ',
                    link: ''
                }, {
                    title: 'Библиотека благодарит',
                    link: ''
                }, {
                    title: 'Творческие конкурсы',
                    link: ''
                }, {
                    title: 'Вакансии',
                    link: ''
                }, {
                    title: 'Секция библиотек по искуству и музейных библиотек РБА',
                    link: ''
                }]
        },
    /*  
    data: {
            activeSubMenu: false,
            activePage: false,
            //currentPage: 'patch',
            currentMenu: 'about',
            menuItems: [{
                title: 'О библиотеке',
                link: 'about'
            }, {
                title: 'Читателям',
                link: 'readers'
            }, {
                title: 'Коллегам',
                link: 'colleagues'
            }, {
                title: 'Спроси библиографа',
                link: 'ask'
            }]
        },
        methods: {
            /*
                 currentPageName: function(p) {
                    this.currentPage = p? p : 'patch';
                    console.log(this.currentPage);
                },
            
        },
        computed: {
            currentMenuComponent: function() {
                return "tab-" + this.currentMenu.toLowerCase();
            },
        },
*/ 
    });
   
</script>

<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>