import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./VideoHistoryStyles";

export const VideoHistory = ({ preview }: any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image source={preview.videoPreview} style={styles.video} resizeMode="cover" />
            </TouchableOpacity>
    
            <View style={styles.infoContainer}>                
                <View style={styles.timeView}>
                    <Text style={styles.timeText}>{preview.time}</Text>                    
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{preview.titleVideo}</Text>                    
                    <Text style={styles.subTitle}>{preview.channelName}</Text>                    
                </View>                
            </View>
        </View>
    );
};