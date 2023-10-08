import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsV1Controller } from './brands.v1.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './schemas/brand.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }])],
  controllers: [BrandsV1Controller],
  providers: [BrandsService],
})
export class BrandsModule {}
