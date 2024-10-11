import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create.user.dto";
import { PrismaService } from "src/configs/prisma/prisma.service";
import { UserRepository } from "src/repositories/user.repository";
import { UpdatePutUserDTO } from "./dto/update.put.user.dto";
import { UpdatePatchUserDTO } from "./dto/update.patch.user.dto";

@Injectable()
export class UserService {

  // constructor(private readonly userRepository: UserRepository) {}
  constructor(private readonly prisma: PrismaService) { }

  async create({name, email, password, birthAt }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        birthAt: true
      }
    });
  }

  async list() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        birthAt: true
      }
    });
  }

  async getOne(id: number) {
    // if (!(await this.prisma.user.findUnique({where: {id}}))) {
    //   throw new NotFoundException('User not found');
    // }

    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        birthAt: true
      }
    });
  }

  async update(id: number, { name, email, password, birthAt }: UpdatePutUserDTO) {
    // if (!(await this.getOne(id))) {
    //   throw new NotFoundException('User not found');
    // }

    if (!birthAt) {
      birthAt = null;
    }

    return this.prisma.user.update({
      where: { id },
      data: {name, email, password, birthAt},
      select: {
        id: true,
        name: true,
        email: true,
        birthAt: true
      }
    });
  }

  async updatePartial(id: number, { name, email, password, birthAt }: UpdatePatchUserDTO) {
    // if (!(await this.getOne(id))) {
    //   throw new NotFoundException('User not found');
    // }

    let data: any = {};

    if (name) {
      data.name = name;
    }

    if (email) {
      data.email = email;
    }

    if (password) {
      data.password = password;
    }

    if (birthAt) {
      data.birthAt = birthAt;
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        birthAt: true
      }
    });
  }

  async delete(id: number) {
    // if (!(await this.getOne(id))) {
    //   throw new NotFoundException('User not found');
    // }

    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        birthAt: true
      }
    });
  }
}