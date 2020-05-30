window.onload = resize;

function resize() {
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;

    console.log("Width: " + windowWidth);
    console.log("Height: " + windowHeight);

    if (windowHeight < (windowWidth / 1.77777777)) {
        var newHeight = (window.innerHeight - 56);
        var newWidth = 1.77777777 * newHeight;
    } else {
        var newWidth = windowWidth - 17;
        var newHeight = newWidth / 1.77777777;
    }

    document.getElementById("main").style.height = newHeight + "px";
    document.getElementById("main").style.width = newWidth + "px";
}

var resizeId;
window.onresize = function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(resize, 200);
};