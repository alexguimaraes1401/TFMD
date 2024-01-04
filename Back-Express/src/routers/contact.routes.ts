import { Router } from "express";
import CreateContactController from "../controllers/Contact/CreateContactController";
import DeleteContactController from "../controllers/Contact/DeleteContactController";
import GetAllContactController from "../controllers/Contact/GetAllContactController";
import GetIDContactController from "../controllers/Contact/GetIDContactController";
import UpdateContactController from "../controllers/Contact/UpdateContactController";
import AdmVerify from "../middlewares/AdmVerify";
import JWT from "../middlewares/JWT";

const ContactRoutes = Router();

ContactRoutes.get("/", JWT, async (req, res) => {
  try {
    return await GetAllContactController(req, res);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

ContactRoutes.get("/:id", JWT, async (req, res) => {
  try {
    return await GetIDContactController(req, res);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

ContactRoutes.post("/", async (req, res) => {
  try {
    return await CreateContactController(req, res);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

ContactRoutes.put("/", JWT, AdmVerify, async (req, res) => {
  try {
    return await UpdateContactController(req, res);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

ContactRoutes.delete("/:id", JWT, AdmVerify, async (req, res) => {
  try {
    return await DeleteContactController(req, res);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default ContactRoutes;
