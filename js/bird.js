/**
 * Created by ZSN on 2017/6/2.
 */

(function(Fly){

  'use strict';

  var Bird = function(config){
    this.birdImg = config.img;
    this.ctx = config.ctx;
    this.imgW = this.birdImg.width / 3;
    this.imgH = this.birdImg.height;
    this.x = 100;
    this.y = 100;
    this.speed = 0;
    this.a = 0.0005;
    this.delta = 0;
    this.maxSpeed = 0.3;
    this.maxAngle = 45;
    this.curAngle = 0;
    this.index = 0;

  };

  Bird.prototype= {
    constructor: Bird,

    draw: function (delta) {
      //console.log('绘制小鸟');
//绘制小鸟
      this.speed = this.speed + this.a * delta;
      //设置角度
      this.curAngle = this.speed / this.maxSpeed * this.maxAngle;

      //计算小鸟的位置
      this.y += this.speed * delta + 1 / 2 * this.a * delta * delta;
      //console.log(this.speed);

      //平移圆点,设置小鸟旋转角度
      this.ctx. translate(this.x,this.y);

      //判断小鸟旋转的角度,
      if(this.speed > this.maxSpeed){
        this.curAngle = this.maxAngle;
      }else if(this.speed < -this.maxSpeed) {
        this.curAngle = -this.maxAngle;
      }

      //设置小鸟的旋转角度
      this.ctx.rotate(Fly.toRadian(this.curAngle));

      this.ctx.drawImage(this.birdImg, this.imgW * this.index++, 0, this.imgW, this.imgH, -this.imgW/2, -this.imgH/2, this.imgW, this.imgH);
      //console.log(this.birdImg);
      //console.log(this.imgW);
      //console.log(this.imgH);


      if (this.index >= 3) {
        this.index = 0;
      }
      //console.log(this.index);

    },

    changeSpeed:function(speed){
      this.speed=speed;
    }

  };
  Fly.Bird =Bird;
})(Fly);