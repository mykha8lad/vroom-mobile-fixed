import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import styles from './VideoStyles';
import { useNavigation } from '@react-navigation/native';
import MoreIcon from './icons/More.svg';
import React, { useEffect } from 'react';
import { useFetchedUsersStore } from '@/shared/store/useUserStore';

const BASE_URL = 'https://back.buhprogsoft.com.ua';

const VideoPreviewForList = ({ preview }: { preview: any }) => {
    const navigation: any = useNavigation();
    const { fetchedUsers, fetchUserById } = useFetchedUsersStore();

    const author = preview.user || fetchedUsers[preview.userId];

    useEffect(() => {
        if (!preview.user && preview.userId && !fetchedUsers[preview.userId]) {
            fetchUserById(preview.userId);
        }
    }, [preview.user, preview.userId, fetchedUsers]);

    const handlePress = () => {
        navigation.navigate('VideoPlayer', { videoId: preview.id });
    };

    const handleMore = () => {
        Alert.alert('Действия с видео', 'Здесь можно реализовать удаление, редактирование и т.д.');
    };

    const getFullThumbnailUrl = (url: string) =>
        url?.startsWith('http') ? url : BASE_URL + url;

    const getAvatarUrl = (url?: string) =>
        url?.startsWith('http') ? url : BASE_URL + url;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <Image
                    source={{ uri: getFullThumbnailUrl(preview.thumbnailUrl) }}
                    style={styles.video}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            <View style={styles.infoContainer}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        source={
                            author?.avatar
                                ? { uri: getAvatarUrl(author.avatar) }
                                : require('../../../assets/images/main-images/profile-images/Avatar.png')
                        }
                        style={styles.thumbnail}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            {preview.title || 'Без названия'}
                        </Text>
                        <View style={styles.subTitleRow}>
                            <Text style={styles.subTitle}>{author?.userName || 'Автор'}</Text>
                            <Text style={styles.sep}>·</Text>
                            <Text style={styles.subTitle}>{preview.viewsCount ?? 0} views</Text>
                            <Text style={styles.sep}>·</Text>
                            <Text style={styles.subTitle}>
                                {new Date(preview.createdAt).toLocaleDateString()}
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={handleMore}>
                    <MoreIcon width={20} height={20} />
                </TouchableOpacity>

                <View style={styles.timeView}>
                    <Text style={styles.timeText}>
                        {preview.duration ? `${preview.duration}s` : '0s'}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default VideoPreviewForList;
