import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  upload() {
    console.log('uploading files...');
  }
  download() {
    console.log('downloading files...');
  }
}
