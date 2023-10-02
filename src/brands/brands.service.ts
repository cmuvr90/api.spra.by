import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from './schemas/brand.schema';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private readonly BrandModel: Model<Brand>) {}

  create(createBrandDto: CreateBrandDto) {
    return createBrandDto;
  }

  findAll() {
    return this.BrandModel.find().populate('user');
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return updateBrandDto;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
