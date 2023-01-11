import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('www/articles')
export class ArticlesController {
  constructor(private readonly ArticlesService: ArticlesService) {}

  @Get('getAll')
  getHello(): string {
    return this.ArticlesService.getHello();
  }
}
