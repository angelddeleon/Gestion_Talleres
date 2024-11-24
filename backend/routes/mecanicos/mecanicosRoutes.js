import express from "express"
import { Router } from "express"
import client from "./model.js"

export const mecanicosRouter = Router()

mecanicosRouter.get("/", async (req,res)=>{
    try {
        const result = await client.execute(`
            SELECT 
                m.id AS mecanico_id,
                m.nombre AS mecanico_nombre,
                m.telefono,
                m.correo,
                m.cedula,
                m.interno,
                e.id AS especialidad_id,
                e.nombre_especialidad
            FROM MECANICOS m
            LEFT JOIN MECANICOS_ESPECIALIDADES me ON m.id = me.id_mecanico
            LEFT JOIN ESPECIALIDAD e ON me.id_especialidad = e.id
        `);

        // Estructurar los datos para agrupar las especialidades por mecánico
        const mecanicosMap = {};
        result.rows.forEach(row => {
            const mecanicoId = row.mecanico_id;

            if (!mecanicosMap[mecanicoId]) {
                mecanicosMap[mecanicoId] = {
                    id: row.mecanico_id,
                    nombre: row.mecanico_nombre,
                    telefono: row.telefono,
                    correo: row.correo,
                    cedula: row.cedula,
                    interno: row.interno,
                    especialidades: []
                };
            }

            if (row.especialidad_id) {
                mecanicosMap[mecanicoId].especialidades.push({
                    id: row.especialidad_id,
                    nombre: row.nombre_especialidad
                });
            }
        });

        // Convertir el mapa en un array para enviar la respuesta
        const mecanicos = Object.values(mecanicosMap);
        return res.status(200).json(mecanicos);
    } catch (error) {
        console.error("Error al obtener los mecánicos:", error);
        return res.status(500).json({ message: "Error al obtener los mecánicos." });
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

mecanicosRouter.get("/:cedula", async (req, res) => {
    try {
        const { cedula } = req.params;

        const result = await client.execute(`
            SELECT 
                m.id,
                m.nombre,
                m.telefono,
                m.correo,
                m.cedula,
                m.interno,
                e.id AS especialidad_id,
                e.nombre_especialidad
            FROM MECANICOS m
            LEFT JOIN MECANICOS_ESPECIALIDADES me ON m.id = me.id_mecanico
            LEFT JOIN ESPECIALIDAD e ON me.id_especialidad = e.id
            WHERE m.cedula = ?
        `, [cedula]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Mecánico no encontrado" });
        }

        // Estructurar los datos para agrupar las especialidades por mecánico
        const mecanico = {
            id: result.rows[0].id,
            nombre: result.rows[0].nombre,
            telefono: result.rows[0].telefono,
            correo: result.rows[0].correo,
            cedula: result.rows[0].cedula,
            interno: result.rows[0].interno,
            especialidades: []
        };

        result.rows.forEach(row => {
            if (row.especialidad_id) {
                mecanico.especialidades.push({
                    id: row.especialidad_id,
                    nombre: row.nombre_especialidad
                });
            }
        });

        return res.status(200).json(mecanico);
    } catch (error) {
        console.error("Error al obtener el mecánico:", error);
        return res.status(500).json({ message: "Error al obtener el mecánico." });
    }
});


mecanicosRouter.post("/", async (req, res) =>{

    try{
        const {nombre, telefono, correo, cedula, interno, especialidades} = req.body

        const resultMechanic = await client.execute(`INSERT INTO MECANICOS (nombre,telefono,correo
            ,cedula,interno) VALUES (?,?,?,?,?)`,[nombre,telefono,correo,cedula,interno])


      
            const resultId  = await client.execute(`SELECT id FROM MECANICOS WHERE cedula = ?`, [cedula])
            const [result] = resultId.rows
            const {id} = result

            const resultEspecialidadesId = await client.execute(`SELECT * FROM ESPECIALIDAD`)
            const resultEspecialidades = resultEspecialidadesId.rows
            const especialidadesId = resultEspecialidades.filter((especialidad) => especialidades.includes(especialidad.nombre_especialidad))
            

          
           
        try{
            for (const especialidadId of especialidadesId) {
                await client.execute(`
                    INSERT INTO MECANICOS_ESPECIALIDADES (id_mecanico, id_especialidad)
                    VALUES (?, ?)`,
                    [id, especialidadId.id])
            };

        }catch (error){
            return res.status(500).json({message: error})
        }
     
        
        
        
        return res.status(201).json({ message: "Mecánico registrado exitosamente"});
    
    }catch (e){

        return res.status(500).json({message: "Error al crear mecanico"})
    }



})

mecanicosRouter.delete("/:cedula", async (req,res) =>{

    try{

        const {cedula} = req.params
        const result = await client.execute(`DELETE FROM MECANICOS WHERE cedula = ? `, [cedula])

        if (result.rowsAffected === 0) return res.status(400).json({message: "Mecanico no encontrado"})
        return res.status(201).json({message: "Mecanico eliminado exitosamente"})
    }catch{
        return res.status(500).json({message: "Error al eliminar el mecanico"})
    }


})

mecanicosRouter.patch("/:id", async (req, res) =>{

    const {id} = req.params
    const {nombre, telefono, correo, cedula ,interno, especialidades} = req.body

    try{
       await client.execute(
            `UPDATE MECANICOS SET nombre = ?, telefono = ?, correo = ?, interno = ?, cedula = ?
             WHERE id = ?`,
            [nombre, telefono, correo, interno, cedula, id]
        );
        
       res.status(200).json({message: "Mecanico actualizado"})

     
    }catch{
        return res.status(500).json({message: "Error al actualizar el mecanico"})

    }

    try{
            const resultId  = await client.execute(`SELECT id FROM MECANICOS WHERE cedula = ?`, [cedula])
            const [result] = resultId.rows
            const {id} = result

            const resultEspecialidadesId = await client.execute(`SELECT * FROM ESPECIALIDAD`)
            const resultEspecialidades = resultEspecialidadesId.rows
            const especialidadesId = resultEspecialidades.filter((especialidad) => especialidades.includes(especialidad.nombre_especialidad))




        try{

            const response = await client.execute(`DELETE FROM MECANICOS_ESPECIALIDADES WHERE id_mecanico = ?`,[id])
            console.log(response.rowsAffected)
            
        }catch{

            return res.status(500).json({message:"Error actualizando/eliminando especialidades del mecanico"})

        }

                    
        try{
            for (const especialidadId of especialidadesId) {
                await client.execute(`
                    INSERT INTO MECANICOS_ESPECIALIDADES (id_mecanico, id_especialidad)
                    VALUES (?, ?)`,
                    [id, especialidadId.id])
            };

        }catch {
            return res.status(500).json({message:"Error actualizando especialidades del mecanico"})
        }
     

    }catch{

        return res.status(500).json({message:"Error actualizando especialidades del mecanico"})

    }
    






})



export default mecanicosRouter