async function fetchClienteId(cedula) {
    try {
        const response = await fetch(`/clientes/${cedula}`);
        const cliente = await response.json();
        return cliente;
    } catch (error) {
        alert("Error al buscar cliente");
        console.error(error); // Agregar un log del error para depuración
    }
}

async function fetchVehiculoPlaca(placa) {
    try {
        const response = await fetch(`/vehiculos/${placa}`);
        const vehiculo = await response.json();
        return vehiculo;
    } catch (error) {
        alert("Error al buscar vehículo");
        console.error(error); // Agregar un log del error para depuración
    }
}

// Formularios
let formSigIn = document.getElementById("formSigIn");

// Contenedores
let contenedorSignIn = document.getElementById("divSignin");
let signInButton = document.getElementById("signInButton");

console.log("hola");

async function validar() {
    console.log("hola");

    let cedula = document.getElementById("cedula").value;
    let placa = document.getElementById("placa").value;

    console.log(typeof cedula)
    console.log(typeof placa)

    

    try {
        // Esperar a que las funciones asíncronas se resuelvan
        let cliente = await fetchClienteId(cedula);
        let vehiculo = await fetchVehiculoPlaca(placa);

     


        // Aquí puedes agregar lógica adicional para manejar los datos obtenidos
        
        if (String(cedula) === String(cliente.cedula) && String(placa) === String(vehiculo[0].placa)) {
                window.location.href = '../vistaCliente/vistaCliente.html';
            } else {
                alert('No existe un cliente o vehículo con los datos proporcionados.');
            }
        
    
    } catch (error) {
        console.error("Error al buscar cliente o vehículo:", error);
        alert("Ocurrió un error al buscar la información. Por favor, inténtalo de nuevo.");
    }
}

document.getElementById("signInButton").addEventListener("click", validar);