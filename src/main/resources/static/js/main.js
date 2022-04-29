console.log("<<<CARGADO>>>");
const propertiesContainer = document.querySelector(".properties-container");
let cards = '<div>HOLA</div>';

const lista=[];
let srcImg = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

async function fetchProperties(){
    const request = await fetch(`http://localhost:9091/properties/offers`,{
        method: 'GET',
        headers: getHeaders()
    });
    const property = await request.json();
    return property;   
}

async function listProperties(lista){
    for(let i = 1; i <= lista.length; i++){
        console.log("HOLA");
        console.log(lista[i]);           
     
    }
}

async function changePage(page) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");
    let cards = '';

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    let props = await getProperty();
    let srcImg = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    document.querySelector('#mycards').remove();

    for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        let prop = props[i];
        if (prop !== undefined) {
            srcImg = await getFiles(prop.id);
            let card = await loadProperty(prop, srcImg);
            cards += card;
        }
    }
    let div = document.createElement('div');
    div.setAttribute('class', 'properties-container row row-cols-1 row-cols-sm-2 row-cols-md-3 g-1 pading');
    
    div.setAttribute('id', 'mycards');
    document.querySelector('#listingTable').appendChild(div);
    let div2 = document.createElement('div');
    document.querySelector('#mycards').appendChild(div2);
    document.querySelector('#mycards').innerHTML = cards;

    page_span.innerHTML = page;

    if (page === 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page === await numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

async function createProperty(property){
    let cardHtml = 
        '           <div class="col">\n' +
        '                <div class="card mt-3 mb-3" style="width: 350px;">' +
        '                    <img src=' + srcImg + 'class="card-img-top" alt="...">' +
        '                    <div class="card-body">' +
        '                    <h5 class="card-title">'+property.titulo+'</h5>' +
        '                    <div class="row">' +
        '                        <div class="col-8">' +
        '                            <p class="card-text">'+property.propertyType+'</p>' +
        '                        </div>' +
        '                        <div class="col-4">' +
        '                            <h5>'+property.price+'</h5>' +
        '                        </div>' +
        '                    </div>' +
        '                    <div class="pt-3">' +
        '                       <h6 >'+property.localidad+'</h6>' +
        '                    </div>' +
        '                    </div>' +          
        '                    </ul>' +
        '                    <p class="m-0 list-group-item">'+property.publicationDate+'/p>' +
        '                </div>' +
        '            </div>';
    return cardHtml;
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

window.onload = async function () {
    let data =  await fetchProperties();
    for(let i of data){          
        lista.push(i);
    }
    console.log(lista);
    await changePage(1);
};


