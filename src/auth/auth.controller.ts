import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.to";
import { AuthForgetPasswordDTO } from "./dto/auth-forget-password.dto";
import { AuthResetPasswordDTO } from "./dto/auth-reset-password.dto";
import { UserService } from "src/user/user.service";

@Controller('auth')
export class AuthController {

  constructor(private readonly service: UserService) {}
  
  @Post('login')
  async login(@Body() body: AuthLoginDTO) { }
  
  @Post('register')
  async register(@Body() body: AuthRegisterDTO) { 
    const userRegistered = await this.service.create(body);

    return {statusCode: 201, data: userRegistered}
  }

  @Post('forget-password')
  async forgetPassword(@Body() body: AuthForgetPasswordDTO) { }

  @Post('reset-password')
  async resetPassword(@Body() body: AuthResetPasswordDTO) {

  }
}