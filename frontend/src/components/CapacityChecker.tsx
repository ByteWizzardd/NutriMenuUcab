import { useState } from 'react';
import { CapacityStatus } from '../types/menu';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import Modal from './Modal';

interface CapacityCheckerProps {
    onCheck: (menuId: string) => Promise<CapacityStatus>;
    menuId: string;
}

export default function CapacityChecker({ onCheck, menuId }: CapacityCheckerProps) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CapacityStatus | null>(null);
    const [showResultModal, setShowResultModal] = useState(false);

    const handleCheck = async () => {
        setLoading(true);
        setResult(null);
        setShowResultModal(false);

        try {
            // PA - Llamada asíncrona con delay de 2 segundos
            const status = await onCheck(menuId);
            setResult(status);
            setShowResultModal(true);
        } catch (error) {
            console.error('Error checking capacity:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseResultModal = () => {
        setShowResultModal(false);
        setResult(null);
    };

    return (
        <div>
            <button
                onClick={handleCheck}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
            >
                Verificar Disponibilidad
            </button>

            {/* Modal de Loading - PA: Proceso Asíncrono */}
            <Modal
                isOpen={loading}
                showCloseButton={false}
                size="sm"
            >
                <div className="flex flex-col items-center justify-center py-6">
                    <Loader2 className="animate-spin text-ucab-blue mb-4" size={48} />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Verificando mesas...
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                        Consultando disponibilidad en tiempo real
                    </p>
                </div>
            </Modal>

            {/* Modal de Resultados */}
            <Modal
                isOpen={showResultModal}
                onClose={handleCloseResultModal}
                title="Disponibilidad del Restaurante"
                size="md"
            >
                {result && (
                    <div className="space-y-4">
                        {(() => {
                            const availableSeats = result.capacity - result.currentAforo;
                            let bgColor = 'bg-green-50 border-green-200';
                            let textColor = 'text-green-800';
                            let iconColor = 'text-green-600';
                            let progressColor = 'bg-green-500';

                            if (!result.available || availableSeats < 5) {
                                bgColor = 'bg-red-50 border-red-200';
                                textColor = 'text-red-800';
                                iconColor = 'text-red-600';
                                progressColor = 'bg-red-500';
                            } else if (availableSeats < 10) {
                                bgColor = 'bg-yellow-50 border-yellow-200';
                                textColor = 'text-yellow-800';
                                iconColor = 'text-yellow-600';
                                progressColor = 'bg-yellow-500';
                            }

                            return (
                                <>
                                    {/* Icono y mensaje principal */}
                                    <div className={`flex items-start gap-4 p-4 rounded-lg border ${bgColor}`}>
                                        {result.available ? (
                                            <CheckCircle className={`${iconColor} flex-shrink-0`} size={32} />
                                        ) : (
                                            <XCircle className="text-red-600 flex-shrink-0" size={32} />
                                        )}
                                        <div className="flex-1">
                                            <p className={`font-semibold text-lg ${textColor}`}>
                                                {result.message}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Información detallada */}
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                        <h4 className="font-medium text-gray-900 mb-3">
                                            Información de Ocupación
                                        </h4>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Capacidad Total</p>
                                                <p className="text-2xl font-bold text-ucab-blue">
                                                    {result.capacity}
                                                </p>
                                                <p className="text-xs text-gray-500">personas</p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-600">Ocupación Actual</p>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {result.currentAforo}
                                                </p>
                                                <p className="text-xs text-gray-500">personas</p>
                                            </div>
                                        </div>

                                        {/* Barra de progreso */}
                                        <div className="mt-4">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-600">Nivel de ocupación</span>
                                                <span className="font-medium">
                                                    {Math.round((result.currentAforo / result.capacity) * 100)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div
                                                    className={`h-3 rounded-full transition-all ${progressColor}`}
                                                    style={{ width: `${Math.min((result.currentAforo / result.capacity) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}

                        <button
                            onClick={handleCloseResultModal}
                            className="btn-primary w-full"
                        >
                            Entendido
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
