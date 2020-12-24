import axios from 'axios';

const basePath = 'http://18.188.122.22:8001/users'

const register = {
    registerUser: (user) => {
        return axios.post(basePath, user).then( res => {
            return 'OK';
        }).catch(err => {
            return 'Não foi possível criar usuário.'
        })
    }
}

export default register;