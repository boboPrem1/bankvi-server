import { Test, TestingModule } from '@nestjs/testing';
import { PlateformsController } from './plateforms.controller';
import { PlateformsService } from './plateforms.service';

describe('PlateformsController', () => {
  let controller: PlateformsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlateformsController],
      providers: [PlateformsService],
    }).compile();

    controller = module.get<PlateformsController>(PlateformsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
