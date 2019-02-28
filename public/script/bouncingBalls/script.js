class Ball {
    constructor(ball = null) {
        if (ball == null) {
            this.radius = Math.round(Math.random() * 50 + 1);
            this.color = randomHexColor();
            this.dx = Math.round(Math.random() * 10 + 1);


            if (randomBool) {
                this.dx = this.dx * -1;
            }

            let canvas = new Canvas();

            this.x = Math.round(Math.random() * canvas.width);
            this.y = Math.round(Math.random() * canvas.height);

            this.dy = Math.round(Math.random() * 10 + 1);
            if (randomBool) {
                this.dy = this.dy * -1;
            }
        } else {
            this.x = ball.x;
            this.y = ball.y;
            this.radius = ball.radius;
            this.color = ball.color;
            this.dx = ball.dx;
            this.dy = ball.dy; 
        }
    }

    update(canvas) {
        if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0 ) { this.dx = this.dx * -1; }
        if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0 ) { this.dy = this.dy * -1; }

        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
}

class Canvas {
    constructor() {
        this.element = document.getElementById("canvas");
        this.height = this.element.height;
        this.width = this.element.width;
    }

    drawBall(ball) {
        let ctx = this.element.getContext("2d");

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        ctx.fillStyle = ball.color;
        ctx.fill();
    }

    clear() {
        let ctx = this.element.getContext("2d");
        ctx.clearRect(0, 0, this.width, this.height);
    }
}

function startStop() {
    let data = sessionStorage.getItem("Running");

    if (data == "true") {
        sessionStorage.setItem("Running", "false");
    } else {
        sessionStorage.setItem("Running", "true");
    }

}

function addBall() {
    sessionStorage.setItem("addBall", "true");
}

function randomBool() {
    if(Math.round(Math.random()) == 1) {
        return true
    } else {
        return false;
    }
}

function randomHexColor() {
    let red = (Math.round(Math.random() * 255)).toString(16);
    setTimeout(() => {}, 400);
    let green = (Math.round(Math.random() * 255)).toString(16);
    setTimeout(() => {}, 400);
    let blue = (Math.round(Math.random() * 255)).toString(16);
    setTimeout(() => {}, 400);
    return `#${red}${green}${blue}`;
}

window.onload = () => {
    sessionStorage.setItem("Balls", JSON.stringify([new Ball()]));
    sessionStorage.setItem("Running", "false");
    sessionStorage.setItem("addBall", "false");

    window.setInterval(() => {
        if (sessionStorage.getItem("Running") == "true") {

            let canvas = new Canvas();
            let balls = JSON.parse(sessionStorage.getItem("Balls"));
            let ballsUpdated = new Array();

            if (sessionStorage.getItem("addBall") == "true") {
                sessionStorage.setItem("addBall", "false");
                
                balls.push(new Ball());
            }

            canvas.clear();
            for (let i = 0; i < balls.length; i++) {
                let ball = new Ball(balls[i]);
                ball.update(canvas);
                canvas.drawBall(ball);
                ballsUpdated.push(ball);
            }
        
            sessionStorage.setItem("Balls", JSON.stringify(ballsUpdated));
        }
    }, 1)
}