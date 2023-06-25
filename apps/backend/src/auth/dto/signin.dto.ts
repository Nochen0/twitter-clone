import { IsEmail, IsString } from "class-validator"
import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class SigninDto {
  @IsEmail()
  @Field()
  email!: string

  @IsString()
  @Field()
  password!: string
}
