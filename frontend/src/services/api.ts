import axios from 'axios';
import { MenuItem, Notification, CapacityStatus } from '../types/menu';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const menuService = {
    // Get all menus
    getAllMenus: async (): Promise<MenuItem[]> => {
        const response = await api.get<MenuItem[]>('/menus');
        return response.data;
    },

    // Publish a menu (triggers POA logging)
    publishMenu: async (menuId: string): Promise<MenuItem> => {
        const response = await api.post<MenuItem>(`/menus/${menuId}/publish`);
        return response.data;
    },

    // Check capacity (PA - Async process)
    checkCapacity: async (menuId: string): Promise<CapacityStatus> => {
        const response = await api.get<CapacityStatus>(`/menus/${menuId}/capacity`);
        return response.data;
    },

    // Get notifications (POE)
    getNotifications: async (): Promise<Notification[]> => {
        const response = await api.get<Notification[]>('/notifications');
        return response.data;
    },
};

export default api;
