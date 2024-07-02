import { ResponseModel } from "../../models/response.model";
import { logger } from "../../utils/logger.utils";

export class DummyLambda {
  static async healthCheck(event: any): Promise<ResponseModel> {
    logger.trace("Entering <DummyLambda.healthCheck>.");
    console.log(event);
    logger.trace("Exiting <DummyLambda.healthCheck>, Locations: %o.");
    return { message: "success", data: "Trigger Lambda" };
  }
}
