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
window.onresize = function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(resize, 200);
};


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeB", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " activeB";
}

function loop() {
  try {
    setInterval(function () {
      document.getElementById("next").click()
    }, 10000);
  } catch (err) {
    alert(err.message);
  }
}

loop();