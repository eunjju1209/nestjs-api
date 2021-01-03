import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    // 실제로 데이터 베이스를 여기에 써야 했다면 db query를 써야했음
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find(movie => movie.id === +id);
  }

  deleteOne(id: string): boolean {
    this.movies.filter(movie => movie.id !== +id);
    return true;
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length +1,
      ...movieData,
    });
  }
}
