<?php 
// /htdocs/wlib/html/pages/index
require_once "db_auth.php";
class Db{
    protected $pdo;
    public $data = array();
	
	public function pdo_connect(){
		try{
            $this->pdo = new PDO("mysql:host={$this ->db['dbhost']};dbport={$this ->db['dbport']};dbname={$this ->db['dbname']};charset=utf8", $this ->db['dbuser'], $this ->db['dbpass']);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    }
        catch(PDOException $e){
            echo $e->getMessage();
        }
	}

	public function pdo_query($query){
		$this->pdo->beginTransaction();
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->pdo->commit();
		return $result;
	}
		
    public function __construct(){
        //echo "конструктор работает #3";
        $this ->db =[
            'dbhost' => DBHOST,
            'dbport' => DBPORT,
            'dbuser' => DBUSER,
            'dbpass' => DBPASS,
            'dbname' => DBNAME,
            'dbtable'=> TBNAME
        ];
       $this->pdo_connect();
    }

    public function books(){   
	   $this->data = $this->pdo_query('
		   SELECT newinlib_itemcontent.id,newinlib_itemcontent.title,newinlib_itemcontent.content, newinlib_item.avatar_img_name 
		   FROM newinlib_itemcontent 
		   JOIN newinlib_item ON newinlib_itemcontent.item_id = newinlib_item.id
		   ORDER BY id DESC LIMIT 10');
    }

    public function events(){
		$this->data = $this->pdo_query('
	   	  SELECT events_eventcontent.id,events_eventcontent.title,events_eventcontent.content,events_event.start_date,events_event.end_date
		   FROM events_eventcontent
		   JOIN events_event ON events_eventcontent.event_id = events_event.id
		   ORDER BY id DESC LIMIT 10');
	}

	public function news(){
		$this->data = $this->pdo_query('
		   SELECT news_news.id,news_news.create_date,news_news.title,news_news.content, news_news.avatar_img_name
		   FROM news_news ORDER BY id DESC LIMIT 10');
	}
    
    public function index_info(){
		$this->data = $this->pdo_query('
        SELECT pages_content.title,pages_content.content FROM pages_content WHERE pages_content.title 
        IN ("О библиотеке","Адрес и время работы РГБИ","Запись читателей","Общая информация","Из истории РГБИ",
        "Структура библиотеки","Реквизиты библиотеки","Нормативные документы")');
	}
}
?>
