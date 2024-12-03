import winston from "winston";
import { LoggerFactory } from "./LoggerFactory";

export class LoggerFactoryMock implements LoggerFactory {
  getLogger(filename: string): winston.Logger {
    return winston.createLogger({
      silent: true,
    });
  }
}
