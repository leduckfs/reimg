var text_title =""; // tên file - mô tả
var imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext("2d");
var fsize = '45px Roboto';
const img = new Image();
img.crossOrigin="anonymous";
canvas.width = document.getElementById("width_download").value
canvas.height = document.getElementById("height_download").value  
//var randomSize = Math.floor(Math.random() * 2)*100 + 300;
window.addEventListener('load', DrawPlaceholder)
//img.src ='https://unsplash.it/' + randomSize + '/' + randomSize + '/?random';
function DrawPlaceholder() {
    img.onload = function() {
        DrawOverlay(img);
        DrawText();
        DynamicText(img)
    };
 //   img.src = 'https://unsplash.it/400/400/?random';
    img.src ='https://unsplash.it/1024/1024/?random';
}
function DrawOverlay(img) {
    var width_dl = document.getElementById("width_download").value
    var height_dl = document.getElementById("height_download").value  
    ctx.fillRect(0, 0, width_dl,height_dl); // tô nền trắng
    ctx.drawImage(img, (width_dl-img.width)/2, (height_dl-img.height)/2); // vẽ lại hình
    var frame = document.getElementById("selectFrame");
    var pat = ctx.createPattern(frame, "no-repeat"); // nền png không có tô màu
    ctx.fillStyle = pat; // chọn kiểu khung
    ctx.fillRect(0, 0, width_dl, height_dl); // tô khung
}
function DrawText() {
        ctx.fillStyle = "#fff"; // màu chữ
        ctx.textBaseline = 'middle'; // vị trí chữ so với line
        ctx.font = fsize; // kích thước
        ctx.textAlign = "center"; // căn giữa
        var fsize_tmp = parseInt(ctx.font.slice(0,2));
        ctx.fillText(text_title.toUpperCase(), 512, 960);
        let metrics = ctx.measureText(text_title).width;
        if (metrics>800){
            fsize = fsize.replace(/\d+px/, (parseInt(ctx.font.match(/\d+px/)) - 1) + "px");
        } else if (metrics<=800 && fsize_tmp<45) fsize = fsize.replace(/\d+px/, (parseInt(ctx.font.match(/\d+px/)) + 1) + "px");
        var title_download = text_title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        title_download = title_download.replace(/[đĐ]/g, 'd');
        title_download = title_download.replace(/([^0-9a-z-\s])/g, '');
        title_download = title_download.replace(/(\s+)/g, '-');
        title_download = title_download.replace(/-+/g, '-');
        title_download = title_download.replace(/^-+|-+$/g, '');
        document.getElementById("title_download").value = title_download;
        document.getElementById("name_img").value = title_download + ".jpg";
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
    var img = "";  
    var src = "";
    var reader = new FileReader();
    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
            canvas.width =  document.getElementById("width_download").value  ; //image.width;
            canvas.height = document.getElementById("height_download").value; //image.hight;
            ctx.drawImage(img,(canvas.width-img.width)/2, (canvas.height-img.height)/2);
            var frame = document.getElementById("selectFrame");
            var pat = ctx.createPattern(frame, "no-repeat"); // nền png không có tô màu
            ctx.fillStyle = pat; // chọn kiểu khung
            ctx.fillRect(0, 0, canvas.width, canvas.height); // tô khung
        }
        img.src = event.target.result;
        src = event.target.result;
        DrawOverlay(img);
        DrawText(); 
        DynamicText(img);   
    }
    reader.readAsDataURL(e.target.files[0]); 
}
//////////////////////

