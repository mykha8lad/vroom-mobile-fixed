import { createStackNavigator } from '@react-navigation/stack';

import ProfilePage from '@/pages/profile/ProfilePage';
import MyChannelPage from '@/pages/my-channel/MyChannelPage';
import HistorySection from '@/pages/history-section/HistorySection';
import PlaylistsSection from '@/pages/playlists-section/PlaylistsSection';
import SettingsSection from '@/pages/settings-section/SettingsSection';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="GeneralChannel" component={MyChannelPage} />
            <Stack.Screen name="History" component={HistorySection} />
            <Stack.Screen name="Playlists" component={PlaylistsSection} />
            <Stack.Screen name="Settings" component={SettingsSection} />
        </Stack.Navigator>
    );
};

export default ProfileStack;