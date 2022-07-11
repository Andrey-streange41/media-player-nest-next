import { ObjectId } from "mongoose";

//Data transfer object
export class CreateCommentDTO{
    readonly user_name : string;
    readonly text : string;
    readonly track_id : ObjectId;

}