export interface IException {
  message: string;
  code: number;
}

export class BaseException extends Error {
  constructor(params: IException) {
    super(params.message);
  }
}
