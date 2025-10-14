import express from "express";
import { ErrorHandling } from "./middlewares/error-handling";
import { routes } from "./routes";

const app = express()

//Diz ao Express para interpretar automaticamente o body das requisições HTTP no formato JSON.
app.use(express.json())

app.use(routes)
app.use(ErrorHandling)

export { app }
