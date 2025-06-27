import React, { useState, useRef, useEffect } from 'react';
import { useUserStore } from '@/shared/store/useUserStore';
import { useVideoStore } from '@/shared/store/useVideoStore';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

import { styles } from './HomeArticleStyles';
import Video from '@/widgets/Videos/VideoChannel/Video';
import VideoForYou from '@/widgets/Videos/VideoForYou/VideoForYou';

export default function HomeArticle() {
    const { user } = useUserStore();
    const { userVideos, fetchUserVideos } = useVideoStore();

    useEffect(() => {
        if (user?.id) {
        fetchUserVideos(user.id);
        }
    }, [user?.id]);

    const lastVideo = userVideos[userVideos.length - 1];

    return(
        <View style={styles.containerHomeSection}>
            {userVideos.length > 0 ? (
                <>
                {lastVideo && (
                    <View>
                    <Video preview={lastVideo} />
                    </View>
                )}

                <View style={styles.videosRow}>
                    <Text style={{ fontSize: 16 }}>For you</Text>
                    <FlatList
                    data={userVideos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <VideoForYou preview={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    />
                </View>
                </>
            ) : (
                <Text>У пользователя нет видео</Text>
            )}   
        </View>
    )
}