
document.getElementById("name").addEventListener("input", (e) => {
  let value = e.target.value;
  e.target.value = value.replace(/[^A-Za-z ]/g, "");
});
document.getElementById("telf").addEventListener("input", (e) => {
  let value = e.target.value;
  e.target.value = value.replace(/[^0-9 ]/g, "");
});
document.getElementById("email").addEventListener("input", (e) => {
  let value = e.target.value;
  e.target.value = value.replace(/[^A-Za-z0-9_.@ ]/g, "");
});

  async function requestVisit() {
    flag= true;
    let date = document.getElementById("txtDate");
    if(weekend()){
      date.classList.add("is-invalid");
      date.classList.add("dateError");
      date.classList.remove("dateValid");
      date.classList.remove("is-valid");
      flag = false;
    }else{
      date.classList.remove("is-invalid");
      date.classList.add("dateValid");
      date.classList.remove("dateError");
      date.classList.add("is-valid");
      flag = true;
    }
    
    
    
    var forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            if (!form.checkValidity()||weekend()) {
              flag=false;
            }
            form.classList.add('was-validated')
        })
        
    if(flag){
      
      console.log(document.getElementById("name").value);
      console.log( document.getElementById("email").value);
      console.log(document.getElementById("telf").value);
      console.log(document.getElementById("txtDate").value);
      console.log(document.getElementById("hour").value);
      console.log(id);
      let dateAndTime = document.getElementById("txtDate").value + "T" + document.getElementById("hour").value;
      console.log(dateAndTime); 
     
      let form = {
        userName: document.getElementById("name").value,
        userEmail:  document.getElementById("email").value,
        userPhone: document.getElementById("telf").value,
        date: dateAndTime
      }
      fetch('appointments/save/' + id, {
        method: 'POST',
        body: JSON.stringify(form),
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
                    //window.location.href = "offerDetail.html?id=" + id;
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

  function weekend() {
    let flag = false;
    const date = new Date(document.getElementById("txtDate").value);
    console.log(date);
    let day = date.getDay();
    console.log(day);
    if (day == 5 || day == 6||date=="Invalid Date"){
      flag = true;
    }
    console.log("bandera:" + flag);
    return flag; 
  }
  const validarDate = (e) => {
    switch (e.target.name){
      case "txtDate":
        let date = document.getElementById("txtDate");
        if(weekend()){
          date.classList.add("is-invalid");
          date.classList.add("dateError");
          date.classList.remove("dateValid");
          date.classList.remove("is-valid");
          flag = false;
        }else{
          date.classList.remove("is-invalid");
          date.classList.add("dateValid");
          date.classList.remove("dateError");
          date.classList.add("is-valid");
          flag = true;
        }

    }
  }