 <?php
 session_start();
 $id_1=$_SESSION['id'];

 $mysqli1 = mysqli_connect("localhost:3306", "512test", "123456", "project");
   //判断是否连接成功
 if(!$mysqli1 ){
 	echo mysqli_connect_error();
 }


 try {
 	$result = $mysqli1->query("select f.id_2,p.name from friends f left outer join persons p on f.id_2 = p.id where f.id_1='$id_1' ") or die("SQL语句执行失败");

 }catch (mysqli_sql_exception $e){
 	throw $e;

 }
 while($row = $result->fetch_array(MYSQLI_ASSOC)){
 	echo ".".$row['id_2']."";
 	echo ".".$row['name']."";
 	
 };
 mysqli_close($mysqli1);

 ?>	  