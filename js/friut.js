//console.log("食物");
//食物类又称为果实类
var fruitObj=function(){
    //console.log(1);
    //添加属性--是否活动状态
    this.alive=[];//保存数组中的每一个实物的状态，
    this.x=[];
    this.y=[];//保存果实位置
    this.l=[];//保存果实长度(大小)
    this.spd=[];//保存果实的速度（生长，漂浮）
    this.orange=new Image();
    this.blue=new Image();
    this.fruitType=[];//报存果实当前颜色类型
}

//1:果实数量
fruitObj.prototype.num=30;
//2:果实初始化方法
fruitObj.prototype.init=function(){
    //console.log(2);
    for(var i=0;i<=this.num;i++){
        this.alive[i]=false;//默认果实不活动，有定时器监视，不够15则产生
        this.x[i]=0;  //x食物出生时才指定
        this.y[i]=0;  //y食物出生时才指定（出生的方法）
        this.spd[i]=Math.random()*0.017+0.003;
        this.fruitType[i]="";
        this.l[i]=0;
    }
    //console.log(this.alive);
    //console.log(this.x);
    //console.log(this.y);
    //console.log(this.spd);
    this.orange.src="./src/fruit.png";
    this.blue.src="./src/blue.png";
    //console.log(this.orange);
    //console.log(this.blue);

}
//3:果实绘制方法
fruitObj.prototype.draw=function(){
    //console.log(3);
    for(var i=0;i<this.num;i++){
        //判断当前果实是否是活动状态
        if(this.alive[i]){
            //从小变大2~14
            if(this.l[i]<14){
                //变大
                this.l[i]+=this.spd[i]*deltaTime;
            }else{
                //后向上漂浮
                this.y[i]-=this.spd[i]*3*deltaTime;//3倍速
            }
            //当前类型是黄色还是蓝色
            if(this.fruitType[i]=="blue"){
                //创建变量保存图片
                var pic=this.blue;
            }else{
                var pic=this.orange;
            }
            //console.log(this.l[i]+":"+this.y[i]+":"+pic);
            //绘制实物
            ctx2.drawImage(pic,
                this.x[i]-this.l[i]*0.5,//从海葵中间出生
                this.y[i]-this.l[i]*0.5,
                this.l[i],this.l[i]);//x,y,w,h
            //如果当前果实已经飘出屏幕状态为false
            if(this.y[i]<10){
                this.alive[i]=false;
            }
        }
    }
}
//4.添加果实出生的方法
//果实随机找到一个海葵，获取海葵的位置，在其头部产生实物
fruitObj.prototype.born=function(i){
    //1随机找到一个海葵
    var aneId=Math.floor(Math.random()*ane.num);//向下取整
    //2.获取海葵位置x-y赋值给果实
    this.x[i]=ane.x[aneId];
    this.y[i]=canHeigth-ane.len[aneId];
    //3.设置果实宽度为0
    this.l[i]=0;
    //4.状态活动为true
    this.alive[i]=true;
    //5.随机设置果实颜色 orange(少)blue(多)
    this.fruitType[i]=Math.random()<0.9?"blue":"orange";
}

//***.添加监听果实数量的函数
// 果实30个，要求游戏15个果实，一旦少于15个数量，就要出生新的果实
function fruitMonitor(){
    var num=0;//计数小于15，则出生ui
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i])num++;//累加
    }
    if(num<15){
        sendFruit();
        return;//每次出生一个果实
    }
}
//查找状态为false的果实，出生
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){//找到第一个为FALSE的果实
            fruit.born(i);//出生
            return;
        }
    }
}
/**
 * 将某个被吃掉的食物状态改为false
 * @param i 下标
 */
fruitObj.prototype.dead=function(i){
    this.alive[i]=false;
}
















