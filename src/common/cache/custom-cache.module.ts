import { Module } from '@nestjs/common';
import { CustomCacheProvider } from './custom-cache.provider';
@Module({
  providers: [CustomCacheProvider],
  exports: [CustomCacheProvider],
})
export class CustomCacheModule {}
