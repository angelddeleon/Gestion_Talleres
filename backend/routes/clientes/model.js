import { createClient } from '@libsql/client'
const url = 'file:./backend/local.db'


const client = createClient({
    url: url
  })
  

await client.execute(`
    DROP TABLE IF EXISTS CLIENTES
    `)

    
await client.execute(`
    CREATE TABLE IF NOT EXISTS CLIENTES (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(255) NOT NULL,
        telefono VARCHAR(20) NOT NULL,
        correo VARCHAR(255) UNIQUE NOT NULL,
        cedula VARCHAR(20) UNIQUE NOT NULL,
        direccion TEXT NOT NULL
        )
      `)

      

      //Prueba
await client.execute(`
    INSERT INTO CLIENTES (nombre, telefono, correo, cedula, direccion) VALUES
        ('Juan Pérez', '0414-1234567', 'juan.perez@example.com', '12345678', 'Av. Principal, Edif. Apto 2'),
        ('Ana García', '0424-9876543', 'ana.garcia@example.com', '87654321', 'Calle Secundaria, Casa 5'),
        ('Carlos Rodríguez', '0412-5555555', 'carlos.rodriguez@example.com', '11223344', 'Zona Industrial, Galpón 3'),
        ('Marta López', '0416-3334444', 'marta.lopez@example.com', '55667788', 'Urbanización Norte, Torre C')
`)
      


export default client
      