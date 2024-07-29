import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly rabbitMQService: RabbitMQService) {}

// Create User
@Post()
create(@Body() createUserDto: CreateUserDto) {
this.rabbitMQService.sendNotification(createUserDto)
return this.userService.create(createUserDto);
}
// Retrieve Data 
@Get(':userId')
findById(@Param('userId') userId: number) {
  return this.userService.findById(userId);
}

// Retrieve Avatar
@Get(':userId/avatar')
retrieveAvatar(@Param('userId') userId: number) {
  return this.userService.retrieveAvatar(userId);
}

// Delete Avatar
@Delete(':userId/avatar')
deleteAvatar(@Param('userId') userId: number) {
  return this.userService.deleteAvatar(userId);
}

// Delete all user from DB
@Delete()
deleteAll(){
  return this.userService.deleteAll()
}


}
