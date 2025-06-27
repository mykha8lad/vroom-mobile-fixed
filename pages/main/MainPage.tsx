import React from 'react';
import { styles } from './MainPageStyles';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { useUserStore } from '@/shared/store/useUserStore';
import { useNavigation } from '@react-navigation/native';

import MyChannelPage from '@/pages/my-channel/MyChannelPage';

import RecommendedPage from '@/pages/recommended/ReccomendedPage';
import BriefsPage from '@/pages/briefs/BriefsPage';
import FollowedPage from '@/pages/followed/FollowedPage';
import SearchPage from '@/pages/search/SearchPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import ProfileStack from '@/app/sections.routes';

import NotificationsIcon from '@/assets/images/main-images/Notifications.svg';
import AddVideoIcon from '@/assets/images/main-images/AddVideo.svg';
import LogotypeIcon from '@/assets/images/main-images/Logotype.svg';

import RecommendedActiveIcon from '@/assets/images/main-images/main-navigation-icons/active/RecommendedActive.svg';
import BriefsActiveIcon from '@/assets/images/main-images/main-navigation-icons/active/BriefsActive.svg';
import SearchActiveIcon from '@/assets/images/main-images/main-navigation-icons/active/SearchActive.svg';
import FollowedActiveIcon from '@/assets/images/main-images/main-navigation-icons/active/FollowedActive.svg';

import RecommendedNoActiveIcon from '@/assets/images/main-images/main-navigation-icons/inactive/RecommendedNoActive.svg';
import BriefsNoActiveIcon from '@/assets/images/main-images/main-navigation-icons/inactive/BriefsNoActive.svg';
import SearchNoActiveIcon from '@/assets/images/main-images/main-navigation-icons/inactive/SearchNoActive.svg';
import FollowedNoActiveIcon from '@/assets/images/main-images/main-navigation-icons/inactive/FollowedNoActive.svg';

const ProfileIcon = ({ focused }: { focused: boolean }) => {
    const user = useUserStore((state) => state.user);
  
    return (
        <View style={[{
            width: 28,
            height: 28,
            borderRadius: 50,
            borderWidth: focused ? 1 : 0,
            borderColor: focused ? '#0EA2DE' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            margin: focused ? -2 : 0,
        }]}>
            <Image
            source={
                user?.avatar
                ? { uri: user.avatar }
                : require('../../assets/images/main-images/profile-images/Avatar.png')
            }
            style={{
                width: 24,
                height: 24,
                borderRadius: 50,
                opacity: focused ? 1 : 0.6,
            }}
            />
        </View>
    );
};

const icons: any = {
    Recommended: {
        active: RecommendedActiveIcon,
        inactive: RecommendedNoActiveIcon,
    },
    Briefs: {
        active: BriefsActiveIcon,
        inactive: BriefsNoActiveIcon,
    },
    Search: {
        active: SearchActiveIcon,
        inactive: SearchNoActiveIcon,
    },
    Followed: {
        active: FollowedActiveIcon,
        inactive: FollowedNoActiveIcon,
    },
};

import {
    View,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Platform,
    Image,
} from 'react-native';

const Header = () => {
    const navigation: any = useNavigation();

    const handleUploadVideo = () => {
        navigation.navigate('UploadVideo');
    }

    return(
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <LogotypeIcon/>
                    
                <View style={styles.toolsList}>
                    <TouchableOpacity onPress={handleUploadVideo}>
                        <AddVideoIcon/>
                    </TouchableOpacity>

                    <TouchableOpacity>                        
                        <NotificationsIcon/>
                    </TouchableOpacity>
                </View>
            </View>        
        </View>
    )
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabIcon = ({ focused, IconActive, IconInactive }: any) => { 
    return (
        <View style={ styles.tabIcon }>
            {focused ? <IconActive width={24} height={24} /> : <IconInactive width={24} height={24} />}
        </View>
    );
};

const TabNavigetion = () => {
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="#000" barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />            

                <Header />

                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused }) => {
                            if (route.name === 'Profile') {
                                return <ProfileIcon focused={focused} />;
                            }
                
                            const IconActive = icons[route.name].active;
                            const IconInactive = icons[route.name].inactive;
                
                            return (
                                <CustomTabIcon
                                focused={focused}
                                IconActive={IconActive}
                                IconInactive={IconInactive}
                                />
                            );
                        },
                            tabBarStyle: styles.tabBar,
                            tabBarShowLabel: false,
                            headerShown: false,
                            animation: 'shift',
                        })}
                    >
                    <Tab.Screen name="Recommended" component={RecommendedPage} />
                    <Tab.Screen name="Briefs" component={BriefsPage} />
                    <Tab.Screen name="Search" component={SearchPage} />
                    <Tab.Screen name="Followed" component={FollowedPage} />
                    <Tab.Screen name="Profile" component={ProfileStack} />
                </Tab.Navigator>                        

        </SafeAreaView>
    )
}

export default function MainPage() {    
    return (
        <Stack.Navigator>      
            <Stack.Screen 
                name="MainTabs" 
                component={TabNavigetion} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    )
}