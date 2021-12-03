import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRelatedController } from './dashboard-related.controller';

describe('DashboardRelatedController', () => {
  let controller: DashboardRelatedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardRelatedController],
    }).compile();

    controller = module.get<DashboardRelatedController>(DashboardRelatedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
