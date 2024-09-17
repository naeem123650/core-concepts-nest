import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from '../../services/users/users.service';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { CreateUserPipe } from 'src/users/pipes/create-user/create-user.pipe';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(@Req() req: Request, @Res() res: Response) {
    const users = this.userService.getAllUsers();

    res.json({
      success: true,
      data: users,
    });
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const user = this.userService.getUser(id);

    res.json({
      success: true,
      data: user,
    });
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createUser(
    @Body(CreateUserPipe) createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    let user = this.userService.createUser({
      id: this.userService.getAllUsers().length + 1,
      ...createUserDto,
    });
    res.json({
      success: true,
      data: user,
    });
  }

  @Patch(':id')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const updatedUser = this.userService.updateUser(updateUserDto, id);

    res.json({
      success: true,
      data: updatedUser,
    });
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    this.userService.deleteUser(id);

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  }
}
