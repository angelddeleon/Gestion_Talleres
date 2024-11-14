let divTabla = document.getElementById("divTabla")


let editeForm = document.getElementById("editarForm")

let formularioCLiente = document.querySelector('.contForm')


function desplegarForm(){

    if (formularioCLiente.classList.contains("oculto")){
        formularioCLiente.classList.remove('oculto')
        
    } else {
        formularioCLiente.classList.add('oculto')
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

function hayClientes() {
    if (clients.length == 0){

        divTabla.innerHTML = ''
    
        let content = ''
    
        content += `
            <p class="centrado">No hay clientes todavia</p>
        `; 
    
        divTabla.innerHTML += content

        return console.log('no hay clientes')
    
    }
}


hayClientes()

//Adding Clients to the Array

function crearCliente(params) {

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

    desplegarForm()

    console.log(clients)
    
}

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    


})


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


//Set the edite client form to visible

function EditeClient(indexCLient) {
    
    console.log(indexCLient);
    editeForm.style.visibility = "visible";

    document.getElementById("nuevoNombre").dataset.index = indexCLient;
}

//Edites Client and hidden again the form

document.getElementById("cambiarNombre").addEventListener("submit", (e) => {
    e.preventDefault();

    let nuevoNombre = document.getElementById("nuevoNombre").value;
    let indexCLient = document.getElementById("nuevoNombre").dataset.index;

    console.log(nuevoNombre);

    clients[indexCLient] = nuevoNombre;

    console.log(clients);

    divTabla.innerHTML = '';

    clients.forEach(createClient);

    console.log("Despues de enviar los datos");

    console.log(nuevoNombre);
    console.log(clients);

    editeForm.style.visibility = "hidden";
});

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




