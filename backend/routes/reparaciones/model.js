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
        fecha_finalizacion DATETIME NOT NULL,
        descripcion VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        id_vehiculo INTEGER NOT NULL
    )`)

await client.execute(`
    CREATE TABLE IF NOT EXISTS TAREAS_REPARACION (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tarea_realizada TEXT NOT NULL,
        OBSERVACIONES TEXT NOT NULL,
        status VARCHAR(255) NOT NULL,
        fecha_inicio,
        fecha_finalizacion,
        id_mecanico INTEGER NOT NULL,
        id_reparacion INTEGER NOT NULL,
        id_pieza INTEGER NOT NULL
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
    INSERT INTO REPARACIONES (fecha_inicio, fecha_finalizacion, descripcion, status, id_vehiculo)
    VALUES 
    ('2024-11-01 08:00:00', '2024-11-03 17:00:00', 'Cambio de aceite y revisión general', 'completada', 1),
    ('2024-11-05 09:00:00', '2024-11-07 15:00:00', 'Reparación del sistema de frenos', 'en progreso', 2)
`);


await client.execute(`
    INSERT INTO TAREAS_REPARACION (tarea_realizada, OBSERVACIONES,status, id_mecanico, id_reparacion, id_pieza)
    VALUES 
    ('Cambio de aceite', 'Todo en buen estado','pendiente', 1, 1, 1),
    ('Cambio de filtro de aire', 'Todo en buen estado','pendiente', 1, 1, 1),
    ('Revisión de frenos', 'Pastillas desgastadas, se reemplazarán','pendiente', 1, 2, 2);

`);


await client.execute(`
    INSERT INTO PIEZAS (nombre_pieza, procedencia)
    VALUES 
    ('Filtro de aceite', 'Importada'),
    ('Pastillas de freno', 'Nacional');
`);

    

    

export default client
      