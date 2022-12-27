function download_image(){
    // image = canvas.toDataURL("image/*").replace("image/jpg", "image/octet-stream");
    image = destCanvas.toDataURL("image/*").replace("image/jpg", "image/octet-stream");
    var link = document.createElement('a');
    var title = document.getElementById("name_img").value;
    if(title != (".jpg"||".png"||".jpeg"||".gif"||".tiff"||".psd"||".pdf"||".eps"||".ai"||".heic"||".raw"||".svg") ){
        link.download = title
        link.href = image;
        link.click();

    } else alert("BẠN CHƯA NHẬP MÔ TẢ HOẶC NHẬP TÊN LỖI!");
   
  }
var resizeCanvas = document.getElementById("output_resize");
resizeCanvas.width = 1024;
resizeCanvas.height = 1024;
function downloadResize(){
// image = canvas.toDataURL("image/*").replace("image/jpg", "image/octet-stream");
image = resizeCanvas.toDataURL("image/*").replace("image/jpg", "image/octet-stream");
var link = document.createElement('a');
var title = document.getElementById("name_img").value;
if(title != (".jpg"||".png"||".jpeg"||".gif"||".tiff"||".psd"||".pdf"||".eps"||".ai"||".heic"||".raw"||".svg") ){
    link.download = title
    link.href = image;
    link.click();

} else alert("BẠN CHƯA NHẬP MÔ TẢ HOẶC NHẬP TÊN LỖI!");

}