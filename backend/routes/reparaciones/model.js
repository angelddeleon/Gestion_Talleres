import { createClient } from '@libsql/client'
const url = 'file:./backend/local.db'


const client = createClient({
    url: url
  })
  

await client.execute(`
    DROP TABLE IF EXISTS REPARACIONES
    `)


await client.execute(`
    DROP TABLE IF EXISTS TAREAS_REPARACION
    `)

    
await client.execute(`
    DROP TABLE IF EXISTS PIEZAS
    `)

    


await client.execute(`
    CREATE TABLE IF NOT EXISTS REPARACIONES(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha_inicio DATETIME NOT NULL,
        fecha_estimada DATETIME NOT NULL,
        fecha_finalizacion DATETIME,
        descripcion VARCHAR(255) NOT NULL,
        status VARCHAR(255) DEFAULT pendiente,
        id_vehiculo INTEGER NOT NULL
    )`)

await client.execute(`
    CREATE TABLE IF NOT EXISTS TAREAS_REPARACION (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoria TEXT NOT NULL,
        tarea_realizada TEXT NOT NULL,
        observaciones TEXT NOT NULL DEFAULT "",
        status VARCHAR(255) DEFAULT pendiente,
        fecha_inicio DATETIME,
        fecha_finalizacion DATETIME,
        id_mecanico INTEGER NOT NULL,
        id_reparacion INTEGER NOT NULL,
        id_pieza INTEGER
        )`)
    

await client.execute(`
    CREATE TABLE IF NOT EXISTS PIEZAS(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_pieza VARCHAR(255),
        procedencia VARCHAR(255)
    )
    `)



    
//Testeo
await client.execute(`
    INSERT INTO REPARACIONES (fecha_inicio, fecha_estimada, descripcion, status, id_vehiculo)
    VALUES 
    ('2024-11-01 08:00:00', '2024-11-03 17:00:00', 'Cambio de aceite y revisión general', 'pendiente', 1),
    ('2024-11-05 09:00:00', '2024-11-07 15:00:00', 'Reparación del sistema de frenos', 'en progreso', 2)
`);


await client.execute(`
    INSERT INTO TAREAS_REPARACION (tarea_realizada,status, id_mecanico, id_reparacion, id_pieza, categoria)
    VALUES 
    ('Cambio de aceite', 'pendiente', 1, 1, 1, 'mecanica'),
    ('Cambio de filtro de aire', 'pendiente', 2, 1, 1, 'mecanica'),
    ('Revisión de compresor','en progreso', 1, 2, 2, 'aire acondicionado');

`);


await client.execute(`
    INSERT INTO PIEZAS (nombre_pieza, procedencia)
    VALUES 
    ('Filtro de aceite', 'Importada'),
    ('Pastillas de freno', 'Nacional');
`);

    

    

export default client
      