import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '@/pages/main/MainPage';
import VideoPlayerPage from '@/pages/video-player/VideoPlayerPage';
import UploadVideo from '@/pages/upload-video/UploadVideo';
import ChannelPage from '@/pages/channel/ChannelPage';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (        
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Main" component={MainPage} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayerPage} />
            <Stack.Screen name="UploadVideo" component={UploadVideo} />
            <Stack.Screen name="Channel" component={ChannelPage} />
        </Stack.Navigator>        
    );
}