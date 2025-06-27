import {
    View,
    Text,
    TextInput,
} from 'react-native';

import { styles } from './EmailFormStyles';

interface EmailFormProps {
    email: string;
    emailError: string;
    onChangeText: (text: string) => void;
}

export const EmailForm: React.FC<EmailFormProps> = ({ email, emailError, onChangeText }) => {
    return(
        <View>
            <View style={styles.labelErrorText}>
                <Text style={styles.label}>Email</Text>
                {emailError !== '' && (
                    <Text style={styles.errorText}>
                        {emailError}
                    </Text>
                )}
            </View>
            <TextInput
                style={[
                styles.input,
                emailError !== '' && styles.inputError,
            ]}
                placeholder="example@example.com"
                placeholderTextColor="#808080"
                onChangeText={onChangeText}
                value={email}
            />
        </View>
    )
}
