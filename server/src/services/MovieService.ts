import { IMovie } from "../interfaces/interfaces.js";
import FileService from "../utils/FileService.js";
import jsonFileReader from "../utils/jsonFileReader.js";

const moviesPath = "./src/data/movies.json";

class MovieService {
  getAll(): IMovie[] {
    return jsonFileReader.readFileJson(moviesPath);
  }

  getOne(movieId: number): IMovie | undefined {
    const movies: IMovie[] = jsonFileReader.readFileJson(moviesPath);
    return movies.find((movie) => movie.id === movieId);
  }

  create(movieData: any, imageFile: any): IMovie {
    const { title, releaseDate, genres, trailer } = movieData;
    const movies: IMovie[] = jsonFileReader.readFileJson(moviesPath);
    const lastId = movies.length > 0 ? movies[movies.length - 1].id : 0;
    let image = "no-image.jpg";

    const newMovie: IMovie = {
      id: lastId + 1,
      title,
      releaseDate,
      genres,
      trailer,
      image,
    };
    if (imageFile) {
      newMovie.image = FileService.save(imageFile);
    }
    movies.push(newMovie);
    jsonFileReader.writeFileJson(moviesPath, movies);
    return newMovie;
  }

  update(movieData: any, movieId: number, movieImage: any): IMovie | undefined {
    const { title, releaseDate, genres, trailer } = movieData;
    const movies: IMovie[] = jsonFileReader.readFileJson(moviesPath);
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex === -1) return undefined;

    const updatedMovie: IMovie = {
      id: movieId,
      title,
      releaseDate,
      genres,
      trailer,
      image: movies[movieIndex].image,
    };
    if (movieImage) {
      FileService.delete(movies[movieIndex].image);
      updatedMovie.image = FileService.save(movieImage);
    }
    movies[movieIndex] = updatedMovie;
    jsonFileReader.writeFileJson(moviesPath, movies);
    return updatedMovie;
  }

  delete(movieId: number): IMovie | undefined {
    const movies: IMovie[] = jsonFileReader.readFileJson(moviesPath);
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex === -1) {
      return undefined;
    }
    FileService.delete(movies[movieIndex].image);
    const deletedMovie = movies.splice(movieIndex, 1);

    jsonFileReader.writeFileJson(moviesPath, movies);

    return deletedMovie[0];
  }
}

export default new MovieService();
