import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import menuRoutes from './routes/menuRoutes';
import { menuData } from './data/menuData';
import { notificationScheduler } from './services/poe/notificationScheduler';

// Cargar variables de entorno
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

// Middleware para inyectar menuData en app.locals (para decoradores POA)
app.use((req, res, next) => {
    req.app.locals.menuData = menuData;
    next();
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api', menuRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'NutriMenu UCAB Backend is running',
        features: {
            POA: 'Audit Logging Active',
            POE: 'Event Scheduler Active',
            PA: 'Async Capacity Checker Active'
        }
    });
});

// Inicializar scheduler (POE)
// El scheduler se inicializa automáticamente al importar el módulo

// Iniciar servidor
app.listen(PORT, () => {
    console.log('\n🚀 ========================================');
    console.log(`   NutriMenu UCAB Backend`);
    console.log('   ========================================');
    console.log(`   🌐 Server running on http://localhost:${PORT}`);
    console.log(`   📝 API: http://localhost:${PORT}/api`);
    console.log(`   ❤️  Health: http://localhost:${PORT}/health`);
    console.log('   ========================================');
    console.log('\n   📋 Aspectos Implementados:');
    console.log('   ✅ POA - Audit Logging (Winston)');
    console.log('   ✅ POE - Event Scheduler (node-cron)');
    console.log('   ✅ PA  - Async Capacity Checker');
    console.log('   ========================================\n');
});

export default app;
