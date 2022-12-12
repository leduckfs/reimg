$(document).ready(function() {
    $("#imageFile").change(function(event) {
      var files = event.target.files;
      var file = files[0];
  
      if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById("preview").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  });
  function resizeImage() {
   var filesToUploads = document.getElementById("imageLoader").files; // imageUploadInput
    var file = filesToUploads[0];
      if (file) {
        var reader = new FileReader();
        
  // Set the image for the FileReader
        reader.onload = function (e) {
          var img = document.createElement("img");
          img.src = e.target.result;
  
  // Create your canvas
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var tmp_width = document.getElementById("chieu_rong").value
          var tmp_height = document.getElementById("chieu_cao").value
        //   var MAX_WIDTH = 1024;
        //   var MAX_HEIGHT = 1024;
      //    var size_1024 = 1024;
          var width = tmp_width;
          var height = tmp_height;
        //   var width = img.width;
        //   var height = img.height;
  // Add the resizing logic
        //   if (width > height) {
        //     if (width > MAX_WIDTH) {
        //       height *= MAX_WIDTH / width;
        //       width = MAX_WIDTH;
        //     }
        //   } else {
        //     if (height > MAX_HEIGHT) {
        //       width *= MAX_HEIGHT / height;
        //       height = MAX_HEIGHT;
        //     }
        //   }
  
  //Specify the resizing result
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
  
          dataurl = canvas.toDataURL(file.type);
          document.getElementById("output_img").src = dataurl;
        };
        reader.readAsDataURL(file);
      }
    } 