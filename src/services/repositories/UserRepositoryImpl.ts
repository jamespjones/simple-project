import { Db, ObjectId } from "mongodb";
import { ServiceContainerCradle } from "../serviceContainer";
import { UserDTO } from "./UserDTO";
import { UserEntity } from "./UserEntity";
import { UserRepository } from "./UserRepository";
import { UserUpdateDTO } from "./UserUpdateDTO";

export class UserRepositoryImpl implements UserRepository {
  private readonly db: Db;

  constructor(dependencies: Pick<ServiceContainerCradle, "mongodbService">) {
    this.db = dependencies.mongodbService.getDb();
  }

  private getUsersCollection() {
    return this.db.collection<UserEntity>("users");
  }

  public async findUserById(id: string) {
    const entity = await this.getUsersCollection().findOne({
      _id: new ObjectId(id),
    });

    if (!entity) {
      return null;
    }

    const user = UserDTO.convertFromEntity(entity);
    return user;
  }

  public async findAllUsers() {
    return this.getUsersCollection().find().map(UserDTO.convertFromEntity).toArray();
  }

  public async updateUser(args: { userId: string; updateDTO: UserUpdateDTO }): Promise<UserDTO> {
    const updateFields = UserUpdateDTO.convertToEntityUpdateFields(args.updateDTO);
    const result = await this.getUsersCollection().findOneAndUpdate(
      {
        _id: new ObjectId(args.userId),
      },
      {
        $set: { ...updateFields, updatedAt: new Date() },
      },
      { returnDocument: "after" }
    );

    if (!result.ok || !result.value) {
      throw new Error(`Fail to update user, userId: ${args.userId}`);
    }

    return UserDTO.convertFromEntity(result.value);
  }
}
