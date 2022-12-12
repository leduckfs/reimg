var text_title ="";
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var img = new Image();
let fsize = '45px Roboto';
var frame = document.getElementById("frame");
var pat = ctx.createPattern(frame, "repeat");
img.crossOrigin="anonymous"
window.addEventListener('load', DrawPlaceholder)

function DrawPlaceholder() {
    img.onload = function() {
  //      DrawOverlay(img);
        DrawText();
        DynamicText(img)
    };
    img.src = './img/default.jpg';
}
function DrawOverlay(img) {
    ctx.drawImage(img,(canvas.width-img.width)/2, (canvas.height-img.height)/2);
    ctx.fillStyle = pat;
    ctx.fill(); 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function DrawText() {
        ctx.fillStyle = "#fff";
        ctx.textBaseline = 'middle';
        ctx.font = fsize;
        ctx.textAlign = "center";
        var fsize_tmp = parseInt(ctx.font.slice(0,2));
        ctx.fillText(text_title.toUpperCase(), 512, 960);
        let metrics = ctx.measureText(text_title).width;
        if (metrics>800){
          
            fsize = fsize.replace(/\d+px/, (parseInt(ctx.font.match(/\d+px/)) - 1) + "px");
        } else if (metrics<=800 && fsize_tmp<45) fsize = fsize.replace(/\d+px/, (parseInt(ctx.font.match(/\d+px/)) + 1) + "px");
        // console.log(fsize)
        // console.log(fsize_tmp)
        // console.log(metrics)
        var title_download = text_title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        title_download = title_download.replace(/[đĐ]/g, 'd');
        title_download = title_download.replace(/([^0-9a-z-\s])/g, '');
        title_download = title_download.replace(/(\s+)/g, '-');
        title_download = title_download.replace(/-+/g, '-');
        title_download = title_download.replace(/^-+|-+$/g, '');
        document.getElementById("title_download").value = title_download;
        document.getElementById("name_img").value = title_download + ".png";
      //  console.log(title_download)
}
function DynamicText(img) {
  document.getElementById('name').addEventListener('keyup', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DrawOverlay(img);
    DrawText(); 
    text_title = this.value;
    ctx.fillText(text_title.toUpperCase(), 512, 960);
    let metrics = ctx.measureText(text_title).width;
    var fsize_tmp = parseInt(ctx.font.slice(0,2));
    if (metrics>800){
      
        fsize = fsize.replace(/\d+px/, (parseInt(ctx.font.match(/\d+px/)) - 1) + "px");
    } else if (metrics<=800 && fsize_tmp<45) fsize = fsize.replace(/\d+px/, (parseInt(ctx.font.match(/\d+px/)) + 1) + "px");
  });
}
function handleImage(e) {
    var reader = new FileReader();
    var img = "";
    var src = "";
    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
            canvas.width = 1024; //image.width;
            canvas.height = 1024; //image.hight;
            ctx.drawImage(img,(canvas.width-img.width)/2, (canvas.height-img.height)/2);
        }
        img.src = event.target.result;
        src = event.target.result;
        DrawOverlay(img);
        DrawText(); 
        DynamicText(img);   
    }
    reader.readAsDataURL(e.target.files[0]); 
}
function download_image(){
    image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    if(document.getElementById("name_img").value != ".png"){
        link.download = document.getElementById("name_img").value;
        link.href = image;
        link.click();
    } else alert("BẠN CHƯA NHẬP MÔ TẢ HOẶC NHẬP TÊN LỖI!");
   
  }


