import express, { json } from "express"
import { Router } from "express"
import client from "./model.js"

const reparacionesRouter = Router()


// GET para obtener todas las reparaciones con sus tareas asociadas
reparacionesRouter.get("/", async (req, res) => {
  try {
    // Consulta para obtener las reparaciones y sus datos relacionados
    const query = `
      SELECT 
        r.id AS reparacion_id,
        r.fecha_inicio,
        r.fecha_finalizacion,
        r.descripcion,
        r.status AS reparacion_status,
        v.id AS vehiculo_id,
        v.placa,
        v.marca,
        v.modelo,
        v.year,
        t.id AS tarea_id,
        t.categoria,
        t.tarea_realizada,
        t.observaciones,
        t.status AS tarea_status,
        t.fecha_inicio AS tarea_fecha_inicio,
        t.fecha_finalizacion AS tarea_fecha_finalizacion,
        t.id_mecanico,
        t.id_pieza
      FROM REPARACIONES r
      LEFT JOIN VEHICULOS v ON r.id_vehiculo = v.id
      LEFT JOIN TAREAS_REPARACION t ON t.id_reparacion = r.id
    `;

    const result = await client.execute(query);

    // Asegurarnos de que la estructura de los datos sea correcta
    const rows = result.rows || result;

    // Si no hay resultados, responder con un mensaje
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron reparaciones" });
    }

    // Estructurar los datos para devolverlos en formato organizado
    const reparaciones = [];
    let currentReparacion = null;

    rows.forEach(row => {
      if (!currentReparacion || currentReparacion.id !== row.reparacion_id) {
        // Agregar la reparación previa a la lista si ya está llena
        if (currentReparacion) {
          reparaciones.push(currentReparacion);
        }

        // Crear una nueva reparación
        currentReparacion = {
          id: row.reparacion_id,
          fecha_inicio: row.fecha_inicio,
          fecha_finalizacion: row.fecha_finalizacion,
          descripcion: row.descripcion,
          status: row.reparacion_status,
          vehiculo: {
            id: row.vehiculo_id,
            placa: row.placa,
            marca: row.marca,
            modelo: row.modelo,
            year: row.year,
          },
          tareas: [],
        };
      }

      // Si hay una tarea asociada, agregarla al arreglo de tareas
      if (row.tarea_id) {
        currentReparacion.tareas.push({
          id: row.tarea_id,
          categoria: row.categoria,
          tarea_realizada: row.tarea_realizada,
          observaciones: row.observaciones,
          status: row.tarea_status,
          fecha_inicio: row.tarea_fecha_inicio,
          fecha_finalizacion: row.tarea_finalizacion,
          id_mecanico: row.id_mecanico,
          id_pieza: row.id_pieza,
        });
      }
    });

    // Agregar la última reparación al arreglo
    if (currentReparacion) {
      reparaciones.push(currentReparacion);
    }

    // Enviar las reparaciones con sus datos organizados
    return res.status(200).json(reparaciones);
  } catch (error) {
    console.error("Error al obtener reparaciones:", error);
    return res.status(500).json({ error: "Error al obtener las reparaciones" });
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