// Fetch Active Repairs
async function fetchActiveRepairs() {
    console.log("Hola")
    try {
        const response = await fetch('/reparaciones/1');
        const repairs = await response.json();
        const activeRepairsContainer = document.getElementById('activeRepairs');
        activeRepairsContainer.innerHTML = '';  // Clear current list

        repairs.forEach(repair => {
            const repairElement = document.createElement('div');
            repairElement.classList.add('border', 'rounded-lg', 'p-4', 'hover:bg-gray-50', 'transition');
            repairElement.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-medium text-gray-800">${repair.marca} ${repair.modelo} ${repair.year}</h3>
                        <p class="text-sm text-gray-600">Client: ${repair.nombre}</p>
                        <p class="text-sm text-gray-600">Service: ${repair.tarea_realizada}</p>
                        <div class="mt-2">
                            <span class="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">${repair.status}</span>
                        </div>
                    </div>
                    <button onclick="openRepairModal(${repair.id})" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Actualizar</button>
                </div>
            `;
            activeRepairsContainer.appendChild(repairElement);
        });
    } catch (error) {
        console.error("Error fetching active repairs: ", error);
    }
}

// Fetch Repair History
// async function fetchRepairHistory() {
//     try {
//         const response = await fetch('/api/reparaciones/historial');
//         const repairs = await response.json();
//         const historyRepairsContainer = document.getElementById('historyRepairs');
//         historyRepairsContainer.innerHTML = '';  // Clear current list

//         repairs.forEach(repair => {
//             const historyElement = document.createElement('div');
//             historyElement.classList.add('border', 'rounded-lg', 'p-4');
//             historyElement.innerHTML = `
//                 <h3 class="font-medium text-gray-800">${repair.vehicle}</h3>
//                 <p class="text-sm text-gray-600">Client: ${repair.client}</p>
//                 <p class="text-sm text-gray-600">Service: ${repair.service}</p>
//                 <div class="mt-2">
//                     <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">${repair.status}</span>
//                 </div>
//                 <p class="text-sm text-gray-600 mt-2">Completed on: ${repair.completedDate}</p>
//             `;
//             historyRepairsContainer.appendChild(historyElement);
//         });
//     } catch (error) {
//         console.error("Error fetching repair history: ", error);
//     }
// }

// Open Repair Modal
function openRepairModal(repairId) {
    document.getElementById('repairModal').classList.remove('hidden');
    // Fetch and populate repair details for editing
    // Fetch repair details using the repairId
}

// Close Repair Modal
function closeRepairModal() {
    document.getElementById('repairModal').classList.add('hidden');
}

// Save Repair Status
async function saveRepairStatus() {
    const status = document.getElementById('repairStatus').value;
    const notes = document.getElementById('repairNotes').value;
    const partsUsed = document.getElementById('repairParts').value;

    const repairId = 1; // Example, replace with dynamic repairId from the modal

    const response = await fetch('/api/reparaciones/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repairId, status, notes, partsUsed }),
    });

    if (response.ok) {
        alert('Repair status updated');
        closeRepairModal();
        fetchActiveRepairs(); // Refresh active repairs
    } else {
        alert('Error updating repair status');
    }
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    fetchActiveRepairs();
    fetchRepairHistory();
});