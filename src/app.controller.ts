import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const response = this.appService.getHello();

    return response;
  }

  @Post()
  insertData(): string {
    return this.appService.insertData();
  }
}
