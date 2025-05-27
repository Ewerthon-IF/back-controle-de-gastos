import { Test, TestingModule } from '@nestjs/testing';
import { RevendaService } from './revenda.service';

describe('RevendaService', () => {
  let service: RevendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevendaService],
    }).compile();

    service = module.get<RevendaService>(RevendaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
