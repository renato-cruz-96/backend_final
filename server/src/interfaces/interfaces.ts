import { Date } from "mongoose";

export interface IMovie {
  id: number;
  title: string;
  releaseDate: Date;
  genres: string[];
  trailer: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: UserRole;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
