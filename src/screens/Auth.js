import React, { Component } from "react";
import { Text, StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Platform, Alert } from "react-native";
import backgroundImage from "../../assets/imgs/login.jpg"
import commonsStylees from '../commonsStyles'
import Icon from "react-native-vector-icons/FontAwesome";

import { server,showError,showSucesso} from "../commons"
import axios from "axios";

const inicialState ={
    nome: '',
    email: 'allaye.gana@gmail.com',
    password: 'Gana@123',
    comfirmPassword: '',
    stageNew: false
}

export default class Auth extends Component {


    state = {
     ...inicialState
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
          this.signup()
        } else {
            this.signin()
        }
    }

    signup = async () =>{
        try{
            await axios.post(`${server}/signup/cadastro/usuarios`,{
            nome:this.state.nome,
            email:this.state.email,
            password:this.state.password,
            comfirmPassword:this.state.comfirmPassword,
        })
          showSucesso('Usuario cadastrado!')
          this.setState({ ...inicialState})
        }catch(e){
            showError(e)
        }
    }

    signin = async () =>{
        try{
            await axios.post(`${server}/signup/sign/validar`,{
                email:this.state.email,
                password:this.state.password
            })
            this.props.navigation.navigate('Home')
        }catch(e){
            showError(e)
        }
    }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if(this.state.stageNew){
            validations.push(this.state.nome && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.comfirmPassword)
        }

        const validform = validations.reduce((t,a) => t && a )
        return (
            <ImageBackground source={backgroundImage}
                style={style.background}>
                <Text style={style.title}>Task</Text>
                <View style={style.formContainer}>
                    <Text style={style.subTitle}>
                        {this.state.stageNew ? "crie a sua conta " : "Informe seus dados "}
                    </Text>
               
                    {this.state.stageNew &&
                    <TextInput
                        style={[style.inputContainer, style.input]} 
                        placeholder='Nome'
                        value={this.state.nome}
                        onChangeText={nome => this.setState({ nome })}
                        icon={<Icon name={'user'} size={20} style={style.inputIcon}/>}
                />
                    }

                    <TextInput 
                    style={[style.inputContainer,style.input]}
                        placeholder='E-mail'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        icon={<Icon name={'at'} size={20} style={style.inputIcon}/>}
                         />
                    <TextInput
                     style={[style.inputContainer,style.input]}
                        placeholder='Senha' 
                        value={this.state.password}
                        secureTextEntry={true} 
                        onChangeText={password => this.setState({ password })}
                        icon={<Icon name={'lock'} size={20} style={style.inputIcon}/>}
                         />
                    {this.state.stageNew &&
                        <TextInput 
                            style={[style.inputContainer]}
                            placeholder='Confirmação a senha' 
                            value={this.state.comfirmPassword}
                            secureTextEntry={true} 
                            onChangeText={comfirmPassword => this.setState({ comfirmPassword })} 
                            icon={<Icon name={'lock'} size={20} style={style.inputIcon}/>}
                            />  
                   }
                    <TouchableOpacity onPress={this.signinOrSignup} disabled={!validform}>
                        <View style={[style.button, validform ? {} : {backgroundColor:"#AAA"}]}>
                            <Text style={style.buttonText}>
                                {this.state.stageNew ? "registar" : "Entrar"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }}
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={style.buttonText}>
                        {this.state.stageNew ? " ja possui conta ?" : "ainda nao possui conta ?"}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonsStylees.fontFamily,
        color: commonsStylees.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: commonsStylees.fontFamily,
        color: "#FFF",
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%'
    },
  
    button: {
        backgroundColor: "#080",
        marginTop: 10,
        padding: 10,
        alignItems: "center",
    },
    buttonText: {
        fontFamily: commonsStylees.fontFamily,
        color: "#fff",
        fontSize: 20

    },

    inputContainer:{
        width:'100%',
        height:40,
        borderRadius:20,
        flexDirection:'row',
        alignItems:'center',
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: Platform.OS == 'ios' ? 20 : 10,
        fontSize:20
 
     },
     inputIcon:{
       color:'#333',
       marginLeft:20
     },
     inputUser:{
     marginLeft:20,
     width:'70%',
     
     }


})