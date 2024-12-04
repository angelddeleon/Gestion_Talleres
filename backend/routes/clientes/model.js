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
        direccion TEXT NOT NULL,
        activo BOOLEAN DEFAULT TRUE
        )
      `)

await client.execute(`
        INSERT INTO CLIENTES (nombre, telefono, correo, cedula, direccion) VALUES
                ('Ana Gómez', '04163336666', 'ana.gomez@example.com', '55668800', 'Urbanización Sur, Torre D'),
                ('Carlos Ruiz', '04163337777', 'carlos.ruiz@example.com', '55669911', 'Calle Mayor, Residencias B'),
                ('María Fernández', '04163338888', 'maria.fernandez@example.com', '55670022', 'Boulevard Oeste, Edificio E'),
                ('Luis Sánchez', '04163339999', 'luis.sanchez@example.com', '55671133', 'Avenida del Sol, Torre F'),
                ('Patricia Torres', '04163340000', 'patricia.torres@example.com', '55672244', 'Urbanización Este, Residencias G'),
                ('Miguel Rodríguez', '04163341111', 'miguel.rodriguez@example.com', '55673355', 'Calle Nueva, Edificio H'),
                ('Carmen Martínez', '04163342222', 'carmen.martinez@example.com', '55674466', 'Plaza Norte, Torre I'),
                ('Fernando Castro', '04163343333', 'fernando.castro@example.com', '55675577', 'Parque Central, Edificio J'),
                ('Laura Moreno', '04163344444', 'laura.moreno@example.com', '55676688', 'Avenida Las Flores, Residencias K');
                        `)
                              




export default client
      