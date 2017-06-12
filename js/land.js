/**
 * Created by ZSN on 2017/6/3.
 */
(function(Fly){
  'use strict';

  function Land(config){
    this.landImg = config.img;
    this.ctx = config.ctx;
    this.imgW = this.landImg.width;
    this.imgH = this.landImg.height;
    this.x = config.x;
    this.speed = 0.15;
    this.y = config.y;

  }


  Land.prototype={
   constructor:Land,

   draw:function(delta){
     this.x -= this.speed * delta;
      if(this.x <= -this.imgW) {
        this.x += this.imgW*4
      }
    this.ctx.drawImage(this.landImg,this.x,this.y)
   }


  };


  Fly.Land = Land;

})(Fly)