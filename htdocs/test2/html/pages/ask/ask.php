<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<style>
</style>

<div id="infor">
    <tab-ask :items="subMenu"></tab-ask>

    <div class="col_title">
        <span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Спроси библиографа</span>
    </div>
        <h1 align = "center">Спроси библиографа</h1>
    <div id="ask_container" >
		<div class="header"><center>Содержание</center></div>
		<div class = "spacer h15x"></div>
	</div>
</div>

<script>
    menu.$root.currentMenu = "ask";
    Vue.component("tab-ask", {
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
                    title: ' ',
                    link: ''
                }, {
                    title: 'Тематические запросы',
                    link: ''
                }, {
                    title: 'Наличие изданий',
                    link: ''
                }, {
                    title: 'Задать вопрос',
                    link: ''
                }, {
                    title: 'Отзывы и предложения',
                    link: ''
                }, {
                    title: 'Вне категорий',
                    link: ''
                }, {
                    title: 'Вопросы о работе РГБИ',
                    link: ''
                }, {
                    title: '  ',
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
        }
    });

</script>

<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>