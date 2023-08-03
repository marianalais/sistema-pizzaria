import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    //Verificar se esse email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("User/passward incorrect");
    }

    //Verificar se a senha está correta
    const passwardMatch = await compare(password, user.password);
    if (!passwardMatch) {
      throw new Error("User/passward incorrect");
    }

    //Gerar um token JWT e devolver os dados do usuario como id, name e email

    return { ok: true };
  }
}

export { AuthUserService };
