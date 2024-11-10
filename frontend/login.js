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
    const respuesta = await fetch('http://localhost:3000/signIn')

    console.log(respuesta)

    const datos = await respuesta.json(); // Asumiendo que la respuesta es JSON
    console.log(datos);

}


signInButton.addEventListener("click", e => {
    e.preventDefault()

    let correo = document.getElementById("correoSignIn").value
    let contrasena = document.getElementById("passwordSignIn").value

    let transaccion = {correo: correo, contrasena: contrasena}
    let transaccionJson = JSON.stringify(transaccion)

    console.log(transaccion)
    console.log(transaccionJson)

    fetch('http://localhost:3000/signIn', {
        method: 'POST',
        body: transaccion
    })



    pedirDatos()

    console.log(correo)
    console.log(contrasena)

})
