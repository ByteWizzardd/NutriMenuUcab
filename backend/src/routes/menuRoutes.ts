import { Router } from 'express';
import { getAllMenus, publishMenu, getCapacity, getNotifications, testNotification } from '../controllers/menuController';

const router = Router();

// Rutas de menús
router.get('/menus', getAllMenus);
router.post('/menus/:id/publish', publishMenu);
router.get('/menus/:id/capacity', getCapacity);

// Rutas de notificaciones
router.get('/notifications', getNotifications);

// Ruta de testing (POE)
router.post('/test/notification', testNotification);

export default router;
