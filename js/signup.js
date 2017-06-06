window.onload=function(){
	document.getElementById("signup").addEventListener('click',insert);
}
 var createXHR=function(){              //首先我们得创建一个XMLHttpRequest对象
     if(window.ActiveXObject){//IE的低版本系类
         XHR=new ActiveXObject('Microsoft.XMLHTTP');//之前IE垄断了整个浏览器市场，没遵循W3C标准，所以就有了这句代码。。。但IE6之后开始有所改观
     }else if(window.XMLHttpRequest){//非IE系列的浏览器，但包括IE7 IE8
	     
         XHR=new XMLHttpRequest();
         
     }
 }

var insert=function(){
	var id=document.getElementById('id').value;
	var psw=document.getElementById('psw').value;
	var name=document.getElementById('nickname').value;
   createXHR();
    var url="php/insert.php";
    url+="?userID="+id;
    url+="&psd="+psw;
    url+="&name="+name;
    XHR.open("GET",url,true);
    XHR.onreadystatechange=stateChanged;
    XHR.send(null);

 }

 function stateChanged()
{
    if (XHR.readyState==4 || XHR.readyState=="complete")
    {
        alert(XHR.responseText);
    }
}