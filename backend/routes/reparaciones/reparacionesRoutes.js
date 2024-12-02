import express, { json } from "express"
import { Router } from "express"
import client from "./model.js"

const reparacionesRouter = Router()


reparacionesRouter.get("/", async (req, res) => {
    try {
        const reparaciones = await client.execute(`SELECT * FROM REPARACIONES`);
        return res.json(reparaciones.rows);
    } catch (error) {
        console.error("Error al obtener las reparaciones:", error);
        return res.status(500).json({ message: "Error al obtener las reparaciones." });
    }
});

reparacionesRouter.get("/:id_mecanico", async (req, res) => {
    const { id_mecanico } = req.params;

    try {
        // Realizamos una consulta para obtener las reparaciones pendientes asignadas al mecánico
        const reparaciones = await client.execute(`
             SELECT 
                tr.id AS tarea_id, 
                tr.tarea_realizada, 
                tr.status, 
                tr.fecha_inicio, 
                tr.fecha_finalizacion, 
                tr.observaciones,
                v.placa, 
                v.marca, 
                v.modelo,
                v.year,
                c.nombre, 
                r.descripcion AS reparacion_descripcion,
                r.status AS reparacion_estado
                FROM TAREAS_REPARACION tr
                JOIN REPARACIONES r ON tr.id_reparacion = r.id
                JOIN VEHICULOS v ON r.id_vehiculo = v.id
                JOIN CLIENTES c ON v.id_cliente = c.id
                WHERE tr.id_mecanico = ?
                `, [id_mecanico]);
    

        if (reparaciones.rows.length === 0) {
            return res.status(404).json({ message: "No hay reparaciones pendientes para este mecánico" });
        }

        return res.status(200).json(reparaciones.rows)

    } catch (error) {
        res.status(500).json({ error: "Error al obtener las reparaciones" });
    }
});


reparacionesRouter.post("/", async (req, res) =>{
  const {fecha_inicio, descripcion, id_vehiculo} = req.body
 
  try{
    await client.execute(`INSERT INTO REPARACIONES (fecha_inicio, 
        descripcion, id_vehiculo) VALUES (?,?,?)`,[fecha_inicio,descripcion,id_vehiculo])

    // Obtén el último ID generado automáticamente
    const result = await client.execute(`SELECT last_insert_rowid() AS lastID`);
    const lastID = result.rows[0].lastID;
    
    
    res.status(200).json({message: "Reparacion creadas" , id: lastID})

  }catch{
    res.status(500).json({error: "Error al crear la reparación"})
  }


})


reparacionesRouter.post("/tarea", async (req, res) =>{
    const {categoria, tarea_realizada, mecanico_id, reparacion_id} = req.body
    console.log(categoria)
    console.log(tarea_realizada)
   
   
    try{
      await client.execute(`INSERT INTO  TAREAS_REPARACION (categoria, 
          tarea_realizada, id_mecanico, id_reparacion) VALUES (?,?,?,?)`,
          [categoria,tarea_realizada,mecanico_id, reparacion_id])
  
      
      res.status(200).json({message: "Tarea Creada"})
  
    }catch{
      res.status(500).json({error: "Error al crear la reparación"})
    }
  
  
  })









export default reparacionesRouter