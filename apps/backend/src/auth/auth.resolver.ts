import { Args, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"
import { SignupDto } from "./dto/signup.dto"
import { AuthService } from "./auth.service"
import { SigninDto } from "./dto/signin.dto"
import { GraphQLContext } from "../types/graphql-context.type"

@Service()
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  async signin(
    @Args() signinData: SigninDto,
    @Ctx() { reply }: GraphQLContext
  ) {
    const token = await this.authService.signin(signinData)
    reply.setCookie("userJwt", token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    })
    return token
  }

  @Mutation(() => String)
  async signup(
    @Args() signupData: SignupDto,
    @Ctx() { reply }: GraphQLContext
  ) {
    const token = await this.authService.signup(signupData)
    reply.setCookie("userJwt", token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    })
    return token
  }

  @Query(() => Boolean)
  signout(@Ctx() { reply }: GraphQLContext) {
    reply.clearCookie("userJwt")
    return true
  }
}
