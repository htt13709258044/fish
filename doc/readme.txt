大鱼和小鱼游戏
目录结构
game
  doc  说明文档
  src  所有游戏图片
       canvas-1
      大鱼【身体，眼睛，尾巴】
      小鱼【身体，眼睛，尾巴】
      食物
      canvas-2
      漂浮物
      海葵-》
      背景-》
  js  js程序
  css  css程序
  index.html  游戏入口文件

  定时器：
  1：一次性定时 setTimeout();
  2：周期性定时器 setInterval(fn,50);//有的计算机运算速度较慢，50ms来不及
  3：上述两项不适合开发动画项目----更平滑
   requestAnimationFrame 定时器（动画）
   根据机器性能，自动选择绘制间隔时间（智能计算绘制的最佳周期
   解决问题：setInterval();jquery1,2,3）
   存在问题：兼容性问题
   如何解决：commonFunction.js

   第二天：海葵（静止）
   canvas-路径：beginPath() MoveTo()  lineTo();

   ane.js海葵
   1：声明海葵类
     高[]
     x[]
   2：初始化
    随机高度 0~1*50+200
    x ?
   3：绘制方式
   循环  50
   beginPath();
   moveTo();
   lineTo();
   background.js
   main.js
   friut.js
   commonFunction.js




















