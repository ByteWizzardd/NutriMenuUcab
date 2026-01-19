import { Home, Store } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
    onNavigate?: (path: string) => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
        if (onNavigate) {
            onNavigate(path);
        }
    };

    const menuItems = [
        {
            path: '/',
            label: 'Vista Estudiante',
            icon: Home,
            description: 'Menús y notificaciones'
        },
        {
            path: '/restaurant',
            label: 'Vista Restaurante',
            icon: Store,
            description: 'Gestionar menús'
        }
    ];

    return (
        <aside className="sidebar">
            {/* Logo Section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-ucab-primary p-2.5 rounded-2xl shadow-soft">
                        <img
                            src="/nutrimenu-logo.png"
                            alt="NutriMenu UCAB"
                            className="w-7 h-7 object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-ucab-primary">NutriMenu</h1>
                        <p className="text-xs text-gray-500">UCAB</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Alimentación saludable y responsable
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
                    Navegación
                </p>
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <li key={item.path}>
                                <button
                                    onClick={() => handleNavigation(item.path)}
                                    className={isActive ? 'sidebar-item-active w-full' : 'sidebar-item w-full'}
                                >
                                    <Icon size={20} />
                                    <div className="flex-1 text-left">
                                        <div className="text-sm">{item.label}</div>
                                        <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                                            {item.description}
                                        </div>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="mt-auto pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                    ODS 3 • ODS 12
                </p>
                <p className="text-xs text-gray-400 text-center mt-1">
                    © 2026 UCAB
                </p>
            </div>
        </aside>
    );
}
