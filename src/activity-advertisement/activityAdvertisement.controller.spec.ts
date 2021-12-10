import { Test, TestingModule } from '@nestjs/testing';
import { ActivityAdvertisementController } from './activityAdvertisement.controller';
import { ActivityAdvertisementService } from './activityAdvertisement.service';

describe('ActivityAdvertisementController', () => {
  let controller: ActivityAdvertisementController;
  let spyService: ActivityAdvertisementService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ActivityAdvertisementService,
      useFactory: () => ({
        findOneEntity: jest.fn(() => []),
        findManyEntities: jest.fn(() => []),
        saveEntity: jest.fn(() => []),
        softDelete: jest.fn(() => []),
        approvedActivityAdvertisement: jest.fn(() => { }),
        rejectActivityAdvertisement: jest.fn(() => { })
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityAdvertisementController],
      providers: [ActivityAdvertisementService, ApiServiceProvider],
    }).compile();

    controller = module.get<ActivityAdvertisementController>(ActivityAdvertisementController);
    spyService = module.get<ActivityAdvertisementService>(ActivityAdvertisementService);
  })

  it('calling approvedActivityAdvertisement method', () => {
    const id = "6952bcec-d3eb-4ffa-b8a1-9cc64f3f5f9b";
    
    controller.approvedActivityAdvertisement(id);

    expect(spyService.approvedActivityAdvertisement).toHaveBeenCalled();
  });

  it('calling rejectActivityAdvertisement method', () => {
    const id = "6952bcec-d3eb-4ffa-b8a1-9cc64f3f5f9b";

    controller.rejectActivityAdvertisement(id);

    expect(spyService.rejectActivityAdvertisement).toHaveBeenCalled();
  });
});
