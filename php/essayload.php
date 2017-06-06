<?php
      session_start();
	  $user_id=$_SESSION['id'];
	    $mysqli1 = mysqli_connect("localhost:3306", "512test", "123456", "project");
   //判断是否连接成功
     if(!$mysqli1 ){
        echo mysqli_connect_error();
    }
   
      
 try {
    $result = $mysqli1->query("select f.id_1,f.id_2,p.name,e.content,e.create_time from essay e left outer join friends f on e.author_id = f.id_2 left outer join persons p on f.id_2 = p.id where f.id_1='$user_id' ORDER BY e.create_time DESC ") or die("SQL语句执行失败");
       
}catch (mysqli_sql_exception $e){
    throw $e;
    
}
while($row = $result->fetch_array(MYSQLI_ASSOC)){
	echo ".".$row['name']."";
	echo ".".$row['content']."";
	echo ".".$row['create_time']."";
};
mysqli_close($mysqli1);
?>