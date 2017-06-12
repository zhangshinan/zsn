/**
 * Created by ZSN on 2017/6/2.
 */
(function (window){

  'use strict';
  var FlyObj = {};
  //将弧度转化为角度
  FlyObj.toRadian=function(angle){
    return angle/180*Math.PI;
  };
  //封装一个模拟定时器的函数
  FlyObj.raf=function(callback, interval){
    var lastFrameTime = new Date();
    (function render() {
      var curFrameTime = new Date();

      if (curFrameTime - lastFrameTime >= interval) {

        lastFrameTime = curFrameTime;
        callback();
      }

      requestAnimationFrame(render);

    })()
  };
  //图片加载
    FlyObj.LoadImage = function(srcList,callback){
    // 思路：
    // 有一个变量用来记录加载完成的图片数量
    // 只要有一个图片加载完成了，就让数量加1
    // 如果这个数量与全部加载的图片数量相同了，此时，就说明加载完成了
    var count = 0,
        length = srcList.length,
        imgObj = {};

      srcList.forEach(function(srcStr){
        var img = new Image();
        img.src = './images/'+srcStr+'.png';
        imgObj[srcStr]=img;
        img.onload=function(){
          count++;
          if( count >= length) {
            //当图片加载完成执行回调函数
            callback(imgObj);
          }

        }

      })


    };

   window.Fly = FlyObj
  })(window);