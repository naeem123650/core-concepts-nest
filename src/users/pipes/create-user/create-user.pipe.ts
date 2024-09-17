import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    return { ...value, age: parseInt(value.age.toString()) };
  }
}
