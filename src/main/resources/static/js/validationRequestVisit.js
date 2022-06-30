const SATURDAY = 5;
const SUNDAY = 6;
document.getElementById("name").addEventListener("input", (event) => {
  let value = event.target.value;
  event.target.value = value.replace(/[^A-Za-z ]/g, "");
});
document.getElementById("telf").addEventListener("input", (event) => {
  let value = event.target.value;
  event.target.value = value.replace(/[^0-9 ]/g, "");
});
document.getElementById("email").addEventListener("input", (event) => {
  let value = event.target.value;
  event.target.value = value.replace(/[^A-Za-z0-9_.@ ]/g, "");
  
});
document.getElementById("txtDate").addEventListener("input", () => {
  verifyDate();
});
  async function requestVisit() {
    validated = true;
    verifyDate();   
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            if (!form.checkValidity()||theDateIsWeekendOrNull()) {
              flag=false;
            }
            form.classList.add('was-validated')
        })
        
    if(validated){
      
      let dateAndTime = document.getElementById("txtDate").value + "T" + document.getElementById("hour").value;     
      let jsonRequestVisit = {
        userName: document.getElementById("name").value,
        userEmail:  document.getElementById("email").value,
        userPhone: document.getElementById("telf").value,
        date: dateAndTime
      }
      fetch('appointments/save/' + id, {
        method: 'POST',
        body: JSON.stringify(jsonRequestVisit),
        headers: {
          'Content-Type': 'application/json'
        }
    })
        .then(response => {
            response.json();
            if (response.ok) {
                Swal.fire({
                    title: 'La reserva se realizó satisfactoriamente',
                    text: "La visita es para " + document.getElementById("txtDate").value +
                          ", a las "+document.getElementById("hour").value,
                    icon: 'success',
                    allowOutsideClick: false,
                    confirmButtonText: 'Aceptar'
                }).then((result) => { 
                    if (result.isConfirmed) {
                        window.location.href = "offerDetail.html?id=" + id;
                    }
                })
            }else{
              Swal.fire({
                title: 'Fecha ocupada',
                text: "Revise las visitas ya agendadas",
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    let date = document.getElementById("txtDate");     
                    date.classList.remove("dateError");
                    date.classList.remove("dateValid");
                    date.value = "";
                }
            })
            }
        })
        .catch(error => {
            console.error(error)
        })   
  }
}
function theDateIsWeekendOrNull() {
  let booleanResponse = false;
  let formDateValue = new Date(document.getElementById("txtDate").value);
  let day = formDateValue.getDay();
  if (day === SATURDAY || day === SUNDAY || formDateValue == "Invalid Date"){
    booleanResponse = true;
  }
  return booleanResponse; 
}
function verifyDate(){
  let selectedDate = document.getElementById("txtDate");
  if(theDateIsWeekendOrNull()){
    selectedDate.classList.add("is-invalid");
    selectedDate.classList.add("dateError");
    selectedDate.classList.remove("dateValid");
    selectedDate.classList.remove("is-valid");
    validated = false;
  }else{
    selectedDate.classList.remove("is-invalid");
    selectedDate.classList.add("dateValid");
    selectedDate.classList.remove("dateError");
    selectedDate.classList.add("is-valid");
    validated = true;
  }
}