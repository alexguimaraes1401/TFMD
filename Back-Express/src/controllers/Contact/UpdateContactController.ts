import { Request, Response } from "express";
import ContactRepository from "../../repositories/contactRepository";

const contactRepository = new ContactRepository();

async function UpdateContactController(req: Request, res: Response) {
  const { id, email, message, name } = req.body;

  if (!id && !email && !message && !name) {
    return res
      .status(400)
      .json({ message: "Todos os parametros são obrigatórios." });
  }

  const contact = await contactRepository.getId(id);

  if (!contact) {
    return res.status(404).json({ message: "Mensagem não encontrada." });
  } else {
    await contactRepository.update({
      id,
      email,
      message,
      name,
    });

    return res.status(201).json({ message: "Mensagem alterada com sucesso!" });
  }
}

export default UpdateContactController;
