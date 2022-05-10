console.log("Service");
const OfferDetail = document.querySelector("#offerDetail");

let div = createDetail();
console.log(div);
let div2 = document.createElement('div');
document.querySelector("#offerDetail").appendChild(div2);
document.querySelector("#offerDetail").innerHTML = "<h1>No existen ofertas diponibles por el momento</h1>"
OfferDetail.innerHTML = div;

function createDetail(){
    let cardHtml = 
        '<h3 class="text-center pt-5">Título inmueble</h3>' +
        '<div class="container pt-5">'+
        '    <div class="row pt-5">'+
        '        <div class="col-6 text-center">'+
        '            <img src="https://firebasestorage.googleapis.com/v0/b/alquiler-a732a.appspot.com/o/casa02.jpg?alt=media&token=a650e6d0-6e17-4509-a6d6-8ae2a1e9d7b3" width="420px">'+
        '            <h5>Zona / Ciudad</h5>'+
        '        </div>'+
        '            <div class="col-6 pt-2 ">'+
        '            <div class="row">'+
        '                <div class="col-4"><h5>Precio:</h5></div>'+
        '                <div class="col-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, rerum.</div>'+
        '            </div>'+
        '            <div class="row">'+
        '                <div class="col-4"><h5>Descripción:</h5></div>'+
        '                <div class="col-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate porro placeat beatae maxime atque quia facere unde quidem numquam id.</div>'+
        '            </div>   '+
        '            <div class="row">'+
        '                <div class="col-4"><h5>Tipo de Imnueble:</h5></div>'+
        '                <div class="col-8">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>'+
        '            </div>   '+
        '            <div class="row">'+
        '                <div class="col-4"><h5>Direccíon:</h5></div>'+
        '                <div class="col-8">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>'+
        '            </div>'    +          
        '        </div>'+
        '    </div>'+
        '</div>'
    return cardHtml;
}