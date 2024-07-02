import { BaseException } from './base-exception';

export class SystemException extends BaseException {
  constructor(errMessage: string) {
    super({
      message: errMessage,
      code: 500,
    });
  }
}
