import { Test, TestingModule } from '@nestjs/testing';
import { ActivityAdvertisementImageController } from './activity-advertisement-image.controller';
import { ActivityAdvertisementImageService } from './activity-advertisement-image.service';

describe('ActivityAdvertisementImageController', () => {
  let controller: ActivityAdvertisementImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityAdvertisementImageController],
      providers: [ActivityAdvertisementImageService],
    }).compile();

    controller = module.get<ActivityAdvertisementImageController>(
      ActivityAdvertisementImageController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
