// Rotas

import { Router } from "express";
import ContactRoutes from "./contact.routes";
import UserRoutes from "./user.routes";

const Routers = Router();

Routers.use("/user", UserRoutes);
Routers.use("/contact", ContactRoutes);

export default Routers;
