import { IUser } from '../model/types'
import axios from 'axios';

const apiUrl = "https://67d5744ad2c7857431f0730c.mockapi.io/api/v1";

export const getUserById = async (id: string): Promise<IUser | null> => {
    try {        
        const response = await axios.get<IUser>(`${apiUrl}/register/${id}`);
        return response.data;
    } catch (error) {
        console.error("❌ Ошибка при загрузке пользователя:", error);
        return null;
    }
};