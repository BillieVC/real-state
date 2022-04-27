async function registerProperty() {
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
    fetch("properties/save", {
        method: "POST", body: formData,
        charset: "UTF-8"
    }).then((response)=>{
        if(!response.ok) {
            return response.text().then(text => { throw new Error(text) })
        }
        else {
            return response.json();
        }
    }).catch((error) => {
            console.error(error)
        });
}