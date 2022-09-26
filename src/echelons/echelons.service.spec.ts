import { Test, TestingModule } from '@nestjs/testing';
import { EchelonsService } from './echelons.service';

describe('EchelonsService', () => {
  let service: EchelonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EchelonsService],
    }).compile();

    service = module.get<EchelonsService>(EchelonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
