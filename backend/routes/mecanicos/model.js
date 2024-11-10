import { createClient } from '@libsql/client';

const url = 'file:./backend/local.db';

const client = createClient({
  url: url,
});

await client.execute(`
  DROP TABLE IF EXISTS MECANICOS
`);

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
    interno BOOLEAN NOT NULL
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
  ('Juan Pérez', '555-1234', 'juan.perez@mail.com', '123456789', true),
  ('María López', '555-5678', 'maria.lopez@mail.com', '987654321', false),
  ('Carlos Gómez', '555-9101', 'carlos.gomez@mail.com', '456789123', true)
`);

// // Insertar especialidades
await client.execute(`
  INSERT INTO ESPECIALIDAD (nombre_especialidad)
  VALUES 
  ('Electricidad'),
  ('Mecánica'),
  ('Aire Acondicionado')
`);

// // Insertar relaciones entre mecánicos y especialidades
await client.execute(`
  INSERT INTO MECANICOS_ESPECIALIDADES (id_mecanico, id_especialidad)
  VALUES 
  (1, 1),  -- Juan Pérez, Electricidad
  (1, 2),  -- Juan Pérez, Mecánica
  (2, 3),  -- María López, Aire Acondicionado
  (3, 2)   -- Carlos Gómez, Mecánica
`);

export default client;
