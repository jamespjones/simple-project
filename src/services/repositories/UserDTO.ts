import { z } from "zod";

import {addressSchema, companySchema, UserEntity, userEntitySchema} from "./UserEntity";

export const addressDTOSchema = z.object({
  street: addressSchema.shape.street,
  suite: addressSchema.shape.suite,
  city: addressSchema.shape.city,
  zipcode: addressSchema.shape.zipcode,
  geo: addressSchema.shape.geo,
});

export const companySTOSchema = z.object({
  name: companySchema.shape.name,
  catchPhrase: companySchema.shape.catchPhrase,
  bs: companySchema.shape.bs,
});

export const userDTOSchema = z.object({
  id: z.string(),
  name: userEntitySchema.shape.name,
  username: userEntitySchema.shape.username,
  email:userEntitySchema.shape.email,
  phone: userEntitySchema.shape.phone,
  website: userEntitySchema.shape.website,
  address: addressDTOSchema,
  company: companySTOSchema,
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type UserDTO = z.infer<typeof userDTOSchema>;

export const UserDTO = {
  convertFromEntity: (entity: UserEntity): UserDTO => {
    const dto: UserDTO = {
      id: entity._id.toString(),
      name: entity.name,
      username: entity.username,
      email:entity.email,
      phone: entity.phone,
      website: entity.website,
      address: {
        street: entity.address.street,
        suite: entity.address.suite,
        city: entity.address.city,
        zipcode: entity.address.zipcode,
        geo: {
          lat: entity.address.geo.lat,
          lng: entity.address.geo.lng,
        },
      },
      company: {
        name: entity.company.name,
        catchPhrase: entity.company.catchPhrase,
        bs: entity.company.bs,
      },
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };

    return userDTOSchema.parse(dto);
  },
};
