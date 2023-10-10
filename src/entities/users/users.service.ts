import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { INVALID_LOGIN_OR_PASSWORD } from '../../auth/auth.constants';
// import { compare } from 'bcryptjs';
// import { AuthService } from '../../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.UserModel.create(createUserDto);
  }

  findAll() {
    return this.UserModel.find();
  }

  async findOne(id: string) {
    return this.UserModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  remove(id: string) {
    return this.UserModel.findByIdAndDelete(id);
  }

  /**
   *
   * @param email
   * @param password
   */
  async isValid(email: string, password: string) {
    const user = await this.UserModel.findOne({ email });
    if (!user) throw new UnauthorizedException(INVALID_LOGIN_OR_PASSWORD);
    // const isValidPassword = await Auth.
    // if (!isValidPassword) throw new UnauthorizedException(INVALID_LOGIN_OR_PASSWORD);
    return user;
  }
}
