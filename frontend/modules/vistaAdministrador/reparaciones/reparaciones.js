//Elementos

const mechanics = [document.getElementById("mechanic-1"),document.getElementById("mechanic-2"),
    document.getElementById("mechanic-3"),document.getElementById("mechanic-4") ]
const searchVehicleBtn = document.getElementById("searchVehicle")
const vehicleInfoContainer = document.getElementById("vehicleInfoContainer")
const taskForm = document.getElementById("taskForm")





//Eventos

searchVehicleBtn.addEventListener("click", async ()=>{

    const placa = document.getElementById("license-plate").value
    
    const response = searchVehicle(placa)
})

taskForm.addEventListener("submit", async (e) =>{
    e.preventDefault()
    const modo = document.getElementById("mode").value
    const placaVehiculo = document.getElementById("license-plate").value
    const fecha_inicio = document.getElementById("deadline").value
    const fechaAprox = document.getElementById("estimated-completion").value
    const tareas = [
        {electrica: [document.getElementById("electrical-textarea").value, document.getElementById("mechanic-1").value]},
        {mecanica: [document.getElementById("mechanical-textarea").value,  document.getElementById("mechanic-2").value]},
        {tuberias: [document.getElementById("plumbing-textarea").value,  document.getElementById("mechanic-3").value]},
        {aire: [document.getElementById("hvac-textarea").value,  document.getElementById("mechanic-4").value]}
    ]
    const descripcion = document.getElementById("instructions").value
    const prioridad = document.getElementById("priority").value

    let reparacion = {placaVehiculo, fecha_inicio, fechaAprox,tareas,descripcion,prioridad, modo}
   
    
    const response = await createReparacion(reparacion)

    if(response){

        alert("Reparacion Asignada Correctamente")
        location.reload()
    }
})







//UI

async function loadMecanicos(){

    const mecanicos = await fetchMecanicos()
   
    mecanicos.forEach(mecanico => {
        const option = document.createElement("option");
        option.value = mecanico.cedula;
        option.text = mecanico.nombre;
    
   
        mechanics.forEach(mechanic => {
            mechanic.appendChild(option.cloneNode(true)); // Clona la opción para cada select
        });
    });}

function toggleCategory(category) {
    const section = document.getElementById(`${category}-section`);
    section.classList.toggle('hidden');
}








//Controllers

async function searchVehicle(placa) {

    const vehiculo = await fetchVehiculoById(placa)
   

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

async function createReparacion(reparacion){
    const { placaVehiculo } = reparacion
    const  [ vehiculo ] = await fetchVehiculoById(placaVehiculo)

    reparacion.id_vehiculo = vehiculo.id
    
    try{
        const response = await fetchReparaciones(reparacion)
        return true

    }catch{
        alert("Error creando reparacion")
        

    }
    return false

  
  

   



    
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

async function fetchMecanicoById(cedula) {
    try{

        const response = await fetch(`/mecanicos/${cedula}`)
        const mecanico = await response.json()
        return mecanico

    }catch{
        alert("Error fetchs mecanicos")
    }



    
}

async function fetchReparaciones(reparacion){
  
    try{

        const response = await fetch("/reparaciones", {
          method: "POST", // Tipo de solicitud
          headers: {
            "Content-Type": "application/json", // Especifica que se está enviando JSON
          },
          body: JSON.stringify(reparacion), // Convierte el objeto a un string JSON
        })

      

  }catch{
      
      
  }   
}


       

document.addEventListener('DOMContentLoaded', () => {
    loadMecanicos()
    
});