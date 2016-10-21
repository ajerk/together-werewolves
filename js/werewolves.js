//狼人

function werewolf(){
    //职业类型
    this.type = ctype.bad;
    
    //职业名称
    this.name = cname.werewolf;
    
    //桌子
    this.table = undefined;
    
    //狼人技能
    this.kill = function(id){
        //"计算结果信息"标志 x = 2
        x = 2;
        this.table.persons[id-1].alive = false;
        this.table.host.msgrecord.lastnightkilledid = id; //让主持人记录谁死了
        addMsg("狼人杀了 "+ id+" 号玩家");
    }
}