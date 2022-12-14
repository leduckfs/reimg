document.onpaste = function(pasteEvent) {
    var item = pasteEvent.clipboardData.items[0];
  
    if (item.type.indexOf("image") === 0) {
      var blob = item.getAsFile();
  
      var reader = new FileReader();
      reader.onload = function(event) {
        document.getElementById("container").src = event.target.result;
      };
  
      reader.readAsDataURL(blob);
    }
  }