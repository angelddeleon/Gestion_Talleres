import { createClient } from '@libsql/client'
const url = 'file:./backend/local.db'


const db = createClient({
    url: url
  })

  // Eliminar la tabla CLIENTES si existe
await db.execute(`
    DROP TABLE IF EXISTS USERS
`);

        // Crear la tabla USERS
await db.execute(` 
    CREATE TABLE IF NOT EXISTS USERS (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email VARCHAR(200) NOT NULL,
            password VARCHAR(200) NOT NULL,
            role TEXT NOT NULL
        )
`);
        

await db.execute(`
    INSERT INTO USERS (email, password, role) VALUES
        ('Juan Pérez', '0414-1234567', 'admin'),
        ('Ana García', '0424-9876543', 'client'),
        ('Carlos Rodríguez', '0412-5555555', 'admin'),
        ('Marta López', '0416-3334444', 'client')
`);

        
  
const fetchUsers = async () => {
    try {
        const result = await db.execute('SELECT * FROM USERS');
        console.log(result); // Asegúrate de que esto sea lo que esperas
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
};

// Llamar a la función para obtener los usuarios
fetchUsers();





export default db

/*



*/