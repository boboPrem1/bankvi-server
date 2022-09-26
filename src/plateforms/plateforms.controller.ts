import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PlateformsService } from './plateforms.service';

@Controller('plateforms')
export class PlateformsController {
  constructor(private readonly plateformsService: PlateformsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<{}> {
    return await this.plateformsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Param() param): Promise<{}> {
    return await this.plateformsService.findOne(param.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() registerParams): Promise<{}> {
    return await this.plateformsService.create(registerParams);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async update(@Body() updateParams, @Param() params): Promise<{}> {
    return await this.plateformsService.update(updateParams, params.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/delete')
  async delete(@Param() params): Promise<{}> {
    return await this.plateformsService.delete(params.id);
  }
}
