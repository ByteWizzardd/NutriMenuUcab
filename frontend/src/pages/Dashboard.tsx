import { useState, useEffect } from 'react';
import { menuService } from '../services/api';
import { MenuItem, Notification, CapacityStatus } from '../types/menu';
import MenuCard from '../components/MenuCard';
import NotificationList from '../components/NotificationList';
import { Bell, Sparkles } from 'lucide-react';

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

    const publishedMenus = menus.filter(menu => menu.isPublished);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - Apple Style: Clean, spacious, glassmorphism */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
                <div className="px-10 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-semibold text-gray-900 mb-2 tracking-tight">
                                {showNotifications ? 'Notificaciones' : 'NutriMenu'}
                            </h1>
                            <p className="text-lg text-gray-500 font-normal">
                                {showNotifications
                                    ? 'Mantente al día con las últimas ofertas'
                                    : 'Descubre opciones saludables y deliciosas'
                                }
                            </p>
                        </div>

                        {/* Notification Bell - Apple Style */}
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-3 hover:bg-gray-100 rounded-full transition-all duration-200"
                        >
                            <Bell size={24} className="text-gray-700" />
                            {notifications.length > 0 && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <main className="px-10 py-10">
                {showNotifications ? (
                    <NotificationList notifications={notifications} />
                ) : (
                    <>
                        {publishedMenus.length > 0 ? (
                            <>
                                {/* Section Header - Apple Style */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Menús Disponibles</h2>
                                    <p className="text-gray-500">Explora las opciones de hoy</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {publishedMenus.map((menu) => (
                                        <MenuCard
                                            key={menu.id}
                                            menu={menu}
                                            onCheckCapacity={handleCheckCapacity}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            /* Empty State - Apple Style: Minimalist & Elegant */
                            <div className="flex flex-col items-center justify-center py-32">
                                <div className="mb-8 bg-gray-100 p-8 rounded-3xl">
                                    <img
                                        src="/nutrimenu-logo.png"
                                        alt="NutriMenu UCAB"
                                        className="w-20 h-20 object-contain opacity-40"
                                    />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                    No hay menús disponibles
                                </h3>
                                <p className="text-gray-500 text-center max-w-md mb-2">
                                    Los restaurantes aún no han publicado sus menús del día.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
                                    <Sparkles size={16} />
                                    <span>Vuelve más tarde para ver las opciones</span>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
