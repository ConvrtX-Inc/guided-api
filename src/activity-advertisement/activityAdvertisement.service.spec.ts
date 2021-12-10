import { Test, TestingModule } from '@nestjs/testing';
import { FindOptions } from 'src/utils/types/find-options.type';
import { ActivityAdvertisementService } from './activityAdvertisement.service';
import { ActivityAdvertisement } from './entities/activityAdvertisement.entity';

const oneActivityAdvertisement = {
  id: 'dd1231ce-e6fe-4f61-ad22-239da9bd1b76',
  user_id: '6952bcec-d3eb-4ffa-b8a1-9cc64f3f5f9b',
  title: 'Amazing Deal Here!',
  country: 'USA',
  address: "{}",
  ad_date: new Date(),
  description: 'One in a life time discount on quality products',
  price: 5000,
  is_published: false,
  created_date: new Date(),
  updated_date: new Date(),
  deletedAt: null
} as ActivityAdvertisement;

class ActivityAdvertisementServiceMock {
  findOneEntity(options: FindOptions<ActivityAdvertisement>) {
    return oneActivityAdvertisement;
  }

  approvedActivityAdvertisement(id: string) {

  }

  rejectActivityAdvertisement(id: string) {

  }
}

describe('ActivityAdvertisementService', () => {
  let activityAdvertisementService: ActivityAdvertisementService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ActivityAdvertisementService,
      useClass: ActivityAdvertisementServiceMock
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityAdvertisementService, ApiServiceProvider],
    }).compile();

    activityAdvertisementService = module.get<ActivityAdvertisementService>(ActivityAdvertisementService);
  });

  it('call approvedActivityAdvertisement', async () => {
    const approvedActivityAdvertisementSpy = jest.spyOn(activityAdvertisementService, 'approvedActivityAdvertisement');
    const id = 'dd1231ce-e6fe-4f61-ad22-239da9bd1b76';

    activityAdvertisementService.approvedActivityAdvertisement(id)

    expect(approvedActivityAdvertisementSpy).toHaveBeenCalled();
  });

  it('call rejectActivityAdvertisement', () => {
    const rejectActivityAdvertisementSpy = jest.spyOn(activityAdvertisementService, 'rejectActivityAdvertisement');
    const id = 'dd1231ce-e6fe-4f61-ad22-239da9bd1b76';

    activityAdvertisementService.rejectActivityAdvertisement(id);

    expect(rejectActivityAdvertisementSpy).toHaveBeenCalled();
  });
});


