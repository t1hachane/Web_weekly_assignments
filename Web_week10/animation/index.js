var imagesSrc = new Array(4)
imagesSrc[0] = new Image();
imagesSrc[0].src = "images/jump0.gif"; 
imagesSrc[1] = new Image();
imagesSrc[1].src = "images/jump1.gif"; 
imagesSrc[2] = new Image();
imagesSrc[2].src = "images/jump2.gif"; 
imagesSrc[3] = new Image();
imagesSrc[3].src = "images/jump3.gif"; 


let currentIndex = 0;
let direction = 1;
let jumping;

function Jump() {
    if (jumping) clearInterval(jumping);

    jumping = setInterval(() => {
        const img = document.querySelector("#currentImage");
        img.src = imagesSrc[currentIndex].src;
        if (currentIndex === 3) {
            direction = -1;
        } else if (currentIndex === 0) {
            direction = +1
        } 
        currentIndex += direction;
    }, 200)
};

function Stop() {
    clearInterval(jumping);
}