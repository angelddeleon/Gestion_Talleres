// Fetch Active Repairs
let id_mecanico = localStorage.getItem('id')
//Eventos

document.getElementById('activeRepairs').addEventListener("click", (e)=>{

    if(e.target.classList.contains("button-update")){
        const repairId = e.target.previousElementSibling.children[0].querySelector("span").textContent
        openRepairModal(repairId)

        document.getElementById("update-form").addEventListener("submit", async (e)=>{
            e.preventDefault()
        
            const estatus = document.getElementById("estatus-modal").value
            const observaciones = document.getElementById("detalles-modal").value
            
            // const partes = document.getElementById("partes-modal").value
        
            const update = {estatus, observaciones}
        
            const response = await actualizarTarea(update, repairId)
        
        
        })
        
    }else if(e.target.classList.contains("button-start")){
        const repairId = e.target.previousElementSibling.children[0].querySelector("span").textContent
        openRepairModalStart(repairId)

    }


})

document.getElementById("button-cancel").addEventListener("click", ()=>{
    document.getElementById('repairModal').classList.add('hidden');

})


//UI

let contenedorPonerNombre = document.getElementById("nombre");

let nombre = localStorage.getItem('nombre');

console.log(nombre)

// Asignar el contenido a innerHTML correctamente
contenedorPonerNombre.innerHTML = `Bienvenido de nuevo ${nombre}`;


async function loadTasks() {
        const response = await fetchReparaciones(id_mecanico)
   
        const activeRepairsContainer = document.getElementById('activeRepairs');
        activeRepairsContainer.innerHTML = '';  // Clear current list
        
        const repairsActive = response.filter(reapair => reapair.status !== "completado")

        repairsActive.forEach(repair => {
            const repairElement = document.createElement('div');
            repairElement.classList.add('border', 'rounded-lg', 'p-4', 'hover:bg-gray-50', 'transition');
            repairElement.innerHTML = `
                 <div class="border rounded-lg p-4 hover:bg-gray-50 transition">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="text-lg font-bold">#<span>${repair.tarea_id}</span></p>
                                <h3 class="font-medium text-gray-800">${repair.marca} ${repair.modelo} ${repair.year}</h3>
                                <p class="text-sm text-gray-600">Categoria: ${repair.categoria}</p>
                                <p class="text-sm text-gray-600">Servicio: ${repair.tarea_realizada}</p>
                                <div class="mt-2">
                                    <span class="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">${repair.status}</span>
                                </div>
                            </div>
                            ${repair.status === "pendiente" ? ` <button class="button-start px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition">Comenzar</button>` : ` <button class="button-update px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Actualizar</button>`}
                        </div>
                    </div>
            `;
            activeRepairsContainer.appendChild(repairElement);
        });

}

async function openRepairModalStart(repairId){
    const response = await fetchReparaciones(id_mecanico)
    const repair = response.find(reapair => reapair.tarea_id == repairId)

    const modalContent = document.getElementById("modalContentStart");
            modalContent.innerHTML = `
                <div class="space-y-3">
                    <div class="border-b pb-3">
                        <p class="text-sm font-semibold text-gray-600">Vehiculo</p>
                        <p class="text-gray-800">${repair.marca} ${repair.modelo} ${repair.year}</p>
                    </div>
                    <div class="border-b pb-3">
                        <p class="text-sm font-semibold text-gray-600">Categoria</p>
                        <p class="text-gray-800">${repair.categoria}</p>
                    </div>
                    <div class="border-b pb-3">
                        <p class="text-sm font-semibold text-gray-600">Servicio</p>
                        <p class="text-gray-800">${repair.tarea_realizada}</p>
                    </div>
                    <div class="border-b pb-3">
                        <p class="text-sm font-semibold text-gray-600">Status</p>
                        <p class="text-gray-800">${repair.status}</p>
                    </div>
                    <button onclick="startRepair(${repair.tarea_id})" class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Confirmar Inicio de Reparacion</button>
                </div>
            `;

            document.getElementById("repairModalStart").classList.remove("hidden");

}

 function closeRepairModalStart() {
        document.getElementById('repairModalStart').classList.add('hidden');
    }

async function openRepairModal(repairId) {
    const response = await fetchReparaciones(id_mecanico)
    const  [reparacion]  = response.filter(r => r.tarea_id == repairId)
    console.log(reparacion)
    document.getElementById("estatus-modal").value = reparacion.status
    document.getElementById('detalles-modal').value = reparacion.observaciones
    document.getElementById('repairModal').classList.remove('hidden');

   
    
    
}

async function loadHistorial() {
 
        const response = await fetchReparaciones(id_mecanico)
        const reparaciones = response.filter(response => response.status === "completado")
        console.log(reparaciones)
        const historyRepairsContainer = document.getElementById('historyRepairs');
        historyRepairsContainer.innerHTML = `<h2 class="text-xl font-semibold text-gray-800 mb-4">Historial De Reparaciones</h2>`;  // Clear current list

        reparaciones.forEach(repair => {
            const historyElement = document.createElement('div');
            historyElement.classList.add('border', 'rounded-lg', 'p-4');
            historyElement.innerHTML = `
                <h3 class="font-medium text-gray-800">${repair.marca} ${repair.modelo} ${repair.year}</h3>
                <p class="text-sm text-gray-600">Servicio: ${repair.tarea_realizada}</p>
                <p class="text-sm text-gray-600">Observaciones: ${repair.observaciones}</p>
                <div class="mt-2">
                    <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">${repair.status}</span>
                </div>
                <p class="text-sm text-gray-600 mt-2">Iniciado en: ${repair.fecha_inicio || ""}</p>
                <p class="text-sm text-gray-600 mt-2">Finalizado en: ${repair.fecha_finalizacion || ""}</p>
            `;
            historyRepairsContainer.appendChild(historyElement);
        });
    
}






//Controllers

async function startRepair(tarea_id){
    
    const response = await fetchIniciarTarea(tarea_id)

    if (response.ok){
        alert("Tarea Iniciada")
        location.reload()
    }else{
        alert("Error al iniciar tarea")
    }

}

async function actualizarTarea(update,repairId) {
    const {estatus, observaciones} = update
        
    if(estatus === "en pausa"){
        await fetchPausarTarea(repairId, observaciones)
    }else if(estatus === "en progreso"){
        await fetchReaunudar(repairId, observaciones)
    }else{
        await fetchCompletarTarea(repairId, observaciones)
   }
location.reload()
   
  
    


    
}

async function trackStatus(){
    const reparaciones = await fetchObtenerReparaciones()

  
    for (const reparacion of reparaciones) {
        
        const status = reparacion.tareas.map(tarea => tarea.status)
        const validateCompletado =  status.every(state => state === "completado")
        const validatePausa =  status.every(state => state === "en pausa")
        const validatePendiente = status.every(state => state === "pendiente")

        if(validateCompletado){
            await switchState(reparacion.id, {status:"completado"})
            return

        }else if(validatePausa){
            await switchState(reparacion.id, {status:"en pausa"})
            return
        }else if(validatePendiente){
            await switchState(reparacion.id, {status:"pendiente"})
            return
        }else{
            await switchState(reparacion.id, {status:"en progreso"})
        }
    }

    
}



//Fetchs

async function fetchReparaciones(id) {

    try{
        const response = await fetch(`/reparaciones/${id}`);
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return await response.json()

    }catch{
        console.error('Error fetching reparaciones');
    } 
}

async function fetchIniciarTarea(tarea_id) {

    try{
        const response = await fetch(`/reparaciones/iniciar-tarea/${tarea_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({status:"en progreso",fecha_inicio:new Date()})
                });
            return response

    }catch{
        console.error('Error fetching iniciar tarea');
    }
    
}

async function fetchCompletarTarea(tarea_id, observaciones) {

    try{
        const response = await fetch(`/reparaciones/finalizar-tarea/${tarea_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({status:"completado", observaciones, fecha_finalizacion:new Date()})
                });
                return response

    }catch{
        console.error('Error fetching iniciar tarea');
    }
    
}

async function fetchPausarTarea(tarea_id, observaciones) {

    try{
        const response = await fetch(`/reparaciones/pausar-reanuadar-tarea/${tarea_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({status:"en pausa", observaciones})
                });
            return response

    }catch{
        console.error('Error fetching iniciar tarea');
    }
    
}

async function fetchReaunudar(tarea_id, observaciones) {
    
    try{
        const response = await fetch(`/reparaciones/pausar-reanuadar-tarea/${tarea_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({status:"en progreso",observaciones})
                });
            return response

    }catch{
        console.error('Error fetching iniciar tarea');
    }
    
    
}
async function fetchObtenerReparaciones(reparacion) {
  
    try {
        const response = await fetch("/reparaciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reparacion),
        });
        if (!response.ok) {
            throw new Error("Error al enviar reparación al servidor");
        }
        return response;
    } catch (error) {
        console.error("Error en fetchReparaciones:", error);
        throw error;
    }
}











document.addEventListener('DOMContentLoaded', () => {
   loadTasks()
   loadHistorial()
   trackStatus()
});
