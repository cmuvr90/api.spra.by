import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

const enum ROLE {
  ADMIN = 'admin',
  MANAGER = 'manager',
}

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    },
  },
})
export class User {
  @Transform(({ value }) => value.toString())
  id: ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ default: null })
  lastName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: ROLE.MANAGER })
  role: ROLE;

  @Prop({ default: null })
  activationLink: string;
}

const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('fullName').get(function (this: UserDocument) {
//   return `${this.firstName} ${this.lastName}`;
// });

export { UserSchema };
