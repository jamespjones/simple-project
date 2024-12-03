import { z } from "zod";

import {addressSchema, companySchema, UserEntity, userEntitySchema} from "./UserEntity";

export const userDTOSchema = z.object({
  id: z.string(),
  name: userEntitySchema.shape.name,
  username: userEntitySchema.shape.username,
  email:userEntitySchema.shape.email,
  phone: userEntitySchema.shape.phone,
  website: userEntitySchema.shape.website,
  address: addressSchema,
  company: companySchema,
  createdAt: z.date(),
  updatedAt: z.date()
  createdAt: dateStrSchema,
  updatedAt: dateStrSchema,
});

export type UserDTO = z.infer<typeof userDTOSchema>;

export const UserDTO = {
  convertFromEntity: (entity: UserEntity): UserDTO => {
    const dto: UserDTO = {
      id: entity._id.toString(),
      name: entity.name,
      cognitoUsername: entity.cognitoUsername,
      oauthProviders: entity.oauthProviders,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };

    return userDTOSchema.parse(dto);
  },
};
