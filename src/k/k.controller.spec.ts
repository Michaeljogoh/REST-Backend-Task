import { Test, TestingModule } from '@nestjs/testing';
import { KController } from './k.controller';
import { KService } from './k.service';

describe('KController', () => {
  let controller: KController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KController],
      providers: [KService],
    }).compile();

    controller = module.get<KController>(KController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
