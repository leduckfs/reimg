
function resizeImage() {
  var resizeImg = new Image();
  var canvas = document.getElementById("imageCanvas");
  var sourceImageData = canvas.toDataURL("image/*");
  resizeImg.src = sourceImageData;
  
  var tmp_width = document.getElementById("chieu_rong").value
  var tmp_height = document.getElementById("chieu_cao").value
  var resizeCanvas = document.getElementById("output_resize");
  var resizeCanvasCtx = resizeCanvas.getContext("2d");

  resizeCanvas.width = tmp_width;
  resizeCanvas.height = tmp_height;
  resizeCanvasCtx.drawImage(resizeImg, 0, 0);
}
      
   