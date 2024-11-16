import { createClient } from '@libsql/client'
const url = 'file:./backend/local.db'


const client = createClient({
    url: url
  })
  

await client.execute(`
    DROP TABLE IF EXISTS REPARACIONES
    `)


await client.execute(`
    DROP TABLE IF EXISTS DETALLES_REPARACION
    `)

    
await client.execute(`
    DROP TABLE IF EXISTS PIEZAS
    `)

    


await client.execute(`
    CREATE TABLE IF NOT EXISTS REPARACIONES(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha_inicio DATETIME NOT NULL,
        fecha_finalizacion DATETIME NOT NULL,
        descripcion VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        id_vehiculo INTEGER NOT NULL
    )`)

await client.execute(`
    CREATE TABLE IF NOT EXISTS DETALLES_REPARACION(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tarea_realizada TEXT NOT NULL,
        OBSERVACIONES TEXT NOT NULL,
        id_mecanico INTEGER NOT NULL,
        id_reparacion INTEGER NOT NULL,
        id_pieza INTEGER NOT NULL
        )`)
    

await client.execute(`
    CREATE TABLE IF NOT EXIST PIEZAS(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_pieza VARCHAR(255) NOT NULL,
        procedencia VARCHAR(255) NOT NULL
    )
    `)

    

    

export default client
      