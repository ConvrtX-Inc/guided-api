import { Test, TestingModule } from '@nestjs/testing';
import { ActivityOutfitterService } from './activityOutfitter.service';

describe('ActivityOutfitterService', () => {
  let service: ActivityOutfitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityOutfitterService],
    }).compile();

    service = module.get<ActivityOutfitterService>(ActivityOutfitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
