import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRelatedService } from './dashboard-related.service';

describe('DashboardRelatedService', () => {
  let service: DashboardRelatedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardRelatedService],
    }).compile();

    service = module.get<DashboardRelatedService>(DashboardRelatedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
