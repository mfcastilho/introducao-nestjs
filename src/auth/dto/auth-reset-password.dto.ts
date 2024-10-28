import { IsJWT, IsString, IsStrongPassword } from "class-validator";

export class AuthResetPasswordDTO {
  
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1
  })  
  password: string;

  @IsJWT()
  token: string;
}