//淘汰者
function thedeath(){
    
    //绑定主持人
    this.host = undefined;
    
    //记录淘汰者id
    this.personsid = new Array();
    
    //记录淘汰人数
    this.deadnum = 0;
    
    
    //为淘汰者添加发表遗言的动作
    this.lastwords = function(name){
        addMsg(name+"开始发表遗言");
        addMsg(name+"发表遗言结束");
    }
    
    this.sethost = function(host){
        this.host = host;
        host.thedeath = this;
    }
    
}