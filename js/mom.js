/**
 * mom.js 大鱼
 */
//1：创建js文件
//2：将js添加index.html()
//3:js文件添加方法
var momObj=function(){
    //console.log(1);
    //1.1创建两个变量保存大鱼位置x y
    this.x;
    this.y;
    //1.2创建一个变量保存大鱼的游动角度
    this.angle;
    //1.3创建三个数组分别保存大鱼眼睛身体尾巴
    this.bigEye=[];
    this.bigBody=[];
    this.bigTail=[];
    //1.4创建三个变量分别控制大鱼眼睛图片切换
    this.bigEyeIndex=0;//当前显示眼睛的图片下标0-1
    this.bigEyeStart=1;//切换图片计时开始
    this.bigEyeEnd=2000;//切换图片计时结束--》（换一张图片）
    //1.5创建三个变量分别控制大鱼身体图片切换
    this.bigBodyIndex=0;//当前身体眼睛的图片下标0-7
    this.bigBodyStart=1;//切换图片计时开始
    this.bigBodyEnd=3000;//切换图片计时结束--》（换一张图片）
    //1.6创建三个变量分别控制大鱼尾巴图片切换
    this.bigTailIndex=0;//当前显示尾巴的图片下标0-7
    this.bigTailStart=1;//切换图片计时开始
    this.bigTailEnd=1000;//切换图片计时结束--》（换一张图片）
}
//2类
//1.init()
momObj.prototype.init=function(){
    //console.log(2);
    //2.1初始化大鱼的位置在画布中间
    this.x=canWidth*0.5;
    this.y=canHeigth*0.5;
    //2.2初始化大鱼角度0
    this.angle=0;
    //2.3加载大鱼眼睛两张图片
    for(var i=0;i<2;i++){
        this.bigEye[i]=new Image();
        this.bigEye[i].src="./src/bigEye"+i+".png";

    }
    //console.log(this.x+":"+this.y);
    //console.log(this.angle);
    //console.log(this.bigEye);
    //2.4加载大鱼身体8张图片
    for(var i=0;i<8;i++){
        this.bigBody[i]=new Image();
        this.bigBody[i].src="./src/bigSwim"+i+".png";

    }
    //console.log(this.bigBody);
    //2.5加载大鱼尾巴8张图片
    for(var i=0;i<8;i++){
        this.bigTail[i]=new Image();
        this.bigTail[i].src="./src/bigTail"+i+".png";

    }
    //console.log(this.bigTail);
}
//2.draw()
momObj.prototype.draw=function(){
    //#使用全局变量mx my鼠标位置
    //大鱼驱向鼠标慢慢移动
    // 效果不好，感觉鱼黏在鼠标上，
    // 解决：趋向（commonfunction.js）---lerpDistance
    this.x=lerpDistance(mx,this.x,0.98);
    this.y=lerpDistance(my,this.y,0.99);//目标对象（鼠标），源对象（大鱼），速度

    //#大鱼角度
    //获取鼠标与大鱼的坐标差
    var deltaY=my-this.y;
    var deltaX=mx-this.x;
    //获取鼠标与大鱼的角度差
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    //获取大鱼趋向鼠标的角度
    this.angle=lerpAngle(beta,this.angle,0.9);
    //console.log(3);

    //绘制大鱼在前面的画布上
    //3.01切换大鱼尾巴
    this.bigTailStart=this.bigTailStart+deltaTime;
    if(this.bigTailStart>this.bigTailEnd){
        //计时开始值，赋值初始（重新开始计数）
        this.bigTailStart=1;
        //切换到下一张图片
        this.bigTailIndex=(this.bigTailIndex+1)%8;
    }
    //3.02切换大鱼身体
    this.bigBodyStart=this.bigBodyStart+deltaTime;
    if(this.bigBodyStart>this.bigBodyEnd){
        //计时开始值，赋值初始（重新开始计数）
        this.bigBodyStart=1;
        //切换到下一张图片
        this.bigBodyIndex=(this.bigBodyIndex+1)%8;
        //判断如果大于7一直显示第7张图片
        if(this.bigBodyIndex>7){
            this.bigBodyIndex=7;
        }
    }
    //3.03切换大鱼眼睛
    this.bigEyeStart=this.bigEyeStart+deltaTime;
    if(this.bigEyeStart>this.bigEyeEnd){
        //计时开始值，赋值初始（重新开始计数）
        this.bigEyeStart=1;
        //切换到下一张图片
        this.bigEyeIndex=(this.bigEyeIndex+1)%2;
        //闭着眼睛的时间短，睁着眼睛时间长
        if(this.bigEyeIndex==1){
            this.bigEyeEnd=200;
        }
        if(this.bigEyeIndex==0){
            this.bigEyeEnd=2000;
        }

    }
    //3.1绘制大鱼之前保存所有状态信息
    ctx1.save();
   //3.2设置画布原点
    ctx1.translate(this.x,this.y);
    //3.3设置选择角度
    ctx1.rotate(this.angle);
    //3.4绘制大鱼身体
    ctx1.drawImage(
        this.bigBody[this.bigBodyIndex],
        -this.bigBody[this.bigBodyIndex].width*0.5,//移到中间
        -this.bigBody[this.bigBodyIndex].height*0.5
    );
    //3.5绘制大鱼尾巴
    ctx1.drawImage(
        this.bigTail[this.bigTailIndex],
        -this.bigTail[this.bigTailIndex].width*0.5+30,//移到中间
        -this.bigTail[this.bigTailIndex].height*0.5
    );
    //3.6绘制大鱼眼睛（一定要最后绘制防止后面深色覆盖）
    ctx1.drawImage(
        this.bigEye[this.bigEyeIndex],
        -this.bigEye[this.bigEyeIndex].width*0.5,//移到中间
        -this.bigEye[this.bigEyeIndex].height*0.5
    );
    //3.7绘制结束后恢复原状态信息
    ctx1.restore();
}
//4：在main.js调用以上三个方法1.8 2.7 3.5
//5：一点一点分析创建，类，init,draw()





















