import { Request, Response } from "express";
import ContactRepository from "../../repositories/contactRepository";

const contactRepository = new ContactRepository();

async function GetIDContactController(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id não foi informado." });
  }

  const contact = await contactRepository.getId(Number(id));

  if (!contact) {
    return res.status(404).json({ message: "Mensagem não encontrada!" });
  }

  return res.status(200).json(contact);
}

export default GetIDContactController;
