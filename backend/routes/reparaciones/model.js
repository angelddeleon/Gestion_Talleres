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
    ('2024-11-01 08:00:00', '2024-11-03 17:00:00', 'Cambio de aceite y revisión general', 'completado', 1),
    ('2024-11-05 09:00:00', '2024-11-07 15:00:00', 'Reparación del sistema de frenos', 'completado', 2),
    ('2024-12-01 10:00:00', '2024-12-03 18:00:00', 'Revisión de suspensión', 'completado', 3),
    ('2024-12-05 09:30:00', '2024-12-07 14:00:00', 'Cambio de bujías', 'completado', 4),
    ('2024-12-10 11:00:00', '2024-12-12 16:00:00', 'Reparación del sistema de escape', 'completado', 5),
    ('2024-12-15 08:30:00', '2024-12-17 15:30:00', 'Revisión de frenos', 'completado', 6),
    ('2024-12-20 10:00:00', '2024-12-22 17:00:00', 'Cambio de aceite y filtros', 'completado', 7),
    ('2024-12-25 09:00:00', '2024-12-27 13:00:00', 'Reparación del sistema de dirección', 'completado', 8),
    ('2024-12-30 11:00:00', '2025-01-01 18:00:00', 'Revisión de la transmisión', 'completado', 9),
    ('2024-01-05 10:00:00', '2025-01-07 15:00:00', 'Cambio de baterías', 'completado', 10),
    ('2024-01-10 08:30:00', '2025-01-12 14:30:00', 'Reparación del sistema eléctrico', 'completado', 11),
    ('2024-01-15 09:30:00', '2025-01-17 13:00:00', 'Revisión de neumáticos', 'completado', 12),
    ('2024-01-20 10:00:00', '2025-01-22 18:00:00', 'Cambio de correa de distribución', 'completado', 13),
    ('2024-01-25 08:00:00', '2025-01-27 17:00:00', 'Alineación y balanceo', 'completada', 5);
`);


await client.execute(`
    INSERT INTO TAREAS_REPARACION (tarea_realizada, fecha_inicio, fecha_finalizacion, observaciones, status, id_mecanico, id_reparacion, id_pieza, categoria)
    VALUES 
    ('Cambio de aceite', '2024-12-01 08:00:00', '2024-12-01 10:00:00', 'Cambio realizado sin problemas.', 'completado', 1, 1, 1, 'mecanica'),
    ('Cambio de filtro de aire', '2024-12-02 09:00:00', '2024-12-02 11:00:00', 'Filtro reemplazado.', 'completado', 3, 1, 1, 'mecanica'),
    ('Revisión de compresor', '2024-12-03 09:30:00', '2024-12-03 12:00:00', 'Compresor en buen estado.', 'completado', 2, 2, 2, 'aire acondicionado'),
    ('Cambio de bujías', '2024-12-05 10:00:00', '2024-12-05 12:30:00', 'Bujías nuevas instaladas.', 'completado', 7, 3, 3, 'mecanica'),
    ('Revisión de frenos', '2024-12-07 08:00:00', '2024-12-07 10:00:00', 'Pastillas de freno en buen estado.', 'completado', 4, 4, 4, 'seguridad'),
    ('Cambio de aceite y filtros', '2024-12-10 09:00:00', '2024-12-10 11:30:00', 'Aceite y filtros cambiados.', 'completado', 5, 5, 5, 'mecanica'),
    ('Reparación del sistema de dirección', '2024-12-12 08:30:00', '2024-12-12 12:00:00', 'Dirección ajustada.', 'completado', 5, 6, 6, 'mecanica'),
    ('Revisión de la transmisión', '2024-12-15 09:00:00', '2024-12-15 11:00:00', 'Transmisión en buen estado.', 'completado', 3, 7, 7, 'mecanica'),
    ('Cambio de baterías', '2024-12-18 10:00:00', '2024-12-18 12:00:00', 'Baterías reemplazadas.', 'completado', 1, 8, 8, 'electrico'),
    ('Reparación del sistema eléctrico', '2024-12-20 09:00:00', '2024-12-20 13:00:00', 'Sistema eléctrico reparado.', 'completado', 1, 9, 9, 'electrico'),
    ('Revisión de neumáticos', '2024-12-22 08:00:00', '2024-12-22 10:30:00', 'Neumáticos revisados y alineados.', 'completado', 2, 10, 10, 'seguridad'),
    ('Cambio de correa de distribución', '2024-12-25 09:00:00', '2024-12-25 12:00:00', 'Correa cambiada.', 'completado', 5, 11, 11, 'mecanica'),
    ('Alineación y balanceo', '2024-12-28 10:00:00', '2024-12-28 11:30:00', 'Vehículo alineado y balanceado.', 'completado', 7, 12, 12, 'mecanica'),
    ('Cambio de pastillas de freno', '2024-12-30 09:00:00', '2024-12-30 11:30:00', 'Pastillas de freno nuevas.', 'completado', 6, 13, 13, 'seguridad'),
    ('Reparación del sistema de suspensión', '2025-01-02 09:30:00', '2025-01-02 12:30:00', 'Suspensión reparada.', 'completado', 7, 14, 14, 'mecanica'),
    ('Revisión de luces', '2025-01-05 08:30:00', '2025-01-05 10:30:00', 'Luces funcionando correctamente.', 'completado', 1, 15, 15, 'electrico'),
    ('Cambio de filtro de combustible', '2025-01-07 09:00:00', '2025-01-07 11:00:00', 'Filtro de combustible cambiado.', 'completado', 3, 16, 16, 'mecanica'),
    ('Reparación de caja de cambios', '2025-01-10 08:00:00', '2025-01-10 13:00:00', 'Caja de cambios reparada.', 'completado', 3, 17, 17, 'mecanica'),
    ('Revisión del sistema de refrigeración', '2025-01-12 09:00:00', '2025-01-12 12:00:00', 'Sistema de refrigeración en buen estado.', 'completado', 2, 18, 18, 'aire acondicionado'),
    ('Cambio de líquido de frenos', '2025-01-15 08:30:00', '2025-01-15 10:30:00', 'Líquido de frenos cambiado.', 'completado', 2, 19, 19, 'seguridad'),
    ('Reparación del alternador', '2025-01-17 09:00:00', '2025-01-17 12:00:00', 'Alternador reparado.', 'completado', 6, 20, 20, 'electrico');
`);


await client.execute(`
    INSERT INTO PIEZAS (nombre_pieza, procedencia)
    VALUES 
    ('Filtro de aceite', 'Importada'),
    ('Pastillas de freno', 'Nacional');
`);

    

    

export default client
      