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

mecanicosRouter.get("/:cedula", async (req, res) =>{
    try{

    
    const { cedula } = req.params
    const response = await client.execute(`SELECT * FROM MECANICOS WHERE cedula = '${cedula}'`)
    if(response.rows.length === 0){
        return res.status(404).json({error: "Mecanico no encontrado"})

    }
    return res.json(response.rows)
}catch{
    res.status(500).json({message: "Error al obtener el mecanico"})
}
})




export default mecanicosRouter