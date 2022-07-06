const SEPARATOR = "T"; 
queryString = window.location.search;
urlParams = new URLSearchParams(queryString);
propertyId = urlParams.get('id');

let visitRequestList = async function getVisitRequestList(propertyId) {
    let request = await  fetch('/appointments/' + propertyId, {
        method: 'GET',
        headers: getHeaders()
    });
    return await request.json();
}


async function getListFromDataBase() {
    let visitListJsonFormat = await visitRequestList(propertyId);
    console.log(visitListJsonFormat.appointmentDtoList.length);
    if (visitListJsonFormat.appointmentDtoList.length===0) {
        document.getElementById("listRequestVisitTable")
        .innerHTML = "<h1 class='pt-5 text-center' id='msg-no-props'>No existen Visitas Agendadas para mostrar</h1>"
    }  else{
    createVisitRequestList(visitListJsonFormat.appointmentDtoList);
    }
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

getListFromDataBase();

function createVisitRequestList(List){
    for (let index = 0; index < List.length; index++) {
          let element = List[index];  
          let dateAndHour = element.date.split(SEPARATOR);
          let date = dateAndHour[0];
          let hour = dateAndHour[1];
          let time = hour.split(".");
          let hourWithoutSeconds = time[0]; 
        document.getElementById("listRequestVisitTable").innerHTML += '<tr>'+
                                                    '<th scope="row">'+(index+1)+'</th>'+
                                                    '<td>'+element.userName+'</td>'+
                                                    '<td>'+element.userEmail+'</td>'+
                                                    '<td>'+element.userPhone+'</td>'+
                                                    '<td>'+date+'</td>'+
                                                    '<td>'+hourWithoutSeconds+'</td>'+
                                                '</tr>'
    }
}

