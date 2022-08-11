import { Test, TestingModule } from '@nestjs/testing';
import { UsersGeneralService } from './users-general.service';

describe('UsersGeneralService', () => {
  let service: UsersGeneralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersGeneralService],
    }).compile();

    service = module.get<UsersGeneralService>(UsersGeneralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
