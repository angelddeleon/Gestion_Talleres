const placaVehiculo = "XYZ456"



//Eventos

//UI

async function loadTask() {

    const taskArea = document.getElementById("tareas")
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

        const task = document.createElement('div');
        task.classList.add('border', 'rounded-lg', 'p-4');
        task.innerHTML = `
            <h3 class="font-medium text-gray-800">${tarea.tarea_realizada}</h3>
            <p class="text-sm text-gray-600">Mecanico Asignado ${mecanico.nombre}</p>
            <p class="text-sm text-gray-600">Observaciones: ${tarea.observaciones}</p>
            <div class="mt-2">
                <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">${tarea.status}</span>
            </div>
            <p class="text-sm text-gray-600 mt-2">Iniciado en: ${tarea.fecha_inicio || ""}</p>
            <p class="text-sm text-gray-600 mt-2">Finalizado en: ${tarea.fecha_finalizacion || ""}</p>
          
        `;
        taskArea.appendChild(task);
   }
    

    
}

async function loadReparation() {
    
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
    
    
});