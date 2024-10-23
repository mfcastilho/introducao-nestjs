import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/configs/prisma/prisma.module";

@Module({
  imports: [
    JwtModule.register({
    secret: 'Mr6HAl["UkuPzPkbx3B<"9:@.NL:~=}&'
    }),
    UserModule,
    PrismaModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}