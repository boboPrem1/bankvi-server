import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<{}> {
    return await this.productsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Param() param): Promise<{}> {
    return await this.productsService.findOne(param.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() registerParams): Promise<{}> {
    return await this.productsService.create(registerParams);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async update(@Body() updateParams, @Param() params): Promise<{}> {
    return await this.productsService.update(updateParams, params.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/delete')
  async delete(@Param() params): Promise<{}> {
    return await this.productsService.delete(params.id);
  }
}
