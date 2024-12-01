//Elementos

const mechanics = document.getElementById("mechanic")
const searchVehicleBtn = document.getElementById("searchVehicle")
const vehicleInfoContainer = document.getElementById("vehicleInfoContainer")





//Eventos

searchVehicleBtn.addEventListener("click", async ()=>{

    const placa = document.getElementById("license-plate").value
    
    const response = searchVehicle(placa)
})







//UI

async function loadMecanicos(){

    const mecanicos = await fetchMecanicos()
   
    mecanicos.forEach(mecanico => {
        console.log(mecanico)
        const option = document.createElement("option")
        option.value = mecanico.cedula
        option.text = mecanico.nombre
        mechanics.appendChild(option) 
    });
}

function toggleTextarea(id) {
    const textarea = document.getElementById(id);
    textarea.classList.toggle('hidden');
}







//Controllers

async function searchVehicle(placa) {

    const vehiculo = await fetchVehiculoById(placa)
    console.log(vehiculo.length)

    if(vehiculo.length === 0){
       
        vehicleInfoContainer.classList.remove('hidden');
        document.getElementById('errorMessages').classList.remove('hidden');
        document.getElementById('errorMessages').textContent = "Vehiculo no encontrado";
        document.getElementById('vehicle-model').textContent = '';
        document.getElementById('vehicle-year').textContent = '';
        return
    }

    vehicleInfoContainer.classList.remove('hidden');
    document.getElementById('errorMessages').classList.add('hidden');
    document.getElementById('vehicle-model').textContent = `${vehiculo[0].marca} ${vehiculo[0].modelo}`;
    document.getElementById('vehicle-year').textContent = vehiculo[0].year;


    
}








//Fetchs

async function fetchMecanicos() {

    try{

        const response = await fetch(`/mecanicos`)
        const mecanicos = await response.json()
        return mecanicos

    }catch{
        alert("Error fetchs mecanicos")
    }
    
}

async function fetchVehiculoById(placa){
    try{

        const response = await fetch(`/vehiculos/${placa}`)
        const vehiculo = await response.json()
        return vehiculo

    }catch{
        alert("Error fetchs mecanicos")
    }
    
}


       

document.addEventListener('DOMContentLoaded', () => {
    loadMecanicos()
    
});