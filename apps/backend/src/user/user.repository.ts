import { Service } from "typedi"
import { PrismaService } from "../prisma/prisma.service"

@Service()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}
}
