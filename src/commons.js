import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'

function showError(err){
    if( err.response && err.response.data){
        Alert.alert('Ops!' ,'Ocorreu um Problema!',`Mensagem ${err.response.data}`)
    }else{
        Alert.alert('Ops!' ,'Ocorreu um Problema!',`Mensagem ${err.response.data}`)
    }
}

function showSucesso(msg){
    Alert.alert('Sucesso',`Mensagem ${msg}`)

}

export { server, showError, showSucesso}