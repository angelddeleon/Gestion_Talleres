// Fetch Active Repairs
let id_mecanico = 1

// // Fetch Repair History


// // async function fetchRepairHistory() {
// //     try {
// //         const response = await fetch('/api/reparaciones/historial');
// //         const repairs = await response.json();
// //         const historyRepairsContainer = document.getElementById('historyRepairs');
// //         historyRepairsContainer.innerHTML = '';  // Clear current list

// //         repairs.forEach(repair => {
// //             const historyElement = document.createElement('div');
// //             historyElement.classList.add('border', 'rounded-lg', 'p-4');
// //             historyElement.innerHTML = `
// //                 <h3 class="font-medium text-gray-800">${repair.vehicle}</h3>
// //                 <p class="text-sm text-gray-600">Client: ${repair.client}</p>
// //                 <p class="text-sm text-gray-600">Service: ${repair.service}</p>
// //                 <div class="mt-2">
// //                     <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">${repair.status}</span>
// //                 </div>
// //                 <p class="text-sm text-gray-600 mt-2">Completed on: ${repair.completedDate}</p>
// //             `;
// //             historyRepairsContainer.appendChild(historyElement);
// //         });
// //     } catch (error) {
// //         console.error("Error fetching repair history: ", error);
// //     }
// // }

// // Open Repair Modal


// // Close Repair Modal
// function closeRepairModal() {
//     document.getElementById('repairModal').classList.add('hidden');
// }

// // Save Repair Status
// async function saveRepairStatus() {
//     const status = document.getElementById('repairStatus').value;
//     const notes = document.getElementById('repairNotes').value;
//     const partsUsed = document.getElementById('repairParts').value;

//     const repairId = 1; // Example, replace with dynamic repairId from the modal

//     const response = await fetch('/api/reparaciones/update', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ repairId, status, notes, partsUsed }),
//     });

//     if (response.ok) {
//         alert('Repair status updated');
//         closeRepairModal();
//         fetchActiveRepairs(); // Refresh active repairs
//     } else {
//         alert('Error updating repair status');
//     }
// }

//Eventos

document.getElementById('activeRepairs').addEventListener("click", (e)=>{

    if(e.target.classList.contains("button-update")){
        const repairId = e.target.previousElementSibling.children[0].querySelector("span").textContent
        openRepairModal(repairId)
        
    }else if(e.target.classList.contains("button-start")){
        const repairId = e.target.previousElementSibling.children[0].querySelector("span").textContent
        openRepairModalStart(repairId)

    }


})


//UI

async function loadTasks() {
        const response = await fetchReparaciones(id_mecanico)
   
        const activeRepairsContainer = document.getElementById('activeRepairs');
        activeRepairsContainer.innerHTML = '';  // Clear current list
        
        const repairsActive = response.filter(reapair => reapair.status !== "completada")

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

    document.getElementById('repairModal').classList.remove('hidden');
    
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
                body: JSON.stringify({status:"en progreso"})
                });
            return response

    }catch{
        console.error('Error fetching iniciar tarea');
    }
    
}

async function fetchCompletarTarea(tarea_id) {

    try{
        const response = await fetch(`/reparaciones/iniciar-tarea/${tarea_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({status:"completada"})
                });
                return response

    }catch{
        console.error('Error fetching iniciar tarea');
    }
    
}

async function fetchPausarTarea(tarea_id) {

    try{
        const response = await fetch(`/reparaciones/iniciar-tarea/${tarea_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({status:"en pausa"})
                });
            return response

    }catch{
        console.error('Error fetching iniciar tarea');
    }
    
}










document.addEventListener('DOMContentLoaded', () => {
   loadTasks()
});
