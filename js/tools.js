//这个文件里面的一些函数是用来 操作 html文档的内容的


//添加一个信息
//用法 addMsg(msg);
//参数: msg - 信息内容
function addMsg(msg){
    var msgboxid = "messagebox"; //这里用来存放信息栏的id
    $("#"+msgboxid).append("<p>"+msg+"</p>"); //取得信息栏并添加信息
}