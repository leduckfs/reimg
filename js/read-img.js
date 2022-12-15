(function () {
    var imageUpload = function () {
        var self = this;
        this.selector = {
            fileInput: document.getElementById('imageInput'),
            fileInputBtn: document.getElementById('imageUploadInputBtn'),
            imagePreview: document.getElementById('imagePreview'),
            status: document.getElementById('uploadFileStatus'),
            infoName: document.getElementById('fileInfomation_name'),
            infoType: document.getElementById('fileInfomation_type'),
            infoSize: document.getElementById('fileInfomation_size')
        };
        this.imageData = "";
        this.fileTypes = ['image/jpg', 'image/png'];
        this.maxSize = 30 * 1024 * 1024; // 30MB
        this.onChangeInput = function (e) {
            document.getElementById("output").src = "";
            // Reset file data / image preview
          //  self.selector.status.innerHTML = '';
            self.selector.imagePreview.setAttribute('src', "img/default.jpg");
            self.imageData='';
            
            // Get the current file upload
            var file = e.target.files[0];
            this.selector.infoName.innerHTML = file.name;
            this.selector.infoType.innerHTML = file.type;
            this.selector.infoSize.innerHTML = parseInt(file.size/1024) + " KB"; // in bytes
         
            // Validate file type
            if (this.fileTypes.indexOf(file.type) == -1) {
                self.selector.status.innerHTML = "ERROR!";
            } else {
                self.selector.status.innerHTML = "SUCCESS!";
            }
            
            // Validate file size   
            if (file.size > this.maxSize) {
                self.selector.status.innerHTML = "Oversize - Maxsize < 30M";
                return;
            }

            var reader = new FileReader();
            reader.onload = function (e) {
                self.imageData = e.target.result;
                
                // Validate file content
                self.selector.imagePreview.onerror = function(){
                    self.imageData = "";
                    self.selector.imagePreview.setAttribute('src', "img/default.jpg");
                    self.selector.status.innerHTML = 'Fail content';
                };
                self.selector.imagePreview.setAttribute('src', self.imageData);
            };
            reader.readAsDataURL(file);
        };
        this.selector.fileInput.addEventListener('change', function (e) {
            self.onChangeInput(e);
        });
        this.selector.fileInputBtn.addEventListener('click', function () {
            self.selector.fileInput.click();
        });
    };
    window.addEventListener("DOMContentLoaded", function () {
        new imageUpload();
    });
})();        