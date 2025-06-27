import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

const PlaylistVideosColumn = ({ route }: any) => {
    const { videos } = route.params;

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Playlist</Text>

            <FlatList
                data={videos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ marginBottom: 20 }}>
                        <Image source={item.videoPreview} style={{ width: '100%', height: 200 }} resizeMode="cover" />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.titleVideo}</Text>
                        <Text style={{ color: 'gray' }}>{item.channelName}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default PlaylistVideosColumn;