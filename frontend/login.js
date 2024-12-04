

async function fetchMecanicoById(cedula) {
    try {
        const response = await fetch(`/mecanicos/${cedula}`);
        const mecanico = await response.json();
        return mecanico;
    } catch (error) {
        alert("Error al buscar mecánico");
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

    let cedula = document.getElementById("cedula").value.trim(); // Usar trim para eliminar espacios


    //Cedula del Administrador
    if(String(cedula) === '30303030'){
        window.location.href = './modules/vistaAdministrador/index.html';
        return
    }

    console.log(cedula);

    try {
        // Esperar a que las funciones asíncronas se resuelvan
        let mecanico = await fetchMecanicoById(cedula);

    

        // Verificar que el mecánico existe
        if (mecanico && mecanico.cedula) {
            console.log(mecanico.nombre);


            // Comparar la cédula ingresada con la cédula del mecánico
            if (String(cedula) === String(mecanico.cedula)) {
                localStorage.setItem('id', mecanico.id);
                localStorage.setItem('nombre', mecanico.nombre);


                console.log('hola soy trabajador');
                // Redirigir a otra página si es necesario
                window.location.href = './modules/vistaMecanico/mecanico.html';
            } else {
                alert('No existe el mecánico con los datos proporcionados.');
            }
        } else {
            alert('No existe el mecánico con los datos proporcionados.');
        }

    } catch (error) {
        console.error("Error al buscar mecánico:", error);
        alert("Ocurrió un error al buscar la información. Por favor, inténtalo de nuevo.");
    }
}

document.getElementById("signInButton").addEventListener("click", validar);