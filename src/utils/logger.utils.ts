import { pino } from "pino";
import { LOG_LEVEL } from "../constants/enums/env.constants";

export const logger = pino({
  level: LOG_LEVEL,
});
