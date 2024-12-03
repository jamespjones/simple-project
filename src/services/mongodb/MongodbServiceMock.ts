import { Db, MongoClient } from "mongodb";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { Logger } from "winston";
import { ConfigService } from "../config/ConfigService";
import { ServiceContainerCradle } from "../serviceContainer";
import { MongodbService } from "./MongodbService";

export class MongodbServiceMock implements MongodbService {
  private readonly logger: Logger;

  private configService: ConfigService;
  private mongoReplSet: MongoMemoryReplSet | null;
  private client: MongoClient;

  constructor(dependencies: Pick<ServiceContainerCradle, "loggerFactory" | "configService">) {
    this.configService = dependencies.configService;
    this.logger = dependencies.loggerFactory.getLogger(__filename);
    this.mongoReplSet = null;
  }

  public async setupMongoServer() {
    if (this.mongoReplSet) {
      return;
    }

    // This will create a new instance of "MongoMemoryServer" and automatically start it
    this.mongoReplSet = await MongoMemoryReplSet.create({
      replSet: { count: 1, dbName: this.getDbName(), auth: false, storageEngine: "wiredTiger" },
      binary: {
        version: "5.0.18",
      },
    });

    this.logger.debug("In-memory mongodb started: %o, db: %s", this.mongoReplSet.getUri(), this.getDbName());
  }

  public async stopMongoServer() {
    if (this.mongoReplSet) {
      await this.mongoReplSet.stop({ doCleanup: true });
    }

    this.mongoReplSet = null;
  }

  getClient(): MongoClient {
    if (!this.client) {
      this.client = new MongoClient(this.getConnectionUri());
    }

    return this.client;
  }

  getConnectionUri(): string {
    return this.mongoReplSet?.getUri() || "";
  }

  getDb(): Db {
    return this.getClient().db(this.getDbName());
  }

  getDbName(): string {
    const workerId = this.configService.getConfig().JEST_WORKER_ID;
    return `simple-project-memdb-${workerId}`;
  }
}
