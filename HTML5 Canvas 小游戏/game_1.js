var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
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

//Monsters image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "image/monster.png";

var hero = {
    speed : 256
};
var monster = {};
var counts = 0;

//Handle keyboard contrals
var keyDown = {};
addEventListener("keydown",function (e) {
    keyDown[e.keyCode] = true;
},false);
addEventListener("keyup",function (e) {
    delete keyDown[e.keyCode];
},false);

//Reset the game when the play catches monsters
var flag = true;
var reset = function () {
    if(flag){
        hero.x = canvas.width/2;
        hero.y = canvas.height/2;
    }
    monster.x = 32 + (Math.random()*(canvas.width-128));
    monster.y = 32 + (Math.random()*(canvas.height-128));
};

var update = function (modifier) {
    if(37 in keyDown){
        hero.x -= hero.speed*modifier;
    }
    if(38 in keyDown){
        hero.y -= hero.speed*modifier;
    }
    if(39 in keyDown){
        hero.x += hero.speed*modifier;
    }
    if(40 in keyDown){
        hero.y += hero.speed*modifier;
    }
    if(hero.x >= canvas.width - 64){
        hero.x = canvas.width -64;
    }
    if(hero.x <= 32){
        hero.x = 32;
    }
    if(hero.y >= canvas.height - 64){
        hero.y = canvas.height -64;
    }
    if(hero.y <= 32){
        hero.y = 32;
    }
    //Are they touching?
    if(
        hero.x >= monster.x - 31
        && hero.x <= monster.x + 31
        && hero.y >= monster.y - 32
        && hero.y <= monster.y + 32
    ){
        counts++;
        reset();
        flag = false;
    }
};



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
    ctx.fillText("counts: "+counts,32,32);
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

};

//Main loop
var main = function () {
    var now = Date.now();
    dele = now - then;
    update(dele/1000);
    render();
    then = now;
    //Request to do this again ASAP
    requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame
|| w.mozRequestAnimationFrame || w.msRequestAnimationFrame;

var then = Date.now();
reset();
main();

