import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import moment from "moment";
import 'moment/locale/pt-br'

import commonsStyles from "../commonsStyles";

export default props => {

    const doneNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}
        const date = props.doneAt ? props.doneAt: props.estimaAt

        const formatDate = moment(date).format('ddd D [de] MMMM ')

    return (
        <View style={style.container}>
            <TouchableWithoutFeedback
            onPress={() => props.toggleTask(props.id)}
            >
            <View style={style.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[style.desc, doneNotStyle]}>{props.desc}</Text>
                <Text style={style.date} >{formatDate}</Text>
            </View>
            
        </View>
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={style.done}>
                <Icon name="check" size={20} color='#FFF' />
            </View>

        )
    } else {
        return (
            <View style={style.pending}></View>
        )
    }

}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: "#AAA",
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },

    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#555"
    }, done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonsStyles.fontFamily,
        color: commonsStyles.colors.mainText,
        fontSize: 20
    },
    date:{
        fontFamily: commonsStyles.fontFamily,
        color: commonsStyles.colors.subText,
        fontSize: 16
    }

})