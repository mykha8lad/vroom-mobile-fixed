import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from './VideoStyles'

const Video = ({ preview }: any) => {
    const [paused, setPaused] = useState(true);
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setPaused(!paused)}>
                <Image source={{ uri: `https://back.buhprogsoft.com.ua/${preview.thumbnailUrl}` }} style={styles.video} resizeMode="cover" />
            </TouchableOpacity>
    
            <View style={styles.infoContainer}>
                <View style={styles.timeView}>
                    <Text style={styles.timeText}>{preview.time}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{preview.title}</Text>
                    <View style={styles.subTitleRow}>
                        <Text style={styles.subTitle}>{preview.viewsCount} views</Text>
                        <Text style={styles.sep}>·</Text>
                        <Text style={styles.subTitle}>{new Date(preview.createdAt).toLocaleDateString()} ago</Text>
                    </View>
                </View>                
            </View>
        </View>
    );
};

export default Video;