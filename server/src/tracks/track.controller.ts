import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTrackDTO } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { ObjectId } from 'mongoose';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create( @UploadedFiles() files , @Body() dto: CreateTrackDTO) {
    try {
      const {picture,audio} = files;
      return this.trackService.create(dto, picture[0],audio[0]);
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  getAll(@Query('count') count : number, @Query('offset') offset : number) {
    try {
      return this.trackService.getAll(count,offset);
    } catch (error) {
      return error.message;
    }
  }

  @Get('/search')
  search(@Query('query') query :string) {
    try {
      return this.trackService.search(query);
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    try {
      return this.trackService.getOne(id);
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    try {
      const deleted = this.trackService.delete(id);
      return deleted;
    } catch (error) {
      return error.message;
    }
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDTO) {
    return this.trackService.addComment(dto);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
