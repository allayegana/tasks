import React, { Component } from "react";
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from "react-native";
import CommonsStyles from "../commonsStyles";
import Task from "../componentes/Task";
import Icon from "react-native-vector-icons/FontAwesome";
import TodayImage from '../../assets/imgs/today.jpg';

import moment from 'moment'
import 'moment/locale/pt-br'

export default class TaskList extends Component {

    state = {
        showDoneTasks:true,
        tasks: [
            {
                id: Math.random(),
                desc: "Comprar livro de react Native",
                estimaAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: "Ler livro de react Native",
                estimaAt: new Date(),
                doneAt: null,
            },
        ]
    }

    toggleFilter = () =>{
        this.setState({ showDoneTasks: !this.state.showDoneTasks})
    }

    toggleTask = taskId =>{
     const tasks = [ ...this.state.tasks]
     tasks.forEach(task =>{
        if(task.id === taskId){
            task.doneAt = task.doneAt ? null : new Date()
        }
     })

     this.setState({ tasks })
    }

    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return (
            <View style={style.container}>
                <ImageBackground source={TodayImage}
                    style={style.background}>

                        <View style={style.iconBar}>
                            <TouchableOpacity onPress={ this.toggleFilter }>
                                <Icon name={this.state.showDoneTasks ? "eye":"eye-slash"}
                                size={30} color={CommonsStyles.colors.secondary} />
                            </TouchableOpacity>
                        </View>

                    <View style={style.titleBar}>
                        <Text style={style.title}>Hoje</Text>
                        <Text style={style.subtitle}>{today}</Text>
                    </View>

                </ImageBackground>
                <View style={style.TaskList}>
                   <FlatList
                     data={this.state.tasks}
                     keyExtractor={item => `${item.id}`}
                     renderItem={({item}) => <Task
                        {...item}
                        toggleTask={this.toggleTask}
                         />}
                    />

                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    TaskList: {
        flex: 7
    },

    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        title: CommonsStyles.fontFamily,
        fontSize: 50,
        color: CommonsStyles.colors.secondary,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: CommonsStyles.fontFamily,
        color: CommonsStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar:{
        flexDirection:"row",
        marginHorizontal:20,
        justifyContent:'flex-end',
        marginTop:Platform.OS === 'ios' ? 40 : 10
    }
})