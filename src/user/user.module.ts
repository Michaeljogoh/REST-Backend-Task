import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { DataInitializerService } from './data/data-initializer.service';  
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { HttpModule } from '@nestjs/axios';
import { DownloadModule } from '../download/download.module';




@Module({
  imports:[
  MongooseModule.forFeature([{name:'User', schema: UserSchema}]), 
  HttpModule,
  DownloadModule
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    DataInitializerService, 
    RabbitMQService, 
  ],
})

export class UserModule {}
