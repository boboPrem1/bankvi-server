import { Test, TestingModule } from '@nestjs/testing';
import { PlateformsService } from './plateforms.service';

describe('PlateformsService', () => {
  let service: PlateformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlateformsService],
    }).compile();

    service = module.get<PlateformsService>(PlateformsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
