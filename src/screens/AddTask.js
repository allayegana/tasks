import React, { Component } from "react";
import {
    Platform,
    Modal, View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,

} from "react-native";
import commonsStyles from "../commonsStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";


const inicialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTasks extends Component {

    state = {
        ...inicialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }
        this.props.onSave && this.props.onSave(newTask)
        this.setState({ ...inicialState })
    }


    getDatePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date'
        />

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')
        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={style.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker

    }



    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={style.background}></View>
                </TouchableWithoutFeedback>
                <View style={style.container}>
                    <Text style={style.header}>Nova Tarefa</Text>
                    <TextInput style={style.input}
                        placeholder=" Informe a Descricao ..."
                        value={this.state.desc}
                        onChangeText={desc => this.setState({ desc })}
                    />
                    {this.getDatePicker()}
                    <View style={style.buttons}>
                        <TouchableOpacity activeOpacity={0.7} onPress={this.props.onCancel}>
                            <Text style={style.button}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7}
                            onPress={this.save}
                        >
                            <Text style={style.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={style.background}></View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonsStyles.fontFamily,
        backgroundColor: commonsStyles.colors.today,
        color: commonsStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontWeight: 'bold',
        fontSize: 18
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'

    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonsStyles.colors.today,
        fontSize: 17
    },
    input: {
        fontFamily: commonsStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#yellow',
        borderRadius: 6
    },
    date: {
        fontFamily: commonsStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
        fontSize: 22,
    }
})