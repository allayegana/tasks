import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'

function showError(err){
    Alert.alert('Ops!' ,'Ocorreu um Problema!',`Mensagem ${err}`)
}

function showSucesso(msg){
    Alert.alert('Sucesso',`Mensagem ${msg}`)

}

export { server, showError, showSucesso}