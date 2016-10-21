//主持人
function host(){

    //主持人主持哪一个桌子
    this.table = undefined;
    
    //主持人信息记录
    this.msgrecord = {
        day:0, //天数
        lastnightkilledid:0, //昨夜杀死的是谁,0代表没人死
        usedheal:false, //女巫使用了解药吗?false表示没使用
        usepoison:false, //女巫使用了毒药吗?false表示还没用
        witchkillid:0, //女巫弄死了谁,0代表没弄死人
        personspeaklastword:new Array(), //发表遗言的玩家号数
        maxid:0  //票数最高的id
    }
    
    //宣告天数 
    this.anounceday = function(){
        //"主持人信息"标志 x = 1
        x = 1;
        if(this.msgrecord.day == 0){
            addMsg("<br><br/>");
            addMsg("<br>游戏开始<br>");
        }
        else {
            addMsg("<br>第"+this.msgrecord.day+"天<br>");
        }
    }
    
    //天黑请闭眼
    this.nightcoming = function(){
        //"主持人信息"标志 x = 1
        x = 1;
        
        this.msgrecord.day++;
        //要先重置昨夜的死亡情况
        this.msgrecord.lastnightkilledid = 0;
        this.msgrecord.witchkillid = 0;
        addMsg("天黑请闭眼");
    }
    //狼人请睁眼
    this.werewolvestime = function(){
        //"主持人信息"标志 x = 1
        x = 1;
        
        addMsg("狼人请睁眼,狼人请杀人");
    }
    //预言家请睁眼
    this.seertime = function(){
        //"主持人信息"标志 x = 1
        x = 1;
        
        addMsg("预言家请睁眼,预言家请验人");
    }
    //女巫请睁眼
    this.witchtime = function(){
        
        x = 1;
        addMsg("女巫请睁眼,女巫,昨夜死的是TA("+this.msgrecord.lastnightkilledid+"号玩家),请问是否使用解药?");
    }
    
    //宣布死亡情况 
    this.anouncedead = function(){
        //"主持人信息"标志 x = 1
        x = 1;
        
        if(this.msgrecord.witchkillid == 0 && this.msgrecord.lastnightkilledid == 0){
            addMsg("天亮了全体请睁眼,昨夜平安夜");
        }else if(this.msgrecord.lastnightkilledid != 0 && this.msgrecord.witchkillid == 0){
            addMsg("天亮了全体请睁眼,昨夜,"+this.msgrecord.lastnightkilledid+"号玩家死亡");
            
        }else if(this.msgrecord.lastnightkilledid == 0 && this.msgrecord.witchkillid != 0){
            addMsg("天亮了全体请睁眼,昨夜,"+this.msgrecord.witchkillid+"号玩家死亡");
            
        }else if(this.msgrecord.lastnightkilledid != 0 && this.msgrecord.witchkillid != 0){
            addMsg("天亮了全体请睁眼,昨夜双死,"+this.msgrecord.lastnightkilledid+"号 "+this.msgrecord.witchkillid+"号玩家死亡");
            
        }
    }
    
    //统计发表遗言者
    this.checkpersonlastword = function(){
        
        //重置 personlastword 为null
        for(var i=0 ; i<100 ; i++){
            if(this.msgrecord.personspeaklastword[i] != null)
                this.msgrecord.personspeaklastword[i] = null;
            else 
                break;
        }
        
        //第一夜晚根据狼人杀人的请况统计发表遗言者
        if( this.msgrecord.maxid == 0 && this.msgrecord.day == 1 ){
                if(this.msgrecord.lastnightkilledid != 0 && this.msgrecord.witchkillid == 0){

                    this.msgrecord.personspeaklastword.push(this.msgrecord.lastnightkilledid);

                }else if(this.msgrecord.lastnightkilledid == 0 && this.msgrecord.witchkillid != 0){

                        this.msgrecord.personspeaklastword.push(this.msgrecord.witchkillid);

                }else if(this.msgrecord.lastnightkilledid != 0 && this.msgrecord.witchkillid != 0){
                    this.msgrecord.personspeaklastword.push(this.msgrecord.lastnightkilledid);
                    this.msgrecord.personspeaklastword.push(this.msgrecord.witchkillid);
                 }
        }
        
        //每次投票淘汰人后统计发表遗言者
        else if( this.msgrecord.maxid != 0 ){
            this.msgrecord.personspeaklastword.push(this.msgrecord.maxid);   
        }
    }
    
    
    //统计投票结果   
    this.calvote = function(){
        //"计算结果信息"标志 x = 2
        x = 2;
        
        this.msgrecord.maxid = 0;  
        var maxcount = 0; //最高的票数
        for(var i=0;i<this.table.peoplecount;i++){
            var person = this.table.persons[i]; //取得第i个人
            if(person.bevotedcount > 0){
                addMsg((i+1)+"号玩家"+person.bevotedcount+"票");
            }
            if(person.bevotedcount > maxcount){
                maxcount = person.bevotedcount;
                this.msgrecord.maxid = i+1;
            }
            person.bevotedcount = 0; //重置为0票,第二天的时候才不会继续用前面的票数进行计数
        }
        addMsg(this.msgrecord.maxid+"号玩家出局");
        this.table.persons[this.msgrecord.maxid-1].alive = false; //出局设置为false
    }
    
    
    
    
    //核算游戏结果   
    this.checkresult = function(){
        //"主持人信息"标志 x = 1
        x = 1;
        
        var godcount = 0; //神民数量
        var villagercount = 0; //平民数量
        var werewolvescount = 0; //狼人数量
        
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
            addMsg("<br><br/>");
            addMsg("游戏结束!好人获胜!");
        }else if(godcount+villagercount == 0){
            addMsg("<br><br/>");
            addMsg("游戏结束!狼人获胜!");
        }else{
            addMsg("<br><br/>");
            addMsg("游戏继续");
            
            //游戏继续时则进行统计发表遗言的人
            this.checkpersonlastword();
        }
        
    }
    
    
    
    
    
}