import React, { useRef } from 'react'
import {
    View,   
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    TextInput,
    Animated,
    PanResponder,
} from 'react-native';
import { styles } from './FiltersStyles'

const Filters = () => {
    const panResponder = useRef(
            PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                translateY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 100) {
                animateSheet(300, () => {
                    setIsVisible(false);
                    setIsSelected(false);
                });
                } else {
                animateSheet(0);
                }
            },
            })
    ).current;

    return (
        <Animated.View
            style={[styles.bottomSheet, { transform: [{ translateY }] }]}
            {...panResponder.panHandlers}
        >
            <View style={styles.line} />
                
        </Animated.View>
    )
}

export default Filters;