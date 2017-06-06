window.onload=function(){

	document.getElementById("login").addEventListener("click",login);
}

var XHR;
var createXHR=function (){              //首先我们得创建一个XMLHttpRequest对象
     if(window.ActiveXObject){//IE的低版本系类
         XHR=new ActiveXObject('Microsoft.XMLHTTP');//之前IE垄断了整个浏览器市场，没遵循W3C标准，所以就有了这句代码。。。但IE6之后开始有所改观
     }else if(window.XMLHttpRequest){//非IE系列的浏览器，但包括IE7 IE8
	     
         XHR=new XMLHttpRequest();
         
     }
 }

var login=function(){
	var id=document.getElementById("id").value;
	var psw=document.getElementById("psw").value;
	createXHR();    
    XHR.open("GET","php/login.php?id="+id+"&psw="+psw,true);
    XHR.onreadystatechange=stateChanged;
    XHR.send(null);
	
}

var stateChanged=function(){
        
    if (XHR.readyState==4 || XHR.readyState=="complete")
    {    var temp=XHR.responseText.trim();
        
		if(temp=='1')
			window.location.href="http://120.24.42.137/project/page.html";
    }
}