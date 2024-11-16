import express from "express"
import { Router } from "express"
import client from "./model.js"

const reparacionesRouter = Router()



reparacionesRouter.get("/", async (req, res) =>{

    try{
        const reparaciones = await client.execute(`SELECT * FROM REPARACIONES`)
        return res.json(reparaciones.rows)

    }catch{
        return []

    }
})


reparacionesRouter.get("/detalles", async (req, res) =>{
    try{
        const detalles = await client.execute(`SELECT * FROM DETALLES_REPARACIONES`)
        return res.json(detalles.rows)

    }catch{
        return []
    }
})



export default reparacionesRouter