import cron from 'node-cron';
import { EventEmitter } from 'events';
import { menuData, notifications } from '../../data/menuData';
import { Notification } from '../../types';
import { logEvent } from '../poa/auditLogger';

// POE - Programación Orientada a Eventos
// Sistema de notificaciones automáticas basadas en horarios

class NotificationScheduler extends EventEmitter {
    private notificationCounter = 0;

    constructor() {
        super();
        this.setupScheduledEvents();
        this.setupStockWatcher();
    }

    /**
     * POE - Configurar eventos programados
     * Dispara eventos en horarios clave (12:00 PM para almuerzo, 4:00 PM para ofertas)
     */
    private setupScheduledEvents() {
        // Evento de almuerzo - 12:00 PM
        cron.schedule('0 12 * * *', () => {
            logEvent('[POE] Disparando evento de almuerzo - 12:00 PM');
            this.emitLunchNotification();
        });

        // Evento de ofertas flash - 4:00 PM
        cron.schedule('0 16 * * *', () => {
            logEvent('[POE] Disparando evento de ofertas flash - 4:00 PM');
            this.emitFlashSaleNotification();
        });

        // Para testing: emitir cada minuto (comentar en producción)
        cron.schedule('* * * * *', () => {
            const now = new Date();
            const hour = now.getHours();

            if (hour === 12 && now.getMinutes() === 0) {
                this.emitLunchNotification();
            } else if (hour === 16 && now.getMinutes() === 0) {
                this.emitFlashSaleNotification();
            }
        });

        logEvent('[POE] Scheduler de notificaciones iniciado');
        console.log('📅 [POE] Scheduler configurado:');
        console.log('   - 12:00 PM: Notificaciones de almuerzo');
        console.log('   - 4:00 PM: Notificaciones de ofertas flash');
    }

    /**
     * POE - Vigilar stock bajo y emitir eventos
     */
    private setupStockWatcher() {
        setInterval(() => {
            menuData.forEach(menu => {
                if (menu.stock < 5 && menu.stock > 0 && menu.isPublished) {
                    this.emitLowStockAlert(menu.id, menu.restaurant, menu.dish, menu.stock);
                }
            });
        }, 60000); // Revisar cada minuto
    }

    /**
     * Emitir notificación de almuerzo
     */
    private emitLunchNotification() {
        const publishedMenus = menuData.filter(m => m.isPublished && m.category === 'almuerzo');

        publishedMenus.forEach(menu => {
            const notification: Notification = {
                id: `n${++this.notificationCounter}`,
                type: 'menu',
                message: `¡Ya puedes ver el menú de hoy en NutriMenu! ${menu.restaurant}: ${menu.dish}. Quedan ${menu.stock} raciones.`,
                timestamp: new Date(),
                menuId: menu.id
            };

            notifications.push(notification);
            this.emit('notification', notification);
            logEvent(`[POE] Notificación de almuerzo enviada: ${menu.restaurant} - ${menu.dish}`);
        });
    }

    /**
     * Emitir notificación de oferta flash
     */
    private emitFlashSaleNotification() {
        const availableMenus = menuData.filter(m => m.isPublished && m.stock > 0);

        availableMenus.forEach(menu => {
            const notification: Notification = {
                id: `n${++this.notificationCounter}`,
                type: 'promo',
                message: `🔥 Promo Flash: 50% de descuento en ${menu.dish} en ${menu.restaurant}. ¡Solo quedan ${menu.stock} raciones!`,
                timestamp: new Date(),
                menuId: menu.id
            };

            notifications.push(notification);
            this.emit('notification', notification);
            logEvent(`[POE] Oferta flash enviada: ${menu.restaurant} - ${menu.dish}`);
        });
    }

    /**
     * Emitir alerta de stock bajo
     */
    private emitLowStockAlert(menuId: string, restaurant: string, dish: string, stock: number) {
        const notification: Notification = {
            id: `n${++this.notificationCounter}`,
            type: 'stock',
            message: `⚠️ Stock bajo en ${restaurant}: ${dish}. Solo quedan ${stock} raciones. ¡Apresúrate!`,
            timestamp: new Date(),
            menuId
        };

        notifications.push(notification);
        this.emit('notification', notification);
        logEvent(`[POE] Alerta de stock bajo: ${restaurant} - ${dish} (${stock} restantes)`);
    }

    /**
     * Obtener todas las notificaciones
     */
    getNotifications(): Notification[] {
        return notifications.slice(-20); // Últimas 20 notificaciones
    }
}

// Singleton instance
export const notificationScheduler = new NotificationScheduler();

// Listener para mostrar notificaciones en consola
notificationScheduler.on('notification', (notification: Notification) => {
    console.log(`\n🔔 [POE] Nueva notificación enviada a estudiantes:`);
    console.log(`   Tipo: ${notification.type}`);
    console.log(`   Mensaje: ${notification.message}`);
    console.log(`   Hora: ${notification.timestamp.toLocaleTimeString('es-ES')}\n`);
});
