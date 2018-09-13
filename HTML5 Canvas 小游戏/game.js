var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "image/background.png";

//Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "image/hero.png";

//Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "image/monster.png";

var hero = {
    speed : 256 //movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

//Handle keyboard contorls
var keysDown = {};
addEventListener("keydown",function(e){
    keysDown[e.keyCode] = true;
},false);
addEventListener("keyup",function (e) {
    delete keysDown[e.keyCode];
},false);

//Reset the game when the player catches a monster
var reset = function () {
    hero.x = canvas.width/2;
    hero.y = canvas.height/2;

    //Create monster's position
    monster.x = 32 + (Math.random()*(canvas.width-64));
    monster.y = 32 + (Math.random()*(canvas.height-64));
}

var update = function (modifier) {
    if(37 in keysDown){  //Player holding left
        hero.x -= hero.speed*modifier;
    }
    if(38 in keysDown){  //Player holding up
        hero.y -=hero.speed*modifier;
    }
    if(39 in keysDown){  //Player holding right
        hero.x += hero.speed*modifier;
    }
    if(40 in keysDown){  //Player holding down
        hero.y +=hero.speed*modifier;
    }

    //Are they touching?
    if(
        hero.x <= (monster.x + 31) && hero.x >= (monster.x - 31)
        && hero.y <= (monster.y + 32) && hero.y >= (monster.y - 32)
    ){
        monstersCaught++;
        reset();
    }
};

//Draw everything
var render = function () {
    if(bgReady){
        ctx.drawImage(bgImage,0,0);
    }
    if(heroReady){
        ctx.drawImage(heroImage,hero.x,hero.y);
    }
    if(monsterReady){
        ctx.drawImage(monsterImage,monster.x,monster.y);
    }

    //Score
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: "+ monstersCaught,32,32);
};

//Main game loop
var main = function () {
    var now = Date.now();
    var del = now - then;
    update(del / 1000);
    render();
    then = now;
    //Request to do this again ASAP
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame
|| w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
