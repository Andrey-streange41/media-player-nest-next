import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongose from 'mongoose';
import { Track } from 'src/tracks/models/track.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop()
  name: string;
  @Prop()
  author: string;
  @Prop()
  picture: string;
  @Prop({type:[{ type: mongose.Schema.Types.ObjectId , ref:'Track'}]})
  tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
