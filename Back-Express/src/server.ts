// Configuração das variaveis de ambiente
/* 
    Obs: O import envitoment usa as variaveis de ambiente,
    por isso o dotenv precisa ser executado antes mesmo dos imports
*/
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Routers from "./routers";
import environment from "./utils/environment";
import cors from "cors";

// Configuração do server
const api = express();

api.use(express.json());
api.use(cors())
api.get("", (_, res) => {
  res.status(200).send("Servidor Nodejs Express");
});
api.use("/api", Routers);

// Iniciação do servidor
api.listen(environment.port, () => {
  console.log(`Server running on port http://localhost:${environment.port}`);
});
