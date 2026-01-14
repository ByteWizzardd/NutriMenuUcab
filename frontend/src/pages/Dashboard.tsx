import { useState, useEffect } from 'react';
import { menuService } from '../services/api';
import { MenuItem, Notification, CapacityStatus } from '../types/menu';
import MenuCard from '../components/MenuCard';
import NotificationList from '../components/NotificationList';
import { Bell, Utensils } from 'lucide-react';

export default function Dashboard() {
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [menusData, notificationsData] = await Promise.all([
                menuService.getAllMenus(),
                menuService.getNotifications(),
            ]);
            setMenus(menusData);
            setNotifications(notificationsData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckCapacity = async (menuId: string): Promise<CapacityStatus> => {
        return await menuService.checkCapacity(menuId);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ucab-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando menús...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-ucab-primary text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/nutrimenu-logo.png" alt="NutriMenu UCAB Logo" className="h-20 w-auto object-contain" />
                            <div>
                                <h1 className="text-2xl font-bold">NutriMenu UCAB</h1>
                                <p className="text-sm text-ucab-secondary">Alimentación saludable y responsable</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 hover:bg-ucab-primary/80 rounded-lg transition-colors"
                        >
                            <Bell size={24} />
                            {notifications.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {notifications.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {showNotifications ? (
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-ucab-primary">Notificaciones</h2>
                            <button
                                onClick={() => setShowNotifications(false)}
                                className="text-sm text-gray-600 hover:text-ucab-primary"
                            >
                                Ver menús
                            </button>
                        </div>
                        <NotificationList notifications={notifications} />
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-ucab-primary mb-2">Menús Disponibles</h2>
                            <p className="text-gray-600">Descubre las opciones del día y verifica disponibilidad</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {menus.filter(menu => menu.isPublished).map((menu) => (
                                <MenuCard
                                    key={menu.id}
                                    menu={menu}
                                    onCheckCapacity={handleCheckCapacity}
                                />
                            ))}
                        </div>

                        {menus.filter(menu => menu.isPublished).length === 0 && (
                            <div className="text-center py-12">
                                <Utensils className="mx-auto mb-4 text-gray-300" size={64} />
                                <p className="text-gray-500 text-lg">No hay menús publicados en este momento</p>
                                <p className="text-gray-400 text-sm mt-2">Vuelve más tarde para ver las opciones del día</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
