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
        if(this.table.persons[id-1].character.type != ctype.bad){
            addMsg("预言家,你验的"+id+"号玩家是好人");
        }else{
            addMsg("预言家,你验的"+id+"号玩家是狼人");
        }
        
    }
}