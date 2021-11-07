import { Test, TestingModule } from '@nestjs/testing';
import { ActivityAdvertisementService } from './activityAdvertisement.service';

describe('ActivityAdvertisementService', () => {
  let service: ActivityAdvertisementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityAdvertisementService],
    }).compile();

    service = module.get<ActivityAdvertisementService>(ActivityAdvertisementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
