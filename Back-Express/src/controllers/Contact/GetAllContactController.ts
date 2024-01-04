import { Request, Response } from "express";
import ContactRepository from "../../repositories/contactRepository";

const contactRepository = new ContactRepository();

async function GetAllContactController(req: Request, res: Response) {
  const contacts = await contactRepository.getAll();

  return res.status(200).json(contacts);
}

export default GetAllContactController;
