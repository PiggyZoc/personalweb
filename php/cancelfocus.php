<?php
   session_start();
	  $id_1=$_SESSION['id'];
      $id_2=$_GET['id_2'];
      $mysqli = mysqli_connect("localhost:3306", "512test", "123456", "project");
    //判断是否连接成功
     if(!$mysqli ){
       echo mysqli_connect_error();
     }
    try {
    $result = $mysqli->query("delete from friends where id_1='$id_1' and id_2='$id_2'") or die("0");
    echo "1";
}catch (mysqli_sql_exception $e){
    throw $e;
    echo "Failed";
}
mysqli_close($mysqli);
?>