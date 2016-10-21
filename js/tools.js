//这个文件里面的一些函数是用来 操作 html文档的内容的


//添加一个信息
//用法 addMsg(msg);
//参数: msg - 信息内容

//全局变量，用来区别信息来源于 主持人(1)、计算结果(2) 还是 游戏玩家(3)
var x = 0;
function addMsg(msg){
    
    var msgboxid = "messagebox"; //这里用来存放信息栏的id
    var msg1 = msg.toString();
    //主持人信息
    if(x == 1){
          //以下方法 获取信息栏并向它发送信息
        
          //将信息分成长度不同的情况处理 0-18 18-32 33-35 36-48
          // margin控制<p>与<p>之间的行距，line-height控制<p>中换行的行距、通过<br>换行
          if(msg1.length<=18){
            $("#"+msgboxid).append("<p style='color:#7B68EE;line-height:70%;font-weight:;margin:25px;'>"+msg1+"</p>"); 
          }
          else if(msg1.length<=32){
            $("#"+msgboxid).append("<p style='color:#7B68EE;line-height:60%;font-weight:;margin:25px;'>"+msg1.substring(0,16)+"<br><br/>"+msg1.substring(16,msg1.length)+"</p>");
          }
          else if(msg1.length<=35){
            $("#"+msgboxid).append("<p style='color:#7B68EE;line-height:60%;font-weight:;margin:25px;'>"+msg1.substring(0,18)+"<br><br/>"+msg1.substring(18,msg1.length)+"</p>");
          }
          else if(msg1.length<=48){
            $("#"+msgboxid).append("<p style='color:#7B68EE;line-height:60%;font-weight:;margin:25px;'>"+msg1.substring(0,16)+"<br><br/>"+msg1.substring(16,32)+"<br><br/>"+msg1.substring(32,msg1.length)+"</p>"); 
          }
        }
    
    //计算结果信息
    else if(x == 2){
          if(msg1.length<=18){
            $("#"+msgboxid).append("<p style='color:#444444;line-height:70%;font-weight:bold;margin:25px;'>"+msg1+"</p>"); 
          }
          else if(msg1.length<=32){
            $("#"+msgboxid).append("<p style='color:#444444;line-height:60%;font-weight:bold;margin:25px;'>"+msg1.substring(0,16)+"<br><br/>"+msg1.substring(16,msg1.length)+"</p>");
          }
          else if(msg1.length<=35){
            $("#"+msgboxid).append("<p style='color:#444444;line-height:60%;font-weight:bold;margin:25px;'>"+msg1.substring(0,18)+"<br><br/>"+msg1.substring(18,msg1.length)+"</p>");
          }
          else if(msg1.length<=48){
            $("#"+msgboxid).append("<p style='color:#444444;line-height:60%;font-weight:bold;margin:25px;'>"+msg1.substring(0,16)+"<br><br/>"+msg1.substring(16,32)+"<br><br/>"+msg1.substring(32,msg1.length)+"</p>"); 
          }
        } 
    
    
    //游戏玩家信息
    else if(x == 3){
          if(msg1.length<=18){
            $("#"+msgboxid).append("<p style='color:black;line-height:70%;font-weight:;margin:25px;'>"+msg1+"</p>"); 
          }
          else if(msg1.length<=32){
            $("#"+msgboxid).append("<p style='color:black;line-height:60%;font-weight:;margin:25px;'>"+msg1.substring(0,16)+"<br><br/>"+msg1.substring(16,msg1.length)+"</p>");
          }
          else if(msg1.length<=35){
            $("#"+msgboxid).append("<p style='color:black;line-height:60%;font-weight:;margin:25px;'>"+msg1.substring(0,18)+"<br><br/>"+msg1.substring(18,msg1.length)+"</p>");
          }
          else if(msg1.length<=48){
            $("#"+msgboxid).append("<p style='color:black;line-height:60%;font-weight:;margin:25px;'>"+msg1.substring(0,16)+"<br><br/>"+msg1.substring(16,32)+"<br><br/>"+msg1.substring(32,msg1.length)+"</p>"); 
          }
        } 
    
   
                           
}