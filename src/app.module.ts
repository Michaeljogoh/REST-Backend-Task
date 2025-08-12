import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DownloadModule } from './download/download.module';
import  Config  from './config/keys';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KModule } from './k/k.module';

@Module({
  imports: [UserModule, DownloadModule, MongooseModule.forRoot(Config.MongoURI), KModule],
  controllers:[AppController],
  providers:[AppService]
})

export class AppModule {}
