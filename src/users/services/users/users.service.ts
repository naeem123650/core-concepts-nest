import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserPayload } from 'src/users/interfaces';

@Injectable()
export class UsersService {
  private readonly users: UserPayload[] = [
    {
      id: 1,
      username: 'naeemv',
      email: 'naeemv@gmail.com',
      password: 'naeem123',
      age: 12,
    },
    {
      id: 2,
      username: 'tosifv',
      email: 'tosifv@gmail.com',
      password: 'tosif123',
      age: 13,
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUser(id: number) {
    let user = this.users.filter((user) => user.id === id);
    if (!user.length) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  createUser(userDetails) {
    const user = userDetails;
    this.users.push(user);
    return user;
  }

  updateUser(userDetails, id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    this.users[userIndex] = { ...this.users[userIndex], ...userDetails };
    return this.users[userIndex];
  }

  deleteUser(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const deleteUser = this.users.splice(userIndex, 1);
    return;
  }
}
