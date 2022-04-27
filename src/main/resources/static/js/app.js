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

    for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        let prop = props[i];
        if (prop !== undefined) {
            srcImg = await getFiles(prop.id);
            let card = await loadProperty(prop, srcImg);
            cards += card;
        }
    }
    let div = document.createElement('div');
    div.setAttribute('class', 'row row-cols-3 row-cols-md-3 g-4');
    div.setAttribute('style', 'padding-bottom: 3%; padding-top: 1%');
    div.setAttribute('id', 'mycards');
    document.querySelector('#listingTable').appendChild(div);
    let div2 = document.createElement('div');
    document.querySelector('#mycards').appendChild(div2);
    document.querySelector('#mycards div').outerHTML = cards;

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
    const request = await fetch('/property', {
        method: 'GET',
        headers: getHeaders()
    });
    const property = await request.json();
    return property.propertyList;
}

async function getFiles(propertyId) {
    const requestFiles = await fetch('/files/' + propertyId, {
        method: 'GET',
        headers: getHeaders()
    });
    const files = await requestFiles.json();
    var srcImg = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    if (files.files.length > 0) {
        const fileObj = files.files[0];
        srcImg = "data:" + fileObj.mimeType + ";base64," + fileObj.value;
    }
    return srcImg;
}

async function loadProperty(prop, srcImg) {

    let cardHtml = 
        '           <div class="col">\n' +
        '                <div class="card mt-3 mb-3" style="width: 350px;">' +
        '                    <img src=' + srcImg + 'class="card-img-top" alt="...">' +
        '                    <div class="card-body">' +
        '                    <h5 class="card-title">'+prop.titulo+'</h5>' +
        '                    <div class="row">' +
        '                        <div class="col-8">' +
        '                            <p class="card-text">'+prop.description+'</p>' +
        '                        </div>' +
        '                        <div class="col-4">' +
        '                            <h5>'+prop.precio+'</h5>' +
        '                        </div>' +
        '                    </div>' +
        '                    <div class="pt-3">' +
        '                       <h6 >'+prop.localidad+'</h6>' +
        '                       <h6>+'+prop.direccion+'</h6>' +
        '                    </div>' +
        '                    </div>' +          
        '                    </ul>' +
        '                    <p class="m-0 list-group-item">'+prop.fecha+'/p>' +
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