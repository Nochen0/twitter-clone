import { User } from "@prisma/client"
import { Service } from "typedi"
import * as jwt from "jsonwebtoken"

@Service()
export class JwtService {
  sign(user: User) {
    const { password, ...rest } = user
    return jwt.sign(rest, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    })
  }
}
