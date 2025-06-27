import React from 'react';

import Post from '@/widgets/Posts/Post'
import { posts } from '@/shared/api/testData';
import { styles } from './PostsArticleStyles';

import {
    View,
    FlatList,  
    ScrollView,
} from 'react-native';

export default function PostsArticle() {
    return(
        <ScrollView>
            <View style={styles.postsColumn}>
                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => ( <Post preview={item} /> )}
                    scrollEnabled={false}
                />
            </View>
        </ScrollView>
    )
}