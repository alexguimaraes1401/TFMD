import { Request, Response } from "express";
import bcrypt, { genSalt } from "bcrypt";
import UserRepository from "../../repositories/userRepository";
import { generateToken } from "../../utils/token";

const userRepository = new UserRepository();

async function CreateUserController(req: Request, res: Response) {
  const { name, senha } = req.body;

  if (!name && !senha) {
    return res
      .status(400)
      .json({ message: "Todos os parametros são obrigatórios." });
  }

  const userVer = await userRepository.getParam({
    name,
  });

  if (userVer) {
    return res.status(400).json({ message: "Esse usuário já foi cadastrado." });
  }

  const salt = await genSalt(12);
  const password = await bcrypt.hash(senha, salt);
  const token = generateToken({
    user: name,
    create: Date.now(),
  });
  await userRepository.create({
    name: name,
    password: password,
    adm: 0,
    token: token,
  });

  return res.status(201).json({ token });
}

export default CreateUserController;
