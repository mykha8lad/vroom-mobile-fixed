import { View, Text, Image, TouchableOpacity } from "react-native";
import PlaylistsIcon from './icons/Playlists.svg';
import { styles } from "./MyPlaylistStyles";

export const MyPlaylist = ({ preview, playlist, navigation }: any ) => {    

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('PlaylistPreview', { videos: playlist })}
            style={styles.container}
        >
            <Image source={preview.videoPreview} style={styles.video} resizeMode="cover" />

            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <PlaylistsIcon width={15} height={15}/>
                    <Text style={styles.timeText}>{playlist.length} videos</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{preview.titleVideo}</Text>
                    <Text style={styles.subTitle}>{preview.channelName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};