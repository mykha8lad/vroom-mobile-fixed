import { styles } from './WelcomePageStyles';

import {
    View,
    Text,  
    TouchableOpacity, 
    StatusBar,
    SafeAreaView,
    Platform,
} from 'react-native';

import PersonImage from '@/shared/icons/welcome-page-icons/Person.svg'
import GoogleIcon from '@/shared/icons/welcome-page-icons/Google.svg'
import FacebookIcon from '@/shared/icons/welcome-page-icons/Facebook.svg'
import AppleIcon from '@/shared/icons/welcome-page-icons/Apple.svg'

export default function WelcomePage({ navigation }: { navigation: any }) {
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#0EA2DE' barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
        
        <View style={styles.header}>
            <View style={styles.headerContent}>
            <Text style={styles.headerText}>Unleash your creativity</Text>
            <PersonImage />
            </View>
        </View>

        <View style={styles.body}>
            <View style={styles.bodyContent}>
                <Text style={styles.sectionTitle}>Sign up</Text>

                <TouchableOpacity style={[styles.button, { backgroundColor: '#0EA2DE' }]} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonText}>Create account</Text>
                </TouchableOpacity>          

                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                    <Text style={styles.lineText}>or</Text>
                    <View style={styles.line} />
                </View>

                <View style={{
                    flexDirection: 'column',
                    rowGap: 10
                }}>
                    <TouchableOpacity style={[styles.button, { borderColor: '#000', borderWidth: 1 }]}>
                        <View style={styles.iconContainer}>
                        <GoogleIcon />
                        </View>
                        <Text style={[styles.buttonText, { color: '#000' }]}>Continue with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor: '#1877F2' }]}>
                        <View style={styles.iconContainer}>
                        <FacebookIcon />
                        </View>
                        <Text style={styles.buttonText}>Continue with Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor: '#000' }]}>
                        <View style={styles.iconContainer}>
                        <AppleIcon />
                        </View>
                        <Text style={styles.buttonText}>Continue with Apple</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                style={{paddingVertical: 5, marginHorizontal: 70}}
                onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.link}>Already have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
}