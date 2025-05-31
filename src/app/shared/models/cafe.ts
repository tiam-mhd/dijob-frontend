import { MenuCategory } from "./menu-category";
import { MenuItem } from "./menu-item";
import { User } from "./user";

export type CafeType = 'cafe' | 'restaurant';

export interface Cafe {
    id: number;
    name: string;
    phone: string;
    domain: string;
    type: CafeType;
    isActive: boolean;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;

    
    owner: User;
    // addresses: CafeAddress[];
    menuCategories: MenuCategory[];
    menuItems: MenuItem[];
    // orders: Order[];
    // feedbacks: Feedback[];
}