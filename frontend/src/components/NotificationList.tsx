import { Notification } from '../types/menu';
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

    const getTypeColor = (type: Notification['type']) => {
        switch (type) {
            case 'menu':
                return 'border-l-blue-500';
            case 'promo':
                return 'border-l-yellow-500';
            case 'stock':
                return 'border-l-red-500';
        }
    };

    if (notifications.length === 0) {
        return (
            <div className="card text-center py-8">
                <Bell className="mx-auto mb-3 text-gray-300" size={48} />
                <p className="text-gray-500">No hay notificaciones nuevas</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${getTypeColor(notification.type)} hover:shadow-lg transition-shadow`}
                >
                    <div className="flex items-start gap-3">
                        <div className="mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1">
                            <p className="text-gray-800 font-medium">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {new Date(notification.timestamp).toLocaleString('es-ES')}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
