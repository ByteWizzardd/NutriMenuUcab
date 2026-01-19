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
    const stockColor = menu.stock < 5 ? 'text-red-600' : menu.stock < 10 ? 'text-amber-600' : 'text-green-600';
    const categoryColors = {
        almuerzo: 'bg-blue-50 text-blue-700 border border-blue-200',
        saludable: 'bg-green-50 text-green-700 border border-green-200',
        snack: 'bg-orange-50 text-orange-700 border border-orange-200',
    };

    return (
        <div className="card group">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-ucab-primary transition-colors">
                        {menu.dish}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                        <UtensilsCrossed size={14} />
                        {menu.restaurant}
                    </p>
                </div>
                <span className={`badge ${categoryColors[menu.category]}`}>
                    {menu.category}
                </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 font-medium mb-1">Precio</p>
                    <p className="text-2xl font-bold text-ucab-primary">${menu.price.toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                        <Package size={12} />
                        Stock
                    </p>
                    <p className={`text-2xl font-bold ${stockColor}`}>{menu.stock}</p>
                </div>
            </div>

            {/* Capacity Info */}
            <div className="flex items-center gap-2 mb-5 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                <Users size={16} className="text-gray-400" />
                <span className="font-medium">Capacidad:</span>
                <span>{menu.capacity} personas</span>
                <span className="text-gray-300">•</span>
                <span className="font-medium">Ocupación:</span>
                <span className={menu.currentAforo >= menu.capacity * 0.9 ? 'text-red-600 font-semibold' : ''}>
                    {menu.currentAforo}/{menu.capacity}
                </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <div className="flex-1">
                    <CapacityChecker onCheck={onCheckCapacity} menuId={menu.id} />
                </div>

                {isRestaurantView && onPublish && (
                    <button
                        onClick={() => onPublish(menu.id)}
                        disabled={menu.isPublished}
                        className={`flex-1 font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 ${menu.isPublished
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-ucab-accent hover:bg-ucab-accent/90 text-white shadow-sm hover:shadow-md'
                            }`}
                    >
                        {menu.isPublished ? '✓ Publicado' : 'Publicar'}
                    </button>
                )}
            </div>
        </div>
    );
}
