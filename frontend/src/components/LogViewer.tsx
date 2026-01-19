import { useState } from 'react';
import { FileText, Trash2, Download } from 'lucide-react';
import { useLogs } from '../context/LogContext';

interface LogEntry {
    id: string;
    timestamp: string;
    message: string;
    type: 'audit' | 'info' | 'error';
}

export default function LogViewer() {
    const { logs, clearLogs: contextClearLogs } = useLogs();
    const [isExpanded, setIsExpanded] = useState(false);

    const clearLogs = () => {
        if (confirm('¿Estás seguro de que quieres limpiar todos los logs?')) {
            contextClearLogs();
        }
    };

    const downloadLogs = () => {
        const logText = logs.map(log =>
            `${new Date(log.timestamp).toLocaleString('es-ES')} - ${log.message}`
        ).join('\n');

        const blob = new Blob([logText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nutrimenu-logs-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const getTypeColor = (type: LogEntry['type']) => {
        switch (type) {
            case 'audit':
                return 'text-blue-700';
            case 'info':
                return 'text-gray-700';
            case 'error':
                return 'text-red-700';
        }
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2.5 rounded-xl">
                        <FileText className="text-gray-600" size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Logs de Auditoría (POA)</h3>
                        <p className="text-sm text-gray-500">Registro en tiempo real de publicaciones</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={downloadLogs}
                        disabled={logs.length === 0}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Descargar logs"
                    >
                        <Download size={18} className="text-gray-600" />
                    </button>
                    <button
                        onClick={clearLogs}
                        disabled={logs.length === 0}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Limpiar logs"
                    >
                        <Trash2 size={18} className="text-gray-600" />
                    </button>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="btn-secondary text-sm"
                    >
                        {isExpanded ? 'Contraer' : 'Expandir'}
                    </button>
                </div>
            </div>

            {/* Log Display */}
            <div
                className={`bg-gray-900 rounded-xl p-4 font-mono text-sm overflow-y-auto transition-all duration-200 ${isExpanded ? 'max-h-96' : 'max-h-48'
                    }`}
            >
                {logs.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                        No hay logs registrados aún
                    </div>
                ) : (
                    <div className="space-y-1">
                        {logs.map((log) => (
                            <div key={log.id} className="text-gray-300 hover:bg-gray-800 px-2 py-1 rounded">
                                <span className="text-gray-500">
                                    {new Date(log.timestamp).toLocaleString('es-ES', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })}
                                </span>
                                {' '}
                                <span className={getTypeColor(log.type)}>
                                    {log.message}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{logs.length} {logs.length === 1 ? 'registro' : 'registros'}</span>
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    En vivo
                </span>
            </div>
        </div>
    );
}

// Exportar la función para agregar logs desde otros componentes
export const useLogViewer = () => {
    const addLog = (message: string) => {
        // Esta función se conectaría con el estado global o context
        console.log(`[LOG] ${message}`);
    };

    return { addLog };
};
