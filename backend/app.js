import express, { json ,} from 'express';
import clientesRouter from "./routes/clientes/clientesRoutes.js"
import mecanicosRouter from "./routes/mecanicos/mecanicosRoutes.js"
import reparacionesRouter from "./routes/reparaciones/reparacionesRoutes.js"
import vehiculosRouter from "./routes/vehiculos/vehiculosRoutes.js"

import signInRouter from './routes/signIn/signinRoutes.js';

const app = express()
const PORT = process.env.PORT || 3000


app.use(json())

app.use('/signIn', signInRouter)
app.use('/clientes', clientesRouter)
app.use('/mecanicos', mecanicosRouter)
app.use('/vehiculos', vehiculosRouter)
app.use('/reparaciones', reparacionesRouter)



app.use(express.static("frontend"))

app.listen(PORT ,()=>{
  console.log(`Server is running on port http://localhost:${PORT}`)
})

