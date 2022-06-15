var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var id = urlParams.get('id');
var imgWrap = "";
var imgArray = [];
let button = document.getElementById('registerButton');
button.disabled = true;
const ALLOWED_TYPES = ["image/jpg", "image/jpeg", "image/png"];

let property = async function getProperty(id) {
    const request = await fetch('http://localhost:9091/properties/' + id, {
        method: 'GET',
        headers: getHeaders()
    });
    return await request.json();
}


window.onload = async function () {
    property(id).then(property => {
        let el = document.getElementById("titulo");
        el.textContent = `Subir fotografías para el inmueble: "${property.propertyDto.title}"`;
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

            let files = e.target.files;
            let filesArr = Array.prototype.slice.call(files);
            let iterator = 0;
            if (filesArr.length - 1 > maxLength) {
                Swal.fire({
                    icon: 'error',
                    title: 'Número de imágenes excedido',
                    text: 'Solo se aceptan 5 imágenes como máximo'
                })
                return;
            }
            filesArr.forEach(function (file, index) {

                if (!ALLOWED_TYPES.includes(file.type)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Formato no aceptado',
                        text: 'Solo se aceptan imagenes con extensión: .jpg, .jpeg, .png'
                    })
                    return;
                }
                if (file.size > 5000000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Imagen muy grande',
                        text: 'Solo se aceptan imagenes de 5MB de tamaño como máximo'
                    })
                    return;
                }
                if (imgArray.length > maxLength) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Número de imágenes excedido',
                        text: 'Solo se aceptan 5 imágenes como máximo'
                    })
                    return false
                } else {
                    let len = 0;
                    for (var i = 0; i < imgArray.length; i++) {
                        if (imgArray[i] !== undefined) {
                            len++;
                        }
                    }
                    if (len > maxLength) {
                        return false;
                    } else {
                        imgArray.push(file);
                        let reader = new FileReader();
                        reader.onload = function (event) {
                            let tester = new Image();
                            tester.onload = imgEvent => {
                                let html = "<div class='upload__img-box'><div style='background-image: url(" + event.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + file.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                                imgWrap.append(html);
                                const button = document.getElementById('registerButton');
                                button.disabled = false;
                                iterator++;
                            };
                            tester.onerror = (event, source) => {
                                imgArray.pop();
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Ocurrió un problema',
                                    text: 'Parece ser que el archivo es incorrecto o está dañado, intente con otro archivo'
                                })
                            };
                            tester.src = event.target.result;

                        }
                        reader.readAsDataURL(file);
                    }
                }
            });
        });
    });

    $('body').on('click', ".upload__img-close", function (e) {
        let file = $(this).parent().data("file");
        for (let i = 0; i < imgArray.length; i++) {
            if (imgArray[i].name === file) {
                imgArray.splice(i, 1);
                break;
            }
        }
        $(this).parent().parent().remove();
        if (imgArray.length < 1) {
            const button = document.getElementById('registerButton');
            button.disabled = true;
        } else {
            const button = document.getElementById('registerButton');
            button.disabled = false;
        }
    });
}

function cancel() {
    Swal.fire({
        title: 'Si cancela no se guardarán los cambios ¿Está seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "offerDetail.html?id=" + id;
        }
    })
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

function uploadFile() {
    const files = imgArray;
    const formData = new FormData();

    files.forEach(file => {
        formData.append('photos', file)
    })

    fetch('http://localhost:9091/photographs/addPhotos/' + id, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            response.json();
            if (response.ok) {
                Swal.fire({
                    title: 'Éxito!',
                    text: "Fotografias Subidas",
                    icon: 'success',
                    allowOutsideClick: false,
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "offerDetail.html?id=" + id;
                    }
                })
            } else {

            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error)
        })

}

function uploadToDataBase() {
    uploadFile();
}
