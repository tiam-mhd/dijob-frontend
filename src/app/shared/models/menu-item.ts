import { Cafe } from "./cafe";
import { MenuCategory } from "./menu-category";

export interface MenuItem {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    categoryId: number;
    category: MenuCategory;
    cafeId: number;
    cafe: Cafe;
    createdAt: Date;
    updatedAt: Date;
}