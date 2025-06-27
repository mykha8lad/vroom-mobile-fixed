import { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useVideoStore } from '@/shared/store/useVideoStore';
import Video from '@/widgets/Videos/VideoChannel/Video';

interface Props {
  userId: string;
}

const UserVideosList = ({ userId }: Props) => {
    const { userVideos, fetchUserVideos } = useVideoStore();

    useEffect(() => {
        fetchUserVideos(userId);
    }, [userId]);

    return (
        <View style={{ marginTop: 16 }}>
        {userVideos.length === 0 ? (
            <Text>У пользователя пока нет видео</Text>
        ) : (
            <FlatList
            data={userVideos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Video preview={item} />}
            />
        )}
        </View>
    );
};

export default UserVideosList;
