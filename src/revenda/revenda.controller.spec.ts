import { Test, TestingModule } from '@nestjs/testing';
import { RevendaController } from './revenda.controller';

describe('RevendaController', () => {
  let controller: RevendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevendaController],
    }).compile();

    controller = module.get<RevendaController>(RevendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
