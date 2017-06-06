<?php
  session_start();
   $content=$_GET['content'];
   if($content==""){
    echo "请输入内容";
    exit();
   }
   $user_id=$_SESSION['id'];
   $mysqli = mysqli_connect("localhost:3306", "512test", "123456", "project");
//判断是否连接成功
  if(!$mysqli ){
    echo mysqli_connect_error();
 }
try {
    $result = $mysqli->query("INSERT INTO `project`.`essay` (`essay_id`, `author_id`, `content`, `create_time`) VALUES (NULL, '$user_id', '$content', CURRENT_TIMESTAMP);") or die("SQL语句执行失败");
    echo "Successfull!";
}catch (mysqli_sql_exception $e){
    throw $e;
    echo "Failed";
}
mysqli_close($mysqli);

?>