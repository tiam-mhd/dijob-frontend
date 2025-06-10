import { Cafe } from "./cafe";
import { MenuItem } from "./menu-item";

export interface MenuCategory {
  id: number;
  order: number;
  title: string;
  cafeId: number;
  cafe: Cafe;
  items: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}