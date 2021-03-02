import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from "@nestjs/common";
import exp from "constants";

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    // 첫번째 테스트

    it('should return an array', () => {
      const result = service.getAll();
      // result 배열이 인스턴스 인지 아닌지 체크
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    // get one 테스트를 할 때, create 된게 없으면 문제가 될 수 있음
    it('should return a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne('1');
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    // 2가지 반응
    // 하나는 id 기준으로 제대로 찾아서 지움
    // id 못찾아서 지우지 못하는 경우
    it('deletes a moive', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const allMovies = service.getAll().length;
      service.deleteOne('1');
      const afterDelete = service.getAll().length;
      // expect(afterDelete).toBeLessThan(allMovies);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });

      // service.update('1', { title: 'updated Test' });
    });
  });
});
