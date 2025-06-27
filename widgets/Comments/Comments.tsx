import React, { useState, useEffect, useRef } from 'react';
import { useVideoStore } from '@/shared/store/useVideoStore';
import { useCommentStore } from '@/shared/store/useCommentStore';
import Author from '../Author/Author';
import {
    View,
    Text,
    FlatList,
} from 'react-native';
import { styles } from './CommentsStyles';

const Comments = () => {    
    const video = useVideoStore((state) => state.video);
    const comments = useCommentStore((state) => state.comments);
    const fetchComments = useCommentStore((state) => state.fetchComments);
    const fetchedRef = useRef<string | null>(null); 

    useEffect(() => {
        if (video?.id && fetchedRef.current !== video.id) {          
            fetchedRef.current = video.id;
            fetchComments(video.id);
        }
    }, [video?.id]);

    if (!video) return null;    

    return (
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Комментарии:</Text>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold' }}>{item.userId}</Text>
                        <Text>{item.text}</Text>
                        <Text style={{ fontSize: 12, color: 'gray' }}>{new Date(item.createdAt).toLocaleString()}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default Comments;