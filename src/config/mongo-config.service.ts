import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MongoMemoryServer from 'mongodb-memory-server-core';

@Injectable()
export class MongoConfigService {
  public isUsingMemoryServer = false;
  constructor(private readonly configService: ConfigService) {}

  async getMongoUri(): Promise<string> {
    let mongoUri = this.configService.get('MONGO_URI');
    if (!this.configService.get('MONGO_URI')) {
      this.isUsingMemoryServer = true;
      mongoUri = (await MongoMemoryServer.create()).getUri();
    }
    return mongoUri;
  }
}
