//一场游戏必须在桌子上进行,这里也不例外
//桌子 可以用来添加桌子上有哪些人,进行一些 桌子上的操作
function table(){
    
    //把所有在桌子上的人存放到数组里
    this.persons = new Array();
    
    //主持人
    this.host = undefined;
    
    //桌子上的人数
    this.peoplecount = 0;
    
    //添加一个人
    this.addperson = function(person){
        this.persons.push(person);
        person.table = this;
        person.character.table = this;
        this.peoplecount++; //每添加一个人当然要手动为 peoplecount 加一啦~
        person.tablenum = this.peoplecount; //设置这个 被添加的人的号码
    }
    
    //设置主持人
    this.sethost = function(host){
        this.host = host;
        host.table = this;
    }
}