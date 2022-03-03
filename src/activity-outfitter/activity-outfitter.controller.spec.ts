import { Test, TestingModule } from '@nestjs/testing';
import { ActivityOutfitterController } from './activity-outfitter.controller';
import { ActivityOutfitterService } from './activity-outfitter.service';

describe('ActivityOutfitterController', () => {
  let controller: ActivityOutfitterController;
  let spyService: ActivityOutfitterService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ActivityOutfitterService,
      useFactory: () => ({
        approvedActivityOutfitter: jest.fn(() => { }),
        rejectActivityOutfitter: jest.fn(() => { })
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityOutfitterController],
      providers: [ActivityOutfitterService, ApiServiceProvider],
    }).compile();

    controller = module.get<ActivityOutfitterController>(ActivityOutfitterController);
    spyService = module.get<ActivityOutfitterService>(ActivityOutfitterService);
  });

  it('calling approvedActivityOutfitter method', () => {
    const id = "6952bcec-d3eb-4ffa-b8a1-9cc64f3f5f9b";

    controller.approvedActivityOutfitter(id);

    expect(spyService.approvedActivityOutfitter).toHaveBeenCalled();
  });

  it('calling rejectActivityOutfitter method', () => {
    const id = "6952bcec-d3eb-4ffa-b8a1-9cc64f3f5f9b";

    controller.rejectActivityOutfitter(id);

    expect(spyService.rejectActivityOutfitter).toHaveBeenCalled();
  });
});