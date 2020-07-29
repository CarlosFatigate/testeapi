function showModal(){
    var modal = document.getElementById("modal-edit");
    clearModal()
    modal.classList.remove("hide");
}

function hideModal(){
    var modal = document.getElementById("modal-edit");
    clearModal()
    modal.classList.add("hide");
}

function clearModal(){
    document.querySelector("[name='idVehicle']").value = '';
    document.querySelector("[name='name']").value = '';
    document.querySelector("[name='brand']").value = '';
    document.querySelector("[name='year']").value = '';
    document.getElementById("description").innerHTML = '';
    document.querySelector("[name='sold']").checked  = '';
}