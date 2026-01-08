import { useState, useEffect } from 'react';
import { menuService } from '../services/api';
import { MenuItem, CapacityStatus } from '../types/menu';
import MenuCard from '../components/MenuCard';
import { Store, FileText } from 'lucide-react';

export default function RestaurantPanel() {
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-ucab-primary text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <Store size={32} />
                        <div>
                            <h1 className="text-2xl font-bold">Panel de Restaurante</h1>
                            <p className="text-sm text-ucab-secondary">Gestiona tus menús y publicaciones</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <FileText className="text-blue-600 flex-shrink-0" size={24} />
                    <div>
                        <h3 className="font-semibold text-blue-900 mb-1">POA - Logging de Auditoría</h3>
                        <p className="text-sm text-blue-700">
                            Cada vez que publiques un menú, se registrará automáticamente en el sistema de auditoría.
                            Los logs se almacenan en <code className="bg-blue-100 px-1 rounded">backend/logs/audit.log</code>
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-ucab-primary mb-2">Mis Menús</h2>
                    <p className="text-gray-600">Publica tus menús para que los estudiantes los vean</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </main>
        </div>
    );
}
