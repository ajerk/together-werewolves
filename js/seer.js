//预言家

function seer(){
    //职业类型
    this.type = ctype.god;
    
    //职业名称
    this.name = cname.seer;
    
    //桌子
    this.table = undefined;
    
    //预言家验人
    this.check = function(id){
        //"主持人信息" 标志 x = 1
        x = 1;
        if(this.table.persons[id-1].character.type != ctype.bad){
            addMsg("预言家,你验的"+id+"号玩家是(好人)");
        }else{
            addMsg("预言家,你验的"+id+"号玩家是(狼人)");
        }
        
    }
}