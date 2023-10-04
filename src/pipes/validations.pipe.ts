import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { BAD_MONGO_ID } from './validations.contants';

export class IdValidationPipe implements PipeTransform {
  transform(value: any): any {
    if (!Types.ObjectId.isValid(value)) throw new BadRequestException(BAD_MONGO_ID);
    return value;
  }
}
