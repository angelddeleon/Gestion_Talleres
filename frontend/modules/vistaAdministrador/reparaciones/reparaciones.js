//Elementos

const mechanics = [document.getElementById("mechanic-1"),document.getElementById("mechanic-2"),
    document.getElementById("mechanic-3"),document.getElementById("mechanic-4") ]
const searchVehicleBtn = document.getElementById("searchVehicle")
const vehicleInfoContainer = document.getElementById("vehicleInfoContainer")
const taskForm = document.getElementById("taskForm")





//Eventos

searchVehicleBtn.addEventListener("click", async  ()=>{

    const placa = document.getElementById("license-plate").value
    
    const response = searchVehicle(placa)
})

taskForm.addEventListener("submit", async function(e){
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
   
    try {
        const response = await createReparacion(reparacion);
        if (response) {
            clearForm();
            alert("Reparación asignada correctamente");
        }
    } catch (error) {
        console.error("Error al crear reparación:", error);
        alert("Ocurrió un error al asignar la reparación.");
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

function clearForm(){
    document.getElementById("taskForm").reset();
    location.reload()
    

}

async function updateTable() {
    const reparaciones = await fetchObtenerReparaciones();
    const tableBody = document.getElementById("table-reparaciones");

    for (const entry of reparaciones) {
        const row = document.createElement("tr");

        // ID
        row.innerHTML += `<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${entry.id}</td>`;

        // Vehículo
        row.innerHTML += `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${entry.vehiculo.placa}</td>`;

        // Mecánicos (esperar las promesas)
        const mechanicsHTML = await Promise.all(
            entry.tareas.map(async tarea => {
                const mecanico = await fetchMecanicoById2(tarea.id_mecanico); // Ajusta el campo según tu API
                return `<span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">${mecanico.nombre}</span>`;
            })
        ).then(results => results.join(" "));

        row.innerHTML += `<td class="px-6 py-4 text-sm text-gray-500"><div class="flex flex-wrap gap-2">${mechanicsHTML}</div></td>`;

        // Categorías
        const categoriasHTML = entry.tareas
            .map(tarea => `<span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">${tarea.categoria}</span>`)
            .join(" ");
        row.innerHTML += `<td class="px-6 py-4 text-sm text-gray-500"><div class="flex flex-wrap gap-2">${categoriasHTML}</div></td>`;

        // Tareas
        const tareasHTML = entry.tareas
            .map(tarea => `<li>${tarea.tarea_realizada}</li>`)
            .join("");
        row.innerHTML += `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <details class="cursor-pointer">
                    <summary class="font-medium text-blue-600">Ver Tareas (${entry.tareas.length})</summary>
                    <ul class="mt-2 pl-4 list-disc">${tareasHTML}</ul>
                </details>
            </td>
        `;

        // Descripción
        row.innerHTML += `<td class="px-6 py-4 text-sm text-gray-500"><div class="flex flex-wrap gap-2">${entry.descripcion}</div></td>`;

        // Fecha de inicio
        row.innerHTML += `<td class="px-6 py-4 text-sm text-gray-500"><div class="flex flex-wrap gap-2">${entry.fecha_inicio}</div></td>`;

        // Estado
        row.innerHTML += `<td class="px-6 py-4 text-sm text-gray-500"><div class="flex flex-wrap gap-2">${entry.status}</div></td>`;

        // Añade la fila al cuerpo de la tabla
        tableBody.appendChild(row);
    }
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
async function createReparacion(reparacion) {
    try {
        const { placaVehiculo } = reparacion;
        console.log(placaVehiculo);

        // Obtener el vehículo por placa
        const [vehiculo] = await fetchVehiculoById(placaVehiculo);
        if (!vehiculo) {
            throw new Error("Vehículo no encontrado");
        }
        reparacion.id_vehiculo = vehiculo.id;

      
        const response = await fetchReparaciones(reparacion);
        const response_id = await response.json();
        const reparacion_id = response_id.id;

        if (!response.ok) {
            throw new Error("Error al crear la reparación en el servidor");
        }

        
        let responseEstatus = true;
        for (const tarea of reparacion.tareas) {
            const [categoria, tareaInfo] = Object.entries(tarea)[0]; // Ejemplo: "electrica", ["detalle", "id_mecanico"]
            const [tareaEspecificacion, cedulaMecanico] = tareaInfo;

            if (tareaEspecificacion && cedulaMecanico) {
                const mecanico = await fetchMecanicoById(cedulaMecanico);
                const mecanico_id = await mecanico.id;
                const nuevaTarea = {
                    categoria,
                    mecanico_id,
                    tarea_realizada: tareaEspecificacion,
                    reparacion_id,
                }
                console.log(nuevaTarea)
            

                // Crear la tarea
                const tareaResponse = await fetchCreateTarea(nuevaTarea);
                if (!tareaResponse.ok) {
                    responseEstatus = false;
                    console.error(`Error al crear tarea: ${JSON.stringify(nuevaTarea)}`);
                } else {
                    console.log(`Tarea creada: ${JSON.stringify(nuevaTarea)}`);
                }
            }
        }

        if (responseEstatus) {
            return true;
        } else {
            throw new Error("Error al crear una o más tareas en el servidor");
        }
    } catch (error) {
        console.error("Error en createReparacion:", error);
        throw error;
    }
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

async function fetchVehiculoById(placa) {
    try {
        const response = await fetch(`/vehiculos/${placa}`);
        if (!response.ok) {
            throw new Error("Error al obtener vehículo");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en fetchVehiculoById:", error);
        throw error;
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

async function fetchMecanicoById2(id) {
    try{

        const response = await fetch(`/mecanicos/mecanico/${id}`)
        const mecanico = await response.json()
        return mecanico

    }catch{
        alert("Error fetchs mecanicos")
    }



    
}


async function fetchReparaciones(reparacion) {
  
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

async function fetchCreateTarea(tarea) {
    try {
        const response = await fetch("/reparaciones/tarea", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tarea),
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

async function fetchObtenerReparaciones(params) {

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

       

document.addEventListener('DOMContentLoaded', () => {
    loadMecanicos()
    updateTable()
    
});