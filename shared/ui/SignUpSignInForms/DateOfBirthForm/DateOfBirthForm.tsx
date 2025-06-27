import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { styles } from './DateOfBirthFormStyles';

interface DateOfBirthFormProps {
    selectedDate: string;
    onPress: () => void;
    isVisible: boolean;
    onConfirm: (date: any) => void;
    onCancel: () => void;
}

export const DateOfBirthForm: React.FC<DateOfBirthFormProps> = ({ selectedDate, onPress, isVisible, onConfirm, onCancel }) => {
    return(
        <View>
            <Text style={styles.label}>Date of Birth</Text>
                           
            <TouchableOpacity style={[styles.input, { width: '100%' }]} onPress={onPress}>
                <Text style={{ color: selectedDate ? '#000' : '#808080' }}>
                    {selectedDate || 'Select Date'}
                </Text>
            </TouchableOpacity>
        
            <DateTimePickerModal
                isVisible={isVisible}
                mode="date"
                onConfirm={onConfirm}
                onCancel={onCancel}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
            />
        </View>
    )
}
