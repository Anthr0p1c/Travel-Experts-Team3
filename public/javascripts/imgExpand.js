//David Grant

function imgExpand(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("mainImg");
    // Get the image text
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    expandImg.parentElement.style.display = "block";
  }