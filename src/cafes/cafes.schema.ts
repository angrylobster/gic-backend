import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { AppSchema } from '../app.schemas';
import { Employee } from '../employees/employee.schema';

export type CafeDocument = Cafe & Document;

@AppSchema()
export class Cafe {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  logo: string;

  @Prop()
  location: string;

  @Prop({
    type: String,
    default() {
      return uuid();
    },
    required: true,
  })
  _id: string;

  @Prop({ type: [String], ref: 'Employee', unique: true })
  employees: Employee[];
}

export const CafeSchema = SchemaFactory.createForClass(Cafe);
