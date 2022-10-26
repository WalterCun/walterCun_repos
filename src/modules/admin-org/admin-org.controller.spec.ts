import { Test, TestingModule } from '@nestjs/testing';
import { AdminOrgController } from './admin-org.controller';
import { AdminOrgService } from './admin-org.service';

describe('AdminOrgController', () => {
  let controller: AdminOrgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminOrgController],
      providers: [AdminOrgService],
    }).compile();

    controller = module.get<AdminOrgController>(AdminOrgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
