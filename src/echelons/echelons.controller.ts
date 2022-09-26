import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EchelonsService } from './echelons.service';

@Controller('echelons')
export class EchelonsController {
  constructor(private readonly echelonsService: EchelonsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<{}> {
    return await this.echelonsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Param() param): Promise<{}> {
    return await this.echelonsService.findOne(param.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() registerParams): Promise<{}> {
    return await this.echelonsService.create(registerParams);
    // return registerParams;
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async update(@Body() updateParams, @Param() params): Promise<{}> {
    return await this.echelonsService.update(updateParams, params.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/delete')
  async delete(@Param() params): Promise<{}> {
    return await this.echelonsService.delete(params.id);
  }
}
