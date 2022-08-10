import { Test, TestingModule } from '@nestjs/testing';
import { HitsGeneralController } from './hits-general.controller';

describe('HitsGeneralController', () => {
  let controller: HitsGeneralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HitsGeneralController],
    }).compile();

    controller = module.get<HitsGeneralController>(HitsGeneralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
