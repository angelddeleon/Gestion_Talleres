let divTabla = document.getElementById("divTabla")


let editeForm = document.getElementById("editarForm")

let formularioCLiente = document.querySelector('.formCrearCliente')
let formularioEditar = document.querySelector('.formEditarCliente')

let menuAbierto = false
let indexMenu = 0


document.addEventListener('click', function(event) {
    const opcionesMenu = document.getElementsByClassName("opcionesMenu")[indexMenu];
    const botonMenu = document.getElementsByClassName("botonMenu")[indexMenu];

    // Verifica si el menú está abierto y si el clic no fue en el menú o el botón
    if (menuAbierto && !opcionesMenu.contains(event.target) && !botonMenu.contains(event.target)) {
        opcionesMenu.classList.add('oculto');
        botonMenu.classList.remove('oculto');
        menuAbierto = false; // Cambia el estado a cerrado
    }
});


function desplegarForm(nombreVentana){
    if(nombreVentana === 'crearCliente'){
        console.log('CREAR CLIENTE FUNCIONA')

        if (formularioCLiente.classList.contains("oculto")){
            formularioCLiente.classList.remove('oculto')
            
        } else {
            formularioCLiente.classList.add('oculto')
        }

        return

    }

    //Abrir el otro formulario

    if (formularioEditar.classList.contains("oculto")){
        formularioEditar.classList.remove('oculto')
        
    } else {
        formularioEditar.classList.add('oculto')
    }




}

// Crear Tabla 

function crearTabla() {
    divTabla.innerHTML = ''

    let content = ''

    content += `
        <table  id="tabla">
            <tr>
                <th>Id</th>
                <th>Nombre y Apellido</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Cedula</th>
                <th>Direccion</th>
                <th>Placa</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Mecanicos</th>
            </tr>
        </table>
    `; 

    divTabla.innerHTML += content
}

//Crear clientes 

// Almacena la lista de clientes

let clients = []



// Si no hay clientes registrados muestra en el html eso


    if (clients.length == 0){

        divTabla.innerHTML = ''
    
        let content = ''
    
        content += `
            <p class="centrado">No hay clientes todavia</p>
        `; 
    
        divTabla.innerHTML += content
    
    }

//Adding Clients to the Array

let botonCrearCLiente = document.getElementById("crearClienteButton")

botonCrearCLiente.addEventListener('click',(e) => {
    e.preventDefault()

    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value
    let telefono = document.getElementById("telefono").value
    let direccion = document.getElementById("direccion").value
    let correo = document.getElementById("correo").value;

    console.log(correo)

    let nameClient = document.getElementById("nombre").value;


    let transaccion = {nombre: nombre, cedula: cedula, telefono: telefono, direccion: direccion, correo: correo}
    let transaccionJson = JSON.stringify(transaccion)

    fetch('http://localhost:3000/clientes',{
        method: 'Post',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: transaccionJson
    })

    clients.push(nameClient)

    crearTabla()    

    clients.forEach(createClient)

    desplegarForm('crearCliente')

    console.log(clients)

})
    

function openMenu(index) {
    console.log("hola")
    console.log('Antes ' + indexMenu)
    
    let botonMenu = document.getElementsByClassName("botonMenu")[index]
    let opcionesMenu = document.getElementsByClassName("opcionesMenu")[index]

    indexMenu = index

    console.log('Despues ' + indexMenu)

    if (opcionesMenu.classList.contains("oculto")){
        console.log("FUNCIONO")
        botonMenu.classList.add('oculto')
        opcionesMenu.classList.remove('oculto')

        menuAbierto = true
        
    } else {
        console.log("FUNCIONO")
        opcionesMenu.classList.add('oculto')
        botonMenu.classList.remove('oculto')

        menuAbierto = false
    }

}


//Render the clients in the frontend

function createClient(name, index){
    let tabla = document.getElementById("tabla")


        let content = ''

        content += `
                <tr>
                    <td>${index}</td>
                    <td>${name}</td>
                    <td>${name}</td>
                    <td>${name}</td>
                    <td>${name}</td>
                    <td>${name}</td>
                    <td>${name}</td>

                    <td><button class="delete" onclick="deleteClient(${index})">Delete</button></td>
                    <td><button class="edite" onclick="EditeClient(${index})">Edite</button></td>

                    <td class="casillaBoton">
                    <button class="botonMenu" onclick="openMenu(${index})">...</button>

                    <div class="opcionesMenu oculto">
                        <button class="deleteMenu" onclick="deleteClient(${index})">Delete</button>
                        <button class="editeMenu" onclick="EditeClient(${index})">Edite</button>
                    </div>

                    </td>

                                
                </tr>
        
    `; 
    
        tabla.innerHTML += content
        
    
}


//Toma que Cliente se quiere Editar y despliega el formulario

function EditeClient(indexCLient) {
    desplegarForm()
    
    console.log(indexCLient);

    document.getElementById("nuevoNombre").dataset.index = indexCLient;

}

//Edita el cliente y esconde el formulario

function editarCliente() {

    let nuevoNombre = document.getElementById("nuevoNombre").value;
    let indexCLient = document.getElementById("nuevoNombre").dataset.index;

    console.log(nuevoNombre);
    console.log(indexCLient)

    clients[indexCLient] = nuevoNombre;

    console.log(clients);

    crearTabla()    

    clients.forEach(createClient)

    console.log("Despues de enviar los datos");

    console.log(nuevoNombre);
    console.log(clients);

    desplegarForm()
    
}


/*It can be used a arrayFilter */

function deleteClient(indexCLient) {

    let newClient = []
    
    for (let index = 0; index < clients.length; index++) {
        if (indexCLient !== index){
            newClient.push(clients[index])
        }
    }

    clients = newClient

    console.log(`Tamano del array: ${clients.length}`)

    if (clients.length === 0) {

        divTabla.innerHTML = ''

        let content = ''
    
        content += `
            <p class="centrado">No hay clientes todavia</p>
        `; 
    
        divTabla.innerHTML += content

        return console.log('no hay clientes')
        
    }


    console.log(clients)

    crearTabla()

    clients.forEach(createClient)
    

}




