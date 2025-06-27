import {
    View,
    Text,
    TextInput,
  } from 'react-native';

import { styles } from './UserNameFormStyles';

interface UserNameFormProps {
    userName: string;
    userNameError: string;
    onChangeText: (text: string) => void;
}

export const UserNameForm: React.FC<UserNameFormProps> = ({ userName, userNameError, onChangeText }) => {
    return (
        <View>
            <View style={styles.labelErrorText}>
                <Text style={styles.label}>Username</Text>
                {userNameError !== '' && (
                    <Text style={styles.errorText}>
                        {userNameError}
                    </Text>
                )}
            </View>
            <TextInput
                style={[
                    styles.input,
                    userNameError !== '' && styles.inputError,
                ]}
                placeholder="@"
                placeholderTextColor="#808080"
                onChangeText={onChangeText}
                value={userName}
            />
        </View>
    );
};