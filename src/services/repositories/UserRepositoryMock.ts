import { UserDTO } from "./UserDTO";
import { UserRepository } from "./UserRepository";
// import { UserUpdateDTO } from "./UserUpdateDTO";

export class UserRepositoryMock implements UserRepository {
  public async findUserById(id: string): Promise<null | UserDTO> {
    throw new Error("Not implemented");
  }

  public async findAllUsers(): Promise<UserDTO[]> {
    throw new Error("Not implemented");
  }

  // public async updateUser(args: { userId: string; updateDTO: UserUpdateDTO }) {
  //   throw new Error("Not implemented");
  // }
}
