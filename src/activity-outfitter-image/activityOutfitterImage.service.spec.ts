import { Test, TestingModule } from '@nestjs/testing';
import { ActivityOutfitterImageService } from './activityOutfitterImage.service';

describe('ActivityOutfitterImageService', () => {
  let service: ActivityOutfitterImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityOutfitterImageService],
    }).compile();

    service = module.get<ActivityOutfitterImageService>(ActivityOutfitterImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
