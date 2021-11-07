import { Test, TestingModule } from '@nestjs/testing';
import { ActivityAdvertisementController } from './activityAdvertisement.controller';
import { ActivityAdvertisementService } from './activityAdvertisement.service';

describe('ActivityAdvertisementController', () => {
  let controller: ActivityAdvertisementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityAdvertisementController],
      providers: [ActivityAdvertisementService],
    }).compile();

    controller = module.get<ActivityAdvertisementController>(ActivityAdvertisementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
