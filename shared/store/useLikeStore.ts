import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Like {
    id: string;
    userId: string;
    videoId: string;
    isLike: boolean;
    createdAt: string;
}

interface LikeState {
    likesCount: number;
    dislikesCount: number;
    userReaction: boolean | null;
    loading: boolean;

    initialize: (videoId: string) => Promise<void>;
    handleLike: (videoId: string) => Promise<void>;
    handleDislike: (videoId: string) => Promise<void>;

    fetchLikes: (videoId: string) => Promise<void>;
    fetchUserReaction: (videoId: string) => Promise<void>;
    sendReaction: (videoId: string, isLike: boolean) => Promise<void>;
    removeReaction: (videoId: string) => Promise<void>;
}

export const useLikeStore = create<LikeState>((set, get) => ({
    likesCount: 0,
    dislikesCount: 0,
    userReaction: null,
    loading: false,

    initialize: async (videoId) => {
        await Promise.all([
        get().fetchLikes(videoId),
        get().fetchUserReaction(videoId)
        ]);
    },

    fetchLikes: async (videoId) => {
        const { data } = await axios.get(`https://back.buhprogsoft.com.ua/api/videos/${videoId}/likes`);
        const likes = data.filter((l: Like) => l.isLike).length;
        const dislikes = data.filter((l: Like) => !l.isLike).length;
        set({ likesCount: likes, dislikesCount: dislikes });
    },

    fetchUserReaction: async (videoId) => {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        const { data } = await axios.get(
        `https://back.buhprogsoft.com.ua/api/videos/${videoId}/likes/me`,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { userId }
        }
        );
        set({ userReaction: data?.isLike ?? null });
    },

    sendReaction: async (videoId, isLike) => {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');

        if (!userId) {
            console.error('sendReaction: userId is missing');
            throw new Error('User ID is required');
        }

        const payload = { userId, isLike };
        console.log('Sending reaction payload:', payload);

        try {
            await axios.post(
            `https://back.buhprogsoft.com.ua/api/videos/${videoId}/likes`,
            payload,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
            }
            );
            await get().initialize(videoId);
        } catch (error: any) {
            console.error('sendReaction axios error:', error.response?.data || error.message);
            throw error;
        }
    },

    removeReaction: async (videoId) => {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');

        await axios.delete(`https://back.buhprogsoft.com.ua/api/videos/${videoId}/likes`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId }
        });

        await get().initialize(videoId);
    },

    handleLike: async (videoId) => {
        if (get().loading) return;
        set({ loading: true });

        try {
        if (get().userReaction === true) {
            await get().removeReaction(videoId);
        } else {
            await get().sendReaction(videoId, true);
        }
        } catch (error) {
        console.error('Ошибка handleLike:', error);
        } finally {
        set({ loading: false });
        }
    },

    handleDislike: async (videoId) => {
        if (get().loading) return;
        set({ loading: true });

        try {
        if (get().userReaction === false) {
            await get().removeReaction(videoId);
        } else {
            await get().sendReaction(videoId, false);
        }
        } catch (error) {
        console.error('Ошибка handleDislike:', error);
        } finally {
        set({ loading: false });
        }
    }
}));