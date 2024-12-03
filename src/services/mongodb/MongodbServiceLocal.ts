import { MongodbServiceCloud } from "./MongodbServiceCloud";

export class MongodbServiceLocal extends MongodbServiceCloud {
  /**
   * @override
   */
  public getDbName(): string {
    return "simple-project";
  }

  /**
   * @override
   */
  public getConnectionUri(): string {
    return "mongodb://127.0.0.1:27017/";
  }
}
