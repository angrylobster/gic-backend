export interface AppResponse<T> {
  statusCode: number;
  data: T;
}
