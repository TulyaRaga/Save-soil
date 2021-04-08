var girl,girl_img; 
var girl2;
var bottle, bottle_img;
var bag, bag_img;
var bg1,bg2;
var invisibleGround;
var bottlesGroup;
var dustbin;
var score=0;
var seaimg;
var gameState=2;
var girlSwim;
var girlSwimimg;
function preload(){
bg1=loadImage("Images/pathway.jpg")
girl_img= loadAnimation("Images/girl_1.png","Images/girl_2.png","Images/girl_3.png","Images/girl_4.png","Images/girl_5.png","Images/girl_6.png");
bottle_img= loadAnimation("Images/bottle.png","Images/bottle1.png","Images/bottle2.png","Images/bottle3.png")
bag_img= loadAnimation("Images/bag1.png","Images/bag2.png","Images/bag3.png","Images/bag4.png")
dustbin_open=loadImage("Images/dustbinO.png");
dustbin_close=loadImage("Images/dustbinC.png")
girlSwimimg=loadAnimation("s1.png","s2.png","s3.png","s4.png","s5.png","s6.png","s7.png","s8.png","s9.png","s10.png","s11.png","s12.png","s13.png","s14.png","s15.png","s16.png","s17.png","s18.png","s19.png","s20.png","s21.png","s22.png","s23.png","s24.png","s25.png","s26.png","s27.png","s28.png","s29.png","s30.png","s31.png","s32.png","s33.png","s34.png","s35.png","s36.png","s37.png","s38.png","s39.png","s40.png","s41.png","s42.png","s43.png","s44.png","s45.png","s46.png","s47.png","s48.png","s49.png")
seaimg=loadAnimation("sea/sea-0.jpg","sea/sea-1.jpg","sea/sea-2.jpg","sea/sea-3.jpg","sea/sea-4.jpg","sea/sea-5.jpg","sea/sea-6.jpg","sea/sea-7.jpg","sea/sea-8.jpg","sea/sea-9.jpg","sea/sea-10.jpg","sea/sea-11.jpg","sea/sea-12.jpg","sea/sea-13.jpg","sea/sea-14.jpg","sea/sea-15.jpg","sea/sea-16.jpg","sea/sea-17.jpg","sea/sea-18.jpg","sea/sea-19.jpg","sea/sea-20.jpg","sea/sea-21.jpg","sea/sea-22.jpg","sea/sea-23.jpg","sea/sea-24.jpg","sea/sea-25.jpg","sea/sea-26.jpg")
} 

function setup(){

    createCanvas(1000,400);
    
      bg= createSprite(500,200);
      
      bg.addAnimation("pathway",bg1);
      bg.scale=0.1
      bg.velocityX=-2;

        
      bg2=createSprite(250,200);
      bg2.addAnimation("sea",seaimg);
      bg2.scale=3
      bg2.x = bg2.width /2;
      bg2.velocityX=-3;
      bg2.visible=false;
      bg2.x = bg2.width /2;

      girl=createSprite(100,250)
      girl.addAnimation("running",girl_img)

      girlSwim=createSprite(200,200);
      girlSwim.addAnimation("swimming",girlSwimimg);
      girlSwim.visible=false;
    
      invisibleGround = createSprite(200,400,400,10);
      invisibleGround.visible = false;

      bottlesGroup =new Group();
      bagsGroup = new Group();

      dustbin= createSprite(900,50,160,100);
      dustbin.addImage(dustbin_close);
      dustbin.scale=0.2;
      //dustbin.debug=true;
}

function draw(){
  
    background(255);
     
    if(bg.x<200){
          bg.x=500;
      }

    if(keyDown("space") ){
      girl.velocityY = -12; 
    }

    if(gameState===1){
      
        spawnbottles();

        for(i=0;i<bottlesGroup.length;i++){
              if(girl.isTouching(bottlesGroup.get(i))){
                score=score+2
                dustbin.addImage(dustbin_open);
              bottlesGroup.get(i).x=900;
              bottlesGroup.get(i).y=50;
              bottlesGroup.get(i).setVelocity(0,0);
              bottlesGroup.get(i).lifetime=10;
              bottlesGroup.get(i).scale=0.1; 
              }
          }
          if (score>=14){
            gameState=2;
            bg.destroy();
          }
          bg.changeAnimation("pathway",bg1);
      bg.scale=3
      bg.velocityX=-3;
      bg.x = bg.width /2;
      bg.visible=true
      seaimg.visible=false
     girlSwim.visible=false
     bg2.visible=false
     
     bg.visible=true
          girl.collide(invisibleGround);
          girl.velocityY = girl.velocityY + 0.8;

     } else if (gameState===2){
       
      spawnbags();
          if(keyDown("UP_ARROW")){
        girlSwim.velocityY = -12; 
      }
      for(i=0;i<bagsGroup.length;i++){
        if(girlSwim.isTouching(bagsGroup.get(i))){
          score=score+2
          dustbin.addImage(dustbin_open);
        bagsGroup.get(i).x=900;
        bagsGroup.get(i).y=50;
        bagsGroup.get(i).lifetime=10;
        bagsGroup.get(i).scale=0.1; 
        }
    }

    if (score>=5){
      gameState=1;
      //bg.destroy();
    }
     
    
      girlSwim.visible=true;
      bg2.changeAnimation("sea",seaimg);
      bg2.scale=3
      bg2.velocityX=-3;
      bg2.x = bg2.width /2;
      bg2.visible=true
      girl.visible=false  ;

      //girlSwim.collide(invisibleGround);
     //  girlSwim.velocityY = girlSwim.velocityY + 0.8;
    }

    drawSprites();
    textSize(32);
    fill("yellow");
    stroke(0);
    strokeWeight(2);
    text("Score:-"+score,800,50)
   
    dustbin.addImage(dustbin_close);
  
  }

    function spawnbottles() {
      
        if (frameCount % 100 === 0) {
          var bottle = createSprite(1200,400,10,20);
          bottle.y = Math.round(random(30,200));
          bottle.addAnimation("fliping",bottle_img);
        bottle.scale = 0.2;
          bottle.velocityX = -3;
          bottlesGroup.add(bottle);
          
          //bottle.lifetime = 200;
          
        
          //bottle.depth =girl.depth;
        }
    }
    
    function spawnbags() {
      
      if (frameCount % 100 === 0) {
        var bag = createSprite(1200,400,10,20);
      bag.y = Math.round(random(30,200));
        bag.addAnimation("rotate",bag_img);
      bag.scale = 0.2;
        bag.velocityX = -3;
        bagsGroup.add(bag);
        
        //bottle.lifetime = 200;
        
      
        //bottle.depth =girl.depth;



      }

    }  
      
 

