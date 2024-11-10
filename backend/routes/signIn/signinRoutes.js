import express from 'express'

const signInRouter = express.Router()

let clientes = [1, 2, 3]

signInRouter.post('/', (req, res) =>{
    console.log(req.body)
})


signInRouter.get('/', (req, res) =>{
    res.json(clientes)
})



export default signInRouter

