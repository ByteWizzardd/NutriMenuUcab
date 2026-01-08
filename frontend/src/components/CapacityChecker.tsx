import { useState } from 'react';
import { CapacityStatus } from '../types/menu';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface CapacityCheckerProps {
    onCheck: (menuId: string) => Promise<CapacityStatus>;
    menuId: string;
}

export default function CapacityChecker({ onCheck, menuId }: CapacityCheckerProps) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CapacityStatus | null>(null);

    const handleCheck = async () => {
        setLoading(true);
        setResult(null);

        try {
            const status = await onCheck(menuId);
            setResult(status);
        } catch (error) {
            console.error('Error checking capacity:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">
            <button
                onClick={handleCheck}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Verificando mesas...
                    </>
                ) : (
                    'Verificar Disponibilidad'
                )}
            </button>

            {result && (
                <div
                    className={`mt-3 p-4 rounded-lg flex items-start gap-3 ${result.available ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}
                >
                    {result.available ? (
                        <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                    ) : (
                        <XCircle className="text-red-600 flex-shrink-0" size={24} />
                    )}
                    <div>
                        <p className={`font-medium ${result.available ? 'text-green-800' : 'text-red-800'}`}>
                            {result.message}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            Ocupación actual: {result.currentAforo}/{result.capacity}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
