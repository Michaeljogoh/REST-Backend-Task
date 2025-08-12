import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DownloadModule } from './download/download.module';
import  Config  from './config/keys';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [UserModule, DownloadModule, MongooseModule.forRoot(Config.MongoURI)],
  controllers:[AppController],
  providers:[AppService]
})

export class AppModule {}
