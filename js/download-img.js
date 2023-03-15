const options = {
    quality: 0.7, // Chất lượng nén (0 - 1)
    alpha: false, // Bỏ alpha channel (nếu có)
    unsharpAmount: 0, // Số lượng unsharp mask (0 - 500)
    unsharpRadius: 0, // Bán kính unsharp mask (0 - 500)
    unsharpThreshold: 0 // Ngưỡng unsharp mask (0 - 255)
  };
function download_image() {
    // image = canvas.toDataURL("image/*").replace("image/jpg", "image/octet-stream");
    image = destCanvas.toDataURL("image/*").replace("image/jpg", "image/octet-stream");
    var link = document.createElement('a');
    var title = document.getElementById("name_img").value;
    if (title != (".jpg" || ".png" || ".jpeg" || ".gif" || ".tiff" || ".psd" || ".pdf" || ".eps" || ".ai" || ".heic" || ".raw" || ".svg")) {
        link.download = title
        link.href = image;
        link.click();

    } else alert("BẠN CHƯA NHẬP MÔ TẢ HOẶC NHẬP TÊN LỖI!");

}
function download_nen() {
    // image = canvas.toDataURL("image/*").replace("image/jpg", "image/octet-stream");
    var title = document.getElementById("name_img").value;
    if (title != (".jpg" || ".png" || ".jpeg" || ".gif" || ".tiff" || ".psd" || ".pdf" || ".eps" || ".ai" || ".heic" || ".raw" || ".svg")) {
        pica().toBlob(canvas, 'image/jpeg', options).then(function (blob) {
            image = destCanvas.toDataURL("image/*").replace("image/jpg", "image/octet-stream");
            // Tạo một URL tạm thời cho blob
            const url = URL.createObjectURL(blob);
            // Tạo một liên kết tải xuống
            const link = document.createElement('a');
            link.download = title;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            // Xóa URL tạm thời
            URL.revokeObjectURL(url);
        });

    } else alert("BẠN CHƯA NHẬP MÔ TẢ HOẶC NHẬP TÊN LỖI!");

}
var resizeCanvas = document.getElementById("output_resize");
resizeCanvas.width = 1024;
resizeCanvas.height = 1024;
function downloadResize() {
    // image = canvas.toDataURL("image/*").replace("image/jpg", "image/octet-stream");
    image = resizeCanvas.toDataURL("image/*").replace("image/jpg", "image/octet-stream");
    var link = document.createElement('a');
    var title = document.getElementById("name_img").value;
    if (title != (".jpg" || ".png" || ".jpeg" || ".gif" || ".tiff" || ".psd" || ".pdf" || ".eps" || ".ai" || ".heic" || ".raw" || ".svg")) {
        link.download = title
        link.href = image;
        link.click();

    } else alert("BẠN CHƯA NHẬP MÔ TẢ HOẶC NHẬP TÊN LỖI!");

}