import { Config } from "./Config";

/**
 * This service is to centralise the access to configs provided by process.env
 */
export interface ConfigService {
  getConfig(): Config;
}
