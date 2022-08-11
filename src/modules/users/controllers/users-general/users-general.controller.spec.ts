import { Test, TestingModule } from '@nestjs/testing';
import { UsersGeneralController } from './users-general.controller';

describe('UsersGeneralController', () => {
  let controller: UsersGeneralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersGeneralController],
    }).compile();

    controller = module.get<UsersGeneralController>(UsersGeneralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
