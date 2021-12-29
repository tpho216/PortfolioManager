import {StyleSheet} from "react-native";

export const modalStyles = StyleSheet.create({
    view : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lbl : {
        marginVertical: 30,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'black',
    },
    input : {
        width: '90%',
        height: 70,
        borderColor: 'grey',
        borderWidth: 1,
        fontSize: 25,
        color: 'black',
    },
    touchableSave : {
        backgroundColor: 'orange',
        paddingHorizontal: 100,
        alignItems: 'center',
        marginTop: 20,
    }

});

export const sectionStyles = StyleSheet.create({
    container: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
    },
    description: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    listItem: {
        borderBottomWitdth: 1,
        alignItems: "flex-start",
        backgroundColor: 'gray',
    },
    listItemName: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'black',
    },
})
