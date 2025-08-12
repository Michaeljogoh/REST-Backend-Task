import { Module } from '@nestjs/common';
import { KService } from './k.service';
import { KController } from './k.controller';

@Module({
  controllers: [KController],
  providers: [KService],
})
export class KModule {}
