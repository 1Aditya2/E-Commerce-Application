import axios from 'axios'
export const axiosClient = axios.create({
    baseURL: 'https://strapi-server-5cb2.onrender.com/api',
    headers: {
        common: {
            Authorization: `Bearer 15f72b4e0fed9f7a40e7ed19a5265dc1e268a49509f0fb00c9a80e37560d53acad3dc46ee7ae9d8e4e537f92702e10e4ec104b90c0a1eb9ed27258b6cec777bac2bb78d23c185f1246d2bfccefc309d4d831e71c7d9650369367da090a15ec7ef2705fbbc8b2cc76217636eb278c177f2b9c8acd0975e56dde0025b4fa41ddfe`
        }
    }
})