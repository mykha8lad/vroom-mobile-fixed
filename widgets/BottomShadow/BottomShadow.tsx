import { LinearGradient } from 'expo-linear-gradient';

const BottomShadow = () => (
    <LinearGradient
        colors={['transparent', 'rgba(255, 255, 255, 0.01)', 'rgb(255, 255, 255)']}
        style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        zIndex: 10,
        }}
        pointerEvents="none"
    />
);

export default BottomShadow;