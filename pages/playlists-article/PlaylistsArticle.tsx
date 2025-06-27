import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import { styles } from './PlaylistsArticleStyles';

import { videosPlaylists } from '@/shared/api/testData';
import { AuthorPlaylist } from '@/widgets/Playlists/AuthorPlaylist/AuthorPlaylist';

export default function PlaylistsArticle({ navigation }: any) {
    return(
        <View style={styles.videosRow}>
            <FlatList
                data={videosPlaylists}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => ( <AuthorPlaylist preview={item[item.length-1]} playlist={item}  navigation={navigation}/> )}
                scrollEnabled={false}
            />
        </View>
    )
}