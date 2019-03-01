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