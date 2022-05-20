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
    const detail = createDetail(props, image);
    let elemento = document.getElementById("offerDetail");
    elemento.innerHTML = `${detail}`;
}

function createDetail(prop, src) {
    let cardHtml =
        '<h3 class="text-center pt-5">' + prop.propertyDto.title + '</h3>' +
        '<div class="container pt-5">' +
        '    <div class="row pt-5">' +
        '        <div class="col-6 text-center">' +
        '            <img src=' + src + ' width="420px">' +
        '            <h5 class="text-muted">' + prop.propertyDto.zone + '/' + prop.propertyDto.propertyDepartment.replace("_", " ") + '</h5>' +
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

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}