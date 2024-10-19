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

  async findByPk(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });
  }

  async findOne(key: string, value: string) {
    if (key === 'email') {
      return await this.prisma.user.findFirst({
        where: { email: value },
        select: {
          id: true,
          name: true,
          email: true,
        }
      });
    }

    if (key === 'id') {
      return await this.prisma.user.findFirst({
        where: { id: Number(value) },
        select: {
          id: true,
          name: true,
          email: true,
        }
      });
    }
  }
}