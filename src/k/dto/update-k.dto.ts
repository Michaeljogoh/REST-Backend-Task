import { PartialType } from '@nestjs/mapped-types';
import { CreateKDto } from './create-k.dto';

export class UpdateKDto extends PartialType(CreateKDto) {}
