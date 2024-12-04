let placa = localStorage.getItem('placa');
let cedula = localStorage.getItem('cedula')
const placaVehiculo = placa

//Eventos

//UI

async function loadTask() {

    const taskArea = document.getElementById("container-task")
    const data = await getTask()
    
    if (!data){
        document.getElementById("id").innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h1 class="text-2xl font-bold text-gray-800">Reparacion No Conseguida</h1>
                <p id="placa" class="text-gray-600">:(</p>
            </div>
        </div>`
         return
    }
    const {reparacion} = data
    console.log(reparacion)

   for (const tarea of reparacion.tareas) {
        const {id_mecanico} = tarea
        const mecanico = await fetchMecanicoById(id_mecanico)

        const task = `
            <div class="border rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="font-semibold">${tarea.tarea_realizada}</h3>
                            <span class="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">${tarea.status}</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-2">Mecanico: ${mecanico.nombre}</p>
                        <p class="text-gray-600 text-sm">Observaciones: ${tarea.observaciones || ""}</p>
            </div>
        `;
        taskArea.innerHTML += task;
   }
    

    
}

async function loadReparation() {

    const data = await getTask()
    const {reparacion} = data
    document.getElementById("placa").textContent = reparacion.vehiculo.placa
    document.getElementById("vehiculo").textContent = `${reparacion.vehiculo.marca} ${reparacion.vehiculo.modelo}`
    document.getElementById("year").textContent = reparacion.vehiculo.year
    document.getElementById("reparacion-id").textContent = `#${reparacion.id}`
    document.getElementById("fecha-ingreso").textContent = reparacion.fecha_inicio    
    document.getElementById("fecha-estimada").textContent = reparacion.fecha_estimada

}


async function updateStatus() {

    const response = await getTask()
    const status = response.reparacion.status

    if(status === "pendiente"){
        document.getElementById("status").textContent = "Por Iniciar"
        document.getElementById("status-bar").style = "width:0%"
    }else if(status==="en progreso"){
        document.getElementById("status").textContent = "En progreso"
        document.getElementById("status-bar").style = "width:50%"
    }else if(status==="completado"){
         document.getElementById("status").textContent = "Trabajo Completado"
        document.getElementById("status-bar").style = "width:100%"
    }else{
        document.getElementById("status").textContent = "En pausa"
    }
  
    
    
}

//CONTROLLERS

async function getTask() {

    const [vehiculo] = await fetchObtenerVehiculoByPlaca()
    const reparaciones = await fetchObtenerReparaciones()
    const [reparacion] = reparaciones.filter(reparacion => reparacion.vehiculo.id === vehiculo.id 
        && reparacion.status !== "finalizado")
    
    if(reparacion){
        return {reparacion}
    }else{
        return null
    }

    
   
}




//FETCHS
async function fetchObtenerReparaciones() {

    try{
        const response = await fetch("/reparaciones")
        if (!response.ok) {
            throw new Error("Error al obtener reparaciones del servidor");
            }
        return response.json();

    }catch{
        console.error("Error en fetchObtenerReparaciones:", error);
    }
    
}

async function fetchObtenerVehiculoByPlaca() {

    try{
        const response = await fetch(`/vehiculos/${placaVehiculo}`)
        if (!response.ok) {
            throw new Error("Error al obtener el vehiculo del servidor");
            }
        return response.json();

    }catch{
        console.error("Error en fetchObtenerReparaciones:", error);
    }
    
    
}

async function fetchMecanicoById(id) {
    try{

        const response = await fetch(`/mecanicos/mecanico/${id}`)
        const mecanico = await response.json()
        return mecanico

    }catch{
        alert("Error fetchs mecanicos")
    }



    
}




document.addEventListener('DOMContentLoaded', () => {
    loadTask()
    loadReparation()
    updateStatus()
    
    
});