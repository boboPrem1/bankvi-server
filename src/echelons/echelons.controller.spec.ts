import { Test, TestingModule } from '@nestjs/testing';
import { EchelonsController } from './echelons.controller';
import { EchelonsService } from './echelons.service';

describe('EchelonsController', () => {
  let controller: EchelonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EchelonsController],
      providers: [EchelonsService],
    }).compile();

    controller = module.get<EchelonsController>(EchelonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
