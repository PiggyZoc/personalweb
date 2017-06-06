<?php
      session_start();
	  $user_id=$_SESSION['id'];
	    $mysqli1 = mysqli_connect("localhost:3306", "512test", "123456", "project");
   //判断是否连接成功
     if(!$mysqli1 ){
        echo mysqli_connect_error();
    }
   
      
 try {
    $result = $mysqli1->query("SELECT name FROM persons where id='$user_id'") or die("SQL语句执行失败");
       
}catch (mysqli_sql_exception $e){
    throw $e;
    
}
while($row = $result->fetch_array(MYSQLI_ASSOC)){
	echo ($row['name']);
};
mysqli_close($mysqli1);
?>