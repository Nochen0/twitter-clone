import { Args, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"
import { SignupDto } from "./dto/signup.dto"
import { AuthService } from "./auth.service"
import { SigninDto } from "./dto/signin.dto"

@Service()
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  async signin(@Args() signinData: SigninDto) {
    const token = await this.authService.signin(signinData)
    return token
  }

  @Mutation(() => String)
  async signup(@Args() signupData: SignupDto) {
    const token = await this.authService.signup(signupData)
    return token
  }
}
