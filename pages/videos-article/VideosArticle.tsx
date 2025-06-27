import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { useUserStore } from '@/shared/store/useUserStore';
import UserVideosList from '@/shared/ui/SignUpSignInForms/UserVideos/UserVideosList';

export default function VideosArticle() {
    const { user } = useUserStore();

    return(
        <View style={{marginBottom: 10}}>
            {user ? (
                <>          
                    <UserVideosList userId={user.id} />
                </>
            ) : (
                <Text>Ошибка загрузки пользователя</Text>
            )}
        </View>
    )
}