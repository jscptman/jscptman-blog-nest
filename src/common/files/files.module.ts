import { FilesController } from './files.controller';
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
