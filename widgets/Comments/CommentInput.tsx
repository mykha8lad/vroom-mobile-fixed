import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useCommentStore } from '@/shared/store/useCommentStore';
import { useVideoStore } from '@/shared/store/useVideoStore';

const CommentInput = () => {
    const [text, setText] = useState('');
    const { video } = useVideoStore();
    const { addComment } = useCommentStore();

    const handleSubmit = async () => {
        if (video && text.trim()) {
            await addComment(video.id, text.trim());
            setText('');
        } else {
            console.warn('⚠️ Пустой комментарий или видео не найдено');
        }
    };

    return (
        <View style={{ flexDirection: 'row', padding: 16 }}>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Добавить комментарий..."
                style={{ flex: 1, borderBottomWidth: 1, marginRight: 8 }}
            />
            <Button title="Отправить" onPress={handleSubmit} />
        </View>
    );
};

export default CommentInput;
