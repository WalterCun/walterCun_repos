import { Test, TestingModule } from '@nestjs/testing';
import { AdminOrgService } from './admin-org.service';

describe('AdminOrgService', () => {
  let service: AdminOrgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminOrgService],
    }).compile();

    service = module.get<AdminOrgService>(AdminOrgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
