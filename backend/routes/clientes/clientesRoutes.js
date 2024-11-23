import express, { json } from "express"
import client from "./model.js"
import e, { Router } from "express"

const clientesRouter = Router()

//Obtener Todos los clientes
clientesRouter.get("/", async(req, res) =>{
    try{
        const clientes = await client.execute(`SELECT * FROM clientes`)
        res.json(clientes.rows)
    }catch (e){
        res.status(500).json({error: e})
    }
})

clientesRouter.get("/:cedula", async(req, res) =>{

    try{
        const { cedula } = req.params
        const cliente = await client.execute(`SELECT * FROM clientes WHERE cedula = '${cedula}'`)

        if (cliente.rows.length ===0){
            return res.status(404).json({error: "Cliente no encontrado"})
        }
        return res.json(cliente.rows)
    }catch (e){
        res.status(500).json({error: e})
    }
})

clientesRouter.post("/", async (req, res) =>{
    try{

        const { nombre, cedula, telefono, direccion , correo} = req.body

        console.log('info ' + nombre, cedula, telefono, direccion, correo)

        const cliente = await client.execute(
            `INSERT INTO CLIENTES (nombre, telefono, correo, cedula, direccion) 
             VALUES (?, ?, ?, ?, ?)`,
            [nombre, telefono, correo, cedula, direccion]
          );

        console.log('creo el cliente')
        res.status(201).json({message:"Client created"})
    }catch (e){
        res.status(500).json({error: e.message })
    }
})

clientesRouter.delete("/:cedula", async (req, res) =>{
    try{
        const { cedula } = req.params
        const result = await client.execute(
            `DELETE FROM CLIENTES WHERE cedula = ?`,
            [cedula]
          );
        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json({message: "Client deleted"})
    }catch (e){
        res.status(500).json({error: e})
    }
})

clientesRouter.patch("/:cedula", async(req, res) =>{
    const { cedula } = req.params

    
    
})



export default clientesRouter