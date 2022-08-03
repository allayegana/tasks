import React, { Component } from "react";
import {Alert, View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from "react-native";
import CommonsStyles from "../commonsStyles";
import Task from "../componentes/Task";
import Icon from "react-native-vector-icons/FontAwesome";
import TodayImage from '../../assets/imgs/today.jpg';
import AddTasks from "./AddTask";

import moment from 'moment'
import 'moment/locale/pt-br'
import commonsStyles from "../commonsStyles";

export default class TaskList extends Component {

    state = {
        showAddTasks: false,
        showDoneTasks: true,
        visivelTasks: [],
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

    componentDidMount = () => {
        this.filterTask()
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTask)
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks }, this.filterTask)
    }

    filterTask = () => {
        let visivelTasks = null
        if (this.state.showDoneTasks) {
            visivelTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visivelTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visivelTasks })
    }
    

    AddTask = newTask =>{
        if(!newTask.desc || !newTask.desc.trim()){
         Alert.alert('Dados Invalidos', 'Descriçâo não Informada!')
         return 
        }

        const tasks = [...this.state.tasks]
        tasks.push({
          id: Math.random(),
          desc: newTask.desc,
          estimaAt: newTask.date,
          doneAt:null
        })
        this.setState({ tasks, showAddTasks:false}, this.filterTask)
    }


    render() {

        const today = moment().locale('pt-br').format('dddd, D [de] MMMM')

        return (
            <View style={style.container}>
                <AddTasks
                    isVisible={this.state.showAddTasks}
                    onCancel={() => this.setState({ showAddTasks: false })} 
                    onSave={this.AddTask}/>
                <ImageBackground source={TodayImage}
                    style={style.background}>

                    <View style={style.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
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
                        data={this.state.visivelTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task
                            {...item}
                            toggleTask={this.toggleTask}
                        />}
                    />
                </View>
                <TouchableOpacity style={style.addButton}
                    activeOpacity={0.7}
                    onPress={() => this.setState({ showAddTasks: true })}
                    >
                    <Icon name="plus" size={20}
                        color={commonsStyles.colors.secondary} />
                </TouchableOpacity>
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
    iconBar: {
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonsStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})