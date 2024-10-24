const express = require('express')
const path = require('path')


const app = express()

const absolutePath = path.resolve(__dirname, '../frontend/modules/vistaAdministrador/clientes/clientes.html');


// define port
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(absolutePath)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '../frontend/modules/vistaAdministrador/clientes/clientes.css');
    res.type('text/css');
  });


app.listen(port)

console.log("hola")