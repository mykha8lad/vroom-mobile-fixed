import {
    View,
    Text,
    TextInput,
} from 'react-native';

import { styles } from './RepeatPasswordFormStyles';

interface RepeatPasswordFormProps {
    repeatPassword: string;
    repeatPasswordError: string;
    onChangeText: (text: string) => void;
}

export const RepeatPasswordForm: React.FC<RepeatPasswordFormProps> = ({ repeatPassword, repeatPasswordError, onChangeText }) => {
    return(
        <View>
            <View style={styles.labelErrorText}>
                <Text style={styles.label}>Repeat password</Text>
                    {repeatPasswordError !== '' && (
                <Text style={styles.errorText}>
                    {repeatPasswordError}
                </Text>
                )}
            </View>
            <TextInput
                style={[
                styles.input,
                repeatPasswordError !== '' && styles.inputError,
            ]}          
                placeholderTextColor="#808080"
                secureTextEntry
                onChangeText={onChangeText}
                value={repeatPassword}
            />
        </View>
    )
}
