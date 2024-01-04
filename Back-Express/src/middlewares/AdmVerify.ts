import UserRepository from "../repositories/userRepository";

const userRepository = new UserRepository();

async function AdmVerify(request: any, response: any, next: any) {
  const authToken = request.headers.authorization;
  const [, token] = authToken.split(" ");
  try {
    const user = await userRepository.getParam({ token: token });
    if (user?.adm === 1) {
      return next()
    };
    return response.status(401).json({
      message: "É necessário que o usuário tenha permissão de administrador.",
    });
  } catch (error) {
    return response.status(500).json({
      message: error,
    });
  }
}

export default AdmVerify;
