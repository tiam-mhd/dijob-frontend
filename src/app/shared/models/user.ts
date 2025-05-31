import { Cafe } from "./cafe";

export interface User {
  id: number;
  phoneNumber: string;
  fullName: string;
  password: string;
  cafes: Cafe[];
  createdAt: Date;
  updatedAt: Date;
}
