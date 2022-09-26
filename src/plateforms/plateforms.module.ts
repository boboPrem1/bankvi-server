import { Module } from '@nestjs/common';
import { PlateformsService } from './plateforms.service';
import { PlateformsController } from './plateforms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plateform } from './entity/plateform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plateform])],
  controllers: [PlateformsController],
  providers: [PlateformsService]
})
export class PlateformsModule {}
