import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [UserDto],
  })
  // add addional ApiReponse for errors, etc..
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'cursor', required: false, type: Number })
  async getUsers(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: Prisma.UserWhereInput,
    @Query('orderBy') orderBy?: Prisma.UserOrderByWithRelationInput,
  ) {
    return this.usersService.users({
      skip: skip ? +skip : undefined,
      take: take ? +take : undefined,
      cursor: cursor ? { id: +cursor } : undefined,
      where,
      orderBy,
    });
  }

  // Get single user by id
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.user({ id: +id });
  }

  // Create a new user
  @Post()
  @ApiResponse({ status: 201, description: 'User created.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Update a user by id
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser({
      where: { id: +id },
      data: updateUserDto,
    });
  }

  // Delete a user by id
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser({ id: +id });
  }
}

// Using 'nest g resource users' created these for me, I didn't do any
// unnecessary extra work. In general, I don't code what is not asked of me
// and/or what is not needed for good efficiency and time management.
