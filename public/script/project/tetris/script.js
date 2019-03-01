let gameInterval = null;
let timer = 1000;
let hasNotBeenMoved = 0
const newObjectEvent = new Event('newObject');

function drawMap() {
    game = JSON.parse(sessionStorage.getItem("game"));

    canvas = document.getElementById("canvasUI");

    var clear = canvas.getContext("2d");

    clear.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!game.map) throw new Error("Missing map");

    for (let i = 0; i < game.map.length; i++) {
        const row = String(game.map[i]).split("").reverse();            
        for (let x = 0; x < row.length; x++) {
            var rect = canvas.getContext("2d");
            if (row[x] == 1) {
                rect.fillStyle = "#000000";                
                rect.fillRect(30 * (9 - x), 30 * i, 30, 30);
            } 
        }            
    }

    for (let i = 0; i < game.player.length; i++) {
        const row = String(game.player[i]).split("").reverse();            
        for (let x = 0; x < row.length; x++) {
            var rect = canvas.getContext("2d");
            if (row[x] == 1) {
                rect.fillStyle = "#000000";                
                rect.fillRect(30 * (9 - x), 30 * i, 30, 30);
            } 
        }            
    }

    if (document.getElementById("drawGrid").checked) {
        for(let i = 1; i < 10; i++) {
            let line = canvas.getContext("2d");
            line.beginPath();
            line.moveTo(30 * i, 0);
            line.lineTo(30 * i, canvas.height);
            line.stroke();
        }

        for(let i = 1; i < 20; i++) {
            let line = canvas.getContext("2d");

            line.beginPath();
            line.moveTo(0, 30 * i);
            line.lineTo(canvas.width, 30* i);
            line.stroke();
        }
    }
}

function bot() {
    addEventListener('newObject', () => {        
        let count = window.sessionStorage.getItem("count") || 0;       

        let moves = [2, 1, 0, -1, -2];

        switch(moves[count]) {
            case 2:
                move.left();
                move.left();
                move.left();
                move.left();
                count++
                break;
            case 1:
                move.left();
                move.left();
                count++
                break;
            case 0:
                count++;
                break;
            case -1:
                move.right();
                move.right();
                count++
                break;
            case -2:
                move.right();
                move.right();
                move.right();
                move.right();  
                count = 0;
                break;
            
        }

        window.sessionStorage.setItem("count", count);
    });

    window.setInterval(()=> {
        move.down();
    }, 16);

    return "Bot active";
}

function savePosToMap() {
    let game = JSON.parse(sessionStorage.getItem("game"));

    let linesCleared = 0;

    for (let i = 0; i < 20; i++) {
        if (game.player[i] != 0) {
            game.map[i] = game.map[i] + game.player[i];

            game.player[i] = 0;
            
            if (game.map[i] == 1111111111) {
                game.map.splice(i, 1);
                game.map.reverse();
                game.map.push(0)
                game.map.reverse();
                linesCleared++;
            }
        }
    }

    let score = parseInt(document.getElementById("score").innerHTML);
    let level = parseInt(document.getElementById("level").innerHTML);

    if (linesCleared > 0) {

        if (linesCleared == 1) score = score +  (40 * (level + 1));
        if (linesCleared == 2) score = score +  (100 * (level + 1));
        if (linesCleared == 3) score = score +  (300 * (level + 1));
        if (linesCleared == 4) score = score +  (1200 * (level + 1));

        document.getElementById("score").innerHTML = score;
    }

    if (game.linesCleared + linesCleared >= 5 * level) {
        document.getElementById("level").innerHTML = (level++);
        game.linesCleared = 0;
    } else game.linesCleared = game.linesCleared + linesCleared;

    game.queue.splice(0, 1);
    game.queue.push(game.chars[Math.floor(Math.random() * game.chars.length)]);
    game.height = 21;

    window.sessionStorage.setItem("game", JSON.stringify(game));
}

let move = {
    down() {
        let game = JSON.parse(sessionStorage.getItem("game"));

        if (game.height == 0 || hasNotBeenMoved >= 3) {
            hasNotBeenMoved = 0;
            savePosToMap();
        } else {            
            game.height--;
            game.player = [];
    
            let spriteRow = 0;
    
            for (var i = 0; i < 20; i++) {
                if (i >= game.height && spriteRow < game.queue[0].length ) {
                    game.player.push(game.queue[0][spriteRow]);
                    spriteRow++;
                } else {
                    game.player.push(0);
                }
            }

            game.player.reverse();
            if (this.collision(game)) window.sessionStorage.setItem("game", JSON.stringify(game));
            else hasNotBeenMoved++;
            if (game.height == 20) dispatchEvent(newObjectEvent);
        }
    },

    right() {
        try {
            let game = JSON.parse(sessionStorage.getItem("game"));

            for(let i = 0; i < game.queue[0].length; i++) {
                
                if (String(game.queue[0][i]).split("")[String(game.queue[0][i]).length - 1] == 1) throw new Error();

                game.queue[0][i] = parseInt(String(game.queue[0][i]).substr(0, String(game.queue[0][i]).length - 1));
            }

            for(let i = 0; i < game.player.length; i++) {
                
                if (String(game.player[i]).split("")[String(game.player[i]).length - 1] == 1) throw new Error();

                game.player[i] = parseInt(String(game.player[i]).substr(0, String(game.player[i]).length - 1));
            }

            if (this.collision(game)) window.sessionStorage.setItem("game", JSON.stringify(game));
        } catch {}
    },

    left() {
        try {
            let game = JSON.parse(sessionStorage.getItem("game"));

            for(let i = 0; i < game.queue[0][i]; i++) {
        
                if (String(game.queue[0][i]).length == 10) throw new Error();

                game.queue[0][i] = parseInt(String(game.queue[0][i])+ "0");
            }

            for(let i = 0; i < game.player.length; i++) {
        
                if (String(game.player[i]).length == 10) throw new Error();

                game.player[i] = parseInt(String(game.player[i])+ "0");
            }
            if (this.collision(game)) window.sessionStorage.setItem("game", JSON.stringify(game));
        } catch { }
    },

    rotate() {

    },

    collision(game) {
        for(let i = 0; i < 20; i++) {
            if (game.map[i] == 0 && game.player[i] == 0) continue;
            else {
                let mapArray = String(game.map[i]).split("").reverse();
                let playerArray =  String(game.player[i]).split("").reverse();

                for(let i = 0; i < 10; i++) {
                    if (typeof mapArray[i] === 'undefined' || typeof playerArray[i] === 'undefined') break;
                    if (mapArray[i] == 1 && playerArray[i] == 1) return false;
                }
            }
        }
        return true;
    }
}

//Start the game
function gameStart() {
    gameInterval = setInterval(() => {
        move.down();
    }, timer);
}

window.onload = () => {
    //create the game
    var game = {
        map: [],
        player: [],
        chars: [/*[1111000], [1111000, 1000], [1111000, 1000000], */[110000, 110000]/*, [11000, 110000], [111000, 10000], [110000, 11000]*/],
        queue: [],
        height: 21,
        linesCleared: 0,
    };

    for(let i = 0; i < 20; i++) {

        game.map.push(0);            
    }

    for (let i = 0; i < 5; i++) {
        game.queue.push(game.chars[Math.floor(Math.random() * game.chars.length)]);
    }

    window.sessionStorage.setItem("game", JSON.stringify(game));

    gameStart();
    
    setInterval(() => {        
        drawMap();      
    }, 16);
}

document.onkeydown = (event) => {
    game = JSON.parse(sessionStorage.getItem("game"));
    
    switch(event.key) {
        case "a" || "ArrowLeft":
            move.left();
            break;
        
        case "d" || "ArrowRight":
            move.right();
            break;
        case "s" || "ArrowDown":
            move.down();
            break;
    }
}