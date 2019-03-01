class Canvas {
    constructor() {
        this.element = document.getElementById("canvas");
        this.height = this.element.height;
        this.width = this.element.width;
    }

    renderHouse(house) {
        let ctx = this.element.getContext("2d");

        ctx.fillStyle = house.body.color;
        ctx.fillRect(house.body.x, house.body.y, house.body.width, house.body.height);

        ctx.fillStyle = house.foundation.color;
        ctx.fillRect(house.foundation.x, house.foundation.y, house.foundation.width, house.foundation.height);

        ctx.fillStyle = house.roof.color;
        ctx.beginPath();
        ctx.moveTo(house.roof.startPos.x, house.roof.startPos.y);
        ctx.lineTo(house.roof.lineOne.x, house.roof.lineOne.y);
        ctx.lineTo(house.roof.lineTwo.x, house.roof.lineTwo.y);
        ctx.fill();

        console.log(house);
    }
}

class House {
    constructor(width, height) {
            this.body = {
                height: Math.round((Math.random() * (height / 2)) + 1),
                width: Math.round((Math.random() * (width / 2)) + 1),
                color: this.randomHexColor(),
            };
            this.body.x = Math.round((width - this.body.width) / 2);
            this.body.y = Math.round((height - this.body.height) / 2);

            this.roof = {
                height: Math.round((Math.random() * ((height / 2) - (this.body.height / 2))) + 1),
                width: Math.round((Math.random() * ((width / 2) - this.body.width)) + this.body.width),
                color: this.randomHexColor(),
                startPos: { },
                lineOne: { },
                lineTwo: { }
            };
            this.roof.startPos = {
                x: Math.round(width / 2),
                y: Math.round(this.body.y - this.roof.height)
            };

            this.roof.lineOne = {
                x: Math.round(this.roof.startPos.x + (this.roof.width / 2)),
                y: this.body.y
            };

            this.roof.lineTwo = {
                x: Math.round(this.roof.startPos.x - (this.roof.width / 2)),
                y: this.body.y
            }

            this.foundation = {
                height: Math.round((Math.random() * ((height / 2) - (this.body.height / 2))) + 1),
                width: this.body.width,
                color: this.randomHexColor(),
                x: this.body.x,
                y: this.body.y + this.body.height
            };
            this.window = this.generateWindows()

        sessionStorage.setItem("House", JSON.stringify(this))
    }

    generateWindows() {
        let windows = new Array();
        let generate = true;
        
        while(generate) {

            let window = {
                height: Math.round(Math.random() * (this.body.height / 2) + 1),
                width:  Math.round(Math.random() * (this.body.width / 2) + 1),
                lights: this.randomBool(),
                innerFrames: this.randomBool()
            };

            windows.push(window);

            let sumHeight = 0;
            let sumWidth = 0;

            for(let i = 0; i < windows.length; i++) {
                sumWidth =+ windows[i].width;
                sumHeight =+ windows[i].height;
            }

            if(sumHeight > this.body.height || sumWidth > this.body.width) {
                windows.splice(-1, 1);
                generate = false;
            }

            if (this.body.width / 3 < sumWidth) { generate = false; }
            if (this.body.height / 3 < sumHeight) { generate = false; }
            if (this.randomBool() == 1) { generate = false; }
        }
        return windows;
    }

    randomBool() {
        if(Math.round(Math.random()) == 1) {
            return true
        } else {
            return false;
        }
    }

    randomHexColor() {
        let red = (Math.round(Math.random() * 255)).toString(16);
        setTimeout(() => {}, 400);
        let green = (Math.round(Math.random() * 255)).toString(16);
        setTimeout(() => {}, 400);
        let blue = (Math.round(Math.random() * 255)).toString(16);
        setTimeout(() => {}, 400);
        return `#${red}${green}${blue}`;
    }
}

window.onload = () => {
    let canvas = new Canvas();
    canvas.renderHouse(new House(canvas.width, canvas.height));
}