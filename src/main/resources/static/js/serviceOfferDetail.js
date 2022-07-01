const MAX_NUMBER_PHOTOS = 5;
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id');

let property = async function getProperty(id) {
    let request = await fetch('http://localhost:9091/properties/' + id, {
        method: 'GET',
        headers: getHeaders()
    });
    return await request.json();
}

window.onload = async function () {
    if (!urlParams.get(id)) {
        document.getElementById('offerDetail').innerHTML =
            `<div class="row justify-content-center""> 
                <div class="col justify-content-center">
                    <h1 class="text-center">404 No Encontrado</h1>
                    <h5 class="text-center">Ocurrió un error no se pudo cargar la página</h5
                </div>
               
            </div>
            <div class="row justify-content-center">
                 <div class="col-auto justify-content-center">
                    <button class="btn btn-primary justify-self-center" onclick="goHome()"> 
                    Inicio </button>
                 </div>
            </div>`;
    }
    property(id).then(property => buildDetail(property))
};

function goHome() {
    window.location.href = "index.html";
}

function getSinglePhoto(property) {
    let srcImg = "../assets/images/image-unavailable.png";
    if (property.photos.length > 0) {
        let fileObj = property.photos[0];
        srcImg = "data:" + fileObj.mimeType + ";base64," + fileObj.value;
    }
    return `<img src=${srcImg} class="w-100 imgStyle" alt="property_photo">`;
}

async function buildDetail(property) {
    let photoSources = getPhotoSources(property);
    let images = createImgElements(photoSources);
    let detail;
    if (photoSources.length > 1) {
        let indicators = createCarouselIndicators(photoSources);
        let carousel = getCarouselElement(images, indicators);
        detail = createDetail(property, carousel);
    } else {
        detail = createDetail(property, getSinglePhoto(property));
    }
    let element = document.getElementById("offerDetail");
    element.innerHTML = `${detail}`;
}

function createImgElements(photoSources) {
    let images = ``;
    let first = true;
    photoSources.forEach(value => {
        let imgDiv = `<div class="carousel-item ${first ? "active" : ""}">
                         <img class="d-block w-100" style="height: 300px" src="${value}" alt="property_photo">
                     </div>`;
        images += imgDiv;
        first = false;
    })
    return images;
}

function createCarouselIndicators(photoSources) {
    let indicators = '';
    let slideNumber = 0;
    photoSources.forEach(() => {
        let button = `<button type="button" data-bs-target="#carouselPhotosControls" 
                        data-bs-slide-to="${slideNumber}" class="${slideNumber === 0 ? "active" : ""}" 
                        aria-current="${slideNumber === 0}" aria-label="Slide ${slideNumber + 1}"></button>`;
        slideNumber++;
        indicators += button;
    })
    return indicators;
}

function getCarouselElement(images, indicators) {
    return `<div id="carouselPhotosControls" data-bs-interval="false" class="carousel slide" data-bs-ride="carousel" >
               <div class="carousel-indicators">
                ${indicators}
              </div> 
             <div class="carousel-inner">${images}</div>
                <button class="carousel-control-prev" disabled type="button" 
                    data-bs-target="#carouselPhotosControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" style="cursor: pointer;" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" style="height: 30px; top: 132px;" disabled type="button" 
                    data-bs-target="#carouselPhotosControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon"  style="cursor: pointer;" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>`;
}

function createDetail(property, propertyPhotos) {
    return '<h3 class="text-center pt-5">' + property.propertyDto.title + '</h3>' +
        '<div class="container pt-5">' +
        '    <div class="row pt-5">' +
        '        <div class="col-md-6 col-sm-8 pt-2 text-center">' +

        '               <div class="row w-100 d-flex justify-content-center position-relative">' + `
                          
                            ${propertyPhotos}` +
        '                   <a class="position-absolute top-0 start-100 translate-middle" >' +
        '                   <img src="../assets/images/Icon_camera.png" class="me-5 imgEye" title="Agregar fotos" onclick="redirectToPageFormUploadImages(' + id + ')" alt="icon-eye"></a>' +
        '               </div> ' +
        '            <div class="row"><h5 class="text-center text-muted">' + property.propertyDto.zone + '/' + property.propertyDto.propertyDepartment.replace("_", " ") + '</h5> </div>  ' +

        '        </div>' +
        '            <div class="col-md-6 col-sm-8 pt-2 ">' +
        '            <div class="row">' +
        '                <div class="col-4"><h5>Precio:</h5></div>' +
        '                <div class="col-8">' + property.propertyDto.price + ' Bs.</div>' +
        '            </div>' +
        '            <div class="row">' +
        '                <div class="col-4"><h5>Descripción:</h5></div>' +
        '                <div class="col-8">' + property.propertyDto.description + '</div>' +
        '            </div>   ' +
        '            <div class="row">' +
        '                <div class="col-4"><h5>Tipo de Imnueble:</h5></div>' +
        '                <div class="col-8">' + property.propertyDto.propertyType.replace("_", " ") + '</div>' +
        '            </div>   ' +
        '            <div class="row">' +
        '                <div class="col-4"><h5>Dirección:</h5></div>' +
        '                <div class="col-8">' + property.propertyDto.address + '</div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
}

function getPhotoSources(property) {
    let photosSrc = [];
    let numberPhotosToShow = MAX_NUMBER_PHOTOS;
    if (property.photos.length === 0) {
        numberPhotosToShow = 0;
    } else if (property.photos.length < MAX_NUMBER_PHOTOS) {
        numberPhotosToShow = property.photos.length;
    }
    let flag = numberPhotosToShow;
    let index = property.photos.length-1;
    while ( flag > 0) {
        photosSrc.push("data:" + property.photos[index].mimeType + ";base64," + property.photos[index].value);
        flag--;
        index--;
    }

    return photosSrc;
}

function redirectToPageFormUploadImages(id) {
    window.location.href = "formUploadImages.html?id=" + id;
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

function addAttributeForMindate(){
    let dateToday = new Date();
    let month = dateToday.getMonth() + 1;
    let day = dateToday.getDate()+1;
    var year = dateToday.getFullYear();

    let daysInMonth = new Date(year,month,0).getDate();
   
    if(daysInMonth===day){
        month = month + 1 ;
        day = 0; 
        if(month < 10)
        month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
    }else{
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
    }
    let minDate = year + '-' + month + '-' + day;
    document.getElementById("txtDate").setAttribute("min", minDate);
}  
addAttributeForMindate();