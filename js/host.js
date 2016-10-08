//主持人
function host(){

    //绑定记录淘汰者
    this.thedeath = undefined;
    
    //主持人主持哪一个桌子
    this.table = undefined;
    
    //主持人信息记录
    this.msgrecord = {
        lastnightkilledid:0, //昨夜杀死的是谁,0代表没人死
        usedheal:false, //女巫使用了解药吗?false表示没使用
        usepoison:false, //女巫使用了毒药吗?false表示还没用
        witchkillid:0 //女巫弄死了谁,0代表没弄死人
    };
    
    //天黑请闭眼
    this.nightcoming = function(){
        
        day++;
        //要先重置昨夜的死亡情况
        this.msgrecord.lastnightkilledid = 0;
        this.msgrecord.witchkillid = 0;
        addMsg("<br>天黑请闭眼<br>");
    }
    //狼人请睁眼
    this.werewolvestime = function(){
        addMsg("狼人请睁眼,狼人请杀人");
    }
    //预言家请睁眼
    this.seertime = function(){
        addMsg("预言家请睁眼,预言家请验人");
    }
    //女巫请睁眼
    this.witchtime = function(){
        addMsg("女巫请睁眼,女巫,昨夜死的是"+this.msgrecord.lastnightkilledid+"号玩家,请问是否使用解药?");
    }
    
    //宣布死亡情况
    this.anouncedead = function(){
        if(this.msgrecord.witchkillid == 0 && this.msgrecord.lastnightkilledid == 0){
            addMsg("天亮了全体请睁眼,昨夜平安夜");
            this.thedeath.deadnum = 0;
            this.thedeath.personsid[0] = null;
            this.thedeath.personsid[1] = null;
        }else if(this.msgrecord.lastnightkilledid != 0 && this.msgrecord.witchkillid == 0){
            addMsg("天亮了全体请睁眼,昨夜,"+this.msgrecord.lastnightkilledid+"号玩家死亡");
            this.thedeath.deadnum = 1;
            this.thedeath.personsid[0] = this.msgrecord.lastnightkilledid;
            this.thedeath.personsid[1] = null;
        }else if(this.msgrecord.lastnightkilledid == 0 && this.msgrecord.witchkillid != 0){
            addMsg("天亮了全体请睁眼,昨夜,"+this.msgrecord.witchkillid+"号玩家死亡");
            this.thedeath.deadnum = 1;
            this.thedeath.personsid[0] = this.msgrecord.witchkillid;
            this.thedeath.personsid[1] = null;
        }else if(this.msgrecord.lastnightkilledid != 0 && this.msgrecord.witchkillid != 0){
            addMsg("天亮了全体请睁眼,昨夜双死,"+this.msgrecord.lastnightkilledid+"号 "+this.msgrecord.witchkillid+"号玩家死亡");
            this.thedeath.deadnum = 2;
            this.thedeath.personsid[0] = this.msgrecord.lastnightkilledid;
            this.thedeath.personsid[1] = this.msgrecord.witchkillid;
        }
    }
    
    
    //统计投票结果
    var maxid = 0;  //票数最高的id
    this.calvote = function(){
        maxid = 0;      
        var maxcount = 0; //最高的票数
        for(var i=0;i<this.table.peoplecount;i++){
            var person = this.table.persons[i]; //取得第i个人
            if(person.bevotedcount > 0){
                addMsg((i+1)+"号玩家"+person.bevotedcount+"票");
            }
            
            if(person.bevotedcount > maxcount){
                maxcount = person.bevotedcount;
                maxid = i+1;
            }
            person.bevotedcount = 0; //重置为0票,第二天的时候才不会继续用前面的票数进行计数
        }
        //记录死者名字
        this.thedeath.personsid[0] = maxid;
        this.thedeath.deadnum = 1;
        addMsg(maxid+"号玩家出局");
        this.table.persons[maxid-1].alive = false; //出局设置为false
    }
    
    
    
    var godcount = 0; //神民数量
    var villagercount = 0; //平民数量
    var werewolvescount = 0; //狼人数量
    //核算游戏结果
    this.checkresult = function(){
        
        godcount = 0; 
        villagercount = 0; 
        werewolvescount = 0; 
        for(var i=0;i<this.table.peoplecount;i++){
            var person = this.table.persons[i]; //取得第i个人
            if(!person.alive){
                continue;
            }
            if(person.character.type == ctype.god){
                godcount++;
            }else if(person.character.type == ctype.villager){
                villagercount++;
            }else if(person.character.type == ctype.bad){
                werewolvescount++;
            }
        }
        
        if(werewolvescount == 0){
            addMsg("<br>游戏结束!好人获胜!<br>");
        }else if(godcount+villagercount == 0){
            addMsg("<br>游戏结束!狼人获胜!<br>");
        }else{
            addMsg("<br>游戏继续<br>");
        }
        
    }
    
    
    
    //天数 
    this.day = function(day){
        if(day == 0)
            addMsg("<br><br>游戏开始<br><br>");
        else 
            addMsg("<br><br>第"+day+"天<br><br>");
    }
    
    
    //死者发表遗言
    this.thedeathlastwords = function(){
        
        if(day == 1 && maxid == 0 ){
            if(this.thedeath.deadnum == 1)
                addMsg("请"+this.thedeath.personsid[0]+"号玩家发表遗言");
            else if(this.thedeath.deadnum == 2)
                addMsg("请"+this.thedeath.personsid[0]+"号玩家和"+this.thedeath.personsid[1]+"号玩家发表遗言");
        }
        else if( werewolvescount != 0 && godcount+villagercount != 0){
            if(this.thedeath.deadnum == 1)
                addMsg("请"+this.thedeath.personsid[0]+"号玩家发表遗言");
            else if(this.thedeath.deadnum == 2)
                addMsg("请"+this.thedeath.personsid[0]+"号玩家和"+this.thedeath.personsid[1]+"号玩家发表遗言");
        }
    }
}