import { Query, Resolver } from "type-graphql"
import { Service } from "typedi"

@Service()
@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "Hello World"
  }
}
