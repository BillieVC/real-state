async function registerProperty() {
    let formData = new FormData();
    formData.append("price", document.getElementById("price").value);
    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("type", document.getElementById("typeProperty").value);
    formData.append("department", document.getElementById("department").value);
    formData.append("zone", document.getElementById("zone").value);
    formData.append("address", document.getElementById("address").value);
    formData.append("multipartFile", document.getElementById("formFile").files[0]);
    const request = await fetch("properties/save", {
        method: "POST", body: formData
    });

}