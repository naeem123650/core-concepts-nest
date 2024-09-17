import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;
    if (!token)
      throw new HttpException(
        'authorization token needed',
        HttpStatus.UNAUTHORIZED,
      );

    if (token !== 'heytoken') {
      throw new HttpException(
        'Please provide valid token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  }
}
