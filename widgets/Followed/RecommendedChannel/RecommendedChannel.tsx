import { useState } from 'react';
import {
    View,   
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { styles } from './RecommendedChannelStyles';

export default function RecommendedChannel() {    
    return(
        <View style={styles.container}>
            <View style={styles.author}>
                <Image source={require('./Avatar.png')}/>

                <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>Travel Channel</Text>
                    <Text style={styles.authorUserName}>@TravelChannel</Text>
                    <Text style={styles.authorFollowersCount}>684K followers</Text>
                </View>
            </View>

            <View>
                <TouchableOpacity style={styles.followBtn}>
                    <Text style={styles.btnText}>Follow</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}