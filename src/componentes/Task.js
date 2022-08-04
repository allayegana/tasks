import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/FontAwesome";

import moment from "moment";
import 'moment/locale/pt-br'

import commonsStyles from "../commonsStyles";

export default props => {

    const doneNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}
    const date = props.doneAt ? props.doneAt : props.estimaAt

    const formatDate = moment(date).format('ddd D [de] MMMM ')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={style.right}
              activeOpacity={0.5}
                onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <View style={style.left}>
                <Icon name="trash" size={20} color='#FFF' style={style.exluirIcon} />
                <Text style={style.excluirText}>Excluir</Text>
            </View>
        )
    }

    return (
        <GestureHandlerRootView>
            <Swipeable
                renderRightActions={getRightContent}
                renderLeftActions={getLeftContent}
                onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
            >
                <View style={style.container}>
                    <TouchableWithoutFeedback
                        onPress={() => props.onToggleTask(props.id)}
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
            </Swipeable>
        </GestureHandlerRootView>
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
        backgroundColor: '#FFF'
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
    date: {
        fontFamily: commonsStyles.fontFamily,
        color: commonsStyles.colors.subText,
        fontSize: 16
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',

    },
    excluirText: {
        fontFamily: commonsStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    },
    exluirIcon: {
        marginLeft: 10
    }

})