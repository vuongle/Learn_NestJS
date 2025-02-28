import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@Roles(Role.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard) // active the guard to protect this route
  getProfile(@Request() req) {
    return this.userService.findOne(req.user.id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  // @SetMetadata('role', [Role.ADMIN]) // an example of using built-in decorator to set role for an api
  @Roles(Role.ADMIN) // instead of using built-in decorator, use a custom decorator
  @UseGuards(RolesGuard) // use RolesGuard to check roles allowed for this route or not
  @UseGuards(JwtAuthGuard) // use JwtAuthGuard here to extract jwt in header and append it to user object in the request. JwtAuthGuard must be closer the route than RolesGuard
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
