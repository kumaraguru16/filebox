import { WrapperUtil } from '../../utils/wrapper.util';
import { DummyLambda } from './health-check';

class DummyHandler {
  static healthCheck = async (event: any, context: any) => {
    return WrapperUtil.apiWrapper(event, context, DummyLambda.healthCheck);
  };
}

export const healthCheck = DummyHandler.healthCheck;
