import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema({
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

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  @Exclude()
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('fullName').get(function (this: UserDocument) {
//   return `${this.firstName} ${this.lastName}`;
// });

export { UserSchema };
