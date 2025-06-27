import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, Button, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useVideoStore } from '@/shared/store/useVideoStore';
import { styles } from './UploadVideoStyles';
import { useUserStore } from '@/shared/store/useUserStore';

const Author = ({ user }: any) => {
    return (
        <View style={styles.authorContainer}>
            <View style={styles.authorInfo}>
                <TouchableOpacity style={styles.authorLink}>
                    <Image
                        source={
                            user.avatar
                                ? { uri: user.avatar }
                                : require('../../assets/images/main-images/profile-images/Avatar.png')
                        }
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                    <View>
                        <Text style={styles.authorDisplayName}>{user.displayName ? user.displayName : user.userName}</Text>
                        <Text style={styles.authorName}>{'@' + user.userName || 'Автор'}</Text>
                    </View>
                </TouchableOpacity>
            </View>            
        </View>
    );
};

const UploadVideo = () => {
    const { user } = useUserStore.getState();
    
    const parseJwt = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                .split('')
                .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join('')
            );
            return JSON.parse(jsonPayload);

        } catch (e) {
            console.error('Ошибка при декодировании токена:', e);
            return {};
        }
    };

    const [videoFile, setVideoFile] = useState<any>(null);
    const [thumbnail, setThumbnail] = useState<any>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const uploadVideo = useVideoStore(state => state.uploadVideo);

    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
        });
      
        if (!result.canceled && result.assets?.length > 0) {
          setVideoFile(result.assets[0]);
        }
    };

    const pickThumbnail = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        });
        if (!result.canceled) {
        setThumbnail(result.assets[0]);
        }
    };

    useEffect(() => {
        (async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Для загрузки видео нужно разрешение к галерее');
          }
        })();
      }, []);

    const handleUpload = async () => {
        if (!videoFile || !thumbnail || !title) return;
      
        const token = await AsyncStorage.getItem('token');
        const decodedToken: any = parseJwt(token!);

        console.log('Расшифрованный токен:', decodedToken);
        const userId = decodedToken.sub;
      
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videoFile', {
            uri: videoFile.uri,
            type: 'video/mp4',
            name: 'upload.mp4',
        } as any);
        console.log(formData);
        
        formData.append('thumbnailFile', {
            uri: thumbnail.uri,
            type: 'image/jpeg',
            name: 'thumb.jpg',
        } as any);
      
        try {
            await uploadVideo(formData);
            alert('Видео успешно загружено!');
        } catch (err) {
            console.log('Ошибка при загрузке видео:', err);
        }
    };

    return (     
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <Text style={{ fontWeight: 500, fontSize: 21 }}>Add data</Text>

                <View style={styles.addVideo}>                    
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={pickVideo} style={styles.addBtn}>
                            <Text style={{ fontSize: 18, color: '#fff' }}>Select video</Text>
                        </TouchableOpacity>
                        {videoFile && <Text>Выбрано</Text>}

                        <TouchableOpacity onPress={pickThumbnail} style={styles.addBtn}>
                            <Text style={{ fontSize: 18, color: '#fff' }}>Select cover</Text>
                        </TouchableOpacity>                    
                        {thumbnail && <Image source={{ uri: thumbnail.uri }} style={{ width: 100, height: 100 }} />}
                    </View>
                    <TextInput placeholder="Add Title" value={title} onChangeText={setTitle} placeholderTextColor="#808080" multiline={true} style={styles.input}/>
                </View>

                <View style={styles.line}/>

                <View>
                    {user ? (
                        <Author user={user} />
                    ) : (
                        <Text>Ошибка загрузки пользователя</Text>
                    )}
                </View>                                
            </ScrollView> 

        <View style={{ paddingHorizontal: 16, backgroundColor: '#fff' }}>
            <TouchableOpacity onPress={handleUpload} style={styles.uploadBtn}>
                <Text style={{ color: '#fff', fontWeight: 600 }}>Upload</Text>
            </TouchableOpacity>            
        </View>
        </View>                   
    );
};

export default UploadVideo;
