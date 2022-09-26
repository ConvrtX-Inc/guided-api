import { Test, TestingModule } from '@nestjs/testing';
import { ActivityOutfitterService } from './activity-outfitter.service';

class ActivityOutfitterServiceMock {
  approvedActivityOutfitter(id: string) {}

  rejectActivityOutfitter(id: string) {}
}

describe('ActivityOutfitterService', () => {
  let service: ActivityOutfitterService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ActivityOutfitterService,
      useClass: ActivityOutfitterServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityOutfitterService, ApiServiceProvider],
    }).compile();

    service = module.get<ActivityOutfitterService>(ActivityOutfitterService);
  });

  it('call approvedActivityAdvertisement', async () => {
    const approvedActivityAdvertisementSpy = jest.spyOn(
      service,
      'approvedActivityOutfitter',
    );
    const id = 'dd1231ce-e6fe-4f61-ad22-239da9bd1b76';

    service.approvedActivityOutfitter(id);

    expect(approvedActivityAdvertisementSpy).toHaveBeenCalled();
  });

  it('call rejectActivityAdvertisement', () => {
    const rejectActivityAdvertisementSpy = jest.spyOn(
      service,
      'rejectActivityOutfitter',
    );
    const id = 'dd1231ce-e6fe-4f61-ad22-239da9bd1b76';

    service.rejectActivityOutfitter(id);

    expect(rejectActivityAdvertisementSpy).toHaveBeenCalled();
  });
});
