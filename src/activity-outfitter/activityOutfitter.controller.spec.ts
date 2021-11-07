import { Test, TestingModule } from '@nestjs/testing';
import { ActivityOutfitterController } from './activityOutfitter.controller';
import { ActivityOutfitterService } from './activityOutfitter.service';

describe('ActivityOutfitterController', () => {
  let controller: ActivityOutfitterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityOutfitterController],
      providers: [ActivityOutfitterService],
    }).compile();

    controller = module.get<ActivityOutfitterController>(ActivityOutfitterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
