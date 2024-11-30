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

vehiculosRouter.get("/:placa", async (req, res) => {
    try {
        const { placa } = req.params;

        const response = await client.execute(`SELECT * FROM VEHICULOS WHERE placa = '${placa}' `)

        if (response.rows.length === 0) {
            return res.status(404).json({});
        }
        return res.json(response.rows[0]);

    } catch (error) {
        return res.status(500).json({});
    }
});

vehiculosRouter.post("/", async (req, res) => {
    try {
        const { placa, marca, modelo, year, id_cliente } = req.body;
        await client.execute(`
            INSERT INTO VEHICULOS (placa, marca, modelo, year, id_cliente)
            VALUES (?, ?, ?, ?, ?)
        `, [placa, marca, modelo, year, id_cliente]);

        return res.status(201).json({ message: "Vehículo registrado exitosamente." });
    } catch (error) {
        console.error("Error al registrar el vehículo:", error);
        return res.status(500).json({ message: "Error al registrar el vehículo." });
    }
});


vehiculosRouter.patch("/:placa", async (req, res) =>{


    const { placa } = req.params
    const { marca , modelo, year} = req.body

    try{

        await client.execute(`UPDATE VEHICULOS SET marca = ?, modelo = ?, year = ?
            WHERE placa = ?`,
            [marca ,modelo ,year, placa]);
        res.status(200).json({message: "Vehiculo actualizado correctamente"})


    }catch{
        res.status(500).json({message: "Error al actualizar el vehículo"})

    }


})







export default vehiculosRouter