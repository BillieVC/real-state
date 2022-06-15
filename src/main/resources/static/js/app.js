let current_page = 1;
let records_per_page = 9;
let props;

window.onload = async function () {
    props = await getProperty();
    await changePage(1);
};

async function prevPage() {
    if (current_page > 1) {
        current_page--;
        await changePage(current_page);
    }
}

async function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        await changePage(current_page);
    }
}

async function changePage(page, filterType) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");

    let cards = '';

    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    if (filterType) {
        page = 1;
        props = await getProperty();
        document.querySelector(".pagination-container")
            .appendChild(getFilterResultsText(filterType));
        if (filterType !== "TODOS") {
            props = props.filter(prop => prop.propertyType === filterType);
        }
    }
    let srcImg = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    document.querySelector('#mycards').remove();

    if (props.length === 0) {
        document.querySelector("#pages-container")
            .setAttribute("hidden", "true");
        if (filterType) {
            current_page = 1;
            document.querySelector("#listingTable")
                .innerHTML = "<h1 class='pt-5 text-center' id='msg-no-props'>No existen ofertas disponibles por el momento para el tipo seleccionado " + filterType.replace("_", " ") + ".</h1>"
        } else {
            document.querySelector("#listingTable")
                .innerHTML = "<h1 class='pt-5 text-center' id='msg-no-props'>No existen ofertas diponibles por el momento</h1>"
        }
    } else {
        document.querySelector("#pages-container").removeAttribute("hidden");
        let msg = document.querySelector("#msg-no-props");
        if (msg) {
            msg.remove();
        }
    }

    let sortedList = (props.sort(function (a, b) {
        return new Date(b.publicationDate) - new Date(a.publicationDate);
    }));

    for (let i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        let prop = sortedList[i];
        if (prop) {
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
        btn_prev.setAttribute("disabled", "true");
    } else {
        btn_prev.removeAttribute("disabled");
    }

    if (page === numPages()) {
        btn_next.setAttribute("disabled", "true");
    } else {
        btn_next.removeAttribute("disabled");
    }
}

function getFilterResultsText(type) {
    let previous = document.querySelector("#msg-result-container");
    if (previous) {
        previous.remove();
    }
    let divResults = document.createElement('div');
    divResults.classList.add('row');
    divResults.classList.add('mt-4');
    divResults.classList.add('text-center');
    divResults.classList.add('text-muted');
    divResults.setAttribute("id", "msg-result-container");
    let msgResults = document.createElement('h4');
    msgResults.innerText = `Ofertas de tipo: ${type.replace("_", " ")}`;
    divResults.appendChild(msgResults)
    return divResults;
}

function numPages() {
    return Math.ceil(props.length / records_per_page);
}

async function getProperty() {
    const request = await fetch('/properties/offers', {
        method: 'GET',
        headers: getHeaders()
    });
    return await request.json();
}

async function getFiles(propertyId) {
    const requestFiles = await fetch('/photographs/' + propertyId, {
        method: 'GET',
        headers: getHeaders()
    });
    const files = await requestFiles.json();
    let srcImg = "../assets/images/image-unavailable.png";
    if (files.photographs.length > 0) {
        const fileObj = files.photographs[0];
        srcImg = "data:" + fileObj.mimeType + ";base64," + fileObj.value;
    }
    return srcImg;
}

async function loadProperty(prop, srcImg) {
    return '           <div class="col">\n' +
        '                <div class="card mt-3 mb-3 transition-content" style="cursor: pointer; width: 350px;" onclick = "redirectionPageOfferDetail(' + prop.id + ')" p-id="' + prop.id + '" >' +
        '                    <img src =' + srcImg +
        '                           class="card-img-top" alt="..." loading="lazy" height="230" width="250">' +
        '                    <div class="card-body">' +
        '                    <h5 class="card-title">' + prop.title + '</h5>' +
        '                    <div class="row">' +
        '                        <div class="col-8">' +
        '                            <p class="card-text">' + prop.propertyType.replace("_", " ") + '</p>' +
        '                        </div>' +
        '                        <div class="col-4">' +
        '                            <h5>' + prop.price + 'Bs.</h5>' +
        '                        </div>' +
        '                    </div>' +
        '                    <div class="pt-3">' +
        '                       <h6 >' + prop.zone + ', ' + prop.propertyDepartment.replace("_", " ") + '</h6>' +
        '                    </div>' +
        '                    </div>' +
        '                    </ul>' +
        '                    <p class="m-0 list-group-item">' + prop.publicationDate + '</p>' +
        '                </div>' +
        '            </div>';

}

function redirectionPageOfferDetail(id) {
    window.location.href = "offerDetail.html?id=" + id;
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}
