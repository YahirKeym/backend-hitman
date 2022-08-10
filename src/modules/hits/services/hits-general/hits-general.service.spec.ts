import { Test, TestingModule } from '@nestjs/testing';
import { HitsGeneralService } from './hits-general.service';

describe('HitsGeneralService', () => {
  let service: HitsGeneralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HitsGeneralService],
    }).compile();

    service = module.get<HitsGeneralService>(HitsGeneralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
