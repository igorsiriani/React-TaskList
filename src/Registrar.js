import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { GlobalStyles } from './styles/GlobalStyles'
import service from './service/register'

export default function Registrar({ navigation }) {
    const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '' })

    const field = (field) => {
        return (value) => setData({...data, [field]: value })
    }

    const registerUser = async() => {

        if (data.name == '' || data.email == '' || data.password == '' || data.confirmPassword == '') {
            Alert.alert('Minhas Tarefas', 'Preencha todos os campos.', [
                { text: 'OK' }
            ], { cancelable: true })
            return
        } 

        if (!data.email.includes('@')) {
            Alert.alert('Minhas Tarefas', 'E-mail inválido.', [
                { text: 'OK' }
            ], { cancelable: true })
            return
        }

        if (data.password != data.confirmPassword) {
            Alert.alert('Minhas Tarefas', 'Senhas não coincidem.', [
                { text: 'OK' }
            ], { cancelable: true })
            return
        }

        let result = await service.registerUser({name: data.name, email: data.email, password: data.password})
        if (result === 'OK') {
            navigation.navigate('Login')
        } else {
            Alert.alert('Minhas Tarefas', result, [
                { text: 'OK' }
            ], { cancelable: true })
        }

        setData({ name: '', email: '', password: '', confirmPassword: '' })
    }

    return (
        <React.Fragment>
            <View style={GlobalStyles.container}>

                <TextInput placeholder="Nome" 
                    style={GlobalStyles.input}
                    onChangeText={field('name')} />

                <TextInput placeholder="E-mail"
                    style={GlobalStyles.input} keyboardType="email-address"
                    onChangeText={field('email')} />

                <TextInput placeholder="Senha" 
                    style={GlobalStyles.input} secureTextEntry={true}
                    onChangeText={field('password')} />

                <TextInput placeholder="Confirmar senha"
                    style={GlobalStyles.input} secureTextEntry={true}
                    onChangeText={field('confirmPassword')} />

                <TouchableOpacity style={styles.btnRegistrar}
                    onPress={registerUser}>
                    <Text style={styles.btnRegistrarText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    tituloText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        padding: 20
    },
    btnRegistrar: {
        backgroundColor: '#059669',
        width: '90%',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        borderRadius: 5
    },
    btnRegistrarText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#D1FAE5'
    },
})
