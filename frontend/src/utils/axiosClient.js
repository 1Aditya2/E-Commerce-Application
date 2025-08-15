import axios from 'axios'
export const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        common: {
            Authorization: `Bearer 02b9fb4214febfb602f001699e8cf5118af6cd9141f4123657a7fcf1103be115d4b823bd4f2ef297e5c27664f280d02c678e705ba7eadc6a6e3e08a2b224e6870ed9ab4be56b1b279b4826d20382500f54d54418c877e463aa7777a8f94aa9130277cf443a9a38670742a4d74f67ceea94c96f609e9db761bb2aa707c3592c68`
        }
    }
})