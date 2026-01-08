import { MenuItem } from '../types';

// Datos simulados para menús de restaurantes UCAB
export const menuData: MenuItem[] = [
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

// Notificaciones de prueba iniciales (POE)
export const notifications: any[] = [
    {
        id: 'n001',
        type: 'menu',
        message: '¡Menú del día disponible! Hoy en la Feria: Pabellón Criollo Nutritivo. Quedan 15 raciones.',
        timestamp: new Date(),
        menuId: 'm001'
    },
    {
        id: 'n002',
        type: 'promo',
        message: '🔥 Promo Flash: 50% de descuento en Sandwich Integral de Pavo en el Cafetín Cincuentenario',
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutos atrás
        menuId: 'm003'
    },
    {
        id: 'n003',
        type: 'stock',
        message: '⚠️ Stock bajo en Solarium Módulo 2: Ensalada César con Pollo. Solo quedan 3 raciones. ¡Apresúrate!',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
        menuId: 'm004'
    },
    {
        id: 'n004',
        type: 'menu',
        message: '¡Ya puedes ver el menú de hoy en NutriMenu! Nico Módulo 4: Bowl Vegano de Granos. Quedan 6 raciones.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutos atrás
        menuId: 'm002'
    }
];
