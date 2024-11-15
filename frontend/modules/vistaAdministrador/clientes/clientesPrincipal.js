let divTabla = document.getElementById("divTabla")


let editeForm = document.getElementById("editarForm")

let formularioCLiente = document.querySelector('.formCrearCliente')
let formularioEditar = document.querySelector('.formEditarCliente')


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
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Descripcion</th>
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

function crearCliente() {

    let name = document.getElementById("nombre").value;

    let nameCliente = document.getElementById("nombre").value;
    let transaccion = {name: nameCliente}
    let transaccionJson = JSON.stringify(transaccion)

    fetch('http://localhost:3000/clientes',{
        method: 'Post',
        body: transaccionJson
    })

    clients.push(name)

    crearTabla()    

    clients.forEach(createClient)

    desplegarForm('crearCliente')

    console.log(clients)
    
}


//Render the clients in the frontend

function createClient(name, index){
    let tabla = document.getElementById("tabla")


        let content = ''

        content += `
                <tr>
                    <td>${index}</td>
                    <td>${name}</td>
                    <td><button class="delete" onclick="deleteClient(${index})">Delete</button></td>
                    <td><button class="edite" onclick="EditeClient(${index})">Edite</button></td>
                                
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




