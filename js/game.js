/**
 * Created by ZSN on 2017/6/3.
 */
(function(Fly){

  'use strict';

  function Game(config){
    this.ctx = config.ctx;
    this.isStart = true;

    this.lastTime = new Date();
    this.curTime = 0;
    this.delta = 0;
    this.hero = null;
    this.role = [];
    //图片的文件名称(路径)
    this.imgArr = ['birds', 'land', 'pipe1', 'pipe2', 'sky'];

    this.createCanvas(config.id)
  }

  Game.prototype={
    constructor:Game,

    //开始游戏
    start:function(){
      var that = this;
      Fly.LoadImage(that.imgArr, function (imgList) {

        that.initRoles(imgList);
        that.render(imgList);

        that.bindEvent();


      })
    },


    //初始化游戏
    initRoles:function(imgList){
      var ctx = this.ctx;
      var i;

      //创建小鸟对象
      this.hero = new Fly.Bird({
        img:imgList.birds,
        ctx:ctx
      });
      //  console.log('创建了小鸟对象');


      //创建天空对象

      for(i = 0; i < 2; i++) {
        var sky = new Fly.Sky({
          img:imgList.sky,
          ctx:ctx,
          x:i*imgList.sky.width


        });

        this.role.push(sky)
      }

      //创建管道
      for( i = 0; i < 6; i++) {
        var pipe = new Fly.Pipe({
          topImg:imgList.pipe2,
          bottomImg:imgList.pipe1,
          ctx:ctx,
          pipeSpace:150,
          x:i*imgList.pipe2.width*3 +250

        });
        this.role.push(pipe);
      }

      //创建陆地
      for( i= 0; i < 4; i++) {
        var land = new Fly.Land({
          img:imgList.land,
          ctx:ctx,
          //y:cv.height,
          x:i*imgList.land.width,
          y:imgList.sky.height-imgList.land.height
        });
        this.role.push(land)
      }


    },

    //渲染游戏
    render:function(imgList){

      var that = this;

      var imgSky = imgList.sky;
      var imgLand = imgList.land;

      (function render(){

        that.ctx.save();
        //清除画布
        that.ctx.clearRect(0, 0,that.ctx.canvas.width, that.ctx.canvas.height);
        that.ctx.beginPath();

        that.curTime = new Date();
        that.delta = that.curTime - that.lastTime;
        that.lastTime = that.curTime;





        //绘制陆地,绘制管道
        that.role.forEach(function(rol){

          rol.draw(that.delta);
          //console.log(that.role);

        });

        //绘制小鸟
        that.hero.draw(that.delta);

        //碰撞检测
        if(that.hero.y < 0 ||that.hero.y >= (imgSky.height - imgLand.height) || that.ctx.isPointInPath(that.hero.x,that.hero.y) ){
         /* console.log(imgSky.height);
          console.log(imgLand.height);*/
          that.isStart = false
        }

        that.ctx.restore();
        if(that.isStart) {
          requestAnimationFrame(render);
        }
      })()
    },

    //绑定事件

    bindEvent:function(){
      var that = this;
      that.ctx.canvas.addEventListener('click', function(){
        that.hero.changeSpeed(-0.3)
      })
    },


    //动态创建canvas
    createCanvas:function(id){
      var cv = document.createElement('canvas');
        cv.height = 600;
        cv.width = 800;
      var container = document.getElementById(id) || document.body;
      container.appendChild(cv);

      this.ctx = cv.getContext('2d');

    }

  };





  Fly.Game = Game;
})(Fly);

