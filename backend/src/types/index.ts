export interface MenuItem {
    id: string;
    restaurant: string;
    dish: string;
    price: number;
    stock: number;
    isPublished: boolean;
    capacity: number;
    currentAforo: number;
    category: 'almuerzo' | 'saludable' | 'snack';
}

export interface Notification {
    id: string;
    type: 'menu' | 'promo' | 'stock';
    message: string;
    timestamp: Date;
    menuId?: string;
}

export interface CapacityStatus {
    available: boolean;
    message: string;
    capacity: number;
    currentAforo: number;
}
