//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock,fedTime,lastFed;
var bg;
var feedDog,addFood;
var foodObj,fedTime,value,FeedTime;
function preload()
{
  //load images 
  doggyImg=loadImage("Dog.png")
  happyDoggyImg=loadImage("happydog.png")
  milkimg=loadImage("Milk.png")
  bg=loadImage("images.jpg")
}
function setup() {
  createCanvas(600,500);
  
  foodObj=new Foody();

  dog=createSprite(450,250,150,150);
  dog.addImage(doggyImg);
  dog.scale=0.15;
  database=firebase.database();
  
  var feedDogs = createButton("Feed your dog");
  feedDogs.position(650,100);
  feedDogs.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(770,100);
  addFood.mousePressed(addFoods);
  
  nameBox = createInput('').attribute('placeholder','Your pet name');
  nameBox.position(450,100)

  var  milkbottle = createSprite(370,270)
  milkbottle.addImage(milkimg)
  milkbottle.visible = 2
  milkbottle.scale = 0.1
}
function draw() {  
  background(bg)
  
 value = nameBox.value();
 foodObj.display();
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 })
 fill(0);
 textSize(25);
 if(lastFed>=12){
   text("Last Fed : "+ lastFed%12 + " PM", 400,30);
  }else if(lastFed==0){
    text("Last Fed : 12 PM",350,30);
  }else{
    text("Last Fed : "+ lastFed + " AM", 400,30);
  }
  fill("red")
   textSize(35)
   text(value,400,dog.y-80)
  drawSprites();
  textSize(30)
  fill(0)
  text("Virtual-Pet-2-by-Shah Dhruvi",10,30)
  textSize(44)
  fill("goldenrod")
  textFont("cursive")
  text("*please take care of the pet*",0,490)
}
function feedDog()
{
  dog.addImage(happyDoggyImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods()
{
  
  foodObj.updateFoodStock(foodObj.foodStock+1);
  database.ref('/').update({
    Food:foodObj.foodStock
  });
}