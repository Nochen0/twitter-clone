import { IsEmail, IsString } from "class-validator"
import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class SignupDto {
  @IsEmail()
  @Field()
  email!: string

  @IsString()
  @Field()
  username!: string

  @IsString()
  @Field()
  password!: string
}
