import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { styles } from './AuthorStyles';

const Author = ({ user }: any) => {
    const navigation: any = useNavigation();

    const handleAuthor = () => {
        navigation.navigate('Channel', { user });
    };

    return (
        <View style={styles.authorContainer}>
            <View style={styles.authorInfo}>
                <TouchableOpacity style={styles.authorLink} onPress={handleAuthor}>
                    <Image
                        source={
                            user.avatar
                                ? { uri: user.avatar }
                                : require('../../assets/images/main-images/profile-images/Avatar.png')
                        }
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                    <Text style={styles.authorName}>{user.userName || 'Автор'}</Text>
                </TouchableOpacity>
                <Text style={styles.authorFollowers}>
                    {user.followersCount || 0} followers
                </Text>
            </View>

            {/* {!isCurrentUser && ( */}
                <TouchableOpacity
                    style={[
                        styles.followBtn,
                                        // isSubscribed ? '#E6E6E6' :
                        { backgroundColor:  '#007AFF' },
                    ]}
                    // onPress={handleFollowPress}
                    >
                
                {/* // isSubscribed ? '#000' : */}
                    <Text style={[styles.followBtnText, { color:  '#fff' }]}>
                        {/* {isSubscribed ? 'Following' : 'Follow'} */}
                        Following
                    </Text>
                </TouchableOpacity>
            {/* )} */}
        </View>
    );
};

export default Author;