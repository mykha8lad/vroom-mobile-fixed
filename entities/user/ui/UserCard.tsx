import React, { FC } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useUserStore } from '@/shared/store/useUserStore';
import { User } from '@/shared/store/useUserStore';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const BASE_URL = 'https://back.buhprogsoft.com.ua';

interface UserProps {
  user?: User;
}

export const UserCard: FC<UserProps> = ({ user: propUser }) => {
  const user = useUserStore((state) => propUser || state.user);
  const token = useUserStore((state) => state.token);
  const updateDisplayName = useUserStore((state) => state.updateDisplayName);
  const uploadAvatar = useUserStore((state) => state.uploadAvatar);
  const setUser = useUserStore((state) => state.setUser);

  const handleSetDisplayName = () => {
    if (!user || !token) {
      Alert.alert('Ошибка', 'Пользователь не авторизован');
      return;
    }

    Alert.prompt(
      'Отображаемое имя',
      'Введите имя, которое будет отображаться публично',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Сохранить',
          onPress: async (newName) => {
            if (!newName) return;
            await updateDisplayName(newName);
            await refetchUser();
          },
        },
      ],
      'plain-text',
      user.displayName || ''
    );
  };

  const refetchUser = async () => {
    if (!user?.id || !token) return;
    try {
      const response = await axios.get(`${BASE_URL}/api/Users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
    }
  };

  const pickAndUploadAvatar = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Требуется разрешение для доступа к галерее');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) return;

      const uri = result.assets?.[0]?.uri;
      if (!uri) {
        alert('Ошибка при выборе изображения');
        return;
      }

      await uploadAvatar(uri);
      await refetchUser();
    } catch (error) {
      console.error('Ошибка при загрузке аватара:', error);
      alert('Ошибка при загрузке аватара');
    }
  };

  if (!user) {
    return (
      <View style={{ padding: 16 }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.avatarContainer} onPress={pickAndUploadAvatar}>
        <Image
          source={
            user.avatar
              ? { uri: user.avatar.startsWith('http') ? user.avatar : `${BASE_URL}${user.avatar}` }
              : require('../../../assets/images/main-images/profile-images/Avatar.png')
          }
          style={styles.avatar}
        />
      </TouchableOpacity>

      <View style={styles.userInfoContainer}>
        <TouchableOpacity onPress={handleSetDisplayName}>
          <Text style={styles.displayNameText}>
            {user.displayName || 'Установить имя'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.userNameText}>@{user.userName}</Text>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  userInfoContainer: {
    rowGap: 4,
    alignItems: 'center',
  },
  displayNameText: {
    fontSize: 20,
  },
  userNameText: {
    fontSize: 14,
    color: '#0EA2DE',
  },
  headerContainer: {
    flexDirection: 'column',
    rowGap: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});