import _ from "lodash";
import { Config } from "./Config";
import { ConfigService } from "./ConfigService";

export class ConfigServiceImpl implements ConfigService {
  getConfig(): Config {
    return {

      // Injected
      LOG_LEVEL: _.toString(process.env.LOG_LEVEL),
      DB_NAME: _.toString(process.env.DB_NAME),
      DB_CONNECTION_URI: _.toString(process.env.DB_CONNECTION_URI),
      JEST_WORKER_ID: _.toString(process.env.JEST_WORKER_ID),
      ENV: _.toString(process.env.ENV),
      RELEASE: _.toString(process.env.RELEASE),
    };
  }
}
