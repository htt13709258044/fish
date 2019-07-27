/**
 * baby.js
 */
//1:创建baby.js
//2:在index.html中加载此文件
//3：添加baby.js类init draw()
var babyObj=function(){
    //console.log(1);
    //1.1小鱼位置
    this.x;
    this.y;
    //1.2小鱼角度
    this.angle;
    //1.3创建三个变量保存三个数组身体[20]眼睛[2] 尾巴[8]
    this.babyEye=[];
    this.babyBody=[];
    this.babyTail=[];
    //1.4创建九个变量
    //身体图片下标
    //身体图片切换计算开始
    //身体图片切换计算结束
    this.babyBodyIndex=0;//身体下标
    this.babyBodyStart=1;//计时开始
    this.babyBodyEnd=2000;//计时结束

    this.babyEyeIndex=0;//身体下标
    this.babyEyeStart=1;//计时开始
    this.babyEyeEnd=3000;//计时结束

    this.babyTailIndex=0;//身体下标
    this.babyTailStart=1;//计时开始
    this.babyTailEnd=1000;//计时结束
}
babyObj.prototype.init=function(){
    //console.log(2);
    //2.1大鱼在屏幕中间
    this.x=canWidth*0.5;
    this.y=canHeigth*0.5;
    //2.2角度=0
    this.angle=0;
    //2.3初始化图片
    for(var i=0;i<2;i++){
        this.babyEye[i]=new Image();
        this.babyEye[i].src="./src/babyEye"+i+".png";
    }
    for(var i=0;i<=19;i++){
        this.babyBody[i]=new Image();
        this.babyBody[i].src="./src/babyFade"+i+".png";
    }
    for(var i=0;i<8;i++){
        this.babyTail[i]=new Image();
        this.babyTail[i].src="./src/babyTail"+i+".png";
    }
    //console.log(this.x+":"+this.y+":"+this.angle);
    //console.log(this.babyEye);
    //console.log(this.babyBody);
    //console.log(this.babyTail);
}
babyObj.prototype.draw=function(){
    //console.log(3);
    //小鱼趋向大鱼距离
    this.x=lerpDistance(mom.x,this.x,0.98);
    this.y=lerpDistance(mom.y,this.y,0.99);

    //小鱼趋向大鱼角度
    //1计算小鱼和大鱼坐标差
    var deltaY=mom.y-this.y;
    var deltaX=mom.x-this.x;
    //2计算小鱼和大鱼角度差
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    //3计算趋向角度
    this.angle=lerpDistance(beta,this.angle,0.6);

    //3.1切换小鱼尾巴图片
    this.babyTailStart+=deltaTime;
    if(this.babyTailStart>this.babyTailEnd){
        this.babyTailIndex=(this.babyTailIndex+1)%8;
        this.babyTailStart=1;//计时值为1
    }
    //3.2切换小鱼身体图片
    this.babyBodyStart+=deltaTime;
    if(this.babyBodyStart>this.babyBodyEnd){
        this.babyBodyIndex=(this.babyBodyIndex+1);
        this.babyBodyStart=0;
        if(this.babyBodyIndex>19){
            this.babyBodyIndex=19;//小鱼饿（白色）
        }
    }
    //3.3切换小鱼眼睛图片
    this.babyEyeStart+=deltaTime;
    if(this.babyEyeStart>this.babyEyeEnd){
        this.babyEyeIndex=(this.babyEyeIndex)%2;
        this.babyEyeStart=1;
        if(this.babyEyeIndex==0){
            this.babyEyeEnd=3000;
        }
        if(this.babyEyeIndex==1){
            this.babyEyeEnd=200;
        }
    }
    //1:保存状态
    ctx1.save();
    //2：设置原点与旋转角度
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    //3：绘制身体
    ctx1.drawImage(
        this.babyBody[this.babyBodyIndex],
        -this.babyBody[this.babyBodyIndex].width*0.5,
        -this.babyBody[this.babyBodyIndex].height*0.5
    );
    //4：绘制尾巴
    ctx1.drawImage(
        this.babyTail[this.babyTailIndex],
        -this.babyTail[this.babyTailIndex].width*0.5+23,
        -this.babyTail[this.babyTailIndex].height*0.5
    );
    //5：绘制眼睛(最后！！放在前面会覆盖)
    ctx1.drawImage(
        this.babyEye[this.babyEyeIndex],
        -this.babyEye[this.babyEyeIndex].width*0.5,
        -this.babyEye[this.babyEyeIndex].height*0.5
    );
    //6：恢复状态
    ctx1.restore();
}
//4:修改main.js添加类 对象，并且调用init draw()
//5:添加baby.js
