import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    postContainer: {
        flexDirection: 'column',
        rowGap: 8,
        marginBottom: 17,
    },
    authorInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 16,
    },
    authorInfo: {
        flexDirection: 'row',
        columnGap: 8,
        alignItems: 'center',
    },
    postContent: {
        flexDirection: 'column',
        rowGap: 8,
    },
    footerPost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 16,
        alignItems: 'center',
    },
    ratingRow: {
        flexDirection: 'row',
        columnGap: 20,
    },
    ratingItem: {
        flexDirection: 'row',
        columnGap: 8,
        alignItems: 'center',
    },
})