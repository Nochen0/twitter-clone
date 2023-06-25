import { Service } from "typedi"
import { PrismaService } from "../prisma/prisma.service"

@Service()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async find({ email, id }: Partial<{ email: string; id: string }>) {
    const user = await this.prismaService.user.findUnique({
      where: { email, id },
    })

    return user
  }

  async create({ email, username, password }: any) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        username,
        password,
      },
    })

    return user
  }
}
