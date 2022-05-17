var current_page = 1;
var records_per_page = 9;

    

async function prevPage() {
    if (current_page > 1) {
        current_page--;
        await changePage(current_page);
    }
}

async function nextPage() {
    if (current_page < await numPages()) {
        current_page++;
        await changePage(current_page);
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

    if(props.length===0){
        document.querySelector(".pagination-container").setAttribute("hidden","true");
        document.querySelector("#listingTable").innerHTML = "<h1>No existen ofertas diponibles por el momento</h1>"
    }

    let sortedList = (props.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.publicationDate) - new Date(a.publicationDate);
      }));

    
    //let filterTypeList = sortedList.filter(property => property.typeOffer = DE)

    for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        let prop = sortedList[i];
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

async function numPages() {
    let myLength = await getProperty();
    return Math.ceil(myLength.length / records_per_page);
}

window.onload = async function () {
    await changePage(1);
};

async function getProperty() {
    const request = await fetch('/properties/offers', {
        method: 'GET',
        headers: getHeaders()
    });
    const property = await request.json();   
    return property;
}

async function getFiles(propertyId) {
    const requestFiles = await fetch('/photographs/' + propertyId, {
        method: 'GET',
        headers: getHeaders()
    });
    const files = await requestFiles.json();
    var srcImg = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    if (files.photographs.length > 0) {
        const fileObj = files.photographs[0];
        srcImg = "data:" + fileObj.mimeType + ";base64," + fileObj.value;
    }
    return srcImg;
}

async function loadProperty(prop, srcImg) {

    let cardHtml = 
        '           <div class="col">\n' +
        '                <div class="card mt-3 mb-3 transition-content" style="cursor: pointer; width: 350px;" onclick = "redirectionPageOfferDetail('+ prop.id +')" p-id="'+prop.id +'" >' +
        '                    <img src ='+srcImg+
        '                           class="card-img-top" alt="..." loading="lazy" height="230" width="250">' +
        '                    <div class="card-body">' +
        '                    <h5 class="card-title">'+prop.title+'</h5>' +
        '                    <div class="row">' +
        '                        <div class="col-8">' +
        '                            <p class="card-text">'+prop.propertyType+'</p>' +
        '                        </div>' +
        '                        <div class="col-4">' +
        '                            <h5>'+prop.price+'Bs.</h5>' +
        '                        </div>' +
        '                    </div>' +
        '                    <div class="pt-3">' +
        '                       <h6 >'+prop.zone+', '+prop.propertyDepartment.replace("_"," ")+'</h6>' +
        '                    </div>' +
        '                    </div>' +          
        '                    </ul>' +
        '                    <p class="m-0 list-group-item">'+prop.publicationDate+'</p>' +
        '                </div>' +
        '            </div>';
    return cardHtml;

}

function redirectionPageOfferDetail(id){

    window.location.href = "offerDetail.html?id="+ id;
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}



async function changePageWithfilter(page,typeOffer) {

    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");

    document.getElementById('btn_next').setAttribute=( "onclick","alert('prueba');");

    let cards = '';

    // Validate page
    let props = await getProperty();
    let srcImg = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    document.querySelector('#mycards').remove();

    

    let sortedList = (props.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.publicationDate) - new Date(a.publicationDate);
      }));

    
    let filterTypeList = sortedList.filter(property => property.propertyType == typeOffer);
    
    if (page < 1) page = 1;
    if (page > Math.ceil(filterTypeList.length / records_per_page)) page = Math.ceil(filterTypeList.length / records_per_page);
      console.log(page);
    if(filterTypeList.length===0){
        document.querySelector(".pagination-container").setAttribute("hidden","true");
        document.querySelector("#listingTable").innerHTML = "<h1>No existen ofertas diponibles por el momento</h1>"
    }

    for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        let prop = filterTypeList[i];
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

    if (page === 1 ) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page === await Math.ceil(filterTypeList.length / records_per_page)) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
    
    //btn_next.style.visibility = "visible";
}


function UpdatePageWithFilter(typeOffer){
    changePageWithfilter(page,typeOffer);
}