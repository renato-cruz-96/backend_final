import mongoose from "mongoose";

export interface IMovie extends mongoose.Document {
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

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genres: { type: String, required: true },
  trailer: { type: String, required: true },
  image: { type: String, default: "default.png" },
  rating: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
});

export default mongoose.model<IMovie>("User", MovieSchema);
