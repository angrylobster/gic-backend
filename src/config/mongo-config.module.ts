import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoConfigService } from './mongo-config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [MongoConfigService],
  exports: [MongoConfigService],
})
export class MongoConfigModule {}
