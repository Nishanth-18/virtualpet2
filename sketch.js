//Create variables here

var dog,dogImage,happyDog,database,foodS,foodStock
var database
var fedTime, lastFed, feed, addFood, foodObj

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")


}

function setup() {
  createCanvas(1000, 1000);
  database = firebase.database()
  dog = createSprite (250,250,50,50)
  dog.addImage(dogImage)
  dog.scale = 0.25

  foodStock=database.ref('Food');
   foodStock.on("value",readStock);

  foodObj = new Food ()

  feed = createButton ("feed the dog")   
  feed.position(700,100)
  feed.mousePressed(feedDog)

  addFood = createButton ("add food")   
  addFood.position(800,100)
  addFood.mousePressed(addFoods)


   


  
}


function draw() 
{  

  background(46,129,87);

  foodObj.display();

  
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){lastFed=data.val();});

 fill(255,255,254);
 textSize(15);
 if(lastFed>=12)
 {
   text("Last Feed :"+lastFed%12 + "PM",350,30);
 }
 else if (lastFed==0)
 {
   text("Last Feed : 12AM",350,30);
 }
 else
 {
   text("Last Feed :"+ lastFed + "AM",350,30);
 }

  drawSprites();
  
  

}



function feedDog()
{
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update
  (
    {
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    }
  )
}

function addFoods()
{
  foodS++;
  database.ref('/').update
  (
    {
     Food:foodS
    }
  )
}

function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

/*function writeStock(x)
{
  if(x<=0)
  {
    x=0;
  }
  else{
    x=x-1
  }
  
  database.ref('/').update({Food:x})
}
*/


