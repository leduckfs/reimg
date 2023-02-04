var text_title =""; // tên file - mô tả
var imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext("2d");
var fsize = '45px Roboto';
var img = new Image();
img.crossOrigin="anonymous";
var lastX=(canvas.width-img.width)/2, lastY=(canvas.height-img.height)/2; // căn giữa
//  var widthInput = document.getElementById("widthInput").value
//  var heightInput = document.getElementById("heightInput").value  
//var randomSize = Math.floor(Math.random() * 2)*100 + 300;
window.addEventListener('load', DrawPlaceholder)
//img.src ='https://unsplash.it/' + randomSize + '/' + randomSize + '/?random';

var destCanvas = document.getElementById("imageCanvasReview");
var destCanvasContext = destCanvas.getContext("2d");

var destinationImage = new Image;
destCanvas.width = 1024;
destCanvas.height = 1024;
canvas.width = 1024;
canvas.height = 1024;
function DrawPlaceholder() {
    img.onload = function() {
        DrawOverlay(img);
        DynamicText(img)
    };
     img.src ='/img/bg.jpg';
    //img.src ='https://unsplash.it/' + canvas.width + '/' + canvas.height + '/?random';
}
function DrawOverlay(img) {
    ctx.drawImage(img, ((canvas.width-img.width)/2), ((canvas.height-img.height)/2)); // vẽ lại hình
    var sourceImageData = canvas.toDataURL("image/*");
    var destCanvasContext = destCanvas.getContext("2d");
    var frame = document.getElementById("selectFrame");
    var color = document.getElementById("changeColorBackground").value;
    var pat = destCanvasContext.createPattern(frame, "no-repeat"); // nền png không có tô màu
    destinationImage.onload = function(){
        destCanvasContext.fillStyle = color;
        destCanvasContext.fillRect(0, 0, canvas.width, canvas.height); // xóa khung
        destCanvasContext.drawImage(destinationImage, 0, 0);
        destCanvasContext.fillStyle = pat; // chọn kiểu khung
        destCanvasContext.fillRect(0, 0, canvas.width, canvas.height); // tô khung
        DrawText();
    };
    destinationImage.src = sourceImageData;
}
function DrawText() {
    destCanvasContext.fillStyle = "#fff"; // màu chữ
    destCanvasContext.textBaseline = 'middle'; // vị trí chữ so với line
    destCanvasContext.font = fsize; // kích thước
    destCanvasContext.textAlign = "center"; // căn giữa
    var fsize_tmp = parseInt(destCanvasContext.font.slice(0,2));
    destCanvasContext.fillText(text_title.toUpperCase(), 512, 960);
    var metrics = destCanvasContext.measureText(text_title).width;
    if (metrics>800){
        fsize = fsize.replace(/\d+px/, (parseInt(destCanvasContext.font.match(/\d+px/)) - 1) + "px");
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
    DrawOverlay(img);  
    text_title = this.value;
    destCanvasContext.fillText(text_title.toUpperCase(), 512, 960);
    let metrics = destCanvasContext.measureText(text_title).width;
    var fsize_tmp = parseInt(destCanvasContext.font.slice(0,2));
    if (metrics>800){
        fsize = fsize.replace(/\d+px/, (parseInt(destCanvasContext.font.match(/\d+px/)) - 1) + "px");
    } else if (metrics<=800 && fsize_tmp<45) fsize = fsize.replace(/\d+px/, (parseInt(destCanvasContext.font.match(/\d+px/)) + 1) + "px");
  });
}
function handleImage(e) {
    var img = ""; 
    var src = ""; 
    var reader = new FileReader();
    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // tô khung
            destCanvasContext.clearRect(0, 0, canvas.width, canvas.height); // tô khung
            DrawOverlay(img);
            DrawText(); 
            DynamicText(img);   
        }
        img.src = event.target.result;
        src = event.target.result;
        document.getElementById('srcNew').src = img.src; 
    }
    reader.readAsDataURL(e.target.files[0]); 
}
/////////////////////////////////////
var imgStep = 0;
var dragStart,dragged;
var holder = document.querySelector('canvas');
holder.ondragover = function(){this.className = 'hover'; return false;};
holder.ondragend = function(){this.className = ''; return false;};
holder.ondrop = function(e){
    DrawOverlay(img);
    this.className = '';
    e.preventDefault();
    var url = URL.createObjectURL(e.dataTransfer.files[imgStep]);
    empId = e.dataTransfer.files[imgStep].name;
    img.src = url;
    img.onload = function(){
        redraw();
    }
}
function redraw(){
    var p1 = ctx.transformedPoint(0,0);
    var p2 = ctx.transformedPoint(canvas.width,canvas.height);
    ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
    destCanvasContext.imageSmoothingEnabled = true;
    destCanvasContext.imageSmoothingQuality = "high";
    destCanvasContext.save();
    destCanvasContext.restore();
}
trackTransforms(ctx);   
function trackTransforms(ctx){
    var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function(){ return xform};
    
    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function(){
        savedTransforms.push(xform.translate(0,0));
        return save.call(ctx);
    };
    
    var restore = ctx.restore;
    ctx.restore = function(){
        xform = savedTransforms.pop();
        return restore.call(ctx);
    };
    
    var translate = ctx.translate;
    ctx.translate = function(dx,dy){
        xform = xform.translate(dx,dy);
        return translate.call(ctx,dx,dy);
    };
    
    var transform = ctx.transform;
    ctx.transform = function(a,b,c,d,e,f){
        var m2 = svg.createSVGMatrix();
        m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
        xform = xform.multiply(m2);
        return transform.call(ctx,a,b,c,d,e,f);
    };
    
    var setTransform = ctx.setTransform;
    ctx.setTransform = function(a,b,c,d,e,f){
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx,a,b,c,d,e,f);
    };
    
    var pt  = svg.createSVGPoint();
    ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }
}
///////// sự kiện lăn chuột
canvas.addEventListener('mousedown',function(evt){
	lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
	lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    dragStart = ctx.transformedPoint(lastX,lastY);
    dragged = false;
},false);

canvas.addEventListener('mouseup',function(evt){
    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    dragStart = null;
    if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
},false);

////// sự kiện di chuyển chuột
canvas.addEventListener('mousemove',function(evt){
    DrawOverlay(img);
	lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
	lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    dragged = true;
    if (dragStart){
        var pt = ctx.transformedPoint(lastX,lastY);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // tô khung
        ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
        redraw();
        ctx.drawImage(img, (canvas.width-img.width)/2, (canvas.height-img.height)/2); // vẽ lại hình
      
    }
},false);

var scaleFactor = 1.1; // tỉ lệ thu phóng hình ảnh
//////// thu phóng hình ảnh
var zoom = function(clicks){
    DrawOverlay(img);
    ctx.clearRect(0,0, canvas.width,  canvas.height)
    var pt = ctx.transformedPoint(lastX,lastY);
    ctx.translate(pt.x,pt.y);
    var factor = Math.pow(scaleFactor,clicks);
    ctx.scale(factor,factor);
    ctx.translate(-pt.x,-pt.y);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // tô khung
    ctx.drawImage(img, (canvas.width-img.width)/2, (canvas.height-img.height)/2); // vẽ lại hình
    
}

var handleScroll = function(evt){
    DrawOverlay(img);
    var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // tô khung
    if (delta) zoom(delta);
    return evt.preventDefault() && false;
};

canvas.addEventListener('DOMMouseScroll',handleScroll,false);
canvas.addEventListener('mousewheel',handleScroll,false);
/////////////////
var showF = 0;
function showFrame(){
    if(showF == 0){
        document.getElementById('selectFrame').style.display = "";
        document.getElementById('titleShowFrame').innerText = 'Ẩn khung';
        showF = 1;
    } else {
        document.getElementById('selectFrame').style.display = "none";
        document.getElementById('titleShowFrame').innerText = 'Hiển thị khung';
        showF = 0;
        // window.scrollTo(0,50);
    }
}

function changeColorBackground(){
    var color = document.getElementById("changeColorBackground").value;
    document.getElementById("color").style.backgroundColor = color
    document.getElementById("colorName").innerHTML = color;
    ctx.drawImage(img, ((canvas.width-img.width)/2), ((canvas.height-img.height)/2)); // vẽ lại hình
    var destCanvasContext = destCanvas.getContext("2d");
    var frame = document.getElementById("selectFrame");
    var pat = destCanvasContext.createPattern(frame, "no-repeat"); // nền png không có tô màu
    var destCanvasContext = destCanvas.getContext("2d");
    destCanvasContext.fillStyle = color;
    destCanvasContext.fillRect(0, 0, canvas.width, canvas.height); // xóa khung
    destCanvasContext.drawImage(destinationImage, 0, 0);
    destCanvasContext.fillStyle = pat; // chọn kiểu khung
    destCanvasContext.fillRect(0, 0, canvas.height, canvas.height); // tô khung
}