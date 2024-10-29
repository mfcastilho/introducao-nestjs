import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/configs/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) { }

  async createToken() {
    //return this.jwtService.sign(payload);
  }

  async checkToken() {
    //return this.jwtService.verify(token);
  }

  async login(email: string, password: string) {
    const userLogged = await this.prisma.user.findFirst({
      where: {
        email,
        password
      }
    });

    if (!userLogged) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return userLogged;
  }
  
  async forgetPassword(email: string) { }
  
  async resetPassword(password: string) { }
}