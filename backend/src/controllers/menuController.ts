import { Request, Response } from 'express';
import { menuData, notifications } from '../data/menuData';
import { AuditLog, LogBefore, logMenuPublication } from '../services/poa/auditLogger';
import { checkCapacity } from '../services/pa/capacityChecker';
import { notificationScheduler } from '../services/poe/notificationScheduler';

/**
 * MenuController con decoradores POA
 */
class MenuController {
    /**
     * GET /api/menus
     * Obtener todos los menús
     */
    @LogBefore('Obteniendo lista de menús')
    getAllMenus(req: Request, res: Response) {
        res.json(menuData);
    }

    /**
     * POST /api/menus/:id/publish
     * Publicar un menú (activa POA - logging de auditoría automático con decorador)
     */
    @AuditLog('publicó')
    @LogBefore('Publicando menú')
    publishMenu(req: Request, res: Response) {
        const { id } = req.params;

        const menu = menuData.find(m => m.id === id);

        if (!menu) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }

        // POA: El decorador @AuditLog aplica logging automáticamente
        // No necesitamos llamar logMenuPublication() manualmente

        // Solo lógica de negocio
        menu.isPublished = true;

        console.log(`✅ Menú publicado exitosamente: ${menu.dish}`);

        res.json(menu);
    }

    /**
     * GET /api/menus/:id/capacity
     * Verificar capacidad (PA - Proceso Asíncrono)
     */
    async getCapacity(req: Request, res: Response) {
        const { id } = req.params;

        try {
            // PA - Llamada asíncrona con delay de 2 segundos
            const status = await checkCapacity(id);
            res.json(status);
        } catch (error) {
            res.status(404).json({ error: 'Error al verificar capacidad' });
        }
    }

    /**
     * GET /api/notifications
     * Obtener notificaciones (POE)
     */
    @LogBefore('Obteniendo notificaciones')
    getNotifications(req: Request, res: Response) {
        const allNotifications = notificationScheduler.getNotifications();
        res.json(allNotifications);
    }

    /**
     * POST /api/test/notification
     * Generar notificación de prueba (TESTING POE)
     */
    testNotification(req: Request, res: Response) {
        const { type, menuId } = req.body;

        const menu = menuData.find(m => m.id === menuId);

        if (!menu) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }

        let message = '';
        const notificationType = type || 'menu';

        switch (notificationType) {
            case 'menu':
                message = `¡Ya puedes ver el menú de hoy en NutriMenu! ${menu.restaurant}: ${menu.dish}. Quedan ${menu.stock} raciones.`;
                break;
            case 'promo':
                message = `🔥 Promo Flash: 50% de descuento en ${menu.dish} en ${menu.restaurant}. ¡Solo quedan ${menu.stock} raciones!`;
                break;
            case 'stock':
                message = `⚠️ Stock bajo en ${menu.restaurant}: ${menu.dish}. Solo quedan ${menu.stock} raciones. ¡Apresúrate!`;
                break;
        }

        const notification = {
            id: `n${Date.now()}`,
            type: notificationType,
            message,
            timestamp: new Date(),
            menuId: menu.id
        };

        notifications.push(notification);

        console.log(`\n🔔 [TEST] Notificación de prueba generada:`);
        console.log(`   Tipo: ${notification.type}`);
        console.log(`   Mensaje: ${notification.message}\n`);

        res.json(notification);
    }
}

// Crear instancia del controlador
const controller = new MenuController();

// Exportar métodos vinculados para Express
export const getAllMenus = controller.getAllMenus.bind(controller);
export const publishMenu = controller.publishMenu.bind(controller);
export const getCapacity = controller.getCapacity.bind(controller);
export const getNotifications = controller.getNotifications.bind(controller);
export const testNotification = controller.testNotification.bind(controller);
