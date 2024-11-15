let divTabla = document.getElementById("divTabla")


let editeForm = document.getElementById("editarForm")

let formularioCrearMecanico = document.querySelector('.formCrearMecanico')
let formularioEditar = document.querySelector('.formEditarMecanico')


function desplegarForm(nombreVentana){
    if(nombreVentana === 'crearMecanico'){

        if (formularioCrearMecanico.classList.contains("oculto")){
            formularioCrearMecanico.classList.remove('oculto')
            
        } else {
            formularioCrearMecanico.classList.add('oculto')
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
            </tr>
        </table>
    `; 

    divTabla.innerHTML += content
}

//Crear mecanicos

// Almacena la lista de clientes

let mecanicos = []



// Si no hay clientes registrados muestra en el html eso


    if (mecanicos.length == 0){

        divTabla.innerHTML = ''
    
        let content = ''
    
        content += `
            <p class="centrado">No hay mecanicos todavia</p>

        `; 
    
        divTabla.innerHTML += content

    }

//Adding Clients to the Array

function crearMecanico() {

    let name = document.getElementById("nombre").value;

    let nameCliente = document.getElementById("nombre").value;
    let transaccion = {name: nameCliente}
    let transaccionJson = JSON.stringify(transaccion)

    fetch('http://localhost:3000/clientes',{
        method: 'Post',
        body: transaccionJson
    })

    mecanicos.push(name)

    crearTabla()    

    mecanicos.forEach(createClient)

    desplegarForm('crearMecanico')

    console.log(mecanicos)
    
}


//Render the clients in the frontend

function createClient(name, index){
    let tabla = document.getElementById("tabla")


        let content = ''

        content += `
                <tr>
                    <td>${index}</td>
                    <td>${name}</td>
                    <td><button class="delete" onclick="deleteMecanico(${index})">Delete</button></td>
                    <td><button class="edite" onclick="EditeMecanico(${index})">Edite</button></td>
                                
                </tr>
        
    `; 
    
        tabla.innerHTML += content
        
    
}


//Toma que Cliente se quiere Editar y despliega el formulario

function EditeMecanico(indexCLient) {
    desplegarForm()
    
    console.log(indexCLient);

    document.getElementById("nuevoNombre").dataset.index = indexCLient;

}

//Edita el cliente y esconde el formulario

function editarMecanico() {

    let nuevoNombre = document.getElementById("nuevoNombre").value;
    let indexCLient = document.getElementById("nuevoNombre").dataset.index;

    console.log(nuevoNombre);
    console.log(indexCLient)

    mecanicos[indexCLient] = nuevoNombre;

    console.log(mecanicos);

    crearTabla()    

    mecanicos.forEach(createClient)

    console.log("Despues de enviar los datos");

    console.log(nuevoNombre);
    console.log(mecanicos);

    desplegarForm()
    
}


/*It can be used a arrayFilter */

function deleteMecanico(indexMecanico) {

    let newMecanico = []
    
    for (let index = 0; index < mecanicos.length; index++) {
        if (indexMecanico !== index){
            newMecanico.push(mecanicos[index])
        }
    }

    mecanicos = newMecanico



    if (mecanicos.length === 0) {

        divTabla.innerHTML = ''

        let content = ''
    
        content += `
            <p class="centrado">No hay mecanicos todavia</p>
        `; 
    
        divTabla.innerHTML += content

        return console.log('No hay mecanicos')
        
    }


    console.log(mecanicos)

    crearTabla()

    mecanicos.forEach(createClient)   

}