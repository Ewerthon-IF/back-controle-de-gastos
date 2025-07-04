import { Test, TestingModule } from '@nestjs/testing';
import { RevendasService } from './revenda.service';

describe('RevendasService', () => {
  let service: RevendasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevendasService],
    }).compile();

    service = module.get<RevendasService>(RevendasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
