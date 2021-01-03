// 서비스로 보내고 받을 클래스(인터페이스)를 export 해야함
// service 에 있는 private movie 실제로 데이터 베이스 모델

export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}
