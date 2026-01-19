import { useState, useEffect } from 'react';
import { menuService } from '../services/api';
import { MenuItem, CapacityStatus } from '../types/menu';
import MenuCard from '../components/MenuCard';
import LogViewer from '../components/LogViewer';
import { useLogs } from '../context/LogContext';
import { FileText, Info } from 'lucide-react';

export default function RestaurantPanel() {
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { addLog } = useLogs();

    useEffect(() => {
        loadMenus();
    }, []);

    const loadMenus = async () => {
        try {
            const data = await menuService.getAllMenus();
            setMenus(data);
        } catch (error) {
            console.error('Error loading menus:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async (menuId: string) => {
        try {
            const updatedMenu = await menuService.publishMenu(menuId);
            setMenus(menus.map(menu => menu.id === menuId ? updatedMenu : menu));

            // Agregar log de auditoría POA
            const menu = menus.find(m => m.id === menuId);
            if (menu) {
                const now = new Date();
                const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                addLog(`[AUDITORÍA] ${menu.restaurant} publicó menú "${menu.dish}" a las ${timeStr}`, 'audit');
            }
        } catch (error) {
            console.error('Error publishing menu:', error);
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
                    <p className="text-gray-600">Cargando panel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - Apple Style */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
                <div className="px-10 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-semibold text-gray-900 mb-2 tracking-tight">
                                Panel de Restaurante
                            </h1>
                            <p className="text-lg text-gray-500 font-normal">
                                Gestiona tus menús y publicaciones
                            </p>
                        </div>
                        <div className="bg-ucab-primary/10 px-5 py-3 rounded-2xl border border-ucab-primary/20">
                            <p className="text-sm font-medium text-ucab-primary">Vista Restaurante</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="px-10 py-10">
                {/* POA Info Card - Apple Style */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 mb-10 border border-blue-100/50">
                    <div className="flex items-start gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm">
                            <FileText className="text-blue-600" size={28} />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                POA - Logging de Auditoría
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Cada vez que publiques un menú, se registrará automáticamente en el sistema de auditoría.
                                Los logs se almacenan en <code className="bg-white/60 px-2 py-1 rounded text-sm">backend/logs/audit.log</code>
                            </p>
                            <div className="flex items-start gap-2 bg-blue-100/40 rounded-2xl p-4 border border-blue-200/30">
                                <Info size={18} className="text-blue-700 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-blue-900 leading-relaxed">
                                    Los registros incluyen: restaurante, plato y hora de publicación
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Mis Menús</h2>
                    <p className="text-gray-500">Publica tus menús para que los estudiantes los vean</p>
                </div>

                {/* Menu Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ucab-primary mx-auto mb-4"></div>
                            <p className="text-gray-600 font-medium">Cargando menús...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {menus.map((menu) => (
                            <MenuCard
                                key={menu.id}
                                menu={menu}
                                onCheckCapacity={handleCheckCapacity}
                                onPublish={handlePublish}
                                isRestaurantView={true}
                            />
                        ))}
                    </div>
                )}

                {/* Log Viewer Section */}
                <div className="mt-10">
                    <LogViewer />
                </div>
            </main>
        </div>
    );
}
