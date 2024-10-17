import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma/prisma.service";
import { CreateUserDTO } from "src/user/dto/create.user.dto";
import { UpdatePutUserDTO } from "src/user/dto/update.put.user.dto";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.user.findMany();
  }

}