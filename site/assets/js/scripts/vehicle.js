async function fillTable (myRequest){
    listBox = document.querySelector("#car-list-box")
    carList = document.querySelector("#car-list");
    listBox.removeChild(carList);  

    let myList = document.createElement('ul');
    myList.setAttribute("id", "car-list");
    await fetch(myRequest)
        .then(response => response.json())
        .then(result => {
            document.getElementById("page").value = result.page;
            document.getElementById("lastPage").value = result.lastPage;
            result.data.forEach((car, index) => {

                if(index == 0){
                    firstCar = car.id_vehicle
                }
                let listItem = document.createElement('li');
                listItem.setAttribute('onclick','getCarInfo('+car.id_vehicle+');');
                listItem.setAttribute('id','car'+car.id_vehicle);
                listItem.onclick = function() { getCarInfo(car.id_vehicle);}; 

                let carItem = document.createElement('div');
                let carItemInfo = document.createElement('div');
                let carItemEdit = document.createElement('div');
                let clear = document.createElement('div');

                let carName = document.createElement('p');
                let carBrand = document.createElement('p');
                let carYear = document.createElement('p');

                let carEditIcon = document.createElement('img')
                carEditIcon.src = "site/assets/img/editar.png"

                listItem.setAttribute("class", "car-item car-view" + car.id_vehicle);
                carName.setAttribute("class", "car-name");
                carBrand.setAttribute("class", "car-brand");
                carYear.setAttribute("class", "car-year");
                carItemInfo.setAttribute("class", "car-item-info");
                carItemEdit.setAttribute("class", "car-item-edit");
                clear.setAttribute("class", "clear");

                carBrand.textContent = car.brand;
                carName.textContent = car.vehicle;
                carYear.textContent = car.year;

                carItemEdit.appendChild(carEditIcon)
                carItemInfo.appendChild(carBrand)
                carItemInfo.appendChild(carName)
                carItemInfo.appendChild(carYear)

                carItem.appendChild(carItemInfo)
                carItem.appendChild(carItemEdit)
                carItem.appendChild(clear)
                listItem.appendChild(carItem);
                myList.appendChild(listItem);   
            })
            listBox.appendChild(myList)
            if(firstCar){
                getCarInfo(firstCar)
            }
        })
        .catch(console.error);
}

function getCars() {
    let search = document.getElementById("search").value;
    const myRequest = new Request('/TesteApi/api/veiculos?q='+search+'&page=1', {
        method: 'GET'
    });
    fillTable(myRequest)
}

function firstPage(){
    getCars()
}
function prevPage(){
    let search = document.getElementById("search").value;
    let page = parseInt(document.getElementById("page").value);
    page -= 1
    if(page < 1){
        page = 1
    }
    const myRequest = new Request('/TesteApi/api/veiculos?q='+search+'&page='+page, {
        method: 'GET'
    });
    fillTable(myRequest)
}
function nextPage(){
    let search = document.getElementById("search").value;
    let page = parseInt(document.getElementById("page").value);
    let lastPage = parseInt(document.getElementById("lastPage").value);
    page += 1
    if(page > lastPage){
        page = lastPage
    }
    const myRequest = new Request('/TesteApi/api/veiculos?q='+search+'&page='+page, {
        method: 'GET'
    });
    fillTable(myRequest)
}
function lastPage(){
    let search = document.getElementById("search").value;
    let page = parseInt(document.getElementById("lastPage").value);
    const myRequest = new Request('/TesteApi/api/veiculos?q='+search+'&page='+page, {
        method: 'GET'
    });
    fillTable(myRequest)
}

async function getCarInfo(id) {
    $(".car-item").removeClass("car-active");
    document.getElementById('car'+id).classList.add("car-active");
    const myRequest = new Request('/TesteApi/api/veiculos/' + id, {
        method: 'GET'
    });
    
    await fetch(myRequest)
        .then(response => response.json())
        .then(car => {
            
            let carDetails = document.querySelector(".car-details");
            let carName = document.createElement('h3');

            let carBrandYearDiv = document.createElement('div');

            let carBrandDiv = document.createElement('div');
            let carBrandLabel = document.createElement('p');
            let carBrand = document.createElement('p');

            let carYearDiv = document.createElement('div');
            let carYear = document.createElement('p');
            let carYearLabel = document.createElement('p');

            let carDescriptionDiv = document.createElement('div');
            let carDescription = document.createElement('p');

            let clear = document.createElement('div');

            let buttonBox = document.createElement('div');
            var button = document.createElement("input");
            button.type = "button";
            button.value = "Editar";
            
            carBrandYearDiv.setAttribute("class", "grid");

            buttonBox.setAttribute("class", "action-button-box");
            carName.setAttribute("class", "car-name");
            carBrandLabel.setAttribute("class", "car-label");
            carBrand.setAttribute("class", "car-brand");
            carYearLabel.setAttribute("class", "car-label");
            carYear.setAttribute("class", "car-year");
            carDescription.setAttribute("class", "car-description");

            button.setAttribute("class", "action-button car-edit-btn" + car.id_vehicle);
            button.setAttribute('onclick','editVehicle('+car+');');
            button.onclick = function() { editVehicle(car);}; 

            buttonBox.appendChild(button)
            buttonBox.appendChild(clear)

            carDetails.innerHTML = "";

            carName.textContent = car.vehicle;

            carBrand.textContent = car.brand;
            carBrandLabel.textContent = 'Marca';
            
            carBrandDiv.appendChild(carBrandLabel)
            carBrandDiv.appendChild(carBrand)

            carYear.textContent = car.year;
            carYearLabel.textContent = 'Ano';

            carYearDiv.appendChild(carYearLabel)
            carYearDiv.appendChild(carYear)

            carDescription.textContent = car.description;
            carDescriptionDiv.appendChild(carDescription);

            carBrandYearDiv.appendChild(carBrandDiv)
            carBrandYearDiv.appendChild(carYearDiv)

            carBrandYearDiv.appendChild(clear)
            
            carDetails.appendChild(carName)
            carDetails.appendChild(carBrandYearDiv)

            carDetails.appendChild(carDescriptionDiv)
            carDetails.appendChild(buttonBox)
        })
        .catch(console.error);
}

async function editVehicle(car) {
    $('.delete-button').removeClass('hide')
    showModal()
    document.querySelector("[name='idVehicle']").value = car.id_vehicle;
    document.querySelector("[name='name']").value = car.vehicle;
    document.querySelector("[name='brand']").value = car.brand;
    document.querySelector("[name='year']").value = car.year;
    document.getElementById("description").innerHTML = car.description;
    document.querySelector("[name='sold']").checked  = car.sold;
}

async function updateVehicle(formData, id){
    $.ajax({
        type: "PUT",
        url: '/TesteApi/api/veiculos/' + id,
        contentType: "application/json",
        data: formData,
        beforeSend : function(){
            // $("#resultado").html("ENVIANDO...");
       }
    })
    .done(function(msg){
        hideModal()
        alert("Veículo atualizado com sucesso");
        getCars()
   })
   .fail(function(jqXHR, textStatus, msg){
        alert(msg);
   });
}

async function storeVehicle(formData){
    $.ajax({
        type: "POST",
        url: '/TesteApi/api/veiculos',
        contentType: "application/json",
        data: formData,
        beforeSend : function(){
            // $("#resultado").html("ENVIANDO...");
       }
    })
    .done(function(msg){
        hideModal()
        alert("Veículo criado com sucesso")
        getCars()
   })
   .fail(function(jqXHR, textStatus, msg){
        alert(msg);
   });
}

async function saveVehicle(){
    let formData = $('#form-edit').serializeArray()
    formData.push({name: "description", value: document.getElementById("description").value})

    let id = 0
    formData.forEach(function(item) {
        if(item.name == "idVehicle"){
            id = item.value
        }
      })

    if(id > 0){
        updateVehicle(formData, id)
    }else{
        storeVehicle(formData)
    }

}

async function deleteVehicle(){

    let id = document.getElementById("idVehicle").value
    var r=confirm("Tem certeza que deseja apagar este veículo?");
    if (r==true)
    {
        $.ajax({
            type: "DELETE",
            url: '/TesteApi/api/veiculos/'+id,
            contentType: "application/json",
            beforeSend : function(){
                // $("#resultado").html("ENVIANDO...");
           }
        })
        .done(function(msg){
            hideModal()
            alert("Veículo apagado com sucesso")
            getCars()
       })
       .fail(function(jqXHR, textStatus, msg){
            alert(msg);
       });
    }
}

async function createVehicle(){
    $('.delete-button').addClass('hide')
    showModal()
}