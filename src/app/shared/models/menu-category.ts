import { Cafe } from "./cafe";
import { MenuItem } from "./menu-item";

export interface MenuCategory {
  id: number;
  title: string;
  cafeId: Number;
  cafe: Cafe;
  items: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}