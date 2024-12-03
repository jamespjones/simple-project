import { UserDTO } from "./UserDTO";
import { UserUpdateDTO } from "./UserUpdateDTO";

export interface UserRepository {
  findUserById(id: string): Promise<UserDTO | null>;

  findAllUsers(): Promise<UserDTO[]>;

  updateUser(args: { userId: string; updateDTO: UserUpdateDTO });
}
