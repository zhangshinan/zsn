/**
 * Created by ZSN on 2017/6/3.
 */

(function(Fly){

  function Sky(config){

    this.skyImg = config.img;
    this.skyX = config.x;
    this.skyY = 0;
    this.skySpeed = 0.15;
    this.ctx = config.ctx;
  }

  Sky.prototype={
    constructor:Sky,
    draw:function(delta){
      this.skyX -=this.skySpeed* delta;

      if(this.skyX < -this.skyImg.width){
        this.skyX += this.skyImg.width*2
      }
      this.ctx.drawImage(this.skyImg, this.skyX,this.skyY);
    }
  };





  Fly.Sky = Sky
})(Fly);
