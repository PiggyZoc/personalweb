window.onload=function(){
	LoadPage();
	LoadEssays();
	document.getElementById("publish").addEventListener("click",insert_Essay);
	document.getElementById('addfriends').addEventListener('click',addFocus);
  document.getElementById('home').addEventListener('click',rehome);
  document.getElementById('focus').addEventListener('click',getFocus);
}
var rehome=function(){
  flag=true;
  var father=document.getElementById('col_essay');
  while(father.hasChildNodes()) 
  {
    father.removeChild(father.firstChild);
  }
  LoadPage();
  LoadEssays();
}
var XHR;
var createXHR=function (){ 
                   //首先我们得创建一个XMLHttpRequest对象
     if(window.ActiveXObject){//IE的低版本系类
         XHR=new ActiveXObject('Microsoft.XMLHTTP');//之前IE垄断了整个浏览器市场，没遵循W3C标准，所以就有了这句代码。。。但IE6之后开始有所改观
     }else if(window.XMLHttpRequest){//非IE系列的浏览器，但包括IE7 IE8

     	XHR=new XMLHttpRequest();

     }
   }
   var XHR2;
   var createXHR2=function (){ 
                   //首先我们得创建一个XMLHttpRequest对象
     if(window.ActiveXObject){//IE的低版本系类
         XHR2=new ActiveXObject('Microsoft.XMLHTTP');//之前IE垄断了整个浏览器市场，没遵循W3C标准，所以就有了这句代码。。。但IE6之后开始有所改观
     }else if(window.XMLHttpRequest){//非IE系列的浏览器，但包括IE7 IE8

     	XHR2=new XMLHttpRequest();

     }
   }
   var LoadEssays=function(){
    createXHR(); 
    XHR.open("GET","php/essayload.php",true);
    XHR.onreadystatechange=stateChanged3;
    XHR.send(null);
  }

  var LoadPage=function(){
    createXHR2();    
    XHR2.open("GET","php/pageload.php",true);
    XHR2.onreadystatechange=stateChanged;
    XHR2.send(null);

  }
  var input;
  var flag=true;
  var arrayx;
  var arrayy;
  var addFocus=function(){
    if(!flag) return;
    var father=document.getElementById('col_essay');
    while(father.hasChildNodes()) 
    {
      father.removeChild(father.firstChild);
    }
    var fileref=document.createElement("link") 
    fileref.rel="stylesheet"; 
    fileref.type="text/css"; 
    fileref.href="css/page.css";
    father.appendChild(fileref);
    var objdiv=document.createElement('form');
    input=document.createElement('input');
    input.type='text';
    input.placeholder='请输入关注者的账号。。';
    var btn=document.createElement('input');
    btn.type='button';
    btn.value='搜索';
    objdiv.className='search';
    input.className='sinput';
    btn.className='sbtn';
    objdiv.appendChild(input);
    objdiv.appendChild(btn);
    father.appendChild(objdiv);
    btn.addEventListener('click',search);
    flag=false;
  }
  var search=function(){
    var s=input.value; 
    createXHR(); 
    XHR.open("GET","php/addfocus.php?id="+s,true);
    XHR.onreadystatechange=stateChanged4;
    XHR.send(null);
  }
  var stateChanged=function(){

    if (XHR2.readyState==4 && XHR2.status==200)
     {    var temp=XHR2.responseText.trim();

      document.getElementById('head').innerHTML=temp;
    }
  }

  var insert_Essay=function(){
   var content=document.getElementById("content").value;
   createXHR();
   XHR.open("GET","php/insertEssay.php?content="+content,true);
   XHR.onreadystatechange=stateChanged2;
   XHR.send(null);
  
 }
 
 var stateChanged2=function(){

   if (XHR.readyState==4 && XHR.status==200)
    {    var temp=XHR.responseText.trim();

     alert(temp);
   }
 }

 var stateChanged3=function(){
  if (XHR.readyState==4 && XHR.status==200)
   {    var innerText=XHR.responseText.trim();

    var array=new Array();
    array=innerText.split(".");
    for(var i = 0 ;i<array.length;i++)
    {
     if(array[i] == "" || typeof(array[i]) == "undefined")
     {
      array.splice(i,1);
      i= i-1;

    }

  }
  var col=document.getElementById('col_essay');
  var fileref=document.createElement("link") 
  fileref.rel="stylesheet"; 
  fileref.type="text/css"; 
  fileref.href="css/page.css";
  col.appendChild(fileref);		
  for(var i=0;i<array.length;i=i+3)
  {
   var item=document.createElement('div');
   var h=document.createElement('h3');
   var p=document.createElement('p');
   var label=document.createElement('label');
   h.innerHTML=array[i];
   p.innerHTML=array[i+1];
   label.innerHTML=array[i+2];
   item.className='item';
   h.className='subtitle';
   p.className='subpara';
   label.className='subtime';
   item.appendChild(h);
   item.appendChild(p);
   item.appendChild(label);
   col.appendChild(item);
 }
}
}

var stateChanged4=function(){
  if (XHR.readyState==4 && XHR.status==200){
   var innerText=XHR.responseText.trim();
   arrayx=new Array();
   arrayx=innerText.split(".");
   for(var i = 0 ;i<arrayx.length;i++)
   {
    if(arrayx[i] == "" || typeof(arrayx[i]) == "undefined")
    {
      arrayx.splice(i,1);
      i= i-1;

    }

  }
  showResult();
}
}

var showResult=function(){

  if(arrayx[0]==null||arrayx[0]==undefined) 
    { alert("用户不存在");
  return;}
  var showForm=document.createElement('form');
  showForm.className='search';

  var label1=document.createElement('div');
  label1.innerHTML="账号： "+arrayx[0];
  showForm.appendChild(label1);
  label1.className='slabel';
  var label2=document.createElement('div');
  label2.innerHTML="姓名： "+arrayx[1];
  showForm.appendChild(label2);
  label2.className='slabel';
  var btn=document.createElement('input');
  btn.type='button';
  btn.value='添加';
  btn.className='sbtn';
  btn.id=arrayx[0];
  btn.addEventListener('click',addTo);
  showForm.appendChild(btn);
  document.getElementById('col_essay').appendChild(showForm);
} 

var addTo=function(){
  createXHR();
  var id_2=this.id;
  XHR.open("GET","php/addto.php?id_2="+id_2,true);
  var id_label=this.id;
  XHR.onreadystatechange=function(){
   if (XHR.readyState==4 && XHR.status==200){
     var innerText=XHR.responseText.trim();
     var flag1=innerText;
     if(flag1=='1') 
      {document.getElementById(id_label).value='已关注';
    document.getElementById(id_label).disabled=true;
    document.getElementById(id_label).style.width='79px';
  }
  else
   alert('你已关注');
}
};

XHR.send(null);


}


var getFocus=function(){
  flag=true;
  var father=document.getElementById('col_essay');
  while(father.hasChildNodes()) 
  {
    father.removeChild(father.firstChild);
  }
  createXHR();
  XHR.open("GET","php/getfocus.php",true);
  XHR.onreadystatechange=stateChanged9;
  XHR.send(null);


}
var stateChanged9=function(){
  if (XHR.readyState==4 && XHR.status==200){
   var innerText=XHR.responseText.trim();
   arrayy=new Array();
   arrayy=innerText.split(".");
   for(var i = 0 ;i<arrayy.length;i++)
   {
    if(arrayy[i] == "" || typeof(arrayy[i]) == "undefined")
    {
      arrayy.splice(i,1);
      i= i-1;

    }

  }
  showResult2();
}
}

var showResult2=function(){
  for(var i=0;i<arrayy.length;i+=2){
    var showForm=document.createElement('form');
    showForm.className='search';

    var label1=document.createElement('div');
    label1.innerHTML="昵称： "+arrayy[i+1];
    showForm.appendChild(label1);
    label1.className='slabel';

    var btn=document.createElement('input');
    btn.type='button';
    btn.value='取消关注';
    btn.className='sbtn';
    btn.style.backgroundColor='red';
    btn.style.width='89px';
    btn.id=arrayy[i];
    btn.addEventListener('click',cancelFocus);
    showForm.appendChild(btn);
    document.getElementById('col_essay').appendChild(showForm);
  }
}

var cancelFocus=function(){
  createXHR();
  var id_2=this.id;
  XHR.open("GET","php/cancelfocus.php?id_2="+id_2,true);
  var id_label=this.id;
  XHR.onreadystatechange=function(){
   if (XHR.readyState==4 && XHR.status==200){
     var innerText=XHR.responseText.trim();
     var flag1=innerText;
     if(flag1=='1') 
      {document.getElementById(id_label).value='已取消';
    document.getElementById(id_label).style.backgroundColor='grey';
    document.getElementById(id_label).disabled=true;
    document.getElementById(id_label).style.width='79px';
  }
  else
   alert('取消失败');
}
};
XHR.send(null);
}

