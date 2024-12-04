import { createClient } from '@libsql/client'
const url = 'file:./backend/local.db'


const client = createClient({
    url: url
  })
  

await client.execute(`
    DROP TABLE IF EXISTS VEHICULOS
    `)

    
await client.execute(`
    CREATE TABLE IF NOT EXISTS VEHICULOS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        placa VARCHAR(255) NOT NULL,
        marca VARCHAR(20) NOT NULL,
        modelo VARCHAR(255) NOT NULL,
        year VARCHAR(20) NOT NULL,
        id_cliente INTEGER NOT NULL
        )
      `)


      await client.execute(`
        INSERT INTO VEHICULOS (placa, marca, modelo, year, id_cliente)
        VALUES 
            ('XYZ456', 'Honda', 'Civic', '2020', 1),
            ('LMN789', 'Ford', 'Focus', '2020', 2),
            ('TAC349', 'Toyota', 'Fortuner', '2008', 3),
            ('WES901', 'Toyota', '4runner', '2020', 4),
            ('ABX123', 'Nissan', 'Altima', '2019', 5),
            ('QWE456', 'Chevrolet', 'Malibu', '2017', 6),
            ('RTY789', 'Volkswagen', 'Jetta', '2021', 7),
            ('UIO112', 'Hyundai', 'Elantra', '2018', 8),
            ('PAS334', 'Kia', 'Sportage', '2016', 9),
            ('DFG556', 'BMW', 'X5', '2022', 1),
            ('GHJ778', 'Audi', 'A4', '2015', 2),
            ('KLM990', 'Mercedes-Benz', 'C-Class', '2014', 2),
            ('ZXC111', 'Mazda', 'CX-5', '2013', 5),
            ('VBN222', 'Subaru', 'Outback', '2020', 8);
        `);
    



export default client