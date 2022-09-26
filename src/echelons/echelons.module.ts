import { Module } from '@nestjs/common';
import { EchelonsService } from './echelons.service';
import { EchelonsController } from './echelons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Echelon } from './entity/echelon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Echelon])],
  controllers: [EchelonsController],
  providers: [EchelonsService]
})
export class EchelonsModule {}
