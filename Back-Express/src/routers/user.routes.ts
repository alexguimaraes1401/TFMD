import { Router } from "express";
import CreateUserController from "../controllers/User/CreateUserController";
import LoginUserController from "../controllers/User/LoginUserController";

const UserRoutes = Router();

UserRoutes.post("/login", async (req, res) => {
  try {
    return await LoginUserController(req, res);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

UserRoutes.post("/register", async (req, res) => {
  try {
    return await CreateUserController(req, res);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default UserRoutes;
