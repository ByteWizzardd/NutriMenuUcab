import { MenuItem, CapacityStatus } from '../types/menu';
import { UtensilsCrossed, Users, Package } from 'lucide-react';
import CapacityChecker from './CapacityChecker';

interface MenuCardProps {
    menu: MenuItem;
    onCheckCapacity: (menuId: string) => Promise<CapacityStatus>;
    onPublish?: (menuId: string) => void;
    isRestaurantView?: boolean;
}

export default function MenuCard({ menu, onCheckCapacity, onPublish, isRestaurantView = false }: MenuCardProps) {
    const stockColor = menu.stock < 5 ? 'text-red-600' : menu.stock < 10 ? 'text-yellow-600' : 'text-green-600';
    const categoryColors = {
        almuerzo: 'bg-blue-100 text-blue-800',
        saludable: 'bg-green-100 text-green-800',
        snack: 'bg-orange-100 text-orange-800',
    };

    return (
        <div className="card">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-ucab-primary mb-1">{menu.dish}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                        <UtensilsCrossed size={14} />
                        {menu.restaurant}
                    </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[menu.category]}`}>
                    {menu.category}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-sm text-gray-500">Precio</p>
                    <p className="text-2xl font-bold text-ucab-primary">${menu.price.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Package size={14} />
                        Stock
                    </p>
                    <p className={`text-2xl font-bold ${stockColor}`}>{menu.stock} raciones</p>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <Users size={16} />
                <span>Capacidad: {menu.capacity} personas</span>
                <span className="text-gray-400">|</span>
                <span>Ocupación: {menu.currentAforo}/{menu.capacity}</span>
            </div>


            <div className="flex gap-2">
                <div className="flex-1">
                    <CapacityChecker onCheck={onCheckCapacity} menuId={menu.id} />
                </div>

                {isRestaurantView && onPublish && (
                    <button
                        onClick={() => onPublish(menu.id)}
                        disabled={menu.isPublished}
                        className={`flex-1 font-medium px-4 py-2 rounded-lg transition-colors ${menu.isPublished
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-ucab-accent hover:bg-ucab-accent/90 text-white'
                            }`}
                    >
                        {menu.isPublished ? 'Publicado' : 'Publicar Menú'}
                    </button>
                )}
            </div>
        </div>
    );
}
