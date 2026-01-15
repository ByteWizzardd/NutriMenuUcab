import { menuData } from '../../data/menuData';
import { CapacityStatus } from '../../types';

// PA - Proceso Asíncrono
// Verificador de capacidad en tiempo real con simulación de API de sensores

/**
 * PA - Verificación asíncrona de capacidad
 * Simula consulta a "API de Sensores" con delay de 2 segundos
 * Mientras carga, el usuario ve "Verificando mesas..."
 */
export async function checkCapacity(menuId: string): Promise<CapacityStatus> {
    // Simular delay de API (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const menu = menuData.find(m => m.id === menuId);

    if (!menu) {
        throw new Error('Menú no encontrado');
    }

    const availableSeats = menu.capacity - menu.currentAforo;
    const isAvailable = availableSeats > 0;

    let message: string;

    if (availableSeats === 0) {
        message = `Local lleno (Capacidad: ${menu.capacity} personas), pide para llevar`;
    } else if (availableSeats < 5) {
        message = `Disponibilidad crítica. ¡Apúrate! Solo quedan ${availableSeats} mesas.`;
    } else if (availableSeats < 10) {
        message = `Disponibilidad limitada. Quedan ${availableSeats} mesas disponibles.`;
    } else {
        message = `Local con disponibilidad. ${availableSeats} mesas disponibles.`;
    }

    const status: CapacityStatus = {
        available: isAvailable,
        message,
        capacity: menu.capacity,
        currentAforo: menu.currentAforo
    };

    console.log(`\n⏳ [PA] Verificación de capacidad completada para ${menu.restaurant}:`);
    console.log(`   Capacidad total: ${menu.capacity}`);
    console.log(`   Ocupación actual: ${menu.currentAforo}`);
    console.log(`   Disponible: ${isAvailable ? 'Sí' : 'No'}`);
    console.log(`   Mensaje: ${message}\n`);

    return status;
}

/**
 * Simular actualización de aforo (para testing)
 */
export function updateAforo(menuId: string, newAforo: number): void {
    const menu = menuData.find(m => m.id === menuId);
    if (menu) {
        menu.currentAforo = Math.min(newAforo, menu.capacity);
        console.log(`[PA] Aforo actualizado para ${menu.restaurant}: ${menu.currentAforo}/${menu.capacity}`);
    }
}
