//人
//新建一个人需要 姓名(name) 和 职业(character)
function person(name){
    //绑定 姓名属性
    this.name = name;
    
    //绑定 人物卡牌
    this.character = undefined;
    
    //绑定 被投票数
    this.bevotedcount = 0;
    
    
    //绑定 桌子,规定这个人是属于哪张桌子的
    this.table = undefined;
    
    //绑定 在桌子上的号码数, -1为不属于任何桌子
    this.tablenum = -1;
    
    //人物当前还活着吗? true表示活着,false表示已经出局
    this.alive = true;
    
    //分配卡牌给这个人
    this.givecard = function(card){
        this.character = card; //分配
        this.character.table = this.table; //设置卡牌的桌子
    }
    
    //绑定说话方法
    this.speak = function(){
        addMsg(name+" 开始发言");
        addMsg(name+" 发言完毕");
    }
    
    //绑定投票方法
    this.vote = function(id){
        addMsg(name+" 投给了"+id+"号");
        this.table.persons[id-1].bevotedcount ++; //为他投票的这个人手动添加一票
    }
}