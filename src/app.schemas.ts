import { applyDecorators } from '@nestjs/common';
import { Schema, SchemaOptions } from '@nestjs/mongoose';

export function AppSchema(options?: SchemaOptions) {
  return applyDecorators(
    Schema({
      toJSON: {
        virtuals: true,
        transform(_, ret) {
          delete ret._id;
          delete ret.__v;
          return ret;
        },
      },
      ...options,
    }),
  );
}
