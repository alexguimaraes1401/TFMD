import { Request, Response } from "express";
import ContactRepository from "../../repositories/contactRepository";

const contactRepository = new ContactRepository();

async function CreateContactController(req: Request, res: Response) {
  const { email, message, name } = req.body;
  console.log(req.body)

  if (!email && !message && !name) {
    return res
      .status(400)
      .json({ message: "Todos os parametros são obrigatórios." });
  }

  await contactRepository.create({
    email,
    message,
    name,
  });

  return res.status(201).json({ message: "Mensagem enviada com sucesso!" });
}

export default CreateContactController;
