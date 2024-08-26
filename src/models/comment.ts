"use client";

import { Type } from "class-transformer";
import Vote from "./vote";
import User from "./user";

export default class Comment {
  id: string;
  content: string;

  createdAt: string;

  @Type(() => Vote)
  upVotesBy: Vote[];

  @Type(() => Vote)
  downVotesBy: Vote[];

  @Type(() => User)
  owner: User;
}
