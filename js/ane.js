/**
 * 海葵类
 */
//1：创建海葵类
var aneObj=function(){
    //console.log(1);
    //1.1创建数组保存每一个海葵的高度
    this.len=[];
    //1.2创建数组保存每一个海葵x坐标
    this.x=[];
}
aneObj.prototype.num=50;//海葵数量
//2:初始化海葵方法
aneObj.prototype.init=function(){
    //console.log(2);
    //2.1循环初始化每一个海葵
    for(var i=0;i<this.num;i++){
        //初始化海葵高度=固定值200+50*随机值
        this.len[i]=200+Math.random()*50;
        //初始化海葵的x值=i*16=+20随机值，每隔16，最多隔36
        this.x[i]=i*16+Math.random()*20;
    }
    //console.log(this.len);
    //console.log(this.x);
}
//3.绘制海葵方法
aneObj.prototype.draw=function(){
    //console.log(3);
    //1.保存画笔当前状态
    ctx2.save();
    //2.描边宽度 20
    ctx2.lineWidth=20;
    //3.紫色
    ctx2.strokeStyle="#3b154e";
    //3.1透明度
    ctx2.globalAlpha=0.6;
    //3.2线段末尾加载圆角
    ctx2.lineCap="round";
    //4.循环50次
    for(var i=0;i<this.num;i++){
        //5.开始新路径
        ctx2.beginPath();
        //6.移动画布最底端
        ctx2.moveTo(this.x[i],canHeigth);
        //7.绘制一条直接 画布高度-海葵高度
        ctx2.lineTo(this.x[i],canHeigth-this.len[i]);
        //8.描边
        ctx2.stroke();
    }
    //9.恢复状态
    ctx2.restore();
}























