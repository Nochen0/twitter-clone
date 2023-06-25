import { Query, Resolver } from "type-graphql"
import { Service } from "typedi"

@Service()
@Resolver()
export class AuthResolver {
  @Query(() => String)
  hello() {
    return "Hello"
  }
}
