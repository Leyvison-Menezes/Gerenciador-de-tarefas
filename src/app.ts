import express from "express";

const app = express()

//Diz ao Express para interpretar automaticamente o body das requisições HTTP no formato JSON.
app.use(express.json())

export { app }
