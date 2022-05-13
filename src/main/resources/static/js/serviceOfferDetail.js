console.log("Service");

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var id = urlParams.get('id');
console.log(id);

var property = async function getProperty(id) {
       const request = await fetch('http://localhost:9091/properties/' +id,{
        method: 'GET',
        headers: getHeaders()
    });
    const property = await request.json();   
    return property;
}

window.onload = async function () {
    property(id).then(property=>buildDetail(property))

};

async function getFiles(propertyId) {
    const requestFiles = await fetch('http://localhost:9091/properties/' + propertyId, {
        method: 'GET',
        headers: getHeaders()
    });
    const files = await requestFiles.json();
    console.log(files.photos[0]);
    
    var srcImg = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    //if (files.photos.length > 0) {
     //   const fileObj = files.photographs[0];
      //  console.log(fileObj);
       // srcImg = "data:" + fileObj.mimeType + ";base64," + fileObj.value;
   // }
    return srcImg;
}

async function buildDetail(props){ 
    console.log(props);
    const image =  getFiles(id);
    const detail  = createDetail(props,image);
    let elemento = document.getElementById("offerDetail");
    elemento.innerHTML =  `${detail}`;
}

function createDetail(prop,src){
    //console.log(prop);
    let cardHtml = 
        '<h3 class="text-center pt-5">' + prop.propertyDto.title+ '</h3>' +
        '<div class="container pt-5">'+
        '    <div class="row pt-5">'+
        '        <div class="col-6 text-center">'+
        '            <img src='+src+' width="420px">'+
        '            <h5>'+ prop.propertyDto.zone+'/'+ prop.propertyDto.propertyDepartment+'</h5>'+
        '        </div>'+
        '            <div class="col-6 pt-2 ">'+
        '            <div class="row">'+
        '                <div class="col-4"><h5>Precio:</h5></div>'+
        '                <div class="col-8">'+prop.propertyDto.price +'</div>'+
        '            </div>'+
        '            <div class="row">'+
        '                <div class="col-4"><h5>Descripción:</h5></div>'+
        '                <div class="col-8">'+ prop.propertyDto.description+'</div>'+
        '            </div>   '+
        '            <div class="row">'+
        '                <div class="col-4"><h5>Tipo de Imnueble:</h5></div>'+
        '                <div class="col-8">' +prop.propertyDto.propertyType + '</div>'+
        '            </div>   '+
        '            <div class="row">'+
        '                <div class="col-4"><h5>Direccíon:</h5></div>'+
        '                <div class="col-8">'+ prop.propertyDto.address +'</div>'+
        '            </div>'    +          
        '        </div>'+
        '    </div>'+
        '</div>';


    return cardHtml;
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}