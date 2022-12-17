const fileBlocks = document.querySelectorAll('.file-block')
const buttons = document.querySelectorAll('.btn-select-file')

;[...buttons].forEach(function (btn) {
  btn.onclick = function () {
    btn.parentElement.querySelector('input[type="file"]').click()
  }
})

;[...fileBlocks].forEach(function (block) {
  block.querySelector('input[type="file"]').onchange = function () {
    const filename = this.files[0].name

    block.querySelector('.btn-select-file').textContent = 'Tên tệp: ' + filename
  }
})