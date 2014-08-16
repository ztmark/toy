/**
 * Created by Mark on 2014/8/7.
 */

/*//画一个方块的代码
var stage = new createjs.Stage("gameView");
var gameView = new createjs.Container();
stage.addChild(gameView);
var s = new createjs.Shape();
s.graphics.beginFill("#EA8E6A");
s.graphics.drawRect(50,50,100,100);
s.graphics.endFill();
gameView.addChild(s);
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);*/


// Game

var stage = new createjs.Stage("gameView");
var gameView = new createjs.Container();
stage.addChild(gameView);

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);

var n = 2;
function addRect() {
    var cl = parseInt(Math.random()*1000000);
    var color = "#"+cl;
    var rectColor = "#EA86EA"; //应该是比color颜色稍淡的一个颜色
    var x = parseInt(Math.random()*n);
    var y = parseInt(Math.random()*n);
    for(var indexX=0; indexX<n; indexX++) {
        for(var indexY=0; indexY<n; indexY++) {
            var r = new Rect(n,color,rectColor);
            gameView.addChild(r);
            if(indexX === x && indexY === y) {
                r.setRectType(2);
            }
            r.x = indexX*(400/n);
            r.y = indexY*(400/n);
            if(r.getRectType() == 2) {
                r.addEventListener("click",function(){
                    if(n < 10) {
                        n++;
                    }
                    gameView.removeAllChildren();
                    addRect();
                });
            }
        }
    }
}

addRect();

