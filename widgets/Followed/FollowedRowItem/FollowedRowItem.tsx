import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { styles } from "./FollowedRowItemStyles";

const FollowedRowItem = ({ preview }: any) => {    
    return (
        <TouchableOpacity style={styles.container}>    
            <View>
                <Image source={preview.avatarUser} />
            </View>
            <View>
                <Text style={styles.channelName}>{preview.channelName}</Text>
            </View>            
        </TouchableOpacity>
    );
};

export default FollowedRowItem;