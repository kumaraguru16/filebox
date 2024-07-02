/* eslint-disable no-unused-vars */
import { HttpError } from './custom-error.util';
import { Helper } from './helper.util';
import { prisma, prismaInitialize } from './prisma.util';

export class WrapperUtil {
  static async apiWrapper(
    event: any,
    context: any,
    callback: (
      event: any,
      context: any
    ) => Promise<{ message: string; data?: any }>
  ): Promise<any> {
    let output: any = {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Something went wrong.',
      }),
      headers: Helper.getHeaders(),
    };

    try {
      await prismaInitialize();
      const response = await callback(event, context);
      output = {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: Helper.getHeaders(),
      };
    } catch (err: any) {
      output = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Something went wrong',
          error: err.message || '',
        }),
        headers: Helper.getHeaders(),
      };

      if (err.statusCode || err instanceof HttpError) {
        output.statusCode = err.statusCode;
        output.body = err.body;
        output.headers = err.headers;
      }
    } finally {
      await prisma?.$disconnect();
    }
    return output;
  }
}
