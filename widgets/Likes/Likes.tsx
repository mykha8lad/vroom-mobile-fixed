import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { styles } from './LikesStyles';
import AddToPlaylistIcon from '@/shared/icons/video-player-page-icons/AddToPlaylist.svg';
import DislikeIcon from '@/shared/icons/video-player-page-icons/Dislike.svg';
import LikeIcon from '@/shared/icons/video-player-page-icons/Like.svg';
import ReportIcon from '@/shared/icons/video-player-page-icons/Report.svg';
import ShareIcon from '@/shared/icons/video-player-page-icons/Share.svg';

import { useLikeStore } from '@/shared/store/useLikeStore';

const Interactions = ({ videoId }: { videoId: string }) => {
    
    const {
        likesCount,
        dislikesCount,
        userReaction,
        loading,
        handleLike,
        handleDislike,
        initialize,
    } = useLikeStore();
        
        useEffect(() => {
        if (videoId) {
        initialize(videoId);
        }
    }, [videoId]);
    
    return (
        <View style={styles.interactionsContainer}>
            <View style={styles.likesDislikesContainer}>

                <View style={styles.ldCont}>
                    <TouchableOpacity onPress={() => handleLike(videoId)} disabled={loading}>
                        <LikeIcon color={userReaction === true ? 'blue' : 'gray'} />
                    </TouchableOpacity>
                    <Text>{likesCount ?? 0}</Text>
                </View>

                <View style={styles.ldCont}>
                    <TouchableOpacity onPress={() => handleDislike(videoId)} disabled={loading}>
                        <DislikeIcon color={userReaction === false ? 'blue' : 'gray'} />
                    </TouchableOpacity>
                    <Text>{dislikesCount ?? 0}</Text>
                </View>
                
            </View>

            <View style={styles.linksRow}>
                <TouchableOpacity><ShareIcon /></TouchableOpacity>
                <TouchableOpacity><AddToPlaylistIcon /></TouchableOpacity>
                <TouchableOpacity><ReportIcon /></TouchableOpacity>
            </View>
        </View>
    );
};

export default Interactions;