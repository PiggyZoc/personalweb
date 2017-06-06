<?php
  $id=$_GET['id'];
  $mysqli = mysqli_connect("localhost:3306", "512test", "123456", "project");
//判断是否连接成功
if(!$mysqli ){
    echo mysqli_connect_error();
}
try {
    $result = $mysqli->query("SELECT id,name FROM persons WHERE id='$id' ") or die("SQL语句执行失败");
   
}catch (mysqli_sql_exception $e){
    throw $e;
    echo "Failed";
}
while($row = $result->fetch_array(MYSQLI_ASSOC)){
	echo ".".$row['id']."";
	echo ".".$row['name']."";
	
};
mysqli_close($mysqli);
?>