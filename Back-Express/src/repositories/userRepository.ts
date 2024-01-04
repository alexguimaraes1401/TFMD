import prismaClient from "../utils/prismaConfig";
import { User } from "@prisma/client";

interface UserInterface {
  id?: number;
  name: string;
  password: string;
  token: string;
  adm: number;
}
interface UserInterfaceParams {
  id?: number;
  name?: string;
  password?: string;
  token?: string;
  adm?: number;
}

const userDB = prismaClient.user;

class UserRepository {
  async getAll() {
    const result = await userDB.findMany();

    return result;
  }

  async getId(id: number) {
    const result = await userDB.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async getParam(user: UserInterfaceParams) {
    const result = await userDB.findFirst({
      where: user,
    });

    return result;
  }

  async create(user: UserInterface) {
    const result = await userDB.create({
      data: user,
    });

    return result;
  }

  async update(user: User) {
    const result = await userDB.update({
      where: {
        id: user.id,
      },
      data: user,
    });

    return result;
  }

  async delete(id: number) {
    const result = await userDB.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default UserRepository;
