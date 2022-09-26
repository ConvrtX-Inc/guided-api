import { Test, TestingModule } from '@nestjs/testing';
import { ActivityAdvertisementImageService } from './activity-advertisement-image.service';

describe('ActivityAdvertisementImageService', () => {
  let service: ActivityAdvertisementImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityAdvertisementImageService],
    }).compile();

    service = module.get<ActivityAdvertisementImageService>(
      ActivityAdvertisementImageService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
