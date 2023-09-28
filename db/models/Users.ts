import {Schema, model} from 'mongoose';
import {IUser, IUserMethods, IUserModel, USER_ROLE} from "@/db/models/types/IUsers";

const schema = new Schema<IUser, IUserModel, IUserMethods>({
  firstName: {type: String, default: null},
  lastName: {type: String, default: null},
  email: {type: String, default: null},
  role: {
    type: String,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.MANAGER,
  },
  activationLink: {type: String, default: null},
  password: {type: String, required: true},
});

schema.static('createWithFullName', function createWithFullName(name: string) {
  const [firstName, lastName] = name.split(' ');
  return this.create({firstName, lastName});
});

schema.method('fullName', function fullName(): string {
  return this.firstName + ' ' + this.lastName;
});

export default model<IUser, IUserModel>('Users', schema);