import React from 'react'
import { ScrollView, View, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import Icon  from 'react-native-vector-icons/FontAwesome'
import commonsStyles from '../commonsStyles'

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";




export default props => {

    const logout = async () =>{
       // axios.defaults.headers.common.['A']
       AsyncStorage.removeItem('userData')
       props.navigation.navigate('AuthOrApp')
    }

    return (
        <ScrollView>
            <View style={style.header}>
                <Text style={style.title}>Task</Text>
                <Gravatar style={style.avatar} options={{
                    email: props.navigation.getParam('email'),
                    secure: true
                }} />
                <View style={style.userinfo}>
                <Text style={style.TextNome}>{props.navigation.getParam('nome')}</Text>
                 <Text style={style.TextEmail}>{props.navigation.getParam('email')}</Text>
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={style.logoutIcon}>
                        <Icon name='sign-out' size={30} color='#800' />
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    )
}

const style = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
        backgroundColor: '#222',
        marginTop: Platform.OS === 'ios' ? 30 : 10
    },
    title: {
        fontSize: 30,
        fontFamily: commonsStyles.fontFamily,
        color: '#222',
        padding: 10,
        paddingTop: 30,

    },
    TextNome: {
        fontSize: 20,
        fontWeight: 'bold',
        color: commonsStyles.colors.mainText,
        fontFamily: commonsStyles.fontFamily,
       
    },
    TextEmail: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'blue',
        fontFamily: commonsStyles.fontFamily,
        margin:5,
    },
    userinfo: {
        marginLeft: 10,
    },
    logoutIcon:{
      marginLeft:10,
      marginBottom:10,

    },

})