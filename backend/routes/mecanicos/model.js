import { createClient } from '@libsql/client';

const url = 'file:./backend/local.db';

const client = createClient({
  url: url,
});

await client.execute(`
  DROP TABLE IF EXISTS MECANICOS
  
  
  `)
await client.execute(`
  DROP TABLE IF EXISTS MECANICOS_ESPECIALIDADES
`);

await client.execute(`
  DROP TABLE IF EXISTS ESPECIALIDAD
`);

await client.execute(`
  CREATE TABLE IF NOT EXISTS MECANICOS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    interno BOOLEAN NOT NULL,
    activo BOOLEAN DEFAULT TRUE
  )
`);

await client.execute(`
  CREATE TABLE IF NOT EXISTS ESPECIALIDAD (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_especialidad VARCHAR(255) NOT NULL
  )
`);

await client.execute(`
  CREATE TABLE IF NOT EXISTS MECANICOS_ESPECIALIDADES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_mecanico INTEGER NOT NULL,
    id_especialidad INTEGER NOT NULL
)
`);

// Insertar mecánicos
await client.execute(`
  INSERT INTO MECANICOS (nombre, telefono, correo, cedula, interno)
  VALUES 
      ('José Ramírez', '04244611234', 'jose.ramirez@mail.com', '111222333', true),
      ('Andrés Martínez', '04244622345', 'andres.martinez@mail.com', '222333444', true),
      ('Luis Hernández', '04244633456', 'luis.hernandez@mail.com', '333444555', true),
      ('Miguel Torres', '04244644567', 'miguel.torres@mail.com', '444555666', false),
      ('Pedro López', '04244655678', 'pedro.lopez@mail.com', '555666777', true),
      ('Fernando Rojas', '04244699012', 'fernando.rojas@mail.com', '999000111', true),
      ('Manuel Vargas', '04244610123', 'manuel.vargas@mail.com', '000111222', false);
`);

// // Insertar especialidades
await client.execute(`
  INSERT INTO ESPECIALIDAD (nombre_especialidad)
  VALUES 
  ('Electricidad'),
  ('Mecánica'),
  ('Aire Acondicionado'),
  ('Otro')
`);

// // Insertar relaciones entre mecánicos y especialidades
await client.execute(`
  INSERT INTO MECANICOS_ESPECIALIDADES (id_mecanico, id_especialidad)
  VALUES 
  (1, 1),  
  (1, 2),  
  (2, 3),  
  (3, 2),
  (4, 4),
  (5, 2),
  (6, 1),
  (7, 1),
  (7, 2),
  (7, 3),
  (6, 3)   
`);

export default client;
