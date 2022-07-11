import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FileModule } from './files/file.module';
import { TrackModule } from './tracks/track.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath:path.resolve(__dirname,'static')}),
    TrackModule,
    MongooseModule.forRoot(
      'mongodb+srv://deadmaus36:0976196890@cluster0.ioatq.mongodb.net/mediaPlayer?retryWrites=true&w=majority',
    ),
    FileModule
  ],
})
export class AppModule {}
