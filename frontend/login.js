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


signInButton.addEventListener("click", e => {
    e.preventDefault()

    let correo = document.getElementById("correoSignIn").value

    console.log(correo)

})
