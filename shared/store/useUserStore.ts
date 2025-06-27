import { create } from 'zustand';
import axios from 'axios';
import { Video } from './useVideoStore';
import { parseJwt } from '../utils/parseJwt';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    id: string;
    userName: string;
    displayName?: string;
    subscriptions?: string[];
    followersCount?: number;
    email: string;
    avatar?: string | null;
    videos: Video[];
}

interface UserState {
    user: User | null;
    token: string | null;
    subscriptions: string[] | null;

    setUser: (user: User) => void;
    setToken: (token: string) => void;
    updateUser: (user: Partial<User>) => void;
    clearUser: () => void;

    setSubscriptions: (subs: string[]) => void;
    subscribeToUser: (targetUserId: string) => Promise<void>;
    unsubscribeFromUser: (targetUserId: string) => Promise<void>;

    loadUserFromStorage: () => Promise<void>;
    logout: () => Promise<void>;

    uploadAvatar: (uri: string) => Promise<void>;
    fetchAvatar: () => Promise<void>;
    deleteAvatar: () => Promise<void>;

    updateDisplayName: (newDisplayName: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    token: null,
    subscriptions: [],

    setUser: (user) => {
        set({ user });
        AsyncStorage.setItem('user', JSON.stringify(user));
    },

    setToken: (token) => {
        set({ token });
        AsyncStorage.setItem('token', token);
    },

    updateUser: (updatedUser: Partial<User>) =>
        set((state) => ({
        user: {
            ...state.user!,
            ...updatedUser,
        },
        })),

    clearUser: () => set({ user: null, token: null }),

    setSubscriptions: (subs) => set({ subscriptions: subs }),

    subscribeToUser: async (targetUserId) => {
        const { token, user } = get();
        if (!token || !user) return;

        await axios.post(
        `https://back.buhprogsoft.com.ua/api/Users/${targetUserId}/subscribe`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
        );

        const updated = await axios.get(`https://back.buhprogsoft.com.ua/api/Users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        });

        set({ user: updated.data });
    },

    unsubscribeFromUser: async (targetUserId) => {
        const { token, user } = get();
        if (!token || !user) return;

        await axios.post(
        `https://back.buhprogsoft.com.ua/api/Users/${targetUserId}/unsubscribe`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
        );

        const updated = await axios.get(`https://back.buhprogsoft.com.ua/api/Users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        });

        set({ user: updated.data });
    },

    loadUserFromStorage: async () => {
        try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken && storedUser) {
            set({ token: storedToken });

            const parsedUser: User = JSON.parse(storedUser);
            const response = await axios.get(`https://back.buhprogsoft.com.ua/api/Users/${parsedUser.id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
            });

            const freshUser = response.data;
            set({ user: freshUser });
            await AsyncStorage.setItem('user', JSON.stringify(freshUser));

            const decoded: any = parseJwt(storedToken);
            console.log('✅ Загруженный пользователь:', decoded);
        }
        } catch (error) {
        console.error('❌ Ошибка при загрузке пользователя:', error);
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
        set({ user: null, token: null });
    },

    uploadAvatar: async (uri: string) => {
        const { token, user, updateUser } = get();
        if (!token || !user) return;

        try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const jsonStringBody = JSON.stringify(base64);

        await axios.post(
            `https://back.buhprogsoft.com.ua/api/Users/${user.id}/avatar`,
            jsonStringBody,
            {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            }
        );

        const updatedUserResponse = await axios.get(
            `https://back.buhprogsoft.com.ua/api/Users/${user.id}`,
            {
            headers: { Authorization: `Bearer ${token}` },
            }
        );

        const updatedUser = updatedUserResponse.data;
        updateUser(updatedUser);
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

        console.log('✅ Аватар обновлён:', updatedUser.avatar);
        } catch (e) {
        console.error('❌ Ошибка при загрузке аватара:', e);
        }
    },

    fetchAvatar: async () => {
        const { user, token, updateUser } = get();
        if (!user || !token) return;

        try {
        const response = await axios.get(
            `https://back.buhprogsoft.com.ua/api/Users/${user.id}/avatar`,
            {
            headers: { Authorization: `Bearer ${token}` },
            }
        );

        const avatarUrl = response.data.avatar;
        if (avatarUrl) {
            updateUser({ avatar: avatarUrl });
            await AsyncStorage.setItem('user', JSON.stringify({ ...user, avatar: avatarUrl }));
        }
        } catch (error) {
        console.error('Ошибка при получении аватара:', error);
        }
    },

    deleteAvatar: async () => {
        const { user, token, updateUser } = get();

        if (!user || !token) {
        alert('Ошибка: пользователь не авторизован');
        return;
        }

        try {
        await axios.delete(`https://back.buhprogsoft.com.ua/api/Users/${user.id}/avatar`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        updateUser({ avatar: null });
        await AsyncStorage.setItem('user', JSON.stringify({ ...user, avatar: null }));

        console.log('✅ Аватар удалён');
        } catch (error: any) {
        console.error('❌ Ошибка при удалении аватара:', error?.response?.data || error.message);
        alert('Ошибка: не удалось удалить аватар');
        }
    },

    updateDisplayName: async (newDisplayName: string) => {
        const { user, token, updateUser } = get();

        if (!user || !token) {
        alert('Ошибка: пользователь не авторизован');
        return;
        }

        try {
        await axios.patch(
            `https://back.buhprogsoft.com.ua/api/Users/${user.id}`,
            { displayName: newDisplayName },
            {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            }
        );

        const updatedUserResponse = await axios.get(`https://back.buhprogsoft.com.ua/api/Users/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const updatedUser = updatedUserResponse.data;
        updateUser(updatedUser);
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

        console.log('✅ displayName обновлён:', newDisplayName);
        } catch (error: any) {
        console.error('❌ Ошибка при обновлении displayName:', error?.response?.data || error.message);
        alert('Ошибка: не удалось изменить имя');
        }
    },
}));



interface UserMapStore {
    fetchedUsers: Record<string, User>;
    fetchUserById: (id: string) => Promise<void>;
}

export const useFetchedUsersStore = create<UserMapStore>((set, get) => ({
    fetchedUsers: {},
    fetchUserById: async (id) => {
        if (get().fetchedUsers[id]) return;

        try {
        const res = await axios.get(`https://back.buhprogsoft.com.ua/api/Users/${id}`);
        set((state) => ({
            fetchedUsers: { ...state.fetchedUsers, [id]: res.data },
        }));
        } catch (error) {
        console.error(`❌ Ошибка при загрузке пользователя ${id}:`, error);
        }
    },
}));


