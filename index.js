let tabla = document.getElementsByClassName(".tabla");




function enviar() {
    
    let x = document.forms["form"]["Nombre"].value;

    alert(x)

    let nombreElement = document.createElement("p")
    let nombreNode = document.createTextNode(x)


    nombreElement.appendChild(nombreNode)

    tabla.appendChild(nombreElement)
}