import { Test, TestingModule } from '@nestjs/testing';
import { AdminOrgController } from './admin-org.controller';
import { Organizaciones } from './entities/organizaciones.entity';

describe('AdminOrgController', () => {
  let controller: AdminOrgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminOrgController],
    }).compile();

    controller = module.get<AdminOrgController>(AdminOrgController);
  });

  it('should be defined', () => {
    const result = ['tst']
    // jest.spyOn(controller, 'findAll').mockImplementation(() => result);

    expect(controller.create).toBeDefined();
    expect(controller.findAll()).toBe(result);
  });
});
