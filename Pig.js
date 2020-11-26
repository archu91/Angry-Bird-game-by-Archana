class Pig extends BaseClass {
  constructor(x, y){
    super(x,y,50,50);
    this.image = loadImage("sprites/enemy.png");
    this.Visiblity = 255;
  }

 display(){
  
   if(this.body.speed < 3){
    super.display();
   }
   
   else{
     World.remove(world, this.body);
     push();
     this.Visiblity = this.Visiblity - 5;
     //console.log( this.Visiblity)
     tint(255,this.Visiblity);
     image(this.image, this.body.position.x, this.body.position.y, 50, 50);
     pop();
   }
  }

  score(){
    if (this.Visiblity < 0 && this.Visiblity > -505){
      score++;
      if(score=== 1 || score===101) {
        pigSound.loop = false;
        pigSound.play();
    }
    }
  }



};