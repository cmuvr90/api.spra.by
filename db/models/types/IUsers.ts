import {HydratedDocument, Model, ObjectId} from 'mongoose';

export enum USER_ROLE {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CUSTOMER = 'customer'
}

export interface IUser {
  id: ObjectId;
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
  role: USER_ROLE;
  activationLink: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  fullName(): string;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  createWithFullName(name: string): Promise<HydratedDocument<IUser, IUserMethods>>;
}