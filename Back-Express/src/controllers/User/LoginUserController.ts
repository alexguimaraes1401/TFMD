import { Request, Response } from "express";
import bcrypt, { genSalt } from "bcrypt";
import UserRepository from "../../repositories/userRepository";
import { generateToken } from "../../utils/token";

const userRepository = new UserRepository();

async function LoginUserController(req: Request, res: Response) {
  const { name, senha } = req.body;

  if (!name && !senha) {
    return res
      .status(400)
      .json({ message: "Todos os parametros são obrigatórios." });
  }

  let userVer = await userRepository.getParam({
    name,
  });
  const password = await bcrypt.compare(senha, userVer?.password || "");

  if (userVer && password) {
    const token = generateToken({
      user: name,
      create: Date.now(),
    });
    userVer.token = token;

    await userRepository.update(userVer);

    return res.status(201).json({ token: token });
  }
  return res.status(400).json({ message: "Usuário ou senha incorreta." });
}

export default LoginUserController;
