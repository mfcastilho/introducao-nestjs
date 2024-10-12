import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'invalid email format' })
  email: string;

  @IsOptional()
  @IsDateString()  
  birthAt: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  }, { message: 'The password needs at least 6 characters' })
  password: string;
}