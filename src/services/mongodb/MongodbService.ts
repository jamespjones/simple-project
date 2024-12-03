import { Db, MongoClient } from "mongodb";

export interface MongodbService {
  getConnectionUri(): string;
  getDbName(): string;

  getClient(): MongoClient;
  getDb(): Db;
}
