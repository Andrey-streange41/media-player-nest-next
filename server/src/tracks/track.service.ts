import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { TrackDocument, Track } from './models/track.schema';
import { CommentDocument, Comment } from './models/comment.schema';
import { CreateTrackDTO } from './dto/create-track.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { FileService, FileType } from 'src/files/file.service';


@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async getOne(id: ObjectId): Promise<Track> {
    try {
      const track = await this.trackModel.findById(id).populate('comments');
      return track;
    } catch (error) {
      return error.message;
    }
  }
  async create(dto: CreateTrackDTO, picture, audio): Promise<Track> {
    try {
      const audioPath = await this.fileService.createFile(FileType.AUDIO, audio);
      const picturePath = await this.fileService.createFile(FileType.IMAGE, picture);
      const track = await this.trackModel.create({
        ...dto,
        listens: 0,
        picture: picturePath,
        audio: audioPath,
      });
      return track;
    } catch (error) {
      return error.message;
    }
  }
  async getAll(count=10,offset=0): Promise<Track[]> {
    try {
      const tracks = await this.trackModel.find().skip(offset).limit(count);
      return tracks;
    } catch (error) {
      return error.message;
    }
  }
  async search(query:string): Promise<Track[]> {
    try {
      const tracks = await this.trackModel.find(
          {
              name:{$regex: new RegExp(query,'i')}
          }
      );
      return tracks;
    } catch (error) {
      return error.message;
    }
  }
  async delete(id: ObjectId): Promise<ObjectId> {
    try {
      const { _id } = await this.trackModel.findByIdAndDelete(id);
      return _id;
    } catch (error) {
      return error.message;
    }
  }
  async addComment(dto: CreateCommentDTO) {
    try {
      const track = await this.trackModel.findById(dto.track_id);
      const comment = await this.commentModel.create({ ...dto });
      track.comments.push(comment._id);
      await track.save();
      return comment;
    } catch (error) {
      return error.message;
    }
  }
  async listen(id: ObjectId) {
      const track = await this.trackModel.findById(id);
       track.listens ++;
       await track.save();
       
  }
}
