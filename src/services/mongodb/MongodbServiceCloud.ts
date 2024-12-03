import { Db, MongoClient } from "mongodb";
import { ConfigService } from "../config/ConfigService";
import { ServiceContainerCradle } from "../serviceContainer";
import { MongodbService } from "./MongodbService";

export class MongodbServiceCloud implements MongodbService {
  protected readonly client: MongoClient;
  protected readonly configService: ConfigService;

  constructor(dependencies: Pick<ServiceContainerCradle, "configService">) {
    this.configService = dependencies.configService;

    this.client = new MongoClient(this.getConnectionUri());
  }

  public getClient(): MongoClient {
    return this.client;
  }

  public getDb(): Db {
    return this.client.db(this.getDbName());
  }

  public getDbName(): string {
    return this.configService.getConfig().DB_NAME;
  }

  public getConnectionUri(): string {
    return this.configService.getConfig().DB_CONNECTION_URI;
  }
}
