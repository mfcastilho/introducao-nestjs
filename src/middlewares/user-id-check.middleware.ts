import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import {Request, Response, NextFunction} from 'express';
import { UserService } from "src/user/user.service";

@Injectable()
export class UserIdCheckMiddleware implements NestMiddleware{
  constructor(private readonly service: UserService) { }
  
  async use(req: Request, _res: Response, next: NextFunction) {
    const { id } = req.params;

    if (isNaN(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException('Invalid ID')
    }

    const userExists = await this.service.getOne(Number(id));

    if (!userExists) {
      throw new NotFoundException('User not found')
      // return res.status(400).json({ error: 'User not found' });
    }

    return next();
  }
}