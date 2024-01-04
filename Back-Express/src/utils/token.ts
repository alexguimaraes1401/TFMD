import environment from "./environment";
import JWT from "jsonwebtoken";

interface tokenInterface {
  user: string;
  create: number;
}

const generateToken = (infs: tokenInterface) => {
  return JWT.sign(infs, environment.jwtSecret, {
    expiresIn: "30d",
  });
};

export { generateToken };
