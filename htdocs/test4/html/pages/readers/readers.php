<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div id="infor">
    <tab-readers :items="subMenu"></tab-readers>

    <div class="col_title">
        <span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Читателям</span>
    </div>
        <h1 align = "center">Читателям</h1>
    <div id="readers_container" >
		<div class="header"><center>Содержание</center></div>
		<div class = "spacer h15x"></div>
	</div>
</div>

<script>
    menu.$root.currentMenu = "readers";
    Vue.component("tab-readers", {
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
                    title: 'Запись читателей',
                    link: 'readers'
                }, {
                    title: 'Услуги, правила пользования',
                    link: ''
                }, {
                    title: 'Фонды, ресурсы, каталоги',
                    link: ''
                }, {
                    title: 'Доступная среда',
                    link: ''
                }, {
                    title: 'Мероприятия и экскурсии',
                    link: ''
                }, {
                    title: 'Клубы и объединения',
                    link: ''
                }, {
                    title: 'Учёба в РГБИ',
                    link: ''
                }, {
                    title: 'Творческое развитие',
                    link: ''
                }]
        },
        methods: {
        /*    
            currentPageName: function(p) {
                menu.$data.currentPage = p ? p : 'patch';
                menu.$data.activePage = true;
                infor.style.display = 'none';
                console.log(menu.$data.currentPage);
            },
         */
        },
    });
</script>

<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>