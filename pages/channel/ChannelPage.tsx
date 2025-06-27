import React, { useState, useRef, useEffect } from 'react';
import { styles } from './ChannelPageStyles';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import { useVideoStore } from '@/shared/store/useVideoStore';

import NotificationIcon from './follow-image/Notification.svg';
import AngleIcon from './follow-image/Angle.svg';

import TikTokIcon from '@/shared/icons/social-icons/TikTok.svg';
import InstagramIcon from '@/shared/icons/social-icons/Instagram.svg';
import XIcon from '@/shared/icons/social-icons/X.svg';
import DiscordIcon from '@/shared/icons/social-icons/Discord.svg';
import TelegramIcon from '@/shared/icons/social-icons/Telegram.svg';
import LinkIcon from '@/shared/icons/social-icons/Link.svg';

import HomeArticle from '@/pages/home-article/HomeArticle';
import VideosArticle from '@/pages/videos-article/VideosArticle';
import LiveArticle from '@/pages/live-article/LiveArticle';
import PostsArticle from '@/pages/posts-article/PostsArticle';
import PlaylistsArticle from '@/pages/playlists-article/PlaylistsArticle';
import AboutArticle from '@/pages/about-article/AboutArticle';

const MENU_ITEMS = [
    { key: 'home', title: 'Home' },
    { key: 'videos', title: 'Videos' },
    { key: 'live', title: 'Live' },
    { key: 'posts', title: 'Posts' },
    { key: 'playlists', title: 'Playlists' },
    { key: 'about', title: 'About' },
];

const PAGES: any = {
    home: HomeArticle,
    videos: VideosArticle,
    live: LiveArticle,
    posts: PostsArticle,
    playlists: PlaylistsArticle,
    about: AboutArticle,
  };

export default function ChannelPage() {
    const route = useRoute<RouteProp<{ params: { user: any } }, 'params'>>();
    const { user } = route.params;
    const { userVideos, fetchUserVideos } = useVideoStore();

    
    const [selected, setSelected] = useState('home');
    const [innerWidth, setInnerWidth] = useState(0);
    const indicatorAnim = useRef(new Animated.Value(0)).current;

    const spacing = 2;    
    const totalSpacing = (MENU_ITEMS.length - 1) * spacing;    
    const tabWidth = innerWidth > 0 ? (innerWidth - totalSpacing) / MENU_ITEMS.length -3 : 0;
    

    const onSelect = (key: any, index: any) => {
        setSelected(key);
        Animated.timing(indicatorAnim, {
          toValue: index * (tabWidth + spacing),
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }).start();
    };
          
    useEffect(() => {
        const index = MENU_ITEMS.findIndex(item => item.key === selected);
        if (innerWidth > 0) {
            indicatorAnim.setValue(index * (tabWidth + spacing));
        }
        if (user?.id) {
            fetchUserVideos(user.id);
        }
    }, [innerWidth, selected, tabWidth, indicatorAnim, user?.id]);

    const SelectedPage = PAGES[selected];

    return (
        <View style={styles.container}>
            <View style={styles.channelHeader}>

                <View style={styles.channelTitle}>
                    <Image source={user.avatar ? { uri: user.avatar } : require('@/assets/images/main-images/profile-images/Avatar.png')} height={10} width={10}/>

                    <View style={styles.channelTitleInfo}>
                        <Text style={styles.userNameText}>{user.userName || 'Автор'}</Text>
                        <Text  style={styles.userFollowersText}>{user.followersCount || 0} followers</Text>
                        <Text style={styles.nickNameText}>@{user.userName}</Text>
                    </View>

                </View>

                <View style={styles.channelSocialContainer}>

                    <TouchableOpacity style={styles.followingBtn}>
                        <NotificationIcon width={19} height={19}/>
                        <Text>Following</Text>
                        <AngleIcon width={19} height={19}/>
                    </TouchableOpacity>

                    <View style={styles.channelSocialRow}>
                    
                        <TouchableOpacity>
                            <TikTokIcon width={24} height={24}/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <InstagramIcon width={24} height={24}/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <XIcon width={24} height={24}/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <DiscordIcon width={24} height={24}/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <TelegramIcon width={24} height={24}/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <LinkIcon width={24} height={24}/>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
            <View style={styles.menuContainer}>                
                <View style={styles.menuInnerContainer} onLayout={e => setInnerWidth(e.nativeEvent.layout.width)}>
                    {MENU_ITEMS.map((item, index) => (
                        <TouchableOpacity key={item.key} style={[styles.menuItem, { width: tabWidth, marginRight: index < MENU_ITEMS.length - 1 ? spacing : 0, },]} onPress={() => onSelect(item.key, index)} activeOpacity={0.7}>
                            <Text style={[styles.menuItemText, selected === item.key && styles.menuItemTextSelected,]}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    ))}                    
                    {innerWidth > 0 && (
                        <Animated.View style={[styles.indicator, { width: tabWidth, left: indicatorAnim },]}/>
                    )}
                </View>
            </View>

            <View style={styles.pageContainer}>
                <View>
                    <SelectedPage />
                </View>
            </View>
        </View>
    )
}