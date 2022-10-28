import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AppSchema } from '../app.schemas';
import { Cafe } from '../cafes/cafes.schema';

export type EmployeeDocument = Employee & Document;

@AppSchema()
export class Employee {
  @Prop()
  name: string;

  @Prop()
  days_worked: number;

  @Prop({
    type: String,
    default() {
      return `UI${new Types.ObjectId().toString()}`;
    },
    required: true,
  })
  _id: string;

  @Prop({ type: String, ref: 'Cafe', unique: true })
  cafe: Cafe;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
