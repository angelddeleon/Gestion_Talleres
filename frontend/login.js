// Formularios


let formSigIn = document.getElementById("formSigIn")
let formLogIn = document.getElementById("formLogIn")


// Contenedores

let contenedorSignIn = document.getElementById("divSignin")
let contenedorLogIn = document.getElementById("divLogin")

let signInButton = document.getElementById("signInButton")


function desplegarContenedor() {

    console.log("hola")

    if (contenedorLogIn.classList.contains("oculto")){
        contenedorLogIn.classList.remove('oculto')
        contenedorSignIn.classList.add('oculto')

        
    } else {
        contenedorSignIn.classList.remove('oculto')
        contenedorLogIn.classList.add('oculto')
    }

}

async function pedirDatos() {
    const respuesta = await fetch('http://localhost:3000/signin')

    console.log(respuesta)

    const datos = await respuesta.json(); // Asumiendo que la respuesta es JSON
    console.log(datos);

}


signInButton.addEventListener("click", e => {
    e.preventDefault()

    let correo = document.getElementById("correoSignIn").value
    let contrasena = document.getElementById("passwordSignIn").value
    let role = document.getElementById("listaRoles").value

    let transaccion = {email: correo, password: contrasena, role: role}
    let transaccionJson = JSON.stringify(transaccion)

    console.log(transaccion)
    console.log(transaccionJson)


    fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Asegúrate de incluir este encabezado
        },
        body: transaccionJson
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Maneja la respuesta aquí
        desplegarContenedor()
    })
    .catch(error => {
        console.error('Error:', error);
    });



    pedirDatos()

    console.log(correo)
    console.log(contrasena)

    

})
