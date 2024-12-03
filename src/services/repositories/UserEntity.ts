import { z } from "zod";
import {ObjectId} from "mongodb";

export const addressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: z.object({
    lat: z.string(),
    lng: z.string()
  })
});

export const companySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

export const userEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string().min(2),
  username: z.string().min(2),
  email:z.string(),
  phone: z.string(),
  website: z.string(),
  address: addressSchema,
  company: companySchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserEntity = z.infer<typeof userEntitySchema>;
