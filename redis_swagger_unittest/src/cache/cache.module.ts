import { Module } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import KeyvRedis from '@keyv/redis';
import { CacheService } from './cache.service';

//
// there is another reference: //reference: https://blog.fearandesire.com/using-redis-in-nestjs
// but not try yet
//

//reference: https://blog.fearandesire.com/using-redis-in-nestjs
@Module({
  providers: [
    {
      provide: 'CACHE_INSTANCE',
      useFactory: () => {
        const secondary = new KeyvRedis('redis://localhost:6379');
        return new Cacheable({ secondary, ttl: '1m' });
      },
    },
    CacheService,
  ],
  exports: ['CACHE_INSTANCE', CacheService],
})
export class RedisCacheModule {}
