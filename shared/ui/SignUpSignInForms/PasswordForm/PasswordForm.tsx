import {
    View,
    Text,
    TextInput,
} from 'react-native';

import { styles } from './PasswordFormStyles';

interface PasswordFormProps {
    password: string;
    passwordError: string;
    onChangeText: (text: string) => void;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({ password, passwordError, onChangeText }) => {
    return(
        <View>
            <View style={styles.labelErrorText}>
                <Text style={styles.label}>Password</Text>
                {passwordError !== '' && (
                <Text style={styles.errorText}>
                    {passwordError}
                </Text>                    
                )}
            </View>
            <TextInput
                style={[
                styles.input,
                passwordError !== '' && styles.inputError,
            ]}        
                placeholderTextColor="#808080"
                secureTextEntry
                onChangeText={onChangeText}
                value={password}
            />
        </View>
    )
}


