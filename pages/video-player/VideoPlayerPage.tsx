import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import { useVideoStore } from '@/shared/store/useVideoStore';
import { useFetchedUsersStore, User } from '@/shared/store/useUserStore';
import { Video, ResizeMode } from 'expo-av';
import {
    View,
    Text,
    FlatList,
    StatusBar,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { styles } from './VideoPlayerPageStyles';
import BottomShadow from '@/widgets/BottomShadow/BottomShadow';
import VideoPreviewForList from '@/widgets/Videos/VideoRecommended/Video';
import Author from '@/widgets/Author/Author';
import Comments from '@/widgets/Comments/Comments';
import Interactions from '@/widgets/Likes/Likes';
import CommentInput from '@/widgets/Comments/CommentInput';

const VideoPlayer = memo(({ uri }: { uri: string }) => {
    const videoRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    if (!uri) {
        return <Text>⏳ Загрузка видео...</Text>;
    }

    return (
        <Video
            ref={videoRef}
            source={{ uri: uri.startsWith('http') ? uri : `https://back.buhprogsoft.com.ua${uri}` }}
            style={{ width: '100%', height: 220, backgroundColor: '#000' }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={isReady}
            onReadyForDisplay={() => setIsReady(true)}
            onError={(err) => console.log('❌ Video error:', err)}
        />
    );
});

const VideoList = () => {
    const { videos } = useVideoStore();
    return (
        <FlatList
            data={videos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <VideoPreviewForList preview={item} />}
            scrollEnabled={false}
        />
    );
};

export default function VideoPlayerPage() {
    const route = useRoute();
    const params = route.params as { videoId?: string };
    const videoId = params?.videoId;
    const fetchedIdRef = useRef<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [author, setAuthor] = useState<User | null>(null);

    const { video, fetchVideoById } = useVideoStore();
    const { fetchedUsers, fetchUserById } = useFetchedUsersStore();

    useEffect(() => {
        const loadData = async () => {
            if (!videoId || fetchedIdRef.current === videoId) return;

            setIsLoading(true);
            fetchedIdRef.current = videoId;

            try {
                await fetchVideoById(videoId);

                const userId = useVideoStore.getState().video?.userId;
                const user = useVideoStore.getState().video?.user;

                if (!user && userId) {
                    const cached = useFetchedUsersStore.getState().fetchedUsers[userId];
                    if (!cached) {
                        await fetchUserById(userId);
                    }
                    setAuthor(useFetchedUsersStore.getState().fetchedUsers[userId] || null);
                } else {
                    setAuthor(user || null);
                }
            } catch (err) {
                console.warn('❌ Ошибка при загрузке видео или автора:', err);
            }

            setIsLoading(false);
        };

        loadData();
    }, [videoId]);

    const renderHeader = useCallback(() => {
        if (!video) return null;

        return (
            <>
                <VideoPlayer uri={video.videoUrl} />
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>{video.title}</Text>
                    <View style={styles.info}>
                        <Text style={styles.infoText}>{video.viewsCount ?? 0} views</Text>
                        <Text style={styles.infoText}>{new Date(video.createdAt).toLocaleDateString()}</Text>
                    </View>
                </View>

                {(video.user || author) && <Author user={video.user || author} />}
                <Interactions videoId={video.id} />
                <Comments />
                <CommentInput />
                <View style={{ marginTop: 16 }}>
                    <VideoList />
                </View>
            </>
        );
    }, [video, author]);

    if (isLoading || !video) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
            <FlatList
                data={[]}
                renderItem={() => null}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
            />
            <BottomShadow />
        </View>
    );
}
