(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
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
  document.getElementById("addres").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^A-Za-z0-9 ]/g, "");
  });