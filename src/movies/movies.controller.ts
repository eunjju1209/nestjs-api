import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies') // 여기 부분이 실제 entry point를 결정하는 부분이다.
export class MoviesController {

  // 서비스를 호출하는 방법
  constructor(private readonly movieService: MoviesService) {}

  @Get() // 여기에 있는것은 express의 라우터
  getAll(): Movie[] {
    // return 'This will return all movies';
    return this.movieService.getAll();
  }

  @Post()
  create(@Body() movieData) {
    // return 'This will create a movie';
    // return movieData;
    return this.movieService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    // return `This will delete a movie with the id: ${movieId}`;
    return this.movieService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateMovieData) {
    // return `This will patch a movie with the id: ${movieId}`;
    return {
      updatedMovie: movieId,
      ...updateMovieData,
    };
  }

  // localhost:3000/movies/search/?year=2020
  // url 에 쿼리스트링을 가지고 뭔가를 값을 가지고 올려고 할때는 데코레이터 @Query를 가져다 써야한다.
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  // localhost:3000/movies/2
  @Get(':id')
  getOne(@Param('id') movieId: string): Movie {
    // return `This will return one movie with the id: ${movieId}`;
    return this.movieService.getOne(movieId);
  }
}
