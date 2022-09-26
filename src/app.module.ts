import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { EchelonsModule } from './echelons/echelons.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from  '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PlateformsModule } from './plateforms/plateforms.module';
import { AuthModule } from './auth/auth.module';
// postgres://gfsfmjixdeeueq:148915dca7c7bbb9b433289702fff956413eb9c0a9545c8e3d1d16d6467936f5@ec2-63-34-180-86.eu-west-1.compute.amazonaws.com:5432/d8f2l6i0ev8b3l
@Module({
  imports: [ProductsModule, 
    EchelonsModule,
    TypeOrmModule.forRoot({
    // type: 'postgres',
    // host: 'ec2-63-34-180-86.eu-west-1.compute.amazonaws.com',
    // port: 5432,
    // username: 'gfsfmjixdeeueq',
    // password: "148915dca7c7bbb9b433289702fff956413eb9c0a9545c8e3d1d16d6467936f5",
    // database: 'd8f2l6i0ev8b3l',
    // entities: [],
    // synchronize: false,
    // autoLoadEntities: true,
    // ssl: { rejectUnauthorized: false }
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'vboss',
    password: "energy2",
    database: 'omni',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  }),
  UsersModule,
  PlateformsModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
