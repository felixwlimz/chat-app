import { Type } from "class-transformer";
import User from "./user";
import Vote from "./vote";
import Comment from './comment'

export default class Thread {
  id: string;
  title: string;
  body: string;
  category : string
  
  createdAt : string 

  totalComments : number

  @Type(() => User)
  owner : User 

  @Type(() => Vote)
  upVotesBy : Vote[]
  
  @Type(() => Vote)
  downVotesBy : Vote[]

  @Type(() => Comment)
  comments : Comment[]
}
