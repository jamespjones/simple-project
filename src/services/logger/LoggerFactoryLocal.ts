import { Format } from "logform";
import path from "path";
import winston from "winston";
import { LoggerFactoryCloud } from "./LoggerFactoryCloud";

export class LoggerFactoryLocal extends LoggerFactoryCloud {
  /**
   * @override
   */
  protected getLogLevel(): string {
    return "debug";
  }

  /**
   * @override
   */
  protected getFormat(filename: string): Format {
    const format = winston.format;

    const label = path.relative(process.cwd(), filename);
    return format.combine(
      format.colorize({ message: true }),
      format.timestamp(),
      format.label({ label }),
      format.splat(),
      format.printf((info) => {
        // const message = info.message.replaceAll("\\n", "\n");

        return `[${info.level}] ${info.timestamp} ${info.label}: ${info.message}`;
      })
    );
  }
}
