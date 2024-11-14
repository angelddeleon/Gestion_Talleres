import express from 'express';
import db from './model.js'; // Asegúrate de que la ruta sea correcta

const signInRouter = express.Router();

signInRouter.post('/', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        console.log('desde el backend')
        console.log(email)
        console.log(password)
        console.log(role)

        // Inserta el usuario en la base de datos
        await db.execute(`INSERT INTO USERS (email, password, role) VALUES (?, ?, ?)`, [email, password, role]);

        console.log(`Usuario agregado: ${email}`);
        res.status(201).json({ message: 'Usuario agregado correctamente' });
    } catch (e) {
        console.error("Error al agregar el usuario:", e);
        res.status(500).json({ error: e.message });
    }
});

signInRouter.get('/', async (req, res) => {
    try {
        const users = await db.execute(`SELECT * FROM USERS`);
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: error.message });
    }

});

export default signInRouter;