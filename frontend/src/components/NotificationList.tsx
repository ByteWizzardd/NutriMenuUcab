import type { Notification } from '../types/menu';
import { Bell, TrendingDown, Sparkles } from 'lucide-react';

interface NotificationListProps {
    notifications: Notification[];
}

export default function NotificationList({ notifications }: NotificationListProps) {
    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'menu':
                return <Bell className="text-blue-500" size={20} />;
            case 'promo':
                return <Sparkles className="text-yellow-500" size={20} />;
            case 'stock':
                return <TrendingDown className="text-red-500" size={20} />;
        }
    };

    const getTypeBadge = (type: Notification['type']) => {
        switch (type) {
            case 'menu':
                return <span className="badge bg-blue-50 text-blue-700">Menú</span>;
            case 'promo':
                return <span className="badge bg-yellow-50 text-yellow-700">Promo</span>;
            case 'stock':
                return <span className="badge bg-red-50 text-red-700">Stock</span>;
        }
    };

    if (notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32">
                <div className="mb-8 bg-gray-100 p-8 rounded-3xl">
                    <Bell className="w-20 h-20 text-gray-400 opacity-40" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    No hay notificaciones
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                    Las notificaciones aparecerán aquí cuando haya nuevas ofertas o menús disponibles
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className="bg-white rounded-3xl p-5 border border-gray-100 hover:shadow-soft-hover transition-all duration-200"
                >
                    <div className="flex items-start gap-4">
                        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                            {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <p className="text-gray-900 font-medium leading-relaxed flex-1">
                                    {notification.message}
                                </p>
                                {getTypeBadge(notification.type)}
                            </div>
                            <p className="text-xs text-gray-500">
                                {new Date(notification.timestamp).toLocaleString('es-ES', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
