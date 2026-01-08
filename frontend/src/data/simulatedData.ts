import { MenuItem } from '../types/menu';

// Datos simulados para menús de restaurantes UCAB
export const simulatedMenuData: MenuItem[] = [
    {
        id: 'm001',
        restaurant: 'Feria UCAB - Local A',
        dish: 'Pabellón Criollo Nutritivo',
        price: 4.50,
        stock: 15,
        isPublished: false,
        capacity: 50,
        currentAforo: 10,
        category: 'almuerzo'
    },
    {
        id: 'm002',
        restaurant: 'Nico Módulo 4',
        dish: 'Bowl Vegano de Granos',
        price: 3.75,
        stock: 6,
        isPublished: false,
        capacity: 20,
        currentAforo: 18,
        category: 'saludable'
    },
    {
        id: 'm003',
        restaurant: 'Cafetín Cincuentenario',
        dish: 'Sandwich Integral de Pavo',
        price: 2.00,
        stock: 20,
        isPublished: false,
        capacity: 30,
        currentAforo: 5,
        category: 'snack'
    },
    {
        id: 'm004',
        restaurant: 'Solarium Módulo 2',
        dish: 'Ensalada César con Pollo',
        price: 5.00,
        stock: 3,
        isPublished: false,
        capacity: 15,
        currentAforo: 14,
        category: 'saludable'
    }
];
