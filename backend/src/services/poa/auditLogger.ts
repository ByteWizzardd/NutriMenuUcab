import winston from 'winston';
import path from 'path';

// POA - Programación Orientada a Aspectos
// Implementación de logging para auditoría de calidad usando DECORADORES

const logDir = path.join(__dirname, '../../logs');

// Configuración de Winston para logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, 'audit.log'),
            level: 'info'
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}] ${message}`;
                })
            )
        })
    ]
});

/**
 * DECORADOR POA - Audit Logger
 * Aplica automáticamente logging de auditoría a métodos
 * Ejemplo de uso: @AuditLog()
 */
export function AuditLog(action: string = 'ejecutó') {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            // Obtener información del request
            const req = args[0]; // Express Request
            const menuId = req.params?.id;

            // Ejecutar método original
            const result = originalMethod.apply(this, args);

            // ASPECTO: Logging automático DESPUÉS de la ejecución
            if (menuId && req.app?.locals?.menuData) {
                const menu = req.app.locals.menuData.find((m: any) => m.id === menuId);
                if (menu) {
                    logMenuPublication(menu.restaurant, menu.dish, action);
                }
            }

            return result;
        };

        return descriptor;
    };
}

/**
 * DECORADOR POA - Log Before (Antes de ejecutar)
 */
export function LogBefore(message?: string) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const req = args[0];
            const logMsg = message || `Ejecutando ${propertyKey}`;
            logger.info(`[POA-BEFORE] ${logMsg} - ${req.method} ${req.path}`);

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}

/**
 * DECORADOR POA - Log After (Después de ejecutar)
 */
export function LogAfter(message?: string) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const result = originalMethod.apply(this, args);

            const req = args[0];
            const logMsg = message || `Completado ${propertyKey}`;
            logger.info(`[POA-AFTER] ${logMsg} - ${req.method} ${req.path}`);

            return result;
        };

        return descriptor;
    };
}

/**
 * Función helper para logging manual (backward compatibility)
 */
export function logMenuPublication(restaurant: string, dish: string, action: string = 'publicó') {
    const now = new Date();
    const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });

    const message = `[AUDITORÍA] ${restaurant} ${action} menú "${dish}" a las ${time}`;

    logger.info(message);

    return message;
}

/**
 * Log general para eventos del sistema
 */
export function logEvent(message: string) {
    logger.info(message);
}

export default logger;
