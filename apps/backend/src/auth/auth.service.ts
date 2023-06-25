import { Service } from "typedi"
import { SignupDto } from "./dto/signup.dto"
import { UserRepository } from "../user/user.repository"
import * as bcrypt from "bcrypt"
import { JwtService } from "../jwt/jwt.service"
import { SigninDto } from "./dto/signin.dto"

@Service()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signin({ email, password }: SigninDto) {
    const user = await this.userRepository.find({ email })
    if (!user) throw new Error(`User not found for ${email}`)
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new Error("Invalid password")
    const token = this.jwtService.sign(user)
    return token
  }

  async signup({ email, username, password }: SignupDto) {
    const user = await this.userRepository.find({ email })

    if (user) throw new Error(`Email already in use for ${email}`)

    const newUser = await this.userRepository.create({
      email,
      username,
      password: await bcrypt.hash(password, 10),
    })
    const token = this.jwtService.sign(newUser)
    return token
  }
}
