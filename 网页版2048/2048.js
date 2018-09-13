//初始化棋盘
function initial() {
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            var everyCell  = $('#cell-'+ i + '-' + j);
            everyCell.css({top:getPos(i),left:getPos(j)});
        }
    }
}

//获取位置
function getPos(num) {
    return 20 + num*120;
}
//数字格
function numFormat() {
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            $('#container').append('<div class="name" id="number-'+ i +'-'+ j +'")</div>')
            //设置数字格的位置，样式
            var everyNumber = $('#number-'+ i +'-'+ j);
            if(checkerboard[i][j] == 0){
                everyNumber.css({
                    width : '0px',
                    height : '0px',
                    top : getPos(i)+50,
                    left : getPos(j)+50
                })
            }else{
                everyNumber.css({
                    width: '100px',
                    height: '100px',
                    top : getPos(i),
                    left : getPos(j),
                    backgroundColor : getBackgroundColor(checkerboard[i][j]),
                    color : getColor(checkerboard[i][j])
                });
                everyNumber.text(checkerboard[i][j]);
            }
        }
    }
}

//获取相应数字的背景颜色
function getBackgroundColor(number) {
    switch (number) {
        case 2 : return "#eee4da"; break;
        case 4 : return "#ede0c8"; break;
        case 8 : return "#f2b179"; break;
        case 16 : return "#f59563"; break;
        case 32 : return "#f67c5f"; break;
        case 64 : return "#f65E3b"; break;
        case 128 : return "#edcf72"; break;
        case 256 : return "#edcc61"; break;
        case 512 : return "#9c0"; break;
        case 1024 : return "#33b5e5"; break;
        case 2048 : return "#09c"; break;
        case 8192 : return "#93c"; break;
    }
}

//设置相应数字的文字颜色
function getColor(number) {
    if(number <= 4){
        return "776e65";
    }else return "white";

}

//随机在一个位置上产生一个数字
function randomNum() {
    //随机产生一个坐标值
    var randomX = Math.floor(Math.random()*4);
    var randomY = Math.floor(Math.random()*4);
    //随机产生一个数字（2或4）
    var randomValue = Math.random()>0.5?4:2;
    //在数字格不为0的地方生成一个随机数字
    while(true){
        if(checkboard[randomX][randomY] == 0){
            break;
        }else{
            var randomX = Math.floor(Math.random() * 4);
            var randomY = Math.floor(Math.random() * 4);
        }
    }
    //将随机产生的数字显示在随机的位置上
    checkboard[randomX][randomY] = randomValue;
    //动画
    randomNumAnimate(randomX,randomY,randomValue);
}

//随机产生数字的动画
function randomNumAnimate(randomX, randomY, randomValue) {
    var randomnum = $('#number- ' + randomX + '-' + randomY);
    randomnum.css({
        backgroundColor: getBackgroundColor(randomValue),
        color: getColor(randomValue),
    })
        .text(randomValue)
        .animate({
            width: '100px',
            height: '100px',
            top: getPos(randomX),
            left: getPos(randomY)
        }, 50);
}

//获取键盘事件，检测不同的按键进行不同的操作
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:
            if(canMoveLeft(checkboard)){
                MoveLeft();
                setTimeout(function () {
                    randomNum();
                },200);
            }
            break;
        case 38:
            if(canMoveUp(checkboard)){
                MoveUp();
                setTimeout(function () {
                    randomNum();
                },200)
            }
            break;
        case 39:
            if(canMoveRight(checkboard)){
                MoveRight();
                setTimeout(function () {
                    randomNum();
                },200)
            }
            break;
        case 40:
            if(canMoveDown(checkboard)){
                MoveDown();
                setTimeout(function () {
                    randomNum();
                },200)
            }
            break;
        default:
            break;
    }
});

//判断是否可以向左移动
function canMoveLeft(checkboard) {
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(checkboard[i][j] !=0){
                if(checkboard[i][j-1]==0 || checkboard[i][j] == checkboard[i][j-1]){
                    return true;
                }
            }
        }
    }
    return false;
}

//向左移动
function MoveLeft() {
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(checkboard[i][j] !=0){
                for(var k=0;k<j;k++){
                    if(checkboard[i][k]==0&&noMiddleNumRow(i,k,j,checkboard)){
                        moveAnimation(i,j,i,k);
                        checkboard[i][k] = checkboard[i][j];
                        checkboard[i][j]=0;
                    }else if(checkboard[i][k] == checkboard[i][j]&&noMiddleNumRow(i,k,j,checkboard)&&!hasConflicted[i][k]){
                        moveAnimation(i,j,i,k);
                        checkboard[i][k] += checkboard[i][j];
                        checkboard[i][j] = 0;
                    }
                }
            }
        }
    }
    //设置刷新的时间是为了让运动的动画走完，再进行更新数字格，否则数字格运动的动画将会被打断
    setTimeout(function () {
        numFormat();
    },200);
}

//更新分数
score += checkboard[k][j];
updateScore(score);
//设置分数
function updateScore(num) {
    $('#score').text(num);
}

//判断游戏是否结束
function wheGameOver(checkboard) {
    if(!canMoveLeft(checkboard)&&!canMoveUp(checkboard)&&!canMoveRight(checkboard)&&canMoveDown(checkboard)){
        showGameOver();
    }
}
//显示游戏结束
function showGameOver() {
    $('#container').append("<div id='gameover'><p>最终得分</p><span>"+scrore+"</span><a href='javascript:resert();'>重新开始游戏</a></div> ")
}
//重新开始游戏
function reset() {
    $('#gameover').remove();
    newgame();
}

