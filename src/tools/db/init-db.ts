import { serviceContainer } from "../../services/serviceContainer";
import users from "../../tools/db/users.json";
import {BSON} from "mongodb";

const collectionName = "users";

const getLogger = () => serviceContainer.cradle.loggerFactory.getLogger(__filename);
const getDb = () => serviceContainer.cradle.mongodbService.getDb();


const main = async () => {
  getLogger().info(`Importing collection: %s`, collectionName);

  // await dropCollection(collectionName);
  getLogger().info(`Creating collection %s`, collectionName);
  await getDb().createCollection(collectionName);

  const usersStr = JSON.stringify(users);
  const records = BSON.EJSON.parse(usersStr);
  if (!Array.isArray(records)) {
    throw new Error(`Malformed fixture json`);
  }
  await importRecords(collectionName, records);
};



const dropCollection = async (collectionName: string) => {
  try {
    getLogger().info(`Dropping collection: %s`, collectionName);
    await getDb().dropCollection(collectionName);
  } catch (e) {
    if ((e.name === "MongoServerError" && e.message === "ns not found") || e.codeName === "NamespaceNotFound") {
      // Bypass dropping collection if collection not exists
      getLogger().info(`Collection not exist: %s`, collectionName);
      return;
    }

    throw e;
  }
};

const importRecords = async (collectionName: string, records: object[]) => {
  await getDb()
    .collection(collectionName)
    .insertMany(
      records.map((record) => {
        return {
          ...record,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );
};


main()
  .then(() => process.exit())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
