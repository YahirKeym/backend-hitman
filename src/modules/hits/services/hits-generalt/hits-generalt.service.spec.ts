import { Test, TestingModule } from '@nestjs/testing';
import { HitsGeneraltService } from './hits-generalt.service';

describe('HitsGeneraltService', () => {
  let service: HitsGeneraltService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HitsGeneraltService],
    }).compile();

    service = module.get<HitsGeneraltService>(HitsGeneraltService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
