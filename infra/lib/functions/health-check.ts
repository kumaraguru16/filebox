import type { AWS } from '@serverless/typescript';
import {
  getLambdaCommonPermissions,
  getLambdaFuncName,
} from '../utils/common.util';

type FunctionInterface = AWS['functions'];

export const healthCheck: FunctionInterface = {
  healthCheck: {
    handler: 'src/api/health-check.healthCheck',
    name: getLambdaFuncName('health-check'),
    events: [
      {
        http: {
          method: 'get',
          path: 'healthCheck',
        },
      },
    ],
    ...getLambdaCommonPermissions(),
  },
};
