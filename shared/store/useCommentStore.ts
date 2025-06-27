import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseJwt } from '../utils/parseJwt';

export interface Comment {
    id: string;
    userId: string;
    videoId: string;
    isLike: boolean;
    text: string;
    createdAt: string;
}

const getToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem('token');
    } catch (error) {
        console.error('Ошибка при получении токена из AsyncStorage:', error);
        return null;
    }
};

type CommentStore = {
    comments: Comment[];  
    fetchComments: (videoId: string) => Promise<void>;
    addComment: (videoId: string, text: string) => Promise<void>;
};

export const useCommentStore = create<CommentStore>((set) => ({
    comments: [],  

    fetchComments: async (videoId) => {
        try {
        const token = await getToken();
        if (!token) return;

        const { data } = await axios.get(
            `https://back.buhprogsoft.com.ua/api/Comments/${videoId}/comments`,
            {
            headers: { Authorization: `Bearer ${token}` },
            }
        );

        set({ comments: data });
        } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
        }
    },

    addComment: async (videoId, text) => {
        try {
            const token = await getToken();
            if (!token) return;

            const decoded = parseJwt(token);
            const userId = decoded?.sub;

            if (!userId) {
                console.warn('userId не найден в токене');
                return;
            }

            await axios.post(
                `https://back.buhprogsoft.com.ua/api/Comments/${videoId}/comments`,
                { userId, text },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                }
            );
            
            await useCommentStore.getState().fetchComments(videoId);
        } catch (error) {
            console.error('Ошибка при добавлении комментария:', error);
        }
    },
}));