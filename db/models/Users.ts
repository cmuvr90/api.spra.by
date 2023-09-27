import mongoose, {Schema, Document, Model} from 'mongoose';

interface IUser extends Document {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: ROLE;
  activationLink: string | null
  password: string
}

interface IUserModel extends Model<IUser> {
  getAll(): Promise<IUser[] | null>;
}

export enum ROLE {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CUSTOMER = 'customer'
}

const UsersSchema = new Schema<IUser>({
  firstName: {type: String, default: null},
  lastName: {type: String, default: null},
  email: {type: String, default: null},
  role: {
    type: String,
    enum: Object.values(ROLE),
    default: ROLE.MANAGER,
  },
  activationLink: {type: String, default: null},
  password: {type: String, required: true},
});


UsersSchema.static('getAll', function () {
  return this.find()
})

UsersSchema.methods.test = function () {

}

export default mongoose?.models?.Users as IUserModel || mongoose.model<IUserModel>('Users', UsersSchema);