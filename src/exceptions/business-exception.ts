import { BaseException } from './base-exception';

export class BusinessException extends BaseException {
  constructor(errMessage: string) {
    super({
      message: errMessage,
      code: 400,
    });
  }
}
