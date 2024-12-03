import _ from "lodash";
import { Format } from "logform";
import path from "path";
import winston, { LoggerOptions } from "winston";
import { ConfigService } from "../config/ConfigService";
import { ServiceContainerCradle } from "../serviceContainer";
import { LoggerFactory } from "./LoggerFactory";

export class LoggerFactoryCloud implements LoggerFactory {
  private readonly configService: ConfigService;

  private readonly logLevel: string;

  constructor(dependencies: Pick<ServiceContainerCradle, "configService">) {
    this.configService = dependencies.configService;

    this.logLevel = this.getLogLevel();
  }

  public getLogger(filename: string, options?: LoggerOptions) {
    const logger = winston.createLogger({
      level: this.logLevel,
      format: this.getFormat(filename),
      transports: [new winston.transports.Console()],
      ...options,
    });

    return logger;
  }

  protected getLogLevel(): string {
    const allowedLevels = ["emerg", "alert", "crit", "error", "warning", "notice", "info", "debug"];
    const level = this.configService.getConfig().LOG_LEVEL;

    if (allowedLevels.includes(level)) {
      return level;
    }

    return "info";
  }

  protected getFormat(filename: string): Format {
    const format = winston.format;

    const label = path.relative(process.cwd(), filename);
    return format.combine(
      format.label({ label }),
      format.splat(),
      format.printf((info) => {
        return `[${info.level}] ${info.label}: ${info.message}`;
      })
    );
  }
}
