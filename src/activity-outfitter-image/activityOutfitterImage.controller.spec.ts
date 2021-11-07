import { Test, TestingModule } from '@nestjs/testing';
import { ActivityOutfitterImageController } from './activityOutfitterImage.controller';
import { ActivityOutfitterImageService } from './activityOutfitterImage.service';

describe('ActivityOutfitterImageController', () => {
  let controller: ActivityOutfitterImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityOutfitterImageController],
      providers: [ActivityOutfitterImageService],
    }).compile();

    controller = module.get<ActivityOutfitterImageController>(ActivityOutfitterImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
