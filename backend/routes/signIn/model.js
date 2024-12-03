import { createClient } from '@libsql/client'
const url = 'file:./backend/local.db'


const db = createClient({
    url: url
  })


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

        


// Llamar a la función para obtener los usuarios






export default db

/*



*/