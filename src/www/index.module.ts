import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
@Module({
  imports: [ArticlesModule],
})
export default class WwwModule {}
