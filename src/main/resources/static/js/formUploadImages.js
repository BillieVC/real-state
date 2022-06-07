var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var id = urlParams.get('id');
var imgWrap = "";
var imgArray = [];
const button = document.getElementById('registerButton');
        button.disabled = true;


var property = async function getProperty(id) {
    const request = await fetch('http://localhost:9091/properties/' + id, {
        method: 'GET',
        headers: getHeaders()
    });
    return await request.json();
}


window.onload = async function() {
  property(id).then(property => {
    var el = document.getElementById("titulo");
    el.textContent = property.propertyDto.title;
  })  
}


jQuery(document).ready(function () {
    ImgUpload();
    
  });
  
  function ImgUpload() {
  
    $('.upload__inputfile').each(function () {
      $(this).on('change', function (e) {
        imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
        var maxLength = $(this).attr('data-max_length');
  
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        var iterator = 0;
        filesArr.forEach(function (f, index) {
  
          if (!f.type.match('image.*')) {
            return;
          }
  
          if (imgArray.length > maxLength) {
            return false
          } else {
            var len = 0;
            for (var i = 0; i < imgArray.length; i++) {
              if (imgArray[i] !== undefined) {
                len++;
              }
            }
            if (len > maxLength) {
              return false;
            } else {
              imgArray.push(f);
  
              var reader = new FileReader();
              reader.onload = function (e) {
                var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                imgWrap.append(html);
                const button = document.getElementById('registerButton');
                button.disabled = false;
                iterator++;
              }
              reader.readAsDataURL(f);
            }
          }
        });
      });
    });
  
    $('body').on('click', ".upload__img-close", function (e) {
      var file = $(this).parent().data("file");
      for (var i = 0; i < imgArray.length; i++) {
        if (imgArray[i].name === file) {
          imgArray.splice(i, 1);
          break;
        }
      }
      $(this).parent().parent().remove();
      if (imgArray.length<1){
        const button = document.getElementById('registerButton');
        button.disabled = true;
      }
      else{
        const button = document.getElementById('registerButton');
        button.disabled = false;
      }
    });
  }

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

function uploadFile(){
  const files = imgArray;
  const formData  = new FormData();
  
  files.forEach(file=>{
    formData.append('photos', file)
  })

  fetch('http://localhost:9091/photographs/addPhotos/'+id, {
  method: 'POST',
  body: formData
  })
  .then(response => {response.json();
    if(response.ok){
      Swal.fire({
        title: 'Éxito!',
        text: "Fotografias Subidas",
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:9091/offerDetail.html?id="+id;
        }
      })
    }else{
      
    }
  })
  .then(data => {
  console.log(data);
  })
  .catch(error => {
  console.error(error)
  })
  
}

function uploadToDataBase(){

  console.log(imgArray);
  uploadFile();
}
