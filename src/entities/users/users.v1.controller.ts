import { Controller, Get, NotFoundException, Param, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { IdValidationPipe } from '../../pipes/validations.pipe';
import { User } from './schemas/user.schema';
import MongooseClassSerializerInterceptor from '../../../utils/mongooseClassSerializer.interceptor';

@Controller('api/v1/users')
@ApiTags('Users')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UsersV1Controller {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', IdValidationPipe) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException();
    console.log('USER', user);
    return user;
  }
}
