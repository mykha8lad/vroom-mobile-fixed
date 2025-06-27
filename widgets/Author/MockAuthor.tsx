import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { User } from '@/shared/store/useUserStore';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const mockUser: User = {
  id: 'user-12345',
  userName: 'cool_channel',
  displayName: 'Cool Channel',
  subscriptions: ['channel-54321', 'channel-98765'],
  followersCount: 15432,
  email: 'cool.channel@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  videos: [],
};

const MockAuthor = ({ user = mockUser }: { user?: User }) => {
    return (
        <View style={styles.authorContainer}>
        <View style={styles.authorInfo}>
            <TouchableOpacity style={styles.authorLink}>
                <Image
                    source={
                    user.avatar
                        ? { uri: user.avatar }
                        : require('../../assets/images/main-images/profile-images/Avatar.png')
                    }
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.authorName}>{user.userName || 'Автор'}</Text>
                    <Text style={styles.authorFollowers}>
                        {user.followersCount?.toLocaleString() || 0} followers
                    </Text>
                </View>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.followBtn}>
            <Text style={styles.followBtnText}>Follow</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    authorContainer: {
        position: 'absolute',
        bottom: 20,
        left: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 10,
        columnGap: 105,
    },
    authorInfo: {
        marginRight: 10,
    },
    authorLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 8,
    },
    authorName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    authorFollowers: {
        color: '#ddd',
        fontSize: 12,
    },
    followBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#0EA2DE',
        borderRadius: 5,
    },
    followBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default MockAuthor;
