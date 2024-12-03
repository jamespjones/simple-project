import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { serviceContainer } from "../../serviceContainer";
import { UserDTO } from "./UserDTO";
import { UserEntity } from "./UserEntity";
import { setupCollections } from "../../../test-utils/setupCollections";
import { UserRepositoryImpl } from "./UserRepositoryImpl";
import { UserUpdateDTO } from "./UserUpdateDTO";

const createTestUserEntity = (): UserEntity => {
  return {
    _id: new ObjectId(),
    name: faker.company.name(),
    inboundUserOAuthClient: {
      authorizationEndpoint: faker.internet.url(),
      tokenEndpoint: faker.internet.url(),
      redirectEndpoint: faker.internet.url(),
      clientId: faker.string.nanoid(),
      clientSecret: faker.internet.password(),
      issuer: faker.internet.url(),
      jwksUri: faker.internet.url(),
      authenticationType: "OAuth",
      identityKey: "user",
    },
    inboundServerOAuthClient: {
      tokenEndpoint: faker.internet.url(),
      clientId: faker.string.nanoid(),
      clientSecret: faker.internet.password(),
    },
    outboundServerOAuthClient: {
      tokenEndpoint: faker.internet.url(),
      clientId: faker.string.nanoid(),
      clientSecret: faker.internet.password(),
    },
    serverApiBaseUrl: faker.internet.url(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const TEST_ENTITY_1 = createTestUserEntity();
const TEST_ENTITY_2 = createTestUserEntity();

setupCollections();

beforeEach(async () => {
  const db = serviceContainer.cradle.mongodbService.getDb();
  await db.collection<UserEntity>("users").insertOne(TEST_ENTITY_1);
  await db.collection<UserEntity>("users").insertOne(TEST_ENTITY_2);
});

afterEach(async () => {
  const db = serviceContainer.cradle.mongodbService.getDb();
  await db.dropCollection("users");
});

describe("findUserById", () => {
  it("should get user by user id", async () => {
    const user = await serviceContainer.cradle.userRepository.findUserById(TEST_ENTITY_1._id.toString());
    const expected = UserDTO.convertFromEntity(TEST_ENTITY_1);
    expect(user).toEqual(expected);
  });

  it("should return null when not found", async () => {
    const user = await serviceContainer.cradle.userRepository.findUserById(new ObjectId().toString());
    expect(user).toBeNull();
  });
});

describe("findAllUsers", () => {
  it("should get all users", async () => {
    const users = await serviceContainer.cradle.userRepository.findAllUsers();
    const expected = [UserDTO.convertFromEntity(TEST_ENTITY_1), UserDTO.convertFromEntity(TEST_ENTITY_2)];
    expect(users).toEqual(expected);
  });
});

describe("findUserByOutboundOAuthClientId", () => {
  it("should get user by outbound OAuth client ID", async () => {
    const user = await serviceContainer.cradle.userRepository.findUserByOutboundOAuthClientId(
      TEST_ENTITY_1.outboundServerOAuthClient.clientId
    );
    const expected = UserDTO.convertFromEntity(TEST_ENTITY_1);
    expect(user).toEqual(expected);
  });

  it("should return null when not found", async () => {
    const user = await serviceContainer.cradle.userRepository.findUserByOutboundOAuthClientId(
      faker.string.nanoid()
    );
    expect(user).toBeNull();
  });
});

describe("updateUser", () => {
  it("should update User", async () => {
    const userRepository = new UserRepositoryImpl(serviceContainer.cradle);
    const updateDTO: UserUpdateDTO = {
      workingHours: {
        startTime: "08:25:00",
        endTime: "17:25:00",
      },
    };
    const userDTO = await userRepository.updateUser({
      userId: TEST_ENTITY_1._id.toString(),
      updateDTO: updateDTO,
    });
    expect(userDTO).toEqual(expect.objectContaining(updateDTO));
  });
});
