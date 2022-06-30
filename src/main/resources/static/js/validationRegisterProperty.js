
var form = document.getElementById("myForm");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);

  document.getElementById("title").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^A-Za-z0-9 ]/g, "");
  });
  document.getElementById("description").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^A-Za-z0-9 ]/g, "");
  });
  document.getElementById("zone").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^A-Za-z0-9 ]/g, "");
  });
  document.getElementById("address").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^A-Za-z0-9 ]/g, "");
  });

async function registerPropertyPost() {
  let flag = true;
  let fileEle = document.querySelector("#formFile");
  let file = document.getElementById("formFile").files[0];
  if(file){
    if(file.type!=="image/jpg" && file.type!=="image/jpeg" && file.type!=="image/png"){
      fileEle.classList.add("is-invalid");
      fileEle.classList.remove("is-valid");
      flag=false;
    }else {
      if(file.size>5000000){
        fileEle.classList.add("is-invalid");
        fileEle.classList.remove("is-valid");
      }else {
        fileEle.classList.add("is-valid");
        fileEle.classList.remove("is-invalid");
      }

    }
  }

  var forms = document.querySelectorAll('.needs-validation')
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
      .forEach(function (form) {
          if (!form.checkValidity()) {
            flag=false;
          }
          form.classList.add('was-validated')
      })

  if(flag){

    let formData = new FormData();
    formData.append("price", document.getElementById("price").value);
    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("type", document.getElementById("typeProperty").value);
    formData.append("department", document.getElementById("department").value);
    formData.append("zone", document.getElementById("zone").value);
    formData.append("address", document.getElementById("address").value);
    let file = document.getElementById("formFile").files[0];
    if(file!==undefined){
      formData.append("multipartFile", file);
    }
    const resp = await fetch("properties/save", {
      method: "POST", body: formData,
      charset: "UTF-8"
    }).then((response)=>{
      if(!response.ok) {
        return response.text().then(text => { throw new Error(text) })
      }
      return response;
    }).catch((error) => {
      console.error(error)
    });

    if(resp.ok){
      Swal.fire({
        title: 'Éxito!',
        text: "Inmueble registrado",
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "index.html";
        }
      })
    }
  }
}
