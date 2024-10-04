let tabla = document.getElementById("tabla")

let editeForm = document.getElementById("editarForm")


let clients = []


//Adding Clients to the Array
document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    let name = document.getElementById("nombre").value;

    clients.push(name)

    tabla.innerHTML = ''

    clients.forEach(createClient)


    console.log(clients)

})


//Render the clients in the frontend

function createClient(name, index){

    let content = ''

    content += `<div id="${index}" class="clientCard">
            <p>Numero: ${index}</p>
            <p>Cliente: ${name}</p>

            <button class="delete" onclick="deleteClient(${index})">Delete</button>
            <button class="edite" onclick="EditeClient(${index})">Edite</button>


        </div>`; 

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

    tabla.innerHTML = '';

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

    tabla.innerHTML = ''

    clients.forEach(createClient)
    

}




