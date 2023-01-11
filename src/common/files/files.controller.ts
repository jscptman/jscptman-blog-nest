import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Query,
  Get,
  Res,
  StreamableFile,
} from '@nestjs/common';
import {
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('files')
@UseInterceptors(FilesInterceptor('files'))
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('downloadFile')
  downloadFile(
    @Query('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'download', filename));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });
    return new StreamableFile(file);
  }

  @Post('uploadFiles')
  uploadFiles(
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    console.log(files);
  }

  @Post('uploadFilesFields')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 3 },
      { name: 'background', maxCount: 2 },
    ]),
  )
  uploadFilesFields(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    console.log(files);
  }
}
