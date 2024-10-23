let divTabla = document.getElementById("divTabla")


let editeForm = document.getElementById("editarForm")

let formularioCLiente = document.querySelector('.formClient')





function desplegarForm(){

    if (formularioCLiente.classList.contains("oculto")){
        formularioCLiente.classList.remove('oculto')
        
    } else {
        formularioCLiente.classList.add('oculto')
    }

}

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

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    let name = document.getElementById("nombre").value;

    clients.push(name)

    divTabla.innerHTML = ''

    let content = ''

    content += `
        <table id="tabla">
            <tr>
                <th>Id</th>
                <th>Nombre</th>
            </tr>
        </table>
    `; 

    divTabla.innerHTML += content

    clients.forEach(createClient)

    desplegarForm()

    console.log(clients)

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

    console.log(clients)

    divTabla.innerHTML = ''

    let content = ''

    content += `
        <table id="tabla">
            <tr>
                <th>Id</th>
                <th>Nombre</th>
            </tr>
        </table>
    `; 

    divTabla.innerHTML += content

    clients.forEach(createClient)
    

}




