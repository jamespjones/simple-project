import { ReadConcernLevel, ReadPreferenceMode, TransactionOptions, W } from "mongodb";

export const transactionOptions: TransactionOptions = {
  readConcern: { level: ReadConcernLevel.snapshot },
  writeConcern: { w: "majority" },
  readPreference: ReadPreferenceMode.primary,
};
