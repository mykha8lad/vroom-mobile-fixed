import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './useUserStore';

export interface Video {
    id: string;                   
    userId: string;               
    title?: string;               
    description?: string;         
    videoUrl: string;             
    thumbnailUrl?: string;        
    createdAt: string;            
    likesCount?: number;          
    dislikesCount?: number;
    viewsCount? : number;
    commentsCount?: number;       
    isPrivate?: boolean;          
    duration?: number;  
    comments: Comment[]; 
    user?: User;         
}

interface VideoState {
    videos: Video[];
    userVideos: Video[];
    video: Video | null;
    userReaction: true | false | null;
    fetchVideos: () => Promise<void>;
    fetchVideoById: (videoId: string) => Promise<void>;
    uploadVideo: (formData: FormData) => Promise<void>;
    likeVideo: (videoId: string, isLike: boolean) => Promise<void>;
    addView: (videoId: string) => Promise<void>;
    fetchUserVideos: (userId: string) => Promise<void>;
}

export const useVideoStore = create<VideoState>((set, get) => ({
    videos: [],
    userVideos: [],
    video: null,
    userReaction: null,

    fetchVideos: async () => {
            try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://back.buhprogsoft.com.ua/api/Videos', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            });
            set({ videos: response.data });
        } catch (error) {
        
        }
    },

    fetchVideoById: async (videoId) => {
        const res = await axios.get(`https://back.buhprogsoft.com.ua/api/Videos/${videoId}`);
        const current = get().video;

        if (!current || current.id !== res.data.id) {                    
            set({ video: res.data });                        
        }
    },

    uploadVideo: async (formData) => {
        const token = await AsyncStorage.getItem('token');
        await axios.post('https://back.buhprogsoft.com.ua/api/Videos/upload', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
        });
        await get().fetchVideos();
    },

    likeVideo: async (videoId, isLike) => {
        const token = await AsyncStorage.getItem('token');
        await axios.post(`https://back.buhprogsoft.com.ua/api/videos/${videoId}/likes`, { isLike }, {
        headers: { Authorization: `Bearer ${token}` },
        });
        await get().fetchVideoById(videoId);
    },

    addView: async (videoId) => {
        await axios.post(`https://back.buhprogsoft.com.ua/api/Videos/${videoId}/views`);
    },

    fetchUserVideos: async (userId) => {
        const { data } = await axios.get(`https://back.buhprogsoft.com.ua/api/Videos/user/${userId}`);
        set({ userVideos: data });
    },
}));