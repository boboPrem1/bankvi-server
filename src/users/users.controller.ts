import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/auth')
  async auth(@Body() authParams): Promise<{} | null> {
    return await this.usersService.loginOne(authParams.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<{}> {
    return await this.usersService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Param() param): Promise<{}> {
    return await this.usersService.findOne(param.id);
  }
  
  @Post()
  async createUser(@Body() registerParams): Promise<{}> {
    return await this.usersService.create(registerParams);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async updateUser(@Body() updateParams, @Param() params): Promise<{}> {
    return await this.usersService.update(updateParams, params.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/delete')
  async deleteUser(@Param() params): Promise<{}> {
    return await this.usersService.delete(params.id);
  }
}
