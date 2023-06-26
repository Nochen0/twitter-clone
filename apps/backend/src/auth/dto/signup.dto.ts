import { IsEmail, Length } from "class-validator"
import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class SignupArgs {
  @Field()
  @IsEmail()
  email!: string

  @Field()
  @Length(2, 50)
  username!: string

  @Field()
  @Length(5, 20)
  password!: string
}
