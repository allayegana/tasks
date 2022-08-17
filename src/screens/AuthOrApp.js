import React, { Component} from "react";
import { View, ActivityIndicator,StyleSheet } from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AuthOrApp extends Component {

    componentDidMount = async () =>{
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null 
        try{
          userData = JSON.parse(userDataJson)
        }catch(e){

        }

        if(userData){
            this.props.navigation.navigate('Home',userData)
        }else{
            this.props.navigation.navigate('Auth')
        }
    }

     render(){
        return(
            <View style={style.container}>
                <ActivityIndicator size='large' />
            </View>
        )
     }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000',
    }
})
