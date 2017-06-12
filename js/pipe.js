/**
 * Created by ZSN on 2017/6/3.
 */
(function(Fly){

  'use strict';

  function Pipe(config){
    this.topImg=config.topImg;
    this.bottomImg=config.bottomImg;
    this.ctx = config.ctx;
    this.x = config.x;

    this.speed = 0.15;
    this.imgW = this.topImg.width;
    this.imgH = this.topImg.height;
    this.pipeSpace = config.pipeSpace;


    //随机生成管道的高
    this.topY = 0;
    this.bottomY = 0;

    this.initPipeHeight();

  }

  Pipe.prototype = {
    constructor:Pipe,
    draw:function(delta){
      this.x -= this.speed*delta;

      if(this.x < -this.imgW*3){
        this.x += this.imgW*3 *6;
        //重新生成管道的高度
        this.initPipeHeight();
      }

      //为每一个管道描绘路劲

      this.ctx.rect(this.x,this.topY,this.imgW,this.imgH);
      this.ctx.rect(this.x,this.bottomY,this.imgW,this.imgH);


      this.ctx.drawImage(this.topImg,this.x,this.topY);
      this.ctx.drawImage(this.bottomImg,this.x,this.bottomY);
      //this.ctx.fill();


    },
    initPipeHeight:function(){
      //上面管道的高度
     var pipeTopHeight = Math.random()*200+50;
      //上面管道的Y坐标
     this.topY = pipeTopHeight -this.imgH;
      //下面管道的Y坐标
      this.bottomY = pipeTopHeight + this.pipeSpace

    }

  };


 Fly.Pipe = Pipe;
})(Fly);