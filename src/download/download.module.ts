import { Module } from '@nestjs/common';
import { DownloadImageService } from './download.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './schemas/image.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Image', schema: ImageSchema}]), 
    HttpModule
  ],
  providers: [DownloadImageService  ],
  exports: [DownloadImageService]
})
export class DownloadModule {}
