console.log("Service");

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var id = urlParams.get('id');

var property = async function getProperty(id) {
    const request = await fetch('http://localhost:9091/properties/' + id, {
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

function getFiles(props) {

    var srcImg = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    if (props.photos.length > 0) {
        const fileObj = props.photos[0];
        srcImg = "data:" + fileObj.mimeType + ";base64," + fileObj.value;
    }
    return srcImg;
}

async function buildDetail(props) {
    const image = getFiles(props);
    const photosSrc = getPhotoSources(props);
    const images = createImgElements(photosSrc);
    const detail = createDetail(props, images);
    let elemento = document.getElementById("offerDetail");
    elemento.innerHTML = `${detail}`;
}
function createImgElements(photosSrc){
    let images = ``;
    let first=true;
    photosSrc.forEach(value =>{
        let imgDiv = `<div class="carousel-item ${first ? "active":""}">
                         <img class="d-block w-100" src="${value}">
                     </div>`;
        images+=imgDiv;
        first = false;
    })
    return images;
}
function createDetail(prop, images) {
    var icono = "https://firebasestorage.googleapis.com/v0/b/tienda-31379.appspot.com/o/Icono%20camara.png?alt=media&token=2c39797f-c558-40d4-b413-4e19763773d1";
    let cardHtml = 
        '<h3 class="text-center pt-5">' + prop.propertyDto.title + '</h3>' +
        '<div class="container pt-5">' +
        '    <div class="row pt-5">' +
        '        <div class="col-6 text-center">' +
        
        '               <div style="position: relative; left: 0; top: 0;">'  +
        `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
           <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div> `+
        
        '     <div class="carousel-inner">  '+images+'</div>' +
        `   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>`+
        '                   <a title="" onclick = "redirectionPageformUploadImages(' + id + ')" >' +
        '<img src=' + icono + ' class="heaven transition-content"></a>' +
        
        
        '               </div> '+
        '              <h5 class="text-center text-muted positionText">' + prop.propertyDto.zone + '/' + prop.propertyDto.propertyDepartment.replace("_", " ") + '</h5>' +
        
        '        </div>' +
        '            <div class="col-6 pt-2 ">' +
        '            <div class="row">' +
        '                <div class="col-4"><h5>Precio:</h5></div>' +
        '                <div class="col-8">' + prop.propertyDto.price + ' Bs.</div>' +
        '            </div>' +
        '            <div class="row">' +
        '                <div class="col-4"><h5>Descripción:</h5></div>' +
        '                <div class="col-8">' + prop.propertyDto.description + '</div>' +
        '            </div>   ' +
        '            <div class="row">' +
        '                <div class="col-4"><h5>Tipo de Imnueble:</h5></div>' +
        '                <div class="col-8">' + prop.propertyDto.propertyType.replace("_"," ") + '</div>' +
        '            </div>   ' +
        '            <div class="row">' +
        '                <div class="col-4"><h5>Dirección:</h5></div>' +
        '                <div class="col-8">' + prop.propertyDto.address + '</div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';


    return cardHtml;
}

function getPhotoSources(props){
    let photosSrc = [];
    if (props.photos.length > 0) {
       for(let k=0; k<5; k++){
            photosSrc.push( "data:" + props.photos[k].mimeType + ";base64," + props.photos[k].value);
        }
    }
    return photosSrc;
}

function redirectionPageformUploadImages(id){
    window.location.href = "formUploadImages.html?id=" + id;
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}