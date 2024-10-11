import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UpdatePutUserDTO } from "./dto/update.put.user.dto";
import { UpdatePatchUserDTO } from "./dto/update.patch.user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

  constructor(private readonly service: UserService) { }

  @Post()
  async create(@Body() { email, name, password, birthAt }: CreateUserDTO) {
    const userCreated = await this.service.create({ name, email, password, birthAt });

    return { statusCode: 201, data: userCreated };
  }

  @Get()
  async getAll() {
    const users = await this.service.list();

    return { statusCode: 200, data: users };
  }

  @Get(':id')
  // async getOne(@Param('id', ParseIntPipe) id: number) {
  async getOne(@ParamId() id: number) {
    const user = await this.service.getOne(id);

    return { statusCode: 200, data: user };
  }

  @Put(':id')
  async update(@Body() { email, name, password, birthAt }: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
    const userUpdated = await this.service.update(id, { email, name, password, birthAt });
    return {
      statusCode: 200,
      data: userUpdated
    };
  }

  @Patch(':id')
  async updatePartial(@Body() { email, name, password, birthAt }: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
    const userUpdated = await this.service.updatePartial(id, { email, name, password, birthAt });
    return {
      statusCode: 200,
      data: userUpdated
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const userDeleted = await this.service.delete(id);

    return {
      statusCode: 200,
      data: userDeleted
    }
  }
}