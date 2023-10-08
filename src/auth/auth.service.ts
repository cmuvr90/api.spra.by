import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  async isValidPassword(password: string, hash: string) {
    return await compare(password, hash);
  }
}
