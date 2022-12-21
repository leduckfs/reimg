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
var width_dl = document.getElementById("width_download").value
var height_dl = document.getElementById("height_download").value  
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
    var dragStart,dragged;
    var lastX=(canvas.width-img.width)/2, lastY=(canvas.height-img.height)/2; // căn giữa

    var reader = new FileReader();
    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
            canvas.width =  document.getElementById("width_download").value  ; //image.width;
            canvas.height = document.getElementById("height_download").value; //image.hight;
            ctx.fillStyle = "#fff"; // chọn kiểu khung
            ctx.fillRect(0, 0, canvas.width, canvas.height); // tô khung
            ctx.drawImage(img, (canvas.width-img.width)/2, (canvas.height-img.height)/2); // vẽ lại hình
            var frame = document.getElementById("selectFrame");
            var pat = ctx.createPattern(frame, "no-repeat"); // nền png không có tô màu
            ctx.fillStyle = pat; // chọn kiểu khung
            ctx.fillRect(0, 0, 1024, 1024); // tô khung
            ///////////////////////////////////////////////////////////////////
            trackTransforms(ctx);
            function redraw(){
                // xóa hình ảnh cũ
                var p1 = ctx.transformedPoint((canvas.width-img.width)/2, (canvas.height-img.height)/2);
                var p2 = ctx.transformedPoint(img.width,img.height);
                ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
                ctx.save();
                /// vẽ hình mới
                ctx.restore();
                ctx.fillRect(0, 0, canvas.width,canvas.height); // tô nền trắng
                ctx.drawImage(img, (canvas.width-img.width)/2, (canvas.height-img.height)/2); // vẽ lại hình
            }
            ///////// sự kiện lăn chuột
            canvas.addEventListener('mousedown',function(evt){
                lastX = evt.offsetX;
                lastY = evt.offsetY;
                dragStart = ctx.transformedPoint(lastX,lastY);
                dragged = false;
            },false);
            
            canvas.addEventListener('mouseup',function(evt){
                lastX = evt.offsetX;
                lastY = evt.offsetY;
                dragStart = null;
                if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
            },false);
            
            ////// sự kiện di chuyển chuột
            canvas.addEventListener('mousemove',function(evt){
                lastX = evt.offsetX;
                lastY = evt.offsetY;
                dragged = true;
                if (dragStart){
                    var pt = ctx.transformedPoint(lastX,lastY);
                    ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
                    redraw();
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // tô khung
                    ctx.drawImage(img, (canvas.width-img.width)/2, (canvas.height-img.height)/2); // vẽ lại hình
                  
                }
            },false);
            
            var scaleFactor = 1.01; // tỉ lệ thu phóng hình ảnh
            //////// thu phóng hình ảnh
            var zoom = function(clicks){
                var pt = ctx.transformedPoint(lastX,lastY);
                ctx.translate(pt.x,pt.y);
                var factor = Math.pow(scaleFactor,clicks);
                ctx.scale(factor,factor);
                ctx.translate(-pt.x,-pt.y);
                ctx.clearRect(0, 0, canvas.width, canvas.height); // tô khung
                ctx.drawImage(img, (canvas.width-img.width)/2, (canvas.height-img.height)/2); // vẽ lại hình
                
            }
            
            var handleScroll = function(evt){
                var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
                ctx.clearRect(0, 0, canvas.width, canvas.height); // tô khung
                if (delta) zoom(delta);
                return evt.preventDefault() && false;
            };
            
            canvas.addEventListener('DOMMouseScroll',handleScroll,false);
            canvas.addEventListener('mousewheel',handleScroll,false);
            
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
        }

        img.src = event.target.result;
        src = event.target.result;
        //////////////////////////////////////////////
        DrawOverlay(img);
        DrawText(); 
        DynamicText(img);    
    }
    reader.readAsDataURL(e.target.files[0]); 
}
