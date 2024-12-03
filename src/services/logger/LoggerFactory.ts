import { Logger } from "winston";

export interface LoggerFactory {
  getLogger(filename: string): Logger;
}
