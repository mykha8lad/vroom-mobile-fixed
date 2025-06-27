import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ListRenderItemInfo,
  ViewToken,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import { styles } from './BriefsPageStyles';
import MockAuthor from '@/widgets/Author/MockAuthor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VIDEO_URLS: string[] = [
    'https://res.cloudinary.com/duumlrvzn/video/upload/v1750001089/zko34npk34oxek0cnuwm.mp4',
    'https://res.cloudinary.com/duumlrvzn/video/upload/v1750001090/ic2xzxmvtlhrllnokrhi.mp4',
    'https://res.cloudinary.com/duumlrvzn/video/upload/v1750001093/h8xjeloqu2ri57rms113.mp4',
];

export default function BriefsPage() {
    const videoRefs = useRef<(Video | null)[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const insets = useSafeAreaInsets();

    const screenHeight = Dimensions.get('screen').height;
    const tabBarHeight = 120;
    const videoHeight = screenHeight - insets.top - tabBarHeight;

    useFocusEffect(
        useCallback(() => {
        return () => {
            videoRefs.current.forEach((ref) => {
            if (ref) {
                ref.stopAsync().catch(() => {});
                ref.unloadAsync().catch(() => {});
            }
            });
        };
        }, [])
    );

    const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        const index = viewableItems[0]?.index;
        if (typeof index === 'number') {
        setCurrentIndex(index);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 90 });

    useEffect(() => {
        videoRefs.current.forEach(async (ref, index) => {
        if (ref) {
            try {
            if (index === currentIndex) {
                await ref.playAsync();
            } else {
                await ref.stopAsync();
            }
            } catch (e) {
            console.warn(`Ошибка управления видео на позиции ${index}:`, e);
            }
        }
        });
    }, [currentIndex]);

    const renderItem = ({ item, index }: ListRenderItemInfo<string>) => (
        <View style={[styles.page, { height: videoHeight }]}>
        <Video
            ref={(ref) => {
            videoRefs.current[index] = ref;
            }}
            source={{ uri: item }}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay={false}
            useNativeControls={false}
            volume={1.0}
        />
        <Text style={
            {
                position: 'absolute',
                color: '#fff',
                bottom: 75,
                left: 20,
                fontSize: 21,
                fontWeight: 600,

            }
        }>Удивительные прыгуны</Text>        
        <MockAuthor />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={{ height: 15, backgroundColor: '#fff', }}></View>
            <FlatList
                data={VIDEO_URLS}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                snapToInterval={videoHeight}
                snapToAlignment="start"
                decelerationRate="fast"
            />
        </View>
    );
}
