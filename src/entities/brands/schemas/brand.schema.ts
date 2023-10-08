import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Brand {
  @Prop(String)
  name: string;

  @Prop(String)
  description: string;

  @Prop(String)
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

const BrandSchema = SchemaFactory.createForClass(Brand);

export { BrandSchema };