import { verify } from "jsonwebtoken";
import environment from "../utils/environment";
import UserRepository from "../repositories/userRepository";

const userRepository = new UserRepository();

async function JWT(request: any, response: any, next: any) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).json({ message: "Token não informado" });
  }
  const [, token] = authToken.split(" ");
  try {
    verify(token, environment.jwtSecret);
    await userRepository.getParam({ token: token });
    next();
  } catch (error) {
    return response.status(401).json({ message: "Token Inválido" });
  }
}

export default JWT;
