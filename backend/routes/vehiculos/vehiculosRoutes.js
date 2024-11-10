import express from "express"
import { Router } from "express"
import client from "./model.js"

export const vehiculosRouter = Router()




vehiculosRouter.get("/", async (req, res) =>{

    try{
        const vehiculos = await client.execute(`SELECT * FROM vehiculos`)
        res.json(vehiculos.rows)

    }catch{
        res.status(500).json({message: "Error al obtener los vehiculos"})
    }



})

export default vehiculosRouter