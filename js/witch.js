//女巫

function witch(){
    //职业类型
    this.type = ctype.god;
    
    //职业名称
    this.name = cname.witch;
    
    //桌子
    this.table = undefined;
    
    //女巫使用救药
    this.heal = function(){
        if(!this.table.host.msgrecord.usedheal){
            var deadid = this.table.host.msgrecord.lastnightkilledid;
            
            //复活已经记录的死人
            this.table.host.msgrecord.lastnightkilledid = 0;
            this.table.persons[deadid-1].alive = true;
            
            //告诉主持人女巫已经用了解药
            this.table.host.msgrecord.usedheal = true;
        }
    }
    
    //女巫使用毒药
    this.poison = function(id){
        if(!this.table.host.msgrecord.usepoison){
            
            //杀死指定的人
            this.table.persons[id-1].alive = false;
            
            //告诉主持人女巫已经用了毒药
            this.table.host.msgrecord.usedpoison = true;
            this.table.host.msgrecord.witchkillid = id;
        }
    }
}