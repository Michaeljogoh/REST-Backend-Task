import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KService } from './k.service';
import { CreateKDto } from './dto/create-k.dto';
import { UpdateKDto } from './dto/update-k.dto';

@Controller('k')
export class KController {
  constructor(private readonly kService: KService) {}

  @Post()
  create(@Body() createKDto: CreateKDto) {
    return this.kService.create(createKDto);
  }

  @Get()
  findAll() {
    return this.kService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKDto: UpdateKDto) {
    return this.kService.update(+id, updateKDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kService.remove(+id);
  }
}
