/**
 * 大鱼小鱼程序js入口程序
 * 控制游戏整个流程
 *
 * 核心函数
 * game 入口函数-》页面加载成功后调用
 * init  初始化游戏角色（加载图片，坐标，速度）
 * gameloop 定时绘制游戏的角色.
 */
//0：页面加载成功后立即调用game
document.body.onload=game;

//1:创建全局变量保存各种不同数据
//1.1创建变量保存画布
var can1=null;//前【大鱼，小鱼】
var can2=null;//后【背景 海葵 实物】
//1.2创建变量保存画笔
var ctx1=null;
var ctx2=null;
//1.3创建变量保存画布宽度与高度
var canWidth=0;
var canHeigth=0;
//1.4创建变量保存背景图片对象
var bgPic=null;
//1.5创建变量保存海葵对象
var ane=null;
//1.6创建变量保存果实对象
var fruit=null;
//1.7（为食物变化的更加平滑）创建两个变量保存上一帧的时间间隔和上一帧与当前帧的时间间隔
var lastTime;//上一帧被执行时间
var deltaTime;//两帧间隔时间
//1.8创建变量保存大鱼
var mom;
//1.9创建两个变量保存鼠标移动位置
var mx=0;
var my=0;
//1.10创建一个变量保存小鱼
var baby;
/**
 * 1.游戏入口
 */
function game(){
    //console.log(1);
    init();
    lastTime=Date.now();//初始化上一帧时间
    deltaTime=0;//两帧的时间间隔为0
    gameloop();
}
/**
 * 2.游戏初始化
 */
function init(){
    //console.log(2);
    //2.1创建画布对象
    can1=document.getElementById("canvas1");
    can2=document.getElementById("canvas2");
    //console.log(can1);
    //console.log(can2);
    //2.2创建画笔对象
    ctx1=can1.getContext("2d");
    ctx2=can2.getContext("2d");
    //console.log(ctx1);
    //console.log(ctx2);
    //2.3创建画布宽度和高度
    canWidth=can1.width;
    canHeigth=can1.height;
    //console.log(canWidth+":"+canHeigth);
    //2.4创建背景图片并且下载
    bgPic=new Image();
    bgPic.src="src/background.jpg";//适合下载大量图片,onload加载少量图片
    //2.5创建海葵的对象并且初始化海葵方法
    ane=new aneObj();
    ane.init();
    //2.6创建果实对象并且初始化果实方法
    fruit=new fruitObj();
    fruit.init();
    //2.7创建大鱼对象，并且初始化大鱼方法
    mom=new momObj();
    mom.init();
    //2.8初始化鼠标位置为画布中心
    mx=canWidth*0.5;
    my=canHeigth*0.5;
    //2.9为画布1添加鼠标移动事件，监听位置
    can1.addEventListener("mousemove",
        onMouseMove,false);
    //2.10创建小鱼对象并且初始化小鱼方法
    baby=new babyObj();
    baby.init();
}
/**
 * 3.游戏定时绘制游戏角色
 */
function gameloop(){
    //创建定时器智能间隔一定时间调用自己gameloop，替代setInterval()
    //3.1创建智能定时器调用gameloop函数
    requestAnimationFrame(gameloop);//无（）
    //3.11初始化两个时间
    var now=Date.now();
    deltaTime=now-lastTime;//两帧之差
    lastTime=now;//更新上一次时间
    //console.log(deltaTime);//12~50之间，
    //console.log("loop...");
    //3.2绘制背景
    drawBackground();
    //console.log(3);
    //3.3绘制海葵
    ane.draw();
    //3.3.1监听画布上果实的状态
    fruitMonitor();
    //3.3.2碰撞检测
    momFruitCollision();
    //3.3.3碰撞检测小鱼和大鱼
    momBabyCollsion();
    //3.4绘制果实
    fruit.draw();
    //3.4.1清空画布原有内容
    ctx1.clearRect(0,0,canWidth,canHeigth);
    //3.5绘制大鱼
    mom.draw();
    //3.6绘制小鱼
    baby.draw();

}
//main.js
//4：创建函数获取鼠标位置
function onMouseMove(e){
    //4.1创建两个变量保存鼠标位置
    //4.2判断兼容性 e.offsetX e.offsetY
    //            e.layerX e.layerY
    if(e.offsetX||e.layerX){
        mx=e.offsetX==undefined?e.layerX:e.offsetX;
    }
    if(e.offsetY||e.layerY){
        my=e.offsetY==undefined?e.layerY:e.offsetY;
    }
    //console.log(mx+":"+my);
}


























