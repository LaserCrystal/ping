//variables
let ticks;
let runcheck = false;

let canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
start()

function start() {
    runcheck = false;
    refresh();
    ctx.fillStyle = "#ffffff";
    ctx.font = "40px Arial";
    ctx.fillText("PING!!!!!!!",365,50);
    ctx.fillText("Press Space to Start",280,230);
}


let bounds = {
    width: 800,
    height: 600
}

let ball = {
    x: 480,
    y: 300,
    width: 50,
    height: 50,
    xspeed: 1,
    yspeed: 1,

    // draw: function() {
    //     ctx.fillStyle = "#ffff00";
    //     ctx.beginPath();
    //     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    //     ctx.fill();
    // },

    reset: function() {
        this.x = 480
        this.y = 300
        this.width = 50
        this.height = 50
        this.xspeed = 1
        this.yspeed = 1
    },

    draw: function() {
        ctx.fillStyle = "#ffff00";
        ctx.fillRect(this.x,this.y,this.width,this.height)
    },

    move: function() {
        this.x=this.x-this.xspeed;
        this.y=this.y+this.yspeed;
    }
}

let box = {
    x: 350,
    y: 500,
    width: 150,
    height: 30,
    speed: 10,
    damage: 0,

    draw: function() {
        ctx.fillStyle = "#00ff00"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    },

    reset: function() {
        this.x = 350
        this.y = 500
        this.width = 150
        this.height = 30
        this.speed = 10
        this.damage = 0
    },

    right: function() {
        this.x = this.x+this.speed;
        if (isRightBump(this,bounds))
            this.x = bounds.width - this.width;
    },
    left: function() {
        this.x=this.x-this.speed;
        if (isLeftBump(this,bounds))
            this.x = 0
    }
}

function startGame() {
    runcheck = true;
    ticks = setInterval(tick,5);
    
}

function refresh() {
    ctx.fillStyle = "#140033";
    ctx.fillRect(0,0,800,600);

}

function isLeftBump(sprite,bounds) {
    return (sprite.x <= 0) 
}

function isRightBump(sprite,bounds) {
    return ((sprite.x + sprite.width) >= bounds.width) 
}

function isTopBump(sprite,bounds) {
    return (sprite.y <= 0) 
}

function isBoxBump(ball,box,bounds) {
    let ballRightX = (ball.x + ball.width );
    let ballBaseY = (ball.y + ball.height);
    let boxRightX = (box.x + box.width);
    let boxBaseY = (box.y + box.height)

    return (
        ballRightX >= box.x && 
        ball.x <= boxRightX && 
        ballBaseY >= box.y &&
        ball.y < boxBaseY 
    ) 
}

function isFail(ball,bounds) {
    return ball.y > bounds.height
}

function tick() {

    // handle user events
    
    // update positions
    ball.move();
    // check for collisions    
    if (isBoxBump(ball,box)) {
        ball.yspeed *= -1;
    } 
    
    if(isLeftBump(ball,bounds)) {
        ball.xspeed *= -1;
    } 
    
    if(isRightBump(ball,bounds)) {
        ball.xspeed *= -1;
    } 
    
    if(isTopBump(ball,bounds)) {
        ball.yspeed *= -1;
    }
    

    // draw
    refresh();
    ball.draw();
    box.draw();

    //failure
    if (isFail(ball,bounds)) {
        clearInterval(ticks);
        ball.reset();
        box.reset();
        start();
    }

}




document.body.addEventListener("keydown", e => {
    if (e.keyCode == 32 && !runcheck) {
        startGame();
    } else if (e.keyCode == 39 || e.keyCode == 68) {
        box.right();
    } else if (e.keyCode == 37 || e.keyCode == 65) {
        box.left();
    }
});