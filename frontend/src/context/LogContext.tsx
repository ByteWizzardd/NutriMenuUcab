import { createContext, useContext, useState, ReactNode } from 'react';

interface LogEntry {
    id: string;
    timestamp: string;
    message: string;
    type: 'audit' | 'info' | 'error';
}

interface LogContextType {
    logs: LogEntry[];
    addLog: (message: string, type?: 'audit' | 'info' | 'error') => void;
    clearLogs: () => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export function LogProvider({ children }: { children: ReactNode }) {
    const [logs, setLogs] = useState<LogEntry[]>([
        {
            id: '1',
            timestamp: new Date().toISOString(),
            message: '[AUDITORÍA] Sistema iniciado correctamente',
            type: 'info'
        }
    ]);

    const addLog = (message: string, type: 'audit' | 'info' | 'error' = 'audit') => {
        const newLog: LogEntry = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            message,
            type
        };
        setLogs(prev => [newLog, ...prev].slice(0, 100)); // Mantener últimos 100
    };

    const clearLogs = () => {
        setLogs([]);
    };

    return (
        <LogContext.Provider value={{ logs, addLog, clearLogs }}>
            {children}
        </LogContext.Provider>
    );
}

export function useLogs() {
    const context = useContext(LogContext);
    if (!context) {
        throw new Error('useLogs debe usarse dentro de LogProvider');
    }
    return context;
}
