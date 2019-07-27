/**
 * collsion.js
 * 完成碰撞检测
 * 1大鱼小鱼碰撞
 * 2大鱼食物碰撞
 */
//创建变量保存大鱼与食物之间距离，碰撞值。默认900，方便后续修改
var momFruitLen=900;
var momBabyLen=900;
/**
 * 碰撞检测：大鱼与多个食物15之间的检测，食物状alive[i]=true
 * 食物检测：如果大鱼和某个食物距离：小于30px
 * 表示食物被大鱼吃了
 * 将食物alive[i]=false
 */
function momFruitCollision(){
    //1:循环遍历所有食物
    for(var i=0;i<fruit.num;i++){
        //2：判断当前食物状态alive[i]==true
        if(fruit.alive[i]){
            //3:当前食物和大鱼之间的距离（调用commonFunction.js--calLength）
            //fruit.x[]fruit.y[] mom.x[]mom.y[]
            var len=calLength2(
                fruit.x[i],fruit.y[i],
                mom.x,mom.y
            );//4：小于等于30px相当于食物被吃
            if(len< momFruitLen){
                //5：将食物状态alive[i]=false
                //fruit.alive[i]=false;
            //    程序原则，谁的数据，水修改（开闭原则,自己的类自己修改），调用方法即可
                fruit.dead(i);
            }

        }

    }

}

/**
 * 检查大鱼与小鱼是否发生碰撞
 * 小鱼身体下标0
 */
function momBabyCollsion(){
    //计算大鱼和小鱼之间的距离
    var len=calLength2(mom.x,mom.y,baby.x,baby.y);
    //距离小于900，间距小于30个像素
    if(len< momBabyLen){
        //吃饱了
        baby.babyBodyIndex=0;
    }
}