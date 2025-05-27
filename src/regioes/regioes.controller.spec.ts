import { Test, TestingModule } from '@nestjs/testing';
import { RegioesController } from './regioes.controller';

describe('RegioesController', () => {
  let controller: RegioesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegioesController],
    }).compile();

    controller = module.get<RegioesController>(RegioesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
