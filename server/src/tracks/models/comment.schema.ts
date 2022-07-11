import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Track } from './track.schema';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  user_name: string;

  @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Track'}) 
  track_id: Track;

  @Prop()
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
