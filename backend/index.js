const express = require('express')
const path = require('path')



const app = express()
const port = process.env.PORT || 3000

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json({
  type: "*/*"
}))

let clientes = [{id: 0 ,name: 'Angel'} ]


app.get("/clientes", (req, res) =>{
  console.log(clientes)

  res.send(clientes)
})


app.post("/clientes", (req, res) =>{
    const nuevoCliente = req.body;

    console.log("llego info" + JSON.stringify(nuevoCliente))


})

app.listen(port)


console.log("hola")