import prismaClient from "../utils/prismaConfig";
import { Contact } from "@prisma/client";

interface ContactInterface {
  id?: number;
  name: string;
  email: string;
  message: string;
}

const contactDB = prismaClient.contact;

class ContactRepository {
  async getAll() {
    const result = await contactDB.findMany();

    return result;
  }

  async getId(id: number) {
    const result = await contactDB.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(contact: ContactInterface) {
    const result = await contactDB.create({
      data: contact,
    });

    return result;
  }

  async update(contact: Contact) {
    const result = await contactDB.update({
      where: {
        id: contact.id,
      },
      data: contact,
    });

    return result;
  }

  async delete(id: number) {
    const result = await contactDB.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default ContactRepository;
