import express, { json } from "express"
import client from "./model.js"
import e, { Router } from "express"

const clientesRouter = Router()

//Obtener Todos los clientes
clientesRouter.get("/", async(req, res) =>{
  
        try {
            // Obtener todos los clientes
            const clientesResult = await client.execute(`
                SELECT * 
                FROM CLIENTES
            `);
    
            const clientes = clientesResult.rows;
    
            // Si no hay clientes, devolver una lista vacía
            if (clientes.length === 0) {
                return res.status(200).json([]);
            }
    
            // Obtener todos los vehículos asociados
            const vehiculosResult = await client.execute(`
                SELECT * 
                FROM VEHICULOS
            `);
    
            const vehiculos = vehiculosResult.rows;
    
            // Asociar los vehículos a sus respectivos clientes
            const clientesConVehiculos = clientes.map(cliente => {
                const vehiculosCliente = vehiculos.filter(vehiculo => vehiculo.id_cliente === cliente.id);
                return {
                    ...cliente,
                    vehiculos: vehiculosCliente
                };
            });
    
            // Enviar los clientes con sus vehículos
            return res.status(200).json(clientesConVehiculos);
        } catch (error) {
            console.error("Error al obtener los clientes y sus vehículos:", error);
            return res.status(500).json({ message: "Error al obtener los clientes y sus vehículos." });
        }
    });
    

clientesRouter.get("/:cedula", async (req, res) => {
        try {
            const { cedula } = req.params;
    
            // Obtener datos del cliente
            const clienteResult = await client.execute(`
                SELECT * 
                FROM CLIENTES
                WHERE cedula = ?
            `, [cedula]);
    
            if (clienteResult.rows.length === 0) {
                return res.status(404).json({});
            }
    
            const cliente = clienteResult.rows[0];
    
            // Obtener vehículos asociados al cliente
            const vehiculosResult = await client.execute(`
                SELECT * 
                FROM VEHICULOS
                WHERE id_cliente = ?
            `, [cliente.id]);
    
            // Agregar los vehículos al cliente
            cliente.vehiculos = vehiculosResult.rows;
    
            // Enviar el cliente con sus vehículos
            return res.status(200).json(cliente);
        } catch (error) {
            console.error("Error al obtener cliente y sus vehículos:", error);
            return res.status(500).json({ message: "Error al obtener cliente y sus vehículos." });
        }
    });

clientesRouter.get("/cliente/:id", async(req,res)=>{

    const { id } = req.params

    try{
        const cliente = await client.execute(`SELECT * FROM CLIENTES WHERE id = ?`,[id])
        if(cliente.rows.length === 0){
            return res.status(404).json({})
            }
            return res.status(200).json(cliente.rows[0])

    }catch{
        return res.status(500).json({message:"Error al obtener el cliente"})
    }


})
clientesRouter.post("/", async (req, res) =>{
    try{

        const { nombre, cedula, telefono, direccion , correo} = req.body


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
    
    const {cedula} = req.params
    const {nombre, telefono, correo , direccion} = req.body

    try{
       await client.execute(
            `UPDATE CLIENTES SET nombre = ?, telefono = ? ,correo = ?, direccion = ?
             WHERE cedula = ?`,
            [nombre, telefono, correo, direccion, cedula]
        );
        
       res.status(200).json({message: "Cliente Actualizado"})

    }catch{
        return res.status(500).json({message: "Error al actualizar el mecanico"})
    }

    


    
    
})

clientesRouter.patch("/estatus/:cedula", async(req, res) =>{
    const { cedula } = req.params
    const { estatus } = req.body

    try{
        const result = await client.execute(`UPDATE CLIENTES SET activo = ? 
            WHERE cedula = ?`,[estatus,cedula])
        
        res.status(200).json({message: "Mecanico actualizado"})

    }catch{
        return res.status(500).json({error: "Error al cambiar estatus"})
    }
})



export default clientesRouter