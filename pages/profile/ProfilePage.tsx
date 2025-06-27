import React, { FC, useState, useEffect } from 'react';

import { useUserStore } from '@/shared/store/useUserStore';
import { User } from '@/shared/store/useUserStore';

import { VideoHistory } from '@/widgets/Videos/VideoHistory/VideoHistory';
import { MyPlaylist } from '@/widgets/Playlists/MyPlaylist/MyPlaylist';
import { styles } from './ProfilePageStyles';
import { videos } from '@/shared/api/testData';
import { videosPlaylists } from '@/shared/api/testData';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';

import UserIcon from '@/assets/images/main-images/profile-images/nav-images/User.svg';
import HistoryIcon from '@/assets/images/main-images/profile-images/nav-images/History.svg';
import PlaylistsIcon from '@/assets/images/main-images/profile-images/nav-images/Playlists.svg';
import SettingsIcon from '@/assets/images/main-images/profile-images/nav-images/Settings.svg';
import AngleIcon from '@/assets/images/main-images/profile-images/nav-images/Angle.svg';
import UserCard from '@/entities/user/ui/UserCard';

export type RootStackParamList = {
    GeneralChannel: { user: User };
    Settings: { user: User };
    Playlists: { user: User };
    History: { user: User };
};

type ProfileNavProp = NativeStackNavigationProp<RootStackParamList>;

interface ProfileNavItemProps {
    Icon: React.FC;
    title: string;
    screenName: keyof RootStackParamList;
    user: User;  
}

const ProfileNavItem: React.FC<ProfileNavItemProps> = ({ Icon, title, screenName, user }) => {
    const navigation = useNavigation<ProfileNavProp>();

    return (
        <View>
            <TouchableOpacity style={styles.profileNavButton} onPress={() => navigation.navigate(screenName, { user })}>
                <View style={styles.profileNavButtonRow}>
                    <Icon />
                    <Text style={styles.profileNavButtonText}>{title}</Text>
                </View>
                <AngleIcon />
            </TouchableOpacity>
        </View>
    );
};

export default function ProfilePage({ navigation }: any) {  
    const { user } = useUserStore();

    useEffect(() => {
        if (user) {
            console.log('User данные обновились в Zustand:', user);
        } else {
            console.log('Данные пользователя не найдены');
        }    
    }, [user]); 

    if (!user) {
        return (
            <View style={{ padding: 20 }}>
                <Text>Ошибка загрузки пользователя</Text>
            </View>
        );
    }

    return(
        <ScrollView style={{backgroundColor: '#fff', height: '100%'}}>
                            
            {user ? (
                <UserCard user={user} />
            ) : (
                <Text>Ошибка загрузки пользователя</Text>
            )}            

                <View style={styles.profileNavContainer}>
                    
                    <ProfileNavItem Icon={UserIcon} title="Your channel" screenName='GeneralChannel' user={user}/>
                    <ProfileNavItem Icon={HistoryIcon} title="History" screenName='History' user={user}/>

                    <View style={styles.videosRow}>
                        <FlatList
                            data={videos}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <VideoHistory preview={item} />}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <ProfileNavItem Icon={PlaylistsIcon} title="Playlists" screenName='Playlists' user={user}/>

                    <View style={styles.videosRow}>
                        <FlatList
                            data={videosPlaylists}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => ( <MyPlaylist preview={item[item.length-1]} playlist={item}  navigation={navigation}/> )}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <ProfileNavItem Icon={SettingsIcon} title="Settings" screenName='Settings' user={user}/>

                </View>            
        </ScrollView>
    );
}

