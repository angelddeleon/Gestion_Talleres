import express from "express"
import { Router } from "express"
import client from "./model.js"

export const mecanicosRouter = Router()

mecanicosRouter.get("/", async (req,res)=>{
    try{
        const mecanicos = await client.execute(`SELECT * FROM MECANICOS`)
        res.status(200).json(mecanicos.rows)

    }catch{
        res.status(500).json({message: "Error al obtener los mecanicos"})
    }
})

mecanicosRouter.get("/especialidad", async( req, res) =>{

    try{
        const especialidades = await client.execute(`SELECT * FROM ESPECIALIDAD`)
        res.status(200).json(especialidades.rows)
    }catch{
        res.status(500).json({message: "Error al obtener las especialidades"})
    }
})


export default mecanicosRouter