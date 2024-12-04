


function filterByMechanic(mechanicName) {
    console.log(`Filtering repairs by mechanic: ${mechanicName}`);
}




//Eventos



//UI

function switchTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.add('hidden'));

    const selectedContent = document.getElementById(`${tabName}Reports`);
    selectedContent.classList.remove('hidden');

    const tabs = ['vehicle', 'mechanic', 'customer'];
    tabs.forEach(tab => {
        const tabElement = document.getElementById(`${tab}Tab`);
        if (tab === tabName) {
            tabElement.classList.add('border-blue-500', 'text-blue-600');
            tabElement.classList.remove('border-transparent', 'text-gray-500');
        } else {
            tabElement.classList.remove('border-blue-500', 'text-blue-600');
            tabElement.classList.add('border-transparent', 'text-gray-500');
        }
    });
}

function closeModal(){
    document.getElementById("vehicleModal").classList.add("hidden")
   
}

function closeModalMecanico(){
    document.getElementById("mecanicoModal").classList.add("hidden")
   
}


async function loadReparaciones(){

    const reparaciones = await getReparaciones()
    const tableBody = document.getElementById("tbody")
    

    for (const reparacion of reparaciones) {
        const tr = document.createElement("tr")
        tr.classList.add("hover:bg-gray-50")
        const placa = reparacion.vehiculo.placa
        const id_reparacion = reparacion.id
        const fecha = reparacion.fecha_inicio
        const descripcion = reparacion.descripcion
        const status = reparacion.status
        let mecanicos = new Set()

        for (const tarea of reparacion.tareas) {
    
            const mecanico = await fetchMecanicoById(tarea.id_mecanico)
            mecanicos.add(mecanico.nombre)
        }
        mecanicos = Array.from(mecanicos).join("<br>")
        tr.innerHTML = `
<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
<a href="#" onclick="modalVehiculoControl('${id_reparacion}')" class="text-blue-600 hover:text-blue-800 
hover:underline cursor-pointer">${placa}</a>
</td>
<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fecha}</td>
<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${descripcion}</td>
<td class="text-blue-600 font-medium px-6 py-4 whitespace-nowrap text-sm">${mecanicos}</td>
<td class="px-6 py-4 whitespace-nowrap">
    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 
    text-green-800">${status}</span>
</td>`

tableBody.appendChild(tr)


    }
}


async function loadClientes() {
    const clientes = await getClientes()
    const tableBody = document.getElementById("tbody-clientes")
    tableBody.innerHTML = ""


    for (const cliente of clientes) {
        const tr = document.createElement("tr")
        tr.classList.add("hover:bg-gray-50")
        const vehiculos = cliente.vehiculos.map(vehiculo => `${vehiculo.marca} ${vehiculo.modelo}`).join("<br>")

        tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${cliente.nombre}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cliente.cedula}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cliente.telefono}<br> ${cliente.correo}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${vehiculos}</td>
        <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${cliente.activo ? "Si": "No" }</span>                            
        </td>
        `
        tableBody.appendChild(tr)
    }


    
}

async function loadMecanicos() {

    const mecanicos = await getMecanicos()
    
    const tableBody = document.getElementById("tablebody-mecanicos")
    tableBody.innerHTML = ""

    for(const mecanico of mecanicos){
        const tareas = await getTareasByMecanico(mecanico.id)
        const tr = document.createElement("tr")
        tr.classList.add("hover:bg-gray-50")
        const especialidades = mecanico.especialidades.map(especialidad => especialidad.nombre).join("<br>")
        const numeroReparaciones = tareas.length

        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" onclick=modalMecanicoControl('${mecanico.id}')
                class="text-blue-600 hover:text-blue-800 
                hover:underline cursor-pointer">${mecanico.nombre}</a>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${especialidades}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                 bg-green-100 text-green-800">${mecanico.interno? "SI":"NO"}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${numeroReparaciones}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                 bg-green-100 text-green-800">${mecanico.activo? "SI":"NO"}</span>
            </td>`
        
        tableBody.appendChild(tr)
            
    }



    
}


//CONTROLLERS


async function modalVehiculoControl(id_reparacion) {
    document.getElementById("vehicleModal").classList.remove("hidden")
    const reparaciones = await getReparaciones()
    const reparacionVehiculo = reparaciones.find(reparacion => reparacion.id == id_reparacion)
    const cliente = await getClienteById(reparacionVehiculo.vehiculo.id_cliente)

    document.getElementById("vehiculo-id").textContent = `#${reparacionVehiculo.vehiculo.id}`
    document.getElementById("vehiculo-modelo").textContent = `${reparacionVehiculo.vehiculo.marca} ${reparacionVehiculo.vehiculo.modelo}`
    document.getElementById("vehiculo-year").textContent = reparacionVehiculo.vehiculo.year
    document.getElementById("vehiculo-placa").textContent = reparacionVehiculo.vehiculo.placa
    document.getElementById("nombre").textContent = cliente.nombre
    document.getElementById("cedula").textContent = cliente.cedula
    document.getElementById("telefono").textContent = cliente.telefono

    const containerHistorial = document.getElementById("container-historial")
    containerHistorial.innerHTML = ""

    for (const tarea of reparacionVehiculo.tareas) {
        const mecanico = await fetchMecanicoById(tarea.id_mecanico)
        const div = document.createElement("div")
        div.classList.add("bg-gray-50", "p-3", "rounded")
        div.innerHTML = `
        <p class="text-sm"><span class="font-medium">Fecha</span> ${tarea.fecha_inicio}</p>
        <p class="text-sm"><span class="font-medium">Tarea:</span> ${tarea.tarea_realizada}</p>
        <p class="text-sm"><span class="font-medium">Mecanico:</span> ${mecanico.nombre}</p>
        <p class="text-sm"><span class="font-medium">Detalles:</span> ${tarea.observaciones}</p> 
        `
        containerHistorial.appendChild(div)
    }

    
    
}


async function modalMecanicoControl(id_mecanico) {
    const mecanico = await fetchMecanicoById(id_mecanico)
    document.getElementById("mecanicoModal").classList.remove("hidden")
    const tableBody = document.getElementById("container-historial-mecanico")
    tableBody.innerHTML = ""
    const tareas = await getTareasByMecanico(id_mecanico)
    const especialidades = mecanico.especialidades.map(especialidad => especialidad.nombre).join(" ")

    document.getElementById("mecanico-id").textContent = `#${mecanico.id}`
    document.getElementById("mecanico-nombre").textContent = mecanico.nombre
    document.getElementById("mecanico-especialidades").textContent = especialidades

    

    tareas.forEach(tarea =>{
        console.log(tarea)
        const div = document.createElement("div")
        div.classList.add("bg-gray-50", "p-3", "rounded")
        div.innerHTML = `
            <p class="text-sm"><span class="font-medium">Reparacion ID: ${tarea.id_reparacion}</p>
            <p class="text-sm"><span class="font-medium">Tarea ID: ${tarea.tarea_id}</p>
            <p class="text-sm"><span class="font-medium">Vehiculo: ${tarea.marca} ${tarea.modelo} ${tarea.year}</p>
            <p class="text-sm"><span class="font-medium">Placa Vehiculo: ${tarea.placa}</p>
            <p class="text-sm"><span class="font-medium">Tarea Realizada: ${tarea.tarea_realizada}</p>
            <p class="text-sm"><span class="font-medium">Observaciones: ${tarea.observaciones}</p>
            <p class="text-sm"><span class="font-medium">Fecha: ${tarea.fecha_inicio}</p>
           

        `
        tableBody.appendChild(div)
    })


    
}




//FETCHS

async function getReparaciones() {

    try{
        const response = await fetch(`/reparaciones`)

        if(!response.ok){
            throw new Error(response.statusText)
        }
        return await response.json()

    }catch{
        console.log("Error al obtener las reparaciones")
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

async function getClienteById(id) {

    try{

        const response = await fetch(`/clientes/cliente/${id}`)
        const cliente = await response.json()
        return cliente

    }catch{
        alert("Error fetchs mecanicos")
    }



    
}

async function getClientes() {

    try{

        const response = await fetch(`/clientes`)
        const cliente = await response.json()
        return cliente

    }catch{
        alert("Error fetchs mecanicos")
    }



    
}


async function getMecanicos() {

    try{
        const response = await fetch(`/mecanicos`)
        const cliente = await response.json()
        return cliente

    }catch{
        alert("Error fetchs mecanicos")
    }

    
}

async function getTareasByMecanico(id_mecanico) {

    try{
        const response = await fetch(`/reparaciones/${id_mecanico}`)
        const tareas = await response.json()
        return tareas

    }catch{
        alert("Error fetchs mecanicos")
    }

    
                
    
}




document.addEventListener('DOMContentLoaded', () => {
    loadReparaciones()
    loadClientes()
    loadMecanicos()
 });
 