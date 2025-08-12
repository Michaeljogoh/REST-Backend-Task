import { Injectable } from '@nestjs/common';
import { CreateKDto } from './dto/create-k.dto';
import { UpdateKDto } from './dto/update-k.dto';

@Injectable()
export class KService {
  create(createKDto: CreateKDto) {
    return 'This action adds a new k';
  }

  findAll() {
    return `This action returns all k`;
  }

  findOne(id: number) {
    return `This action returns a #${id} k`;
  }

  update(id: number, updateKDto: UpdateKDto) {
    return `This action updates a #${id} k`;
  }

  remove(id: number) {
    return `This action removes a #${id} k`;
  }
}
